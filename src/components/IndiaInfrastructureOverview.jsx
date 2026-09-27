import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  TrendingUp, 
  MapPin, 
  BarChart3, 
  Compass, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  Users, 
  Clock, 
  Activity,
  Info
} from 'lucide-react';
import { DEMAND_HOTSPOTS } from '../data/mockDemandIntelligence';

// Monthly simulated demand trends (Part 14)
const MONTHLY_DEMAND_TRENDS = [
  { month: 'Jan', water: 1240, roads: 1890, drainage: 620, sanitation: 780, total: 4530 },
  { month: 'Feb', water: 1450, roads: 2010, drainage: 590, sanitation: 810, total: 4860 },
  { month: 'Mar', water: 2100, roads: 2150, drainage: 640, sanitation: 890, total: 5780 },
  { month: 'Apr', water: 2980, roads: 2200, drainage: 710, sanitation: 940, total: 6830 },
  { month: 'May', water: 3450, roads: 2340, drainage: 1120, sanitation: 990, total: 7900 },
  { month: 'Jun', water: 2890, roads: 2980, drainage: 3200, sanitation: 1080, total: 10150 },
  { month: 'Jul', water: 2150, roads: 3410, drainage: 4650, sanitation: 1140, total: 11350 },
  { month: 'Aug', water: 1980, roads: 3220, drainage: 4120, sanitation: 1190, total: 10510 },
];

