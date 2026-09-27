import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams, Link, useSearchParams } from 'react-router-dom';
import { 
  Sparkles, 
  BarChart3, 
  CheckCircle2, 
  Building2, 
  Users, 
  MapPin, 
  Clock, 
  FileText, 
  ArrowRight, 
  ShieldCheck, 
  Info, 
  Layers, 
  Check, 
  Send, 
  AlertTriangle, 
  Camera, 
  Compass, 
  AlertCircle, 
  SlidersHorizontal, 
  FolderPlus, 
  HelpCircle, 
  Filter, 
  X, 
  Edit3,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Activity,
  Award,
  Loader2,
  Briefcase,
  GitBranch,
  Search
} from 'lucide-react';
import { DEMAND_HOTSPOTS, MACRO_INTELLIGENCE_METRICS, DATA_PROVENANCE } from '../data/mockDemandIntelligence';
import { calculatePriorityScore, GOV_WORKFLOW_STATUSES, GOV_DEPARTMENTS } from '../services/hotspotEngine';
import { aiService } from '../services/aiService';
import HotspotDetail from '../components/HotspotDetail';
import Card from '../components/common/Card';

export default function DecisionViewPage({
  hotspots = DEMAND_HOTSPOTS,
  onUpdateHotspot = () => {},
  projects = []
}) {
  const navigate = useNavigate();
  const { id: routeId } = useParams();
  const [searchParams] = useSearchParams();
  const targetId = routeId || searchParams.get('id') || searchParams.get('hotspotId');

  // Active filter tab: 'all' | 'critical' | 'high' | 'needs_review' | 'demo_abc'
  const [filterTab, setFilterTab] = useState('all');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected hotspot for Priority Detail Modal/Drawer
  const [selectedDetailHotspot, setSelectedDetailHotspot] = useState(() => {
    if (!targetId) return null;
    const list = hotspots || DEMAND_HOTSPOTS;
    return list.find(h => h.id === targetId) || null;
  });

  // Modal hotspot for full community evidence inspection
  const [evidenceModalHotspot, setEvidenceModalHotspot] = useState(null);
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);

  // Gemini AI Executive Synthesis State
  const [isAiSynthesizing, setIsAiSynthesizing] = useState(false);
  const [aiPriorityResult, setAiPriorityResult] = useState(null);

  // Action Success Notice
  const [actionSuccessNotice, setActionSuccessNotice] = useState(null);

  // Project linking selector state inside Priority Detail
  const [isLinkingProject, setIsLinkingProject] = useState(false);
  const [selectedProjectIdToLink, setSelectedProjectIdToLink] = useState('');

  const activeHotspotsList = hotspots || DEMAND_HOTSPOTS;

  // Compute deterministic priorities for all hotspots and sort by totalScore descending
  const enrichedHotspots = useMemo(() => {
    return activeHotspotsList.map(h => {
      const scoring = calculatePriorityScore(h);
      return {
        ...h,
        totalScore: scoring.totalScore,
        priorityScore: scoring.totalScore,
        priorityLevel: scoring.level,
        aiPriorityRecommendation: scoring.level.toUpperCase(),
        factors: scoring.factors,
        reasoning: scoring.reasoning,
        breakdown: scoring.breakdown
      };
    });
  }, [activeHotspotsList]);

  // Ranked and filtered list
  const rankedHotspots = useMemo(() => {
    let list = [...enrichedHotspots].sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0));

    if (filterTab === 'critical') {
      list = list.filter(h => h.priorityLevel === 'Critical');
    } else if (filterTab === 'high') {
      list = list.filter(h => h.priorityLevel === 'High');
    } else if (filterTab === 'needs_review') {
      list = list.filter(h => {
        const s = (h.status || h.currentStatus || h.governmentStatus || '').toLowerCase();
        return s.includes('new') || s.includes('review') || s.includes('assessment');
      });
    } else if (filterTab === 'demo_abc') {
      // Scenarios A, B, and C to demonstrate natural ranking
      list = list.filter(h => ['hotspot-001', 'hotspot-015', 'hotspot-099'].includes(h.id));
    }

    if (selectedDeptFilter !== 'ALL') {
      list = list.filter(h => 
        (h.recommendedDomain || '').includes(selectedDeptFilter) || 
        (h.assignedDepartment || '').includes(selectedDeptFilter)
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(h =>
        (h.title || h.name || '').toLowerCase().includes(q) ||
        (h.district || '').toLowerCase().includes(q) ||
        (h.state || '').toLowerCase().includes(q) ||
        (h.category || '').toLowerCase().includes(q) ||
        (h.linkedProjectId || '').toLowerCase().includes(q) ||
        (h.linkedProject?.name || '').toLowerCase().includes(q) ||
        (h.id || '').toLowerCase().includes(q)
      );
    }

    return list;
  }, [enrichedHotspots, filterTab, selectedDeptFilter, searchQuery]);

  // If URL has routeId or query param id (e.g. /decision?id=... or /decision-view/:id), automatically select that hotspot
  useEffect(() => {
    if (targetId) {
      const found = enrichedHotspots.find(h => h.id === targetId);
      if (found) {
        setSelectedDetailHotspot(found);
      }
    }
  }, [targetId, enrichedHotspots]);

  // Keep selectedDetailHotspot in sync with updated props
  useEffect(() => {
    if (selectedDetailHotspot) {
      const updated = enrichedHotspots.find(h => h.id === selectedDetailHotspot.id);
      if (updated) {
        setSelectedDetailHotspot(updated);
      }
    }
  }, [enrichedHotspots]);

  // Macro metrics
  const criticalCount = useMemo(() => {
    return enrichedHotspots.filter(h => h.priorityLevel === 'Critical').length;
  }, [enrichedHotspots]);

  const handleOpenEvidence = (hotspot) => {
    setEvidenceModalHotspot(hotspot);
    setIsEvidenceModalOpen(true);
  };

  const handleOpenDetail = (hotspot) => {
    setSelectedDetailHotspot(hotspot);
    setAiPriorityResult(null);
    setIsLinkingProject(false);
  };

  const handleCloseDetail = () => {
    setSelectedDetailHotspot(null);
    setAiPriorityResult(null);
    setIsLinkingProject(false);
    if (routeId) {
      navigate('/decision-view');
    }
  };

  // Status transition handler
  const handleStatusChange = (newStatus) => {
    if (!selectedDetailHotspot) return;

    onUpdateHotspot(selectedDetailHotspot.id, {
      status: newStatus,
      notes: `Status transitioned to "${newStatus}" in Government Review Workflow`
    });

    setActionSuccessNotice(`Status updated to "${newStatus}" for ${selectedDetailHotspot.title || selectedDetailHotspot.name}`);
    setTimeout(() => setActionSuccessNotice(null), 5000);
  };

  // Department assignment handler
  const handleDepartmentChange = (newDept) => {
    if (!selectedDetailHotspot) return;

    onUpdateHotspot(selectedDetailHotspot.id, {
      assignedDepartment: newDept,
      notes: `Assigned to department: ${newDept}`
    });

    setActionSuccessNotice(`Assigned to ${newDept}`);
    setTimeout(() => setActionSuccessNotice(null), 4000);
  };

  // Project linking handler
  const handleLinkProjectSubmit = () => {
    if (!selectedDetailHotspot || !selectedProjectIdToLink) return;

    const proj = projects.find(p => p.id === selectedProjectIdToLink);

    onUpdateHotspot(selectedDetailHotspot.id, {
      linkedProjectId: selectedProjectIdToLink,
      linkedProject: proj ? {
        id: proj.id,
        name: proj.name,
        location: proj.location,
        status: proj.status,
        budget: proj.budget,
        completionPercentage: proj.completionPercentage,
        department: proj.department
      } : null,
      status: 'Project Linked',
      notes: `Linked to capital project ${selectedProjectIdToLink}`
    });

    setIsLinkingProject(false);
    setSelectedProjectIdToLink('');
    setActionSuccessNotice(`Linked to project ${selectedProjectIdToLink}`);
    setTimeout(() => setActionSuccessNotice(null), 5000);
  };

  // Unlink project handler
  const handleUnlinkProject = () => {
    if (!selectedDetailHotspot) return;

    onUpdateHotspot(selectedDetailHotspot.id, {
      linkedProjectId: null,
      linkedProject: null,
      status: 'Validated',
      notes: 'Unlinked capital project'
    });

    setActionSuccessNotice('Project unlinked');
    setTimeout(() => setActionSuccessNotice(null), 4000);
  };

  // Trigger Gemini AI Executive Priority Synthesis
  const handleGenerateAiRationale = async () => {
    if (!selectedDetailHotspot) return;
    setIsAiSynthesizing(true);

    try {
      const res = await aiService.analyzePriority({
        title: selectedDetailHotspot.title || selectedDetailHotspot.name,
        location: selectedDetailHotspot.location || `${selectedDetailHotspot.district}, ${selectedDetailHotspot.state}`,
        category: selectedDetailHotspot.category || 'Drainage',
        reportCount: selectedDetailHotspot.reportCount || selectedDetailHotspot.relatedReportsCount || 37,
        severity: selectedDetailHotspot.severity || 'High',
        affectedPopulation: selectedDetailHotspot.affectedPopulationDisplay || '12,600 residents',
        infrastructureGap: selectedDetailHotspot.infrastructureGap || 'Infrastructure capacity deficit',
        affectedServices: selectedDetailHotspot.affectedServices || ['Road Access', 'School Attendance']
      });

      if (res && res.data) {
        setAiPriorityResult(res.data);
      }
    } catch (err) {
      console.warn('Gemini priority synthesis error:', err);
    } finally {
      setIsAiSynthesizing(false);
    }
  };

  // Find linked project object if any
  const linkedProjectData = useMemo(() => {
    if (!selectedDetailHotspot) return null;
    if (selectedDetailHotspot.linkedProject) return selectedDetailHotspot.linkedProject;
    if (selectedDetailHotspot.linkedProjectId) {
      return projects.find(p => p.id === selectedDetailHotspot.linkedProjectId) || null;
    }
    return null;
  }, [selectedDetailHotspot, projects]);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Top Banner (Part 4) */}
      <div className="bg-white border-b border-slate-200/80">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-[5vw] py-8 sm:py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200/70 text-teal-800 text-xs font-semibold">
                  <BarChart3 className="w-3.5 h-3.5 text-teal-700" />
                  <span>Government Decision View — Executive Decision Support</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200">
                  SIMULATED DEMO DATA
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                National Infrastructure Demand Intelligence
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Evidence-backed civic infrastructure priorities synthesized from citizen demand. Translates ground-level reports into actionable executive decisions for capital allocation.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/intelligence"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
              >
                <span>National Demand Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 4 Top Macro Decision Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
            <div className="p-3.5 sm:p-4 rounded-lg bg-white border border-slate-200/90 shadow-2xs space-y-0.5">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 font-mono">
                TOTAL CITIZEN REQUESTS
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900">
                27,170
              </div>
              <div className="text-[11px] text-slate-500">
                Aggregated submissions
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-lg bg-white border border-slate-200/90 shadow-2xs space-y-0.5">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 font-mono">
                DEMAND HOTSPOTS
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-teal-900">
                {activeHotspotsList.length}
              </div>
              <div className="text-[11px] text-slate-500">
                Clustered civic corridors
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-lg bg-white border border-slate-200/90 shadow-2xs space-y-0.5">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 font-mono">
                CRITICAL PRIORITIES
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-rose-800">
                {criticalCount}
              </div>
              <div className="text-[11px] text-slate-500">
                Score ≥ 80 / 100
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-lg bg-white border border-slate-200/90 shadow-2xs space-y-0.5">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 font-mono">
                STATES COVERED
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900">
                10
              </div>
              <div className="text-[11px] text-slate-500">
                Multi-state coverage
              </div>
            </div>
          </div>

          {/* 5 Core Executive Questions Framework */}
          <div className="mt-6 pt-5 border-t border-slate-200/60">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-teal-700" />
              <span>Answers 5 Core Executive Questions</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                <span className="font-mono font-bold text-[10px] text-teal-800 uppercase block">1. WHAT</span>
                <span className="font-semibold text-slate-800 text-[11px]">Problem & Severity</span>
                <p className="text-[10px] text-slate-500 mt-0.5">Category classification, hazard risk & verified disruption</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                <span className="font-mono font-bold text-[10px] text-indigo-800 uppercase block">2. WHERE</span>
                <span className="font-semibold text-slate-800 text-[11px]">Location & Context</span>
                <p className="text-[10px] text-slate-500 mt-0.5">District, State, Urban ward or Rural gram panchayat</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                <span className="font-mono font-bold text-[10px] text-blue-800 uppercase block">3. HOW MANY</span>
                <span className="font-semibold text-slate-800 text-[11px]">Demand & Impact</span>
                <p className="text-[10px] text-slate-500 mt-0.5">Aggregated citizen volume & census/ward affected population</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                <span className="font-mono font-bold text-[10px] text-amber-800 uppercase block">4. WHY PRIORITY</span>
                <span className="font-semibold text-slate-800 text-[11px]">Deterministic + AI</span>
                <p className="text-[10px] text-slate-500 mt-0.5">6-factor scoring (100 pts) + Gemini executive rationale</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                <span className="font-mono font-bold text-[10px] text-emerald-800 uppercase block">5. WHAT ACTION</span>
                <span className="font-semibold text-slate-800 text-[11px]">Institutional Response</span>
                <p className="text-[10px] text-slate-500 mt-0.5">Assigned department, status tracking & capital project link</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-[5vw] py-8 space-y-8">
        
        {/* Action Notice Banner */}
        {actionSuccessNotice && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{actionSuccessNotice}</span>
            </div>
            <button
              type="button"
              onClick={() => setActionSuccessNotice(null)}
              className="text-emerald-700 hover:text-emerald-950 text-xs cursor-pointer font-semibold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Part 11: Government Decision Support Safety Rule */}
        <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200/80 flex items-start gap-3 text-xs text-teal-950 leading-relaxed">
          <Info className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">AI-Assisted Decision Support Notice:</span>
            <span>Final prioritization requires human, engineering, budgetary and government review. ANTICRO provides transparent recommendation signals to guide capital allocation, not automated procurement mandates.</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col gap-3.5 bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setFilterTab('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  filterTab === 'all'
                    ? 'bg-teal-800 text-white font-semibold shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All Priorities
              </button>
              <button
                type="button"
                onClick={() => setFilterTab('critical')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  filterTab === 'critical'
                    ? 'bg-rose-700 text-white font-semibold shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Critical Risk
              </button>
              <button
                type="button"
                onClick={() => setFilterTab('high')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  filterTab === 'high'
                    ? 'bg-amber-600 text-white font-semibold shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                High Priority
              </button>
              <button
                type="button"
                onClick={() => setFilterTab('needs_review')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  filterTab === 'needs_review'
                    ? 'bg-indigo-700 text-white font-semibold shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Needs Government Review
              </button>
              <button
                type="button"
                onClick={() => setFilterTab('demo_abc')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  filterTab === 'demo_abc'
                    ? 'bg-slate-900 text-white font-semibold shadow-2xs'
                    : 'bg-teal-50 text-teal-900 border border-teal-200 hover:bg-teal-100'
                }`}
              >
                Scenarios A / B / C Demo Test
              </button>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] font-semibold text-slate-500 uppercase font-mono">Domain:</span>
              <select
                value={selectedDeptFilter}
                onChange={(e) => setSelectedDeptFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-700 cursor-pointer"
              >
                <option value="ALL">All Departments</option>
                {GOV_DEPARTMENTS.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Instant Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search priorities by hotspot, district, state, category, or linked project..."
              className="w-full pl-9 pr-8 py-2 bg-slate-50/80 border border-slate-200/90 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-700 focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Top Infrastructure Priorities Header */}
        <div className="border-b border-slate-200/80 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Top Infrastructure Priorities
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Ranked dynamically by the deterministic ANTICRO priority model (Demand 25%, Severity 20%, Population 20%, Deficit 15%, Evidence 10%, Trend 10%).
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500 font-semibold">
            {rankedHotspots.length} ranked priorities
          </span>
        </div>

        {/* Ranked Hotspots List (Part 5) */}
        <div className="space-y-4">
          {rankedHotspots.map((hotspot, idx) => {
            const rank = idx + 1;
            const rankDisplay = rank < 10 ? `#0${rank}` : `#${rank}`;
            const priorityLevel = hotspot.priorityLevel || 'Critical';
            const statusLabel = hotspot.status || hotspot.currentStatus || 'New Signal';

            return (
              <Card
                key={hotspot.id}
                padding="p-5 sm:p-6"
                className="space-y-4 border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all bg-white"
              >
                {/* Header Row: Rank, Title, Location, Priority Score */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-start gap-3.5">
                    <span className={`w-10 h-10 rounded-xl text-white font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-xs ${
                      priorityLevel === 'Critical' ? 'bg-rose-700' : priorityLevel === 'High' ? 'bg-amber-600' : 'bg-slate-700'
                    }`}>
                      {rankDisplay}
                    </span>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-teal-800 font-mono">
                          {rankDisplay}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                          {hotspot.category || 'Drainage & Flood Mitigation'}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-medium">
                          Status: {statusLabel}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                        {hotspot.title || hotspot.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 pt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                        <span className="font-medium">{hotspot.location || `${hotspot.district}, ${hotspot.state}`}</span>
                      </div>
                    </div>
                  </div>

                  {/* Priority & Score Badge */}
                  <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
                    <div className="bg-slate-50 border border-slate-200/80 px-4 py-2 rounded-xl text-right">
                      <span className="text-[10px] uppercase font-semibold text-slate-500 block font-mono">
                        PRIORITY SCORE
                      </span>
                      <div className="text-xl font-bold font-mono text-slate-900">
                        {hotspot.totalScore} <span className="text-xs text-slate-400 font-normal">/ 100</span>
                      </div>
                    </div>

                    <span className={`text-xs font-bold uppercase tracking-wider px-3 py-2 rounded-xl border ${
                      priorityLevel === 'Critical'
                        ? 'bg-rose-50 text-rose-800 border-rose-200'
                        : priorityLevel === 'High'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {priorityLevel.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Attributes Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono block">
                      Citizen Requests
                    </span>
                    <div className="font-bold text-slate-900 font-mono text-sm">
                      {(hotspot.requestCount || 1840).toLocaleString()} reports
                    </div>
                    <span className="text-[11px] text-teal-800 font-medium">
                      {hotspot.reportCount || 37} clustered submissions
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono block">
                      Affected Population
                    </span>
                    <div className="font-semibold text-slate-800">
                      {hotspot.affectedPopulationDisplay || `${(hotspot.affectedPopulation || 12600).toLocaleString()} residents`}
                    </div>
                    <span className="text-[11px] text-slate-500">
                      Severity: <span className="font-semibold text-slate-700">{hotspot.severity || 'High'}</span>
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono block">
                      Evidence Strength
                    </span>
                    <div className="font-semibold text-teal-900 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
                      <span>{hotspot.citizenEvidenceCount || 427} items</span>
                    </div>
                    <span className="text-[11px] text-slate-500">
                      Shielded ground photos & logs
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono block">
                      Recent Trend
                    </span>
                    <div className="font-semibold text-slate-800 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-teal-700" />
                      <span>{hotspot.trend || '+24%'}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 truncate block">
                      {hotspot.recurrenceIndicator || 'Recurring seasonal problem'}
                    </span>
                  </div>
                </div>

                {/* Recommended Action & Review Button Row */}
                <div className="p-3.5 rounded-xl bg-teal-50/60 border border-teal-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-950 font-mono block">
                      RECOMMENDED ACTION:
                    </span>
                    <p className="text-slate-800 font-medium leading-relaxed">
                      {hotspot.recommendedAction || 'Stormwater drainage upgrade and road rehabilitation'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleOpenEvidence(hotspot)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5 text-teal-700" />
                      <span>Evidence</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenDetail(hotspot)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                    >
                      <span>Review Priority</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Part 15: Data & Method Provenance Section */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Compass className="w-4 h-4 text-teal-700" />
              <span>DATA & METHOD</span>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Illustrative prototype data. Not official government statistics.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Citizen requests</span>
              <div className="font-semibold text-slate-800">{DATA_PROVENANCE.citizenRequests}</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Infrastructure records</span>
              <div className="font-semibold text-slate-800">{DATA_PROVENANCE.infrastructure}</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">AI Engine</span>
              <div className="font-semibold text-slate-800">Google Gemini (Server-side)</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Priority Model</span>
              <div className="font-semibold text-slate-800">ANTICRO 6-Factor Deterministic Model</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Geographic coverage</span>
              <div className="font-semibold text-slate-800">Multi-state India prototype (10 States)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Part 6: Priority Detail Modal / Drawer */}
      {selectedDetailHotspot && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden relative max-h-[92vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70 shrink-0">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-teal-800 text-white">
                    PRIORITY DETAIL
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    ID: {selectedDetailHotspot.id}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {selectedDetailHotspot.name || selectedDetailHotspot.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={handleCloseDetail}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
              
              {/* SECTION 1: INFRASTRUCTURE PRIORITY */}
              <div className="space-y-3 pb-5 border-b border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-teal-700" />
                  <span>INFRASTRUCTURE PRIORITY</span>
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">Location</span>
                    <span className="font-semibold text-slate-900 block mt-0.5">
                      {selectedDetailHotspot.location || `${selectedDetailHotspot.district}, ${selectedDetailHotspot.state}`}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">Category</span>
                    <span className="font-semibold text-slate-900 block mt-0.5">
                      {selectedDetailHotspot.category || 'Drainage & Flood Mitigation'}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">Priority Score</span>
                    <span className="font-bold text-teal-900 font-mono text-base block mt-0.5">
                      {selectedDetailHotspot.totalScore || 91} / 100
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">Priority Level</span>
                    <span className={`font-bold uppercase tracking-wider text-xs block mt-1 ${
                      selectedDetailHotspot.priorityLevel === 'Critical' ? 'text-rose-700' : 'text-amber-700'
                    }`}>
                      {selectedDetailHotspot.priorityLevel || 'Critical'}
                    </span>
                  </div>
                </div>
              </div>

              {/* SECTION 2: COMMUNITY DEMAND */}
              <div className="space-y-3 pb-5 border-b border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-teal-700" />
                  <span>COMMUNITY DEMAND</span>
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">Citizen reports</span>
                    <span className="font-bold text-slate-900 font-mono block mt-0.5">
                      {(selectedDetailHotspot.requestCount || 1840).toLocaleString()} reports
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {selectedDetailHotspot.reportCount || 37} clustered
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">Affected population</span>
                    <span className="font-semibold text-slate-800 block mt-0.5">
                      {selectedDetailHotspot.affectedPopulationDisplay || `${(selectedDetailHotspot.affectedPopulation || 12600).toLocaleString()} residents`}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">Affected locations</span>
                    <span className="font-semibold text-slate-800 block mt-0.5">
                      {selectedDetailHotspot.affectedLocations || 42} feeder points
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">Trend</span>
                    <span className="font-semibold text-slate-800 block mt-0.5">
                      {selectedDetailHotspot.trend || '+24%'}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">Languages</span>
                    <span className="font-semibold text-slate-800 block mt-0.5">
                      {(selectedDetailHotspot.languagesReported || ['Kannada', 'Hindi', 'English']).join(', ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* SECTION 3: INFRASTRUCTURE GAP */}
              <div className="space-y-2 pb-5 border-b border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-teal-700" />
                  <span>INFRASTRUCTURE GAP</span>
                </h4>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 text-xs sm:text-sm leading-relaxed text-slate-800">
                  {selectedDetailHotspot.infrastructureGap || selectedDetailHotspot.standardizedProblem || 'Severe infrastructure capacity deficit documented across corridor.'}
                </div>
              </div>

              {/* SECTION 4: EVIDENCE */}
              <div className="space-y-3 pb-5 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-teal-700" />
                    <span>EVIDENCE ({selectedDetailHotspot.citizenEvidenceCount || 427} RECORDS)</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => handleOpenEvidence(selectedDetailHotspot)}
                    className="inline-flex items-center gap-1 text-xs text-teal-800 hover:text-teal-950 font-semibold cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Inspect Ground Evidence & Telemetry</span>
                  </button>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-slate-900">Privacy Shield Protected Ground Evidence</span>
                    <p className="text-slate-500 text-[11px]">
                      Face blurring, license plate redaction, and GPS coordinate sanitation active across all citizen uploads.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                    Shielded & Verified
                  </span>
                </div>
              </div>

              {/* SECTION 5: WHY THIS PRIORITY? (Visual Horizontal Progress Bars) */}
              <div className="space-y-4 pb-5 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4 text-teal-700" />
                    <span>WHY THIS PRIORITY? (6-FACTOR BREAKDOWN)</span>
                  </h4>
                  <span className="text-xs font-mono font-bold text-teal-900">
                    Total: {selectedDetailHotspot.totalScore || 91} / 100
                  </span>
                </div>

                {/* 6 Visual Progress Bars */}
                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                  {[
                    { label: 'Citizen Demand', score: selectedDetailHotspot.factors?.citizenDemand || 94, weight: '25%' },
                    { label: 'Severity', score: selectedDetailHotspot.factors?.severity || 92, weight: '20%' },
                    { label: 'Affected Population', score: selectedDetailHotspot.factors?.affectedPopulation || 88, weight: '20%' },
                    { label: 'Infrastructure Gap', score: selectedDetailHotspot.factors?.infrastructureGap || 95, weight: '15%' },
                    { label: 'Evidence Strength', score: selectedDetailHotspot.factors?.evidenceStrength || 86, weight: '10%' },
                    { label: 'Recent Trend', score: selectedDetailHotspot.factors?.recentTrend || 90, weight: '10%' }
                  ].map((factor, fIdx) => (
                    <div key={fIdx} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-slate-800">
                          {factor.label} <span className="text-[10px] text-slate-400 font-normal font-mono">({factor.weight})</span>
                        </span>
                        <span className="font-mono font-bold text-slate-900">{factor.score} / 100</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-teal-700 transition-all duration-500" 
                          style={{ width: `${factor.score}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bullet list of reasons */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-800 font-mono uppercase block">
                    Why this is prioritized:
                  </span>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700">
                    {(selectedDetailHotspot.reasoning || selectedDetailHotspot.whyReasons || [
                      'High volume of citizen reports',
                      'High severity',
                      'Large affected population',
                      'School access affected',
                      'Recurring reports',
                      'Supporting evidence available'
                    ]).map((r, rIdx) => (
                      <li key={rIdx} className="leading-relaxed">{r}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* SECTION 6: RECOMMENDED GOVERNMENT ACTION */}
              <div className="space-y-3 pb-5 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-teal-700" />
                    <span>RECOMMENDED GOVERNMENT ACTION</span>
                  </h4>
                  <span className="text-[10px] font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-semibold">
                    Recommended for government review
                  </span>
                </div>

                <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-200/80 space-y-2.5 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-500 font-mono block">Recommended Domain:</span>
                    <span className="font-bold text-teal-950 text-sm">
                      {selectedDetailHotspot.assignedDepartment || selectedDetailHotspot.recommendedDomain || 'Stormwater Drainage & Urban Roads'}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-500 font-mono block">Recommended Intervention:</span>
                    <p className="font-semibold text-slate-800 text-xs mt-0.5 leading-relaxed">
                      {selectedDetailHotspot.suggestedIntervention || selectedDetailHotspot.recommendedAction || 'Upgrade stormwater drainage capacity and rehabilitate the affected road corridor.'}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-500 font-mono block">Expected Public-Service Impact:</span>
                    <p className="text-slate-700 text-xs mt-0.5 leading-relaxed">
                      Restores all-weather school access for students, eliminates 2+ ft monsoon standing water, restores ambulance connectivity, and protects pedestrian safety.
                    </p>
                  </div>

                  {/* Gemini AI synthesis button */}
                  <div className="pt-2 border-t border-teal-200/60 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleGenerateAiRationale}
                      disabled={isAiSynthesizing}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-800 hover:bg-teal-900 text-white font-medium text-xs shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {isAiSynthesizing ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-teal-200" />
                          <span>Synthesizing with Gemini...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-teal-200" />
                          <span>Generate AI Executive Rationale (Gemini)</span>
                        </>
                      )}
                    </button>

                    <span className="text-[10px] text-slate-500 italic">
                      Strict neutrality rules applied
                    </span>
                  </div>

                  {aiPriorityResult && (
                    <div className="mt-3 p-3 bg-white rounded-lg border border-teal-200 space-y-1.5">
                      <span className="font-bold text-teal-950 block text-[11px] font-mono">
                        GEMINI AI EXECUTIVE SYNTHESIS:
                      </span>
                      <p className="text-slate-700 text-xs leading-relaxed">
                        {aiPriorityResult.priorityRationale}
                      </p>
                      {aiPriorityResult.implementationConsiderations && (
                        <p className="text-slate-600 text-[11px] italic">
                          Considerations: {aiPriorityResult.implementationConsiderations}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* SECTION 7: GOVERNMENT REVIEW WORKFLOW (Part 7) */}
              <div className="space-y-3 pb-5 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-1.5">
                    <GitBranch className="w-4 h-4 text-teal-700" />
                    <span>GOVERNMENT REVIEW WORKFLOW</span>
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Local prototype state — ready for Supabase persistence
                  </span>
                </div>

                {/* Workflow Status Tracker Bar */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
                  <div className="flex flex-wrap items-center gap-1 text-[11px]">
                    {GOV_WORKFLOW_STATUSES.map((st, sIdx) => {
                      const currentStatus = selectedDetailHotspot.status || selectedDetailHotspot.currentStatus || 'New Signal';
                      const isCurrent = currentStatus === st;
                      const currentIndex = GOV_WORKFLOW_STATUSES.indexOf(currentStatus);
                      const isPast = sIdx < currentIndex;

                      return (
                        <React.Fragment key={st}>
                          <span className={`px-2.5 py-1 rounded-md font-medium text-xs transition-colors ${
                            isCurrent
                              ? 'bg-teal-800 text-white font-bold shadow-2xs'
                              : isPast
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-white text-slate-500 border border-slate-200'
                          }`}>
                            {st}
                          </span>
                          {sIdx < GOV_WORKFLOW_STATUSES.length - 1 && (
                            <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>

                  {/* Interactive Status Transition Action Buttons */}
                  <div className="pt-2 border-t border-slate-200/60 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleStatusChange('Under Review')}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-medium text-xs cursor-pointer"
                    >
                      Mark Under Review
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStatusChange('Validated')}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-medium text-xs cursor-pointer"
                    >
                      Validate Priority
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStatusChange('Project Proposed')}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-medium text-xs cursor-pointer"
                    >
                      Propose Project
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStatusChange('Action Underway')}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-medium text-xs cursor-pointer"
                    >
                      Mark Action Underway
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStatusChange('Resolved')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 font-semibold text-xs cursor-pointer"
                    >
                      Mark Resolved
                    </button>
                  </div>
                </div>
              </div>

              {/* SECTION 8: ASSIGN DEPARTMENT (Part 8) */}
              <div className="space-y-3 pb-5 border-b border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-teal-700" />
                  <span>ASSIGN RESPONSIBLE DEPARTMENT</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-1 font-medium">
                      Select Department / Administrative Domain:
                    </label>
                    <select
                      value={selectedDetailHotspot.assignedDepartment || ''}
                      onChange={(e) => handleDepartmentChange(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-700 cursor-pointer"
                    >
                      <option value="">Select Responsible Department...</option>
                      {GOV_DEPARTMENTS.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs">
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">Current Assigned Department</span>
                    <span className="font-bold text-slate-900 text-xs block mt-0.5">
                      {selectedDetailHotspot.assignedDepartment || 'None assigned yet'}
                    </span>
                  </div>
                </div>
              </div>

              {/* SECTION 9: LINK EXISTING PROJECT (Part 9) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-teal-700" />
                    <span>RELATED PROJECT</span>
                  </h4>
                  {linkedProjectData && (
                    <button
                      type="button"
                      onClick={handleUnlinkProject}
                      className="text-xs text-rose-700 hover:text-rose-900 cursor-pointer font-medium"
                    >
                      Unlink Project
                    </button>
                  )}
                </div>

                {/* Relationship chain display */}
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-[11px] font-mono text-slate-600 flex items-center gap-2">
                  <span className="text-teal-800 font-semibold">Citizen Demand</span>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                  <span className="text-teal-800 font-semibold">Demand Hotspot</span>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                  <span className="text-teal-800 font-semibold">Infrastructure Gap</span>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                  <span className="font-bold text-slate-900">
                    {linkedProjectData ? `Project (${linkedProjectData.id})` : 'Unlinked'}
                  </span>
                </div>

                {linkedProjectData ? (
                  <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-200/80 space-y-2 text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-teal-800 uppercase block">
                          LINKED CAPITAL PROJECT ({linkedProjectData.id})
                        </span>
                        <h5 className="font-extrabold text-slate-900 text-sm">
                          {linkedProjectData.name}
                        </h5>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-900 text-[10px] font-bold font-mono">
                        {linkedProjectData.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-teal-200/60 text-[11px]">
                      <div>
                        <span className="text-slate-500 block">Department</span>
                        <span className="font-semibold text-slate-800">{linkedProjectData.department || 'Public Works'}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Budget</span>
                        <span className="font-semibold text-slate-800">{linkedProjectData.budget || '₹14.2 Cr'}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Completion</span>
                        <span className="font-semibold text-slate-800">{linkedProjectData.completionPercentage || 70}%</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Location</span>
                        <span className="font-semibold text-slate-800 truncate block">{linkedProjectData.location}</span>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <Link
                        to={`/project/${linkedProjectData.id}`}
                        className="inline-flex items-center gap-1 text-xs text-teal-800 hover:text-teal-950 font-bold"
                      >
                        <span>Open Project Registry & Evidence</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-3">
                    <p className="text-slate-600 font-medium">
                      No related project currently identified.
                    </p>

                    {!isLinkingProject ? (
                      <button
                        type="button"
                        onClick={() => setIsLinkingProject(true)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                      >
                        <FolderPlus className="w-3.5 h-3.5" />
                        <span>Recommend / Link Project</span>
                      </button>
                    ) : (
                      <div className="space-y-2 pt-2 border-t border-slate-200">
                        <label className="block text-[11px] font-semibold text-slate-700">
                          Select Capital Works Project to Link:
                        </label>
                        <select
                          value={selectedProjectIdToLink}
                          onChange={(e) => setSelectedProjectIdToLink(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-700"
                        >
                          <option value="">Select an existing project...</option>
                          {projects.map(p => (
                            <option key={p.id} value={p.id}>
                              {p.id}: {p.name} ({p.department})
                            </option>
                          ))}
                        </select>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handleLinkProjectSubmit}
                            disabled={!selectedProjectIdToLink}
                            className="px-3 py-1.5 rounded-lg bg-teal-800 hover:bg-teal-900 text-white font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50"
                          >
                            Confirm Project Link
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsLinkingProject(false)}
                            className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-medium cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-slate-200 bg-slate-50/70 flex items-center justify-between shrink-0">
              <span className="text-[11px] text-slate-500 italic">
                ANTICRO CR-1 Civic Governance Decision Intelligence
              </span>
              <button
                type="button"
                onClick={handleCloseDetail}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                Close Priority Detail
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Community Evidence Inspection Modal */}
      <HotspotDetail
        hotspot={evidenceModalHotspot}
        onClose={() => setIsEvidenceModalOpen(false)}
        isStandalonePage={false}
      />
    </div>
  );
}
