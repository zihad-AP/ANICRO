import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Scale,
  Camera,
  Compass,
  Megaphone,
  Cpu,
  Send,
  Sliders,
  Check
} from 'lucide-react';
import { getDeterministicPriorityBreakdown } from '../data/mockDemandIntelligence';

export default function HotspotDetailModal({
  hotspot = null,
  isOpen = false,
  onClose = () => {},
  initialTab = 'overview'
}) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(initialTab);

  // Sync activeTab when initialTab changes or modal reopens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab || 'overview');
    }
  }, [isOpen, initialTab, hotspot?.id]);

  // Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !hotspot) return null;

  // Retrieve deterministic 6-factor priority breakdown
  const priorityData = getDeterministicPriorityBreakdown(hotspot);

  // Handle Send to Government Decision View
  const handleSendToDecisionView = () => {
    onClose();
    navigate(`/decision?id=${hotspot.id}`);
  };

  const getSeverityBadge = (severity, score) => {
    const s = (severity || '').toUpperCase();
    if (s.includes('CRIT') || (score && score >= 85)) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider bg-rose-50 text-rose-800 border border-rose-200">
          <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
          CRITICAL PRIORITY ({score || 94})
        </span>
      );
    }
    if (s.includes('HIGH') || (score && score >= 70)) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
          <span className="w-2 h-2 rounded-full bg-amber-600" />
          HIGH PRIORITY ({score || 91})
        </span>
      );
    }
    if (s.includes('MED') || (score && score >= 50)) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200">
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          MEDIUM PRIORITY ({score || 76})
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
        <span className="w-2 h-2 rounded-full bg-slate-500" />
        LOW PRIORITY ({score || 32})
      </span>
    );
  };

  const affectedServicesList = hotspot.affectedServices || [
    'Road Access',
    'Pedestrian Safety',
    'Public Health',
    'Emergency Transit'
  ];

  const citizenDemands = hotspot.citizenDemandsList || [
    {
      id: 'dm-01',
      user: 'Citizen #A7K29',
      date: hotspot.latestReportedDate || '2025-06-18',
      text: `${hotspot.name}: The localized infrastructure defect causes severe disruption during daily peak hours. Immediate public civil works intervention is required.`,
      language: hotspot.languagesReported?.[0] || 'Hindi'
    },
    {
      id: 'dm-02',
      user: 'Citizen #B8J34',
      date: hotspot.firstReportedDate || '2025-05-14',
      text: `Corridor access has deteriorated over the past two seasons. Multiple community complaints remain pending with the local municipal engineer.`,
      language: hotspot.languagesReported?.[1] || 'English'
    }
  ];

  const communityEvidence = hotspot.communityEvidence || [
    {
      id: 'ev-01',
      title: 'Ground Telemetry & Physical Deficit Inspection',
      category: 'Photo evidence',
      date: hotspot.latestReportedDate || '2025-06-16',
      location: hotspot.location || `${hotspot.district}, ${hotspot.state}`,
      privacyShieldStatus: 'Shielded (Faces & License Plates Blurred)',
      verificationStatus: 'Verified by Community'
    },
    {
      id: 'ev-02',
      title: 'Municipal Access Corridor Condition Assessment',
      category: 'Citizen observation',
      date: hotspot.firstReportedDate || '2025-05-20',
      location: 'Main Transit Junction',
      privacyShieldStatus: 'Public Safe View',
      verificationStatus: 'Telemetry Verified'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/65 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200/90 w-full max-w-4xl max-h-[92vh] overflow-hidden z-10 flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-slate-50/90 border-b border-slate-200 px-5 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                HOTSPOT DETAILS
              </span>
              <span className="text-xs font-mono text-slate-500 font-semibold">
                {hotspot.district || hotspot.locality}, {hotspot.state}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                ID: {hotspot.id}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              {hotspot.name || hotspot.title}
            </h3>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-center">
            {getSeverityBadge(hotspot.severity, hotspot.priorityScore)}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Tabs Bar */}
        <div className="border-b border-slate-200 px-5 sm:px-6 bg-white shrink-0 overflow-x-auto">
          <div className="flex space-x-1 sm:space-x-3 text-xs font-medium min-w-max">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`py-3 px-3 border-b-2 font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'overview'
                  ? 'border-teal-700 text-teal-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Overview & Need</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('reasoning')}
              className={`py-3 px-3 border-b-2 font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'reasoning'
                  ? 'border-teal-700 text-teal-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Priority Reasoning (6-Factor)</span>
              <span className="ml-1 text-[10px] font-mono px-1.5 py-0.2 rounded bg-teal-50 text-teal-800 border border-teal-200">
                {hotspot.priorityScore}/100
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('requests')}
              className={`py-3 px-3 border-b-2 font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'requests'
                  ? 'border-teal-700 text-teal-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Megaphone className="w-3.5 h-3.5" />
              <span>Citizen Requests</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                {hotspot.requestCount || hotspot.reportCount || 31}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('evidence')}
              className={`py-3 px-3 border-b-2 font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'evidence'
                  ? 'border-teal-700 text-teal-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Evidence Telemetry</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                {hotspot.evidenceCount || hotspot.citizenEvidenceCount || 12}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('ai')}
              className={`py-3 px-3 border-b-2 font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'ai'
                  ? 'border-teal-700 text-teal-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-teal-700" />
              <span>Gemini AI Understanding</span>
            </button>
          </div>
        </div>

        {/* Modal Body Content (Scrollable) */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Structured Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 block">
                    Location
                  </span>
                  <div className="text-xs font-bold text-slate-900 line-clamp-2">
                    {hotspot.location || `${hotspot.district || hotspot.locality}, ${hotspot.state}`}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 block">
                    Infrastructure Need
                  </span>
                  <div className="text-xs font-bold text-teal-900 truncate">
                    {hotspot.category || hotspot.primaryCategory || 'Drainage & Flood Mitigation'}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 block">
                    Citizen Requests
                  </span>
                  <div className="text-base font-bold font-mono text-slate-900 tabular-nums">
                    {(hotspot.requestCount || hotspot.reportCount || 31).toLocaleString()}{' '}
                    <span className="text-xs font-normal text-slate-500">requests</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {(hotspot.relatedRequests || 1840).toLocaleString()} corridor co-reports
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 block">
                    Current Status
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-teal-50 text-teal-900 text-xs font-mono font-semibold border border-teal-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                    <span>{hotspot.status || hotspot.currentStatus || hotspot.governmentStatus || 'Needs Government Review'}</span>
                  </div>
                </div>
              </div>

              {/* AI Problem Classification & Gap */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-teal-700" />
                    <span>AI Problem Classification</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Confidence: 96%
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-900">
                  {hotspot.aiClassification || hotspot.standardizedProblem || 'Seasonal drainage and flooding infrastructure deficit.'}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {hotspot.aiSummary || hotspot.summary || hotspot.infrastructureGap}
                </p>
              </div>

              {/* Affected Services */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                  Affected Public Services:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {affectedServicesList.map((service, idx) => (
                    <span 
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-slate-100 text-slate-800 border border-slate-200 font-medium"
                    >
                      <Check className="w-3.5 h-3.5 text-teal-700" />
                      <span>{service}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Working Navigation Buttons per Section 2 Requirements */}
              <div className="pt-2 border-t border-slate-200 space-y-2">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 block">
                  Interactive Exploration:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setActiveTab('requests')}
                    className="p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-left transition-colors cursor-pointer group flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-900 group-hover:text-teal-900 transition-colors">
                        View Citizen Requests
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                        {hotspot.requestCount || hotspot.reportCount || 31} verified submissions
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-800 group-hover:translate-x-0.5 transition-all" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('evidence')}
                    className="p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-left transition-colors cursor-pointer group flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-900 group-hover:text-teal-900 transition-colors">
                        View Evidence
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                        {hotspot.evidenceCount || hotspot.citizenEvidenceCount || 12} shielded photos
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-800 group-hover:translate-x-0.5 transition-all" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('reasoning')}
                    className="p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-left transition-colors cursor-pointer group flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-900 group-hover:text-teal-900 transition-colors">
                        View Priority Reasoning
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                        6-factor explainable score: {hotspot.priorityScore}/100
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-800 group-hover:translate-x-0.5 transition-all" />
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: PRIORITY REASONING (6-FACTOR DETERMINISTIC SCORECARD) */}
          {activeTab === 'reasoning' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-400">
                    ALGORITHMIC EXPLAINABILITY
                  </span>
                  <h4 className="text-lg font-bold text-white tracking-tight">
                    WHY THIS NEED IS PRIORITIZED
                  </h4>
                  <p className="text-xs text-slate-300">
                    Deterministic mathematical model based on 6 civic telemetry factors. Not generated randomly by an LLM.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-800/90 rounded-xl border border-slate-700 shrink-0 text-center sm:text-right">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                    Composite Priority
                  </span>
                  <div className="text-2xl font-bold font-mono text-teal-400 tabular-nums">
                    {priorityData.totalScore} <span className="text-xs text-slate-400">/ 100</span>
                  </div>
                  <span className="text-[10px] font-mono text-teal-200 uppercase font-semibold">
                    {hotspot.severity || 'High'} Priority Band
                  </span>
                </div>
              </div>

              {/* 6 Deterministic Factors Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-600">
                        <th className="py-2.5 px-4">Factor Name</th>
                        <th className="py-2.5 px-4 text-center">Score (0-100)</th>
                        <th className="py-2.5 px-4 text-center">Weight</th>
                        <th className="py-2.5 px-4 text-right">Contribution</th>
                        <th className="py-2.5 px-4">Telemetry Basis</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {priorityData.factors.map((factor, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3 px-4 font-semibold text-slate-900">
                            {factor.name}
                          </td>
                          <td className="py-3 px-4 text-center font-mono tabular-nums font-bold text-slate-800">
                            {factor.score}
                          </td>
                          <td className="py-3 px-4 text-center font-mono text-slate-500">
                            {factor.weight}
                          </td>
                          <td className="py-3 px-4 text-right font-mono font-bold text-teal-900 tabular-nums">
                            +{factor.contribution.toFixed(1)} pts
                          </td>
                          <td className="py-3 px-4 text-slate-500 text-[11px]">
                            {factor.desc}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-teal-50/60 border-t-2 border-teal-200 text-xs font-bold text-teal-950 font-mono">
                        <td className="py-3 px-4 uppercase font-semibold" colSpan={3}>
                          Final Deterministic Priority Score:
                        </td>
                        <td className="py-3 px-4 text-right tabular-nums text-sm text-teal-900 font-bold">
                          {priorityData.totalScore} / 100
                        </td>
                        <td className="py-3 px-4 text-[11px] text-teal-800 font-normal">
                          Deterministic mathematical sum
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Rationale Reasons */}
              {hotspot.whyReasons && hotspot.whyReasons.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 block">
                    Algorithmic Factors Corroboration:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {hotspot.whyReasons.map((reason, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 mt-0.5 shrink-0" />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CITIZEN REQUESTS */}
          {activeTab === 'requests' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                    Citizen Voice Intake & Aggregation
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Multilingual submissions processed with citizen pseudonym protection.
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-teal-50 text-teal-900 border border-teal-200">
                  {hotspot.requestCount || hotspot.reportCount || 31} Co-Reports
                </span>
              </div>

              <div className="space-y-3">
                {citizenDemands.map((demand, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {demand.user || `Citizen #${demand.id || 'A7K29'}`}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {demand.date}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200/80">
                        Detected: {demand.language || 'Hindi / Vernacular'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      "{demand.text}"
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-200/60">
                      <span className="inline-flex items-center gap-1 text-teal-800">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Privacy Shield Protected</span>
                      </span>
                      <span>•</span>
                      <span>Verified Voice / Mobile Intake</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: EVIDENCE */}
          {activeTab === 'evidence' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                    Ground-Truth Photographic Telemetry
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Geotagged physical evidence with automated face & vehicle privacy redaction.
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-teal-50 text-teal-900 border border-teal-200">
                  {hotspot.evidenceCount || hotspot.citizenEvidenceCount || 12} Verified Photos
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {communityEvidence.map((ev, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                        {ev.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {ev.date}
                      </span>
                    </div>

                    <h5 className="text-xs font-bold text-slate-900">
                      {ev.title}
                    </h5>

                    <div className="space-y-1 text-[11px] text-slate-500 font-mono pt-1 border-t border-slate-200/60">
                      <div>Location: {ev.location}</div>
                      <div className="text-teal-800 font-medium">Status: {ev.privacyShieldStatus}</div>
                      <div className="text-slate-600">Verification: {ev.verificationStatus}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: GEMINI AI UNDERSTANDING */}
          {activeTab === 'ai' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-teal-900 text-white space-y-1">
                <div className="flex items-center gap-1.5 text-teal-300 text-[10px] font-mono font-bold uppercase">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Google Gemini 2.5 Flash Intelligence</span>
                </div>
                <h4 className="text-sm font-bold text-white">
                  Standardized Civic Problem Classification
                </h4>
                <p className="text-xs text-teal-100">
                  Natural language extraction and objective civic synthesis from raw multilingual reports.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    Category:
                  </span>
                  <div className="font-semibold text-slate-900">
                    {hotspot.category || hotspot.primaryCategory || 'Drainage & Flood Mitigation'}
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    Severity:
                  </span>
                  <div className="font-semibold text-slate-900">
                    {hotspot.severity || 'High'}
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    Detected Language:
                  </span>
                  <div className="font-semibold text-slate-900">
                    {hotspot.languagesReported?.join(', ') || 'Hindi, English, Kannada'}
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    Recommended Domain:
                  </span>
                  <div className="font-semibold text-teal-950">
                    {hotspot.recommendedDomain || 'Municipal Public Works & Stormwater Engineering'}
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-lg border border-slate-200 bg-white space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  Standardized Problem Classification:
                </span>
                <p className="text-xs font-semibold text-slate-900">
                  {hotspot.standardizedProblem || hotspot.aiClassification || 'Seasonal drainage and flooding infrastructure deficit.'}
                </p>
              </div>

              <div className="p-3.5 rounded-lg border border-slate-200 bg-white space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  Objective Civic Summary:
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {hotspot.aiSummary || hotspot.summary}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer / Government Decision CTA Bar */}
        <div className="bg-slate-50/95 border-t border-slate-200 px-5 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Current Status: </span>
            <span className="font-mono text-teal-900 font-bold">
              {hotspot.status || hotspot.currentStatus || hotspot.governmentStatus || 'Needs Government Review'}
            </span>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>

            {/* Primary Action: Send to Government Decision View per Section 7 Requirements */}
            <button
              type="button"
              onClick={handleSendToDecisionView}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-900 hover:bg-teal-950 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <span>Send to Government Decision View</span>
              <Send className="w-3.5 h-3.5 text-teal-200" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
