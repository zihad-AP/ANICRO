import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Megaphone, 
  Cpu, 
  Compass, 
  Building2, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Camera,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { 
  Button, 
  Card, 
  Badge, 
  StatusBadge, 
  SectionHeader, 
  ProjectCard 
} from '../components/common';
import { 
  DEMAND_CATEGORY_STATS, 
  DEMAND_HOTSPOTS,
  REGIONAL_HOTSPOTS_BY_TIER 
} from '../data/mockDemandIntelligence';
import IndiaInfrastructureOverview from '../components/IndiaInfrastructureOverview';
import PriorityQueueTable from '../components/PriorityQueueTable';
import IndiaMapVisualization from '../components/IndiaMapVisualization';
import HotspotDetailModal from '../components/HotspotDetailModal';
import heroInfrastructureImg from '../assets/hero_infrastructure.jpg';
import fieldEvidenceSchoolDrainageImg from '../assets/field_evidence_school_drainage.jpg';

export default function LandingPage({ 
  onOpenUpload, 
  onOpenReportNeed, 
  onOpenDataMethod,
  projects = [], 
  demands = [],
  hotspots = []
}) {
  const [selectedHotspotForModal, setSelectedHotspotForModal] = useState(null);
  const [isHotspotModalOpen, setIsHotspotModalOpen] = useState(false);
  const [modalInitialTab, setModalInitialTab] = useState('overview');
  const [mapSelectedState, setMapSelectedState] = useState('ALL');

  const hotspotsList = hotspots && hotspots.length > 0 ? hotspots : DEMAND_HOTSPOTS;

  const handleOpenHotspotDetail = (hotspot, tab = 'overview') => {
    setSelectedHotspotForModal(hotspot);
    setModalInitialTab(tab);
    setIsHotspotModalOpen(true);
  };

  const handleCloseHotspotDetail = () => {
    setIsHotspotModalOpen(false);
    setSelectedHotspotForModal(null);
  };
  // 7-step operational lifecycle: The ANTICRO Intelligence Loop
  const intelligenceLoopSteps = [
    {
      num: '01',
      title: 'Citizen Request',
      desc: 'Multilingual voice dictation & vernacular intake.',
      icon: Megaphone
    },
    {
      num: '02',
      title: 'Evidence',
      desc: 'Ground photo submission & Privacy Shield protection.',
      icon: Camera
    },
    {
      num: '03',
      title: 'Gemini AI Understanding',
      desc: 'Standardized problem categorization & severity.',
      icon: Cpu
    },
    {
      num: '04',
      title: 'Priority Score',
      desc: 'Explainable 6-factor deterministic weighting.',
      icon: Compass
    },
    {
      num: '05',
      title: 'Government Decision',
      desc: 'Administrative review & capital allocation.',
      icon: Building2
    },
    {
      num: '06',
      title: 'Project',
      desc: 'Commissioned public project tracking.',
      icon: Layers
    },
    {
      num: '07',
      title: 'Monitoring',
      desc: 'Citizen ground verification & certified audit.',
      icon: CheckCircle2
    }
  ];

  // Featured 2 projects
  const featuredProjects = projects.slice(0, 2);

  return (
    <div className="space-y-10 sm:space-y-12 pb-16">
      
      {/* 1. Hero Section - Authoritative Public-Sector Briefing */}
      <section className="pt-6 pb-8 sm:pt-10 sm:pb-12 border-b border-slate-200 bg-white">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-[5vw] space-y-8">
          
          {/* Top Two-Column Composition: Left Briefing + Right Large Civic Infrastructure Photo */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
            
            {/* Left Column: Eyebrow, Headline, Supporting Copy, Action Buttons */}
            <div className="lg:col-span-7 space-y-5 text-left">
              
              {/* Institutional Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-slate-200 bg-slate-50 text-[11px] font-mono text-slate-700 font-medium tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-700" />
                <span className="font-semibold text-slate-900">ANTICRO CR-1 • PUBLIC PROJECT ACCOUNTABILITY</span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-500">BRICS Track 1: DPI</span>
              </div>

              {/* Headline: Dark Navy Top Line + ANTICRO Teal Second Line */}
              <div className="space-y-3 max-w-2xl xl:max-w-3xl">
                <h1 className="text-2xl sm:text-4xl md:text-[42px] xl:text-[46px] font-bold tracking-tight leading-[1.2]">
                  <span className="text-slate-900 block">Turn citizen development needs into</span>
                  <span className="text-teal-800 block">evidence-backed infrastructure priorities.</span>
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-xl xl:max-w-2xl font-normal">
                  ANTICRO unifies citizen voices, evidence, and AI intelligence to help governments identify real needs, prioritize investments and deliver better infrastructure.
                </p>
              </div>

              {/* Primary / Secondary Action Hierarchy */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
                <Button 
                  variant="primary" 
                  size="md" 
                  icon={Megaphone} 
                  onClick={onOpenReportNeed}
                >
                  Report a Development Need →
                </Button>

                <Link to="/intelligence">
                  <Button variant="secondary" size="md" icon={Compass}>
                    Explore Infrastructure Intelligence
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Large Documentary Civic Infrastructure Photograph */}
            <div className="lg:col-span-5 w-full">
              <div className="relative rounded-lg border border-slate-200/90 shadow-2xs overflow-hidden group bg-slate-100 h-full">
                {/* Visual Image */}
                <img 
                  src={heroInfrastructureImg} 
                  alt="Realistic public civil infrastructure evidence - arterial transit corridor in India" 
                  className="w-full h-64 sm:h-80 lg:h-[380px] xl:h-[420px] 2xl:h-[460px] object-cover object-center transition-transform duration-500 group-hover:scale-[1.01]"
                />
                
                {/* Soft Gradient Fade to maintain contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent pointer-events-none" />

                {/* Subtle Field Evidence Telemetry Overlay */}
                <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-xs border border-slate-700/80 text-white px-2.5 py-1 rounded text-[10px] font-mono tracking-wider flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="font-semibold text-slate-100">FIELD EVIDENCE</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-300">WARD 42 • VYTILA</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-teal-400 font-semibold">INFRASTRUCTURE GAP</span>
                </div>

                {/* Subdued Bottom Institutional Caption Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-3.5 text-white flex items-center justify-between gap-2 z-10">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-teal-300 font-semibold block">
                      Civic Infrastructure Telemetry
                    </span>
                    <p className="text-[11px] font-medium text-slate-100 line-clamp-1">
                      Arterial Transit Corridors & Municipal Civil Works
                    </p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700/80 text-slate-300 shrink-0">
                    Asset Registry
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Institutional KPI Telemetry Strip - Single Horizontal Evidence/Data Strip */}
          <div className="border border-slate-200 rounded-lg bg-white shadow-2xs overflow-hidden">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
              <div className="py-4 px-4 sm:px-6 lg:px-8 xl:px-10 text-left space-y-0.5">
                <div className="text-xl sm:text-2xl lg:text-[28px] font-bold font-mono tabular-nums text-slate-900 tracking-tight">
                  27,170
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 font-medium">
                  Citizen Requests Logged
                </div>
              </div>

              <div className="py-4 px-4 sm:px-6 lg:px-8 xl:px-10 text-left space-y-0.5">
                <div className="text-xl sm:text-2xl lg:text-[28px] font-bold font-mono tabular-nums text-teal-800 tracking-tight">
                  231
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 font-medium">
                  Infrastructure Gaps Identified
                </div>
              </div>

              <div className="py-4 px-4 sm:px-6 lg:px-8 xl:px-10 text-left space-y-0.5">
                <div className="text-xl sm:text-2xl lg:text-[28px] font-bold font-mono tabular-nums text-slate-900 tracking-tight">
                  91 / 100
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 font-medium">
                  Lead Priority Score
                </div>
              </div>

              <div className="py-4 px-4 sm:px-6 lg:px-8 xl:px-10 text-left space-y-0.5">
                <div className="text-xl sm:text-2xl lg:text-[28px] font-bold font-mono tabular-nums text-teal-800 tracking-tight">
                  19
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 font-medium">
                  Commissioned & Monitored
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Below-Hero Visual Section - "From citizen voice to infrastructure evidence" */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-[5vw] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2 border-b border-slate-200">
          <div>
            <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-teal-800 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-700" />
              <span>GROUND-TRUTH FIELD TELEMETRY</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              From citizen voice to infrastructure evidence
            </h2>
          </div>
          <p className="text-[11px] text-slate-500 font-normal">
            Verified ground-level photographic evidence directly matched against municipal public works deficits.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Large Documentary Infrastructure Photograph */}
            <div className="lg:col-span-7 relative bg-slate-100 min-h-[280px] sm:min-h-[340px] lg:min-h-[440px] xl:min-h-[480px]">
              <img 
                src={fieldEvidenceSchoolDrainageImg} 
                alt="Ground photograph of road erosion and drainage waterlogging near municipal school" 
                className="w-full h-full object-cover object-center"
              />
              
              {/* Subtle photo vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent pointer-events-none" />

              {/* Top Field Tag */}
              <div className="absolute top-3.5 left-3.5 bg-slate-900/85 backdrop-blur-xs border border-slate-700/80 text-white px-2.5 py-1 rounded text-[10px] font-mono tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                <span className="font-semibold text-slate-100">FIELD EVIDENCE</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300">REF #EVD-2026-0842</span>
              </div>

              {/* Bottom Telemetry Bar */}
              <div className="absolute bottom-3 left-3.5 right-3.5 text-white flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-200 bg-slate-900/75 px-2 py-0.5 rounded border border-slate-700/60">
                  Ward 42 • Municipal School Access Corridor
                </span>
                <span className="text-teal-300 bg-slate-900/75 px-2 py-0.5 rounded border border-slate-700/60 hidden sm:inline">
                  12.9249° N, 80.1000° E
                </span>
              </div>
            </div>

            {/* Right Column: Structured Evidence Information */}
            <div className="lg:col-span-5 p-5 sm:p-6 lg:p-8 xl:p-10 flex flex-col justify-between space-y-5 bg-white">
              <div className="space-y-4">
                
                {/* Header Eyebrow & Category */}
                <div className="space-y-1">
                  <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                    FIELD EVIDENCE
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                      Road & Drainage
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Logged 3d ago
                    </span>
                  </div>
                </div>

                {/* Core Issue Title */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    Recurring monsoon waterlogging reported near public school access.
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Ground evidence corroborates citizen reports of road deterioration and open drainage overflow, creating hazardous pedestrian conditions for school students during peak hours.
                  </p>
                </div>

                {/* Structured Evidence Block */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                    Evidence:
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2 text-slate-700">
                      <span className="text-slate-400 font-mono text-[10px] mt-0.5 w-4 shrink-0">01</span>
                      <div>
                        <span className="font-semibold text-slate-900">Citizen reports:</span>{' '}
                        <span className="text-slate-600">37 verified localized complaints logged via voice & mobile intake</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-slate-700">
                      <span className="text-slate-400 font-mono text-[10px] mt-0.5 w-4 shrink-0">02</span>
                      <div>
                        <span className="font-semibold text-slate-900">Ground photographs:</span>{' '}
                        <span className="text-slate-600">Geotagged photographic records processed through Privacy Shield</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-slate-700">
                      <span className="text-slate-400 font-mono text-[10px] mt-0.5 w-4 shrink-0">03</span>
                      <div>
                        <span className="font-semibold text-slate-900">Location context:</span>{' '}
                        <span className="text-slate-600">Ward 42, Shree Vinayak Municipal School approach road</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-slate-700">
                      <span className="text-slate-400 font-mono text-[10px] mt-0.5 w-4 shrink-0">04</span>
                      <div>
                        <span className="font-semibold text-slate-900">Infrastructure records:</span>{' '}
                        <span className="text-slate-600">Cross-referenced against ULB culvert cleaning & road maintenance registry</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Status Strip & Primary CTA */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    STATUS
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-teal-50 border border-teal-200 text-teal-900 text-xs font-mono font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                    <span>Evidence collected & verified</span>
                  </div>
                </div>

                <Link to="/hotspot/hotspot-01">
                  <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                    Inspect Hotspot
                  </Button>
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. The ANTICRO Intelligence Loop - Compact Operational Pipeline */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-[5vw] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500">
              OPERATIONAL PIPELINE
            </span>
            <span className="text-slate-300">•</span>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              The ANTICRO Intelligence Loop
            </h2>
          </div>
          <span className="text-[11px] text-slate-500 font-normal">
            Continuous end-to-end evidence & decision progression
          </span>
        </div>

        {/* Compact Numbered Stages Connected by a Thin Line */}
        <div className="bg-slate-50/80 border border-slate-200 rounded-lg p-3 sm:p-4">
          <div className="relative">
            
            {/* Thin connecting line across stages (desktop) */}
            <div className="hidden lg:block absolute top-3 left-8 right-8 h-px bg-slate-300 -z-0" />

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-2 relative z-10">
              {intelligenceLoopSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.num} className="flex flex-col items-start lg:items-center text-left lg:text-center space-y-1.5">
                    
                    {/* Numbered Node */}
                    <div className="flex items-center gap-1.5 lg:flex-col">
                      <div className="w-6 h-6 rounded-full bg-white border border-slate-300 flex items-center justify-center text-[10px] font-mono font-bold text-slate-700 shadow-2xs">
                        {step.num}
                      </div>
                    </div>

                    {/* Title & Micro-Definition */}
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-slate-900 leading-snug">
                        {step.title}
                      </div>
                      <div className="text-[10px] text-slate-500 font-normal leading-tight hidden sm:block">
                        {step.desc}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* India Infrastructure Demand Overview (Parts 13, 14, 15) */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-[5vw]">
        <IndiaInfrastructureOverview hotspots={hotspots} projects={projects} />
      </section>

      {/* 3. Community Development Demand Section Preview */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-[5vw] space-y-6">
        <SectionHeader
          eyebrow="Citizen Intelligence"
          title="Community Development Demand"
          description="Aggregated citizen requests across key infrastructure categories, identifying acute community deficits before capital projects are drafted."
          action={
            <Link to="/dashboard?tab=infrastructure">
              <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                View Full Demand Analytics
              </Button>
            </Link>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DEMAND_CATEGORY_STATS.slice(0, 4).map((cat) => (
            <Card key={cat.category} padding="p-4" hover className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="neutral" size="sm">{cat.category}</Badge>
                <StatusBadge status={cat.priority} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{cat.name}</h4>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-bold font-mono text-slate-900">{cat.requestsDisplay}</span>
                  <span className="text-xs text-slate-500">across {cat.hotspotsDisplay}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="truncate">Top: {cat.leadHotspot}</span>
                <span className="text-teal-800 font-medium font-mono shrink-0">{cat.recentTrend}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 3. Demand Hotspots - Interactive Pan-India Map & Geographic Clusters */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-[5vw] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2 border-b border-slate-200">
          <div>
            <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-teal-800">
              GEOGRAPHIC CLUSTERS
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Demand Hotspots
            </h2>
            <p className="text-xs text-slate-500 font-normal">
              Geographic clusters created from citizen-reported infrastructure needs across 10 priority states
            </p>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status="Simulated Data" />
            <Link to="/intelligence">
              <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                View All Hotspots
              </Button>
            </Link>
          </div>
        </div>

        {/* Live Interactive Map of India with Live Pins & Severity Filtering */}
        <IndiaMapVisualization 
          hotspots={hotspotsList}
          selectedState={mapSelectedState}
          onSelectState={setMapSelectedState}
          onSelectHotspot={(h) => handleOpenHotspotDetail(h, 'overview')}
        />

        {/* 4 Analytical Geographic Severity Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Critical Severity */}
          <Card padding="p-4" className="space-y-3 border-t-2 border-t-rose-600">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-rose-800 uppercase font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-600" />
                Critical Severity
              </span>
              <span className="text-[10px] font-mono text-slate-500">Score ≥ 90</span>
            </div>
            <div className="space-y-2">
              {hotspotsList.filter(h => (h.severity || '').toLowerCase().includes('crit') || h.priorityScore >= 90).slice(0, 2).map((spot) => (
                <button
                  type="button"
                  key={spot.id} 
                  onClick={() => handleOpenHotspotDetail(spot, 'overview')} 
                  className="w-full text-left p-2.5 bg-slate-50 hover:bg-teal-50/50 rounded-md border border-slate-100 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center justify-between text-xs mb-0.5">
                    <span className="font-semibold text-slate-900 group-hover:text-teal-900 transition-colors truncate">
                      {spot.district || spot.locality}
                    </span>
                    <span className="font-mono font-bold text-rose-700 tabular-nums">
                      {spot.priorityScore}/100
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-1">{spot.infrastructureGap || spot.name}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>{(spot.requestCount || spot.reportCount || 15).toLocaleString()} requests</span>
                    <span>{spot.state}</span>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* High Severity */}
          <Card padding="p-4" className="space-y-3 border-t-2 border-t-amber-500">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-800 uppercase font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                High Severity
              </span>
              <span className="text-[10px] font-mono text-slate-500">Score 70–89</span>
            </div>
            <div className="space-y-2">
              {hotspotsList.filter(h => ((h.severity || '').toLowerCase().includes('high') || (h.priorityScore >= 70 && h.priorityScore < 90)) && !(h.severity || '').toLowerCase().includes('crit')).slice(0, 2).map((spot) => (
                <button
                  type="button"
                  key={spot.id} 
                  onClick={() => handleOpenHotspotDetail(spot, 'overview')} 
                  className="w-full text-left p-2.5 bg-slate-50 hover:bg-teal-50/50 rounded-md border border-slate-100 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center justify-between text-xs mb-0.5">
                    <span className="font-semibold text-slate-900 group-hover:text-teal-900 transition-colors truncate">
                      {spot.district || spot.locality}
                    </span>
                    <span className="font-mono font-bold text-amber-700 tabular-nums">
                      {spot.priorityScore}/100
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-1">{spot.infrastructureGap || spot.name}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>{(spot.requestCount || spot.reportCount || 15).toLocaleString()} requests</span>
                    <span>{spot.state}</span>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Medium Severity */}
          <Card padding="p-4" className="space-y-3 border-t-2 border-t-blue-500">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-blue-800 uppercase font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Medium Severity
              </span>
              <span className="text-[10px] font-mono text-slate-500">Score 50–69</span>
            </div>
            <div className="space-y-2">
              {hotspotsList.filter(h => (h.severity || '').toLowerCase().includes('med') || (h.priorityScore >= 50 && h.priorityScore < 70)).slice(0, 2).map((spot) => (
                <button
                  type="button"
                  key={spot.id} 
                  onClick={() => handleOpenHotspotDetail(spot, 'overview')} 
                  className="w-full text-left p-2.5 bg-slate-50 hover:bg-teal-50/50 rounded-md border border-slate-100 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center justify-between text-xs mb-0.5">
                    <span className="font-semibold text-slate-900 group-hover:text-teal-900 transition-colors truncate">
                      {spot.district || spot.locality}
                    </span>
                    <span className="font-mono font-bold text-blue-700 tabular-nums">
                      {spot.priorityScore}/100
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-1">{spot.infrastructureGap || spot.name}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>{(spot.requestCount || spot.reportCount || 15).toLocaleString()} requests</span>
                    <span>{spot.state}</span>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Low Severity */}
          <Card padding="p-4" className="space-y-3 border-t-2 border-t-slate-400">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-700 uppercase font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                Low Severity
              </span>
              <span className="text-[10px] font-mono text-slate-500">Score &lt; 50</span>
            </div>
            <div className="space-y-2">
              {hotspotsList.filter(h => (h.severity || '').toLowerCase().includes('low') || h.priorityScore < 50).slice(0, 2).map((spot) => (
                <button
                  type="button"
                  key={spot.id} 
                  onClick={() => handleOpenHotspotDetail(spot, 'overview')} 
                  className="w-full text-left p-2.5 bg-slate-50 hover:bg-teal-50/50 rounded-md border border-slate-100 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center justify-between text-xs mb-0.5">
                    <span className="font-semibold text-slate-900 group-hover:text-teal-900 transition-colors truncate">
                      {spot.district || spot.locality}
                    </span>
                    <span className="font-mono font-bold text-slate-700 tabular-nums">
                      {spot.priorityScore}/100
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-1">{spot.infrastructureGap || spot.name}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>{(spot.requestCount || spot.reportCount || 3).toLocaleString()} requests</span>
                    <span>{spot.state}</span>
                  </div>
                </button>
              ))}
            </div>
          </Card>

        </div>
      </section>

      {/* 4. Priority Queue (Government Operations Table with Deterministic 6-Factor Review) */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-[5vw] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2 border-b border-slate-200">
          <div>
            <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-teal-800">
              AI PRIORITY INTELLIGENCE
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Priority Queue
            </h2>
            <p className="text-xs text-slate-500 font-normal">
              Top infrastructure needs ranked by explainable 6-factor deterministic priority scoring
            </p>
          </div>
          <Link to="/intelligence">
            <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
              Explore All Priorities
            </Button>
          </Link>
        </div>

        <PriorityQueueTable 
          items={hotspotsList}
          onReviewHotspot={(item) => handleOpenHotspotDetail(item, 'reasoning')}
        />
      </section>

      {/* 5. Monitored Public Projects Teaser */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-[5vw] space-y-6">
        <SectionHeader
          eyebrow="Project Accountability"
          title="Featured Monitored Public Projects"
          description="Commissioned capital projects monitored with citizen photographic evidence, Privacy Shield protection, and certified civil engineer assessments."
          action={
            <Link to="/dashboard?tab=projects">
              <Button variant="secondary" size="sm" icon={ArrowRight} iconPosition="right">
                View All {projects.length} Projects
              </Button>
            </Link>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featuredProjects.map((proj) => (
            <ProjectCard 
              key={proj.id} 
              project={proj} 
              onOpenUpload={onOpenUpload} 
            />
          ))}
        </div>
      </section>

      {/* 6. Designed for India (Part 12) */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-[5vw] space-y-6">
        <SectionHeader
          eyebrow="Scalable Public Architecture"
          title="Designed for India"
          description="Prototype architecture designed to scale across states and linguistic communities without central data bottlenecks."
          action={<StatusBadge status="Simulated Data" />}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-slate-700" />
              <h4 className="text-xs font-bold text-slate-900 uppercase font-mono">10 Indian States Modeled</h4>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
              Demonstrates multi-state scalability across Karnataka, Maharashtra, Tamil Nadu, Uttar Pradesh, Bihar, Rajasthan, West Bengal, Odisha, Kerala, and Assam.
            </p>
          </div>

          <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-slate-700" />
              <h4 className="text-xs font-bold text-slate-900 uppercase font-mono">Multilingual & Voice-First</h4>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
              Accepts vernacular voice dictation and native scripts (Hindi, Malayalam, Tamil, Telugu, Kannada, Bengali, Marathi, and English) through Google Gemini understanding.
            </p>
          </div>

          <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-700" />
              <h4 className="text-xs font-bold text-slate-900 uppercase font-mono">Municipal & Rural Contexts</h4>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
              Spans urban municipal corporation wards (stormwater drainage corridors) to rural Gram Panchayat water deficits and arterial hospital link roads.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Data & Method Provenance (Part 13) */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-[5vw]">
        <div className="p-4 sm:p-6 rounded-lg bg-slate-50 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-50 text-amber-900 border border-amber-200">
                DATA & METHOD
              </span>
              <span className="text-[11px] text-slate-500 font-mono">Algorithmic & Provenance Transparency</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Simulated Demonstration Data & Explainable Priority Scoring
            </h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Prototype demonstration only. Figures are illustrative and are not official government statistics. AI findings provide decision support and require human engineering and administrative review.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenDataMethod}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold shadow-2xs transition-colors shrink-0 cursor-pointer"
          >
            <span>Inspect Data & Method</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
          </button>
        </div>
      </section>

      {/* Universal Hotspot & Priority Detail Modal */}
      <HotspotDetailModal 
        hotspot={selectedHotspotForModal}
        isOpen={isHotspotModalOpen}
        onClose={handleCloseHotspotDetail}
        initialTab={modalInitialTab}
      />

    </div>
  );
}