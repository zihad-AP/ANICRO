import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Search, 
  Filter, 
  MapPin, 
  Users, 
  Layers, 
  Building2, 
  ArrowUpRight, 
  ChevronRight, 
  Compass, 
  FileText,
  AlertCircle,
  PlusCircle,
  BarChart3,
  SlidersHorizontal,
  Globe,
  CheckCircle2,
  TrendingUp,
  Info
} from 'lucide-react';
import { 
  DEMAND_HOTSPOTS, 
  INDIAN_STATES_META, 
  DEMAND_CATEGORIES, 
  GOV_ACTION_STATUSES,
  MACRO_INTELLIGENCE_METRICS,
  BUILT_FOR_INDIA_LANGUAGES,
  DATA_PROVENANCE
} from '../data/mockDemandIntelligence';
import HotspotCard from '../components/HotspotCard';
import HotspotDetail from '../components/HotspotDetail';
import IndiaCoveragePanel from '../components/IndiaCoveragePanel';
import IndiaMapVisualization from '../components/IndiaMapVisualization';
import Card from '../components/common/Card';

export const INDIAN_LANGUAGES_FILTER = [
  'All Languages',
  'Hindi',
  'Marathi',
  'Tamil',
  'Kannada',
  'Bengali',
  'Gujarati',
  'Malayalam',
  'English'
];

