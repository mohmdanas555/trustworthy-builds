"use client";

import { useData } from "@/context/DataContext";
import {
    FolderKanban, MessageSquare, Plus, MoreHorizontal,
    Clock, CheckCircle2, LayoutDashboard, TrendingUp,
    ArrowUpRight, Mail, User
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const AdminDashboard = () => {
    const { projects, services, quotes } = useData();

    // Sort quotes: pending first
    const recentQuotes = [...quotes].sort((a, b) =>
        (a.status === 'pending' ? -1 : 1)
    ).slice(0, 6);

    const stats = [
        { label: "Total Quotes", value: quotes.length, icon: MessageSquare, color: "text-blue-400" },
        { label: "Active Projects", value: projects.length, icon: FolderKanban, color: "text-primary" },
        { label: "Live Services", value: services.length, icon: CheckCircle2, color: "text-emerald-400" },
        { label: "Conversion", value: "24%", icon: TrendingUp, color: "text-purple-400" },
    ];

    return (
        <div className="space-y-10">
            {/* 1. Dashboard Welcome & Stats */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">Dashboard</h1>
                    <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Welcome back, Managing Director</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button className="bg-primary text-black hover:bg-white rounded-2xl px-6 h-12 font-black transition-all shadow-[0_0_20px_rgba(180,255,0,0.2)]">
                        <Plus className="mr-2 w-5 h-5" /> Add Project
                    </Button>
                </div>
            </div>

            {/* Quick Stats Grid - Matching Theme */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/5 border border-white/5 rounded-[32px] p-6 relative overflow-hidden group hover:bg-white/[0.07] transition-all"
                    >
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${stat.color}`}>
                                <stat.icon size={20} />
                            </div>
                            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Analytics</span>
                        </div>
                        <div className="text-3xl font-black mb-1">{stat.value}</div>
                        <div className="text-[11px] font-bold text-white/40 uppercase tracking-widest">{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* 2. Main Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Recent Inquiries Section - Matching Theme */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                                <MessageSquare size={16} className="text-primary" />
                            </div>
                            <h3 className="font-black text-lg tracking-tight uppercase">Recent Inquiries</h3>
                        </div>
                        <Link href="/admin/quotes" className="text-[11px] font-black text-primary uppercase tracking-widest hover:text-white transition-colors">
                            View All
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {recentQuotes.map((quote, idx) => (
                            <motion.div
                                key={quote.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 + (idx * 0.05) }}
                                className="bg-white/[0.03] border border-white/5 rounded-[32px] p-6 hover:bg-white/[0.06] transition-all group relative overflow-hidden"
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                            <User size={18} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[15px] leading-tight">{quote.name}</h4>
                                            <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{quote.service_type || 'General Inquiry'}</span>
                                        </div>
                                    </div>
                                    {quote.status === 'pending' && (
                                        <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(180,255,0,1)]" />
                                    )}
                                </div>

                                <p className="text-xs text-white/50 line-clamp-2 mb-6 font-medium italic">
                                    "{quote.message}"
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-white/5 border-dashed">
                                    <div className="flex items-center gap-2">
                                        <Mail size={12} className="text-white/30" />
                                        <span className="text-[11px] text-white/30 font-bold">{quote.email}</span>
                                    </div>
                                    <Link href={`/admin/quotes`} className="p-2 rounded-lg bg-white/5 text-white/40 hover:text-primary transition-all">
                                        <ArrowUpRight size={16} />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* System & Actions Section */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                            <LayoutDashboard size={16} className="text-primary" />
                        </div>
                        <h3 className="font-black text-lg tracking-tight uppercase">Quick Actions</h3>
                    </div>

                    <div className="space-y-4">
                        {[
                            { label: "Update Services", path: "/admin/services", icon: CheckCircle2 },
                            { label: "Manage Team", path: "/admin/team", icon: User },
                            { label: "Company Info", path: "/admin/company", icon: TrendingUp },
                        ].map((action, i) => (
                            <Link
                                key={i}
                                href={action.path}
                                className="flex items-center justify-between p-6 bg-white/[0.03] border border-white/5 rounded-[28px] hover:bg-white/10 transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
                                        <action.icon size={18} />
                                    </div>
                                    <span className="text-sm font-bold tracking-tight uppercase">{action.label}</span>
                                </div>
                                <ArrowUpRight size={18} className="text-white/20 group-hover:text-white" />
                            </Link>
                        ))}
                    </div>

                    {/* AI Insights Placeholder - Matching Theme */}
                    <div className="p-8 bg-primary/10 border border-primary/20 rounded-[40px] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                            <TrendingUp size={80} />
                        </div>
                        <Badge className="bg-primary text-black border-none px-3 py-1 text-[9px] font-black uppercase mb-4">Live Insight</Badge>
                        <h4 className="font-black text-xl mb-2">Project Sentiment</h4>
                        <p className="text-xs text-white/60 leading-relaxed font-bold">
                            Based on recent inquiries, demand for "<span className="text-primary font-black">Industrial Renovation</span>" has increased by 15% this week.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
