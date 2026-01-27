"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Star, Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useData } from "@/context/DataContext";
import { Badge } from "@/components/ui/badge";
import { Pencil } from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from "@/components/ui/accordion";

const Home = () => {
  const {
    projects, services, team, faqs, companyDetails, isAdmin
  } = useData();

  const { brandName, brandSubtitle } = companyDetails;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. HERO SECTION - High-End Premium Refinement */}
      <section className="relative h-[100dvh] w-full flex items-end overflow-hidden bg-black pb-24">
        {/* Cinematic Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-70"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
          {/* Advanced Multi-layer Overlays - Adjusted for left alignment */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
        </div>

        <div className="container mx-auto px-4 relative z-10 flex items-end">
          <div className="flex flex-col items-start text-left mr-auto max-w-[90rem]">
            {/* Headline - Precision Typography with adjusted size to avoid overlap */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="space-y-0 text-left"
            >
              <h1 className="text-xl md:text-2xl lg:text-[24px] font-black text-white leading-[1.1] tracking-[-0.04em] uppercase drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                Precision <br />
                <span className="text-primary">Engineering</span> <br />
                <span className="text-white/95">& Masterful Builds.</span>
              </h1>
            </motion.div>

            {/* Premium Bio Block - More visibility and professional font size */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 group"
            >
              <div className="flex items-start gap-6 justify-start">
                <div className="max-w-xl text-left">
                  <h2 className="text-primary font-black text-xs md:text-sm uppercase tracking-tighter mb-2 shadow-primary/20 drop-shadow-sm">
                    SAUD SHEHATHA CONSTRUCTION
                  </h2>
                  <p className="text-[10px] md:text-[11px] text-white/70 font-medium leading-relaxed border-l border-primary/60 pl-3 italic">
                    A legacy construction firm defined by structural integrity. For over 15 years, we have translated complex architectural blueprints into enduring landmarks.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Integrated Action Module - Luxury styling */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-16 w-full max-w-xl"
            >
              <div className="relative flex items-center p-3 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[30px] hover:border-primary/40 transition-all shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] group">
                <div className="flex-1 flex items-center px-6">
                  <Mail className="text-white/20 w-5 h-5 mr-4 group-hover:text-primary transition-colors" />
                  <input
                    type="email"
                    placeholder="Request a technical consultation..."
                    className="bg-transparent border-none text-white placeholder:text-white/20 focus:ring-0 w-full font-bold h-14 text-sm text-left"
                  />
                </div>
                <Button className="h-16 px-12 rounded-[22px] bg-primary text-black font-black hover:bg-white hover:shadow-[0_0_30px_rgba(180,255,0,0.4)] transition-all text-xs uppercase tracking-widest leading-none">
                  Secure Access
                </Button>
              </div>
            </motion.div>


          </div>
        </div>


      </section>

      {/* 2. OVERVIEW SECTION */}
      <section className="py-40 bg-white" id="about">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-32 items-center">
          <div className="relative group">
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-[120px] group-hover:bg-primary/10 transition-colors" />
            <div className="grid grid-cols-2 gap-8 relative z-10 p-4">
              <motion.img
                whileHover={{ y: -20, rotate: -2 }}
                src="/images/about_1.png" className="rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] aspect-[3/4] object-cover mt-20 border-4 border-white" alt="Architecture"
              />
              <motion.img
                whileHover={{ y: -20, rotate: 2 }}
                src="/images/about_2.png" className="rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] aspect-[3/4] object-cover border-4 border-white" alt="Steel"
              />
            </div>
          </div>
          <div className="space-y-12">
            <div className="inline-flex items-center gap-4 bg-primary/5 p-4 pr-8 rounded-[20px] border border-primary/10">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <span className="font-black text-[11px] uppercase tracking-[0.3em] text-black/60">Architectural Heritage</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85]">
              Engineering Your <br />
              <span className="text-gray-200">Vision Into Reality.</span>
            </h2>
            <p className="text-gray-500 text-xl leading-relaxed max-w-xl font-medium">
              For over 14 years, we've delivered hundreds of successful projects across the region. Our commitment to safety and precision is our signature.
            </p>
            <div className="grid grid-cols-2 gap-16 py-12 border-y border-gray-100">
              <div>
                <div className="text-6xl font-black tracking-tighter leading-none">14+</div>
                <div className="text-[11px] font-black text-primary uppercase mt-4 tracking-widest">Founding Years</div>
              </div>
              <div>
                <div className="text-6xl font-black tracking-tighter leading-none">200+</div>
                <div className="text-[11px] font-black text-primary uppercase mt-4 tracking-widest">Build Assets</div>
              </div>
            </div>
            <Button size="lg" className="rounded-2xl h-20 px-16 font-black uppercase text-[12px] tracking-[0.3em] bg-black text-white hover:bg-primary hover:text-black transition-all shadow-2xl group" asChild>
              <Link href="/about" className="flex items-center gap-4">
                Strategic Analysis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION - High Fidelity Cards */}
      <section className="py-40 bg-gray-50" id="services">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-28 gap-8 border-b border-gray-200 pb-16">
            <div className="space-y-6">
              <Badge className="bg-black text-white p-3 px-6 rounded-xl font-black text-[10px] uppercase tracking-[0.4em]">Capability Matrix</Badge>
              <h2 className="text-6xl md:text-7xl font-black tracking-tighter uppercase leading-none">Core Engineering</h2>
            </div>
            <p className="text-gray-400 font-bold max-w-sm text-right text-lg italic leading-relaxed">"Deploying industrial-grade expertise for every blueprint we touch."</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {services.map((service, idx) => (
              <motion.div
                key={service.id}
                whileHover={{ y: -25 }}
                className="bg-white p-14 rounded-[5rem] border border-gray-100 hover:border-primary/40 transition-all group shadow-sm hover:shadow-[0_60px_100px_-30px_rgba(0,0,0,0.1)] relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-12 group-hover:bg-primary group-hover:text-black transition-all shadow-inner border border-gray-100">
                    <Building2 size={32} />
                  </div>
                  <h3 className="text-3xl font-black mb-8 uppercase tracking-[-0.02em] leading-tight">{service.title}</h3>
                  <p className="text-gray-400 text-base leading-relaxed mb-12 font-medium">{service.description}</p>
                  <Link
                    href={service.document_url || "/services"}
                    target={service.document_url ? "_blank" : "_self"}
                    className="font-black text-[11px] uppercase tracking-[0.3em] text-primary flex items-center gap-3 group-hover:gap-6 transition-all"
                  >
                    Technical Specs <ArrowRight size={18} />
                  </Link>
                </div>
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-all pointer-events-none">
                  <span className="text-[12rem] font-black italic">{idx + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TEAM SECTION */}
      <section className="py-40 bg-white" id="team">
        <div className="container mx-auto px-6 flex flex-col items-center text-center mb-32">
          <div className="w-1 h-20 bg-primary/20 mb-10" />
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6">The Engineers</h2>
          <p className="text-gray-400 font-bold uppercase tracking-[0.4em] text-xs">Strategic Leadership Protocol</p>
        </div>
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12 lg:gap-16">
          {team.map((member) => (
            <motion.div
              key={member.id}
              className="group cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <div className="aspect-[4/5] rounded-[4rem] overflow-hidden mb-10 border-8 border-gray-50 shadow-2xl relative">
                <img src={member.image || `/images/team_1.png`} className="w-full h-full object-cover grayscale-[0.6] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" alt={member.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-10 left-0 right-0 text-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
                  <span className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full text-white text-[10px] font-black uppercase tracking-widest border border-white/20">Executive Profile</span>
                </div>
              </div>
              <div>
                <h4 className="text-2xl font-black tracking-tighter mb-2">{member.name}</h4>
                <div className="flex items-center justify-between">
                  <p className="text-primary font-black text-[11px] uppercase tracking-[0.3em]">{member.role}</p>
                  {isAdmin && (
                    <Link
                      href="/admin/team"
                      className="flex items-center gap-2 text-black/40 hover:text-black transition-colors text-[10px] font-black uppercase tracking-widest border border-black/10 px-3 py-1 rounded-full"
                    >
                      <Pencil size={10} /> Edit
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4.5 OUR GROUP - Related Companies in Action */}
      <section className="py-40 bg-white overflow-hidden" id="group">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-32 gap-12 border-b border-gray-200 pb-16">
            <div className="space-y-6">
              <Badge className="bg-primary text-black p-3 px-6 rounded-xl font-black text-sm uppercase tracking-[0.4em]">Our Enterprise Group</Badge>
              <h2 className="text-6xl md:text-7xl font-black tracking-tighter uppercase leading-none">Related <br />Companies</h2>
            </div>
            <p className="text-gray-400 font-bold max-w-sm text-right text-lg italic leading-relaxed">"A unified ecosystem of engineering excellence and artisanal mastery."</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-32">
            {/* Royal Arrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl border-8 border-gray-50">
                <img src="/images/royal_arrow_worker.png" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt="Royal Arrow Electrical Division" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-black text-white p-12 rounded-[3.5rem] max-w-sm shadow-2xl border-4 border-primary/20 z-10 transition-transform group-hover:-translate-y-4 duration-500">
                <span className="text-primary font-black text-base uppercase tracking-[0.2em] block mb-4">Royal Arrow Division</span>
                <h4 className="text-3xl font-black uppercase mb-4 tracking-tighter">Electrical Engineering</h4>
                <p className="text-white/50 text-sm font-medium leading-relaxed mb-6">Expert electrical works encompassing high-voltage systems and professional maintenance for industrial builds.</p>
                <Button variant="outline" className="w-full rounded-2xl border-primary/20 text-primary hover:bg-primary hover:text-black font-black uppercase text-[10px] tracking-widest h-14">
                  Explore Division <ArrowRight className="ml-3 w-4 h-4" />
                </Button>
              </div>
            </motion.div>

            {/* Royal Wooden */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative mt-40"
            >
              <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl border-8 border-gray-50">
                <img src="/images/royal_wooden_worker.png" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt="Royal Wooden Joinery Division" />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-black text-white p-12 rounded-[3.5rem] max-w-sm shadow-2xl border-4 border-primary/20 z-10 transition-transform group-hover:-translate-y-4 duration-500">
                <span className="text-primary font-black text-base uppercase tracking-[0.2em] block mb-4">Royal Wooden Division</span>
                <h4 className="text-3xl font-black uppercase mb-4 tracking-tighter">Artisan Joinery</h4>
                <p className="text-white/50 text-sm font-medium leading-relaxed mb-6">Crafting legacy doors and bespoke cabinets with traditional mastery and futuristic design.</p>
                <Button variant="outline" className="w-full rounded-2xl border-primary/20 text-primary hover:bg-primary hover:text-black font-black uppercase text-[10px] tracking-widest h-14">
                  Explore Division <ArrowRight className="ml-3 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION - Industrial Refinement */}
      <section className="py-20 px-6">
        <div className="container mx-auto bg-black rounded-[6rem] p-24 md:p-40 text-center text-white space-y-16 relative overflow-hidden shadow-[0_80px_150px_-30px_rgba(0,0,0,1)] border border-white/10">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,white_0%,transparent_70%)] opacity-30" />
          </div>
          <h2 className="text-6xl md:text-[10rem] font-black tracking-tighter uppercase leading-[0.8] relative z-10 text-white/95">
            Build The <br /> Future.
          </h2>
          <p className="text-white/30 max-w-2xl mx-auto font-bold text-xl uppercase tracking-[0.5em] leading-relaxed relative z-10 italic">"Blueprints built with precision."</p>
          <div className="relative z-10 pt-10">
            <Button className="rounded-3xl bg-primary text-black h-24 px-24 text-[13px] font-black uppercase tracking-[0.4em] hover:bg-white transition-all shadow-2xl hover:scale-110 active:scale-95 group">
              Start Consultation <ArrowRight size={24} className="ml-6 group-hover:translate-x-4 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="py-40 bg-white" id="faqs">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex items-center gap-10 mb-24">
            <div className="h-[2px] flex-1 bg-gray-100" />
            <h2 className="text-4xl font-black tracking-tighter uppercase whitespace-nowrap">Inquiry Framework</h2>
            <div className="h-[2px] flex-1 bg-gray-100" />
          </div>
          <Accordion type="single" collapsible className="space-y-8">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.id} value={`item-${i}`} className="border-4 border-gray-50 rounded-[4rem] px-16 data-[state=open]:border-primary/20 transition-all shadow-sm hover:shadow-md">
                <AccordionTrigger className="text-2xl font-black uppercase tracking-tight py-14 hover:no-underline text-left group">
                  <span className="flex items-center gap-8">
                    <span className="text-primary/20 font-black text-6xl group-data-[state=open]:text-primary transition-colors">0{i + 1}</span>
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-14 text-xl font-medium leading-relaxed pl-24">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default Home;
