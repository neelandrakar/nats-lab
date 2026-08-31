import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Project from "@/models/Project";
import Testimonial from "@/models/Testimonial";
import { getSessionUser } from "@/lib/auth";


export const dynamic = "force-dynamic";

const demoProjects = [
  {
    title: "AI Sales Assistant",
    slug: "ai-sales-assistant",
    category: "AI Agents",
    shortDescription: "AI-powered chat assistant that engages website visitors, qualifies leads in real-time, and schedules meetings.",
    description: "An intelligent, multi-turn AI assistant designed to sit on customer-facing websites. It answers complex product queries using a customized vector knowledge base, queries live product availability, qualifies visitors based on budget and timing, and automatically pushes qualified leads directly into CRM systems like Salesforce and HubSpot, followed by a WhatsApp confirmation message to the sales representative.",
    services: ["AI Agents", "Business Automation", "API & Integrations"],
    technologies: ["Next.js", "Node.js", "MongoDB", "OpenAI API", "Vector Embeddings", "WhatsApp Business API"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop", // Elegant dark 3D graphic
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
    ],
    featured: true
  },
  {
    title: "Real Estate CRM & Automation Portal",
    slug: "real-estate-crm",
    category: "Custom Software",
    shortDescription: "A custom real estate platform that aggregates listings, tracks buyer leads, and automates email/SMS follow-ups.",
    description: "A comprehensive backend system and CRM built for real estate brokerages. The system ingests listings from multiple sources, parses inbound email inquiries from real estate portals, assigns leads to agents based on zip code specializations, and uses triggered automated workflows to send personalized property matches via WhatsApp and email, dramatically reducing response times and increasing viewing conversions.",
    services: ["Custom Business Software", "Websites & Web Apps", "Business Automation"],
    technologies: ["React.js", "Node.js", "MongoDB", "Twilio SMS API", "SendGrid", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800&auto=format&fit=crop"
    ],
    featured: true
  },
  {
    title: "B2B Dealer Management System",
    slug: "dealer-management-system",
    category: "Custom Software",
    shortDescription: "Order placement, live inventory tracking, and reporting dashboard for a network of 200+ active distributors.",
    description: "A robust distributor portal designed to replace manual phone/email order entries. Dealers log in to view customized pricing contracts, check real-time stock status directly pulled from warehouse systems, place bulk orders, track shipment status, and download custom PDF invoices. Includes an administrative dashboard for the manufacturer to manage pricing matrices, monitor top-performing dealers, and forecast inventory needs.",
    services: ["Custom Business Software", "API & Integrations"],
    technologies: ["Next.js", "Mongoose", "MongoDB", "Tailwind CSS", "PDFKit", "Chart.js"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop"
    ],
    featured: true
  },
  {
    title: "Business Automation Platform",
    slug: "business-automation-platform",
    category: "Business Automation",
    shortDescription: "Multi-channel workflow automation engine connecting ERP systems, email marketing, and Slack alerts.",
    description: "An operations middleware that integrates scattered business programs. When a sales order is completed, the automation engine creates an invoice in QuickBooks, opens a tracking ticket in Jira, notifies the operations team on Slack, and adds the client to an automated onboarding email sequence. Built to eliminate 15+ hours of repetitive manual data entry per week for operations staff.",
    services: ["Business Automation", "API & Integrations"],
    technologies: ["Node.js", "Express", "MongoDB", "QuickBooks API", "Slack API", "Stripe API"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop"
    ],
    featured: false
  },
  {
    title: "Mobile Business Application",
    slug: "mobile-business-app",
    category: "Mobile Applications",
    shortDescription: "On-the-go service booking and mobile payment application for field service technicians.",
    description: "A cross-platform mobile application that allows field technicians to view their daily service schedules, navigate to client locations via integrated maps, document repair work with photos, collect client signatures, and accept secure credit card payments. The app works offline, syncing all data back to the central MongoDB database once internet connectivity is restored.",
    services: ["Mobile Applications", "API & Integrations", "Custom Business Software"],
    technologies: ["Flutter", "Dart", "Node.js API", "MongoDB", "Stripe Mobile SDK", "Google Maps API"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
    ],
    featured: false
  }
];

const demoTestimonials = [
  {
    name: "Arjun Mehta",
    company: "Apex Manufacturing Ltd.",
    role: "Director of Operations",
    content: "The dealer management system built by NATS Lab replaced our manual email order system. Our dealers now place orders online, and our team saves over 20 hours a week on data entry. The transition was smooth and their support has been exceptional.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    featured: true
  },
  {
    name: "Sarah Jenkins",
    company: "Elevate Real Estate",
    role: "Managing Partner",
    content: "We needed a way to qualify buyer leads instantly. NATS Lab built an AI assistant that communicates with leads, details their criteria, and puts them into our database. The quality of our property viewings has improved significantly.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    featured: true
  },
  {
    name: "Rohan Das",
    company: "LogiTech Solutions",
    role: "Co-Founder",
    content: "NATS Lab connected our scattered software platforms (CRM, QuickBooks, Slack) into a single, automated flow. Systems that didn't communicate now work together perfectly, giving us a live view of our business operations.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    featured: true
  }
];

export async function GET(req) {
  try {
    // Auth check to protect seed endpoint
    const user = await getSessionUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({
        success: false,
        error: "Unauthorized access"
      }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const force = searchParams.get("force") === "true";
    
    await dbConnect();
    
    let projectsSeeded = 0;
    let testimonialsSeeded = 0;
    
    if (force) {
      await Project.deleteMany({});
      await Testimonial.deleteMany({});
    }
    
    const existingProjectsCount = await Project.countDocuments();
    if (existingProjectsCount === 0 || force) {
      await Project.insertMany(demoProjects);
      projectsSeeded = demoProjects.length;
    }
    
    const existingTestimonialsCount = await Testimonial.countDocuments();
    if (existingTestimonialsCount === 0 || force) {
      await Testimonial.insertMany(demoTestimonials);
      testimonialsSeeded = demoTestimonials.length;
    }
    
    return NextResponse.json({
      success: true,
      message: "Seeding run successfully",
      summary: {
        projectsSeeded,
        testimonialsSeeded,
        totalProjects: await Project.countDocuments(),
        totalTestimonials: await Testimonial.countDocuments()
      }
    });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
