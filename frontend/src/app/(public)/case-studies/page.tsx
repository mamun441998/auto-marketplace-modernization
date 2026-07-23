"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Play,
  Filter,
  Calculator,
  Star,
  Clock,
  Zap,
  Globe,
  Award,
  ChevronRight,
  ChevronDown,
  BarChart3,
  Users,
  Car,
  DollarSign,
  Calendar,
  Rocket,
  Target,
  Sparkles,
  X
} from "lucide-react";

export default function CasePage() {
  // State for Industry Filter
  const [activeFilter, setActiveFilter] = useState("All");

  // State for Video Modal Popup
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // State for ROI Calculator
  const [carsSold, setCarsSold] = useState(30);
  const [avgProfit, setAvgProfit] = useState(1200);
  const [employees, setEmployees] = useState(5);

  // State for FAQ Accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Calculated ROI logic
  const estimatedSavings = Math.round((carsSold * avgProfit * 0.15) + (employees * 250));

  // Filter Data
  const caseStudies = [
    { id: 1, name: "Anderson Auto Group", type: "Luxury", location: "Dallas, TX", revenue: "+240%", leads: "450/mo", vehicles: "120+" },
    { id: 2, name: "Elite Motors", type: "Used Cars", location: "Miami, FL", revenue: "+190%", leads: "320/mo", vehicles: "85+" },
    { id: 3, name: "Prime Auto Hub", type: "New Cars", location: "Chicago, IL", revenue: "+210%", leads: "510/mo", vehicles: "200+" },
    { id: 4, name: "NorthStar Cars", type: "EV", location: "Seattle, WA", revenue: "+310%", leads: "600/mo", vehicles: "95+" },
    { id: 5, name: "UrbanDrive Motors", type: "Multi Branch", location: "Austin, TX", revenue: "+275%", leads: "850/mo", vehicles: "350+" },
    { id: 6, name: "Apex Auction House", type: "Auction", location: "Atlanta, GA", revenue: "+160%", leads: "280/mo", vehicles: "500+" }
  ];

  const filteredStudies = activeFilter === "All" 
    ? caseStudies 
    : caseStudies.filter(item => item.type === activeFilter);

  return (
    <div className="min-h-screen bg-[#0B0A0B] text-white selection:bg-[#FC5E01] selection:text-white font-sans overflow-hidden">
      
      {/* Disclaimer Banner */}
      <div className="bg-[#FC5E01]/10 border-b border-[#FC5E01]/20 py-2 px-4 text-center text-xs text-gray-400 w-full">
        <span className="text-[#FC5E01] font-semibold">Note:</span> Illustrative case studies based on realistic dealership workflows and projected outcomes.
      </div>

      {/* 01. HERO SECTION */}
      <section className="relative pt-20 pb-24 px-6 md:px-12 w-full text-center bg-[#0B0A0B]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FC5E01]/15 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] mb-6 text-sm text-[#FC5E01] hover:scale-105 transition-transform cursor-pointer">
            <Sparkles className="w-4 h-4" /> Enterprise-Grade Dealership Success
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Real Dealerships. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FC5E01] to-amber-500">Real Results.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Discover how modern dealerships increased leads, sales, and operational efficiency using MotoHave's enterprise automation suite.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#stories" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#FC5E01] hover:bg-[#e05301] text-white font-semibold transition-all shadow-lg shadow-[#FC5E01]/25 hover:-translate-y-0.5 flex items-center justify-center gap-2">
              View Success Stories <ArrowRight className="w-4 h-4" />
            </Link>
            {/* Book a Demo -> Contact Page */}
            <Link href="/contact" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] text-white font-semibold transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
              Book a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* CUSTOMER LOGOS STRIP */}
      <section className="py-10 bg-[#120E0C] border-y border-[rgba(255,255,255,0.06)] px-6 w-full">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-6">Trusted By Leading Dealership Networks Worldwide</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all">
            <span className="text-xl font-bold tracking-wider text-gray-400">TOYOTA</span>
            <span className="text-xl font-bold tracking-wider text-gray-400">BMW</span>
            <span className="text-xl font-bold tracking-wider text-gray-400">FORD</span>
            <span className="text-xl font-bold tracking-wider text-gray-400">HONDA</span>
            <span className="text-xl font-bold tracking-wider text-gray-400">NISSAN</span>
            <span className="text-xl font-bold tracking-wider text-gray-400">AUDI</span>
          </div>
        </div>
      </section>

      {/* 02. TRUST STRIP */}
      <section className="bg-[#0B0A0B] py-12 px-6 w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-4 rounded-2xl bg-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.04)] hover:border-[#FC5E01]/30 transition-all">
            <div className="text-3xl md:text-4xl font-black text-[#FC5E01]">800+</div>
            <div className="text-sm text-gray-400 mt-1">Dealerships</div>
          </div>
          <div className="p-4 rounded-2xl bg-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.04)] hover:border-[#FC5E01]/30 transition-all">
            <div className="text-3xl md:text-4xl font-black text-[#FC5E01]">120K+</div>
            <div className="text-sm text-gray-400 mt-1">Vehicles Managed</div>
          </div>
          <div className="p-4 rounded-2xl bg-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.04)] hover:border-[#FC5E01]/30 transition-all">
            <div className="text-3xl md:text-4xl font-black text-[#FC5E01]">$180M+</div>
            <div className="text-sm text-gray-400 mt-1">Vehicle Sales</div>
          </div>
          <div className="p-4 rounded-2xl bg-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.04)] hover:border-[#FC5E01]/30 transition-all">
            <div className="text-3xl md:text-4xl font-black text-[#FC5E01]">99.9%</div>
            <div className="text-sm text-gray-400 mt-1">Platform Uptime</div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / RATINGS BADGE */}
      <section className="py-8 bg-[#120E0C] border-y border-[rgba(255,255,255,0.06)] px-6 w-full">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-8 md:gap-16 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="flex text-amber-500"><Star className="w-4 h-4 fill-amber-500" /><Star className="w-4 h-4 fill-amber-500" /><Star className="w-4 h-4 fill-amber-500" /><Star className="w-4 h-4 fill-amber-500" /><Star className="w-4 h-4 fill-amber-500" /></div>
            <span className="font-bold text-white">4.9/5 Rating</span>
          </div>
          <div>Verified on <span className="text-white font-semibold">G2</span></div>
          <div>Trusted on <span className="text-white font-semibold">Capterra</span></div>
          <div>Reviewed on <span className="text-white font-semibold">Trustpilot</span></div>
        </div>
      </section>

      {/* 03. FEATURED SUCCESS STORY */}
      <section className="py-20 px-6 md:px-12 w-full bg-[#0B0A0B]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#FC5E01] text-sm font-bold uppercase tracking-wider">Featured Highlight</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Anderson Auto Group Case Study</h2>
          </div>

          <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative overflow-hidden group hover:border-[#FC5E01]/40 transition-all">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FC5E01]/10 rounded-full blur-[90px] pointer-events-none"></div>
            
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="px-3 py-1 rounded-full bg-[#FC5E01]/20 text-[#FC5E01] text-xs font-semibold">Toyota • BMW • Ford</div>
                <span className="text-gray-400 text-sm">Dallas, Texas</span>
              </div>
              <h3 className="text-3xl font-bold mb-4">How Anderson Auto Group Scaled Revenue by 240% in 6 Months</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Struggling with disconnected spreadsheets and lagging lead responses, Anderson Auto Group adopted MotoHave to unify inventory, CRM, and automated marketing into one seamless hub.
              </p>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsVideoOpen(true)}
                  className="px-6 py-3 rounded-xl bg-[#FC5E01] hover:bg-[#e05301] text-white font-semibold transition-all flex items-center gap-2 shadow-lg shadow-[#FC5E01]/20 hover:-translate-y-0.5 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" /> Watch Owner's Story
                </button>
              </div>
            </div>

            <div className="relative rounded-2xl bg-[#120E0C] border border-[rgba(255,255,255,0.08)] p-6 shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-3">
                  <span className="text-gray-400 text-sm">Monthly Lead Growth</span>
                  <span className="text-[#FC5E01] font-bold">+248%</span>
                </div>
                <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-3">
                  <span className="text-gray-400 text-sm">Lead Response Time</span>
                  <span className="text-green-400 font-bold">12 Mins (Was 4 Hours)</span>
                </div>
                <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-3">
                  <span className="text-gray-400 text-sm">Manual Admin Hours</span>
                  <span className="text-red-400 font-bold">-78% Reduced</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04. SUCCESS METRICS */}
      <section className="py-20 px-6 md:px-12 bg-[#120E0C] border-y border-[rgba(255,255,255,0.06)] w-full">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] hover:border-[#FC5E01]/50 hover:-translate-y-1 transition-all">
              <div className="text-3xl font-extrabold text-[#FC5E01] mb-2">+248%</div>
              <div className="text-gray-300 font-medium">Lead Growth</div>
              <p className="text-xs text-gray-500 mt-1">Captured through automated multi-channel funnels</p>
            </div>
            <div className="p-6 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] hover:border-[#FC5E01]/50 hover:-translate-y-1 transition-all">
              <div className="text-3xl font-extrabold text-[#FC5E01] mb-2">+67%</div>
              <div className="text-gray-300 font-medium">Vehicle Sales</div>
              <p className="text-xs text-gray-500 mt-1">Accelerated closing velocity across branches</p>
            </div>
            <div className="p-6 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] hover:border-[#FC5E01]/50 hover:-translate-y-1 transition-all">
              <div className="text-3xl font-extrabold text-[#FC5E01] mb-2">-78%</div>
              <div className="text-gray-300 font-medium">Manual Work</div>
              <p className="text-xs text-gray-500 mt-1">Automated data entry and document sync</p>
            </div>
            <div className="p-6 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] hover:border-[#FC5E01]/50 hover:-translate-y-1 transition-all">
              <div className="text-3xl font-extrabold text-[#FC5E01] mb-2">+4.3M</div>
              <div className="text-gray-300 font-medium">Inventory Value</div>
              <p className="text-xs text-gray-500 mt-1">Optimized turnover rate and pricing intelligence</p>
            </div>
          </div>
        </div>
      </section>

      {/* 05. CHALLENGE -> SOLUTION -> RESULTS */}
      <section className="py-20 px-6 md:px-12 w-full bg-[#0B0A0B]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Transformation Breakdown</h2>
            <p className="text-gray-400 mt-2">How dealerships transition from operational chaos to automated growth</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] hover:border-red-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center font-bold mb-6">01</div>
              <h3 className="text-xl font-semibold mb-4 text-red-400">The Challenge</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-center gap-2">✕ Inventory spread across scattered spreadsheets</li>
                <li className="flex items-center gap-2">✕ Slow response times to incoming leads</li>
                <li className="flex items-center gap-2">✕ Absence of centralized CRM systems</li>
                <li className="flex items-center gap-2">✕ Outdated websites with low conversions</li>
                <li className="flex items-center gap-2">✕ Zero marketing automation workflows</li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] hover:border-[#FC5E01]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#FC5E01]/10 text-[#FC5E01] flex items-center justify-center font-bold mb-6">02</div>
              <h3 className="text-xl font-semibold mb-4 text-[#FC5E01]">MotoHave Solution</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FC5E01]" /> High-performance Website Builder</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FC5E01]" /> Advanced Dealership CRM</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FC5E01]" /> AI Lead Qualification & Automation</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FC5E01]" /> Real-time Multi-channel Inventory Sync</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FC5E01]" /> Integrated Analytics & Marketing</li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] hover:border-green-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center font-bold mb-6">03</div>
              <h3 className="text-xl font-semibold mb-4 text-green-400">The Results</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-center gap-2">✓ Dealership sales effectively doubled</li>
                <li className="flex items-center gap-2">✓ Lead response dropped to under 12 minutes</li>
                <li className="flex items-center gap-2">✓ 100% automated real-time inventory sync</li>
                <li className="flex items-center gap-2">✓ Exponential revenue expansion month-over-month</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 06. THE MOTOHAVE SHIFT (FULL WIDTH BACKGROUND) */}
      <section className="py-24 px-6 md:px-12 w-full bg-[#120E0C] border-y border-[rgba(255,255,255,0.06)] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">The MotoHave Shift</h2>
            <p className="text-gray-400 mt-2">See how traditional hurdles are replaced with streamlined digital infrastructure</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-red-950/10 border border-red-500/20">
              <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">Before MotoHave</h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-center justify-between p-3 rounded-xl bg-[rgba(255,255,255,0.02)]">
                  <span>Inventory Tracked In</span> <span className="text-red-400 font-semibold">Spreadsheets / Excel</span>
                </li>
                <li className="flex items-center justify-between p-3 rounded-xl bg-[rgba(255,255,255,0.02)]">
                  <span>Contract Handling</span> <span className="text-red-400 font-semibold">Physical Paperwork</span>
                </li>
                <li className="flex items-center justify-between p-3 rounded-xl bg-[rgba(255,255,255,0.02)]">
                  <span>Customer Comms</span> <span className="text-red-400 font-semibold">Unorganized WhatsApp Chats</span>
                </li>
                <li className="flex items-center justify-between p-3 rounded-xl bg-[rgba(255,255,255,0.02)]">
                  <span>Lead Assignment</span> <span className="text-red-400 font-semibold">Manual & Delayed</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-orange-950/10 border border-[#FC5E01]/30">
              <h3 className="text-xl font-bold text-[#FC5E01] mb-6 flex items-center gap-2">After MotoHave</h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center justify-between p-3 rounded-xl bg-[rgba(255,255,255,0.02)]">
                  <span>Inventory Tracked In</span> <span className="text-[#FC5E01] font-semibold">Real-time MotoHave Dashboard</span>
                </li>
                <li className="flex items-center justify-between p-3 rounded-xl bg-[rgba(255,255,255,0.02)]">
                  <span>Contract Handling</span> <span className="text-[#FC5E01] font-semibold">Automated Digital CRM</span>
                </li>
                <li className="flex items-center justify-between p-3 rounded-xl bg-[rgba(255,255,255,0.02)]">
                  <span>Customer Comms</span> <span className="text-[#FC5E01] font-semibold">Omnichannel Unified Inbox</span>
                </li>
                <li className="flex items-center justify-between p-3 rounded-xl bg-[rgba(255,255,255,0.02)]">
                  <span>Lead Assignment</span> <span className="text-[#FC5E01] font-semibold">Instant AI Routing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 07. TIMELINE WITH ICONS */}
      <section className="py-20 px-6 md:px-12 w-full bg-[#0B0A0B]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Implementation Timeline</h2>
            <p className="text-gray-400 mt-2">Your seamless path from onboarding to full-scale profitability</p>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-1/2 before:-translate-x-1/2 before:w-1 before:bg-gradient-to-b before:from-[#FC5E01] before:via-[rgba(255,255,255,0.1)] before:to-[rgba(255,255,255,0.02)]">
            {[
              { week: "Week 1", title: "Website Published", desc: "Custom branded dealership portal goes live.", icon: Globe },
              { week: "Week 2", title: "Inventory Imported", desc: "All vehicle listings synced automatically.", icon: Car },
              { week: "Week 3", title: "CRM Active", desc: "Staff trained, leads routed into one dashboard.", icon: Users },
              { week: "Week 4", title: "AI Running", desc: "Automated follow-ups and marketing funnels kick in.", icon: Zap },
              { week: "Month 2", title: "+180 Leads", desc: "Noticeable boost in inbound conversions.", icon: Target },
              { week: "Month 6", title: "Revenue +240%", desc: "Full maturity and scaling reached across branches.", icon: Rocket }
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div key={idx} className="flex items-center justify-between w-full relative">
                  <div className="w-5/12 text-right pr-8">
                    <span className="text-[#FC5E01] font-bold">{item.week}</span>
                    <h4 className="font-semibold text-lg">{item.title}</h4>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#120E0C] border-2 border-[#FC5E01] flex items-center justify-center z-10 text-[#FC5E01] shrink-0 shadow-lg shadow-[#FC5E01]/20">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="w-5/12 pl-8 text-left text-gray-400 text-sm">
                    {item.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 08. VIDEO BACKGROUND / TESTIMONIAL (FULL WIDTH BACKGROUND) */}
      <section className="py-24 px-6 md:px-12 w-full bg-[#120E0C] border-y border-[rgba(255,255,255,0.06)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FC5E01]/10 via-transparent to-transparent pointer-events-none"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-3xl p-8 md:p-16 text-center relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#FC5E01]/15 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div 
              onClick={() => setIsVideoOpen(true)}
              className="w-16 h-16 rounded-full bg-[#FC5E01] text-white flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#FC5E01]/30 cursor-pointer hover:scale-110 transition-transform"
            >
              <Play className="w-6 h-6 fill-white ml-1" />
            </div>

            <blockquote className="text-xl md:text-2xl font-medium text-gray-200 max-w-2xl mx-auto mb-6">
              "MotoHave completely transformed our dealership operations. We stopped chasing spreadsheets and started closing deals."
            </blockquote>

            <div className="font-semibold text-white text-lg">Marcus Vance</div>
            <div className="text-sm text-gray-400">Managing Director, Elite Auto Group</div>
          </div>
        </div>
      </section>

      {/* 09 & 10. MORE SUCCESS STORIES GRID & INDUSTRY FILTERS */}
      <section id="stories" className="py-24 px-6 md:px-12 w-full bg-[#0B0A0B]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">More Success Stories</h2>
              <p className="text-gray-400 mt-1">Explore real transformations across multiple vehicle sectors</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {["All", "Luxury", "Used Cars", "New Cars", "EV", "Multi Branch", "Auction"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeFilter === filter
                      ? "bg-[#FC5E01] text-white shadow-md shadow-[#FC5E01]/20 scale-105"
                      : "bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-gray-400 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudies.map((study) => (
              <div key={study.id} className="p-6 rounded-3xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] hover:border-[#FC5E01]/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#FC5E01]/10 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs px-3 py-1 rounded-full bg-[#FC5E01]/10 text-[#FC5E01] font-semibold">{study.type}</span>
                    <span className="text-xs text-gray-400">{study.location}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{study.name}</h3>
                  <div className="grid grid-cols-3 gap-2 my-4 py-3 border-y border-[rgba(255,255,255,0.08)] text-center">
                    <div>
                      <div className="text-sm font-bold text-[#FC5E01]">{study.revenue}</div>
                      <div className="text-[10px] text-gray-400">Revenue</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-200">{study.leads}</div>
                      <div className="text-[10px] text-gray-400">Leads</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-200">{study.vehicles}</div>
                      <div className="text-[10px] text-gray-400">Vehicles</div>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-4 py-3 rounded-xl bg-[rgba(255,255,255,0.03)] hover:bg-[#FC5E01] hover:text-white border border-[rgba(255,255,255,0.08)] text-sm font-semibold transition-all flex items-center justify-center gap-2 group">
                  Read Case Study <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. PLATFORM IMPACT DASHBOARD */}
      <section className="py-24 px-6 md:px-12 w-full bg-[#120E0C] border-y border-[rgba(255,255,255,0.06)]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Platform Impact Dashboard</h2>
                <p className="text-gray-400 text-sm mt-1">Live simulation of average performance metrics scaling</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-red-400"><span className="w-2.5 h-2.5 rounded-full bg-red-400"></span> Before MotoHave</span>
                <span className="flex items-center gap-1.5 text-[#FC5E01]"><span className="w-2.5 h-2.5 rounded-full bg-[#FC5E01]"></span> After MotoHave</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#0B0A0B] border border-[rgba(255,255,255,0.06)]">
                <div className="text-sm text-gray-400 mb-2">Monthly Revenue Generation</div>
                <div className="flex justify-between items-end h-32 gap-4 pt-4 border-b border-[rgba(255,255,255,0.08)]">
                  <div className="w-1/2 bg-red-500/20 rounded-t-lg h-1/3 flex items-center justify-center text-xs text-red-400 font-bold transition-all duration-500 hover:h-2/5">$45k</div>
                  <div className="w-1/2 bg-gradient-to-t from-[#FC5E01] to-amber-500 rounded-t-lg h-full flex items-center justify-center text-xs text-white font-bold shadow-lg shadow-[#FC5E01]/30">$155k</div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#0B0A0B] border border-[rgba(255,255,255,0.06)]">
                <div className="text-sm text-gray-400 mb-2">Qualified Lead Volume</div>
                <div className="flex justify-between items-end h-32 gap-4 pt-4 border-b border-[rgba(255,255,255,0.08)]">
                  <div className="w-1/2 bg-red-500/20 rounded-t-lg h-1/4 flex items-center justify-center text-xs text-red-400 font-bold">80</div>
                  <div className="w-1/2 bg-gradient-to-t from-[#FC5E01] to-amber-500 rounded-t-lg h-5/6 flex items-center justify-center text-xs text-white font-bold shadow-lg shadow-[#FC5E01]/30">420</div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#0B0A0B] border border-[rgba(255,255,255,0.06)]">
                <div className="text-sm text-gray-400 mb-2">Inventory Sync Speed</div>
                <div className="flex justify-between items-end h-32 gap-4 pt-4 border-b border-[rgba(255,255,255,0.08)]">
                  <div className="w-1/2 bg-red-500/20 rounded-t-lg h-1/6 flex items-center justify-center text-xs text-red-400 font-bold">24 Hrs</div>
                  <div className="w-1/2 bg-gradient-to-t from-[#FC5E01] to-amber-500 rounded-t-lg h-full flex items-center justify-center text-xs text-white font-bold shadow-lg shadow-[#FC5E01]/30">Instant</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. CUSTOMER TESTIMONIALS */}
      <section className="py-20 px-6 md:px-12 w-full bg-[#0B0A0B]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">What Dealership Owners Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-3xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] flex flex-col justify-between hover:border-[#FC5E01]/30 transition-all">
              <div>
                <div className="flex gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500" />)}
                </div>
                <p className="text-gray-300 mb-6">"MotoHave reduced our team's manual workload by over 70%. It is hands down the best investment we made."</p>
              </div>
              <div>
                <div className="font-semibold">John Smith</div>
                <div className="text-xs text-gray-400">Dealership Owner, Texas</div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] flex flex-col justify-between hover:border-[#FC5E01]/30 transition-all">
              <div>
                <div className="flex gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500" />)}
                </div>
                <p className="text-gray-300 mb-6">"The automated lead qualification alone doubled our closing rate within the first month of deployment."</p>
              </div>
              <div>
                <div className="font-semibold">Sarah Jenkins</div>
                <div className="text-xs text-gray-400">General Manager, Florida</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. CALCULATE YOUR DEALERSHIP'S GROWTH POTENTIAL */}
      <section className="py-24 px-6 md:px-12 w-full bg-[#120E0C] border-y border-[rgba(255,255,255,0.06)]">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-[#FC5E01] text-sm font-bold uppercase tracking-wider">Interactive Tool</span>
              <h2 className="text-3xl font-bold mt-2 mb-4">Calculate Your Dealership's Growth Potential</h2>
              <p className="text-gray-400 text-sm mb-6">Adjust the sliders to estimate monthly cost savings and revenue increments with MotoHave.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="flex justify-between text-sm text-gray-300 mb-2">
                    <span>Cars Sold / Month</span>
                    <span className="text-[#FC5E01] font-bold">{carsSold}</span>
                  </label>
                  <input 
                    type="range" min="5" max="200" value={carsSold} 
                    onChange={(e) => setCarsSold(Number(e.target.value))}
                    className="w-full accent-[#FC5E01] cursor-pointer" 
                  />
                </div>

                <div>
                  <label className="flex justify-between text-sm text-gray-300 mb-2">
                    <span>Average Profit per Car ($)</span>
                    <span className="text-[#FC5E01] font-bold">${avgProfit}</span>
                  </label>
                  <input 
                    type="range" min="500" max="5000" step="100" value={avgProfit} 
                    onChange={(e) => setAvgProfit(Number(e.target.value))}
                    className="w-full accent-[#FC5E01] cursor-pointer" 
                  />
                </div>

                <div>
                  <label className="flex justify-between text-sm text-gray-300 mb-2">
                    <span>Sales & Admin Employees</span>
                    <span className="text-[#FC5E01] font-bold">{employees}</span>
                  </label>
                  <input 
                    type="range" min="1" max="30" value={employees} 
                    onChange={(e) => setEmployees(Number(e.target.value))}
                    className="w-full accent-[#FC5E01] cursor-pointer" 
                  />
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-[#0B0A0B] border border-[#FC5E01]/30 text-center flex flex-col justify-center shadow-xl">
              <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider font-semibold">Estimated Monthly Savings & Growth</div>
              <div className="text-4xl md:text-5xl font-black text-[#FC5E01] my-4">${estimatedSavings.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mb-8">Based on efficiency multipliers and recovered administrative hours.</p>
              {/* Claim Results (Book Demo) -> Contact Page */}
              <Link href="/contact" className="w-full py-4 rounded-xl bg-[#FC5E01] hover:bg-[#e05301] text-white font-semibold transition-all shadow-lg shadow-[#FC5E01]/25 hover:-translate-y-0.5 flex items-center justify-center gap-2">
                Claim These Results <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 14. INTERACTIVE ACCORDION FAQ */}
      <section className="py-20 px-6 md:px-12 w-full bg-[#0B0A0B]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "How long does it take to migrate my inventory?", a: "Most dealerships are fully onboarded with automated inventory feeds within 48 to 72 hours." },
              { q: "Can MotoHave integrate with our existing tools?", a: "Yes, MotoHave offers native synchronization APIs for major DMS, CRM, and payment gateways." },
              { q: "Is training provided for our dealership staff?", a: "Yes, dedicated customer success managers provide end-to-end training for all team members." }
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="p-6 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] cursor-pointer transition-all hover:border-[#FC5E01]/30"
                >
                  <div className="flex items-center justify-between font-semibold text-lg text-white">
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#FC5E01] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </div>
                  {isOpen && (
                    <p className="text-gray-400 text-sm mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)] animate-fadeIn">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STILL HAVE QUESTIONS MINI SECTION */}
      <section className="py-12 bg-[#120E0C] border-y border-[rgba(255,255,255,0.06)] px-6 w-full text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
          <p className="text-gray-400 text-sm mb-6">Schedule a free consultation with our enterprise automotive specialists.</p>
          {/* Schedule Consultation -> Contact Page */}
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[rgba(255,255,255,0.03)] hover:bg-[#FC5E01] hover:text-white border border-[rgba(255,255,255,0.08)] text-sm font-semibold transition-all">
            Schedule Free Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 15. FINAL CTA SECTION */}
      <section className="py-24 px-6 md:px-12 w-full text-center relative bg-[#0B0A0B]">
        <div className="max-w-5xl mx-auto relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FC5E01]/20 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-3xl p-12 relative overflow-hidden shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Ready To Become Our Next Success Story?</h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">Join hundreds of modern dealerships scaling past their limits with MotoHave's automated infrastructure.</p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Start Free Trial -> Register Page */}
              <Link href="/register" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#FC5E01] hover:bg-[#e05301] text-white font-semibold transition-all shadow-lg shadow-[#FC5E01]/25 hover:-translate-y-0.5 flex items-center justify-center gap-2">
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </Link>
              {/* Book Demo -> Contact Page */}
              <Link href="/contact" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] text-white font-semibold transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
                Book Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- VIDEO POPUP MODAL --- */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl bg-[#0B0A0B] border border-[rgba(255,255,255,0.1)] rounded-3xl overflow-hidden shadow-2xl">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-[#FC5E01] text-white transition-all cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Video Container */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                title="Dealership Success Story"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}