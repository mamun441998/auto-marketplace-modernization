"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import ChatList from "@/components/inbox/ChatList";
import ChatWindow from "@/components/inbox/ChatWindow";
import ChatContext from "@/components/inbox/ChatContext";

const initialChats = [
  {
    id: "chat_01",
    customerName: "Robert Vance",
    phone: "+1 (555) 234-5678",
    vehicleContext: "BMW i4 M50 (2024)",
    price: "$69,700",
    lastMessage: "Is the upfront registration fee included in this quote?",
    timestamp: "12 mins ago",
    unread: true,
    messages: [
      { sender: "customer", text: "Hello, I am looking into the BMW i4 listed in your inventory.", time: "10:14 AM" },
      { sender: "dealer", text: "Hi Robert! Yes, it is available at our main showroom. Would you like to schedule a walkthrough?", time: "10:16 AM" },
      { sender: "customer", text: "Is the upfront registration fee included in this quote?", time: "10:18 AM" }
    ]
  },
  {
    id: "chat_02",
    customerName: "Sarah Jenkins",
    phone: "+1 (555) 876-5432",
    vehicleContext: "Audi E-Tron GT",
    price: "$104,900",
    lastMessage: "Please share the financing options.",
    timestamp: "1 hour ago",
    unread: false,
    messages: [
      { sender: "customer", text: "Hello, what financing options are available for the E-Tron?", time: "Yesterday" },
      { sender: "dealer", text: "We offer financing up to 75 percent of the vehicle value for qualified buyers.", time: "Yesterday" },
      { sender: "customer", text: "Please share the financing options.", time: "09:00 AM" }
    ]
  }
];

export default function InboxPage() {
  const [chats, setChats] = useState(initialChats);
  const [activeChatId, setActiveChatId] = useState("chat_01");

  const currentChat = chats.find((c) => c.id === activeChatId) || chats[0];

  const handleSelectChat = (id) => {
    setActiveChatId(id);
    setChats((prev) => prev.map((c) => (c.id === id ? { ...c, unread: false } : c)));
  };

  const handleSendMessage = (text) => {
    setChats((prev) =>
      prev.map((c) => {
        if (c.id === activeChatId) {
          return {
            ...c,
            lastMessage: text,
            timestamp: "Just now",
            messages: [...c.messages, { sender: "dealer", text, time: "Just now" }]
          };
        }
        return c;
      })
    );
  };

  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-140px)]">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <MessageSquare size={20} className="text-[#FC5E01]" />
          Live Chat
        </h1>
        <p className="mt-1 text-sm text-[#94A3B8]">Chat with customers in real time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 overflow-hidden">
        <ChatList chats={chats} activeChatId={activeChatId} onSelectChat={handleSelectChat} />
        <ChatWindow
          customerName={currentChat.customerName}
          phone={currentChat.phone}
          messages={currentChat.messages}
          onSendMessage={handleSendMessage}
        />
        <ChatContext
          vehicleContext={currentChat.vehicleContext}
          price={currentChat.price}
          customerName={currentChat.customerName}
          phone={currentChat.phone}
        />
      </div>
    </div>
  );
}