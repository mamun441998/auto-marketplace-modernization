import React from 'react';

interface RememberMeProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const RememberMe: React.FC<RememberMeProps> = ({ checked, onChange }) => {
  return (
    <div className="flex items-center justify-between text-sm">
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 rounded border-border text-primary focus:ring-primary/40 accent-primary"
        />
        <span className="text-muted-foreground">Remember for 30 days</span>
      </label>
    </div>
  );
};