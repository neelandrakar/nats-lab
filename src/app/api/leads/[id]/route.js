import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Lead from "@/models/Lead";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    
    // Auth session check
    const user = await getSessionUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({
        success: false,
        error: "Unauthorized access"
      }, { status: 401 });
    }
    
    const lead = await Lead.findById(id);
    if (!lead) {
      return NextResponse.json({
        success: false,
        error: "Lead not found"
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      lead
    });
  } catch (error) {
    console.error("Lead fetch detail error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch lead details"
    }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    
    // Auth session check
    const user = await getSessionUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({
        success: false,
        error: "Unauthorized access"
      }, { status: 401 });
    }
    
    const body = await req.json();
    const { status } = body;
    
    const validStatuses = ["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "WON", "LOST"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({
        success: false,
        error: "Invalid status value"
      }, { status: 400 });
    }
    
    const lead = await Lead.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!lead) {
      return NextResponse.json({
        success: false,
        error: "Lead not found"
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      message: "Lead status updated successfully",
      lead
    });
    
  } catch (error) {
    console.error("Lead status update error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to update lead status"
    }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    
    // Auth session check
    const user = await getSessionUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({
        success: false,
        error: "Unauthorized access"
      }, { status: 401 });
    }
    
    const lead = await Lead.findByIdAndDelete(id);
    
    if (!lead) {
      return NextResponse.json({
        success: false,
        error: "Lead not found"
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      message: "Lead deleted successfully"
    });
    
  } catch (error) {
    console.error("Lead deletion error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to delete lead"
    }, { status: 500 });
  }
}
