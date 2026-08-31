import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { hashPassword, signToken } from "@/lib/auth";
import { z } from "zod";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    
    // Validate inputs
    const result = signupSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    
    const { name, email, password } = result.data;
    const normalizedEmail = email.toLowerCase().trim();
    
    // Check if email already registered
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Email is already registered" },
        { status: 400 }
      );
    }
    
    // Check if matches configured admin email
    const adminEmail = (process.env.ADMIN_EMAIL || "neelandrakar@gmail.com").toLowerCase().trim();
    const role = normalizedEmail === adminEmail ? "ADMIN" : "USER";
    
    // Hash password & create user
    const passwordHash = await hashPassword(password);
    const user = await User.create({
      name,
      email: normalizedEmail,
      passwordHash,
      role
    });
    
    // Create JWT session
    const tokenPayload = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role
    };
    const token = signToken(tokenPayload);
    
    // Generate secure cookie response
    const response = NextResponse.json({
      success: true,
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }, { status: 201 });
    
    response.cookies.set({
      name: "session",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/"
    });
    
    return response;
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { success: false, error: "An internal server error occurred" },
      { status: 500 }
    );
  }
}
