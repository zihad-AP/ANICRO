import React from 'react';

export default function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
  icon: Icon,
  ...props
}) {
  const variants = {
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    teal: 'bg-teal-50/80 text-teal-800 border-teal-200',
    blue: 'bg-blue-50/90 text-blue-800 border-blue-200', // Fact
    amber: 'bg-amber-50/90 text-amber-800 border-amber-200', // Observation
    red: 'bg-rose-50/90 text-rose-800 border-rose-200', // Allegation
    green: 'bg-emerald-50/90 text-emerald-800 border-emerald-200',
    purple: 'bg-purple-50/90 text-purple-800 border-purple-200'
  };

  const sizes = {
    sm: 'text-[10px] px-1.5 py-0.5 gap-1',
    md: 'text-xs px-2 py-0.5 gap-1.5'
  };

  return (
    <span
      className={`inline-flex items-center font-mono text-[11px] font-medium rounded-md border ${variants[variant] || variants.neutral} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      <span>{children}</span>
    </span>
  );
}
