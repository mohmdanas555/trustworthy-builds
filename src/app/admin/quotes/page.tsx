"use client";

import { useState } from "react";
import { MessageSquare, Trash2, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useData } from "@/context/DataContext";
import type { Quote } from "@/context/DataContext";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const QuotesManager = () => {
    const { quotes, updateQuote, deleteQuote } = useData();
    const { toast } = useToast();
    const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

    const handleStatusChange = async (quote: Quote, newStatus: Quote['status']) => {
        try {
            await updateQuote({ ...quote, status: newStatus });
            toast({ title: `Status Updated`, description: `Message marked as ${newStatus}` });
        } catch (error) {
            console.error(error);
            toast({ variant: "destructive", title: "Update failed" });
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm("Permanently delete this inquiry from the database?")) {
            await deleteQuote(id);
            toast({ title: "Record Deleted", variant: "destructive" });
        }
    };

    const getStatusBadge = (status: Quote['status']) => {
        switch (status) {
            case 'pending': return (
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A3E635] animate-pulse shadow-[0_0_8px_rgba(163,230,53,0.8)]" />
                    <span className="text-[10px] font-black text-[#A3E635] uppercase tracking-widest">Awaiting Review</span>
                </div>
            );
            case 'reviewed': return (
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">In Analysis</span>
                </div>
            );
            case 'contacted': return (
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Contact Established</span>
                </div>
            );
            default: return <Badge className="bg-white/5 text-white/40">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight mb-1 text-white">Inquiry Pipeline</h2>
                    <div className="flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-widest">
                        <MessageSquare size={14} className="text-[#A3E635]" />
                        <span>Incoming Project Proposals & Leads</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Badge className="bg-[#A3E635]/10 text-[#A3E635] border-none px-4 py-1.5 text-[10px] font-black uppercase">
                        {quotes.filter(q => q.status === 'pending').length} New Requets
                    </Badge>
                </div>
            </div>

            {/* Premium Table Interface */}
            <div className="bg-[#0D0F12] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl relative">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent">
                                <TableHead className="text-white/20 font-black uppercase tracking-widest text-[10px] py-6 px-8">Arrival Date</TableHead>
                                <TableHead className="text-white/20 font-black uppercase tracking-widest text-[10px] py-6">Identity</TableHead>
                                <TableHead className="text-white/20 font-black uppercase tracking-widest text-[10px] py-6">Requirement</TableHead>
                                <TableHead className="text-white/20 font-black uppercase tracking-widest text-[10px] py-6">Status</TableHead>
                                <TableHead className="text-right text-white/20 font-black uppercase tracking-widest text-[10px] py-6 px-8">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {quotes.length === 0 ? (
                                <TableRow className="hover:bg-transparent border-none">
                                    <TableCell colSpan={5} className="text-center h-48 text-white/10 font-bold uppercase tracking-widest text-xs">
                                        Pipeline Clear. No active inquiries.
                                    </TableCell>
                                </TableRow>
                            ) : quotes.map((quote) => (
                                <TableRow key={quote.id} className="border-white/5 hover:bg-white/[0.02] transition-colors group">
                                    <TableCell className="py-6 px-8">
                                        <div className="text-white/40 text-[11px] font-bold">
                                            {quote.created_at ? new Date(quote.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-6">
                                        <div className="flex flex-col">
                                            <span className="text-white font-bold text-sm mb-0.5">{quote.name}</span>
                                            <span className="text-[10px] text-white/20 font-medium">{quote.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-6">
                                        <Badge className="bg-white/5 text-white/60 border-none px-3 py-1 text-[9px] font-black uppercase tracking-widest">
                                            {quote.service_type || 'General Build'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-6">{getStatusBadge(quote.status)}</TableCell>
                                    <TableCell className="text-right py-6 px-8">
                                        <div className="flex justify-end gap-3 opacity-20 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setSelectedQuote(quote)}
                                                className="h-9 w-9 rounded-xl bg-white/5 text-white hover:bg-[#A3E635] hover:text-black border border-white/5"
                                            >
                                                <MessageSquare className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(quote.id)}
                                                className="h-9 w-9 rounded-xl bg-white/5 text-white hover:bg-red-500 border border-white/5"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Detailed Message Dialog */}
            <Dialog open={!!selectedQuote} onOpenChange={() => setSelectedQuote(null)}>
                <DialogContent className="sm:max-w-[600px] bg-[#0A0C0F] border-white/10 text-white rounded-[40px] p-0 overflow-hidden shadow-2xl">
                    <div className="p-10 space-y-8">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black uppercase tracking-tighter">Inquiry Specifications</DialogTitle>
                            <div className="text-white/40 font-bold uppercase text-[10px] tracking-widest mt-2">
                                Logged on {selectedQuote?.created_at ? new Date(selectedQuote.created_at).toLocaleString() : 'N/A'}
                            </div>
                        </DialogHeader>

                        <div className="grid grid-cols-2 gap-8 border-y border-white/5 py-8">
                            <div>
                                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-2">Subject Identity</p>
                                <p className="text-sm font-bold text-white">{selectedQuote?.name}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-2">Digital Address</p>
                                <p className="text-sm font-bold text-[#A3E635]">{selectedQuote?.email}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Requirement Body</p>
                            <div className="bg-white/5 p-6 rounded-3xl text-sm leading-relaxed text-white/70 italic border border-white/5">
                                "{selectedQuote?.message}"
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-4">
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    className={`rounded-xl px-5 h-10 font-bold text-xs transition-all ${selectedQuote?.status === 'reviewed' ? 'bg-blue-500 text-white' : 'bg-white/5 text-white/40 hover:text-white'}`}
                                    onClick={() => selectedQuote && handleStatusChange(selectedQuote, 'reviewed')}
                                >
                                    <Clock className="w-4 h-4 mr-2" /> Mark Analyzed
                                </Button>
                                <Button
                                    size="sm"
                                    className={`rounded-xl px-5 h-10 font-bold text-xs transition-all ${selectedQuote?.status === 'contacted' ? 'bg-[#A3E635] text-black' : 'bg-white/5 text-white/40 hover:text-white'}`}
                                    onClick={() => selectedQuote && handleStatusChange(selectedQuote, 'contacted')}
                                >
                                    <CheckCircle className="w-4 h-4 mr-2" /> Mark Contacted
                                </Button>
                            </div>
                            <Button variant="ghost" onClick={() => setSelectedQuote(null)} className="text-white/20 hover:text-white font-bold text-xs">Close Console</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default QuotesManager;
