"use client";

import { useData } from "@/context/DataContext";
import {
    FolderKanban, MessageSquare, Plus, MoreHorizontal,
    Clock, CheckCircle2, LayoutDashboard, TrendingUp,
    ArrowUpRight, Mail, User, Sparkles, ListTodo, ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const AdminDashboard = () => {
    const { projects, services, quotes, updateQuote } = useData();
    const { toast } = useToast();
    const [selectedQuote, setSelectedQuote] = useState<any>(null);

    const handleStatusChange = async (quote: any, newStatus: string) => {
        try {
            await updateQuote({ ...quote, status: newStatus });
            toast({ title: `Status Updated`, description: `Message marked as ${newStatus}` });
            setSelectedQuote({ ...quote, status: newStatus });
        } catch (error) {
            console.error(error);
            toast({ variant: "destructive", title: "Update failed" });
        }
    };

    // Sort quotes: pending first
    const recentQuotes = [...quotes].sort((a, b) =>
        (a.status === 'pending' ? -1 : 1)
    ).slice(0, 6);

    const stats = [
        { label: "Active Projects", value: projects.length, icon: FolderKanban, color: "text-[#A3E635]", shadow: "shadow-[0_0_20px_rgba(163,230,53,0.15)]" },
        { label: "Total Inquiries", value: quotes.length, icon: MessageSquare, color: "text-blue-400", shadow: "shadow-[0_0_20px_rgba(96,165,250,0.15)]" },
        { label: "Live Services", value: services.length, icon: CheckCircle2, color: "text-emerald-400", shadow: "shadow-[0_0_20px_rgba(52,211,153,0.15)]" },
        { label: "Growth Rate", value: "+12%", icon: TrendingUp, color: "text-purple-400", shadow: "shadow-[0_0_20px_rgba(192,132,252,0.15)]" },
    ];

    return (
        <div className="space-y-12 pb-20">
            {/* 1. Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-1 text-white">Project Overview</h1>
                    <div className="flex items-center gap-2 text-white/40 text-sm">
                        <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-pulse" />
                        <span>Real-time Command Center</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex bg-[#1A1D23] rounded-xl p-1 border border-white/5">
                        <Button variant="ghost" className="bg-[#0A0C0F] text-white rounded-lg px-4 h-9 text-xs font-semibold shadow-xl">Columns</Button>
                        <Button variant="ghost" className="text-white/40 hover:text-white rounded-lg px-4 h-9 text-xs font-semibold">List</Button>
                        <Button variant="ghost" className="text-white/40 hover:text-white rounded-lg px-4 h-9 text-xs font-semibold">Calendar</Button>
                    </div>
                    <Button
                        onClick={() => toast({ title: "Task Manager", description: "Task creation feature is coming in the next update." })}
                        className="bg-[#A3E635] text-black hover:bg-white rounded-xl px-6 h-11 font-black transition-all shadow-[0_4px_20px_rgba(163,230,53,0.3)]"
                    >
                        <Plus className="mr-2 w-5 h-5" /> New Task
                    </Button>
                </div>
            </div>

            {/* 2. Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`bg-[#0D0F12] border border-white/5 rounded-[28px] p-6 relative overflow-hidden group hover:border-white/10 transition-all ${stat.shadow}`}
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-2.5 rounded-xl bg-white/[0.03] border border-white/5 ${stat.color}`}>
                                <stat.icon size={20} />
                            </div>
                            <div className="flex gap-1.5 opacity-20 group-hover:opacity-40 transition-opacity">
                                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-3xl font-black text-white tracking-tight">{stat.value}</div>
                            <div className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em]">{stat.label}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* 3. Task Management Style Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Board Style Quotes Section */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h3 className="font-bold text-xl text-white">Incoming Inquiries</h3>
                            <Badge className="bg-[#A3E635]/10 text-[#A3E635] border-none rounded-lg px-2.5 py-1 text-[11px] font-black">{recentQuotes.length}</Badge>
                        </div>
                        <Link href="/admin/quotes" className="text-[11px] font-black text-white/20 uppercase tracking-widest hover:text-[#A3E635] transition-colors">See All Activities</Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {recentQuotes.map((quote, idx) => (
                            <motion.div
                                key={quote.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-[#0D0F12] border border-white/5 rounded-[32px] p-8 hover:bg-[#12151A] transition-all group relative cursor-pointer"
                                onClick={() => setSelectedQuote(quote)}
                            >
                                <div className="flex justify-between items-start mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#A3E635]/20 to-transparent flex items-center justify-center text-[#A3E635] border border-[#A3E635]/10 shadow-[0_4px_15px_rgba(0,0,0,0.4)]">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-base text-white group-hover:text-[#A3E635] transition-colors">{quote.name}</h4>
                                            <span className="text-[10px] text-white/30 font-black uppercase tracking-wider">Status: {quote.status}</span>
                                        </div>
                                    </div>
                                    <button
                                        className="text-white/20 hover:text-white p-2 z-10"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedQuote(quote);
                                        }}
                                    >
                                        <MoreHorizontal size={20} />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[11px] font-bold">
                                            <span className="text-white/40 uppercase tracking-widest">Requirement</span>
                                            <span className="text-white/60">{quote.service_type || "General Build"}</span>
                                        </div>
                                        <p className="text-sm text-white/50 leading-relaxed line-clamp-2 italic font-medium">"{quote.message}"</p>
                                    </div>

                                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                        <div className="flex -space-x-3">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0D0F12] bg-white/5 flex items-center justify-center text-[10px] font-bold text-white/40">
                                                    {i === 3 ? <Plus size={12} /> : i}
                                                </div>
                                            ))}
                                        </div>
                                        <div
                                            className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center text-white/20 group-hover:bg-[#A3E635] group-hover:text-black transition-all"
                                        >
                                            <ArrowUpRight size={18} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Sidebar Style Info */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-gradient-to-br from-[#1A1D23] to-[#0D0F12] rounded-[40px] p-10 border border-white/5 relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-700">
                            <Sparkles size={120} className="text-[#A3E635]" />
                        </div>

                        <div className="relative z-10 space-y-8">
                            <Badge className="bg-[#A3E635] text-black border-none px-4 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-[0_4px_15px_rgba(163,230,53,0.3)]">AI Optimization</Badge>

                            <h4 className="text-2xl font-black text-white leading-tight">Infrastructure <br />Insights</h4>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[11px] font-black text-white/40 uppercase tracking-widest">Portfolio Strength</span>
                                        <span className="text-[#A3E635] font-black text-sm">88%</span>
                                    </div>
                                    <div className="h-3 bg-white/5 rounded-full overflow-hidden p-0.5">
                                        <div className="h-full bg-[#A3E635] rounded-full shadow-[0_0_10px_rgba(163,230,53,0.5)]" style={{ width: '88%' }} />
                                    </div>
                                </div>
                                <p className="text-xs text-white/40 leading-relaxed font-semibold">
                                    Analysis suggests updating the <span className="text-white underline underline-offset-4 decoration-[#A3E635]/40">"Industrial Portfolio"</span> with recent high-res renders to increase conversion by 12.4%.
                                </p>
                            </div>

                            <Button className="w-full h-14 rounded-2xl bg-white/[0.03] border border-white/10 text-white font-bold hover:bg-[#A3E635] hover:text-black transition-all group">
                                Generate Strategy <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3 px-2 mb-2">
                            <ListTodo className="text-[#A3E635]" size={18} />
                            <h3 className="font-bold text-white uppercase tracking-widest text-[11px]">Next Steps</h3>
                        </div>
                        {[
                            { label: "Update Team Bios", icon: User },
                            { label: "Check Pending Quotes", icon: Clock },
                            { label: "Sync Supabase Schema", icon: CheckCircle2 }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-5 bg-[#0D0F12] border border-white/5 rounded-[24px] hover:bg-white/5 transition-all cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <item.icon size={16} className="text-white/20 group-hover:text-[#A3E635] transition-colors" />
                                    <span className="text-xs font-semibold text-white/60 group-hover:text-white transition-colors">{item.label}</span>
                                </div>
                                <ChevronRight size={14} className="text-white/10 group-hover:translate-x-1 transition-transform" />
                            </div>
                        ))}
                    </div>
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
                                    <CheckCircle2 className="w-4 h-4 mr-2" /> Mark Contacted
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

export default AdminDashboard;
