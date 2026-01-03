import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import projectResidential from "@/assets/project-residential.jpg";
import projectCommercial from "@/assets/project-commercial.jpg";
import projectRenovation from "@/assets/project-renovation.jpg";

const categories = ["All", "Residential", "Commercial", "Renovation", "Interior"];

const projects = [
  {
    id: 1,
    image: projectResidential,
    title: "Riverside Luxury Homes",
    category: "Residential",
    location: "Riverside, CA",
    description: "A stunning collection of 12 luxury homes featuring modern architecture, premium finishes, and smart home technology.",
    area: "45,000 sq ft",
    year: "2024",
  },
  {
    id: 2,
    image: projectCommercial,
    title: "Metro Business Center",
    category: "Commercial",
    location: "Downtown LA",
    description: "A 50,000 sq ft modern office complex with state-of-the-art amenities, LEED certified sustainable design.",
    area: "50,000 sq ft",
    year: "2023",
  },
  {
    id: 3,
    image: projectRenovation,
    title: "Heritage Home Restoration",
    category: "Renovation",
    location: "Pasadena, CA",
    description: "Complete restoration of a 1920s craftsman home, preserving historical details while adding modern comforts.",
    area: "4,500 sq ft",
    year: "2024",
  },
  {
    id: 4,
    image: projectResidential,
    title: "Sunset View Estates",
    category: "Residential",
    location: "Malibu, CA",
    description: "Custom oceanfront estate with panoramic views, infinity pool, and contemporary Mediterranean design.",
    area: "8,200 sq ft",
    year: "2023",
  },
  {
    id: 5,
    image: projectCommercial,
    title: "Tech Hub Campus",
    category: "Commercial",
    location: "Silicon Beach",
    description: "Modern tech campus featuring open workspaces, recreation areas, and sustainable building systems.",
    area: "120,000 sq ft",
    year: "2023",
  },
  {
    id: 6,
    image: projectRenovation,
    title: "Modern Loft Conversion",
    category: "Interior",
    location: "Arts District, LA",
    description: "Industrial warehouse converted into luxury loft apartments with exposed brick and modern finishes.",
    area: "15,000 sq ft",
    year: "2024",
  },
  {
    id: 7,
    image: projectResidential,
    title: "Hillside Modern Homes",
    category: "Residential",
    location: "Hollywood Hills",
    description: "Contemporary hillside development featuring 8 custom homes with city views and sustainable design.",
    area: "32,000 sq ft",
    year: "2022",
  },
  {
    id: 8,
    image: projectCommercial,
    title: "Retail Plaza Complex",
    category: "Commercial",
    location: "Beverly Hills",
    description: "Premium retail destination with boutique stores, restaurants, and underground parking.",
    area: "65,000 sq ft",
    year: "2023",
  },
  {
    id: 9,
    image: projectRenovation,
    title: "Victorian Revival",
    category: "Renovation",
    location: "San Francisco",
    description: "Historic Victorian mansion restored to its original glory with modern amenities and seismic upgrades.",
    area: "6,800 sq ft",
    year: "2024",
  },
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((project) => project.category === activeCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-semibold mb-6 animate-fade-up">
              Our Portfolio
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-up animation-delay-100">
              Featured Projects
            </h1>
            <p className="text-lg text-primary-foreground/80 animate-fade-up animation-delay-200">
              Explore our exclusive portfolio of residential and commercial properties
              developed under <span className="font-bold">Malak Al Reem Real Estate Company</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                    <span>{project.location}</span>
                    <span>•</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">
                      {project.area}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">12</div>
              <div className="text-muted-foreground text-sm">Properties Developed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">2M+</div>
              <div className="text-muted-foreground text-sm">Sq Ft Built</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground text-sm">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">14+</div>
              <div className="text-muted-foreground text-sm">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Have a Project in Mind?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Let's discuss how we can bring your construction vision to life.
            Contact us for a free consultation and quote.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/contact">
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
