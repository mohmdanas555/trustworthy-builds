"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useData, FAQ } from "@/context/DataContext";
import { useToast } from "@/components/ui/use-toast";

export default function FAQManager() {
    const { faqs, addFAQ, updateFAQ, deleteFAQ } = useData();
    const { toast } = useToast();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<FAQ | null>(null);
    const [formData, setFormData] = useState<Omit<FAQ, "id">>({
        question: "", answer: "", order_index: 0
    });

    const handleOpenDialog = (item?: FAQ) => {
        if (item) {
            setEditingItem(item);
            setFormData({ ...item });
        } else {
            setEditingItem(null);
            setFormData({ question: "", answer: "", order_index: faqs.length });
        }
        setIsDialogOpen(true);
    };

    const handleSave = async () => {
        try {
            if (editingItem) {
                await updateFAQ({ ...formData, id: editingItem.id });
                toast({ title: "Updated", description: "FAQ successfully updated" });
            } else {
                await addFAQ(formData);
                toast({ title: "Added", description: "FAQ successfully added" });
            }
            setIsDialogOpen(false);
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to save FAQ" });
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm("Delete this FAQ?")) {
            await deleteFAQ(id);
            toast({ title: "Deleted" });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">FAQ Manager</h1>
                    <p className="text-muted-foreground">Answer common client questions.</p>
                </div>
                <Button onClick={() => handleOpenDialog()} className="bg-primary text-primary-foreground">
                    <Plus className="w-4 h-4 mr-2" /> Add Question
                </Button>
            </div>

            <div className="space-y-4">
                {faqs.map((item) => (
                    <Card key={item.id} className="border-none shadow-sm hover:shadow-md transition-shadow group">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start gap-4">
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-2 text-primary font-bold">
                                        <HelpCircle className="w-5 h-5" />
                                        <h3>{item.question}</h3>
                                    </div>
                                    <p className="text-gray-600 text-sm pl-7">{item.answer}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-600" onClick={() => handleOpenDialog(item)}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600" onClick={() => handleDelete(item.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingItem ? "Edit FAQ" : "New FAQ"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Question</label>
                            <Input value={formData.question} onChange={e => setFormData({ ...formData, question: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Answer</label>
                            <Textarea rows={4} value={formData.answer} onChange={e => setFormData({ ...formData, answer: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Sort Order</label>
                            <Input type="number" value={formData.order_index} onChange={e => setFormData({ ...formData, order_index: parseInt(e.target.value) })} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleSave} className="bg-primary text-primary-foreground">Save FAQ</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
