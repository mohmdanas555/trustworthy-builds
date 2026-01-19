"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export interface Project {
    id: number;
    image: string;
    title: string;
    category: string;
    location: string;
    description: string;
    area: string;
    year: string;
}

export interface Service {
    id: number;
    icon: string;
    title: string;
    description: string;
    features: string[];
}

export interface CompanyDetails {
    id?: number;
    phone: string;
    email: string;
    address: string;
    workingHours: string;
    facebook: string;
    instagram: string;
    linkedin: string;
    twitter: string;
    brandName: string;
    brandSubtitle: string;
    yearsExperience: string;
    projectsCompleted: string;
    happyClients: string;
}

export interface Quote {
    id: number;
    name: string;
    email: string;
    phone: string;
    message: string;
    status: 'pending' | 'reviewed' | 'contacted';
    created_at?: string;
}

export interface TeamMember {
    id: number;
    name: string;
    role: string;
    image: string;
    bio?: string;
    linkedin?: string;
    twitter?: string;
}

export interface Testimonial {
    id: number;
    client_name: string;
    role?: string;
    content: string;
    image: string;
    rating: number;
}

export interface FAQ {
    id: number;
    question: string;
    answer: string;
    order_index: number;
}

export interface DataContextType {
    projects: Project[];
    services: Service[];
    companyDetails: CompanyDetails;
    team: TeamMember[];
    testimonials: Testimonial[];
    faqs: FAQ[];
    quotes: Quote[];

    addProject: (project: Omit<Project, "id">) => Promise<void>;
    updateProject: (project: Project) => Promise<void>;
    deleteProject: (id: number) => Promise<void>;

    addService: (service: Omit<Service, "id">) => Promise<void>;
    updateService: (service: Service) => Promise<void>;
    deleteService: (id: number) => Promise<void>;

    updateCompanyDetails: (details: CompanyDetails) => Promise<void>;

    addQuote: (quote: Omit<Quote, "id" | "status" | "created_at">) => Promise<void>;
    updateQuote: (quote: Quote) => Promise<void>;
    deleteQuote: (id: number) => Promise<void>;

    addTeamMember: (member: Omit<TeamMember, "id">) => Promise<void>;
    updateTeamMember: (member: TeamMember) => Promise<void>;
    deleteTeamMember: (id: number) => Promise<void>;

    addTestimonial: (testimonial: Omit<Testimonial, "id">) => Promise<void>;
    updateTestimonial: (testimonial: Testimonial) => Promise<void>;
    deleteTestimonial: (id: number) => Promise<void>;

    addFAQ: (faq: Omit<FAQ, "id">) => Promise<void>;
    updateFAQ: (faq: FAQ) => Promise<void>;
    deleteFAQ: (id: number) => Promise<void>;

    isAdmin: boolean;
    isAuthLoading: boolean;
    login: () => void;
    logout: () => void;
}

