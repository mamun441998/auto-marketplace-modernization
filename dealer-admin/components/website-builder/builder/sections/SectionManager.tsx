"use client";

import {
  GripVertical,
  Eye,
  EyeOff,
  Settings,
  Plus,
} from "lucide-react";

export interface BuilderSection {
  id: string;
  title: string;
  enabled: boolean;
}

interface Props {
  pageName: string;
  sections: BuilderSection[];

  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onAddSection: () => void;
}

export default function SectionManager({
  pageName,
  sections,
  onToggle,
  onEdit,
  onAddSection,
}: Props) {
  return (
    <div className="rounded-2xl border border-[#1e2a4a] bg-[#111B33] overflow-hidden">

      {/* Header */}

      <div className="border-b border-[#1e2a4a] px-5 py-4 flex items-center justify-between">

        <div>

          <h2 className="text-sm font-bold text-white">
            {pageName} Sections
          </h2>

          <p className="text-xs text-[#94A3B8] mt-1">
            Manage page sections.
          </p>

        </div>

        <button
          type="button"
          onClick={onAddSection}
          className="flex items-center gap-2 rounded-xl bg-[#FC5E01] px-4 py-2 text-sm font-semibold text-white hover:bg-[#E5540A]"
        >
          <Plus size={16} />
          Add Section
        </button>

      </div>

      {/* Body */}

      <div className="divide-y divide-[#1e2a4a]">

        {sections.map((section) => (

          <div
            key={section.id}
            className="flex items-center gap-4 px-5 py-4 hover:bg-[#0A0F1E]/50 transition-colors"
          >

            <GripVertical
              size={18}
              className="text-[#64748B] cursor-grab"
            />

            <div className="flex-1">

              <h4 className="text-sm font-semibold text-white">
                {section.title}
              </h4>

              <p className="text-xs text-[#64748B] mt-1">
                Website Section
              </p>

            </div>

            <button
              onClick={() => onToggle(section.id)}
              className="rounded-lg border border-[#1e2a4a] p-2 hover:border-[#FC5E01]"
            >
              {section.enabled ? (
                <Eye
                  size={17}
                  className="text-emerald-400"
                />
              ) : (
                <EyeOff
                  size={17}
                  className="text-[#64748B]"
                />
              )}
            </button>

            <button
              onClick={() => onEdit(section.id)}
              className="rounded-lg border border-[#1e2a4a] p-2 hover:border-[#FC5E01]"
            >
              <Settings
                size={17}
                className="text-white"
              />
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}