import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Layers, 
  ArrowRight, 
  Building2, 
  MapPin, 
  Camera, 
  ShieldCheck, 
  Loader2,
  Megaphone,
  Compass,
  Filter,
  Sparkles,
  Users,
  AlertCircle,
  CheckCircle,
  CheckCircle2,
  Database,
  Activity,
  Award,
  FileText
} from 'lucide-react';
import { 
  Button, 
  Card, 
  Badge, 
  StatusBadge, 
  SectionHeader, 
  ProjectCard, 
  DemandCard, 
  PriorityCard, 
  EmptyState 
} from '../components/common';
import { 
  DEMAND_CATEGORY_STATS, 
  REGIONAL_HOTSPOTS_BY_TIER, 
  PRIORITY_RECOMMENDATIONS,
  DEMAND_HOTSPOTS,
  DATA_PROVENANCE
} from '../data/mockDemandIntelligence';
import IndiaInfrastructureOverview from '../components/IndiaInfrastructureOverview';
import LandingPage from './LandingPage';
import DemandIntelligencePage from './DemandIntelligencePage';
import DecisionViewPage from './DecisionViewPage';

export default function DashboardPage({ 
  projects = [], 
  demands = [],
  hotspots = [],
  onOpenUpload = () => {}, 
  onOpenReportNeed = () => {},
  onOpenDataMethod = () => {},
  onUpdateHotspot = () => {},
  onUpdateProject = () => {},
  isLiveSupabase = false, 
  isLoading = false,
  currentRole = 'citizen',
  initialTab = null
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawUrlTab = searchParams.get('tab') || initialTab;
  const urlTab = rawUrlTab ? rawUrlTab.toLowerCase().trim() : null;
  
  // Deterministic top-level views mapped directly to dashboard tab parameters
  if (urlTab === 'overview') {
    return (
      <LandingPage 
        projects={projects} 
        demands={demands} 
        hotspots={hotspots} 
        onOpenUpload={onOpenUpload} 
        onOpenReportNeed={onOpenReportNeed} 
        onOpenDataMethod={onOpenDataMethod} 
      />
    );
  }
  if (urlTab === 'intelligence') {
    return (
      <DemandIntelligencePage 
        hotspots={hotspots} 
        onOpenReportNeed={onOpenReportNeed} 
      />
    );
  }
  if (urlTab === 'decision') {
    return (
      <DecisionViewPage 
        hotspots={hotspots} 
        projects={projects} 
        onUpdateHotspot={onUpdateHotspot} 
      />
    );
  }

  // Active Tab state: 'infrastructure' | 'projects' | 'evidence' | 'data'
  const validTabs = ['infrastructure', 'projects', 'evidence', 'data'];
  const resolvedTab = validTabs.includes(urlTab) ? urlTab : 'infrastructure';

  const [activeTab, setActiveTab] = useState(resolvedTab);

  useEffect(() => {
    if (validTabs.includes(urlTab)) {
      setActiveTab(urlTab);
    } else if (!urlTab) {
      setActiveTab('infrastructure');
    }
  }, [urlTab]);

  const handleTabSwitch = (tabKey) => {
    setActiveTab(tabKey);
    setSearchParams({ tab: tabKey });
  };

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedEvidenceCategory, setSelectedEvidenceCategory] = useState('All');

  // Filtered Demands
  const filteredDemands = (demands || []).filter((demand) => {
    if (!demand) return false;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      !q ||
      (demand.title && demand.title.toLowerCase().includes(q)) ||
      (demand.location && demand.location.toLowerCase().includes(q)) ||
      (demand.category && demand.category.toLowerCase().includes(q));

    const matchesCategory = 
      selectedCategory === 'All' || 
      (demand.category && demand.category.toLowerCase().includes(selectedCategory.toLowerCase()));

    return matchesSearch && matchesCategory;
  });

  // Filtered Projects with Project Type & Status & ID Search
  const filteredProjects = (projects || []).filter((project) => {
    if (!project) return false;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      !q ||
      (project.id && project.id.toLowerCase().includes(q)) ||
      (project.name && project.name.toLowerCase().includes(q)) ||
      (project.department && project.department.toLowerCase().includes(q)) ||
      (project.location && project.location.toLowerCase().includes(q)) ||
      (project.category && project.category.toLowerCase().includes(q));

    const matchesType = selectedCategory === 'All' || (() => {
      const cat = (project.category || '').toLowerCase();
      const sel = selectedCategory.toLowerCase();
      if (sel === 'bridge') return cat.includes('bridge') || cat.includes('viaduct') || cat.includes('skywalk') || cat.includes('overpass');
      if (sel === 'road') return cat.includes('road') || cat.includes('highway') || cat.includes('transit');
      if (sel === 'school') return cat.includes('school') || cat.includes('education');
      if (sel === 'hospital') return cat.includes('hospital') || cat.includes('health') || cat.includes('clinic');
      if (sel === 'drainage') return cat.includes('drainage') || cat.includes('flood') || cat.includes('canal') || cat.includes('storm');
      if (sel === 'water') return cat.includes('water') || cat.includes('sanitation') || cat.includes('pipeline');
      return cat.includes(sel);
    })();

    const matchesStatus = selectedStatus === 'All' || (() => {
      const st = (project.status || '').toLowerCase();
      const sel = selectedStatus.toLowerCase();
      if (sel === 'in progress') {
        return st.includes('progress') || st.includes('ongoing') || st.includes('underway') || st.includes('assessment') || st.includes('proposed') || st.includes('approved') || st.includes('allocated');
      }
      if (sel === 'delayed') {
        return st.includes('delayed') || st.includes('correction') || st.includes('review');
      }
      if (sel === 'completed') {
        return st.includes('completed') || st.includes('resolved') || st.includes('verification');
      }
      return st === sel;
    })();

    return matchesSearch && matchesType && matchesStatus;
  });

  // Aggregate all evidence records from projects and demand hotspots
  const allEvidence = useMemo(() => {
    const list = [];
    (projects || []).forEach(p => {
      (p.evidenceTimeline || []).forEach(ev => {
        list.push({
          ...ev,
          projectId: p.id,
          projectName: p.name,
          location: ev.location || p.location,
          sourceType: 'Project Record'
        });
      });
    });
    (hotspots || []).forEach(h => {
      (h.communityEvidence || []).forEach(ev => {
        list.push({
          ...ev,
          hotspotId: h.id,
          hotspotName: h.name || h.title,
          location: ev.location || h.location,
          sourceType: 'Demand Hotspot'
        });
      });
    });
    return list;
  }, [projects, hotspots]);

  // Filtered Evidence
  const filteredEvidence = useMemo(() => {
    return allEvidence.filter(ev => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        (ev.title && ev.title.toLowerCase().includes(q)) ||
        (ev.location && ev.location.toLowerCase().includes(q)) ||
        (ev.projectName && ev.projectName.toLowerCase().includes(q)) ||
        (ev.hotspotName && ev.hotspotName.toLowerCase().includes(q)) ||
        (ev.summary && ev.summary.toLowerCase().includes(q));

      const matchesCat = 
        selectedEvidenceCategory === 'All' ||
        (ev.category && ev.category.toLowerCase().includes(selectedEvidenceCategory.toLowerCase()));

      return matchesSearch && matchesCat;
    });
  }, [allEvidence, searchQuery, selectedEvidenceCategory]);

  // Project Type & Status Filter Options (Prompt #11 Section 2)
  const categoriesList = [
    'All',
    'Bridge',
    'Road',
    'School',
    'Hospital',
    'Drainage',
    'Water'
  ];

  const projectStatuses = [
    'All',
    'In Progress',
    'Delayed',
    'Completed'
  ];

  // Resilient helper accessors for hotspot cards in Section 4
  const getSpotRegion = (spot) => spot?.region || spot?.name || spot?.locality || (spot?.district ? `${spot.district}, ${spot.state || ''}` : '') || spot?.state || 'Regional Corridor';
  const getSpotNeed = (spot) => spot?.primaryNeed || spot?.primaryCategory || spot?.category || spot?.standardizedProblem || 'Civil Works';
  const getSpotDeficit = (spot) => spot?.coverageDeficit || spot?.infrastructureGap || spot?.whySummary || 'Identified infrastructure deficit';
  const getSpotRequests = (spot) => Number(spot?.requestCount || spot?.relatedRequests || 1).toLocaleString();
  const getSpotPopulation = (spot) => typeof spot?.affectedPopulation === 'number' ? `${spot.affectedPopulation.toLocaleString()} residents` : (spot?.affectedPopulation || spot?.affectedPopulationDisplay || 'Thousands affected');

  const highDemandHotspots = REGIONAL_HOTSPOTS_BY_TIER?.highDemand || [];
  const mediumDemandHotspots = REGIONAL_HOTSPOTS_BY_TIER?.mediumDemand || [];
  const lowDemandHotspots = REGIONAL_HOTSPOTS_BY_TIER?.lowDemand || [];

  return (
    <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-[5vw] py-7 sm:py-9 space-y-8 pb-20">
      
      {/* 1. Welcome / Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-semibold tracking-wider text-teal-800 uppercase bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              Civic Infrastructure Platform
            </span>
            <span className="text-[10px] font-mono text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-bold">
              SIMULATED DEMO DATA
            </span>
            <span className="text-[10px] font-mono text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
              BRICS Track 1
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Civic Infrastructure Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
            Synthesizing citizen infrastructure demands, identifying geographic gap hotspots, and tracking public capital projects with photographic evidence.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <Button 
            variant="primary" 
            size="md" 
            icon={Megaphone} 
            onClick={onOpenReportNeed}
          >
            Report Need
          </Button>

          <Button 
            variant="secondary" 
            size="md" 
            icon={Camera} 
            onClick={() => onOpenUpload(null)}
          >
            Submit Evidence
          </Button>
        </div>
      </div>

      {/* 2. Macro Accountability Summary KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <Card padding="p-3.5" className="space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500">
              States
            </span>
            <Compass className="w-3.5 h-3.5 text-indigo-700" />
          </div>
          <div className="text-xl font-bold font-mono text-indigo-900">10</div>
          <div className="text-[10px] text-slate-500">Represented</div>
        </Card>

        <Card padding="p-3.5" className="space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500">
              Citizen Requests
            </span>
            <Megaphone className="w-3.5 h-3.5 text-teal-700" />
          </div>
          <div className="text-xl font-bold font-mono text-slate-900">27,170</div>
          <div className="text-[10px] text-slate-500">Submissions</div>
        </Card>

        <Card padding="p-3.5" className="space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500">
              Active Hotspots
            </span>
            <MapPin className="w-3.5 h-3.5 text-amber-700" />
          </div>
          <div className="text-xl font-bold font-mono text-amber-900">
            {hotspots && hotspots.length > 0 ? hotspots.length : 231}
          </div>
          <div className="text-[10px] text-slate-500">Demand clusters</div>
        </Card>

        <Card padding="p-3.5" className="space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500">
              Critical Priorities
            </span>
            <Sparkles className="w-3.5 h-3.5 text-rose-700" />
          </div>
          <div className="text-xl font-bold font-mono text-rose-900">47</div>
          <div className="text-[10px] text-slate-500">Score ≥ 80 / 100</div>
        </Card>

        <Card padding="p-3.5" className="space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500">
              Projects Linked
            </span>
            <Layers className="w-3.5 h-3.5 text-teal-700" />
          </div>
          <div className="text-xl font-bold font-mono text-teal-900">
            {projects && projects.length > 0 ? projects.length : 28}
          </div>
          <div className="text-[10px] text-slate-500">Tied to capital works</div>
        </Card>

        <Card padding="p-3.5" className="space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500">
              In Progress
            </span>
            <Building2 className="w-3.5 h-3.5 text-indigo-700" />
          </div>
          <div className="text-xl font-bold font-mono text-indigo-900">19</div>
          <div className="text-[10px] text-slate-500">Active site execution</div>
        </Card>

        <Card padding="p-3.5" className="space-y-1 col-span-2 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500">
              Evidence Logged
            </span>
            <Camera className="w-3.5 h-3.5 text-emerald-700" />
          </div>
          <div className="text-xl font-bold font-mono text-emerald-900">
            {allEvidence.length > 0 ? allEvidence.length : 427}
          </div>
          <div className="text-[10px] text-slate-500">Shield protected</div>
        </Card>
      </div>

      {/* 3. Global Search & Filter Bar */}
      <Card padding="p-3 sm:p-4" className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Search Input */}
          <div className="relative sm:col-span-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search projects by name, location, department, or project ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200/90 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:bg-white transition-all"
            />
          </div>

          {/* Project Type Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs py-2 px-3 bg-slate-50 border border-slate-200/90 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:bg-white cursor-pointer transition-all"
            >
              {categoriesList.map((cat) => (
                <option key={cat} value={cat}>Project Type: {cat}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full text-xs py-2 px-3 bg-slate-50 border border-slate-200/90 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:bg-white cursor-pointer transition-all"
            >
              {projectStatuses.map((st) => (
                <option key={st} value={st}>Status: {st}</option>
              ))}
            </select>
          </div>

        </div>
      </Card>

      {/* 4. Section Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => handleTabSwitch('infrastructure')}
          className={`pb-2.5 px-3.5 text-xs font-medium transition-colors cursor-pointer border-b-2 flex items-center gap-2 shrink-0 ${
            activeTab === 'infrastructure'
              ? 'border-teal-700 text-teal-900 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-teal-700" />
          <span>Infrastructure Demand & Hotspots</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabSwitch('projects')}
          className={`pb-2.5 px-3.5 text-xs font-medium transition-colors cursor-pointer border-b-2 flex items-center gap-2 shrink-0 ${
            activeTab === 'projects'
              ? 'border-teal-700 text-teal-900 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-slate-500" />
          <span>Monitored Public Projects ({(projects || []).length})</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabSwitch('evidence')}
          className={`pb-2.5 px-3.5 text-xs font-medium transition-colors cursor-pointer border-b-2 flex items-center gap-2 shrink-0 ${
            activeTab === 'evidence'
              ? 'border-teal-700 text-teal-900 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Camera className="w-3.5 h-3.5 text-teal-700" />
          <span>Evidence Telemetry & Privacy Shield ({allEvidence.length})</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabSwitch('data')}
          className={`pb-2.5 px-3.5 text-xs font-medium transition-colors cursor-pointer border-b-2 flex items-center gap-2 shrink-0 ${
            activeTab === 'data'
              ? 'border-teal-700 text-teal-900 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Database className="w-3.5 h-3.5 text-slate-500" />
          <span>Data & Method Provenance</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: INFRASTRUCTURE DEMAND & HOTSPOTS */}
      {/* ========================================================================= */}
      {activeTab === 'infrastructure' && (
        <div className="space-y-10">
          
          {/* India Infrastructure Demand Overview (Parts 13, 14, 15) */}
          <IndiaInfrastructureOverview hotspots={hotspots} projects={projects} />

          {/* Section 3: Community Development Demand */}
          <div className="space-y-4">
            <SectionHeader
              eyebrow="Section 3 • Citizen Voice Aggregation"
              title="Community Development Demand"
              description="Real-time aggregation of citizen-reported infrastructure deficits across core municipal domains."
              action={<StatusBadge status="Simulated Data" />}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
              {DEMAND_CATEGORY_STATS.map((cat) => {
                const isSelected = selectedCategory === cat.category;
                const reqCount = cat.requestCount || 0;
                const spotCount = cat.hotspotCount || 0;
                const catName = cat.name || cat.category;
                const reqDisplay = cat.requestsDisplay || `${reqCount.toLocaleString()} requests`;
                const spotDisplay = cat.hotspotsDisplay || `${spotCount} hotspots`;

                return (
                  <Card
                    key={cat.category}
                    padding="p-4"
                    hover
                    onClick={() => setSelectedCategory(isSelected ? 'All' : cat.category)}
                    className={`space-y-3 cursor-pointer transition-all ${
                      isSelected ? 'ring-2 ring-teal-700 border-transparent bg-teal-50/20' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant="neutral" size="sm">{cat.category}</Badge>
                      <StatusBadge status={cat.priority || cat.priorityTier || 'High'} />
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{catName}</h4>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-xl font-bold font-mono text-slate-900">
                          {reqDisplay}
                        </span>
                        <span className="text-xs text-slate-500">
                          in {spotDisplay}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="truncate">Top: {cat.leadHotspot || cat.category}</span>
                      <span className="text-teal-800 font-medium font-mono shrink-0">
                        {cat.recentTrend}
                      </span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Section 4: Demand Hotspot Preview */}
          <div className="space-y-4">
            <SectionHeader
              eyebrow="Section 4 • Spatial Distribution"
              title="Demand Hotspots Preview"
              description="Polished region-based concentration panel highlighting high, medium, and low urgency demand zones."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* High Demand Column */}
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-600" />
                    High Demand Zones
                  </span>
                  <Badge variant="red" size="sm">Acute Priority</Badge>
                </div>

                {highDemandHotspots.map((spot) => (
                  <Card key={spot.id} padding="p-4" className="space-y-2 border-l-4 border-l-rose-500">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{getSpotRegion(spot)}</span>
                      <span className="font-mono font-bold text-rose-800">{spot.priorityScore || 85}/100</span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">{getSpotNeed(spot)}</p>
                    <p className="text-[11px] text-slate-500">{getSpotDeficit(spot)}</p>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>{getSpotRequests(spot)} requests • {spot.hotspotCount || 1} hotspots</span>
                      <span className="text-slate-700 font-semibold">{getSpotPopulation(spot)}</span>
                    </div>
                    {spot.linkedProjectId && (
                      <div className="pt-1">
                        <Link 
                          to={`/project/${spot.linkedProjectId}`}
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-teal-800 hover:text-teal-900"
                        >
                          <span>Linked to Tracked Project ({String(spot.linkedProjectId).toUpperCase()})</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    )}
                  </Card>
                ))}
              </div>

              {/* Medium Demand Column */}
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Medium Demand Zones
                  </span>
                  <Badge variant="amber" size="sm">Elevated</Badge>
                </div>

                {mediumDemandHotspots.map((spot) => (
                  <Card key={spot.id} padding="p-4" className="space-y-2 border-l-4 border-l-amber-500">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{getSpotRegion(spot)}</span>
                      <span className="font-mono font-bold text-amber-800">{spot.priorityScore || 75}/100</span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">{getSpotNeed(spot)}</p>
                    <p className="text-[11px] text-slate-500">{getSpotDeficit(spot)}</p>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>{getSpotRequests(spot)} requests • {spot.hotspotCount || 1} hotspots</span>
                      <span className="text-slate-700 font-semibold">{getSpotPopulation(spot)}</span>
                    </div>
                    <div className="pt-1 text-[10px] text-slate-400">
                      Status: {spot.status || spot.governmentStatus || 'Under Review'}
                    </div>
                  </Card>
                ))}
              </div>

              {/* Low Demand Column */}
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                    Low Demand Zones
                  </span>
                  <Badge variant="neutral" size="sm">Baseline</Badge>
                </div>

                {lowDemandHotspots.map((spot) => (
                  <Card key={spot.id} padding="p-4" className="space-y-2 border-l-4 border-l-slate-300">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{getSpotRegion(spot)}</span>
                      <span className="font-mono font-bold text-slate-700">{spot.priorityScore || 35}/100</span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">{getSpotNeed(spot)}</p>
                    <p className="text-[11px] text-slate-500">{getSpotDeficit(spot)}</p>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>{getSpotRequests(spot)} requests • {spot.hotspotCount || 1} hotspots</span>
                      <span className="text-slate-700 font-semibold">{getSpotPopulation(spot)}</span>
                    </div>
                    <div className="pt-1 text-[10px] text-slate-400">
                      Status: {spot.status || spot.governmentStatus || 'Baseline'}
                    </div>
                  </Card>
                ))}
              </div>

            </div>
          </div>

          {/* Section: Priority Engine & Recommended High-Priority Areas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Priority Engine Scorecard (91/100) */}
            <div className="lg:col-span-1">
              <PriorityCard
                score={91}
                maxScore={100}
                title="Lead Infrastructure Priority"
                explanation="Riverside Sector 4-B Drainage deficit scored 91/100 across 6 transparent criteria. Now commissioned as monitored public project #PR-01."
              />
            </div>

            {/* Recommended High-Priority Areas Cards */}
            <div className="lg:col-span-2 space-y-3">
              <SectionHeader
                eyebrow="Decision Support"
                title="Recommended Development Priorities"
                description="Government capital allocation recommendations derived from citizen co-reporting."
              />

              <div className="space-y-3">
                {PRIORITY_RECOMMENDATIONS.map((rec) => {
                  const popDisplay = typeof rec.affectedPopulation === 'number' 
                    ? `${rec.affectedPopulation.toLocaleString()} residents` 
                    : (rec.affectedPopulation || 'Thousands affected');

                  return (
                    <Card key={rec.id} padding="p-4 sm:p-5" className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="neutral" size="sm">{rec.category || 'Civil Works'}</Badge>
                          <StatusBadge status={rec.priorityLevel || 'High'} />
                          <span className="text-xs font-mono font-bold text-teal-900 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                            Score: {rec.priorityScore || 85}/100
                          </span>
                        </div>
                        <StatusBadge status={rec.status || 'Needs Review'} />
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{rec.title}</h4>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {rec.explanation}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 font-mono text-slate-700">
                            <Users className="w-3.5 h-3.5 text-slate-400" />
                            {popDisplay}
                          </span>
                          <span className="font-mono text-slate-700">
                            Est. Budget: {rec.estimatedBudget || '₹10.5 Cr'}
                          </span>
                        </div>

                        {rec.linkedProjectId ? (
                          <Link
                            to={`/project/${rec.linkedProjectId}`}
                            className="inline-flex items-center gap-1 font-semibold text-teal-800 hover:text-teal-900"
                          >
                            <span>Inspect Project Evidence</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        ) : (
                          <span className="text-[11px] text-slate-400 font-mono">
                            {rec.statusBadge || 'Under Assessment'}
                          </span>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Section: Recent Development Requests Feed */}
          <div className="space-y-4">
            <SectionHeader
              eyebrow="Community Submissions"
              title="Recent Development Requests"
              description="Latest citizen-submitted infrastructure needs verified under Privacy Shield."
              action={
                <Button 
                  variant="outline" 
                  size="sm" 
                  icon={Megaphone} 
                  onClick={onOpenReportNeed}
                >
                  Report a Need
                </Button>
              }
            />

            {filteredDemands.length === 0 ? (
              <EmptyState
                title="No development requests match your search"
                description="Try clearing your category filter or search query."
                actionLabel="Reset Filters"
                onAction={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDemands.map((demand) => (
                  <DemandCard key={demand.id} demand={demand} />
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: MONITORED PUBLIC PROJECTS */}
      {/* ========================================================================= */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <SectionHeader
            eyebrow="Section 5 • Project Oversight"
            title="Monitored Public Projects"
            description="Public infrastructure projects actively monitored with citizen photographic evidence, Privacy Shield protection, and certified civil engineer assessments."
            action={
              <Button 
                variant="secondary" 
                size="sm" 
                icon={Camera} 
                onClick={() => onOpenUpload(null)}
              >
                Submit Evidence
              </Button>
            }
          />

          {isLoading ? (
            <div className="py-16 text-center space-y-2">
              <Loader2 className="w-6 h-6 text-teal-700 animate-spin mx-auto" />
              <p className="text-xs text-slate-500 font-medium">Loading infrastructure projects...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <EmptyState
              title="No infrastructure projects available."
              description="No monitored project records match the selected project type or status criteria."
              actionLabel="Reset Filters"
              onAction={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedStatus('All'); }}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onOpenUpload={onOpenUpload} 
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: EVIDENCE TELEMETRY & PRIVACY SHIELD REGISTRY */}
      {/* ========================================================================= */}
      {activeTab === 'evidence' && (
        <div className="space-y-6">
          <SectionHeader
            eyebrow="Civic Ground Telemetry & Verification"
            title="Evidence Telemetry & Privacy Shield Registry"
            description="Geotagged citizen photographic evidence, depth measurements, and sensor logs cross-referenced against public project records under Privacy Shield protection."
            action={
              <Button 
                variant="primary" 
                size="sm" 
                icon={Camera} 
                onClick={() => onOpenUpload(null)}
              >
                Submit Evidence
              </Button>
            }
          />

          {/* Evidence Category Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mr-1 hidden sm:inline">
              Filter by Category:
            </span>
            {['All', 'Fact', 'Observation', 'Allegation', 'Photo evidence'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedEvidenceCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  selectedEvidenceCategory === cat
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {filteredEvidence.length === 0 ? (
            <EmptyState
              title="No evidence records match your criteria"
              description="Try selecting a different evidence category or clearing your search query."
              actionLabel="Reset Filters"
              onAction={() => { setSearchQuery(''); setSelectedEvidenceCategory('All'); }}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEvidence.map((item, idx) => (
                <Card key={item.id || idx} padding="p-4 sm:p-5" className="flex flex-col justify-between space-y-3.5 hover:border-slate-300 transition-colors">
                  <div className="space-y-2.5">
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                          item.category === 'Fact' 
                            ? 'bg-blue-50 text-blue-800 border-blue-200' 
                            : item.category === 'Observation' 
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}>
                          {item.category || 'Evidence'}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-teal-700" />
                          <span>{item.privacyShieldStatus || 'Shielded'}</span>
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {item.date || 'Recent'}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-sm font-bold text-slate-900 line-clamp-2">
                      {item.title}
                    </h4>

                    {/* Summary */}
                    {item.summary && (
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {item.summary}
                      </p>
                    )}

                    {/* Location & Linked entity */}
                    <div className="space-y-1 text-xs text-slate-500 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{item.location || 'Reported Location'}</span>
                      </div>
                      {item.projectName && (
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate font-medium text-slate-700">{item.projectName}</span>
                        </div>
                      )}
                      {item.hotspotName && (
                        <div className="flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                          <span className="truncate font-medium text-teal-900">{item.hotspotName}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submitter & Inspect CTA */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] text-slate-400">
                      {item.submittedBy || 'Citizen #A7K29'}
                    </span>
                    {item.projectId ? (
                      <Link
                        to={`/project/${item.projectId}`}
                        className="inline-flex items-center gap-1 font-semibold text-teal-800 hover:text-teal-900"
                      >
                        <span>Inspect Project</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : item.hotspotId ? (
                      <Link
                        to={`/decision?id=${item.hotspotId}`}
                        className="inline-flex items-center gap-1 font-semibold text-teal-800 hover:text-teal-900"
                      >
                        <span>Decision View</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <span className="text-[11px] text-emerald-700 font-mono font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: DATA & METHOD PROVENANCE */}
      {/* ========================================================================= */}
      {activeTab === 'data' && (
        <div className="space-y-8">
          <SectionHeader
            eyebrow="Methodology & Transparent Governance"
            title="Data & Method Provenance"
            description="Operational architecture connecting citizen evidence, privacy shielding, deterministic 6-factor scoring, and government response workflows."
            action={<StatusBadge status="Simulated Data" />}
          />

          {/* 6-Factor Deterministic Priority Model */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Activity className="w-4 h-4 text-teal-700" />
                <span>6-FACTOR DETERMINISTIC PRIORITY MODEL</span>
              </div>
              <span className="text-xs text-slate-500 font-mono">
                Mathematical sum = 100% total priority weight
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">01. Citizen Demand Volume</span>
                  <span className="px-2 py-0.5 rounded font-mono font-bold text-teal-900 bg-teal-50 border border-teal-200">25%</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  Log-normalized volume of localized citizen submissions and community co-reports across corridor boundaries.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">02. Problem Severity & Risk</span>
                  <span className="px-2 py-0.5 rounded font-mono font-bold text-teal-900 bg-teal-50 border border-teal-200">20%</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  Physical hazard evaluation: structural integrity deficits, monsoon road submergence, and acute public health threats.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">03. Evidence Strength & Telemetry</span>
                  <span className="px-2 py-0.5 rounded font-mono font-bold text-teal-900 bg-teal-50 border border-teal-200">20%</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  Density of geotagged photographic ground telemetry verified through Privacy Shield and cross-validated by citizens.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">04. Public Service Impact</span>
                  <span className="px-2 py-0.5 rounded font-mono font-bold text-teal-900 bg-teal-50 border border-teal-200">15%</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  Direct transit disruption to essential services: schools, emergency hospital access corridors, and drinking water kiosks.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">05. Geographic Concentration</span>
                  <span className="px-2 py-0.5 rounded font-mono font-bold text-teal-900 bg-teal-50 border border-teal-200">10%</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  Spatial clustering coefficient within localized municipal ward boundaries and arterial road feeder corridors.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">06. Recency</span>
                  <span className="px-2 py-0.5 rounded font-mono font-bold text-teal-900 bg-teal-50 border border-teal-200">10%</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  Time decay factor prioritizing acute and worsening seasonal infrastructure deficiencies reported in recent intake cycles.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Shield & Evidence Rules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card padding="p-5 sm:p-6" className="space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                <span>PRIVACY SHIELD ARCHITECTURE</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Under Rule #9 & #11, raw citizen identities and emails are never exposed. Submissions use irreversible citizen pseudonyms (e.g. Citizen #A7K29). Uploaded photographs undergo automated client-side and server-side privacy scans to blur faces and license plates prior to public display.
              </p>
            </Card>

            <Card padding="p-5 sm:p-6" className="space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Award className="w-4 h-4 text-teal-700" />
                <span>NEUTRAL AI LANGUAGE ASSURANCE</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Under Rule #13, AI findings are strictly objective and never phrased as accusations. When a potential discrepancy is detected: &ldquo;This is a potential discrepancy for human review, not a finding of wrongdoing.&rdquo; Every AI finding requires certified human review.
              </p>
            </Card>
          </div>
        </div>
      )}

    </div>
  );
}