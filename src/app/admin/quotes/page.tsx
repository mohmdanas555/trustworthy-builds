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
            toast({ title: `Quote marked as ${newStatus}` });
        } catch (error) {
            console.error(error);
            toast({ variant: "destructive", title: "Update failed" });
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this message?")) {
            await deleteQuote(id);
            toast({ title: "Message deleted" });
        }
    };

    const getStatusBadge = (status: Quote['status']) => {
        switch (status) {
            case 'pending': return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
            case 'reviewed': return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Reviewed</Badge>;
            case 'contacted': return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Contacted</Badge>;
            default: return <Badge>{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Quotes & Messages</h2>
                <p className="text-muted-foreground">
                    Manage incoming project inquiries and contact form submissions.
                </p>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {quotes.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                    No messages yet.
                                </TableCell>
                            </TableRow>
                        ) : quotes.map((quote) => (
                            <TableRow key={quote.id}>
                                <TableCell className="text-xs text-muted-foreground">
                                    {quote.created_at ? new Date(quote.created_at).toLocaleDateString() : 'N/A'}
                                </TableCell>
                                <TableCell className="font-medium">{quote.name}</TableCell>
                                <TableCell>{quote.email}</TableCell>
                                <TableCell>{getStatusBadge(quote.status)}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => setSelectedQuote(quote)}>
                                            <MessageSquare className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" onClick={() => handleDelete(quote.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={!!selectedQuote} onOpenChange={() => setSelectedQuote(null)}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Message from {selectedQuote?.name}</DialogTitle>
                        <DialogDescription>
                            Received on {selectedQuote?.created_at ? new Date(selectedQuote.created_at).toLocaleString() : 'N/A'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-muted-foreground text-xs uppercase font-bold">Email</p>
                                <p>{selectedQuote?.email}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground text-xs uppercase font-bold">Phone</p>
                                <p>{selectedQuote?.phone || 'Not provided'}</p>
                            </div>
                        </div>
                        <div className="bg-muted p-4 rounded-md text-sm whitespace-pre-wrap">
                            {selectedQuote?.message}
                        </div>
                        <div className="flex justify-between items-center pt-4">
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant={selectedQuote?.status === 'reviewed' ? 'secondary' : 'outline'}
                                    onClick={() => selectedQuote && handleStatusChange(selectedQuote, 'reviewed')}
                                >
                                    <Clock className="w-4 h-4 mr-2" /> Mark Reviewed
                                </Button>
                                <Button
                                    size="sm"
                                    variant={selectedQuote?.status === 'contacted' ? 'secondary' : 'outline'}
                                    onClick={() => selectedQuote && handleStatusChange(selectedQuote, 'contacted')}
                                >
                                    <CheckCircle className="w-4 h-4 mr-2" /> Mark Contacted
                                </Button>
                            </div>
                            <Button variant="ghost" onClick={() => setSelectedQuote(null)}>Close</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default QuotesManager;
