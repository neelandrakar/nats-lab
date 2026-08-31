import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Lead from "@/models/Lead";
import { getSessionUser } from "@/lib/auth";
import { z } from "zod";

export const dynamic = "force-dynamic";

const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional().or(z.literal("")),
  company: z.string().optional().or(z.literal("")),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select a budget range"),
  message: z.string().optional().or(z.literal("")),
  source: z.string().default("Website Form")
});

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    
    // Validate request body
    const validatedData = leadSchema.parse(body);
    
    // Optional: Get active user session to link the lead
    const session = await getSessionUser();
    const userId = session ? session.id : null;
    
    // Save lead to MongoDB
    const lead = await Lead.create({
      ...validatedData,
      userId,
      status: "NEW"
    });
    
    return NextResponse.json({
      success: true,
      message: "Lead captured successfully",
      leadId: lead._id
    }, { status: 201 });
    
  } catch (error) {
    console.error("Lead submission error:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        errors: error.flatten().fieldErrors
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      error: "An internal server error occurred"
    }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await dbConnect();
    
    // Check session authentication
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({
        success: false,
        error: "Unauthorized access"
      }, { status: 401 });
    }
    
    let leads = [];
    if (user.role === "ADMIN") {
      // Admin sees all leads
      leads = await Lead.find({}).sort({ createdAt: -1 });
    } else {
      // Normal user sees only their own leads
      leads = await Lead.find({ userId: user.id }).sort({ createdAt: -1 });
    }
    
    return NextResponse.json({
      success: true,
      leads
    });
  } catch (error) {
    console.error("Lead fetch error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch leads"
    }, { status: 500 });
  }
}
