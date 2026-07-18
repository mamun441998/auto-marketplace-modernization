"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, CarFront, Users, X } from "lucide-react";
import { inventoryVehicles, leads } from "@/lib/dealerData";

export default function GlobalSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const matchedVehicles = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return inventoryVehicles
      .filter((v) => `${v.make} ${v.model}`.toLowerCase().includes(q) || v.vin.toLowerCase().includes(q))
      .slice(0, 4);
  }, [query]);

  const matchedLeads = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return leads
      .filter((l) => l.name.toLowerCase().includes(q) || l.interestedIn.toLowerCase().includes(q))
      .slice(0, 4);
  }, [query]);

  const hasResults = matchedVehicles.length > 0 || matchedLeads.length > 0;

  const goToVehicle = (id: number) => {
    router.push(`/inventory/${id}`);
    setQuery("");
    setIsOpen(false);
  };

  const goToLeads = () => {
    router.push(`/leads`);
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md" ref={containerRef}>
      <div className="flex items-center gap-2 rounded-xl border border-[#1e2a4a] bg-[#111B33] px-4 py-2.5">
        <Search size={16} className="text-[#64748B] flex-shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search vehicles, leads..."
          className="w-full bg-transparent text-sm text-white placeholder:text-[#64748B] focus:outline-none"
        />
        {query && (
          <button onClick={() => setQuery("")} className="text-[#64748B] hover:text-white flex-shrink-0">
            <X size={14} />
          </button>
        )}
      </div>

      {isOpen && query.trim() && (
        <div className="absolute left-0 right-0 top-full z-30 mt-2 rounded-2xl border border-[#1e2a4a] bg-[#0C1A32] shadow-2xl overflow-hidden">
          {hasResults ? (
            <div className="max-h-80 overflow-y-auto p-2">
              {matchedVehicles.length > 0 && (
                <div className="mb-2">
                  <p className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#64748B]">Vehicles</p>
                  {matchedVehicles.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => goToVehicle(v.id)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-[#111B33] transition-colors"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#111B33] border border-[#1e2a4a] text-[#FC5E01] flex-shrink-0">
                        <CarFront size={14} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{v.make} {v.model}</p>
                        <p className="text-xs text-[#64748B]">${v.price.toLocaleString()} · {v.status}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {matchedLeads.length > 0 && (
                <div>
                  <p className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#64748B]">Leads</p>
                  {matchedLeads.map((l) => (
                    <button
                      key={l.id}
                      onClick={goToLeads}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-[#111B33] transition-colors"
                    >
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${l.gradient} text-[10px] font-bold text-white flex-shrink-0`}>
                        {l.avatarInitials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{l.name}</p>
                        <p className="text-xs text-[#64748B] truncate">{l.interestedIn}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="py-8 text-center text-sm text-[#64748B]">No results for &quot;{query}&quot;</div>
          )}
        </div>
      )}
    </div>
  );
}