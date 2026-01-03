import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, MapPin, Phone, HardHat, Ruler, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import heroImage from "@/assets/hero-construction.jpg";
import projectResidential from "@/assets/project-residential.jpg";
import projectCommercial from "@/assets/project-commercial.jpg";
import projectRenovation from "@/assets/project-renovation.jpg";

const collections = [
  {
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
    title: "G+1 Commercial Al Jurf",
    type: "Commercial",
    location: "Al Jurf 1, Ajman",
  },
  {
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070",
    title: "Logistics Warehouse",
    type: "Industrial",
    location: "Al Jurf 1, Ajman",
  },
  {
    image: "https://images.unsplash.com/photo-1574362848149-11496d93e7c7?q=80&w=1984&auto=format&fit=crop",
    title: "G+15 Residential Tower",
    type: "Residential",
    location: "Al Khan, Sharjah",
  }
];

const ConstructionView = () => (
  <div className="animate-fade-in">
    {/* Construction Hero */}
    <section className="relative h-[90vh] w-full overflow-hidden flex items-center">
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://videos.pexels.com/video-files/2040081/2040081-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-3xl space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="p-2 bg-yellow-500 rounded text-black font-bold">
              <HardHat className="w-6 h-6" />
            </span>
            <span className="text-yellow-500 font-bold tracking-widest uppercase text-sm">
              Construction Division
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-none">
            SAUD SHEHATHA <br />
            <span className="text-gray-400">CONSTRUCTION LLC</span>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl border-l-4 border-yellow-500 pl-6">
            The exclusive construction arm delivering the vision of Malak Al Reem.
            Precision engineering, safety first, and 14+ years of excellence.
          </p>

          <div className="pt-6 grid grid-cols-2 gap-8 max-w-md">
            <div>
              <div className="text-4xl font-bold text-yellow-500">12</div>
              <div className="text-sm text-gray-400">Own Properties Built</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-500">14+</div>
              <div className="text-sm text-gray-400">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Core Competencies */}
    <section className="py-24 bg-zinc-900 text-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Ruler, title: "Precision Engineering", desc: "Advanced structural planning and execution for high-rise developments." },
            { icon: ShieldCheck, title: "Safety Protocol", desc: "Rigorous safety standards protecting our team and your property." },
            { icon: Truck, title: "Modern Fleet", desc: "State-of-the-art machinery and logistics for efficient delivery." }
          ].map((item, idx) => (
            <div key={idx} className="bg-zinc-800/50 p-8 border border-white/5 hover:border-yellow-500/50 transition-colors">
              <item.icon className="w-10 h-10 text-yellow-500 mb-6" />
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Project Showcase Strip */}
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-12 flex items-end justify-between">
          <span>Our Build Portfolio</span>
          <span className="text-sm text-yellow-500 font-normal uppercase tracking-wider">12 Key Projects</span>
        </h2>

        <div className="grid md:grid-cols-4 gap-4">
          {collections.map((item, idx) => (
            <div key={idx} className="relative group overflow-hidden h-80 grayscale hover:grayscale-0 transition-all duration-500">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-transparent transition-colors" />
              <div className="absolute bottom-4 left-4">
                <div className="text-yellow-500 text-xs font-bold uppercase mb-1">Completed</div>
                <h4 className="text-white font-bold">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Location Footer - Construction */}
    <section className="py-16 bg-yellow-500 text-black">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-2">Construction HQ</h3>
          <p className="font-medium">Smart Heights Building, 7th Floor</p>
          <p>Barsha Heights, Dubai</p>
        </div>
        <Button className="bg-black text-white px-8 py-6 text-lg hover:bg-zinc-800 border-none">
          Contact Construction Dept.
        </Button>
      </div>
    </section>
  </div>
);

const RealEstateView = () => (
  <div className="animate-fade-in">
    {/* Immersive Hero Section - DAMAC Style */}
    <section className="relative h-[90vh] w-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover scale-105"
        poster={heroImage}
      >
        <source src="https://cdn.pixabay.com/video/2016/09/21/5189-183786483_large.mp4" type="video/mp4" />
      </video>

      {/* Luxury Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />

      <div className="relative z-10 h-full container mx-auto px-6 flex flex-col justify-center">
        <div className="max-w-4xl space-y-6 animate-fade-up">
          <h2 className="text-secondary tracking-[0.2em] font-medium text-sm md:text-base uppercase mb-2">
            Defining The Skyline Since 2010
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-none tracking-tight">
            MALAK AL REEM <br />
            <span className="text-accent italic font-light font-serif">Real Estate</span>
          </h1>
          <div className="border-l-2 border-accent pl-6 mt-8">
            <h2 className="text-xl md:text-2xl text-white font-light tracking-wide mb-2">
              BUY • SELL • RENT
            </h2>
            <p className="text-lg text-gray-300 font-light max-w-xl">
              Exclusive own properties developed by <span className="text-white font-medium">Saud Shehatha Construction LLC</span>.
            </p>
          </div>

          <div className="pt-8 flex flex-col md:flex-row gap-4">
            <Button className="bg-accent text-accent-foreground hover:bg-white hover:text-black border-none rounded-none px-8 py-6 text-sm tracking-widest uppercase transition-all duration-300">
              <Link to="/projects">View Collections</Link>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black rounded-none px-8 py-6 text-sm tracking-widest uppercase transition-all duration-300 bg-transparent">
              <Link to="/contact">Book a Consultation</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
        <span className="text-[10px] uppercase tracking-widest">Scroll to Explore</span>
      </div>
    </section>

    {/* The Collections Grid - DAMAC Style */}
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h3 className="text-accent text-sm tracking-[0.3em] uppercase mb-4">Our Portfolio</h3>
            <h2 className="text-4xl font-bold text-primary">Signature Developments</h2>
            <p className="text-muted-foreground mt-4 max-w-lg">
              Experience the pinnacle of luxury in our own developments, meticulously constructed by
              <span className="text-primary font-semibold"> Saud Shehatha Construction LLC</span>.
            </p>
          </div>
          <Link to="/projects" className="hidden md:flex items-center gap-2 text-primary hover:text-accent transition-colors">
            <span className="text-sm tracking-widest uppercase">View All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-12">
          {/* Project 1: G+1 Commercial */}
          <div className="flex flex-col md:flex-row h-auto md:h-[500px] w-full shadow-2xl animate-fade-up">
            <div className="md:w-1/2 h-64 md:h-full relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
                alt="G+1 Commercial Project"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="md:w-1/2 bg-[#2C333D] p-8 md:p-12 text-white flex flex-col justify-center relative">
              <button onClick={() => { }} className="absolute top-6 right-6 text-gray-400 hover:text-white"><ArrowRight className="w-6 h-6" /></button>

              <h3 className="text-5xl font-bold text-[#F0B90B] mb-2">G+1</h3>
              <div className="flex items-center gap-2 text-gray-400 mb-6 text-sm uppercase tracking-widest">
                <MapPin className="w-4 h-4 text-[#F0B90B]" />
                Al Jurf 1, Ajman
              </div>

              <div className="border-t border-gray-600 w-12 mb-6"></div>

              <h4 className="text-2xl font-serif text-gray-200 mb-6">
                19 SHOWROOMS / 20 OFFICES / 50 STAFF ACCOMMODATION
              </h4>

              <ul className="space-y-3 text-sm text-gray-300 font-light mb-8">
                <li className="flex items-start gap-2">• <span className="opacity-90">5 mins to Ajman China Mall, Ajman Car Souq</span></li>
                <li className="flex items-start gap-2">• <span className="opacity-90">10 mins to Al Hamriya Freezone</span></li>
                <li className="flex items-start gap-2">• <span className="opacity-90">Easy access to MBZ Road and Al Ittihad Road</span></li>
              </ul>

              <div className="mt-auto pt-6 border-t border-gray-600/50">
                <span className="text-[#F0B90B] uppercase tracking-widest font-serif text-lg">Commercial Project</span>
              </div>
            </div>
          </div>

          {/* Project 2: Warehouse */}
          <div className="flex flex-col md:flex-row h-auto md:h-[500px] w-full shadow-2xl animate-fade-up animation-delay-200">
            <div className="md:w-1/2 md:order-2 h-64 md:h-full relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070"
                alt="Warehouse Project"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="md:w-1/2 md:order-1 bg-[#2C333D] p-8 md:p-12 text-white flex flex-col justify-center relative">
              <h3 className="text-4xl font-bold text-[#F0B90B] mb-2">WAREHOUSE</h3>
              <div className="flex items-center gap-2 text-gray-400 mb-6 text-sm uppercase tracking-widest">
                <MapPin className="w-4 h-4 text-[#F0B90B]" />
                Al Jurf 1, Ajman
              </div>

              <div className="border-t border-gray-600 w-12 mb-6"></div>

              <h4 className="text-2xl font-serif text-gray-200 mb-6">
                7 SHEDS + 1 SERVICE BLOCK
              </h4>

              <ul className="space-y-3 text-sm text-gray-300 font-light mb-8">
                <li className="flex items-start gap-2">• <span className="opacity-90">Strategic logistics location</span></li>
                <li className="flex items-start gap-2">• <span className="opacity-90">High ceiling specifications</span></li>
                <li className="flex items-start gap-2">• <span className="opacity-90">Loading/Unloading bays available</span></li>
              </ul>

              <div className="mt-auto pt-6 border-t border-gray-600/50">
                <span className="text-[#F0B90B] uppercase tracking-widest font-serif text-lg">Commercial Project</span>
              </div>
            </div>
          </div>

          {/* Project 3: G+15 Residential */}
          <div className="flex flex-col md:flex-row h-auto md:h-[500px] w-full shadow-2xl animate-fade-up animation-delay-400">
            <div className="md:w-1/2 h-64 md:h-full relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1574362848149-11496d93e7c7?q=80&w=1984&auto=format&fit=crop"
                alt="G+15 Residential Project"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="md:w-1/2 bg-[#2C333D] p-8 md:p-12 text-white flex flex-col justify-center relative">
              <h3 className="text-5xl font-bold text-[#F0B90B] mb-2">G+15</h3>
              <div className="flex items-center gap-2 text-gray-400 mb-6 text-sm uppercase tracking-widest">
                <MapPin className="w-4 h-4 text-[#F0B90B]" />
                Al Khan, Sharjah
              </div>

              <div className="border-t border-gray-600 w-12 mb-6"></div>

              <h4 className="text-2xl font-serif text-gray-200 mb-6">
                90 APARTMENTS + 3 RETAIL units
              </h4>

              <ul className="space-y-3 text-sm text-gray-300 font-light mb-8">
                <li className="flex items-start gap-2">• <span className="opacity-90">1BR: 30 Units | 2BR: 60 Units</span></li>
                <li className="flex items-start gap-2">• <span className="opacity-90">Direct access to Al Ittihad Road</span></li>
                <li className="flex items-start gap-2">• <span className="opacity-90">5 mins to Al Mamzar Beach</span></li>
              </ul>

              <div className="mt-auto pt-6 border-t border-gray-600/50">
                <span className="text-[#F0B90B] uppercase tracking-widest font-serif text-lg">Residential Project</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Location / Visit Us */}
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <h2 className="text-4xl font-bold text-primary mb-8">Visit Our Headquarters</h2>
        <div className="bg-secondary p-12 relative overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
          </div>

          <div className="relative z-10 space-y-4 mb-12">
            <Building2 className="w-12 h-12 text-accent mx-auto" />
            <h3 className="text-3xl font-serif italic text-primary">Malak Al Reem Real Estate</h3>
            <p className="text-gray-500 uppercase tracking-widest text-sm">
              Smart Heights Building, 12th Floor<br />
              Barsha Heights, Dubai
            </p>
          </div>

          <div className="relative z-10 pt-8 border-t border-primary/10">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-none px-8 py-4 uppercase tracking-widest text-xs">
              <Link to="/contact">Get Directions</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // Show logo after small delay
    setTimeout(() => setShowLogo(true), 500);
    // Auto complete after 4.5 seconds (video duration approx)
    const timer = setTimeout(() => {
      onComplete();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          {/* Using a cinematic gold/luxury abstract or city reveal video */}
          <source src="https://cdn.pixabay.com/video/2019/04/20/22908-331622312_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className={`relative z-10 text-center transition-all duration-1000 transform ${showLogo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="w-24 h-24 bg-accent/20 backdrop-blur-sm rounded-2xl border border-accent/50 flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_rgba(240,185,11,0.3)]">
          <span className="text-5xl font-bold text-accent">M</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-widest mb-3 font-serif">
          MALAK AL REEM
        </h1>
        <p className="text-accent text-sm md:text-xl tracking-[0.5em] uppercase">
          Real Estate Group
        </p>
      </div>
    </div>
  );
};

const Index = () => {
  const [activeTab, setActiveTab] = useState<'real-estate' | 'construction'>('real-estate');
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <Layout>
      {/* The Touch Bar / Company Switcher - Positioned fixed below header or at top */}
      <div className="fixed top-24 left-0 right-0 z-40 flex justify-center pointer-events-none px-4">
        <div className="bg-black/90 backdrop-blur-md pointer-events-auto rounded-full p-1.5 border border-white/20 flex gap-2 shadow-2xl">
          <button
            onClick={() => setActiveTab('real-estate')}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === 'real-estate'
              ? 'bg-accent text-accent-foreground shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
          >
            Malak Al Reem
          </button>
          <div className="w-px bg-white/20 my-2"></div>
          <button
            onClick={() => setActiveTab('construction')}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === 'construction'
              ? 'bg-yellow-500 text-black shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
          >
            Saud Shehatha
          </button>
        </div>
      </div>

      {/* Render Active View */}
      {activeTab === 'real-estate' ? <RealEstateView /> : <ConstructionView />}

    </Layout>
  );
};

export default Index;
