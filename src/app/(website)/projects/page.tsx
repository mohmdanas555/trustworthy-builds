"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Filter, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/context/DataContext";

const categories = ["All", "Residential", "Commercial", "Industrial", "Renovation"];

const Projects = () => {
    const { projects, companyDetails } = useData();
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects = activeCategory === "All"
        ? projects
        : projects.filter((project) => project.category === activeCategory);

    return (
        <div className="bg-white">
            {/* 1. HERO SECTION */}
            <section className="relative pt-32 pb-20 bg-[#0A0D10] overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -mr-64 -mt-64" />
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full mb-8 font-black uppercase tracking-[0.2em] text-[10px]">
                            Our Portfolio
                        </Badge>
                        <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-10">
                            Featured <br />
                            <span className="text-primary italic">Developments.</span>
                        </h1>
                        <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl">
                            A collection of our most prestigious works, ranging from boutique residential
                            luxury to massive industrial infrastructure for global enterprises.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. PROJECTS GRID */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    {/* Category Filter - Premium Tabs */}
                    <div className="flex flex-wrap items-center gap-4 mb-20 border-b border-gray-100 pb-10">
                        <div className="flex items-center gap-3 mr-6 text-gray-400">
                            <Filter size={18} />
                            <span className="text-xs font-black uppercase tracking-widest">Filter By</span>
                        </div>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeCategory === category
                                    ? "bg-primary text-black shadow-lg scale-105"
                                    : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    key={project.id}
                                    className="group space-y-8"
                                >
                                    <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden relative shadow-2xl ring-1 ring-black/5 bg-gray-50">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                        />
                                        <div className="absolute top-8 left-8">
                                            <Badge className="bg-white/90 backdrop-blur-md text-black px-4 py-2 font-black uppercase tracking-widest text-[10px] rounded-2xl border-none">
                                                {project.category}
                                            </Badge>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-12">
                                            <Link href="/contact" className="bg-primary text-black w-14 h-14 rounded-2xl flex items-center justify-center translate-y-10 group-hover:translate-y-0 transition-transform duration-700 shadow-2xl">
                                                <ArrowUpRight size={24} />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="px-4">
                                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-primary mb-3">
                                            <span>{project.location}</span>
                                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                            <span className="text-gray-400">{project.year}</span>
                                        </div>
                                        <h3 className="text-3xl font-black text-black tracking-tight mb-4 group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-500 font-light text-sm line-clamp-2 leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* 3. CTA */}
            <section className="py-24 bg-[#F8FAFC]">
                <div className="container mx-auto px-6">
                    <div className="bg-white rounded-[4rem] p-16 md:p-24 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-xl border border-gray-100">
                        <div className="space-y-6 max-w-xl text-center lg:text-left">
                            <h2 className="text-5xl font-black text-black tracking-tighter leading-tight">
                                Want to See <br />
                                More Details?
                            </h2>
                            <p className="text-gray-400 text-lg font-light leading-relaxed">
                                Our private portfolio contains detailed engineering insights and structural
                                breakdowns of all projects shown here.
                            </p>
                        </div>
                        <Button className="h-16 px-12 rounded-full font-black uppercase tracking-widest text-xs bg-black hover:bg-primary hover:text-black transition-all shadow-xl group" asChild>
                            <Link href="/contact">
                                Request Private Access <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Projects;