const defaultCompanyDetails: CompanyDetails = {
    phone: "(123) 456-7890",
    email: "info@saudshehatha.com",
    address: "Smart Heights Building, Barsha Heights, Dubai",
    workingHours: "Sun - Thu: 9:00 AM - 5:30 PM",
    facebook: "#",
    instagram: "#",
    linkedin: "#",
    twitter: "#",
    brandName: "SAUD SHEHATHA CONSTRUCTION LLC",
    brandSubtitle: "",
    yearsExperience: "14+",
    projectsCompleted: "200+",
    happyClients: "99%"
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [companyDetails, setCompanyDetails] = useState<CompanyDetails>(defaultCompanyDetails);
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    useEffect(() => {
        const loggedIn = localStorage.getItem("isAdmin") === "true";
        setIsAdmin(loggedIn);
        setIsAuthLoading(false);
        fetchData();
    }, []);

    const fetchData = async () => {
        const { data: projectsData } = await supabase.from('projects').select('*').order('id');
        if (projectsData) setProjects(projectsData);

        const { data: servicesData } = await supabase.from('services').select('*').order('id');
        if (servicesData) setServices(servicesData);

        const { data: companyData } = await supabase.from('company_details').select('*').single();
        if (companyData) {
            setCompanyDetails({
                ...companyData,
                workingHours: companyData.working_hours,
                brandName: companyData.brand_name,
                brandSubtitle: companyData.brand_subtitle,
                yearsExperience: companyData.years_experience,
                projectsCompleted: companyData.projects_completed,
                happyClients: companyData.happy_clients
            });
        }

        const { data: teamData } = await supabase.from('team_members').select('*').order('order_index');
        if (teamData) setTeam(teamData);

        const { data: testimonialData } = await supabase.from('testimonials').select('*').order('id');
        if (testimonialData) setTestimonials(testimonialData);

        const { data: faqData } = await supabase.from('faqs').select('*').order('order_index');
        if (faqData) setFaqs(faqData);

        const { data: quotesData } = await supabase.from('quotes').select('*').order('created_at', { ascending: false });
        if (quotesData) setQuotes(quotesData);
    };

    // Generic Add/Update/Delete Helpers
    const performAdd = async (table: string, item: any, setState: Function, state: any[]) => {
        const { data, error } = await supabase.from(table).insert([item]).select();
        if (error) { console.error(`Error adding to ${table}:`, error); return; }
        if (data) setState([...state, data[0]]);
    };

    const performUpdate = async (table: string, item: any, setState: Function, state: any[]) => {
        const { id, ...updateData } = item;
        const { error } = await supabase.from(table).update(updateData).eq('id', id);
        if (error) { console.error(`Error updating ${table}:`, error); return; }
        setState(state.map(i => i.id === id ? item : i));
    };

    const performDelete = async (table: string, id: number, setState: Function, state: any[]) => {
        const { error } = await supabase.from(table).delete().eq('id', id);
        if (error) { console.error(`Error deleting from ${table}:`, error); return; }
        setState(state.filter(i => i.id !== id));
    };

    // CRUD Methods
    const addProject = (item: any) => performAdd('projects', item, setProjects, projects);
    const updateProject = (item: any) => performUpdate('projects', item, setProjects, projects);
    const deleteProject = (id: number) => performDelete('projects', id, setProjects, projects);

    const addService = (item: any) => performAdd('services', item, setServices, services);
    const updateService = (item: any) => performUpdate('services', item, setServices, services);
    const deleteService = (id: number) => performDelete('services', id, setServices, services);

    const addTeamMember = (item: any) => performAdd('team_members', item, setTeam, team);
    const updateTeamMember = (item: any) => performUpdate('team_members', item, setTeam, team);
    const deleteTeamMember = (id: number) => performDelete('team_members', id, setTeam, team);

    const addTestimonial = (item: any) => performAdd('testimonials', item, setTestimonials, testimonials);
    const updateTestimonial = (item: any) => performUpdate('testimonials', item, setTestimonials, testimonials);
    const deleteTestimonial = (id: number) => performDelete('testimonials', id, setTestimonials, testimonials);

    const addFAQ = (item: any) => performAdd('faqs', item, setFaqs, faqs);
    const updateFAQ = (item: any) => performUpdate('faqs', item, setFaqs, faqs);
    const deleteFAQ = (id: number) => performDelete('faqs', id, setFaqs, faqs);

    const updateCompanyDetails = async (details: CompanyDetails) => {
        const dbDetails: any = {
            id: 1, phone: details.phone, email: details.email, address: details.address,
            working_hours: details.workingHours, brand_name: details.brandName, brand_subtitle: details.brandSubtitle,
            years_experience: details.yearsExperience,
            projects_completed: details.projectsCompleted,
            happy_clients: details.happyClients,
            facebook: details.facebook, instagram: details.instagram, linkedin: details.linkedin, twitter: details.twitter,
        };
        try {
            const { error } = await supabase.from('company_details').upsert(dbDetails, { onConflict: 'id' });
            if (error) throw error;
            setCompanyDetails(details);
        } catch (err) { console.error(err); throw err; }
    };

    const addQuote = (item: any) => performAdd('quotes', item, setQuotes, quotes);
    const updateQuote = (item: any) => performUpdate('quotes', item, setQuotes, quotes);
    const deleteQuote = (id: number) => performDelete('quotes', id, setQuotes, quotes);

    const login = () => { localStorage.setItem("isAdmin", "true"); setIsAdmin(true); };
    const logout = () => { localStorage.setItem("isAdmin", "false"); setIsAdmin(false); };

    return (
        <DataContext.Provider value={{
            projects, services, companyDetails, team, testimonials, faqs, quotes,
            addProject, updateProject, deleteProject,
            addService, updateService, deleteService,
            updateCompanyDetails,
            addQuote, updateQuote, deleteQuote,
            addTeamMember, updateTeamMember, deleteTeamMember,
            addTestimonial, updateTestimonial, deleteTestimonial,
            addFAQ, updateFAQ, deleteFAQ,
            isAdmin, isAuthLoading, login, logout
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) throw new Error("useData must be used within a DataProvider");
    return context;
};
