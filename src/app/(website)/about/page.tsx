"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Target, Eye, Shield, Clock, Award, Users, CheckCircle, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/context/DataContext";

const values = [
    {
        icon: Shield,
        title: "Safety First",
        description: "We prioritize the safety of our workers, clients, and the community in every project we undertake.",
    },
    {
        icon: Award,
        title: "Quality Excellence",
        description: "We use only premium materials and employ skilled craftsmen to deliver outstanding results.",
    },
    {
        icon: Clock,
        title: "On-Time Delivery",
        description: "We understand the importance of deadlines and commit to completing projects on schedule.",
    },
    {
        icon: Users,
        title: "Client Partnership",
        description: "We work closely with our clients, treating every project as a collaborative partnership.",
    },
];

const About = () => {
    const { companyDetails } = useData();
    const { brandName, brandSubtitle, yearsExperience } = companyDetails;

    return (
        <div className="bg-white">
            {/* 1. HERO SECTION - Premium Look */}
            <section className="relative pt-32 pb-24 overflow-hidden bg-[#0A0D10]">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -mr-32 -mt-32" />

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full mb-8 font-black uppercase tracking-[0.2em] text-[10px]">
                            About Saud Shehatha Construction
                        </Badge>
                        <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-10">
                            Building a Legacy of <br />
                            <span className="text-primary italic">Absolute Trust.</span>
                        </h1>
                        <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl">
                            With over {yearsExperience} of engineering excellence, Saud Shehatha Construction has
                            become the regional benchmark for premium infrastructure and residential development.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. OVERVIEW SECTION */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-20 items-center">
                        <div className="lg:col-span-6 order-2 lg:order-1">
                            <div className="relative">
                                <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl relative z-10 border border-gray-100">
                                    <img
                                        src="/images/about_1.png"
                                        alt="Construction Site"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {/* Background Accent */}
                                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/10 rounded-[3rem] -z-0" />
                            </div>
                        </div>

                        <div className="lg:col-span-6 space-y-10 order-1 lg:order-2">
                            <div className="space-y-6">
                                <Badge variant="outline" className="text-primary border-primary px-5 py-2 uppercase font-black tracking-[0.2em] text-[10px] rounded-full">Our Story</Badge>
                                <h2 className="text-5xl md:text-6xl font-black text-black leading-tight tracking-tighter">
                                    A Dedication to <br />
                                    <span className="text-gray-300 italic">Quality Craftsmanship.</span>
                                </h2>
                            </div>

                            <div className="space-y-6 text-gray-500 text-lg font-light leading-relaxed">
                                <p>
                                    Founded with a clear vision to redefine construction standards, Saud Shehatha Construction has evolved from a local firm into a powerhouse of engineering and design expertise.
                                </p>
                                <p>
                                    We combine traditional craftsmanship with futuristic technology to create spaces that inspire. Every project is a testament to our commitment to structural integrity and architectural beauty.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-8 pt-6">
                                {[
                                    { label: "Experience", value: yearsExperience },
                                    { label: "Completed Projects", value: companyDetails.projectsCompleted },
                                    { label: "Happy Clients", value: "5K+" },
                                    { label: "Engineers", value: "150+" }
                                ].map((stat, i) => (
                                    <div key={i} className="flex gap-4 items-center">
                                        <div className="text-4xl font-black text-black tracking-tighter">{stat.value}</div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-primary leading-tight">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. CORE VALUES - Premium Grid */}
            <section className="py-32 bg-[#F8FAFC]">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-24 space-y-6">
                        <Badge className="bg-black text-white px-6 py-2 rounded-full uppercase tracking-[0.2em] text-[10px] border-none">Our Principles</Badge>
                        <h2 className="text-5xl md:text-6xl font-black text-black leading-tight tracking-tighter">
                            What Drives Our Excellence
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-12 rounded-[3.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 group border border-gray-50"
                            >
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-black transition-all duration-500">
                                    <value.icon className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-black text-black mb-4 tracking-tight">{value.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed font-light">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. RELATED COMPANIES - Industrial Logo Cloud Style */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8">
                        <div className="space-y-4">
                            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1 rounded-full font-black uppercase tracking-[0.2em] text-[10px]">
                                Our Group
                            </Badge>
                            <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter uppercase">
                                Related Companies
                            </h2>
                        </div>
                        <p className="text-gray-400 font-medium max-w-sm text-right leading-relaxed italic">
                            "Synergizing expertise across diverse industries to deliver comprehensive solutions."
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {[
                            {
                                name: "Royal Arrow",
                                description: "Specializing in precision logistics and strategic supply chain management for large-scale operations.",
                                icon: Building2
                            },
                            {
                                name: "Royal Wooden",
                                description: "Premium architectural woodwork and bespoke interior solutions for luxury residential and commercial spaces.",
                                icon: Building2
                            }
                        ].map((company, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="group relative p-12 bg-gray-50 rounded-[4rem] border border-gray-100 hover:border-primary/30 transition-all duration-500 overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <company.icon size={120} />
                                </div>
                                <div className="relative z-10 space-y-6">
                                    <h3 className="text-3xl font-black text-black tracking-tighter uppercase">{company.name}</h3>
                                    <p className="text-gray-500 text-lg font-light leading-relaxed max-w-md">
                                        {company.description}
                                    </p>
                                    <div className="pt-4">
                                        <button className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-xs group-hover:gap-5 transition-all">
                                            Visit Website <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. CTA - Premium Footer CTA */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="bg-[#0A0D10] text-white rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden group shadow-2xl">
                        {/* Background Deco */}
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        <div className="relative z-10 space-y-10">
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                                Ready to Start Your <br />
                                <span className="text-primary italic">Next Project?</span>
                            </h2>
                            <p className="text-gray-400 max-w-2xl mx-auto text-xl font-light">
                                Connect with our expert team to discuss how we can bring your infrastructure vision to life with precision and care.
                            </p>
                            <Button size="lg" className="h-16 px-12 rounded-full font-black uppercase tracking-widest text-xs bg-primary text-black hover:bg-white hover:scale-105 transition-all" asChild>
                                <Link href="/contact">
                                    Speak With Our Team <ArrowRight className="w-5 h-5 ml-3" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
