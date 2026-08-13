"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

interface Msg {
  id: number;
  sender: string;
  body: string;
  at: string | null;
}

interface Props {
  dealerId: number;
  dealerName?: string;
  accent?: string; // header/button color — pass your site's CTA color
}

export default function ChatWidget({ dealerId, dealerName = "Chat with us", accent = "#FC5E01" }: Props) {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const storeKey = `motohave_chat_token_${dealerId}`;
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const t = localStorage.getItem(storeKey);
    if (t) setToken(t);
  }, [storeKey]);

  useEffect(() => {
    if (!open || !token) return;
    poll();
    const iv = setInterval(poll, 5000);
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, token]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  async function poll() {
    if (!token) return;
    try {
      const r = await fetch(`${API}/inbox/${token}/messages`);
      const d = await r.json();
      if (d.success) setMessages(d.messages);
    } catch {
      /* ignore network blips */
    }
  }

  async function startChat(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setSending(true);
    try {
      const r = await fetch(`${API}/inbox/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dealer_id: dealerId, name: name || null, body: text.trim() }),
      });
      const d = await r.json();
      if (d.success) {
        localStorage.setItem(storeKey, d.token);
        setToken(d.token);
        setMessages(d.messages);
        setText("");
      }
    } catch {
      /* ignore */
    }
    setSending(false);
  }

  async function sendMsg(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() || !token) return;
    setSending(true);
    try {
      const r = await fetch(`${API}/inbox/${token}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: text.trim() }),
      });
      const d = await r.json();
      if (d.success) {
        setMessages(d.messages);
        setText("");
      }
    } catch {
      /* ignore */
    }
    setSending(false);
  }

  return (
    <>
      {/* Launcher button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open chat"
          style={{ backgroundColor: accent }}
          className="fixed bottom-24 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg hover:brightness-95 transition"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-40 flex h-[460px] w-[92vw] max-w-[360px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-200">
            {/* Header */}
          <div style={{ backgroundColor: accent }} className="flex items-center justify-between px-4 py-3 text-white">
            <span className="text-sm font-semibold">{dealerName}</span>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="hover:opacity-80">
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          {!token ? (
            /* Pre-chat form */
            <form onSubmit={startChat} className="flex flex-1 flex-col justify-end gap-2 p-4">
              <p className="text-sm text-gray-500 mb-auto pt-2">
                👋 Hi! Send us a message and our team will reply shortly.
              </p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name (optional)"
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-gray-500"
              />
              <div className="flex gap-2">
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type your message…"
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-gray-500"
                />
                <button type="submit" disabled={sending || !text.trim()} style={{ backgroundColor: accent }} className="flex-shrink-0 flex items-center justify-center rounded-lg px-3 text-white disabled:opacity-60">
                  {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
              </div>
            </form>
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto bg-gray-50 p-3 space-y-2">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.sender === "dealer" ? "justify-start" : "justify-end"}`}>
                    <div
                      className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                        m.sender === "dealer"
                          ? "bg-white text-gray-800 border border-gray-200 rounded-bl-sm"
                          : "text-white rounded-br-sm"
                      }`}
                      style={m.sender === "dealer" ? undefined : { backgroundColor: accent }}
                    >
                      <p className="whitespace-pre-line break-words">{m.body}</p>
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <form onSubmit={sendMsg} className="flex gap-2 border-t border-gray-200 p-3">
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type your message…"
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-gray-500"
                />
                <button type="submit" disabled={sending || !text.trim()} style={{ backgroundColor: accent }} className="flex-shrink-0 flex items-center justify-center rounded-lg px-3 text-white disabled:opacity-60">
                  {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}