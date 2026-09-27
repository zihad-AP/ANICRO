import React from 'react';
import { Shield, Lock, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer({ onOpenDataMethod }) {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs mt-20">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-[5vw] py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          <div className="md:col-span-2 space-y-3.5">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm text-slate-900 tracking-tight">
                ANTICRO CR-1
              </span>
            </div>
            
            <p className="text-teal-800 font-medium text-sm">
              “Connecting public records to public evidence.”
            </p>
            
            <p className="text-xs text-slate-500 max-w-md leading-relaxed">
              ANTICRO is a civic-tech evidence platform connecting public project records, citizen evidence, AI-assisted analysis, expert review, and government response.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
              <Lock className="w-3.5 h-3.5 text-teal-700" />
              <span>Privacy Shield: Citizen identities & raw media protected</span>
            </div>
          </div>

          <div>
            <h4 className="text-slate-900 font-semibold text-[11px] uppercase tracking-wider mb-3">
              Evidence Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-slate-800 font-medium">Fact</span> — Official specifications
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-slate-800 font-medium">Observation</span> — Field verified evidence
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span className="text-slate-800 font-medium">Allegation</span> — Community inquiry
              </li>
              <li className="flex items-center gap-2 pt-1 border-t border-slate-100">
                <span className="text-[11px] text-slate-400">Chain: Fact → Observation → AI Finding → Allegation → Determination</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-semibold text-[11px] uppercase tracking-wider mb-3">
              Platform Governance
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/decision-view" className="text-slate-600 hover:text-teal-800 transition-colors">
                  Government Decision View
                </Link>
              </li>
              <li>
                <Link to="/intelligence" className="text-slate-600 hover:text-teal-800 transition-colors">
                  Pan-India Demand Map
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenDataMethod}
                  className="text-teal-800 hover:text-teal-950 font-medium transition-colors cursor-pointer text-left"
                >
                  Data & Method Provenance →
                </button>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-1">
              <span className="text-[10px] font-mono text-amber-800 font-bold bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded inline-block">
                SIMULATED DEMO DATA
              </span>
              <span className="text-[10px] text-slate-400 block font-mono">
                Prototype Edition (CR-1)
              </span>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-teal-700 shrink-0" />
            <span>
              <strong>AI Neutrality Notice:</strong> “This is a potential discrepancy for human review, not a finding of wrongdoing.” Every AI finding requires human review.
            </span>
          </div>
          <div className="text-slate-400">
            ANTICRO CR-1 Prototype &copy; 2025
          </div>
        </div>
      </div>
    </footer>
  );
}