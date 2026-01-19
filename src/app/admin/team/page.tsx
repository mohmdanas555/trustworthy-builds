"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Camera, Linkedin, Twitter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useData, TeamMember } from "@/context/DataContext";
import { useToast } from "@/components/ui/use-toast";

export default function TeamManager() {
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
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Team Manager</h1>
                    <p className="text-muted-foreground">Manage your expert team profiles.</p>
                </div>
                <Button onClick={() => handleOpenDialog()} className="bg-primary text-primary-foreground">
                    <Plus className="w-4 h-4 mr-2" /> Add Member
                </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {team.map((member) => (
                    <Card key={member.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
                        <div className="aspect-[4/5] relative">
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                            <div className="absolute top-2 right-2 flex gap-2">
                                <Button size="icon" variant="secondary" className="h-8 w-8" onClick={() => handleOpenDialog(member)}>
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="destructive" className="h-8 w-8" onClick={() => handleDelete(member.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <CardHeader className="p-4">
                            <CardTitle className="text-xl">{member.name}</CardTitle>
                            <CardDescription className="text-primary font-medium">{member.role}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{member.bio}</p>
                            <div className="flex gap-4">
                                <a href={member.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a href={member.twitter} className="text-gray-400 hover:text-sky-400 transition-colors">
                                    <Twitter className="w-5 h-5" />
                                </a>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>{editingMember ? "Edit Team Member" : "Add Team Member"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Full Name</label>
                            <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Thomas Miller" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Role</label>
                            <Input value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} placeholder="e.g. Chief Architect" />
                        </div>
                        <div className="space-y-4">
                            <label className="text-sm font-medium">Profile Photo</label>
                            <div className="flex flex-col gap-4">
                                {formData.image && (
                                    <div className="relative w-32 h-32 rounded-xl overflow-hidden border mx-auto">
                                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-1 right-1 h-6 w-6"
                                            onClick={() => setFormData({ ...formData, image: "" })}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </div>
                                )}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase font-bold text-muted-foreground">Upload</label>
                                        <Input type="file" accept="image/*" onChange={handleImageUpload} className="cursor-pointer text-xs" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase font-bold text-muted-foreground">URL</label>
                                        <Input value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} placeholder="https://..." className="text-xs" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Bio</label>
                            <Textarea value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })} placeholder="Brief description..." />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-blue-600 flex items-center gap-2">
                                    <Linkedin className="w-4 h-4" /> LinkedIn
                                </label>
                                <Input value={formData.linkedin} onChange={e => setFormData({ ...formData, linkedin: e.target.value })} placeholder="#" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-sky-400 flex items-center gap-2">
                                    <Twitter className="w-4 h-4" /> Twitter
                                </label>
                                <Input value={formData.twitter} onChange={e => setFormData({ ...formData, twitter: e.target.value })} placeholder="#" />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleSave} className="bg-primary text-primary-foreground">Save Member</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
