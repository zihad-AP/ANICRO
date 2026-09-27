import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Shield, 
  ShieldCheck, 
  Camera, 
  Building, 
  MapPin, 
  ArrowLeft, 
  Info, 
  AlertTriangle, 
  Sparkles, 
  User, 
  Compass, 
  Building2, 
  Clock, 
  Layers, 
  FileText, 
  Scale, 
  Lock, 
  Filter, 
  CheckCircle, 
  CheckCircle2,
  Loader2, 
  FolderOpen,
  Megaphone,
  Users,
  Calendar,
  ArrowRight,
  RefreshCw,
  Send,
  Check,
  Activity,
  AlertCircle,
  HelpCircle,
  TrendingUp
} from 'lucide-react';
import { projectsService } from '../services/projectsService';
import { casesService } from '../services/casesService';
import { INITIAL_CASES } from '../data/mockCases';
import { aiService } from '../services/aiService';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import StatusBadge from '../components/common/StatusBadge';
import { 
  calculateProjectHealth, 
  getProgressStages, 
  getAccountabilityStages,
  updateProjectStatus, 
  updateGovernmentResponse,
  LIFECYCLE_STATUSES, 
  GOV_RESPONSE_STATUSES,
  EVIDENCE_TYPES
} from '../services/projectLifecycleEngine';
import PriorityCard from '../components/common/PriorityCard';

