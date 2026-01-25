"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, CheckCircle2, Building2, Hammer, Layout, Factory } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useData } from "@/context/DataContext";
import type { Service } from "@/context/DataContext";

const emptyService = {
    title: "",
    icon: "Building2",
    description: "",
    features: [] as string[],
    document_url: "",
};

const ServicesManager = () => {
    const { services, addService, updateService, deleteService } = useData();
    const { toast } = useToast();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentService, setCurrentService] = useState<Partial<Service>>(emptyService);
    const [isEditing, setIsEditing] = useState(false);
    const [featuresInput, setFeaturesInput] = useState("");

    const handleOpenDialog = (service?: Service) => {
        if (service) {
            setCurrentService(service);
            setFeaturesInput(service.features.join(", "));
            setIsEditing(true);
        } else {
            setCurrentService(emptyService);
            setFeaturesInput("");
            setIsEditing(false);
        }
        setIsDialogOpen(true);
    };

    const handleSave = async () => {
        try {
            const serviceToSave = {
                ...currentService,
                features: featuresInput.split(",").map(f => f.trim()).filter(f => f !== ""),
            };

            if (isEditing && currentService.id) {
                await updateService(serviceToSave as Service);
                toast({ title: "Service optimized", description: "Successfully updated the service offering." });
            } else {
                await addService(serviceToSave as Service);
                toast({ title: "Service deployed", description: "A new service capability has been added." });
            }
            setIsDialogOpen(false);
        } catch (error) {
            console.error(error);
            toast({ variant: "destructive", title: "Deployment failed", description: "Error updating services." });
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm("Decommission this service? This will remove it from the public portfolio.")) {
            await deleteService(id);
            toast({ title: "Service decommissioned", variant: "destructive" });
        }
    };

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black tracking-tighter uppercase mb-2">Services</h2>
                    <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Engineering & Operational Capabilities</p>
                </div>
                <Button
                    onClick={() => handleOpenDialog()}
                    className="bg-primary text-black hover:bg-white rounded-2xl px-6 h-12 font-black transition-all shadow-[0_0_20px_rgba(180,255,0,0.2)]"
                >
                    <Plus className="mr-2 h-5 w-5" /> Add Capability
                </Button>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                    {services.map((service, idx) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-white/[0.03] border border-white/5 rounded-[40px] p-10 hover:bg-white/[0.06] transition-all group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-all">
                                <span className="text-8xl font-black italic">{idx + 1}</span>
                            </div>

                            <div className="flex justify-between items-start mb-10">
                                <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center text-primary shadow-xl group-hover:bg-primary group-hover:text-black transition-all">
                                    <Building2 size={24} />
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleOpenDialog(service)} className="p-2 text-white/20 hover:text-white transition-colors">
                                        <Pencil size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(service.id!)} className="p-2 text-white/20 hover:text-red-400 transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">{service.title}</h3>
                            <p className="text-white/40 text-xs leading-relaxed mb-8 font-medium">
                                {service.description}
                            </p>

                            <div className="space-y-3 pt-6 border-t border-white/5">
                                {service.features.slice(0, 3).map((feature, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-primary" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                <motion.div
                    onClick={() => handleOpenDialog()}
                    className="border-2 border-dashed border-white/5 rounded-[40px] flex flex-col items-center justify-center gap-4 group cursor-pointer hover:border-primary/20 transition-all min-h-[300px]"
                >
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary transition-all">
                        <Plus className="text-white/20 group-hover:text-black transition-all scale-125" />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/20 group-hover:text-primary transition-all">New Service Line</span>
                </motion.div>
            </div>

            {/* Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[600px] bg-[#0A0C0F] border-white/10 text-white rounded-[40px] p-10">
                    <DialogHeader className="mb-8">
                        <DialogTitle className="text-3xl font-black uppercase tracking-tighter">
                            {isEditing ? "Optimization" : "Capability Launch"}
                        </DialogTitle>
                        <DialogDescription className="text-white/40 font-bold uppercase text-[10px] tracking-widest">
                            Service Parameters & Technical Specs
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Title</label>
                                <Input
                                    className="bg-white/5 border-white/10 rounded-2xl h-14 px-6"
                                    value={currentService.title}
                                    onChange={(e) => setCurrentService({ ...currentService, title: e.target.value })}
                                    placeholder="Service Name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Logic Icon</label>
                                <Input
                                    className="bg-white/5 border-white/10 rounded-2xl h-14 px-6"
                                    value={currentService.icon}
                                    onChange={(e) => setCurrentService({ ...currentService, icon: e.target.value })}
                                    placeholder="Building2, Hammer, etc"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Description</label>
                            <Textarea
                                className="bg-white/5 border-white/10 rounded-2xl px-6 py-4 min-h-[100px]"
                                value={currentService.description}
                                onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
                                placeholder="Core offering details..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Features (Comma Separated)</label>
                            <Textarea
                                className="bg-white/5 border-white/10 rounded-2xl px-6 py-4 min-h-[100px]"
                                value={featuresInput}
                                onChange={(e) => setFeaturesInput(e.target.value)}
                                placeholder="Precision, Structural, Safety..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Technical Document URL (PDF)</label>
                            <Input
                                className="bg-white/5 border-white/10 rounded-2xl h-14 px-6"
                                value={currentService.document_url}
                                onChange={(e) => setCurrentService({ ...currentService, document_url: e.target.value })}
                                placeholder="https://example.com/specs.pdf"
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-6">
                            <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-12 px-8 font-bold text-white/40">Abort</Button>
                            <Button onClick={handleSave} className="bg-primary text-black hover:bg-white rounded-xl h-12 px-10 font-black">
                                Deploy Capability
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ServicesManager;
