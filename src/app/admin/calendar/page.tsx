"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, MapPin, Plus, Sparkles, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const events = [
    { id: 1, title: "Marina View Residence Site Visit", time: "10:00 AM", location: "Dubai Marina", tags: ["Site Visit", "High Priority"], color: "bg-[#A3E635]" },
    { id: 2, title: "Stakeholder Meeting: Logistics Hub", time: "02:30 PM", location: "Ajman Industrial", tags: ["Meeting", "Strategy"], color: "bg-blue-400" },
    { id: 3, title: "Structural Integrity Audit", time: "09:00 AM", location: "Palm Jumeirah", tags: ["Safety", "Audit"], color: "bg-orange-400" },
];

const CalendarPage = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight mb-1 text-white">Project Scheduling</h2>
                    <div className="flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-widest">
                        <CalendarIcon size={14} className="text-[#A3E635]" />
                        <span>Logistics & Deployment Timeline</span>
                    </div>
                </div>
                <Button className="bg-[#A3E635] text-black hover:bg-white rounded-xl px-6 h-11 font-black transition-all shadow-[0_4px_20px_rgba(163,230,53,0.3)]">
                    <Plus className="w-5 h-5 mr-2" /> Add Event
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Calendar View */}
                <div className="lg:col-span-12 xl:col-span-8">
                    <Card className="bg-[#0D0F12] border-white/5 rounded-[40px] p-8 shadow-2xl">
                        <CardHeader className="px-0 pt-0 pb-8 border-b border-white/5 mb-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-2xl font-black text-white">Master Schedule</CardTitle>
                                    <CardDescription className="text-white/40 font-bold uppercase text-[10px] tracking-widest">Select an engineering window</CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge className="bg-white/5 text-white/60 border-none font-black text-[10px] uppercase">Filter</Badge>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="px-0 pb-0 flex flex-col md:flex-row gap-12 items-start justify-center">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-3xl border border-white/5 bg-white/[0.02] shadow-xl p-8 scale-110"
                                classNames={{
                                    day_selected: "bg-[#A3E635] text-black hover:bg-[#A3E635] hover:text-black focus:bg-[#A3E635] focus:text-black rounded-xl",
                                    day_today: "bg-white/10 text-white rounded-xl",
                                    day: "hover:bg-white/5 transition-colors rounded-xl h-12 w-12 text-sm",
                                    caption_label: "text-lg font-black text-white",
                                    head_cell: "text-white/20 font-black uppercase tracking-widest text-[9px]",
                                    nav_button: "border-white/10 text-white hover:bg-white/10",
                                }}
                            />

                            <div className="flex-1 space-y-8 w-full">
                                <div className="space-y-4">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                                        <Sparkles size={14} className="text-[#A3E635]" />
                                        <span>Selected Window Insights</span>
                                    </h4>
                                    <div className="p-6 bg-white/[0.03] border border-white/5 rounded-[28px] space-y-3">
                                        <div className="text-sm font-bold text-white">Engineering Capacity: 84%</div>
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-[#A3E635] rounded-full shadow-[0_0_10px_rgba(163,230,53,0.3)]" style={{ width: '84%' }} />
                                        </div>
                                        <p className="text-[11px] text-white/30 leading-relaxed font-semibold italic">
                                            The selected date shows high personnel availability in the Dubai region. Ideal for site audits.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-white/40">Resource Distribution</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {["Dubai", "Ajman", "Abu Dhabi", "Sharjah"].map(region => (
                                            <Badge key={region} className="bg-white/5 text-white/60 hover:bg-[#A3E635] hover:text-black transition-all cursor-pointer rounded-lg px-4 py-2 border-none text-[10px] font-black uppercase">
                                                {region}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Event Sidebar */}
                <div className="lg:col-span-12 xl:col-span-4 space-y-8">
                    <div className="flex items-center gap-3 px-2">
                        <Clock size={18} className="text-[#A3E635]" />
                        <h3 className="font-bold text-white uppercase tracking-widest text-[11px]">Today's Operations</h3>
                    </div>

                    <div className="space-y-4">
                        {events.map((event, idx) => (
                            <div key={event.id} className="bg-[#0D0F12] border border-white/5 p-6 rounded-[32px] hover:border-[#A3E635]/20 hover:bg-white/[0.02] transition-all group shadow-xl">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${event.color} shadow-[0_0_10px_rgba(163,230,53,0.5)]`} />
                                        <span className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em]">{event.time}</span>
                                    </div>
                                    <Badge className="bg-white/5 text-white/40 border-none rounded-lg text-[9px] font-black uppercase">{event.tags[0]}</Badge>
                                </div>
                                <h5 className="text-base font-bold text-white mb-2 group-hover:text-[#A3E635] transition-colors">{event.title}</h5>
                                <div className="flex items-center gap-2 text-white/30 text-xs">
                                    <MapPin size={12} className="text-[#A3E635]" />
                                    <span className="font-semibold">{event.location}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-8 bg-gradient-to-br from-[#1A1D23] to-[#0D0F12] border border-white/5 rounded-[40px] relative overflow-hidden group shadow-2xl mt-12">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-700">
                            <User size={100} className="text-[#A3E635]" />
                        </div>
                        <h4 className="text-xl font-black text-white mb-4 relative z-10">Personnel On-Site</h4>
                        <div className="space-y-4 relative z-10">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-white/20">
                                        <User size={18} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs font-bold text-white">Lead Engineer Group {i}</div>
                                        <div className="text-[10px] text-white/30 font-black uppercase">Active Deployment</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarPage;
