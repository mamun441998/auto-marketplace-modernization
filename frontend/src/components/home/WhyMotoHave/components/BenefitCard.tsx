import React from 'react';
import { 
  Car, Users, Layout, Bot, CreditCard, BarChart3, Megaphone, ShieldCheck, ArrowRight 
} from 'lucide-react';
import { FeatureItem } from '../types';

interface BenefitCardProps {
  feature: FeatureItem;
  isActive: boolean;
  onHover: () => void;
}

export const BenefitCard: React.FC<BenefitCardProps> = ({ feature, isActive, onHover }) => {
  // Map icon name string to Lucide component
  const getIcon = (name: string) => {
    const props = { className: `w-6 h-6 transition-transform duration-300 ${isActive ? 'text-[#FC5E01] rotate-12 scale-110' : 'text-[#94A3B8]'}` };
    switch (name) {
      case 'Car': return <Car {...props} />;
      case 'Users': return <Users {...props} />;
      case 'Layout': return <Layout {...props} />;
      case 'Bot': return <Bot {...props} />;
      case 'CreditCard': return <CreditCard {...props} />;
      case 'BarChart3': return <BarChart3 {...props} />;
      case 'Megaphone': return <Megaphone {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      default: return <Car {...props} />;
    }
  };

  return (
    <div
      onMouseEnter={onHover}
      className={`group relative p-6 rounded-2xl transition-all duration-300 cursor-pointer border ${
        isActive 
          ? 'bg-[#111827] border-[#FC5E01] shadow-[0_0_30px_rgba(252,94,1,0.15)] translate-x-1' 
          : 'bg-[#111827]/60 border-[#1F2937] hover:border-[#1F2937]/80 hover:bg-[#111827]'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl transition-colors duration-300 ${isActive ? 'bg-[#FC5E01]/10 border border-[#FC5E01]/30' : 'bg-[#1F2937]/50 border border-[#1F2937]'}`}>
          {getIcon(feature.icon)}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className={`text-lg font-bold transition-colors duration-300 ${isActive ? 'text-white translate-x-1' : 'text-white/90 group-hover:text-white'}`}>
              {feature.title}
            </h3>
            {feature.metrics && (
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all duration-300 ${isActive ? 'bg-[#FC5E01]/20 text-[#FC5E01]' : 'bg-[#1F2937] text-[#94A3B8]'}`}>
                {feature.metrics.value}
              </span>
            )}
          </div>
          
          <p className="text-sm text-[#94A3B8] mb-3 leading-relaxed">
            {feature.subtitle}
          </p>
          
          <div className="flex items-center text-xs font-semibold text-[#FC5E01] opacity-90 group-hover:opacity-100">
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </div>
  );
};