export default function ProjectDetailPage({ 
  projects = [], 
  hotspots = [],
  onOpenUpload, 
  onUpdateProject, 
  currentRole 
}) {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('evidence');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const foundInProps = projects.find(p => p.id === id || p.id?.toLowerCase() === id?.toLowerCase());
  const [projectData, setProjectData] = useState(foundInProps || null);
  const [relatedCases, setRelatedCases] = useState(() => 
    INITIAL_CASES.filter(c => c.projectId === id || c.projectId === id?.toLowerCase())
  );
  const [isLoading, setIsLoading] = useState(!foundInProps);

  // Interactive demo states
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [showGovResponseModal, setShowGovResponseModal] = useState(false);
  const [govResponseForm, setGovResponseForm] = useState({
    status: 'Action Underway',
    department: '',
    statement: '',
    nextAction: ''
  });

  // Live AI Evidence Assistance state
  const [analyzingEvidenceId, setAnalyzingEvidenceId] = useState(null);
  const [aiEvidenceResults, setAiEvidenceResults] = useState({});

  useEffect(() => {
    let isMounted = true;

    async function loadProject() {
      if (!foundInProps && !projectData) {
        setIsLoading(true);
      }
      try {
        const casesList = await casesService.getCasesByProjectId(id);
        if (isMounted && casesList && casesList.length > 0) {
          setRelatedCases(casesList);
        }

        const propProject = projects.find(p => p.id === id || p.id?.toLowerCase() === id?.toLowerCase());
        if (propProject) {
          if (isMounted) {
            setProjectData(propProject);
            setGovResponseForm({
              status: propProject.governmentResponse?.status || 'Action Underway',
              department: propProject.governmentResponse?.department || propProject.department || '',
              statement: propProject.governmentResponse?.statement || '',
              nextAction: propProject.governmentResponse?.nextAction || ''
            });
            setIsLoading(false);
          }
          return;
        }

        const result = await projectsService.getProjectById(id);
        if (isMounted && result.project) {
          setProjectData(result.project);
          setGovResponseForm({
            status: result.project.governmentResponse?.status || 'Action Underway',
            department: result.project.governmentResponse?.department || result.project.department || '',
            statement: result.project.governmentResponse?.statement || '',
            nextAction: result.project.governmentResponse?.nextAction || ''
          });
        }
      } catch (err) {
        console.warn('Error loading project detail or cases:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadProject();
    return () => { isMounted = false; };
  }, [id, projects]);

  const project = projects.find(p => p.id === id) || projectData;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-2">
        <Loader2 className="w-6 h-6 text-teal-700 animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-medium">Loading project record #{id}...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h2 className="text-base font-bold text-slate-900">Project Record Not Found</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            The project with ID <span className="font-mono font-semibold text-slate-700">"{id}"</span> could not be located in the database.
          </p>
        </div>
        <Link 
          to="/dashboard?tab=projects" 
          className="inline-flex items-center gap-1.5 bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs px-3.5 py-2 rounded-lg shadow-xs transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Projects Dashboard</span>
        </Link>
      </div>
    );
  }

  // Health calculation (Part 17)
  const healthSignal = calculateProjectHealth(project);
  const progressStages = getProgressStages(project);
  const accountabilityStages = getAccountabilityStages(project);

  // Matched originating demand hotspot (Part 3 & 15)
  const matchedHotspot = hotspots.find(h => h.id === project.hotspotId) || {
    id: project.hotspotId || 'hotspot-01',
    title: project.hotspotName || 'Regional Infrastructure Deficit',
    category: project.category,
    priorityScore: project.originatingHotspotPriority || 91,
    priorityLevel: 'Critical',
    reportCount: project.originatingDemandsCount || 2340,
    affectedPopulation: '45,000 residents',
    infrastructureGap: '82% deficit in designed subterranean stormwater runoff capacity'
  };

  // Enforce Rule #11: Only privacy_reviewed = true evidence appears in public timeline
  const rawTimeline = project.evidenceTimeline || [];
  const publicVerifiedTimeline = rawTimeline.filter(item => item.privacyShieldVerified === true || item.privacyReviewed === true);

  const filteredEvidence = publicVerifiedTimeline.filter(item => {
    if (categoryFilter === 'All') return true;
    return item.category === categoryFilter;
  });

  // Interactive demo status switcher (Part 2)
  const handleStatusChange = (newStatus) => {
    setIsUpdatingStatus(true);
    let updatedCompletion = project.completionPercentage;
    let resolution = project.resolution;

    if (newStatus === 'Proposed') updatedCompletion = 15;
    else if (newStatus === 'Approved') updatedCompletion = 25;
    else if (newStatus === 'In Progress') updatedCompletion = 64;
    else if (newStatus === 'Delayed') updatedCompletion = 45;
    else if (newStatus === 'Completed') updatedCompletion = 95;
    else if (newStatus === 'Under Verification') {
      updatedCompletion = 88;
      resolution = {
        status: 'Under Verification',
        date: new Date().toISOString().split('T')[0],
        outcome: 'Core construction completed; awaiting post-monsoon engineering inspection.',
        verification: 'Telemetry sensors and drainage load tests active.',
        remainingIssues: 'Silt accumulation monitoring required at junction point.'
      };
    } else if (newStatus === 'Resolved') {
      updatedCompletion = 100;
      resolution = {
        status: 'Resolved',
        date: new Date().toISOString().split('T')[0],
        outcome: 'Infrastructure corridor fully rehabilitated and verified operational under certified engineering standards.',
        verification: 'Post-completion physical engineering audit verified and signed off.',
        remainingIssues: 'Routine annual pre-monsoon desilting maintenance mandated.'
      };
    }

    const updates = {
      status: newStatus,
      lifecycleStage: newStatus,
      governmentActionStatus: newStatus,
      completionPercentage: updatedCompletion,
      resolution
    };

    if (onUpdateProject) {
      onUpdateProject(project.id, updates);
    }
    setProjectData(prev => ({ ...prev, ...updates }));
    setStatusMessage(`Project status updated to "${newStatus}"`);
    setTimeout(() => {
      setIsUpdatingStatus(false);
      setStatusMessage('');
    }, 1500);
  };

  // Government response submit handler (Part 5)
  const handleGovResponseSubmit = (e) => {
    e.preventDefault();
    const responsePayload = {
      status: govResponseForm.status,
      department: govResponseForm.department || project.department,
      responseDate: new Date().toISOString().split('T')[0],
      statement: govResponseForm.statement,
      nextAction: govResponseForm.nextAction
    };

    if (onUpdateProject) {
      onUpdateProject(project.id, {
        governmentResponse: responsePayload
      });
    }
    setProjectData(prev => ({
      ...prev,
      governmentResponse: responsePayload
    }));
    setShowGovResponseModal(false);
    setStatusMessage('Official government response recorded.');
    setTimeout(() => setStatusMessage(''), 2000);
  };

  // Live AI Evidence Assistance handler (Part 9)
  const handleRunAiEvidenceAnalysis = async (evidenceItem) => {
    setAnalyzingEvidenceId(evidenceItem.id);
    try {
      const payload = {
        evidenceText: `${evidenceItem.title}. ${evidenceItem.description}`,
        category: evidenceItem.category,
        evidenceType: evidenceItem.evidenceType || (evidenceItem.imageUrl ? 'Photo' : 'Citizen Observation'),
        projectDetails: {
          name: project.name,
          completionPercentage: project.completionPercentage,
          status: project.status,
          department: project.department,
          location: project.location
        }
      };

      const result = await aiService.analyzeEvidence(payload);
      if (result.success && result.data) {
        setAiEvidenceResults(prev => ({
          ...prev,
          [evidenceItem.id]: result.data
        }));
      }
    } catch (err) {
      console.warn('AI Evidence Assistance error:', err);
    } finally {
      setAnalyzingEvidenceId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 space-y-7 pb-24">
      
      {/* Top Breadcrumb & Demo Transparency Notice (Part 19) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <Link
          to="/dashboard?tab=projects"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-teal-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Monitored Projects</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1 rounded border border-slate-200">
            SIMULATED DEMO PROJECT DATA
          </span>
          <span className="text-[10px] font-mono font-medium text-teal-800 bg-teal-50 px-2 py-1 rounded border border-teal-200">
            Rule #10 & #13 Neutrality Active
          </span>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 bg-teal-50 border border-teal-200 text-teal-900 rounded-lg text-xs font-medium flex items-center justify-between animate-fade-in">
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-teal-700" />
            {statusMessage}
          </span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PART 1 & 2: PROJECT ACCOUNTABILITY & STATUS LIFECYCLE HEADER */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-7 shadow-soft space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
          <div className="space-y-3 max-w-3xl">
            
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold bg-slate-100 text-slate-800 border border-slate-300 px-2 py-0.5 rounded">
                #{String(project.id).toUpperCase()}
              </span>

              {/* Real / Simulated Badge (Prompt #11 Section 1 & 3) */}
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${(project.is_real === true || project.isReal === true || project.is_verified_source === true) ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-bold' : 'bg-slate-100 text-slate-700 border-slate-200 font-medium'}`}>
                {(project.is_real === true || project.isReal === true || project.is_verified_source === true) ? 'Verified Source' : 'Simulated Data'}
              </span>

              {/* Status Badge */}
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded border ${
                project.status === 'Resolved' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                project.status === 'Under Verification' ? 'bg-indigo-50 text-indigo-800 border-indigo-200' :
                project.status === 'Completed' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                project.status === 'Delayed' ? 'bg-rose-50 text-rose-800 border-rose-200' :
                project.status === 'In Progress' || project.status === 'Work Ongoing' ? 'bg-teal-50 text-teal-800 border-teal-200' :
                'bg-slate-100 text-slate-700 border-slate-200'
              }`}>
                {project.status}
              </span>

              {/* Health Signal */}
              <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border flex items-center gap-1 ${healthSignal.badgeClass}`}>
                <Activity className="w-3 h-3" />
                <span>Health: {healthSignal.label}</span>
              </span>

              <span className="text-xs text-slate-500 font-normal">
                Category: <strong className="font-medium text-slate-800">{project.category}</strong>
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
              {project.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {project.description}
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                {project.department}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {project.location}
              </span>
              <span className="flex items-center gap-1.5 font-mono text-slate-500 text-[11px]">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                {project.sourceRecord}
              </span>
              <span className="text-[11px] text-slate-400">
                Last updated: {project.lastUpdated || '2026-08-20'}
              </span>
            </div>

          </div>

          <div className="flex flex-col sm:items-end gap-2 shrink-0">
            <button
              onClick={() => onOpenUpload(project.id)}
              className="inline-flex items-center justify-center space-x-1.5 bg-teal-700 hover:bg-teal-800 text-white font-medium px-4 py-2.5 rounded-lg text-xs shadow-xs transition-colors cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>Submit Ground Evidence</span>
            </button>
            
            <div className="text-[11px] text-slate-500 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
              <span>Protected under Privacy Shield</span>
            </div>
          </div>
        </div>

        {/* Project Image or Clean Empty State (Prompt #11 Section 3) */}
        {project.image_url || project.imageUrl ? (
          <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 max-h-72">
            <img
              src={project.image_url || project.imageUrl}
              alt={project.name}
              className="w-full h-full object-cover max-h-72"
            />
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center space-y-1">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Building2 className="w-4 h-4" />
            </div>
            <p className="text-xs font-medium text-slate-700">No official project site overview photo on record</p>
            <p className="text-[11px] text-slate-400 font-mono">Official technical records and ground citizen evidence are documented in the evidence registry below.</p>
          </div>
        )}

        {/* Macro Metrics Grid (Approved Budget, Expenditure, Contractor, Dates, Completion) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-slate-100">
          <div className="p-3 bg-slate-50/70 rounded-lg border border-slate-200/80 space-y-0.5">
            <span className="text-[10px] uppercase text-slate-500 tracking-wider block font-medium">Approved Budget</span>
            <span className="text-sm font-bold text-slate-900 font-mono">{project.budget}</span>
          </div>

          <div className="p-3 bg-slate-50/70 rounded-lg border border-slate-200/80 space-y-0.5">
            <span className="text-[10px] uppercase text-slate-500 tracking-wider block font-medium">Recorded Spend</span>
            <span className="text-sm font-bold text-slate-900 font-mono">{project.expenditure || '—'}</span>
          </div>

          <div className="p-3 bg-slate-50/70 rounded-lg border border-slate-200/80 space-y-0.5">
            <span className="text-[10px] uppercase text-slate-500 tracking-wider block font-medium">Contractor</span>
            <span className="text-xs font-semibold text-slate-800 truncate block" title={project.contractor}>
              {project.contractor || 'Public Works Contractor'}
            </span>
          </div>

          <div className="p-3 bg-slate-50/70 rounded-lg border border-slate-200/80 space-y-0.5">
            <span className="text-[10px] uppercase text-slate-500 tracking-wider block font-medium">Start Date</span>
            <span className="text-xs font-semibold text-slate-800 font-mono">{project.startDate || '2024-01-01'}</span>
          </div>

          <div className="p-3 bg-slate-50/70 rounded-lg border border-slate-200/80 space-y-0.5">
            <span className="text-[10px] uppercase text-slate-500 tracking-wider block font-medium">Target Completion</span>
            <span className="text-xs font-semibold text-slate-800 font-mono">{project.expectedCompletionDate}</span>
          </div>

          <div className="p-3 bg-slate-50/70 rounded-lg border border-slate-200/80 space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase text-slate-500 tracking-wider block font-medium">Completion</span>
              <span className="text-xs font-bold text-teal-800 font-mono">{project.completionPercentage}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1 overflow-hidden">
              <div
                className="bg-teal-700 h-full rounded-full transition-all duration-500"
                style={{ width: `${project.completionPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* 9-STAGE CIVIC ACCOUNTABILITY TIMELINE */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-900 text-white space-y-3.5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-teal-300 font-mono">
                End-to-End Civic Accountability Pipeline
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Full Lifecycle: Citizen Intake → Resolution
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
            {accountabilityStages.map((st) => {
              const isDone = st.status === 'completed';
              const isCurrent = st.status === 'current';

              return (
                <div
                  key={st.id}
                  className={`p-2 rounded-lg border text-left transition-all ${
                    isDone
                      ? 'bg-teal-950/40 border-teal-500/40 text-teal-200'
                      : isCurrent
                      ? 'bg-teal-900/60 border-teal-400 ring-1 ring-teal-400 text-white shadow-xs'
                      : 'bg-slate-800/40 border-slate-700/60 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[9px] font-mono font-bold text-slate-400">
                      #{st.step}
                    </span>
                    <span
                      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                        isDone
                          ? 'bg-teal-400 text-slate-950'
                          : isCurrent
                          ? 'bg-teal-500 text-slate-950 animate-pulse'
                          : 'bg-slate-700 text-slate-400'
                      }`}
                    >
                      {isDone ? '✓' : isCurrent ? '●' : '○'}
                    </span>
                  </div>
                  <div className="text-[11px] font-semibold leading-tight line-clamp-2">
                    {st.label}
                  </div>
                  <div className="text-[9px] text-slate-400 mt-1 truncate">
                    {st.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PART 11: PROJECT PROGRESS TRACKING (5-Stage Visual Tracker) */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-teal-700" />
              <span>Project Progress Pipeline (5 Stages)</span>
            </span>
            <span className="text-xs font-mono font-semibold text-slate-600">
              {project.completionPercentage}% Complete
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {progressStages.map((stage) => {
              const isDone = stage.status === 'completed';
              const isCurrent = stage.status === 'current';
              
              return (
                <div 
                  key={stage.id} 
                  className={`p-2.5 rounded-lg border text-xs flex items-center gap-2 ${
                    isDone ? 'bg-teal-50/80 border-teal-200 text-teal-950 font-medium' :
                    isCurrent ? 'bg-white border-teal-600 ring-1 ring-teal-600 text-slate-900 font-bold shadow-2xs' :
                    'bg-white/60 border-slate-200 text-slate-400'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0 font-mono ${
                    isDone ? 'bg-teal-700 text-white' :
                    isCurrent ? 'bg-teal-600 text-white animate-pulse' :
                    'bg-slate-200 text-slate-600'
                  }`}>
                    {isDone ? '✓' : isCurrent ? '●' : '○'}
                  </div>
                  <span className="truncate">{stage.label}</span>
                </div>
              );
            })}
          </div>

          {/* Part 17: Health explanation note */}
          <div className="text-[11px] text-slate-500 flex items-start gap-1.5 pt-1">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span><strong>AI-assisted project health signal:</strong> {healthSignal.reason}</span>
          </div>
        </div>

        {/* PART 2: Interactive Demo Status Switcher */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-600">
            <span className="font-semibold text-slate-800">Demo Lifecycle Testing:</span> Switch project status to verify responsive UI states:
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {LIFECYCLE_STATUSES.map(st => (
              <button
                key={st}
                disabled={isUpdatingStatus}
                onClick={() => handleStatusChange(st)}
                className={`px-2.5 py-1 text-[11px] rounded-md font-medium transition-colors cursor-pointer border ${
                  project.status === st 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs' 
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* PART 3: WHY THIS PROJECT? (Connected Demand Hotspot) */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-7 shadow-soft space-y-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-teal-800 uppercase tracking-wider">
            <Megaphone className="w-3.5 h-3.5 text-teal-700" />
            <span>Demand Origin & Problem Classification</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Why this project matters
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
            This project is directly linked to a high-priority infrastructure demand identified through aggregated citizen reports.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-700 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
              <Users className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-bold text-teal-950">
                {matchedHotspot.reportCount?.toLocaleString() || '2,340'} citizen requests contributed to this infrastructure priority.
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {project.whyThisProjectMatters || `Prior to project procurement, residents co-reported chronic deficits in ${project.location}. These reports were synthesized into Demand Hotspot #${matchedHotspot.id}, driving municipal budget allocation.`}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 sm:border-l border-teal-200 pt-2 sm:pt-0 sm:pl-4">
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">Originating Hotspot</span>
            <span className="text-xs font-mono font-bold text-teal-900">{matchedHotspot.title}</span>
            <Link 
              to={`/decision-view/${matchedHotspot.id}`}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-800 hover:text-teal-950 mt-1"
            >
              <span>View in Decision Engine</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        <PriorityCard
          score={matchedHotspot.priorityScore || 91}
          maxScore={100}
          title="Commissioning Priority Scorecard"
          explanation="Multi-factor deterministic score reflecting severe physical deficit, high citizen co-reporting density, and strategic risk mitigation."
          factors={[
            { label: 'Citizen Demand Volume', score: 28, max: 30, note: 'High volume and density of verified resident submissions' },
            { label: 'Affected Population Impact', score: 19, max: 20, note: 'Direct hazard affecting 45,000+ residents & school routes' },
            { label: 'Infrastructure Gap Severity', score: 19, max: 20, note: '82% deficit in designed subterranean runoff capacity' },
            { label: 'Geographic Coverage Deficit', score: 10, max: 10, note: 'Severe lack of prior municipal capital investment' },
            { label: 'Policy & Investment Alignment', score: 10, max: 10, note: 'Approved under Provincial Flood Abatement Masterplan' },
            { label: 'Corroborating Evidence Strength', score: 5, max: 10, note: 'Verified ground photographic records & GPS telemetry' },
          ]}
        />
      </div>

      {/* ========================================================================= */}
      {/* RELATED CASES (Prompt #11 Section 4) */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-7 shadow-soft space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-teal-800 uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-teal-700" />
              <span>Independent Discrepancy Tracking</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              RELATED CASES ({relatedCases.length})
            </h2>
            <p className="text-xs text-slate-500 font-normal mt-0.5">
              Citizen discrepancy reports, engineering inquiries, and oversight investigations linked to this project.
            </p>
          </div>
        </div>

        {relatedCases.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <FileText className="w-7 h-7 text-slate-300 mx-auto" />
            <p className="text-xs font-medium text-slate-700">
              No cases have been reported for this project.
            </p>
            <p className="text-[11px] text-slate-400">
              Independent observations and potential discrepancy records will appear here after verification.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedCases.map((caseItem) => (
              <Card key={caseItem.id} hover padding="p-5" className="flex flex-col justify-between group space-y-3.5 border border-slate-200 shadow-soft">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold bg-slate-100 text-slate-900 border border-slate-300 px-2 py-0.5 rounded">
                        {caseItem.caseNumber || caseItem.id}
                      </span>
                      <Badge variant="neutral" size="sm">{caseItem.issueCategory || project.category}</Badge>
                    </div>
                    <StatusBadge status={caseItem.status} />
                  </div>

                  <Link 
                    to={`/case/${caseItem.id}`}
                    className="text-sm font-bold text-slate-900 group-hover:text-teal-800 transition-colors line-clamp-2 block"
                  >
                    {caseItem.title}
                  </Link>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 font-normal">
                    {caseItem.aiSummary}
                  </p>

                  <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-600">
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase">Evidence Logged</span>
                      <span className="font-bold text-slate-800">{caseItem.evidenceCount || (caseItem.evidence ? caseItem.evidence.length : 0)} items</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px] uppercase">Independent Observations</span>
                      <span className="font-bold text-teal-800">{caseItem.independentObservationsCount || 1} observations</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">
                    Created: {caseItem.createdDate || '2024-09-18'}
                  </span>
                  <Link
                    to={`/case/${caseItem.id}`}
                    className="inline-flex items-center gap-1 font-semibold text-teal-800 hover:text-teal-950 transition-colors"
                  >
                    <span>Open Case Detail</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* PART 10: PROJECT VS CITIZEN EVIDENCE (Accountability Comparison) */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-7 shadow-soft space-y-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-800 uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5 text-amber-700" />
            <span>Accountability Comparison</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Official Project Record vs. Ground Citizen Evidence
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
            Cross-referencing recorded contractor milestone claims against independent ground observations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Left: Project Record Claim */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                Official Project Record Claim
              </span>
              <span className="font-mono text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 text-[10px] font-bold">
                {project.completionPercentage}% Claimed
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {project.accountabilityComparison?.projectRecordClaim || 
               `Contractor milestone certification reports work active with ${project.completionPercentage}% of sanctioned billable civil works executed under supervision of ${project.department}.`}
            </p>
            <div className="text-[10px] text-slate-400 font-mono pt-1">
              Source: {project.sourceRecord}
            </div>
          </div>

          {/* Right: Citizen Evidence Observation */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-amber-700" />
                Independent Ground Evidence
              </span>
              <span className="font-mono text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[10px] font-bold">
                {publicVerifiedTimeline.length} Verified Submissions
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {project.accountabilityComparison?.citizenEvidenceClaim || 
               `Resident photographic observations document site condition status under Privacy Shield. Reports are corroborated by multiple community contributors.`}
            </p>
            <div className="text-[10px] text-slate-400 font-mono pt-1">
              Privacy Shield Active • Faces & License Plates Masked
            </div>
          </div>

        </div>

        {/* Mandatory Prominent Discrepancy Caveat (Part 10 & Rule #13) */}
        <div className={`p-4 rounded-xl border flex items-start gap-3 ${
          project.accountabilityComparison?.hasDiscrepancy 
            ? 'bg-amber-50/70 border-amber-200 text-amber-950'
            : 'bg-teal-50/60 border-teal-200 text-teal-950'
        }`}>
          <AlertTriangle className={`w-4 h-4 shrink-0 mt-0.5 ${
            project.accountabilityComparison?.hasDiscrepancy ? 'text-amber-700' : 'text-teal-700'
          }`} />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs">
                ANTICRO Status: {project.accountabilityComparison?.anticroStatus || 'Potential discrepancy for human review'}
              </span>
              <span className="text-[10px] font-mono uppercase bg-white/80 px-1.5 py-0.5 rounded border border-slate-200">
                Civic Neutrality Guardrail
              </span>
            </div>
            <p className="text-xs font-semibold leading-relaxed">
              “{project.accountabilityComparison?.neutralCaveat || 'This is a potential discrepancy for human review, not a finding of wrongdoing.'}”
            </p>
            <p className="text-[11px] text-slate-600 font-normal">
              ANTICRO highlights potential variations between contractor billing certifications and ground photographic evidence to support structured oversight by supervising government engineers.
            </p>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* PART 5: GOVERNMENT RESPONSE SECTION */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-7 shadow-soft space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-teal-800 uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5 text-teal-700" />
              <span>Institutional Tracking</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Government Response & Follow-up Actions
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              SIMULATED DEMO RESPONSE
            </span>
            <button
              onClick={() => setShowGovResponseModal(true)}
              className="text-xs font-medium text-teal-800 hover:text-teal-950 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Update Response
            </button>
          </div>
        </div>

        {project.governmentResponse ? (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">
                  {project.governmentResponse.department}
                </span>
                <span className="text-[11px] text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-mono">
                  {project.governmentResponse.responseDate}
                </span>
              </div>

              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                project.governmentResponse.status === 'Work Completed' ? 'bg-slate-100 text-slate-800 border-slate-200' :
                project.governmentResponse.status === 'Correction Requested' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                'bg-teal-50 text-teal-800 border-teal-200'
              }`}>
                Status: {project.governmentResponse.status}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block tracking-wider">Official Statement:</span>
              <p className="text-xs text-slate-700 leading-relaxed font-normal">
                "{project.governmentResponse.statement}"
              </p>
            </div>

            <div className="space-y-1 pt-1 border-t border-slate-200/60">
              <span className="text-[10px] uppercase font-semibold text-teal-800 block tracking-wider">Mandated Next Action:</span>
              <p className="text-xs text-slate-700 leading-relaxed font-normal">
                {project.governmentResponse.nextAction}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center py-6 text-xs text-slate-500">
            Awaiting formal department response under tracking record #{project.id.toUpperCase()}.
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* PART 12: RESOLUTION VIEW */}
      {/* ========================================================================= */}
      {(project.status === 'Resolved' || project.status === 'Under Verification' || project.resolution) && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-7 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>Accountability Resolution Stage</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Project Resolution Record
              </h2>
            </div>

            <span className={`text-xs font-bold px-2.5 py-1 rounded border font-mono ${
              project.status === 'Resolved' ? 'bg-emerald-50 text-emerald-900 border-emerald-200' :
              'bg-indigo-50 text-indigo-900 border-indigo-200'
            }`}>
              {project.status === 'Resolved' ? 'VERIFIED RESOLVED' : 'UNDER VERIFICATION'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">Outcome Summary</span>
              <p className="text-slate-800 font-normal leading-relaxed">
                {project.resolution?.outcome || 'Drainage rehabilitation completed in the priority corridor.'}
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">Verification Evidence</span>
              <p className="text-slate-800 font-normal leading-relaxed">
                {project.resolution?.verification || 'Post-completion physical engineering audit verified and signed off.'}
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">Remaining Issues</span>
              <p className="text-slate-800 font-normal leading-relaxed">
                {project.resolution?.remainingIssues || 'Routine monsoon cable tension inspection mandated annually.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PART 14: UNIFIED 10-STAGE ACCOUNTABILITY TIMELINE */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-7 shadow-soft space-y-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-teal-800 uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-teal-700" />
            <span>End-to-End Civic Journey</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Unified 10-Stage Accountability Timeline
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
            From grassroots citizen demand to certified capital resolution.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 pt-2">
          {[
            { step: '01', title: 'Citizen Report', active: true },
            { step: '02', title: 'AI Understand', active: true },
            { step: '03', title: 'Demand Hotspot', active: true },
            { step: '04', title: 'Priority Rec', active: true },
            { step: '05', title: 'Gov Review', active: true },
            { step: '06', title: 'Project Linked', active: true },
            { step: '07', title: 'Gov Response', active: Boolean(project.governmentResponse) },
            { step: '08', title: 'Project Progress', active: project.completionPercentage > 20 },
            { step: '09', title: 'Verification', active: project.completionPercentage >= 80 || project.status === 'Under Verification' || project.status === 'Resolved' },
            { step: '10', title: 'Resolution', active: project.status === 'Resolved' }
          ].map((item, idx) => (
            <div 
              key={idx}
              className={`p-2.5 rounded-lg border text-center space-y-1 ${
                item.active 
                  ? 'bg-teal-50 border-teal-200 text-teal-950 font-medium'
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
            >
              <span className={`w-4 h-4 mx-auto rounded-full flex items-center justify-center text-[9px] font-mono ${
                item.active ? 'bg-teal-700 text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                {item.active ? '✓' : item.step}
              </span>
              <div className="text-[11px] leading-tight font-medium">{item.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TABS: Evidence Timeline, Illustrative Timeline, Records */}
      {/* ========================================================================= */}
      <div className="flex border-b border-slate-200 gap-1 sm:gap-2">
        <button
          onClick={() => setActiveTab('evidence')}
          className={`pb-2.5 px-3.5 text-xs font-medium transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
            activeTab === 'evidence'
              ? 'border-teal-700 text-teal-900 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Supporting Evidence ({publicVerifiedTimeline.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('timeline')}
          className={`pb-2.5 px-3.5 text-xs font-medium transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
            activeTab === 'timeline'
              ? 'border-teal-700 text-teal-900 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Project Milestone History</span>
        </button>

        <button
          onClick={() => setActiveTab('records')}
          className={`pb-2.5 px-3.5 text-xs font-medium transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
            activeTab === 'records'
              ? 'border-teal-700 text-teal-900 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Procurement Specifications</span>
        </button>
      </div>

      {/* TAB 1: Evidence Timeline & Live AI Assistance */}
      {activeTab === 'evidence' && (
        <div className="space-y-5">
          
          {/* Timeline Filter Controls & Privacy Shield Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-soft">
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-3.5 h-3.5 text-slate-400 ml-1" />
              <span className="text-xs font-medium text-slate-700">Classification:</span>
              {['All', 'Fact', 'Observation', 'Allegation'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    categoryFilter === cat 
                      ? 'bg-teal-700 text-white' 
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded">
                <ShieldCheck className="w-3 h-3 text-teal-700" />
                PRIVACY SHIELD ACTIVE
              </span>
              <span className="text-slate-500">
                {filteredEvidence.length} of {publicVerifiedTimeline.length} verified entries
              </span>
            </div>
          </div>

          {/* Empty State */}
          {publicVerifiedTimeline.length === 0 && (
            <div className="text-center py-14 bg-white rounded-xl border border-dashed border-slate-200 p-8 space-y-3">
              <div className="w-10 h-10 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center mx-auto text-teal-700">
                <Camera className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-slate-900">
                “No evidence submitted yet — be the first to contribute.”
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Have you observed this public work site in person? Submit photographic observations under the ANTICRO Privacy Shield.
              </p>
              <button
                onClick={() => onOpenUpload(project.id)}
                className="inline-flex items-center gap-1.5 bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs px-4 py-2 rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                <span>Submit First Evidence</span>
              </button>
            </div>
          )}

          {/* Evidence Cards */}
          <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-px before:bg-slate-200">
            {filteredEvidence.map((item, idx) => {
              const aiAnalysis = aiEvidenceResults[item.id] || item.aiAnalysis;
              const isDiscrepancy = aiAnalysis?.potentialDiscrepancy;
              
              const categoryBadge = 
                item.category === 'Fact' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                item.category === 'Observation' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                'bg-rose-50 text-rose-800 border-rose-200';

              const timelineDotColor = 
                item.category === 'Fact' ? 'bg-blue-700 ring-blue-100' :
                item.category === 'Observation' ? 'bg-amber-700 ring-amber-100' :
                'bg-rose-700 ring-rose-100';

              return (
                <div key={item.id} className="relative group">
                  
                  {/* Timeline Rail Indicator */}
                  <div className={`absolute -left-6 sm:-left-8 top-4 w-5 h-5 rounded-full border border-white shadow-2xs ring-2 ${timelineDotColor} flex items-center justify-center text-[9px] text-white font-mono font-medium`}>
                    {idx + 1}
                  </div>

                  {/* Main Evidence Card */}
                  <div className="bg-white rounded-xl border border-slate-200 shadow-soft overflow-hidden">
                    
                    {/* Header Strip */}
                    <div className="p-4 bg-slate-50/70 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded border ${categoryBadge}`}>
                          {item.category}
                        </span>

                        <span className="text-[10px] font-mono bg-white text-slate-700 border border-slate-200 px-2 py-0.5 rounded">
                          Type: {item.evidenceType || (item.imageUrl ? 'Photo' : 'Citizen Observation')}
                        </span>

                        <span className="flex items-center gap-1 text-xs font-mono text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded">
                          <User className="w-3 h-3 text-slate-400" />
                          <span>{item.submittedBy}</span>
                        </span>

                        <span className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {item.date}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                          PRIVACY SHIELD ACTIVE
                        </span>

                        <button
                          onClick={() => handleRunAiEvidenceAnalysis(item)}
                          disabled={analyzingEvidenceId === item.id}
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-teal-800 hover:text-teal-950 bg-white hover:bg-slate-50 border border-teal-200 px-2.5 py-1 rounded transition-colors cursor-pointer"
                        >
                          {analyzingEvidenceId === item.id ? (
                            <>
                              <Loader2 className="w-3 h-3 text-teal-700 animate-spin" />
                              <span>Analyzing...</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3 h-3 text-teal-700" />
                              <span>AI Evidence Assistance</span>
                            </>
                          )}
                        </button>
                      </div>

                    </div>

                    {/* Evidence Body */}
                    <div className="p-5 space-y-4">
                      
                      <div>
                        <h3 className="text-base font-semibold text-slate-900 leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed font-normal">
                          {item.description}
                        </p>
                      </div>

                      {/* Protected Image Section */}
                      {item.imageUrl && (
                        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1.5">
                              <ShieldCheck className="w-4 h-4 text-teal-700" />
                              <span className="font-medium text-slate-800">Privacy Shield Protected Evidence Asset</span>
                            </div>
                            <span className="text-[10px] font-mono text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                              Public Safe Preview
                            </span>
                          </div>

                          <div className="relative rounded-lg overflow-hidden bg-slate-100 max-h-72 border border-slate-200">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-full h-full object-cover max-h-72"
                            />
                            <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-slate-700 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1 shadow-2xs">
                              <Lock className="w-3 h-3 text-teal-700" />
                              <span>Original Vaulted • PII Redacted</span>
                            </div>
                          </div>

                          {item.detectedPrivacyItems && (
                            <div className="pt-0.5 flex flex-wrap items-center gap-1.5 text-xs">
                              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Sanitization:</span>
                              {item.detectedPrivacyItems.map((redaction, rIdx) => (
                                <span 
                                  key={rIdx}
                                  className="inline-flex items-center gap-1 text-[10px] font-mono bg-white text-slate-700 px-2 py-0.5 rounded border border-slate-200"
                                >
                                  <CheckCircle className="w-2.5 h-2.5 text-teal-700" />
                                  <span>{redaction}</span>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* AI Evidence Assistance Box */}
                      {aiAnalysis && (
                        <div className="space-y-2.5 pt-1">
                          
                          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-teal-800" />
                                <span className="font-semibold text-xs text-slate-900">AI Evidence Cross-Reference</span>
                              </div>
                              
                              <span className="text-[10px] font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded">
                                Relevance: {aiAnalysis.projectRelevance || 'High'}
                              </span>
                            </div>

                            <p className="text-xs text-slate-600 leading-relaxed font-normal">
                              {aiAnalysis.interpretedDescription || aiAnalysis.summary} {aiAnalysis.discrepancyNote}
                            </p>

                            {aiAnalysis.consistencyCheck && (
                              <div className="text-[11px] text-slate-500 font-mono pt-1">
                                Consistency: {aiAnalysis.consistencyCheck}
                              </div>
                            )}
                          </div>

                          {/* Mandatory Caveat (Rule #13) */}
                          <div className={`p-3 rounded-lg border flex items-start gap-2.5 ${
                            isDiscrepancy 
                              ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                              : 'bg-slate-50 border-slate-200 text-slate-800'
                          }`}>
                            <Info className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isDiscrepancy ? 'text-amber-700' : 'text-slate-500'
                            }`} />

                            <div className="space-y-0.5">
                              <p className="text-xs font-semibold leading-snug">
                                “{aiAnalysis.neutralCaveat || (isDiscrepancy 
                                  ? 'This is a potential discrepancy for human review, not a finding of wrongdoing.'
                                  : 'No conflicting evidence identified. This does not confirm the project is fully complete or accurate.')}”
                              </p>
                              <p className="text-[10px] text-slate-500 font-normal">
                                Automated discrepancy checks require human review by verified civil engineers and supervising agencies.
                              </p>
                            </div>
                          </div>

                        </div>
                      )}

                      {/* Certified Engineer Assessment & Gov Response Footers */}
                      <div className="pt-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-xs text-slate-800 flex items-center gap-1.5">
                              <Compass className="w-3.5 h-3.5 text-amber-700" />
                              Certified Engineer Review
                            </span>
                            {item.engineerAssessment ? (
                              <span className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                                {item.engineerAssessment.status}
                              </span>
                            ) : (
                              <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                                Pending
                              </span>
                            )}
                          </div>
                          
                          {item.engineerAssessment ? (
                            <div className="text-xs space-y-0.5">
                              <span className="text-[10px] font-mono text-slate-500 block">
                                Assessor: {item.engineerAssessment.engineerId}
                              </span>
                              <p className="text-slate-700 leading-relaxed font-normal">
                                {item.engineerAssessment.comments}
                              </p>
                            </div>
                          ) : (
                            <p className="text-[11px] text-slate-400 italic">
                              Awaiting certified engineer review under Rule #15.
                            </p>
                          )}
                        </div>

                        <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-xs text-slate-800 flex items-center gap-1.5">
                              <Building2 className="w-3.5 h-3.5 text-teal-700" />
                              Government Response Status
                            </span>
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded border bg-teal-50 text-teal-800 border-teal-200">
                              {item.govResponse ? item.govResponse.status : 'Awaiting Response'}
                            </span>
                          </div>

                          {item.govResponse?.statement ? (
                            <div className="text-xs space-y-0.5">
                              <span className="text-[10px] text-slate-500 block">
                                {item.govResponse.department} • {item.govResponse.responseDate}
                              </span>
                              <p className="text-slate-700 leading-relaxed font-normal">
                                {item.govResponse.statement}
                              </p>
                            </div>
                          ) : (
                            <p className="text-[11px] text-slate-500 italic">
                              Status: <strong>Awaiting Response</strong> (Inquiry registered under tracking record).
                            </p>
                          )}
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* TAB 2: Illustrative Project Timeline (Part 4) */}
      {activeTab === 'timeline' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 space-y-5 shadow-soft">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-bold text-base text-slate-900">Project Milestone Timeline</h3>
              <p className="text-xs text-slate-500">Chronological history from community demand signal to current execution milestone.</p>
            </div>
            <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
              Illustrative project timeline — demo data
            </span>
          </div>

          <div className="relative pl-6 sm:pl-8 space-y-5 before:content-[''] before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-px before:bg-slate-200">
            {(project.projectTimeline || [
              { date: 'JAN 2026', title: 'Citizen demand pattern identified', detail: 'Grassroots requests aggregated by ANTICRO AI into community hotspot.' },
              { date: 'FEB 2026', title: 'Hotspot reached high priority', detail: 'Priority recommendation generated for municipal works allocation.' },
              { date: 'MAR 2026', title: 'Government review started', detail: 'Supervising agency initiated field feasibility study.' },
              { date: 'APR 2026', title: 'Project proposed', detail: 'Capital engineering tender drafted and published on registry.' },
              { date: 'MAY 2026', title: 'Project approved', detail: 'Administrative financial sanction issued.' },
              { date: 'JUN 2026', title: 'Construction started', detail: 'Civil contractor commenced physical foundation excavation.' },
              { date: 'AUG 2026', title: `${project.completionPercentage}% complete`, detail: 'Current execution milestone reported under active supervision.' }
            ]).map((tItem, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-6 sm:-left-8 top-1 w-4 h-4 rounded-full border border-white ring-2 ring-teal-700 bg-white flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-700" />
                </div>
                <div className="p-3.5 bg-slate-50/80 rounded-lg border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{tItem.title}</span>
                    <span className="text-[10px] font-mono font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {tItem.date}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed">{tItem.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Procurement Specifications */}
      {activeTab === 'records' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 space-y-5 shadow-soft">
          <div className="space-y-0.5">
            <h3 className="font-bold text-base text-slate-900">Official Tender & Public Record Specifications</h3>
            <p className="text-xs text-slate-500">
              Indexed from official public procurement register: <span className="font-mono font-medium text-slate-700">{project.sourceRecord}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
            <div className="p-4 bg-slate-50/70 rounded-lg space-y-2 border border-slate-200/80">
              <span className="font-semibold text-slate-900 block text-xs uppercase tracking-wider">Contractor & Agency Details</span>
              <div className="space-y-1.5 text-slate-700 font-normal">
                <p><strong>Primary Contractor:</strong> {project.contractor}</p>
                <p><strong>Supervising Agency:</strong> {project.department}</p>
                <p><strong>Registry Code:</strong> {project.id.toUpperCase()}-CIVIL-2026</p>
                <p><strong>Record Status:</strong> <span className="font-medium text-teal-800">{project.badgeType}</span></p>
              </div>
            </div>

            <div className="p-4 bg-slate-50/70 rounded-lg space-y-2 border border-slate-200/80">
              <span className="font-semibold text-slate-900 block text-xs uppercase tracking-wider">Milestone & Procurement Timeline</span>
              <div className="space-y-1.5 text-slate-700 font-normal">
                <p><strong>Commencement Date:</strong> {project.startDate}</p>
                <p><strong>Target Completion:</strong> {project.expectedCompletionDate}</p>
                <p><strong>Sanctioned Budget:</strong> {project.budget}</p>
                <p><strong>Disclosed Spend:</strong> {project.expenditure}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: Government Response Simulator */}
      {/* ========================================================================= */}
      {showGovResponseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 space-y-5 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <h3 className="font-bold text-base text-slate-900">Record Government Response</h3>
                <p className="text-xs text-slate-500">Official institutional follow-up for #{project.id.toUpperCase()}</p>
              </div>
              <button 
                onClick={() => setShowGovResponseModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg leading-none cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleGovResponseSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Response Status</label>
                <select
                  value={govResponseForm.status}
                  onChange={(e) => setGovResponseForm(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-700/20"
                >
                  {GOV_RESPONSE_STATUSES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Responding Department</label>
                <input
                  type="text"
                  value={govResponseForm.department}
                  onChange={(e) => setGovResponseForm(prev => ({ ...prev, department: e.target.value }))}
                  placeholder="e.g. Pune Municipal Corporation & Maharashtra PWD"
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-700/20"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Official Statement</label>
                <textarea
                  rows={3}
                  value={govResponseForm.statement}
                  onChange={(e) => setGovResponseForm(prev => ({ ...prev, statement: e.target.value }))}
                  placeholder="Official departmental statement regarding progress, verification, or site correction..."
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-700/20"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Next Action Mandate</label>
                <input
                  type="text"
                  value={govResponseForm.nextAction}
                  onChange={(e) => setGovResponseForm(prev => ({ ...prev, nextAction: e.target.value }))}
                  placeholder="e.g. Conduct pre-monsoon load inspection by certified engineer."
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-700/20"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowGovResponseModal(false)}
                  className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-teal-700 hover:bg-teal-800 text-white rounded-lg transition-colors cursor-pointer"
                >
                  Save Government Response
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}