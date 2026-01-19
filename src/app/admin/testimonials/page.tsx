"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Quote, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useData, Testimonial } from "@/context/DataContext";
import { useToast } from "@/components/ui/use-toast";

export default function TestimonialsManager() {
    const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useData();
    const { toast } = useToast();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
    const [formData, setFormData] = useState<Omit<Testimonial, "id">>({
        client_name: "", role: "", content: "", image: "", rating: 5
    });

    const handleOpenDialog = (item?: Testimonial) => {
        if (item) {
            setEditingItem(item);
            setFormData({ ...item });
        } else {
            setEditingItem(null);
            setFormData({ client_name: "", role: "", content: "", image: "", rating: 5 });
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
            if (editingItem) {
                await updateTestimonial({ ...formData, id: editingItem.id });
                toast({ title: "Success", description: "Testimonial updated successfully" });
            } else {
                await addTestimonial(formData);
                toast({ title: "Success", description: "Testimonial added successfully" });
            }
            setIsDialogOpen(false);
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to save testimonial" });
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure?")) {
            await deleteTestimonial(id);
            toast({ title: "Deleted", description: "Testimonial removed" });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Testimonials</h1>
                    <p className="text-muted-foreground">What our customers love about us.</p>
                </div>
                <Button onClick={() => handleOpenDialog()} className="bg-primary text-primary-foreground">
                    <Plus className="w-4 h-4 mr-2" /> Add Story
                </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {testimonials.map((item) => (
                    <Card key={item.id} className="relative bg-white border-none shadow-md overflow-hidden flex flex-col">
                        <CardHeader className="flex flex-row items-center gap-4 p-4 border-b">
                            <img src={item.image} className="w-12 h-12 rounded-full object-cover border-2 border-primary/20" alt="" />
                            <div className="flex-1">
                                <CardTitle className="text-lg">{item.client_name}</CardTitle>
                                <p className="text-sm text-primary font-medium">{item.role}</p>
                            </div>
                            <div className="flex gap-1 bg-yellow-400/10 px-2 py-1 rounded">
                                {[...Array(item.rating)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                                ))}
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 flex-1">
                            <Quote className="w-8 h-8 text-primary/10 absolute top-12 right-6" />
                            <p className="text-gray-600 italic leading-relaxed font-light">"{item.content}"</p>
                        </CardContent>
                        <div className="p-4 bg-gray-50 flex justify-end gap-2 border-t">
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-600" onClick={() => handleOpenDialog(item)}>
                                <Pencil className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600" onClick={() => handleDelete(item.id)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>{editingItem ? "Edit Testimonial" : "Add New Story"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Client Name</label>
                                <Input value={formData.client_name} onChange={e => setFormData({ ...formData, client_name: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Role/Company</label>
                                <Input value={formData.role || ""} onChange={e => setFormData({ ...formData, role: e.target.value })} />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <label className="text-sm font-medium">Client Photo</label>
                            <div className="flex flex-col gap-4">
                                {formData.image && (
                                    <div className="relative w-24 h-24 rounded-full overflow-hidden border mx-auto">
                                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-0 right-0 h-6 w-6 rounded-full"
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
                            <label className="text-sm font-medium">Rating (1-5)</label>
                            <Input type="number" min="1" max="5" value={formData.rating} onChange={e => setFormData({ ...formData, rating: parseInt(e.target.value) })} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Testimonial Content</label>
                            <Textarea rows={4} value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleSave} className="bg-primary text-primary-foreground">Save Testimonial</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