export default function DemandIntelligencePage({ 
  hotspots = DEMAND_HOTSPOTS, 
  onOpenReportNeed = () => {} 
}) {
  const navigate = useNavigate();

  // Search & Filter state (Part 4 & Part 5)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedPriority, setSelectedPriority] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedLanguage, setSelectedLanguage] = useState('All Languages');
  const [activeTab, setActiveTab] = useState('hotspots'); // 'hotspots' | 'map' | 'coverage'
  const [displayMode, setDisplayMode] = useState('cards'); // 'cards' | 'table'

  // Hotspot Inspection Modal State (Step 5E)
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeHotspotsList = hotspots || DEMAND_HOTSPOTS;

  // Filtered hotspots (Part 4: State, Category, Priority, Status, Search)
  const filteredHotspots = useMemo(() => {
    return activeHotspotsList.filter((item) => {
      // 1. Search Query (Part 5: hotspot, district, state, category, project)
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        (item.name && item.name.toLowerCase().includes(q)) ||
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.district && item.district.toLowerCase().includes(q)) ||
        (item.state && item.state.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q)) ||
        (item.primaryCategory && item.primaryCategory.toLowerCase().includes(q)) ||
        (item.linkedProjectId && item.linkedProjectId.toLowerCase().includes(q)) ||
        (item.recommendedProject?.title && item.recommendedProject.title.toLowerCase().includes(q)) ||
        (item.infrastructureGap && item.infrastructureGap.toLowerCase().includes(q));

      // 2. State Filter
      const matchesState = selectedState === 'ALL' || item.stateId === selectedState || item.state === selectedState;

      // 3. Category Filter
      const matchesCategory = selectedCategory === 'ALL' || 
        item.category === selectedCategory || 
        item.primaryCategory === selectedCategory;

      // 4. Priority Filter (Critical, High, Medium, Low)
      let matchesPriority = true;
      if (selectedPriority !== 'ALL') {
        const pLevel = (item.priorityLevel || item.severity || '').toLowerCase();
        const score = item.priorityScore || 0;
        if (selectedPriority === 'Critical') {
          matchesPriority = pLevel.includes('crit') || score >= 80;
        } else if (selectedPriority === 'High') {
          matchesPriority = (pLevel.includes('high') && !pLevel.includes('very')) || (score >= 60 && score < 80);
        } else if (selectedPriority === 'Medium') {
          matchesPriority = pLevel.includes('med') || (score >= 40 && score < 60);
        } else if (selectedPriority === 'Low') {
          matchesPriority = pLevel.includes('low') || score < 40;
        }
      }

      // 5. Status Filter (New Signal, Under Review, Project Linked, In Progress, Resolved)
      let matchesStatus = true;
      if (selectedStatus !== 'ALL') {
        const s = (item.governmentStatus || item.currentStatus || item.status || '').toLowerCase();
        if (selectedStatus === 'New Signal') {
          matchesStatus = s.includes('new') || s.includes('needs');
        } else if (selectedStatus === 'Under Review') {
          matchesStatus = s.includes('review') || s.includes('assessment');
        } else if (selectedStatus === 'Project Linked') {
          matchesStatus = Boolean(item.linkedProjectId) || s.includes('linked');
        } else if (selectedStatus === 'In Progress') {
          matchesStatus = s.includes('progress') || s.includes('underway') || s.includes('allocated');
        } else if (selectedStatus === 'Resolved') {
          matchesStatus = s.includes('resolved') || s.includes('completed') || s.includes('verified');
        }
      }

      // 6. Language Filter
      let matchesLanguage = true;
      if (selectedLanguage !== 'All Languages') {
        const langs = item.languagesRepresented || [];
        matchesLanguage = langs.some(l => l.language.toLowerCase() === selectedLanguage.toLowerCase()) ||
          (item.languageSubmitted && item.languageSubmitted.toLowerCase() === selectedLanguage.toLowerCase());
      }

      return matchesSearch && matchesState && matchesCategory && matchesPriority && matchesStatus && matchesLanguage;
    });
  }, [searchQuery, selectedState, selectedCategory, selectedPriority, selectedStatus, selectedLanguage]);

  const handleOpenDetail = (hotspot) => {
    setActiveHotspot(hotspot);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      {/* Top Banner (Step 5C) */}
      <div className="bg-white border-b border-slate-200/80">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-[5vw] py-8 sm:py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200/70 text-teal-800 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-teal-700" />
                <span>ANTICRO Civic Demand Layer</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                National Infrastructure Demand Intelligence
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Aggregating citizen development requests into geographic demand hotspots and explainable investment priorities.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 border border-slate-200 hidden sm:inline">
                Simulated / Demo Data
              </span>

              <button
                type="button"
                onClick={onOpenReportNeed}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-900 hover:bg-teal-950 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-teal-200" />
                <span>Report Development Need</span>
              </button>
            </div>
          </div>

          {/* 4 Summary Cards (Exact Values: 27,170 / 231 / 47 / 10) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8">
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">
                CITIZEN REQUESTS
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900">
                27,170
              </div>
              <div className="text-[11px] text-teal-800 font-medium">
                Verified citizen submissions
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">
                DEMAND HOTSPOTS
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-teal-900">
                231
              </div>
              <div className="text-[11px] text-slate-500">
                Geographic problem clusters
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">
                HIGH PRIORITY GAPS
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-rose-600">
                47
              </div>
              <div className="text-[11px] text-slate-500">
                Critical hazard & transit deficits
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">
                STATES COVERED
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900">
                10
              </div>
              <div className="text-[11px] text-slate-500">
                Nationwide civic coverage
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Main Content Area */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-[5vw] py-8 space-y-8">
        
        {/* Step 5K: India-Wide Civic Demand Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-teal-800" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-mono">
                  India-Wide Civic Demand
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Demonstrating nationwide scalability across 10 states, 48 districts, and 9 regional vernacular languages.
              </p>
            </div>

            {/* View switcher tabs */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('hotspots')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'hotspots' ? 'bg-white text-teal-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Hotspots List
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('map')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'map' ? 'bg-white text-teal-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Interactive Map
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('coverage')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'coverage' ? 'bg-white text-teal-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                10-State Panel
              </button>
            </div>
          </div>

          {/* Conditional Map or Coverage Panel view */}
          {activeTab === 'map' && (
            <IndiaMapVisualization
              hotspots={DEMAND_HOTSPOTS}
              selectedState={selectedState}
              onSelectState={setSelectedState}
              selectedHotspot={activeHotspot}
              onSelectHotspot={handleOpenDetail}
            />
          )}

          {activeTab === 'coverage' && (
            <IndiaCoveragePanel
              selectedState={selectedState}
              onSelectState={setSelectedState}
              hotspots={DEMAND_HOTSPOTS}
            />
          )}
        </div>

        {/* Step 5J: Filters Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hotspots by name, location, category or deficit..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-700"
              />
            </div>

            {/* Filter Dropdowns (State, Category, Severity, Language) */}
            <div className="flex flex-wrap items-center gap-2">
              {/* State Filter */}
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-700 cursor-pointer"
              >
                <option value="ALL">All States (10)</option>
                {INDIAN_STATES_META.map(st => (
                  <option key={st.id} value={st.id}>{st.name}</option>
                ))}
              </select>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-700 cursor-pointer"
              >
                <option value="ALL">All Categories</option>
                {DEMAND_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {/* Priority Filter (Part 4) */}
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-700 cursor-pointer"
              >
                <option value="ALL">All Priorities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              {/* Status Filter (Part 4) */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-700 cursor-pointer"
              >
                <option value="ALL">All Statuses</option>
                <option value="New Signal">New Signal</option>
                <option value="Under Review">Under Review</option>
                <option value="Project Linked">Project Linked</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>

              {/* Language Filter */}
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-700 cursor-pointer"
              >
                {INDIAN_LANGUAGES_FILTER.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>

              {/* Reset button if filtered */}
              {(selectedState !== 'ALL' || selectedCategory !== 'ALL' || selectedPriority !== 'ALL' || selectedStatus !== 'ALL' || selectedLanguage !== 'All Languages' || searchQuery) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedState('ALL');
                    setSelectedCategory('ALL');
                    setSelectedPriority('ALL');
                    setSelectedStatus('ALL');
                    setSelectedLanguage('All Languages');
                    setSearchQuery('');
                  }}
                  className="px-2.5 py-2 text-xs text-rose-600 hover:text-rose-800 font-medium cursor-pointer"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Step 5D: Demand Hotspots Section */}
        <div className="space-y-4">
          <div className="border-b border-slate-200/80 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">
                  Demand Hotspots
                </h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {filteredHotspots.length} clusters
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Aggregated citizen requests clustered by location, category, severity, and recurring infrastructure deficits.
              </p>
            </div>

            {/* View Mode Toggle: Cards vs Table */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs shrink-0 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setDisplayMode('cards')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  displayMode === 'cards' ? 'bg-white text-teal-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cards View
              </button>
              <button
                type="button"
                onClick={() => setDisplayMode('table')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  displayMode === 'table' ? 'bg-white text-teal-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Table View
              </button>
            </div>
          </div>

          {/* Cards View */}
          {displayMode === 'cards' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredHotspots.map((hotspot) => (
                <HotspotCard
                  key={hotspot.id}
                  hotspot={hotspot}
                  onClick={() => handleOpenDetail(hotspot)}
                />
              ))}
            </div>
          )}

          {/* Table View (Step 5) */}
          {displayMode === 'table' && (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200/80 text-[10px] uppercase font-mono font-semibold text-slate-500 tracking-wider">
                    <tr>
                      <th className="px-4 py-3">Hotspot</th>
                      <th className="px-3 py-3">State</th>
                      <th className="px-3 py-3">Category</th>
                      <th className="px-3 py-3 text-right">Citizen Requests</th>
                      <th className="px-3 py-3 text-right">Population</th>
                      <th className="px-3 py-3 text-center">Severity</th>
                      <th className="px-3 py-3 text-right">Priority</th>
                      <th className="px-3 py-3 text-right">Trend</th>
                      <th className="px-4 py-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-normal">
                    {filteredHotspots.map((hotspot) => (
                      <tr 
                        key={hotspot.id} 
                        className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                        onClick={() => handleOpenDetail(hotspot)}
                      >
                        <td className="px-4 py-3.5">
                          <div className="font-bold text-slate-900 group-hover:text-teal-900 transition-colors">
                            {hotspot.name}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate max-w-xs">
                            {hotspot.locality || hotspot.district}
                          </div>
                        </td>
                        <td className="px-3 py-3.5 whitespace-nowrap">
                          <span className="font-mono text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                            {hotspot.state}
                          </span>
                        </td>
                        <td className="px-3 py-3.5 whitespace-nowrap text-slate-600">
                          {hotspot.primaryCategory || hotspot.category}
                        </td>
                        <td className="px-3 py-3.5 text-right font-mono font-semibold text-slate-900 whitespace-nowrap">
                          {hotspot.requestCount?.toLocaleString()}
                        </td>
                        <td className="px-3 py-3.5 text-right text-slate-600 whitespace-nowrap">
                          {hotspot.affectedPopulationDisplay || `${hotspot.affectedPopulation?.toLocaleString()} res.`}
                        </td>
                        <td className="px-3 py-3.5 text-center whitespace-nowrap">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                            hotspot.severity === 'Critical'
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}>
                            {hotspot.severity}
                          </span>
                        </td>
                        <td className="px-3 py-3.5 text-right whitespace-nowrap">
                          <span className="font-mono font-bold text-teal-900 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                            {hotspot.priorityScore}
                          </span>
                        </td>
                        <td className="px-3 py-3.5 text-right font-mono text-xs font-semibold text-teal-800 whitespace-nowrap">
                          {hotspot.trend}
                        </td>
                        <td className="px-4 py-3.5 text-center whitespace-nowrap">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenDetail(hotspot);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 text-[11px] font-semibold transition-colors cursor-pointer"
                          >
                            Inspect Chain
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {filteredHotspots.length === 0 && (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
              No demand hotspots match your filter criteria. Try selecting "All States" or clearing search query.
            </div>
          )}
        </div>

        {/* Step 5: "Built for India" Section */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 mb-1">
                <Globe className="w-4 h-4 text-teal-700" />
                <span>Multilingual Civic Ingestion</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Built for India: 10 Languages Supported
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Citizens submit development needs in their native tongue. ANTICRO normalizes requests into standardized civic categories while preserving original audio, text, and ground nuance.
              </p>
            </div>
            <span className="text-xs font-mono text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 font-semibold self-start md:self-auto">
              Zero Language Exclusion
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {BUILT_FOR_INDIA_LANGUAGES.map((lang, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-teal-50/70 border border-slate-200 text-xs font-medium text-slate-700 transition-colors"
              >
                {lang}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
              <span className="font-bold text-slate-900 block">1. Vernacular Ingestion</span>
              <p className="text-slate-600 leading-relaxed">
                Accepts spoken audio and typed text across Kannada, Marathi, Hindi, Tamil, and 6 more languages.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
              <span className="font-bold text-slate-900 block">2. Civic Normalization</span>
              <p className="text-slate-600 leading-relaxed">
                Gemini AI standardizes varied citizen phrases into unified municipal public works taxonomies.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
              <span className="font-bold text-slate-900 block">3. Decision Integration</span>
              <p className="text-slate-600 leading-relaxed">
                Aggregates across vernacular submissions into unified geographic hotspots and capital allocations.
              </p>
            </div>
          </div>
        </div>

        {/* Step 5: "Data & Method" Provenance Panel */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white shadow-md space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 font-mono uppercase tracking-wider mb-1">
                <FileText className="w-3.5 h-3.5" />
                <span>Methodology & Transparency</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Data & Method: ANTICRO Civic Intelligence Architecture
              </h3>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-800 text-teal-300 border border-slate-700 self-start sm:self-auto">
              {DATA_PROVENANCE.priorityModel}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1.5">
              <span className="text-teal-400 font-mono text-[10px] uppercase font-bold block">
                Citizen Requests
              </span>
              <div className="font-semibold text-white">
                {DATA_PROVENANCE.citizenRequests}
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                27,170 co-reported citizen submissions aggregated across 48 districts and 10 Indian states.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1.5">
              <span className="text-teal-400 font-mono text-[10px] uppercase font-bold block">
                Priority Formula
              </span>
              <div className="font-semibold text-white">
                6-Factor Weighted Index
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Demand 25%, Severity 20%, Population 20%, Gap 15%, Evidence 10%, Trend 10%.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1.5">
              <span className="text-teal-400 font-mono text-[10px] uppercase font-bold block">
                AI Engine & Governance
              </span>
              <div className="font-semibold text-white">
                {DATA_PROVENANCE.aiEngine}
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Neutral, objective classification and synthesis. Human public works review mandatory.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1.5">
              <span className="text-teal-400 font-mono text-[10px] uppercase font-bold block">
                Public Infrastructure
              </span>
              <div className="font-semibold text-white">
                {DATA_PROVENANCE.infrastructure}
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Linked to official project registries and municipal capital budget allocations.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-start gap-2 text-[11px] text-slate-400 font-normal">
            <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <span>
              {DATA_PROVENANCE.disclaimer}
            </span>
          </div>
        </div>
      </div>


      {/* Hotspot Full Lifecycle Detail Modal (Step 5E) */}
      <HotspotDetail
        hotspot={activeHotspot}
        onClose={() => setIsModalOpen(false)}
        isStandalonePage={false}
      />
    </div>
  );
}
