"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useData } from "@/context/DataContext";
import type { CompanyDetails } from "@/context/DataContext";

const CompanyManager = () => {
    const { companyDetails, updateCompanyDetails } = useData();
    const { toast } = useToast();
    const [formData, setFormData] = useState<CompanyDetails>(companyDetails);

    useEffect(() => {
        setFormData(companyDetails);
    }, [companyDetails]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateCompanyDetails(formData);
            toast({ title: "Company details updated successfully" });
        } catch (error) {
            console.error(error);
            toast({ variant: "destructive", title: "Failed to update details" });
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Company Info</h2>
                <p className="text-muted-foreground">
                    Manage global company details like contact info, social links, and site-wide stats.
                </p>
            </div>

            <form onSubmit={handleSave}>
                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Brand Identity</CardTitle>
                            <CardDescription>
                                Basic branding information displayed in the header and footer.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Brand Name</label>
                                <Input name="brandName" value={formData.brandName} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Subtitle</label>
                                <Input name="brandSubtitle" value={formData.brandSubtitle} onChange={handleChange} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Site Highlights & Stats</CardTitle>
                            <CardDescription>
                                Key numbers displayed in the homepage stats bar.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Years of Experience</label>
                                <Input name="yearsExperience" value={formData.yearsExperience} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Projects Built</label>
                                <Input name="projectsCompleted" value={formData.projectsCompleted} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Happy Clients %</label>
                                <Input name="happyClients" value={formData.happyClients} onChange={handleChange} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                            <CardDescription>
                                Details used in the Contact page and Footer.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Phone Number</label>
                                <Input name="phone" value={formData.phone} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email Address</label>
                                <Input name="email" value={formData.email} onChange={handleChange} />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium">Physical Address</label>
                                <Input name="address" value={formData.address} onChange={handleChange} />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium">Working Hours</label>
                                <Input name="workingHours" value={formData.workingHours} onChange={handleChange} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Social Media Links</CardTitle>
                            <CardDescription>
                                Links to your social media profiles.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Facebook</label>
                                <Input name="facebook" value={formData.facebook} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Instagram</label>
                                <Input name="instagram" value={formData.instagram} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">LinkedIn</label>
                                <Input name="linkedin" value={formData.linkedin} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Twitter (X)</label>
                                <Input name="twitter" value={formData.twitter} onChange={handleChange} />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-6 flex justify-end">
                    <Button type="submit" size="lg" className="bg-primary text-primary-foreground font-bold">
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CompanyManager;
