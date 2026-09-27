import React from 'react';
import { 
  AlertTriangle, 
  MapPin, 
  Users, 
  Layers, 
  TrendingUp, 
  ChevronRight, 
  ArrowUpRight,
  ShieldAlert,
  Building2
} from 'lucide-react';
import Card from './common/Card';

export default function HotspotCard({
  hotspot,
  onClick = () => {},
  className = ''
}) {
  if (!hotspot) return null;

  const isCritical = hotspot.severity === 'Critical';
  const isHigh = hotspot.severity === 'High';

  const severityBadgeClass = isCritical
    ? 'bg-rose-50 text-rose-700 border-rose-200'
    : isHigh
    ? 'bg-amber-50 text-amber-700 border-amber-200'
    : 'bg-teal-50 text-teal-700 border-teal-200';

  const prioritySignalClass = hotspot.prioritySignal === 'Very High'
    ? 'text-rose-700 bg-rose-50 border-rose-200 font-semibold'
    : hotspot.prioritySignal === 'High'
    ? 'text-amber-800 bg-amber-50 border-amber-200 font-semibold'
    : 'text-teal-800 bg-teal-50 border-teal-200 font-medium';

  return (
    <Card 
      padding="p-5" 
      className={`flex flex-col justify-between border-slate-200/90 hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer group ${
        hotspot.id === 'hotspot-01' ? 'ring-1 ring-teal-700 bg-teal-50/10' : 'bg-white'
      } ${className}`}
      onClick={onClick}
    >
      <div className="space-y-3.5">
        {/* Top Badges: Category & Severity */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-semibold text-teal-800 font-mono uppercase tracking-wider truncate">
            {hotspot.state} · {hotspot.district || hotspot.block}
          </span>
          <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md border shrink-0 font-mono ${severityBadgeClass}`}>
            {hotspot.severity}
          </span>
        </div>

        {/* Hotspot Title & Category */}
        <div>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block mb-0.5 font-mono">
            {hotspot.category || hotspot.primaryCategory}
          </span>
          <h4 className="text-base font-bold text-slate-900 group-hover:text-teal-900 transition-colors leading-snug">
            {hotspot.name}
          </h4>
        </div>

        {/* Aggregated Citizen Demand & Affected Locations */}
        <div className="grid grid-cols-2 gap-2 p-3 rounded-md bg-slate-50 border border-slate-200/70">
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-mono font-medium">Citizen Demand</div>
            <div className="text-base font-bold font-mono tabular-nums text-slate-900">
              {hotspot.requestCount?.toLocaleString()} <span className="text-[11px] font-sans text-slate-500 font-normal">requests</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-mono font-medium">Affected Locations</div>
            <div className="text-base font-bold font-mono tabular-nums text-teal-900">
              {hotspot.affectedLocations || 42} <span className="text-[11px] font-sans text-slate-500 font-normal">localities</span>
            </div>
          </div>
        </div>

        {/* Infrastructure Gap Callout */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
            Infrastructure Gap
          </span>
          <p className="text-xs text-slate-700 font-medium line-clamp-2">
            {hotspot.infrastructureGap}
          </p>
        </div>
      </div>

      {/* Card Footer: Priority Signal & Inspect Link */}
      <div className="pt-3.5 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-slate-400 font-mono uppercase">Signal:</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-md font-mono border ${prioritySignalClass}`}>
            {hotspot.prioritySignal || 'High Demand'}
          </span>
        </div>

        <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-800 group-hover:text-teal-950 group-hover:translate-x-0.5 transition-all">
          <span>Inspect Hotspot</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Card>
  );
}
