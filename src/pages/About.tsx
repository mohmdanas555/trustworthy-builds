import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye, Shield, Clock, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import aboutTeam from "@/assets/about-team.jpg";
import projectCommercial from "@/assets/project-commercial.jpg";

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

const milestones = [
  { year: "2010", title: "Company Founded", description: "Started with a small team of dedicated professionals." },
  { year: "2015", title: "First Major Development", description: "Completed our first signature residential complex." },
  { year: "2018", title: "Regional Expansion", description: "Expanded operations to 5 neighboring states." },
  { year: "2024", title: "12 Properties Milestone", description: "Celebrated completion of our 12th premium property." },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-semibold mb-6 animate-fade-up">
              About Saudshehatha Construction LLC
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-up animation-delay-100">
              Building Excellence Since 2010
            </h1>
            <p className="text-lg text-primary-foreground/80 animate-fade-up animation-delay-200">
              With over 14 years of experience in the construction industry, Saudshehatha Construction LLC
              serves as the dedicated construction arm for <span className="font-bold">Malak Al Reem Real Estate Company</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                A Legacy of Quality Construction
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2010, Saudshehatha Construction LLC was established to bring the vision of
                  <span className="font-bold text-foreground"> Malak Al Reem Real Estate Company</span> to life.
                  Our mission is to deliver exceptional construction quality for our exclusive developments.
                </p>
                <p>
                  Over the past decade, we've successfully developed 12 premium properties ranging
                  from custom luxury homes to large-scale commercial developments. Our success
                  is built on our unwavering commitment to quality, safety, and excellence.
                </p>
                <p>
                  Today, our team of 150+ skilled professionals continues to uphold the values
                  that have made us an industry leader. We combine traditional craftsmanship
                  with modern technology to deliver projects that stand the test of time.
                </p>
              </div>
            </div>
            <div className="relative animate-slide-left">
              <div className="rounded-2xl overflow-hidden shadow-card-hover">
                <img
                  src={aboutTeam}
                  alt="Saudshehatha construction team"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl p-8 shadow-card animate-fade-up">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                To deliver exceptional construction services that exceed client expectations
                through innovative solutions, skilled craftsmanship, and unwavering commitment
                to quality. We aim to build lasting relationships based on trust, transparency,
                and outstanding results.
              </p>
            </div>
            <div className="bg-card rounded-xl p-8 shadow-card animate-fade-up animation-delay-200">
              <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground">
                To be the most trusted and respected construction company, recognized for
                our commitment to excellence, innovation, and sustainable building practices.
                We envision a future where every project we complete contributes positively
                to communities and the environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              What Drives Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground">
              These principles guide every decision we make and every project we undertake.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 text-center group animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                  <value.icon className="w-8 h-8 text-primary group-hover:text-accent-foreground transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Key Milestones
            </h2>
            <p className="text-muted-foreground">
              A look back at the moments that have shaped our company's history.
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border" />

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    } animate-fade-up`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="bg-card rounded-xl p-6 shadow-card">
                      <span className="text-accent font-bold text-lg">{milestone.year}</span>
                      <h3 className="text-lg font-bold text-foreground mt-1 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-background shadow-md" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Let's Build Something Great Together
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Ready to start your next construction project? Contact us today to discuss
            how we can bring your vision to life.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/contact">
              Contact Us Today
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default About;
