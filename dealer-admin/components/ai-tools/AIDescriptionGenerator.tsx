"use client";

import { useState } from "react";
import {
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  FileText,
  AlertTriangle,
} from "lucide-react";

import { generateVehicleDescription } from "@/lib/ai";

export default function AIDescriptionGenerator() {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [error, setError] = useState("");

  const [inputs, setInputs] = useState({
    title: "",
    condition: "Excellent",
    tone: "Luxury & Elegant",
    includeFeatures: true,
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputs.title.trim() || loading) return;

    setLoading(true);
    setError("");

    const res = await generateVehicleDescription({
      title: inputs.title.trim(),
      condition: inputs.condition,
      tone: inputs.tone,
      include_features: inputs.includeFeatures,
    });

    if (res.success && res.description) {
      setGeneratedText(res.description);
    } else {
      setError(res.message || "Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Parameters Panel */}
      <form
        onSubmit={handleGenerate}
        className="lg:col-span-2 bg-[#111B33] border border-[#1e2a4a] rounded-2xl p-5 space-y-4"
      >
        <div>
          <label className="block text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">
            Vehicle Specs / Year Make Model
          </label>
          <input
            type="text"
            required
            value={inputs.title}
            onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
            placeholder="e.g., 2024 BMW X5 xDrive40i"
            className="w-full rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FC5E01] transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">
              Condition
            </label>
            <select
              value={inputs.condition}
              onChange={(e) => setInputs({ ...inputs, condition: e.target.value })}
              className="w-full rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#FC5E01]"
            >
              <option value="Brand New">Brand New</option>
              <option value="Excellent">Excellent / Certified</option>
              <option value="Good">Good / Fair Wear</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1.5">
              Marketing Tone
            </label>
            <select
              value={inputs.tone}
              onChange={(e) => setInputs({ ...inputs, tone: e.target.value })}
              className="w-full rounded-xl border border-[#1e2a4a] bg-[#0A0F1E] px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#FC5E01]"
            >
              <option value="Luxury & Elegant">Luxury &amp; Premium</option>
              <option value="Aggressive Sales">Aggressive Sales</option>
              <option value="SEO Optimized">SEO Descriptive</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="features"
            checked={inputs.includeFeatures}
            onChange={(e) =>
              setInputs({ ...inputs, includeFeatures: e.target.checked })
            }
            className="rounded border-[#1e2a4a] bg-[#0A0F1E] text-[#FC5E01] focus:ring-0"
          />
          <label
            htmlFor="features"
            className="text-xs text-[#94A3B8] font-medium select-none"
          >
            Include safety &amp; finance highlights
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#FC5E01] py-2.5 text-xs font-black text-white hover:bg-[#E5540A] transition-all disabled:opacity-50"
        >
          <Sparkles size={13} className={loading ? "animate-spin" : ""} />
          {loading ? "Generating..." : "Generate description"}
        </button>
      </form>

      {/* Output */}
      <div className="lg:col-span-3 bg-[#111B33] border border-[#1e2a4a] rounded-2xl flex flex-col min-h-[320px] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-[#1e2a4a] bg-[#0A0F1E]/30">
          <div className="flex items-center gap-2">
            <FileText size={14} className="text-[#FC5E01]" />
            <span className="text-[11px] font-bold text-white uppercase tracking-wider">
              Generated Output
            </span>
          </div>
          {generatedText && (
            <div className="flex items-center gap-2">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] text-[#94A3B8] hover:text-white transition-colors"
              >
                {copied ? (
                  <Check size={11} className="text-emerald-400" />
                ) : (
                  <Copy size={11} />
                )}
                {copied ? "Copied" : "Copy"}
              </button>
              <button
                onClick={() => setGeneratedText("")}
                className="p-1.5 rounded-lg border border-[#1e2a4a] bg-[#0A0F1E] text-[#64748B] hover:text-white"
              >
                <RotateCcw size={12} />
              </button>
            </div>
          )}
        </div>

        <div className="flex-1 p-5 font-sans text-xs leading-relaxed text-slate-300 whitespace-pre-wrap selection:bg-[#FC5E01]/30">
          {generatedText ? (
            generatedText
          ) : error ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-amber-300/90">
              <AlertTriangle size={22} className="mb-2 text-amber-400" />
              <p className="max-w-sm leading-relaxed">{error}</p>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-[#64748B]">
              <Sparkles size={24} className="mb-2 text-[#1e2a4a]" />
              <p>
                Enter the vehicle details and generate an optimized listing
                description.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
