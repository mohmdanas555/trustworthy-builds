import { Link } from "react-router-dom";
import { ArrowRight, Home, Building2, Hammer, Paintbrush, ClipboardList, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const services = [
  {
    icon: Home,
    title: "Residential Construction",
    description: "From custom luxury homes to multi-family developments, we bring your residential vision to life with exceptional craftsmanship and attention to detail.",
    features: [
      "Custom home design and build",
      "Multi-family housing developments",
      "Luxury estate construction",
      "Energy-efficient home solutions",
      "Smart home integration",
      "Landscape and outdoor living spaces",
    ],
  },
  {
    icon: Building2,
    title: "Commercial Construction",
    description: "We deliver high-quality commercial buildings that meet the demands of modern business, from office complexes to retail spaces and industrial facilities.",
    features: [
      "Office buildings and complexes",
      "Retail and shopping centers",
      "Industrial facilities and warehouses",
      "Healthcare facilities",
      "Educational institutions",
      "Hospitality and restaurant construction",
    ],
  },
  {
    icon: Hammer,
    title: "Renovation & Remodeling",
    description: "Transform your existing space with our comprehensive renovation services. We breathe new life into homes and buildings while preserving their character.",
    features: [
      "Kitchen and bathroom remodeling",
      "Basement finishing",
      "Room additions and extensions",
      "Historic building restoration",
      "Structural modifications",
      "Energy efficiency upgrades",
    ],
  },
  {
    icon: Paintbrush,
    title: "Interior Works",
    description: "Our interior specialists create beautiful, functional spaces that reflect your style and meet your needs. From concept to completion, we handle every detail.",
    features: [
      "Custom cabinetry and millwork",
      "Flooring installation",
      "Painting and wall treatments",
      "Ceiling and lighting design",
      "Built-in furniture and storage",
      "Finish carpentry",
    ],
  },
  {
    icon: ClipboardList,
    title: "Project Management",
    description: "Our experienced project managers ensure your construction project runs smoothly from start to finish, coordinating all aspects for on-time, on-budget delivery.",
    features: [
      "Comprehensive project planning",
      "Budget management and cost control",
      "Schedule development and tracking",
      "Subcontractor coordination",
      "Quality assurance and control",
      "Regular progress reporting",
    ],
  },
];

const process = [
  {
    step: "01",
    title: "Initial Consultation",
    description: "We meet to discuss your vision, requirements, and budget to understand your project needs.",
  },
  {
    step: "02",
    title: "Design & Planning",
    description: "Our team creates detailed plans and designs, ensuring every aspect meets your expectations.",
  },
  {
    step: "03",
    title: "Proposal & Agreement",
    description: "We provide a comprehensive proposal with transparent pricing and clear timelines.",
  },
  {
    step: "04",
    title: "Construction",
    description: "Our skilled team executes the project with precision, keeping you informed at every stage.",
  },
  {
    step: "05",
    title: "Quality Inspection",
    description: "Rigorous quality checks ensure every detail meets our high standards before handover.",
  },
  {
    step: "06",
    title: "Project Completion",
    description: "Final walkthrough and handover, with ongoing support and warranty coverage.",
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-semibold mb-6 animate-fade-up">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-up animation-delay-100">
              Comprehensive Construction Solutions
            </h1>
            <p className="text-lg text-primary-foreground/80 animate-fade-up animation-delay-200">
              From residential homes to commercial complexes, we offer a full range of 
              construction services tailored to meet your unique needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""} animate-fade-up`}>
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                        <span className="text-foreground text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <Button variant="outline" asChild>
                      <Link to="/contact">
                        Request a Quote
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""} animate-slide-left`}>
                  <div className="bg-muted rounded-2xl p-8 aspect-square flex items-center justify-center">
                    <service.icon className="w-32 h-32 text-primary/20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              How We Work
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Our Construction Process
            </h2>
            <p className="text-muted-foreground">
              A streamlined approach that ensures your project is completed efficiently 
              and to the highest standards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((item, index) => (
              <div
                key={item.step}
                className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl font-bold text-accent/30 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Contact us today for a free consultation. Our team is ready to help you 
            plan and execute your next construction project.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Get a Free Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/projects">View Our Projects</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
