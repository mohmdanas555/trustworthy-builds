"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about", hasDropdown: true },
    { name: "Services", path: "/services", hasDropdown: true },
    { name: "Projects", path: "/projects", hasDropdown: true },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
];

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? "bg-white/80 backdrop-blur-lg shadow-xl py-3"
                : "bg-transparent py-5"}`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo - Matching Figma Logoipsum style */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-white p-1 rounded-full">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black">
                            <path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="currentColor" />
                            <path d="M16 25C20.9706 25 25 20.9706 25 16C25 11.0294 20.9706 7 16 7C11.0294 7 7 11.0294 7 16C7 20.9706 11.0294 25 16 25Z" fill="white" />
                            <circle cx="16" cy="16" r="4" fill="currentColor" />
                        </svg>
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className={`font-black text-2xl tracking-tighter transition-colors duration-500 ${isScrolled ? "text-black" : "text-white"}`}>
                            SAUD SHEHATHA
                        </span>
                        <span className={`font-bold text-sm tracking-[0.3em] transition-colors duration-500 ${isScrolled ? "text-black/60" : "text-white/60"}`}>
                            CONSTRUCTION
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav - Centered */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            href={link.path}
                            className={`text-[13px] font-bold transition-all duration-300 flex items-center gap-1 group relative ${isScrolled
                                ? pathname === link.path ? "text-primary" : "text-black/70 hover:text-black"
                                : pathname === link.path ? "text-white" : "text-white/80 hover:text-white"
                                }`}
                        >
                            {link.name}
                            {link.hasDropdown && <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Toggle */}
                <button
                    className={`lg:hidden p-2 rounded-xl transition-all ${isScrolled ? "bg-black/5 text-black hover:bg-black/10" : "bg-white/10 text-white hover:bg-white/20"}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="lg:hidden absolute top-full left-4 right-4 bg-white rounded-3xl shadow-2xl overflow-hidden border mt-4 p-6"
                    >
                        <nav className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`text-base font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-between ${pathname === link.path ? "bg-black text-white" : "text-black hover:bg-gray-50"
                                        }`}
                                >
                                    {link.name}
                                    {link.hasDropdown && <ChevronDown className="w-4 h-4 opacity-40" />}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