export default function IndiaInfrastructureOverview({ 
  hotspots = DEMAND_HOTSPOTS, 
  projects = [] 
}) {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');

  // Dynamic priority distribution calculated directly from actual hotspots (Part 15)
  const priorityStats = useMemo(() => {
    const list = Array.isArray(hotspots) && hotspots.length > 0 ? hotspots : DEMAND_HOTSPOTS;
    let critical = 0;
    let high = 0;
    let medium = 0;
    let low = 0;

    list.forEach(h => {
      const score = Number(h?.priorityScore || h?.totalScore || 0);
      if (score >= 80) critical++;
      else if (score >= 60) high++;
      else if (score >= 40) medium++;
      else low++;
    });

    const total = list.length || 1;
    return {
      total: list.length,
      critical,
      high,
      medium,
      low,
      criticalPct: Math.round((critical / total) * 100),
      highPct: Math.round((high / total) * 100),
      mediumPct: Math.round((medium / total) * 100),
      lowPct: Math.round((low / total) * 100),
    };
  }, [hotspots]);

  // Dynamic project stats
  const projectStats = useMemo(() => {
    const list = Array.isArray(projects) ? projects : [];
    const totalProjects = list.length || 28;
    const inProgress = list.filter(p => ((p?.status || '').toLowerCase()).includes('progress')).length || 19;
    const resolved = list.filter(p => {
      const s = (p?.status || '').toLowerCase();
      return s.includes('resolved') || s.includes('complete');
    }).length || 7;
    const linked = totalProjects;

    return { totalProjects, inProgress, resolved, linked };
  }, [projects]);

  // Max value for trend scaling
  const maxTrendVal = useMemo(() => {
    return Math.max(...MONTHLY_DEMAND_TRENDS.map(t => {
      if (activeCategoryFilter === 'water') return t.water;
      if (activeCategoryFilter === 'roads') return t.roads;
      if (activeCategoryFilter === 'drainage') return t.drainage;
      if (activeCategoryFilter === 'sanitation') return t.sanitation;
      return t.total;
    }));
  }, [activeCategoryFilter]);

  return (
    <section className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700 text-[10px] font-mono font-semibold uppercase">
                <Compass className="w-3.5 h-3.5 text-slate-700" />
                <span>Pan-India Civic Demand Intelligence</span>
              </span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200">
                SIMULATED DEMO DATA
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              India Infrastructure Demand Overview
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Aggregating citizen development needs, geographic hotspot clustering, and project accountability responses across 10 Indian states.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/intelligence"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer border border-teal-900"
            >
              <span>Explore Demand Hotspots</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 7 Macro KPIs (Part 13) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mt-5 pt-5 border-t border-slate-200">
          <div className="p-3 bg-white rounded-md border border-slate-200 space-y-0.5">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              States
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono text-slate-900">
              10
            </div>
            <div className="text-[10px] text-slate-500">Covered</div>
          </div>

          <div className="p-3 bg-white rounded-md border border-slate-200 space-y-0.5">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              Citizen Requests
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono text-slate-900">
              27,170
            </div>
            <div className="text-[10px] text-slate-500">Submissions</div>
          </div>

          <div className="p-3 bg-white rounded-md border border-slate-200 space-y-0.5">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              Demand Hotspots
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono text-teal-900">
              231
            </div>
            <div className="text-[10px] text-slate-500">Active clusters</div>
          </div>

          <div className="p-3 bg-white rounded-md border border-slate-200 space-y-0.5">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              Critical Priorities
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono text-rose-800">
              47
            </div>
            <div className="text-[10px] text-slate-500">Index ≥ 80/100</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-0.5">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
              Projects Linked
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-blue-700">
              {projectStats.linked}
            </div>
            <div className="text-[10px] text-slate-500">Budgeted works</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-0.5">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
              In Progress
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-amber-700">
              {projectStats.inProgress}
            </div>
            <div className="text-[10px] text-slate-500">Active execution</div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-0.5 col-span-2 sm:col-span-2 lg:col-span-1">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
              Resolved
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-700">
              {projectStats.resolved}
            </div>
            <div className="text-[10px] text-slate-500">Audit verified</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Trend Visualization + Priority Distribution */}
      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Trend View (Part 14) - 7 cols */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-teal-700" />
                <h3 className="text-sm font-bold text-slate-900">
                  Citizen Demand Trends (Jan – Aug)
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Monthly volume variation showing seasonal demand surges across key civic domains.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setActiveCategoryFilter('all')}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                  activeCategoryFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setActiveCategoryFilter('drainage')}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                  activeCategoryFilter === 'drainage'
                    ? 'bg-cyan-700 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Drainage
              </button>
              <button
                type="button"
                onClick={() => setActiveCategoryFilter('roads')}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                  activeCategoryFilter === 'roads'
                    ? 'bg-amber-700 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Roads
              </button>
              <button
                type="button"
                onClick={() => setActiveCategoryFilter('water')}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                  activeCategoryFilter === 'water'
                    ? 'bg-blue-700 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Water
              </button>
            </div>
          </div>

          {/* Clean Bar Visualization */}
          <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/80 space-y-4">
            <div className="flex items-end justify-between gap-2 h-44 pt-4 px-2">
              {MONTHLY_DEMAND_TRENDS.map((item) => {
                let currentVal = item.total;
                let barColor = 'bg-teal-700';

                if (activeCategoryFilter === 'water') {
                  currentVal = item.water;
                  barColor = 'bg-blue-600';
                } else if (activeCategoryFilter === 'roads') {
                  currentVal = item.roads;
                  barColor = 'bg-amber-600';
                } else if (activeCategoryFilter === 'drainage') {
                  currentVal = item.drainage;
                  barColor = 'bg-cyan-600';
                }

                const heightPct = Math.max(12, Math.round((currentVal / maxTrendVal) * 100));

                return (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-[10px] font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      {currentVal.toLocaleString()}
                    </span>
                    <div className="w-full bg-slate-200/70 rounded-t-md h-32 flex items-end">
                      <div 
                        style={{ height: `${heightPct}%` }}
                        className={`w-full ${barColor} rounded-t-md transition-all duration-300 hover:brightness-110 relative group`}
                      />
                    </div>
                    <span className="text-[11px] font-mono font-medium text-slate-600">
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Note and Provenance Badge */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/60">
              <span className="italic">
                Demand surge aligns with monsoon (Jun–Aug) for Drainage/Roads & summer (Apr–May) for Drinking Water.
              </span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-200/60 text-slate-700">
                Illustrative projection — demo data
              </span>
            </div>
          </div>
        </div>

        {/* Priority Distribution (Part 15) - 5 cols */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-teal-700" />
              <h3 className="text-sm font-bold text-slate-900">
                Hotspot Priority Distribution
              </h3>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Calculated dynamically from the {priorityStats.total} active hotspots in the current dataset.
            </p>
          </div>

          <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/80 space-y-4">
            {/* Proportional Segmented Bar */}
            <div className="space-y-1.5">
              <div className="h-3.5 w-full bg-slate-200 rounded-full overflow-hidden flex shadow-inner">
                <div 
                  style={{ width: `${Math.max(4, priorityStats.criticalPct)}%` }} 
                  className="bg-rose-600 h-full transition-all" 
                  title={`Critical: ${priorityStats.critical} (${priorityStats.criticalPct}%)`}
                />
                <div 
                  style={{ width: `${Math.max(4, priorityStats.highPct)}%` }} 
                  className="bg-amber-500 h-full transition-all" 
                  title={`High: ${priorityStats.high} (${priorityStats.highPct}%)`}
                />
                <div 
                  style={{ width: `${Math.max(4, priorityStats.mediumPct)}%` }} 
                  className="bg-teal-600 h-full transition-all" 
                  title={`Medium: ${priorityStats.medium} (${priorityStats.mediumPct}%)`}
                />
                <div 
                  style={{ width: `${Math.max(4, priorityStats.lowPct)}%` }} 
                  className="bg-slate-400 h-full transition-all" 
                  title={`Low: ${priorityStats.low} (${priorityStats.lowPct}%)`}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Individual Level Cards */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-rose-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-600" />
                    Critical
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">≥ 80</span>
                </div>
                <div className="text-lg font-bold font-mono text-slate-900">
                  {priorityStats.critical} <span className="text-xs font-normal text-slate-500">({priorityStats.criticalPct}%)</span>
                </div>
                <div className="text-[10px] text-slate-500">Immediate hazard / school access</div>
              </div>

              <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    High
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">60–79</span>
                </div>
                <div className="text-lg font-bold font-mono text-slate-900">
                  {priorityStats.high} <span className="text-xs font-normal text-slate-500">({priorityStats.highPct}%)</span>
                </div>
                <div className="text-[10px] text-slate-500">Severe deficit / drinking water</div>
              </div>

              <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-teal-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal-600" />
                    Medium
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">40–59</span>
                </div>
                <div className="text-lg font-bold font-mono text-slate-900">
                  {priorityStats.medium} <span className="text-xs font-normal text-slate-500">({priorityStats.mediumPct}%)</span>
                </div>
                <div className="text-[10px] text-slate-500">Planned connectivity upgrade</div>
              </div>

              <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                    Low
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">&lt; 40</span>
                </div>
                <div className="text-lg font-bold font-mono text-slate-900">
                  {priorityStats.low} <span className="text-xs font-normal text-slate-500">({priorityStats.lowPct}%)</span>
                </div>
                <div className="text-[10px] text-slate-500">Routine maintenance schedule</div>
              </div>
            </div>

            {/* AI Caveat (Part 17) */}
            <div className="p-2.5 rounded-lg bg-teal-50/70 border border-teal-200/60 text-[11px] text-teal-950 flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
              <span>
                AI-assisted decision support. Final prioritization requires human, engineering, budgetary and government review.
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
