"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X, Image as ImageIcon, MapPin, Calendar, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useData } from "@/context/DataContext";
import type { Project } from "@/context/DataContext";

const emptyProject = {
    title: "",
    category: "Residential",
    location: "",
    year: new Date().getFullYear().toString(),
    area: "",
    description: "",
    image: "https://images.unsplash.com/photo-1574362848149-11496d93e7c7?q=80&w=1984&auto=format&fit=crop",
};

const ProjectsManager = () => {
    const { projects, addProject, updateProject, deleteProject } = useData();
    const { toast } = useToast();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentProject, setCurrentProject] = useState<Partial<Project>>(emptyProject);
    const [isEditing, setIsEditing] = useState(false);

    const handleOpenDialog = (project?: Project) => {
        if (project) {
            setCurrentProject(project);
            setIsEditing(true);
        } else {
            setCurrentProject(emptyProject);
            setIsEditing(false);
        }
        setIsDialogOpen(true);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCurrentProject({ ...currentProject, image: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        try {
            if (isEditing && currentProject.id) {
                await updateProject(currentProject as Project);
                toast({ title: "Project updated", description: "The project has been saved successfully." });
            } else {
                await addProject(currentProject as Project);
                toast({ title: "Project added", description: "A new project has been added to your portfolio." });
            }
            setIsDialogOpen(false);
        } catch (error) {
            console.error(error);
            toast({ variant: "destructive", title: "Error saving project", description: "There was a problem saving the project." });
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
            await deleteProject(id);
            toast({ title: "Project deleted", variant: "destructive" });
        }
    };

    return (
        <div className="space-y-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black tracking-tighter uppercase mb-2">Projects</h2>
                    <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Manage your construction portfolio</p>
                </div>
                <Button
                    onClick={() => handleOpenDialog()}
                    className="bg-primary text-black hover:bg-white rounded-2xl px-6 h-12 font-black transition-all shadow-[0_0_20px_rgba(180,255,0,0.2)]"
                >
                    <Plus className="mr-2 h-5 w-5" /> Add New Project
                </Button>
            </div>

            {/* Content Grid - Premium Theme */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                    {projects.map((project, idx) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-white/[0.03] border border-white/5 rounded-[40px] overflow-hidden group hover:bg-white/[0.06] transition-all relative"
                        >
                            {/* Image Header */}
                            <div className="relative aspect-video overflow-hidden">
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0F] via-transparent to-transparent opacity-60" />
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button
                                        onClick={() => handleOpenDialog(project)}
                                        className="p-2.5 rounded-xl bg-black/40 backdrop-blur-md text-white/70 hover:text-primary transition-all hover:scale-110"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        className="p-2.5 rounded-xl bg-black/40 backdrop-blur-md text-white/70 hover:text-red-400 transition-all hover:scale-110"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <div className="absolute bottom-4 left-6">
                                    <Badge className="bg-primary text-black border-none font-black text-[10px] uppercase tracking-widest px-3 py-1">
                                        {project.category}
                                    </Badge>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="p-8 space-y-6">
                                <h3 className="text-xl font-bold tracking-tight line-clamp-1">{project.title}</h3>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2 text-white/40">
                                        <MapPin size={14} className="text-primary" />
                                        <span className="text-[11px] font-bold uppercase tracking-tight truncate">{project.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/40">
                                        <Calendar size={14} className="text-primary" />
                                        <span className="text-[11px] font-bold uppercase tracking-tight">{project.year}</span>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5 border-dashed">
                                    <p className="text-xs text-white/50 line-clamp-2 leading-relaxed font-medium">
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Add Project Card Placeholder */}
                <motion.div
                    onClick={() => handleOpenDialog()}
                    className="border-2 border-dashed border-white/5 rounded-[40px] flex flex-col items-center justify-center gap-4 group cursor-pointer hover:border-primary/20 transition-all min-h-[350px]"
                >
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary transition-all">
                        <Plus className="text-white/20 group-hover:text-black transition-all scale-125" />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/20 group-hover:text-primary transition-all">Add New Structure</span>
                </motion.div>
            </div>

            {/* Premium Dialog Interface */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[700px] bg-[#0A0C0F] border-white/10 text-white rounded-[40px] p-0 overflow-hidden">
                    <div className="p-10 space-y-8">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-black uppercase tracking-tighter">
                                {isEditing ? "Modify Project" : "New Portfolio Item"}
                            </DialogTitle>
                            <DialogDescription className="text-white/40 font-bold uppercase text-[10px] tracking-widest">
                                Structure & Engineering Specification
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Title</label>
                                    <Input
                                        className="bg-white/5 border-white/10 rounded-2xl h-14 focus:ring-primary focus:border-primary px-6"
                                        value={currentProject.title}
                                        onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                                        placeholder="Project name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Category</label>
                                    <Select
                                        value={currentProject.category}
                                        onValueChange={(val) => setCurrentProject({ ...currentProject, category: val })}
                                    >
                                        <SelectTrigger className="bg-white/5 border-white/10 rounded-2xl h-14 px-6">
                                            <SelectValue placeholder="Industry Sector" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#1A1D21] border-white/10 text-white">
                                            <SelectItem value="Residential">Residential</SelectItem>
                                            <SelectItem value="Commercial">Commercial</SelectItem>
                                            <SelectItem value="Industrial">Industrial</SelectItem>
                                            <SelectItem value="Renovation">Renovation</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Location</label>
                                    <Input
                                        className="bg-white/5 border-white/10 rounded-2xl h-14 px-6"
                                        value={currentProject.location}
                                        onChange={(e) => setCurrentProject({ ...currentProject, location: e.target.value })}
                                        placeholder="e.g. Dubai, UAE"
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Measurement (Sq. ft.)</label>
                                    <Input
                                        className="bg-white/5 border-white/10 rounded-2xl h-14 px-6"
                                        value={currentProject.area}
                                        onChange={(e) => setCurrentProject({ ...currentProject, area: e.target.value })}
                                        placeholder="Build area"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Year</label>
                                    <Input
                                        className="bg-white/5 border-white/10 rounded-2xl h-14 px-6"
                                        value={currentProject.year}
                                        onChange={(e) => setCurrentProject({ ...currentProject, year: e.target.value })}
                                        placeholder="2024"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Project Asset Image</label>
                                    <div className="flex items-center gap-6">
                                        <div className="w-24 h-24 rounded-[2rem] bg-white/5 border border-white/10 overflow-hidden flex-shrink-0 relative">
                                            {currentProject.image ? (
                                                <img src={currentProject.image} className="w-full h-full object-cover" alt="Preview" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-white/10">
                                                    <ImageIcon size={32} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="hidden"
                                                    id="project-image-upload"
                                                />
                                                <Button
                                                    asChild
                                                    className="w-full bg-white/5 hover:bg-primary hover:text-black border border-white/10 rounded-2xl h-14 font-black transition-all cursor-pointer"
                                                >
                                                    <label htmlFor="project-image-upload" className="flex items-center justify-center gap-2 cursor-pointer">
                                                        <ImageIcon size={20} />
                                                        Select from Gallery
                                                    </label>
                                                </Button>
                                            </div>
                                            <Input
                                                className="bg-white/5 border-white/10 rounded-xl h-10 px-4 text-[10px] focus:ring-primary opacity-50"
                                                value={currentProject.image}
                                                onChange={(e) => setCurrentProject({ ...currentProject, image: e.target.value })}
                                                placeholder="Or paste image URL..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Detailed Narrative</label>
                            <Textarea
                                className="bg-white/5 border-white/10 rounded-2xl px-6 py-4 focus:ring-primary min-h-[120px]"
                                value={currentProject.description}
                                onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                                placeholder="Tell the project story..."
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-12 px-8 font-bold text-white/40 hover:text-white">Discard</Button>
                            <Button onClick={handleSave} className="bg-primary text-black hover:bg-white rounded-xl h-12 px-10 font-black shadow-xl">
                                {isEditing ? "Update Asset" : "Deploy Project"}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ProjectsManager;
