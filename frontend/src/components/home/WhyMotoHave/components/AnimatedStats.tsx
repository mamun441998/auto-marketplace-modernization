import React from 'react';
import { trustBadges } from '../data/benefits';
import { 
  Code, Zap, Cloud, Smartphone, Search, Lock, Database, Headphones 
} from 'lucide-react';

export const AnimatedStats: React.FC = () => {
  const getTrustIcon = (name: string) => {
    const props = { className: "w-5 h-5 text-[#FC5E01]" };
    switch (name) {
      case 'Code': return <Code {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'Cloud': return <Cloud {...props} />;
      case 'Smartphone': return <Smartphone {...props} />;
      case 'Search': return <Search {...props} />;
      case 'Lock': return <Lock {...props} />;
      case 'Database': return <Database {...props} />;
      case 'Headphones': return <Headphones {...props} />;
      default: return <Zap {...props} />;
    }
  };

  return (
    <div className="mt-16 pt-12 border-t border-[#1F2937] relative z-10">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-white mb-2">Engineered for Modern Dealership Growth</h3>
        <p className="text-sm text-[#94A3B8]">Everything you need to scale without technical friction.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {trustBadges.map((badge, idx) => (
          <div 
            key={idx}
            className="flex items-start gap-3 p-4 rounded-xl bg-[#111827]/80 border border-[#1F2937] hover:border-[#FC5E01]/50 transition-all duration-300 group"
          >
            <div className="p-2 rounded-lg bg-[#FC5E01]/10 border border-[#FC5E01]/20 group-hover:scale-110 transition-transform duration-300">
              {getTrustIcon(badge.icon)}
            </div>
            <div>
              <div className="text-sm font-bold text-white mb-0.5">{badge.title}</div>
              <div className="text-xs text-[#94A3B8]">{badge.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};