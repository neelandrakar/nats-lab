import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Lead from "@/models/Lead";
import { getSessionUser } from "@/lib/auth";
import { z } from "zod";

export const dynamic = "force-dynamic";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.string().email("Invalid email address").optional(),
  phone: z.string().optional().or(z.literal("")),
  message: z.string().min(5, "Message must be at least 5 characters")
});

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    
    // Parse / Validate inputs
    const validatedData = contactSchema.parse(body);
    
    // Fetch active session user info
    const session = await getSessionUser();
    
    let name = "";
    let email = "";
    let userId = null;
    
    if (session) {
      name = session.name;
      email = session.email;
      userId = session.id;
    } else {
      // Anonymous user needs to supply name and email
      if (!validatedData.name || !validatedData.email) {
        return NextResponse.json({
          success: false,
          error: "Name and email are required for anonymous submissions"
        }, { status: 400 });
      }
      name = validatedData.name;
      email = validatedData.email;
    }
    
    // Create new Lead in MongoDB to unify log visualizer
    const lead = await Lead.create({
      name,
      email,
      phone: validatedData.phone || "",
      service: "General Enquiry",
      budget: "N/A",
      message: validatedData.message,
      userId,
      status: "NEW"
    });
    
    return NextResponse.json({
      success: true,
      message: "Enquiry message received successfully",
      id: lead._id
    }, { status: 201 });
    
  } catch (error) {
    console.error("Contact form submission error:", error);
    
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
