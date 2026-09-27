import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  X, 
  Sparkles, 
  MapPin, 
  Users, 
  Building2, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Layers, 
  FileText,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Globe,
  RefreshCw,
  Info,
  Camera,
  Eye,
  Shield
} from 'lucide-react';
import { aiService } from '../services/aiService';
import Card from './common/Card';
import PriorityCard from './common/PriorityCard';

export default function HotspotDetail({
  hotspot,
  onClose,
  isStandalonePage = false
}) {
  const navigate = useNavigate();
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [currentAiSummary, setCurrentAiSummary] = useState(hotspot?.aiSummary || hotspot?.summary || '');
  const [aiRationale, setAiRationale] = useState(hotspot?.aiReasoning || '');
  const [aiRecommendedAction, setAiRecommendedAction] = useState(hotspot?.recommendedAction || hotspot?.suggestedIntervention || '');
  const [aiModelBadge, setAiModelBadge] = useState(null);

  if (!hotspot) return null;

  // Language representation data with fallback
  const languages = hotspot.languagesRepresented || [
    { language: 'Hindi', percentage: 42 },
    { language: 'Marathi', percentage: 31 },
    { language: 'English', percentage: 18 },
    { language: 'Other', percentage: 9 }
  ];

  // Demand trend data with fallback (Jan to Jun)
  const trend = hotspot.demandTrend || [
    { month: 'Jan', requests: 210 },
    { month: 'Feb', requests: 380 },
    { month: 'Mar', requests: 590 },
    { month: 'Apr', requests: 840 },
    { month: 'May', requests: 1420 },
    { month: 'Jun', requests: 2340 }
  ];

  // Maximum for bar normalization
  const maxTrend = Math.max(...trend.map(t => t.requests || t.count || 1));

  // Step 5: Interactive live Gemini AI demand hotspot synthesis
  const handleTriggerGeminiSynthesis = async () => {
    setIsSynthesizing(true);
    try {
      const res = await aiService.analyzeDemandHotspot({
        name: hotspot.name,
        location: `${hotspot.district || ''}, ${hotspot.state || 'India'}`,
        category: hotspot.category || hotspot.primaryCategory,
        requestCount: hotspot.requestCount,
        severity: hotspot.severity || 'Critical',
        affectedPopulation: hotspot.affectedPopulation || '45,000 residents',
        affectedServices: hotspot.affectedServices || ['Road Access', 'School Attendance'],
        infrastructureGap: hotspot.infrastructureGap || 'Stormwater drainage capacity deficit'
      });

      if (res.success && res.data) {
        if (res.data.demandSummary) setCurrentAiSummary(res.data.demandSummary);
        if (res.data.priorityRationale) setAiRationale(res.data.priorityRationale);
        if (res.data.recommendedAction) setAiRecommendedAction(res.data.recommendedAction);
        setAiModelBadge(res.data.modelUsed === 'gemini' ? 'Google Gemini' : 'Civic AI Engine');
      }
    } catch (err) {
      console.warn('AI synthesis trigger notice:', err);
    } finally {
      setIsSynthesizing(false);
    }
  };


  const content = (
    <div className="space-y-6">
      {/* 1. Header & Quick Overview */}
      <div className="border-b border-slate-100 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 font-mono uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-teal-700" />
            <span>{hotspot.state} · {hotspot.district}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md font-mono border ${
              hotspot.severity === 'Critical'
                ? 'bg-rose-50 text-rose-700 border-rose-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}>
              {hotspot.severity} Severity
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
              Signal: {hotspot.prioritySignal || 'Very High'}
            </span>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
          {hotspot.name}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal font-mono">
          {hotspot.category || hotspot.primaryCategory} Infrastructure Demand Concentration
        </p>
      </div>

      {/* 2. Key Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-md bg-slate-50 border border-slate-200/80 space-y-0.5">
          <div className="text-[10px] uppercase font-semibold text-slate-500 font-mono">Citizen Demand</div>
          <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-slate-900">
            {hotspot.requestCount?.toLocaleString()}
          </div>
          <div className="text-[10px] text-teal-800 font-medium">Co-reported requests</div>
        </div>

        <div className="p-3.5 rounded-md bg-slate-50 border border-slate-200/80 space-y-0.5">
          <div className="text-[10px] uppercase font-semibold text-slate-500 font-mono">Affected Locations</div>
          <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-teal-900">
            {hotspot.affectedLocations || 67}
          </div>
          <div className="text-[10px] text-slate-500">Nearby hamlets & wards</div>
        </div>

        <div className="p-3.5 rounded-md bg-slate-50 border border-slate-200/80 space-y-0.5">
          <div className="text-[10px] uppercase font-semibold text-slate-500 font-mono">Affected Population</div>
          <div className="text-base sm:text-lg font-bold text-slate-900 truncate">
            {hotspot.affectedPopulation || '45,000 residents'}
          </div>
          <div className="text-[10px] text-slate-500">Corridor residents</div>
        </div>

        <div className="p-3.5 rounded-md bg-slate-50 border border-slate-200/80 space-y-0.5">
          <div className="text-[10px] uppercase font-semibold text-slate-500 font-mono">Priority Score</div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-teal-900">
              {hotspot.priorityScore || 91}
            </span>
            <span className="text-xs text-slate-400 font-mono">/ 100</span>
          </div>
          <div className="text-[10px] text-teal-800 font-medium">Explainable index</div>
        </div>
      </div>

      {/* 3. AI-Assisted Synthesis Box (Step 5E & 5M) */}
      <div className="p-4 sm:p-5 rounded-lg bg-teal-50/40 border border-teal-200/80 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-teal-100 text-teal-800 border border-teal-300/60">
              <Sparkles className="w-3.5 h-3.5 text-teal-700" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-950 font-mono">
              AI-Assisted Synthesis
            </span>
          </div>
          
          <button
            type="button"
            onClick={handleTriggerGeminiSynthesis}
            disabled={isSynthesizing}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-white hover:bg-slate-50 text-teal-900 border border-teal-300 shadow-2xs transition-colors cursor-pointer"
            title="Re-synthesize using live Google Gemini AI"
          >
            <RefreshCw className={`w-3 h-3 ${isSynthesizing ? 'animate-spin text-teal-700' : 'text-slate-400'}`} />
            <span>{isSynthesizing ? 'Synthesizing...' : 'Live Gemini Synthesis'}</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic bg-white p-3 rounded-md border border-teal-200/70">
          "{currentAiSummary}"
        </p>

        <div className="flex items-center justify-between text-[11px] text-teal-800 pt-1 border-t border-teal-100/80">
          <span className="flex items-center gap-1 text-[10px] text-slate-500">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>AI-assisted synthesis for decision support; does not constitute an official government determination.</span>
          </span>
          {aiModelBadge && (
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-md bg-teal-100 text-teal-900 shrink-0 font-semibold">
              {aiModelBadge}
            </span>
          )}
        </div>
      </div>

      {/* 4. Infrastructure Gap Card (Step 5H) */}
      <div className="p-4 sm:p-5 rounded-lg bg-white border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
              Core Technical Deficit
            </span>
            <h4 className="text-base font-bold text-slate-900">
              INFRASTRUCTURE GAP: {hotspot.infrastructureGap}
            </h4>
          </div>
          <span className="text-xs font-mono text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200 font-semibold shrink-0">
            Critical Deficit
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-slate-500 font-medium block">Citizen Demand:</span>
            <div className="text-sm font-bold font-mono tabular-nums text-slate-900">
              {hotspot.requestCount?.toLocaleString()} verified reports
            </div>
            <span className="text-[11px] text-slate-500">Aggregated from multiple sources</span>
          </div>

          <div className="space-y-1">
            <span className="text-slate-500 font-medium block">Affected Locations:</span>
            <div className="text-sm font-bold font-mono tabular-nums text-teal-900">
              {hotspot.affectedLocations || 67} hamlets & school zones
            </div>
            <span className="text-[11px] text-slate-500">Concentrated geographic corridor</span>
          </div>

          <div className="space-y-1">
            <span className="text-slate-500 font-medium block">Evidence Signal:</span>
            <div className="text-sm font-bold text-slate-900">
              Recurring monsoon flooding
            </div>
            <span className="text-[11px] text-slate-500">142 ground photo submissions</span>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 space-y-1.5">
          <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider text-[10px] block font-mono">
            Affected Public Services:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {(hotspot.affectedServices || ['Road Access', 'School Attendance', 'Pedestrian Safety', 'Emergency Transit']).map((svc, i) => (
              <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-700 font-medium">
                • {svc}
              </span>
            ))}
          </div>
        </div>

        {aiRecommendedAction && (
          <div className="p-3.5 rounded-md bg-teal-50/70 border border-teal-200/80 space-y-1">
            <span className="text-[10px] uppercase font-bold text-teal-900 tracking-wider font-mono block">
              Recommended Public Works Intervention
            </span>
            <p className="text-xs font-semibold text-slate-900">
              {aiRecommendedAction}
            </p>
          </div>
        )}
      </div>

      {/* 5. Explainable Priority Model (Step 5) */}
      <PriorityCard
        score={hotspot.priorityScore || 91}
        maxScore={100}
        title="ANTICRO Demo Priority Model"
        subtitle="Illustrative scoring for prototype demonstration — not an official government allocation formula."
        explanation={aiRationale || hotspot.aiReasoning || `High citizen demand (${hotspot.requestCount?.toLocaleString()} submissions) combined with ${hotspot.severity?.toLowerCase() || 'critical'} severity and infrastructure capacity deficit.`}
        breakdown={hotspot.scoreBreakdown}
      />

      {/* 6. Community Evidence Section (Step 5) */}
      <div className="p-4 sm:p-5 rounded-lg bg-white border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                Community Evidence & Ground Telemetry
              </h4>
            </div>
            <p className="text-xs text-slate-500 font-normal">
              {hotspot.citizenEvidenceCount || 427} citizen-submitted records filtered through the ANTICRO Privacy Shield
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200 font-medium shrink-0">
            Privacy Shielded
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(hotspot.communityEvidence || [
            {
              id: `ev-${hotspot.id}-1`,
              title: 'Ground Inundation & Blocked Feeder Road',
              category: 'Photo evidence',
              date: '2025-06-14',
              location: `${hotspot.district || 'Corridor'}, ${hotspot.state || 'India'}`,
              privacyShieldStatus: 'Shielded (Faces & Plates Blurred)',
              verificationStatus: 'Verified by Community'
            },
            {
              id: `ev-${hotspot.id}-2`,
              title: 'Citizen Flood Depth Log & Transit Telemetry',
              category: 'Citizen observation',
              date: '2025-06-15',
              location: 'Main Feeder Link Junction',
              privacyShieldStatus: 'Public Safe View',
              verificationStatus: 'Telemetry Verified'
            },
            {
              id: `ev-${hotspot.id}-3`,
              title: 'Municipal Pre-Monsoon Drain Silt Inspection Record',
              category: 'Infrastructure document',
              date: '2025-05-28',
              location: 'Culvert & Sluice Channel',
              privacyShieldStatus: 'Official Record',
              verificationStatus: 'Verified Source'
            },
            {
              id: `ev-${hotspot.id}-4`,
              title: 'Resident Association Co-report Petition',
              category: 'Location report',
              date: '2025-06-18',
              location: 'Community Center & Ward Office',
              privacyShieldStatus: 'Shielded Citizen Signatures',
              verificationStatus: 'Verified by Community'
            }
          ]).map((ev, idx) => {
            const isPhoto = ev.category?.toLowerCase().includes('photo');
            const isDoc = ev.category?.toLowerCase().includes('document');
            const isLocation = ev.category?.toLowerCase().includes('location') || ev.category?.toLowerCase().includes('petition');

            return (
              <div
                key={ev.id || idx}
                className="p-3.5 rounded-md border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-2"
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="inline-flex items-center gap-1 font-semibold uppercase tracking-wider text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200 font-mono">
                    {isPhoto ? <Camera className="w-3 h-3 text-teal-700" /> : isDoc ? <FileText className="w-3 h-3 text-teal-700" /> : isLocation ? <MapPin className="w-3 h-3 text-teal-700" /> : <Eye className="w-3 h-3 text-teal-700" />}
                    <span>{ev.category}</span>
                  </span>
                  <span className="font-mono text-slate-400">{ev.date}</span>
                </div>

                <h5 className="text-xs font-bold text-slate-900 line-clamp-1">
                  {ev.title}
                </h5>

                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{ev.location}</span>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
                  <span className="inline-flex items-center gap-1 text-teal-800 font-medium font-mono">
                    <Shield className="w-3 h-3 text-teal-700" />
                    <span className="truncate">{ev.privacyShieldStatus}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-slate-600 font-mono">
                    <CheckCircle2 className="w-3 h-3 text-teal-700" />
                    <span>{ev.verificationStatus}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. Two Column Grid: Language Intelligence (Step 5F) & Demand Trend (Step 5G) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Language Intelligence */}
        <div className="p-4 sm:p-5 rounded-lg bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-teal-700" />

              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                Languages Represented
              </h4>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Multilingual Input</span>
          </div>

          <div className="space-y-2.5">
            {languages.map((lang, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700">{lang.language}</span>
                  <span className="font-mono tabular-nums font-semibold text-slate-900">{lang.percentage}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-teal-700 h-full rounded-full transition-all"
                    style={{ width: `${lang.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-2.5 bg-slate-50 rounded-md border border-slate-200 text-[11px] text-slate-600 leading-relaxed font-mono">
            "Citizen requests are normalized into a common civic problem structure while preserving the original language/source."
          </div>
        </div>

        {/* Demand Trend (Jan to Jun) */}
        <div className="p-4 sm:p-5 rounded-lg bg-white border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-teal-700" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                Demand Trend (Request Volume Over Time)
              </h4>
            </div>
            <span className="text-[10px] text-teal-800 font-mono font-medium">Monthly Co-Reports</span>
          </div>

          {/* Minimalist Trend Bar Visualizer */}
          <div className="h-32 flex items-end justify-between gap-2 pt-4 px-2">
            {trend.map((t, idx) => {
              const val = t.requests || t.count || 0;
              const heightPct = Math.round((val / maxTrend) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <span className="text-[9px] font-mono tabular-nums text-slate-500 group-hover:text-teal-900 font-medium">
                    {val > 999 ? `${(val/1000).toFixed(1)}k` : val}
                  </span>
                  <div className="w-full bg-slate-100 rounded-t-sm h-full flex items-end">
                    <div 
                      className="w-full bg-teal-800 hover:bg-teal-900 rounded-t-sm transition-all"
                      style={{ height: `${Math.max(heightPct, 8)}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-slate-600 uppercase font-semibold">
                    {t.month}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="text-[11px] text-slate-500 font-normal text-center pt-1 border-t border-slate-100">
            Steady escalation in citizen submissions observed ahead of and during monsoon onset.
          </p>
        </div>
      </div>

      {/* 6. Related Projects Section (Step 5I) */}
      <div className="p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-teal-800" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
              Related Commissioned Projects
            </h4>
          </div>
          <span className="text-xs font-mono text-teal-800 font-medium">Registry Link</span>
        </div>

        {/* Visual Relationship Diagram (Step 5I) */}
        <div className="p-3 bg-white rounded-md border border-slate-200 flex items-center justify-around text-center text-xs font-mono overflow-x-auto">
          <div className="space-y-0.5 shrink-0 px-2">
            <span className="text-[10px] text-slate-400 uppercase">Input</span>
            <div className="font-bold text-slate-900">CITIZEN DEMAND</div>
            <div className="text-[10px] text-teal-800">{hotspot.requestCount?.toLocaleString()} reports</div>
          </div>
          <span className="text-slate-300 font-bold">→</span>
          <div className="space-y-0.5 shrink-0 px-2">
            <span className="text-[10px] text-slate-400 uppercase">Cluster</span>
            <div className="font-bold text-teal-900">DEMAND HOTSPOT</div>
            <div className="text-[10px] text-slate-500">{hotspot.district}</div>
          </div>
          <span className="text-slate-300 font-bold">→</span>
          <div className="space-y-0.5 shrink-0 px-2">
            <span className="text-[10px] text-slate-400 uppercase">Deficit</span>
            <div className="font-bold text-slate-900">INFRASTRUCTURE GAP</div>
            <div className="text-[10px] text-rose-700">Drainage deficit</div>
          </div>
          <span className="text-slate-300 font-bold">→</span>
          <div className="space-y-0.5 shrink-0 px-2">
            <span className="text-[10px] text-slate-400 uppercase">Execution</span>
            <div className="font-bold text-teal-900">RELATED PROJECT</div>
            <div className="text-[10px] text-teal-800">#PR-01</div>
          </div>
        </div>

        {/* Project Card Link */}
        <div className="p-4 rounded-md bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-teal-900">
                {hotspot.linkedProjectId ? `#${hotspot.linkedProjectId.toUpperCase()}` : '#PR-01'}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-teal-50 border border-teal-200 text-teal-800 font-medium font-mono">
                {hotspot.governmentStatus || 'Work Ongoing'}
              </span>
            </div>
            <h5 className="text-sm font-bold text-slate-900">
              {hotspot.recommendedProject?.title || 'Riverside Municipal Water Treatment Plant Expansion'}
            </h5>
            <p className="text-xs text-slate-500">
              Allocated Capital: {hotspot.recommendedProject?.estimatedBudget || '₹14.2 Cr'} • Domain: {hotspot.recommendedProject?.domain || 'Municipal Civil Works'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              if (onClose) onClose();
              navigate(`/project/${hotspot.linkedProjectId || 'pr-01'}`);
            }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold shadow-xs transition-colors shrink-0 cursor-pointer"
          >
            <span>View Commissioned Project</span>
            <ArrowRight className="w-3.5 h-3.5 text-teal-200" />
          </button>
        </div>
      </div>
    </div>
  );

  // If used inside a modal
  if (!isStandalonePage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />
        <div className="relative bg-white rounded-lg shadow-2xl border border-slate-200/90 w-full max-w-4xl max-h-[92vh] overflow-y-auto z-10 animate-in fade-in zoom-in-95 duration-200 flex flex-col">
          <div className="sticky top-0 bg-white/95 backdrop-blur-xs px-5 sm:px-6 py-3.5 border-b border-slate-100 flex items-center justify-between z-20">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
              Hotspot Intelligence Detail
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-5 sm:p-6">
            {content}
          </div>
        </div>
      </div>
    );
  }

  // Standalone page layout
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-4">
        <Link 
          to="/intelligence" 
          className="inline-flex items-center gap-1.5 text-xs font-medium text-teal-800 hover:text-teal-950"
        >
          <span>← Back to Citizen Intelligence</span>
        </Link>
      </div>
      <Card padding="p-6 sm:p-8" className="border-slate-200 shadow-sm">
        {content}
      </Card>
    </div>
  );
}
