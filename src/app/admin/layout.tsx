"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard, FolderKanban, Wrench, Building2, LogOut,
    Menu, X, MessageSquare, Users, Star, Settings, Bell,
    Sparkles, Calendar, ListTodo, TrendingUp, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useData } from "@/context/DataContext";
import { Toaster } from "@/components/ui/toaster";
import { Badge } from "@/components/ui/badge";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const { isAdmin, isAuthLoading, logout, quotes } = useData();
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const pendingQuotes = quotes.filter(q => q.status === 'pending').length;

    useEffect(() => {
        if (isAuthLoading) return;
        if (pathname === "/admin/login") return;
        if (!isAdmin) {
            router.push("/admin/login");
        }
    }, [isAdmin, isAuthLoading, router, pathname]);

    if (isAuthLoading) {
        return <div className="min-h-screen bg-[#0A0C0F] flex items-center justify-center text-[#A3E635] font-bold">
            <Sparkles className="animate-spin mr-2" /> Initializing...
        </div>;
    }

    if (pathname === "/admin/login") {
        return (
            <div className="min-h-screen bg-[#0A0C0F] flex items-center justify-center">
                {children}
                <Toaster />
            </div>
        );
    }

    if (!isAdmin) return null;

    const navItems = [
        { icon: ListTodo, label: "Tasks", path: "/admin", glow: true },
        { icon: Users, label: "Members", path: "/admin/team" },
        { icon: Calendar, label: "Calendar", path: "/admin/calendar" },
        { icon: MessageSquare, label: "Messages", path: "/admin/quotes", badge: pendingQuotes },
        { icon: TrendingUp, label: "Statistics", path: "/admin" },
        { icon: Bell, label: "Notifications", path: "/admin", badge: 3 },
    ];

    const bottomItems = [
        { icon: Sparkles, label: "AI suggestion", path: "/admin" },
    ];

    return (
        <div className="admin-theme min-h-screen bg-[#0A0C0F] text-white flex font-sans antialiased overflow-hidden selection:bg-[#A3E635]/30">
            {/* Mobile Sidebar Toggle */}
            <button
                className="lg:hidden fixed top-6 right-6 z-50 p-3 bg-[#A3E635]/20 backdrop-blur-xl rounded-2xl border border-[#A3E635]/20 text-[#A3E635]"
                onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Sidebar - Matching Reference Image */}
            <aside
                className={`
                    fixed lg:static inset-y-0 left-0 z-40 w-72 bg-[#0D0F12] border-r border-white/5 transform transition-transform duration-500 ease-in-out
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                <div className="h-full flex flex-col p-6 space-y-8">
                    {/* Brand Header */}
                    <div className="px-4 py-2">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#A3E635] flex items-center justify-center shadow-[0_0_20px_rgba(163,230,53,0.3)]">
                                <Building2 className="text-black w-5 h-5" />
                            </div>
                            <span className="text-sm font-bold tracking-tight uppercase">Saud Shehatha</span>
                        </div>
                    </div>

                    {/* Navigation Groups */}
                    <nav className="flex-1 overflow-y-auto space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <Link
                                    key={item.label}
                                    href={item.path}
                                    className={`
                                        flex items-center justify-between px-5 py-3.5 rounded-2xl transition-all duration-300 group
                                        ${isActive
                                            ? "bg-[#1A1D23] text-white ring-1 ring-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                                            : "text-[#8E9196] hover:text-white hover:bg-white/5"}
                                    `}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`
                                            p-1.5 rounded-lg transition-colors
                                            ${isActive ? "bg-[#A3E635] text-black shadow-[0_0_15px_rgba(163,230,53,0.4)]" : "group-hover:text-white"}
                                        `}>
                                            <item.icon size={18} />
                                        </div>
                                        <span className="text-[14px] font-semibold tracking-tight">{item.label}</span>
                                    </div>
                                    {item.badge && (
                                        <div className={`
                                            px-2.5 py-0.5 rounded-full text-[10px] font-black
                                            ${isActive ? "bg-[#A3E635] text-black" : "bg-white/10 text-white/40"}
                                        `}>
                                            {item.badge}
                                        </div>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer Actions */}
                    <div className="pt-6 space-y-1 border-t border-white/5">
                        {bottomItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.path}
                                className="flex items-center gap-4 px-5 py-4 rounded-2xl text-[#8E9196] hover:text-white hover:bg-white/5 transition-all text-sm font-semibold"
                            >
                                <div className="p-1.5">
                                    <item.icon size={18} />
                                </div>
                                <span>{item.label}</span>
                                <ChevronDown size={14} className="ml-auto opacity-40" />
                            </Link>
                        ))}
                        <button
                            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-all text-sm font-semibold"
                            onClick={() => {
                                logout();
                                router.push("/admin/login");
                            }}
                        >
                            <div className="p-1.5">
                                <LogOut size={18} />
                            </div>
                            <span>Log out</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Workspace Area */}
            <main className="flex-1 overflow-auto bg-[#0A0C0F] relative">
                {/* Reference Image Atmosphere */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#A3E635]/5 to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#A3E635]/[0.02] rounded-full blur-[150px] -mr-64 -mt-64" />

                <div className="relative z-10 p-8 lg:p-12 min-h-screen">
                    {children}
                </div>
            </main>
            <Toaster />
        </div>
    );
};

export default AdminLayout;
