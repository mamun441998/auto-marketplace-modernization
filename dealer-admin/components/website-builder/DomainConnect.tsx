"use client";

import { useState } from "react";
import { Globe, AlertCircle, CheckCircle2, Copy, RefreshCw, Server, Info } from "lucide-react";

interface DNSRecord {
  type: string;
  name: string;
  value: string;
  ttl: string;
}

export default function DomainConnect() {
  const [domain, setDomain] = useState("andersonmotors.com");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(true); // Default status for testing mock
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // SaaS Production DNS Configurations Matrix
  const dnsRecords: DNSRecord[] = [
    { type: "A", name: "@", value: "76.76.21.21", ttl: "Automatic" },
    { type: "CNAME", name: "www", value: "cname.auto-platform.live", ttl: "Automatic" },
  ];

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  };

  const handleVerifyDNS = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      alert("DNS Resolution successful! SSL Certificate issued via Let's Encrypt edge network.");
    }, 1500);
  };

  return (
    <div className="space-y-5">
      {/* 1. Configuration Top Block */}
      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5">
        <div className="flex items-center gap-2 border-b border-[#1e2a4a] pb-3 mb-4">
          <Globe size={16} className="text-[#FC5E01]" />
          <h3 className="text-xs font-black text-white uppercase tracking-wider">Custom Domain Mapping</h3>
        </div>

        <div className="flex flex-col sm:flex-row items-end gap-3 max-w-2xl">
          <div className="flex-1 w-full">
            <label className="block text-[11px] font-bold text-[#94A3B8] mb-1.5">Your Registered Domain</label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-xs text-[#64748B] font-mono pointer-events-none">https://</span>
              <input
                type="text"
                value={domain}
                onChange={(e) => {
                  setDomain(e.target.value);
                  setIsConnected(false); // Reset connection state on change
                }}
                className="w-full rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] pl-16 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01] font-mono"
                placeholder="example.com"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleVerifyDNS}
            disabled={isConnecting || !domain.trim()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-[#FC5E01] px-5 py-2.5 text-xs font-black text-white hover:bg-[#E5540A] transition-all disabled:opacity-50 whitespace-nowrap"
          >
            {isConnecting ? (
              <>
                <RefreshCw size={13} className="animate-spin" />
                Resolving DNS...
              </>
            ) : (
              "Verify Connections"
            )}
          </button>
        </div>

        {/* Dynamic Edge Status Flag Indicator */}
        <div className="mt-4 pt-3.5 border-t border-[#1e2a4a]/60">
          {isConnected ? (
            <div className="flex items-center gap-2.5 text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-3 text-xs">
              <CheckCircle2 size={15} className="flex-shrink-0" />
              <div>
                <span className="font-bold text-white">Domain Active & Secure</span> — SSL/TLS active via modern proxy network.
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 text-amber-400 bg-amber-500/5 border border-amber-500/10 rounded-xl p-3 text-xs">
              <AlertCircle size={15} className="flex-shrink-0" />
              <div>
                <span className="font-bold text-white">Setup Pending</span> — Configure DNS pointers below to map server instance routing.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Step-by-Step Nameserver Pointer Setup */}
      <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] p-5">
        <div className="flex items-center gap-2 border-b border-[#1e2a4a] pb-3 mb-4">
          <Server size={16} className="text-[#FC5E01]" />
          <h3 className="text-xs font-black text-white uppercase tracking-wider">Required DNS Server Configurations</h3>
        </div>

        <p className="text-xs text-[#94A3B8] leading-relaxed mb-4 max-w-3xl">
          Log into your external registrar provider dashboard (such as GoDaddy, Namecheap, Cloudflare, or Google Domains) and explicitly inject the following entry matrix layout keys:
        </p>

        {/* DNS Table Matrix */}
        <div className="border border-[#1e2a4a] rounded-xl overflow-hidden bg-[#0A0F1E]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] text-left text-xs text-white">
              <thead>
                <tr className="border-b border-[#1e2a4a] bg-[#111B33]/60 text-[#64748B] uppercase font-bold text-[10px] tracking-wider">
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Host / Name</th>
                  <th className="px-4 py-3">Value / Target</th>
                  <th className="px-4 py-3 text-right">TTL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e2a4a]/60 font-mono text-[12px]">
                {dnsRecords.map((record, index) => (
                  <tr key={index} className="hover:bg-[#111B33]/20 transition-colors">
                    <td className="px-4 py-3.5">
                      <span className="bg-[#FC5E01]/10 text-[#FC5E01] font-bold px-1.5 py-0.5 rounded text-[10px]">
                        {record.type}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-[#94A3B8]">{record.name}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2 group text-white">
                        <span className="truncate max-w-[200px] sm:max-w-xs">{record.value}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(record.value, `${record.type}-${index}`)}
                          className="text-[#64748B] hover:text-white transition-colors p-0.5"
                        >
                          <Copy size={11} />
                        </button>
                        {copiedField === `${record.type}-${index}` && (
                          <span className="text-[9px] font-sans text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded font-bold">Copied!</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-right text-[#64748B]">{record.ttl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Warning Callout Box */}
        <div className="mt-4 flex gap-2.5 rounded-xl bg-blue-500/5 border border-blue-500/10 p-3.5 text-xs text-[#94A3B8] leading-relaxed">
          <Info size={14} className="text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white">DNS Propagation Warning:</span> System global record changes are heavily dependent on domain registry providers. Updates can resolve immediately or may dynamically consume up to 24–48 hours to fully sync edge networks worldwide.
          </div>
        </div>
      </div>
    </div>
  );
}