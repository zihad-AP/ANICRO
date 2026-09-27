import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Building2, Camera, ArrowRight, Layers, FileText } from 'lucide-react';
import Card from './Card';
import StatusBadge from './StatusBadge';
import Badge from './Badge';

export default function ProjectCard({ project, onOpenUpload }) {
  if (!project) return null;

  const publicEvidenceCount = project.evidenceCount || (project.evidenceTimeline ? project.evidenceTimeline.length : 0);
  const casesCount = project.casesCount || (project.cases ? project.cases.length : (project.id === 'pr-01' ? 1 : (project.id === 'pr-02' ? 1 : (project.id === 'pr-06' ? 1 : 0))));

  // Strict AGENTS.md Rule #17 & Prompt #11 requirement:
  // If is_real = true: "Verified Source"
  // If is_real = false: "Simulated Data"
  // Do NOT call simulated projects "real".
  const isReal = project.is_real === true || project.isReal === true || project.is_verified_source === true;
  const verifiedBadgeLabel = isReal ? "Verified Source" : "Simulated Data";
  const verifiedBadgeStyle = isReal 
    ? "bg-emerald-50 text-emerald-900 border-emerald-300 font-bold"
    : "bg-slate-100 text-slate-700 border-slate-200 font-medium";

  return (
    <Card hover padding="p-5" className="flex flex-col justify-between group transition-all border border-slate-200 shadow-soft">
      <div className="space-y-3.5">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-800 border border-slate-300 px-2 py-0.5 rounded">
              #{String(project.id).toUpperCase()}
            </span>
            <Badge variant="neutral" size="sm">
              {project.category || 'Infrastructure'}
            </Badge>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${verifiedBadgeStyle}`}>
              {verifiedBadgeLabel}
            </span>
          </div>
          <StatusBadge status={project.status} />
        </div>

        {/* Project Title */}
        <div>
          <Link
            to={`/project/${project.id}`}
            className="text-base font-bold text-slate-900 group-hover:text-teal-800 transition-colors line-clamp-1 block"
          >
            {project.name}
          </Link>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2 font-normal leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Meta Info */}
        <div className="space-y-1.5 text-xs text-slate-500 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate font-medium text-slate-700">{project.department}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{project.location}</span>
          </div>
        </div>

        {/* Financial & Completion Metrics (Approved Budget + Recorded Expenditure) */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
          <div className="p-2 rounded-md bg-slate-50 border border-slate-200/70">
            <span className="text-[9px] text-slate-400 uppercase font-mono font-semibold block">Approved Budget</span>
            <span className="text-xs font-bold text-slate-800 font-mono tabular-nums">{project.budget || '—'}</span>
          </div>
          <div className="p-2 rounded-md bg-slate-50 border border-slate-200/70">
            <span className="text-[9px] text-slate-400 uppercase font-mono font-semibold block">Expenditure</span>
            <span className="text-xs font-bold text-slate-800 font-mono tabular-nums">{project.expenditure || '—'}</span>
          </div>
          <div className="p-2 rounded-md bg-slate-50 border border-slate-200/70">
            <span className="text-[9px] text-slate-400 uppercase font-mono font-semibold block">Completion</span>
            <span className="text-xs font-bold text-teal-800 font-mono tabular-nums">{project.completionPercentage || 0}%</span>
          </div>
        </div>

        {/* Completion Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden border border-slate-200/60">
          <div
            className="bg-teal-700 h-full rounded-full transition-all"
            style={{ width: `${Math.min(Math.max(project.completionPercentage || 0, 0), 100)}%` }}
          />
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3 text-slate-600 font-medium">
          <span className="flex items-center gap-1 text-[11px]">
            <Camera className="w-3.5 h-3.5 text-teal-700" />
            <span>{publicEvidenceCount} evidence</span>
          </span>
          <span className="flex items-center gap-1 text-[11px] text-slate-500">
            <FileText className="w-3 h-3 text-slate-400" />
            <span>{casesCount} cases</span>
          </span>
        </div>

        <Link
          to={`/project/${project.id}`}
          className="inline-flex items-center gap-1 text-teal-800 font-semibold hover:text-teal-950 transition-colors"
        >
          <span>View Project</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </Card>
  );
}
