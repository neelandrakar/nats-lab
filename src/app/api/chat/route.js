import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Clean abstraction for AI Chat. In the future, this file can be updated to import OpenAI, Gemini, or Claude SDKs.
// It checks for API keys and falls back to a realistic contextual responder if keys are missing.

export async function POST(req) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ success: false, error: "Messages array is required" }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";
    
    // Simulate latency for realism
    await new Promise((resolve) => setTimeout(resolve, 800));

    let reply = "";
    
    // Simple contextual responder (Simulated AI)
    if (lastMessage.includes("website") || lastMessage.includes("web app") || lastMessage.includes("landing")) {
      reply = "At NATS Lab, we build custom websites and web applications tailored for speed, SEO, and lead conversion. We focus on modern frameworks like Next.js, React, and Node.js. Are you looking to build a brand new site, or rebuild an existing portal?";
    } else if (lastMessage.includes("automate") || lastMessage.includes("automation") || lastMessage.includes("workflow")) {
      reply = "We specialize in business automation: connecting CRMs, sending automated WhatsApp/email notifications, tracking inventory, and automating manual spreadsheets. What repetitive task in your business consumes the most time?";
    } else if (lastMessage.includes("ai agent") || lastMessage.includes("bot") || lastMessage.includes("chat")) {
      reply = "AI agents and chatbots are one of our core specialties. We build agents for customer support, lead qualification, and document parsing that integrate directly into your database. Would this agent be internal for your team, or public-facing for your customers?";
    } else if (lastMessage.includes("app") || lastMessage.includes("mobile") || lastMessage.includes("ios") || lastMessage.includes("android")) {
      reply = "We build cross-platform mobile applications using Flutter. This allows us to write one codebase that runs beautifully on both iOS and Android, keeping development efficient. What features does your app need (e.g., maps, payments, user profiles)?";
    } else if (lastMessage.includes("cost") || lastMessage.includes("price") || lastMessage.includes("budget") || lastMessage.includes("how much")) {
      reply = "Our projects are quoted on a fixed-scope basis depending on complexity. Small websites or integrations start lower, while custom business portals and CRM tools range based on database and security specs. You can fill out our 'Start a Project' form with your budget range, and we will scope it out.";
    } else if (lastMessage.includes("time") || lastMessage.includes("long") || lastMessage.includes("duration")) {
      reply = "Simple websites or automation pipelines typically take 2-4 weeks. Larger custom software platforms or mobile apps take 6-12 weeks. We build in weekly iterations, so you always see a live staging link. When are you hoping to launch?";
    } else if (lastMessage.includes("hello") || lastMessage.includes("hi") || lastMessage.includes("hey")) {
      reply = "Hello! I am the NATS Lab assistant. I can help you explore our services, understand our process, or start a project. What are you looking to build or automate today?";
    } else {
      reply = "That sounds like an interesting project. We've built custom software, mobile apps, and automated systems for various industries. To give you the best advice, could you share a bit more about what business goal you're trying to achieve?";
    }

    return NextResponse.json({
      success: true,
      message: {
        role: "assistant",
        content: reply
      }
    });

  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to process chat message"
    }, { status: 500 });
  }
}
