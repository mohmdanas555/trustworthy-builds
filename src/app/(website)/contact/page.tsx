"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast"; // assuming use-toast is provided or mocked
import { useData } from "@/context/DataContext";

const Contact = () => {
    const { companyDetails, addQuote } = useData();
    const { toast } = useToast();

    const contactInfo = [
        {
            icon: Phone,
            title: "Phone",
            details: companyDetails.phone,
            link: `tel:${companyDetails.phone.replace(/[^0-9]/g, "")}`,
        },
        {
            icon: Mail,
            title: "Email",
            details: companyDetails.email,
            link: `mailto:${companyDetails.email}`,
        },
        {
            icon: MapPin,
            title: "Address",
            details: companyDetails.address,
            link: "#",
        },
        {
            icon: Clock,
            title: "Working Hours",
            details: companyDetails.workingHours,
            link: "#",
        },
    ];

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await addQuote(formData);
            toast({
                title: "Message Sent!",
                description: "We'll get back to you as soon as possible.",
            });
            setFormData({ name: "", email: "", phone: "", message: "" });
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to send message. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Hero Section */}
            <section className="relative py-24 bg-primary">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl">
                        <span className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-semibold mb-6 animate-fade-up">
                            Get in Touch
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-up animation-delay-100">
                            Contact Us
                        </h1>
                        <p className="text-lg text-primary-foreground/80 animate-fade-up animation-delay-200">
                            Ready to start your project? Have questions? We'd love to hear from you.
                            Reach out and let's discuss how we can help.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="bg-card rounded-xl p-8 shadow-card animate-fade-up">
                            <h2 className="text-2xl font-bold text-foreground mb-2">
                                Send Us a Message
                            </h2>
                            <p className="text-muted-foreground mb-6">
                                Fill out the form below and we'll get back to you within 24 hours.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                                            Full Name *
                                        </label>
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="h-12"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                                            Phone Number
                                        </label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            placeholder="(123) 456-7890"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="h-12"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                        Email Address *
                                    </label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="h-12"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                                        Your Message *
                                    </label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        placeholder="Tell us about your project..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="resize-none"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    variant="default"
                                    size="lg"
                                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        "Sending..."
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="w-4 h-4 ml-2" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-8 animate-slide-left">
                            <div>
                                <h2 className="text-2xl font-bold text-foreground mb-2">
                                    Contact Information
                                </h2>
                                <p className="text-muted-foreground">
                                    Reach out through any of these channels, or visit our office.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                {contactInfo.map((info) => (
                                    <a
                                        key={info.title}
                                        href={info.link}
                                        className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 group"
                                    >
                                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                                            <info.icon className="w-6 h-6 text-primary group-hover:text-accent-foreground transition-colors" />
                                        </div>
                                        <h3 className="font-bold text-foreground mb-1">{info.title}</h3>
                                        <p className="text-muted-foreground text-sm">{info.details}</p>
                                    </a>
                                ))}
                            </div>

                            {/* Map Placeholder */}
                            <div className="bg-muted rounded-xl overflow-hidden h-64 relative">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095919364!2d-74.00425878428698!3d40.74076794379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sus!4v1635186714566!5m2!1sen!2sus"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Saud Shehatha Construction Office Location"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-muted">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                            Common Questions
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {[
                            {
                                q: "How do I get started with my project?",
                                a: "Simply contact us through the form above or give us a call. We'll schedule a free consultation to discuss your needs and provide an initial assessment.",
                            },
                            {
                                q: "What is your typical project timeline?",
                                a: "Project timelines vary based on scope and complexity. During our initial consultation, we'll provide a detailed timeline specific to your project.",
                            },
                            {
                                q: "Do you provide warranties on your work?",
                                a: "Yes, we offer a comprehensive 10-year warranty on all our construction projects, covering workmanship and structural integrity.",
                            },
                            {
                                q: "Are you licensed and insured?",
                                a: "Absolutely. Saud Shehatha Construction is fully licensed, bonded, and insured. We maintain all required certifications and carry comprehensive liability coverage.",
                            },
                        ].map((faq, index) => (
                            <div
                                key={index}
                                className="bg-card rounded-xl p-6 shadow-card animate-fade-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <h3 className="font-bold text-foreground mb-2">{faq.q}</h3>
                                <p className="text-muted-foreground text-sm">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
