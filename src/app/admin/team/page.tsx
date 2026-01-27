"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Camera, Linkedin, Twitter, X, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useData, TeamMember } from "@/context/DataContext";
import { useToast } from "@/components/ui/use-toast";

const TeamManager = () => {
    const { team, addTeamMember, updateTeamMember, deleteTeamMember } = useData();
    const { toast } = useToast();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
    const [formData, setFormData] = useState<Omit<TeamMember, "id">>({
        name: "", role: "", image: "", bio: "", linkedin: "#", twitter: "#"
    });

    const handleOpenDialog = (member?: TeamMember) => {
        if (member) {
            setEditingMember(member);
            setFormData({ ...member });
        } else {
            setEditingMember(null);
            setFormData({ name: "", role: "", image: "", bio: "", linkedin: "#", twitter: "#" });
        }
        setIsDialogOpen(true);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        try {
            if (editingMember) {
                await updateTeamMember({ ...formData, id: editingMember.id });
                toast({ title: "Success", description: "Team member updated successfully" });
            } else {
                await addTeamMember(formData);
                toast({ title: "Success", description: "Team member added successfully" });
            }
            setIsDialogOpen(false);
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to save team member" });
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to remove this team member?")) {
            await deleteTeamMember(id);
            toast({ title: "Deleted", description: "Team member removed" });
        }
    };

    return (
        <div className="space-y-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight mb-1 text-white">Personnel Management</h2>
                    <div className="flex items-center gap-2 text-white/40 text-sm font-bold uppercase tracking-widest">
                        <Users size={14} className="text-[#A3E635]" />
                        <span>Core Engineering & Executive Team</span>
                    </div>
                </div>
                <Button
                    onClick={() => handleOpenDialog()}
                    className="bg-[#A3E635] text-black hover:bg-white rounded-xl px-6 h-11 font-black transition-all shadow-[0_4px_20px_rgba(163,230,53,0.3)]"
                >
                    <Plus className="w-5 h-5 mr-2" /> Add Member
                </Button>
            </div>

            {/* Team Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {team.map((member, idx) => (
                    <div
                        key={member.id}
                        className="bg-[#0D0F12] border border-white/5 rounded-[32px] overflow-hidden group hover:border-[#A3E635]/20 transition-all shadow-xl"
                    >
                        <div className="aspect-[4/5] relative overflow-hidden">
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0F] via-transparent to-transparent opacity-60" />

                            {/* Action Overlay */}
                            <div className="absolute top-4 right-4 flex gap-2 transition-opacity z-20">
                                <Button size="icon" className="h-9 w-9 bg-black/60 backdrop-blur-md hover:bg-[#A3E635] hover:text-black rounded-xl border border-white/20 shadow-xl" onClick={() => handleOpenDialog(member)}>
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button size="icon" className="h-9 w-9 bg-black/60 backdrop-blur-md hover:bg-red-500 rounded-xl border border-white/20 shadow-xl" onClick={() => handleDelete(member.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                                <p className="text-[#A3E635] text-xs font-black uppercase tracking-widest">{member.role}</p>
                            </div>

                            <p className="text-sm text-white/40 line-clamp-2 leading-relaxed font-medium italic">"{member.bio}"</p>

                            <div className="flex gap-4 pt-4 border-t border-white/5">
                                <a href={member.linkedin} className="text-white/20 hover:text-[#A3E635] transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a href={member.twitter} className="text-white/20 hover:text-[#A3E635] transition-colors">
                                    <Twitter className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Skeleton Add Member */}
                <div
                    onClick={() => handleOpenDialog()}
                    className="border-2 border-dashed border-white/5 rounded-[32px] flex flex-col items-center justify-center gap-4 group cursor-pointer hover:border-[#A3E635]/20 transition-all min-h-[300px]"
                >
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-[#A3E635] transition-all">
                        <Plus className="text-white/20 group-hover:text-black transition-all scale-125" />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-white/20 group-hover:text-[#A3E635] transition-all">Recruit New Profile</span>
                </div>
            </div>

            {/* Premium Dialog Interface */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[500px] bg-[#0A0C0F] border-white/10 text-white rounded-[40px] p-0 overflow-hidden">
                    <div className="p-10 space-y-8">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black uppercase tracking-tighter">
                                {editingMember ? "Personnel Modification" : "New Team Recruitment"}
                            </DialogTitle>
                            <div className="text-white/40 font-bold uppercase text-[10px] tracking-widest mt-2 flex items-center gap-2">
                                <Sparkles size={12} className="text-[#A3E635]" />
                                <span>Core Engineering Access Level</span>
                            </div>
                        </DialogHeader>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Identity Name</label>
                                <Input
                                    className="bg-white/5 border-white/10 rounded-2xl h-14 px-6 focus:ring-[#A3E635]/20"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Thomas Miller"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Structural Role</label>
                                <Input
                                    className="bg-white/5 border-white/10 rounded-2xl h-14 px-6 focus:ring-[#A3E635]/20"
                                    value={formData.role}
                                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                                    placeholder="Lead Architect"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Digital Asset Link (Image)</label>
                                <Input
                                    className="bg-white/5 border-white/10 rounded-2xl h-14 px-6 focus:ring-[#A3E635]/20"
                                    value={formData.image}
                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                    placeholder="https://..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Professional Brief</label>
                                <Textarea
                                    className="bg-white/5 border-white/10 rounded-2xl px-6 py-4 min-h-[100px] focus:ring-[#A3E635]/20"
                                    value={formData.bio}
                                    onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                    placeholder="Brief description of expertise..."
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-12 px-8 font-bold text-white/40 hover:text-white">Discard</Button>
                            <Button onClick={handleSave} className="bg-[#A3E635] text-black hover:bg-white rounded-xl h-12 px-10 font-black shadow-xl">
                                {editingMember ? "Apply Changes" : "Deploy Profile"}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TeamManager;
