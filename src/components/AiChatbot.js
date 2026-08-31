"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I am the NATS Lab assistant. What are you looking to build or automate today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef(null);

  const suggestOptions = [
    "I need a website",
    "I want AI automation",
    "I need custom software",
    "I need an app",
    "I want to fix existing software"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (text) => {
    if (!text || text.trim() === "" || isLoading) return;
    
    const userMessage = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      const data = await response.json();
      
      if (data.success && data.message) {
        setMessages((prev) => [...prev, data.message]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I encountered an error connecting to our core AI engine. Please try again or head over to the contact page to start your project directly.",
          },
        ]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Network error. Please make sure you are connected online or contact our founder Neelandra directly.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[500px] bg-brand-surface border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 transition-all duration-300">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-brand-teal/80 to-brand-cyan/80 backdrop-blur border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white flex items-center gap-1.5">
                  NATS Lab Assistant
                  <Sparkles className="w-3 h-3 text-cyan-200 animate-pulse" />
                </h4>
                <p className="text-[10px] text-teal-100">Usually responds instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-dark/40">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 max-w-[85%] ${
                  msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-brand-accent/20 border border-brand-accent/30 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-brand-accent" />
                  </div>
                )}
                <div>
                  <div
                    className={`p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-brand-accent text-white rounded-tr-none"
                        : "bg-white/5 border border-white/10 text-gray-200 rounded-tl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 max-w-[80%]">
                <div className="w-7 h-7 rounded-full bg-brand-accent/20 border border-brand-accent/30 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-brand-accent" />
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-accent animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-2 h-2 rounded-full bg-brand-accent animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-2 h-2 rounded-full bg-brand-accent animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested options if last message is assistant */}
          {messages[messages.length - 1]?.role === "assistant" && !isLoading && (
            <div className="px-4 py-2 flex flex-wrap gap-2 bg-brand-dark/20 border-t border-white/5">
              {suggestOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSendMessage(opt)}
                  className="text-xs px-2.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-brand-accent/15 hover:border-brand-accent/30 transition-all"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* Footer Action to lead page */}
          <div className="px-4 py-2 bg-brand-dark/60 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
            <span>Ready to start?</span>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="text-brand-accent font-medium hover:underline flex items-center gap-1"
            >
              Start a Project <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="p-3 border-t border-white/10 bg-brand-surface flex gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/20"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-10 h-10 rounded-xl bg-brand-accent hover:bg-brand-accent/90 text-white flex items-center justify-center shrink-0 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-brand-teal to-brand-cyan hover:from-brand-teal hover:to-brand-teal text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-200 z-50 relative group"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          </>
        )}
      </button>
    </div>
  );
}
