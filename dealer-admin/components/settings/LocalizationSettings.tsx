// dealer-admin/components/settings/LocalizationSettings.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Check } from "lucide-react";

const timezones = [
  { value: "-12", label: "Pacific/Baker Island (GMT-12)" },
  { value: "-11", label: "Pacific/Pago Pago (GMT-11)" },
  { value: "-10", label: "Pacific/Honolulu (GMT-10)" },
  { value: "-9", label: "America/Anchorage (GMT-9)" },
  { value: "-8", label: "America/Los Angeles (GMT-8)" },
  { value: "-7", label: "America/Denver (GMT-7)" },
  { value: "-6", label: "America/Chicago (GMT-6)" },
  { value: "-5", label: "America/New York (GMT-5)" },
  { value: "-4", label: "America/Halifax (GMT-4)" },
  { value: "-3", label: "America/Sao Paulo (GMT-3)" },
  { value: "-2", label: "Atlantic/South Georgia (GMT-2)" },
  { value: "-1", label: "Atlantic/Azores (GMT-1)" },
  { value: "0", label: "Europe/London (GMT+0)" },
  { value: "+1", label: "Europe/Paris (GMT+1)" },
  { value: "+1b", label: "Europe/Berlin (GMT+1)" },
  { value: "+2", label: "Europe/Athens (GMT+2)" },
  { value: "+2c", label: "Africa/Cairo (GMT+2)" },
  { value: "+3", label: "Europe/Moscow (GMT+3)" },
  { value: "+3n", label: "Africa/Nairobi (GMT+3)" },
  { value: "+3.5", label: "Asia/Tehran (GMT+3:30)" },
  { value: "+4", label: "Asia/Dubai (GMT+4)" },
  { value: "+4.5", label: "Asia/Kabul (GMT+4:30)" },
  { value: "+5", label: "Asia/Karachi (GMT+5)" },
  { value: "+5.5", label: "Asia/Kolkata (GMT+5:30)" },
  { value: "+5.75", label: "Asia/Kathmandu (GMT+5:45)" },
  { value: "+6", label: "Asia/Dhaka (GMT+6)" },
  { value: "+6.5", label: "Asia/Yangon (GMT+6:30)" },
  { value: "+7", label: "Asia/Bangkok (GMT+7)" },
  { value: "+7j", label: "Asia/Jakarta (GMT+7)" },
  { value: "+8", label: "Asia/Singapore (GMT+8)" },
  { value: "+8s", label: "Asia/Shanghai (GMT+8)" },
  { value: "+8h", label: "Asia/Hong Kong (GMT+8)" },
  { value: "+9", label: "Asia/Tokyo (GMT+9)" },
  { value: "+9s", label: "Asia/Seoul (GMT+9)" },
  { value: "+9.5", label: "Australia/Darwin (GMT+9:30)" },
  { value: "+10", label: "Australia/Sydney (GMT+10)" },
  { value: "+11", label: "Pacific/Guadalcanal (GMT+11)" },
  { value: "+12", label: "Pacific/Auckland (GMT+12)" },
];

const currencies = [
  { value: "USD", label: "USD ($) — US Dollar" },
  { value: "EUR", label: "EUR (€) — Euro" },
  { value: "GBP", label: "GBP (£) — British Pound" },
  { value: "CAD", label: "CAD ($) — Canadian Dollar" },
  { value: "AUD", label: "AUD ($) — Australian Dollar" },
  { value: "INR", label: "INR (₹) — Indian Rupee" },
  { value: "BDT", label: "BDT (৳) — Bangladeshi Taka" },
  { value: "PKR", label: "PKR (₨) — Pakistani Rupee" },
  { value: "AED", label: "AED (د.إ) — UAE Dirham" },
  { value: "SAR", label: "SAR (﷼) — Saudi Riyal" },
  { value: "SGD", label: "SGD ($) — Singapore Dollar" },
  { value: "JPY", label: "JPY (¥) — Japanese Yen" },
  { value: "CNY", label: "CNY (¥) — Chinese Yuan" },
  { value: "MYR", label: "MYR (RM) — Malaysian Ringgit" },
  { value: "IDR", label: "IDR (Rp) — Indonesian Rupiah" },
  { value: "ZAR", label: "ZAR (R) — South African Rand" },
  { value: "NGN", label: "NGN (₦) — Nigerian Naira" },
  { value: "BRL", label: "BRL (R$) — Brazilian Real" },
];

interface SearchableDropdownProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

function SearchableDropdown({ label, options, value, onChange, placeholder }: SearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);
  const filtered = options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">{label}</label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FC5E01]"
      >
        <span className={selected ? "text-white" : "text-[#64748B]"}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown size={14} className={`text-[#64748B] transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-30 mt-1.5 rounded-xl border border-[#1e2a4a] bg-[#0C1A32] shadow-xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-2 border-b border-[#1e2a4a] px-3 py-2.5">
            <Search size={14} className="text-[#64748B] flex-shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent text-sm text-white placeholder:text-[#64748B] focus:outline-none"
            />
          </div>

          {/* Options List */}
          <div className="max-h-56 overflow-y-auto p-1.5">
            {filtered.length > 0 ? (
              filtered.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                    setQuery("");
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    value === option.value
                      ? "bg-[#FC5E01]/10 text-[#FC5E01] font-semibold"
                      : "text-[#94A3B8] hover:bg-[#111B33] hover:text-white"
                  }`}
                >
                  {option.label}
                  {value === option.value && <Check size={14} />}
                </button>
              ))
            ) : (
              <p className="px-3 py-4 text-center text-xs text-[#64748B]">No results found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function LocalizationSettings() {
  const [currency, setCurrency] = useState("USD");
  const [timezone, setTimezone] = useState("+6");

  return (
    <div className="bg-[#111B33] border border-[#1e2a4a] rounded-2xl p-6 space-y-5">
      <div>
        <h3 className="text-sm font-bold text-white">Localization</h3>
        <p className="text-xs text-[#64748B] mt-0.5">Set your preferred currency and timezone.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SearchableDropdown
          label="Currency"
          options={currencies}
          value={currency}
          onChange={setCurrency}
          placeholder="Select currency..."
        />
        <SearchableDropdown
          label="Timezone"
          options={timezones}
          value={timezone}
          onChange={setTimezone}
          placeholder="Select timezone..."
        />
      </div>
    </div>
  );
}