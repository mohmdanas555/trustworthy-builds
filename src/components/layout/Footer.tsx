"use client";

import Link from "next/link";
import {
    Phone, Mail, MapPin, Facebook, Instagram, Linkedin,
    Twitter, Building2, ChevronRight, ArrowUpRight
} from "lucide-react";
import { useData } from "@/context/DataContext";

const Footer = () => {
    const { companyDetails } = useData();
    const { brandName, brandSubtitle, phone, email, address, facebook, instagram, linkedin, twitter } = companyDetails;

    return (
        <footer className="bg-[#0A0D10] text-white pt-32 pb-12 overflow-hidden relative">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">

                    {/* Brand Section */}
                    <div className="lg:col-span-4 space-y-10">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="bg-primary p-2.5 rounded-2xl text-black group-hover:rotate-6 transition-transform duration-500 shadow-[0_0_30px_rgba(252,211,77,0.3)]">
                                <Building2 className="w-8 h-8" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-black text-2xl tracking-tighter uppercase leading-none">
                                    SAUD SHEHATHA
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500 leading-none mt-2">
                                    CONSTRUCTION
                                </span>
                            </div>
                        </Link>
                        <p className="text-gray-400 text-lg leading-relaxed font-light max-w-sm">
                            Building excellence across the region for over 14 years. We specialize in luxury residential, commercial, and industrial infrastructure.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: Facebook, href: facebook, label: "Facebook" },
                                { icon: Twitter, href: twitter, label: "Twitter" },
                                { icon: Instagram, href: instagram, label: "Instagram" },
                                { icon: Linkedin, href: linkedin, label: "LinkedIn" }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-12 h-12 rounded-2xl border border-white/5 bg-white/5 flex items-center justify-center hover:bg-primary hover:text-black hover:border-primary transition-all duration-500 group shadow-lg"
                                >
                                    <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="lg:col-span-1" /> {/* Spacer */}

                    <div className="lg:col-span-2">
                        <h4 className="text-sm font-black mb-10 uppercase tracking-[0.2em] text-primary">Explore</h4>
                        <ul className="space-y-5">
                            {["Home", "About Us", "Services", "Portfolio", "Contact Us"].map((link) => (
                                <li key={link}>
                                    <Link
                                        href={link === "Home" ? "/" : `/${link.toLowerCase().replace(' ', '')}`}
                                        className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group text-sm font-bold"
                                    >
                                        <ChevronRight className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-all -ml-2 group-hover:ml-0" />
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h4 className="text-sm font-black mb-10 uppercase tracking-[0.2em] text-primary">Services</h4>
                        <ul className="space-y-5">
                            {["Architecture", "Infrastructure", "Civil Works", "Industrial", "Renovation"].map((link) => (
                                <li key={link}>
                                    <Link
                                        href="/services"
                                        className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group text-sm font-bold"
                                    >
                                        <ChevronRight className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-all -ml-2 group-hover:ml-0" />
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-3 space-y-10">
                        <h4 className="text-sm font-black mb-10 uppercase tracking-[0.2em] text-primary">Contact</h4>
                        <div className="space-y-8">
                            <div className="flex gap-5 items-start">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-primary/30 transition-colors">
                                    <MapPin className="text-primary w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Office</p>
                                    <p className="text-gray-300 text-sm leading-relaxed font-bold">{address}</p>
                                </div>
                            </div>
                            <div className="flex gap-5 items-center">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-primary/30 transition-colors">
                                    <Phone className="text-primary w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Call Us</p>
                                    <p className="text-gray-300 text-sm font-bold">{phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-12">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
                            © {new Date().getFullYear()} {brandName}. Handcrafted with precision.
                        </p>
                        <div className="flex gap-10">
                            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(item => (
                                <Link key={item} href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 hover:text-white transition-colors">
                                    {item}
                                </Link>
                            ))}
                        </div>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="bg-white/5 hover:bg-primary p-4 rounded-2xl transition-all group"
                        >
                            <ArrowUpRight className="w-5 h-5 text-primary group-hover:text-black group-hover:rotate-45 transition-all" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
