import { NextResponse } from "next/server";
import { Groq } from 'groq-sdk';
import dbConnect from "@/lib/db";
import ChatSession from "@/models/ChatSession";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await dbConnect();
    const { sessionId, messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ success: false, error: "Messages array is required" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: false, error: "Groq API key is missing" }, { status: 500 });
    }

    const groq = new Groq({ apiKey });

    // Insert a system prompt at the beginning to give the AI context about NATS Lab
    const systemMessage = {
      role: "system",
      content: `You are the AI assistant for NATS Lab. 
NATS Lab builds custom websites, web applications, business automation pipelines, and Flutter mobile apps.
CRITICAL RULES:
- Be extremely conversational, friendly, and human-like.
- Keep responses very short and concise (1-3 sentences max).
- NEVER use markdown (no asterisks, no bold text, no bullet points).
- Ask only ONE follow-up question at a time to keep the chat engaging.
Don't answer any unrelated question`
    };

    const apiMessages = [systemMessage, ...messages];

    const chatCompletion = await groq.chat.completions.create({
      "messages": apiMessages,
      "model": "openai/gpt-oss-120b",
      "temperature": 1,
      "max_completion_tokens": 2048,
      "top_p": 1,
      "stream": true,
      "reasoning_effort": "medium",
      "stop": null
    });

    // Gather the streamed chunks to keep your current UI working
    let fullContent = '';
    for await (const chunk of chatCompletion) {
      fullContent += chunk.choices[0]?.delta?.content || '';
    }

    // Save to Database
    if (sessionId) {
      const lastUserMessage = messages[messages.length - 1];
      const aiReplyMessage = { role: "assistant", content: fullContent };

      const user = await getSessionUser();
      const updateData = {
        $push: { messages: { $each: [lastUserMessage, aiReplyMessage] } }
      };

      if (user && user.id) {

        updateData.$set = { userId: user.id };
      }

      // console.log(`updateData=> `, updateData)

      await ChatSession.findOneAndUpdate(
        { sessionId },
        updateData,
        { upsert: true, returnDocument: 'after' }
      );
    }

    return NextResponse.json({
      success: true,
      message: {
        role: "assistant",
        content: fullContent
      }
    });

  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to process chat message"
    }, { status: 500 });
  }
}
