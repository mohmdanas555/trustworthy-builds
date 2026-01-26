"use client";

import { TrendingUp, Users, FolderKanban, ArrowUpRight, ArrowDownRight, Activity, Sparkles, Building2 } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";

const projectData = [
    { month: "Jan", baseline: 4000, current: 4400 },
    { month: "Feb", baseline: 3000, current: 3200 },
    { month: "Mar", baseline: 2000, current: 2600 },
    { month: "Apr", baseline: 2780, current: 3908 },
    { month: "May", baseline: 1890, current: 4800 },
    { month: "Jun", baseline: 2390, current: 3800 },
];

const conversionData = [
    { day: "Mon", value: 45 },
    { day: "Tue", value: 52 },
    { day: "Wed", value: 38 },
    { day: "Thu", value: 65 },
    { day: "Fri", value: 48 },
    { day: "Sat", value: 30 },
    { day: "Sun", value: 20 },
];

const chartConfig = {
    current: {
        label: "Current Year",
        color: "#A3E635",
    },
    baseline: {
        label: "Previous Year",
        color: "#1A1D23",
    },
} satisfies ChartConfig;

const StatisticsPage = () => {
    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight mb-1 text-white">Advanced Analytics</h2>
                    <div className="flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-widest">
                        <Activity size={14} className="text-[#A3E635]" />
                        <span>Corporate Performance & Resource Metrics</span>
                    </div>
                </div>
            </div>

            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Annual Revenue", value: "$4.2M", trend: "+12.5%", isUp: true, icon: TrendingUp },
                    { label: "Client Retention", value: "98.2%", trend: "+2.1%", isUp: true, icon: Users },
                    { label: "Project Velocity", value: "1.4x", trend: "-4.2%", isUp: false, icon: Activity },
                    { label: "Market Share", value: "15%", trend: "+5.0%", isUp: true, icon: Building2 },
                ].map((stat, i) => (
                    <Card key={i} className="bg-[#0D0F12] border-white/5 rounded-[32px] p-6 shadow-xl relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2.5 rounded-xl bg-white/[0.03] text-white/20 group-hover:text-[#A3E635] transition-colors">
                                <stat.icon size={20} />
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-black ${stat.isUp ? 'text-[#A3E635]' : 'text-red-400'}`}>
                                {stat.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                {stat.trend}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-2xl font-black text-white">{stat.value}</div>
                            <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{stat.label}</div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Main Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <Card className="lg:col-span-8 bg-[#0D0F12] border-white/5 rounded-[40px] p-8 shadow-2xl">
                    <CardHeader className="px-0 pt-0 pb-10">
                        <CardTitle className="text-xl font-black text-white">Cumulative Build Output</CardTitle>
                        <CardDescription className="text-white/40">Comparison of monthly construction volume (sq. ft.)</CardDescription>
                    </CardHeader>
                    <CardContent className="px-0">
                        <ChartContainer config={chartConfig} className="h-[300px] w-full">
                            <AreaChart data={projectData} margin={{ left: -20, right: 12 }}>
                                <defs>
                                    <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#A3E635" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#A3E635" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#ffffff05" />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#ffffff20', fontSize: 10, fontWeight: 700 }}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Area
                                    type="monotone"
                                    dataKey="current"
                                    stroke="#A3E635"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorCurrent)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="baseline"
                                    stroke="#1A1D23"
                                    strokeWidth={2}
                                    fill="transparent"
                                />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="px-0 pt-6 border-t border-white/5 flex justify-between items-center">
                        <div className="flex gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#A3E635]" />
                                <span className="text-[10px] font-black text-white/40 uppercase">Current</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#1A1D23]" />
                                <span className="text-[10px] font-black text-white/40 uppercase">Baseline</span>
                            </div>
                        </div>
                        <Button variant="ghost" className="text-[10px] font-black text-[#A3E635] uppercase tracking-widest hover:bg-[#A3E635]/10">Download Report</Button>
                    </CardFooter>
                </Card>

                <div className="lg:col-span-4 space-y-10">
                    <Card className="bg-[#0D0F12] border-white/5 rounded-[40px] p-8 shadow-2xl overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-700">
                            <Sparkles size={80} className="text-[#A3E635]" />
                        </div>
                        <CardHeader className="px-0 pt-0 pb-6 relative z-10">
                            <CardTitle className="text-lg font-black text-white">Regional Demand</CardTitle>
                            <CardDescription className="text-white/40">Inquiry volume by day</CardDescription>
                        </CardHeader>
                        <CardContent className="px-0 relative z-10">
                            <ChartContainer config={{ value: { label: "Inquiries", color: "#A3E635" } }} className="h-[200px] w-full">
                                <BarChart data={conversionData}>
                                    <Bar
                                        dataKey="value"
                                        fill="#A3E635"
                                        radius={[10, 10, 0, 0]}
                                        className="opacity-20 hover:opacity-100 transition-opacity"
                                    />
                                    <XAxis
                                        dataKey="day"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#ffffff20', fontSize: 10, fontWeight: 700 }}
                                    />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                        <div className="mt-6 p-4 bg-white/[0.03] rounded-2xl border border-white/5 flex items-center justify-between">
                            <div className="text-[10px] font-black text-white/40 uppercase">Peak Efficiency</div>
                            <div className="text-xs font-black text-[#A3E635]">Thursday</div>
                        </div>
                    </Card>

                    <Card className="bg-gradient-to-br from-[#1A1D23] to-[#0D0F12] border-white/5 rounded-[40px] p-8 shadow-2xl">
                        <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                            <FolderKanban size={16} className="text-[#A3E635]" />
                            Status Check
                        </h4>
                        <div className="space-y-6">
                            {[
                                { name: "Marina High-Rise", progress: 92, status: "Finishing" },
                                { name: "Ajman Factory", progress: 45, status: "Structural" },
                                { name: "Palm Jumeirah Villa", progress: 15, status: "Foundations" },
                            ].map((project, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <div className="text-xs font-bold text-white">{project.name}</div>
                                        <div className="text-[10px] font-black text-[#A3E635] uppercase">{project.status}</div>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#A3E635]" style={{ width: `${project.progress}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default StatisticsPage;
