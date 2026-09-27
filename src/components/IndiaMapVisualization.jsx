import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Layers, 
  Sparkles, 
  ChevronRight, 
  AlertCircle, 
  Building2, 
  CheckCircle2,
  Users,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { INDIAN_STATES_META } from '../data/mockDemandIntelligence';

export default function IndiaMapVisualization({
  hotspots = [],
  selectedState = 'ALL',
  onSelectState = () => {},
  selectedHotspot = null,
  onSelectHotspot = () => {},
  className = ''
}) {
  const [hoveredHotspot, setHoveredHotspot] = useState(null);

  // Filter hotspots by selected state
  const filteredHotspots = useMemo(() => {
    if (!selectedState || selectedState === 'ALL') {
      return hotspots;
    }
    return hotspots.filter(h => h.stateId === selectedState || h.state === selectedState);
  }, [hotspots, selectedState]);

  // Active preview item is selectedHotspot || hoveredHotspot || first filtered hotspot
  const activePreview = hoveredHotspot || selectedHotspot || filteredHotspots[0] || null;

  // Severity color helper
  const getSeverityStyle = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return {
          bg: 'bg-rose-500',
          ring: 'ring-rose-200',
          badge: 'bg-rose-50 text-rose-700 border-rose-200',
          dot: 'bg-rose-500'
        };
      case 'high':
        return {
          bg: 'bg-amber-500',
          ring: 'ring-amber-200',
          badge: 'bg-amber-50 text-amber-700 border-amber-200',
          dot: 'bg-amber-500'
        };
      default:
        return {
          bg: 'bg-teal-600',
          ring: 'ring-teal-200',
          badge: 'bg-teal-50 text-teal-700 border-teal-200',
          dot: 'bg-teal-600'
        };
    }
  };

  return (
    <div className={`bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden flex flex-col ${className}`}>
      {/* Visualizer Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50/50">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-teal-50 text-teal-800 border border-teal-200/60">
              <Compass className="w-3.5 h-3.5 text-teal-700" />
            </span>
            <h3 className="text-sm sm:text-base font-semibold text-slate-900">
              Pan-India Infrastructure Demand Hotspots
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200">
              SIMULATED DEMO DATA
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Geographic clustering of citizen voice reports across 10 priority states into evidence-backed municipal need corridors.
          </p>
        </div>

        {/* State Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => onSelectState('ALL')}
            className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all shrink-0 cursor-pointer ${
              selectedState === 'ALL'
                ? 'bg-teal-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            All States ({hotspots.length})
          </button>
          {INDIAN_STATES_META.map((st) => {
            const count = hotspots.filter(h => h.stateId === st.id).length;
            const isSelected = selectedState === st.id;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => onSelectState(isSelected ? 'ALL' : st.id)}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-teal-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{st.name}</span>
                <span className={`text-[10px] px-1 py-0.2 rounded font-mono ${
                  isSelected ? 'bg-teal-800 text-teal-100' : 'bg-slate-100 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Map + Side Inspector Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
        {/* Map Canvas (8 cols on lg) */}
        <div className="lg:col-span-7 xl:col-span-8 p-4 sm:p-6 bg-slate-900 relative overflow-hidden flex items-center justify-center select-none">
          {/* Subtle Grid Backdrop */}
          <div 
            className="absolute inset-0 opacity-10" 
            style={{
              backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Map Compass & Legend */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
            <div className="bg-slate-800/90 backdrop-blur-xs border border-slate-700/80 px-2.5 py-1.5 rounded-lg text-[11px] text-slate-300 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span>LIVE CLUSTERS: {filteredHotspots.length}</span>
            </div>
            <div className="bg-slate-800/80 backdrop-blur-xs border border-slate-700/60 p-2 rounded-lg text-[10px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>Critical Severity (85-100)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>High Severity (75-84)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-500" />
                <span>Medium Priority</span>
              </div>
            </div>
          </div>

          {/* Map Coordinate Scale / Bounding Box */}
          <div className="w-full max-w-[540px] aspect-[4/5] relative my-auto">
            {/* Stylized SVG India Contour Outline */}
            <svg 
              viewBox="0 0 100 100" 
              className="w-full h-full text-slate-800 fill-current stroke-slate-700/70 stroke-[0.4]"
            >
              {/* Generalized Representative Outline of Indian Subcontinent */}
              <path
                d="M 32,15 
                   C 36,12 45,10 48,15 
                   C 50,18 55,20 58,22 
                   C 63,22 70,24 73,28 
                   C 78,30 84,33 86,38 
                   C 88,44 80,45 78,48 
                   C 75,51 76,55 74,58 
                   C 72,60 67,61 63,60 
                   C 60,61 58,65 54,68 
                   C 50,72 48,78 44,86 
                   C 42,90 40,94 38,96 
                   C 37,94 35,88 34,82 
                   C 33,76 33,68 33,62 
                   C 31,56 26,53 23,50 
                   C 19,48 18,44 20,40 
                   C 22,36 28,34 30,30 
                   C 32,26 31,20 32,15 Z"
              />
              {/* Regional demarcation guidelines */}
              <path d="M 23,50 Q 40,48 74,58" fill="none" stroke="rgba(255,255,255,0.06)" strokeDasharray="1 1" />
              <path d="M 32,32 Q 52,34 78,48" fill="none" stroke="rgba(255,255,255,0.06)" strokeDasharray="1 1" />
              <path d="M 33,62 Q 44,70 54,68" fill="none" stroke="rgba(255,255,255,0.06)" strokeDasharray="1 1" />
            </svg>

            {/* State Anchor Labels */}
            {INDIAN_STATES_META.map((st) => {
              const isSelected = selectedState === st.id;
              const hasItems = hotspots.some(h => h.stateId === st.id);
              if (!hasItems) return null;

              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => onSelectState(isSelected ? 'ALL' : st.id)}
                  style={{ left: `${st.mapX}%`, top: `${st.mapY}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-400 text-slate-950 font-bold shadow-md z-20 scale-110'
                      : 'text-slate-400/80 hover:text-white hover:bg-slate-800/80 z-10'
                  }`}
                >
                  {st.name}
                </button>
              );
            })}

            {/* Interactive Hotspot Markers */}
            {filteredHotspots.map((hotspot) => {
              const x = hotspot.coordinates?.mapX ?? 50;
              const y = hotspot.coordinates?.mapY ?? 50;
              const isSelected = selectedHotspot?.id === hotspot.id;
              const isHovered = hoveredHotspot?.id === hotspot.id;
              const style = getSeverityStyle(hotspot.severity);

              return (
                <div
                  key={hotspot.id}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                  onMouseEnter={() => setHoveredHotspot(hotspot)}
                  onMouseLeave={() => setHoveredHotspot(null)}
                  onClick={() => onSelectHotspot(hotspot)}
                >
                  {/* Outer Pulsing Aura for Selected or High Score */}
                  {(isSelected || hotspot.priorityScore >= 90) && (
                    <span 
                      className={`absolute -inset-2 rounded-full animate-ping opacity-40 ${style.bg}`}
                    />
                  )}

                  {/* Marker Button */}
                  <button
                    type="button"
                    className={`relative flex items-center gap-1 px-1.5 py-0.5 rounded-full border shadow-lg transition-transform cursor-pointer ${
                      isSelected || isHovered
                        ? `${style.bg} text-white border-white scale-125 z-30 ring-2 ring-white/30`
                        : 'bg-slate-800/90 text-slate-200 border-slate-600 hover:scale-110 hover:border-slate-300'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected || isHovered ? 'bg-white' : style.dot}`} />
                    <span className="text-[10px] font-mono font-bold leading-none">
                      {hotspot.priorityScore}
                    </span>
                  </button>

                  {/* Floating Micro-Badge on Hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:flex flex-col items-center pointer-events-none z-40 whitespace-nowrap">
                    <div className="bg-slate-950 text-white border border-slate-700 px-2 py-1 rounded shadow-xl text-[10px] space-y-0.5">
                      <div className="font-semibold text-slate-100">{hotspot.name}</div>
                      <div className="text-slate-400 font-mono text-[9px] flex items-center gap-1.5">
                        <span>{hotspot.district}</span>
                        <span>•</span>
                        <span className="text-teal-400">{hotspot.requestCount?.toLocaleString()} reports</span>
                      </div>
                    </div>
                    <div className="w-1.5 h-1.5 bg-slate-950 border-r border-b border-slate-700 rotate-45 -mt-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Side Inspector: Active Hotspot Deep Dive (4-5 cols on lg) */}
        <div className="lg:col-span-5 xl:col-span-4 p-5 sm:p-6 bg-white border-t lg:border-t-0 lg:border-l border-slate-200/80 flex flex-col justify-between space-y-5">
          {activePreview ? (
            <div className="space-y-4">
              {/* Header & Badges */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-[11px] font-semibold text-teal-800 uppercase tracking-wider font-mono">
                    {activePreview.state} • {activePreview.district}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {activePreview.category}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getSeverityStyle(activePreview.severity).badge}`}>
                      {activePreview.severity}
                    </span>
                  </div>
                </div>
                <h4 className="text-base font-bold text-slate-900 leading-snug">
                  {activePreview.name}
                </h4>
                <p className="text-xs text-slate-600 line-clamp-2">
                  {activePreview.infrastructureGap}
                </p>
              </div>

              {/* Priority Score Hero Pill */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 grid grid-cols-3 gap-2 text-center">
                <div className="space-y-0.5 border-r border-slate-200 pr-2 text-left">
                  <div className="text-[9px] font-medium text-slate-500 uppercase tracking-wide">
                    Priority Score
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold font-mono text-slate-900">
                      {activePreview.priorityScore}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 font-medium">/ 100</span>
                  </div>
                </div>

                <div className="space-y-0.5 border-r border-slate-200 px-1 text-center">
                  <div className="text-[9px] text-slate-500 font-medium uppercase">Reports</div>
                  <div className="text-xs font-bold font-mono text-teal-900">
                    {activePreview.requestCount?.toLocaleString()}
                  </div>
                </div>

                <div className="space-y-0.5 pl-1 text-right">
                  <div className="text-[9px] text-slate-500 font-medium uppercase">Population</div>
                  <div className="text-xs font-bold font-mono text-slate-900 truncate">
                    {activePreview.affectedPopulation || activePreview.populationImpact || '120k+'}
                  </div>
                </div>
              </div>

              {/* 5-Factor Mini Breakdown */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-700 uppercase tracking-wider text-[10px]">
                    5-Factor Evaluation Breakdown
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Weighted Total</span>
                </div>

                <div className="space-y-1.5 text-xs">
                  {activePreview.scoreBreakdown && (
                    <>
                      <div className="flex items-center justify-between py-1 px-2 rounded bg-slate-50/70 border border-slate-100">
                        <span className="text-slate-600 truncate">1. Citizen Demand (30%)</span>
                        <span className="font-mono font-bold text-slate-900 ml-2">
                          {activePreview.scoreBreakdown.demandScore} / 30
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1 px-2 rounded bg-slate-50/70 border border-slate-100">
                        <span className="text-slate-600 truncate">2. Problem Severity (25%)</span>
                        <span className="font-mono font-bold text-slate-900 ml-2">
                          {activePreview.scoreBreakdown.severityScore} / 25
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1 px-2 rounded bg-slate-50/70 border border-slate-100">
                        <span className="text-slate-600 truncate">3. Population Impact (20%)</span>
                        <span className="font-mono font-bold text-slate-900 ml-2">
                          {activePreview.scoreBreakdown.populationScore} / 20
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1 px-2 rounded bg-slate-50/70 border border-slate-100">
                        <span className="text-slate-600 truncate">4. Infrastructure Deficit (15%)</span>
                        <span className="font-mono font-bold text-slate-900 ml-2">
                          {activePreview.scoreBreakdown.gapScore} / 15
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1 px-2 rounded bg-slate-50/70 border border-slate-100">
                        <span className="text-slate-600 truncate">5. Time Urgency (10%)</span>
                        <span className="font-mono font-bold text-slate-900 ml-2">
                          {activePreview.scoreBreakdown.urgencyScore} / 10
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Recommended Project or Action Callout */}
              {(activePreview.recommendedProject || activePreview.recommendedAction) && (
                <div className="p-3 rounded-lg bg-teal-50/60 border border-teal-200/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-teal-900 uppercase">
                    <Building2 className="w-3.5 h-3.5 text-teal-700" />
                    <span>AI Recommended Municipal Action</span>
                  </div>
                  <div className="text-xs font-bold text-teal-950">
                    {activePreview.recommendedProject?.title || activePreview.recommendedAction || 'Commission capital civil upgrade'}
                  </div>
                  <div className="text-[11px] text-teal-800 flex items-center justify-between font-mono">
                    <span>{activePreview.recommendedProject?.estimatedBudget ? `Est. Budget: ${activePreview.recommendedProject.estimatedBudget}` : `Domain: ${activePreview.recommendedDomain || activePreview.category}`}</span>
                    <span className="px-1.5 py-0.5 rounded bg-teal-100 text-teal-900 text-[10px] font-sans font-medium">
                      {activePreview.governmentStatus || 'Under Review'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs my-auto">
              Select or hover over any hotspot on the map to inspect its explainable intelligence breakdown.
            </div>
          )}

          {/* Action Trigger Button */}
          {activePreview && (
            <div className="pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => onSelectHotspot(activePreview)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-900 hover:bg-teal-950 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <span>Inspect Full 6-Stage Hotspot Lifecycle</span>
                <ChevronRight className="w-4 h-4 text-teal-200" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
