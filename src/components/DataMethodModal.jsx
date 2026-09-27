import React from 'react';
import { 
  Database, 
  ShieldCheck, 
  Cpu, 
  MapPin, 
  BarChart3, 
  Info, 
  X, 
  CheckCircle2, 
  FileText, 
  AlertTriangle 
} from 'lucide-react';

export default function DataMethodModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200/80 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                Data & Method Provenance
              </h3>
              <p className="text-xs text-slate-500">
                Methodology, data sources, and algorithmic transparency for ANTICRO CR-1
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto text-xs leading-relaxed text-slate-600">
          
          {/* Main Legal / Method Banner (Part 13) */}
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-900 text-[11px] font-mono uppercase">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
              <span>Simulated Prototype Data Notice</span>
            </div>
            <p className="text-xs">
              <strong>Prototype demonstration only.</strong> Figures are illustrative and are not official government statistics. ANTICRO illustrates the technical architecture for connecting citizen demand to public works accountability without claiming live integration with national state PWD databases.
            </p>
          </div>

          {/* 6 Provenance Dimensions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            
            {/* 1. Citizen Requests */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-600" />
                  Citizen Requests
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold">
                  SIMULATED
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                27,170 synthetic submissions representing realistic municipal grievances across water, drainage, roads, sanitation, electricity, and schools.
              </p>
            </div>

            {/* 2. Public Projects */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  Public Projects
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold">
                  SIMULATED
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                19 monitored capital works projects modeling real PWD tender numbers, budgets, contractor assignments, timelines, and completion metrics.
              </p>
            </div>

            {/* 3. AI Intelligence Engine */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  AI Intelligence Engine
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 font-semibold">
                  GOOGLE GEMINI
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Powered by Google Gemini 2.5 Flash / 1.5 Flash accessed securely via server-side endpoints for language detection, taxonomy normalization, and evidence assistance.
              </p>
            </div>

            {/* 4. Priority Engine */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-600" />
                  Priority Model
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 font-semibold">
                  DETERMINISTIC
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                ANTICRO Demo Priority Model: Demand (25%), Severity (20%), Population (20%), Deficit (15%), Evidence (10%), Trend (10%).
              </p>
            </div>

            {/* 5. Geographic Scope */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-600" />
                  Geographic Scope
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-900 font-semibold">
                  10 STATES
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Multi-state India prototype covering Karnataka, Maharashtra, Tamil Nadu, Uttar Pradesh, Bihar, Rajasthan, West Bengal, Odisha, Kerala, and Assam.
              </p>
            </div>

            {/* 6. Citizen Evidence & Privacy */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-600" />
                  Privacy Shield
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-teal-100 text-teal-900 font-semibold">
                  ACTIVE
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Strict pseudonymity (Citizen #A7K29). Automatic face/PII scan before public rendering. Categorization into Fact, Observation, Allegation.
              </p>
            </div>

          </div>

          {/* AI Decision Support Caveat (Part 17) */}
          <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-200 text-teal-950 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold block">AI Neutrality & Governance Safeguard:</span>
              <p className="text-[11px] leading-relaxed">
                AI-assisted decision support. Final prioritization requires human, engineering, budgetary and government review. ANTICRO assists prioritization; it does not replace civil authority or administrative procurement.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-mono">
            ANTICRO CR-1 • BRICS Track 1 DPI
          </span>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
}
