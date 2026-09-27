import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Compass, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Layers, 
  Camera, 
  ShieldCheck, 
  Play, 
  X,
  FileText,
  HelpCircle
} from 'lucide-react';
import { DEMO_SCENARIOS } from './ReportNeedModal';

export default function DemoFlowHelper({ onOpenReportNeed }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLaunchScenario = (scenarioId) => {
    if (onOpenReportNeed) {
      onOpenReportNeed();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 print:hidden">
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-slate-900 text-white text-xs font-semibold shadow-md hover:bg-slate-800 transition-all cursor-pointer border border-slate-700 font-mono tracking-tight"
          title="Open Recommended Demo Flow for Hackathon Judges"
        >
          <Compass className="w-3.5 h-3.5 text-teal-400" />
          <span>Demo Guide</span>
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
        </button>
      ) : (
        <div className="w-[340px] sm:w-[380px] max-h-[85vh] bg-white border border-slate-300 rounded-lg shadow-xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-150">
          {/* Header */}
          <div className="p-3.5 sm:p-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300">
                <Compass className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight flex items-center gap-1.5">
                  <span>Hackathon Demo Guide</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-teal-900 text-teal-200 border border-teal-700">
                    END-TO-END
                  </span>
                </h4>
                <p className="text-[10px] text-slate-400">
                  Recommended 8-step civic accountability journey
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Scenario Launch Strip */}
          <div className="p-3 bg-slate-50 border-b border-slate-200 space-y-1.5">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
              <span>Prepared Test Scenarios:</span>
              <span className="text-teal-700 font-normal">One-Click Setup</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-left">
              <button
                type="button"
                onClick={() => {
                  onOpenReportNeed();
                  setIsOpen(false);
                }}
                className="p-2 rounded-lg bg-white border border-slate-200/90 hover:border-teal-500 hover:bg-teal-50/40 text-left transition-all cursor-pointer space-y-0.5 group"
              >
                <div className="text-[11px] font-bold text-slate-900 group-hover:text-teal-950 flex items-center justify-between">
                  <span>1. Flooding</span>
                  <Play className="w-2.5 h-2.5 text-teal-600 fill-current opacity-70" />
                </div>
                <div className="text-[10px] text-slate-500 line-clamp-1">School Road Inundation</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  onOpenReportNeed();
                  setIsOpen(false);
                }}
                className="p-2 rounded-lg bg-white border border-slate-200/90 hover:border-teal-500 hover:bg-teal-50/40 text-left transition-all cursor-pointer space-y-0.5 group"
              >
                <div className="text-[11px] font-bold text-slate-900 group-hover:text-teal-950 flex items-center justify-between">
                  <span>2. Drinking Water</span>
                  <Play className="w-2.5 h-2.5 text-teal-600 fill-current opacity-70" />
                </div>
                <div className="text-[10px] text-slate-500 line-clamp-1">Rural Water Deficit</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  onOpenReportNeed();
                  setIsOpen(false);
                }}
                className="p-2 rounded-lg bg-white border border-slate-200/90 hover:border-teal-500 hover:bg-teal-50/40 text-left transition-all cursor-pointer space-y-0.5 group"
              >
                <div className="text-[11px] font-bold text-slate-900 group-hover:text-teal-950 flex items-center justify-between">
                  <span>3. Road Craters</span>
                  <Play className="w-2.5 h-2.5 text-teal-600 fill-current opacity-70" />
                </div>
                <div className="text-[10px] text-slate-500 line-clamp-1">Transit & Safety Gaps</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  onOpenReportNeed();
                  setIsOpen(false);
                }}
                className="p-2 rounded-lg bg-white border border-slate-200/90 hover:border-teal-500 hover:bg-teal-50/40 text-left transition-all cursor-pointer space-y-0.5 group"
              >
                <div className="text-[11px] font-bold text-slate-900 group-hover:text-teal-950 flex items-center justify-between">
                  <span>4. हिन्दी पेयजल</span>
                  <Play className="w-2.5 h-2.5 text-teal-600 fill-current opacity-70" />
                </div>
                <div className="text-[10px] text-slate-500 line-clamp-1">Vernacular Multilingual</div>
              </button>
            </div>
          </div>

          {/* 8-Step Civic Journey */}
          <div className="p-3.5 space-y-2 overflow-y-auto max-h-[42vh] text-xs">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 pb-1 border-b border-slate-100">
              The Complete Verification Chain:
            </div>

            <div className="space-y-1.5">
              <div className="flex items-start gap-2 p-1.5 rounded-lg hover:bg-slate-50">
                <span className="w-4 h-4 rounded-full bg-teal-100 text-teal-900 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                <div>
                  <span className="font-semibold text-slate-900 block">Citizen Report (Voice / Text)</span>
                  <span className="text-[11px] text-slate-500">Resident submits localized infrastructure need via speech or text.</span>
                </div>
              </div>

              <div className="flex items-start gap-2 p-1.5 rounded-lg hover:bg-slate-50">
                <span className="w-4 h-4 rounded-full bg-teal-100 text-teal-900 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                <div>
                  <span className="font-semibold text-slate-900 block">Gemini AI Understanding</span>
                  <span className="text-[11px] text-slate-500">Live multi-lingual parsing, civic taxonomy, and problem normalization.</span>
                </div>
              </div>

              <div className="flex items-start gap-2 p-1.5 rounded-lg hover:bg-slate-50">
                <span className="w-4 h-4 rounded-full bg-teal-100 text-teal-900 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                <div>
                  <span className="font-semibold text-slate-900 block">Demand Hotspot Clustering</span>
                  <span className="text-[11px] text-slate-500">Consolidates fragmented reports into geographic corridor deficits.</span>
                </div>
              </div>

              <div className="flex items-start gap-2 p-1.5 rounded-lg hover:bg-slate-50">
                <span className="w-4 h-4 rounded-full bg-teal-100 text-teal-900 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">4</span>
                <div>
                  <span className="font-semibold text-slate-900 block">AI Priority Score (94/100)</span>
                  <span className="text-[11px] text-slate-500">Deterministic 6-factor scoring weighing population, severity, and deficit.</span>
                </div>
              </div>

              <div className="flex items-start gap-2 p-1.5 rounded-lg hover:bg-slate-50">
                <span className="w-4 h-4 rounded-full bg-teal-100 text-teal-900 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">5</span>
                <div>
                  <span className="font-semibold text-slate-900 block">Government Decision View</span>
                  <span className="text-[11px] text-slate-500">Executive dashboard answering What, Where, How Many, Why & What Action.</span>
                </div>
              </div>

              <div className="flex items-start gap-2 p-1.5 rounded-lg hover:bg-slate-50">
                <span className="w-4 h-4 rounded-full bg-teal-100 text-teal-900 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">6</span>
                <div>
                  <span className="font-semibold text-slate-900 block">Linked Public Project (#PR-01)</span>
                  <span className="text-[11px] text-slate-500">Commissioned capital works tracking budget, contractor, and progress.</span>
                </div>
              </div>

              <div className="flex items-start gap-2 p-1.5 rounded-lg hover:bg-slate-50">
                <span className="w-4 h-4 rounded-full bg-teal-100 text-teal-900 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">7</span>
                <div>
                  <span className="font-semibold text-slate-900 block">Ground Evidence & Privacy Shield</span>
                  <span className="text-[11px] text-slate-500">Categorized Fact, Observation, Allegation with AI discrepancy review.</span>
                </div>
              </div>

              <div className="flex items-start gap-2 p-1.5 rounded-lg hover:bg-slate-50">
                <span className="w-4 h-4 rounded-full bg-teal-100 text-teal-900 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">8</span>
                <div>
                  <span className="font-semibold text-slate-900 block">Accountability & Resolution</span>
                  <span className="text-[11px] text-slate-500">Milestone timeline, official government response, and verified resolution.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Navigation Links */}
          <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => {
                navigate('/decision-view');
                setIsOpen(false);
              }}
              className="text-teal-800 hover:text-teal-950 font-semibold cursor-pointer"
            >
              Open Decision View →
            </button>

            <button
              type="button"
              onClick={() => {
                navigate('/projects/pr-01');
                setIsOpen(false);
              }}
              className="text-teal-800 hover:text-teal-950 font-semibold cursor-pointer"
            >
              Open Project #PR-01 →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
