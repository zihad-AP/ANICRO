import React from 'react';

export default function StatusBadge({ status, className = '' }) {
  if (!status) return null;

  // Normalized styling based on AGENTS.md rules & civic design system
  const getStyle = (s) => {
    switch (s) {
      // Project statuses
      case 'Work Completed':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Work Ongoing':
        return 'bg-teal-50 text-teal-800 border-teal-200';
      case 'Pending':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Correction Requested':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'Awaiting Response':
        return 'bg-slate-100 text-slate-700 border-slate-200';

      // Priority levels
      case 'Critical':
      case 'Critical Priority':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'High':
      case 'High Priority':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Medium':
      case 'Medium Priority':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Low':
      case 'Low Priority':
        return 'bg-slate-100 text-slate-700 border-slate-200';

      // Data source badges (Rule #17 & #18)
      case 'Verified Source':
        return 'bg-emerald-50/80 text-emerald-800 border-emerald-200 font-mono';
      case 'Simulated Data':
        return 'bg-slate-100 text-slate-600 border-slate-200 font-mono';

      // Demand statuses
      case 'Approved into Project':
      case 'Commissioned as Project':
      case 'Commissioned as Public Project':
        return 'bg-teal-50 text-teal-800 border-teal-200';
      case 'Priority Recommended':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Aggregated into Hotspot':
        return 'bg-slate-100 text-slate-700 border-slate-200';

      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <span
      className={`inline-flex items-center text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md border ${getStyle(
        status
      )} ${className}`}
    >
      {status}
    </span>
  );
}
