import React from 'react';

export default function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className = ''
}) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200/80 ${className}`}>
      <div className="space-y-1 max-w-2xl">
        {eyebrow && (
          <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-teal-800 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
            <span>{eyebrow}</span>
          </div>
        )}
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
          {title}
        </h2>
        {description && (
          <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action && (
        <div className="shrink-0 flex items-center gap-2">
          {action}
        </div>
      )}
    </div>
  );
}
