import React from 'react';
import { MapPin, Users, Megaphone, CheckCircle2, AlertCircle } from 'lucide-react';
import Card from './Card';
import StatusBadge from './StatusBadge';
import Badge from './Badge';

export default function DemandCard({ demand, onClick }) {
  if (!demand) return null;

  return (
    <Card hover padding="p-4 sm:p-5" onClick={onClick} className="flex flex-col justify-between space-y-3">
      <div className="space-y-2.5">
        {/* Top Header: Category, Priority, Status */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Badge variant="neutral" size="sm">
              {demand.category}
            </Badge>
            <StatusBadge status={demand.severity || demand.priority} />
          </div>
          {demand.status && (
            <StatusBadge status={demand.status} />
          )}
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
            {demand.title}
          </h3>
          <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
            {demand.description}
          </p>
        </div>

        {/* Location & Affected Population */}
        <div className="space-y-1 text-xs text-slate-500 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{demand.location}</span>
          </div>
          {demand.affectedPopulationDisplay && (
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{demand.affectedPopulationDisplay}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-teal-800 font-medium font-mono">
          <Megaphone className="w-3.5 h-3.5" />
          <span>{demand.supportCount || demand.requestCount || 1} requests</span>
        </div>

        {demand.submittedBy && (
          <span className="font-mono text-[11px] text-slate-400">
            {demand.submittedBy}
          </span>
        )}
      </div>
    </Card>
  );
}
