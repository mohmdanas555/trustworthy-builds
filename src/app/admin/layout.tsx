"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard, FolderKanban, Wrench, Building2, LogOut,
    Menu, X, MessageSquare, Users, Star, Settings, Bell,
    Sparkles, Calendar, ListTodo
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
        return <div className="min-h-screen bg-[#0A0C0F] flex items-center justify-center text-primary font-bold">
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
        { icon: ListTodo, label: "Dashboard", path: "/admin", glow: true },
        { icon: MessageSquare, label: "Messages", path: "/admin/quotes", badge: pendingQuotes },
        { icon: FolderKanban, label: "Projects", path: "/admin/projects" },
        { icon: Wrench, label: "Services", path: "/admin/services" },
        { icon: Users, label: "Team", path: "/admin/team" },
        { icon: Star, label: "Testimonials", path: "/admin/testimonials" },
        { icon: Building2, label: "Company Info", path: "/admin/company" },
    ];

    const bottomItems = [
        { icon: Settings, label: "Settings", path: "/admin/company" },
    ];

    return (
        <div className="min-h-screen bg-white text-black flex font-sans antialiased overflow-hidden">
            {/* Mobile Sidebar Toggle */}
            <button
                className="lg:hidden fixed top-6 right-6 z-50 p-3 bg-primary/20 backdrop-blur-xl rounded-2xl border border-primary/20 text-primary"
                onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Sidebar - Premium Dark Design */}
            <aside
                className={`
                    fixed lg:static inset-y-0 left-0 z-40 w-72 bg-gray-50 border-r border-gray-200 transform transition-transform duration-500 ease-in-out
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                <div className="h-full flex flex-col p-6">
                    {/* Logo/Identity */}
                    <div className="flex items-center gap-3 mb-10 px-2">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(180,255,0,0.3)]">
                            <Building2 className="text-black w-6 h-6" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-black tracking-tighter leading-none text-black">ADMIN</span>
                            <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mt-1">Command Center</span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`
                                        flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 group
                                        ${isActive
                                            ? "bg-white text-black ring-1 ring-gray-200 shadow-sm"
                                            : "text-gray-600 hover:text-black hover:bg-gray-100"}
                                    `}
                                >
                                    <div className="flex items-center gap-4">
                                        <item.icon size={20} className={`${isActive ? "text-primary" : "group-hover:text-white"}`} />
                                        <span className="text-sm font-bold tracking-tight">{item.label}</span>
                                    </div>
                                    {item.badge && (
                                        <Badge className="bg-primary/20 text-primary border-none rounded-lg px-2 text-[10px] font-black">
                                            {item.badge}
                                        </Badge>
                                    )}
                                    {isActive && (
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(180,255,0,1)]" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Bottom Section */}
                    <div className="pt-6 space-y-2 border-t border-gray-200">
                        {bottomItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className="flex items-center gap-4 px-5 py-4 rounded-2xl text-gray-600 hover:text-black hover:bg-gray-100 transition-all text-sm font-bold"
                            >
                                <item.icon size={20} />
                                {item.label}
                            </Link>
                        ))}
                        <Button
                            variant="ghost"
                            className="w-full flex items-center justify-start gap-4 px-5 py-4 h-auto rounded-2xl text-red-600 hover:text-red-700 hover:bg-red-50 transition-all"
                            onClick={() => {
                                logout();
                                router.push("/admin/login");
                            }}
                        >
                            <LogOut size={20} />
                            <span className="text-sm font-bold">Log out</span>
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-auto bg-white relative">
                {/* Background Glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[120px] -mr-64 -mt-64" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/3 rounded-full blur-[100px] -ml-40 -mb-40" />

                <div className="relative z-10 p-8 lg:p-12 min-h-screen">
                    <div className="max-w-[1600px] mx-auto">
                        {children}
                    </div>
                </div>
            </main>
            <Toaster />
        </div>
    );
};

export default AdminLayout;
