import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ success: false, error: "Messages array is required" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: false, error: "OpenAI API key is missing" }, { status: 500 });
    }

    // Insert a system prompt at the beginning to give the AI context about NATS Lab
    const systemMessage = {
      role: "system",
      content: `You are the AI assistant for NATS Lab. 
NATS Lab builds custom websites, web applications, business automation pipelines (CRMs, WhatsApp/Email notifications), and cross-platform mobile apps (Flutter).
Keep responses helpful, concise, and professional. 
Guide users to describe their business goals so you can recommend the best software solutions.`
    };

    const apiMessages = [systemMessage, ...messages];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // or gpt-3.5-turbo / gpt-4o depending on what key has access to
        messages: apiMessages,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API error:", errorData);
      return NextResponse.json({ success: false, error: "Error communicating with OpenAI" }, { status: 502 });
    }

    const data = await response.json();
    const replyMessage = data.choices[0].message;

    return NextResponse.json({
      success: true,
      message: replyMessage
    });

  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to process chat message"
    }, { status: 500 });
  }
}
