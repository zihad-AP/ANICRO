import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Users, 
  Sparkles, 
  Building, 
  FileText, 
  ShieldCheck, 
  TrendingUp, 
  Compass, 
  ChevronRight,
  Info
} from 'lucide-react';
import { DEMAND_HOTSPOTS, PRIORITY_RECOMMENDATIONS } from '../data/mockDemandIntelligence';

export default function InfrastructureIntelligenceSection({ 
  demands, 
  onOpenReportNeed, 
  currentRole 
}) {
  const [selectedHotspotId, setSelectedHotspotId] = useState(DEMAND_HOTSPOTS[0].id);
  const selectedHotspot = DEMAND_HOTSPOTS.find(h => h.id === selectedHotspotId) || DEMAND_HOTSPOTS[0];

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono font-medium bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded">
              BRICS Track 1 • DPI & Governance
            </span>
            <span className="text-[10px] font-mono text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
              National Infrastructure Intelligence
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Citizen Demand Aggregation & Infrastructure Gap Intelligence
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed font-normal">
            Synthesizing fragmented community development requests into evidence-backed priority recommendations for public investment.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenReportNeed}
            className="inline-flex items-center space-x-1.5 bg-teal-700 hover:bg-teal-800 text-white font-medium px-3.5 py-2 rounded-lg text-xs shadow-xs transition-colors cursor-pointer"
          >
            <span>Report a Development Need</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Intelligence Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-soft space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">Logged Demands</span>
            <Users className="w-4 h-4 text-teal-700" />
          </div>
          <div className="text-xl font-bold text-slate-900 font-mono">1,420+</div>
          <div className="text-[11px] text-slate-500">Across 9 infrastructure categories</div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-soft space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">Demand Hotspots</span>
            <MapPin className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-xl font-bold text-slate-900 font-mono">3 Clusters</div>
          <div className="text-[11px] text-slate-500">Geographic concentrations</div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-soft space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">Top Priority Score</span>
            <Sparkles className="w-4 h-4 text-teal-800" />
          </div>
          <div className="text-xl font-bold text-teal-800 font-mono">91 / 100</div>
          <div className="text-[11px] text-slate-500">Sector 4-B Drainage Deficit</div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-soft space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">Tracked Projects</span>
            <Layers className="w-4 h-4 text-slate-600" />
          </div>
          <div className="text-xl font-bold text-slate-900 font-mono">Commissioned</div>
          <div className="text-[11px] text-slate-500">Linked to Project Accountability</div>
        </div>
      </div>

      {/* Grid: Demand Hotspots + Explainable Priority Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Regional Demand Hotspots (5 cols) */}
        <div className="lg:col-span-5 space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-semibold text-sm text-slate-900">
                Regional Demand Hotspots
              </h3>
              <p className="text-[11px] text-slate-500">
                Clustered geographic concentrations of citizen infrastructure requests
              </p>
            </div>
            <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              Regional Clustering
            </span>
          </div>

          <div className="space-y-2.5">
            {DEMAND_HOTSPOTS.map((hotspot) => {
              const isSelected = hotspot.id === selectedHotspotId;
              return (
                <div
                  key={hotspot.id}
                  onClick={() => setSelectedHotspotId(hotspot.id)}
                  className={`p-4 rounded-xl border transition-colors cursor-pointer text-xs space-y-2.5 ${
                    isSelected 
                      ? 'bg-white border-teal-700 shadow-soft' 
                      : 'bg-white hover:bg-slate-50 border-slate-200 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        hotspot.primaryCategory === 'Drainage' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                        hotspot.primaryCategory === 'Roads' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                        'bg-slate-100 text-slate-800 border border-slate-200'
                      }`}>
                        {hotspot.primaryCategory}
                      </span>
                      <span className="text-[11px] text-slate-400 font-normal">
                        {hotspot.district}
                      </span>
                    </div>

                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${
                      hotspot.priorityLevel === 'Critical' ? 'bg-rose-50 text-rose-800 border-rose-200' :
                      hotspot.priorityLevel === 'High' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                      'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {hotspot.priorityLevel} Priority
                    </span>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">
                      {hotspot.region}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                      {hotspot.infrastructureGap}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
                    <span className="text-slate-600 font-medium">
                      <strong>{hotspot.requestCount}</strong> citizen co-reports
                    </span>
                    <span className="font-mono text-teal-800 font-semibold">
                      Score: {hotspot.priorityScore}/100
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Explainable Priority Engine (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                  Prototype Priority Score
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Demo Decision Model</span>
              </div>
              <h3 className="font-semibold text-base text-slate-900">
                Score Analysis: {selectedHotspot.region}
              </h3>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-teal-800 font-mono">
                {selectedHotspot.priorityScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
              </div>
              <span className="text-[10px] font-medium text-slate-500 block">Overall Priority Level</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            <strong>AI Rationale:</strong> {selectedHotspot.explanation}
          </p>

          {/* Explainable Factor Breakdown */}
          <div className="space-y-2 pt-1">
            <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider block">
              Explainable Score Factor Breakdown (Rule #12 & #13)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700 font-medium">1. Citizen Demand Density</span>
                  <span className="font-mono font-semibold text-slate-900">{selectedHotspot.scoreBreakdown.citizenDemand.score} / {selectedHotspot.scoreBreakdown.citizenDemand.max}</span>
                </div>
                <p className="text-[10px] text-slate-500">{selectedHotspot.scoreBreakdown.citizenDemand.note}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700 font-medium">2. Population Impact</span>
                  <span className="font-mono font-semibold text-slate-900">{selectedHotspot.scoreBreakdown.populationImpact.score} / {selectedHotspot.scoreBreakdown.populationImpact.max}</span>
                </div>
                <p className="text-[10px] text-slate-500">{selectedHotspot.scoreBreakdown.populationImpact.note}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700 font-medium">3. Infrastructure Gap Severity</span>
                  <span className="font-mono font-semibold text-slate-900">{selectedHotspot.scoreBreakdown.infrastructureGap.score} / {selectedHotspot.scoreBreakdown.infrastructureGap.max}</span>
                </div>
                <p className="text-[10px] text-slate-500">{selectedHotspot.scoreBreakdown.infrastructureGap.note}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700 font-medium">4. Coverage Deficit</span>
                  <span className="font-mono font-semibold text-slate-900">{selectedHotspot.scoreBreakdown.existingCoverage.score} / {selectedHotspot.scoreBreakdown.existingCoverage.max}</span>
                </div>
                <p className="text-[10px] text-slate-500">{selectedHotspot.scoreBreakdown.existingCoverage.note}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700 font-medium">5. Investment Alignment</span>
                  <span className="font-mono font-semibold text-slate-900">{selectedHotspot.scoreBreakdown.investmentAlignment.score} / {selectedHotspot.scoreBreakdown.investmentAlignment.max}</span>
                </div>
                <p className="text-[10px] text-slate-500">{selectedHotspot.scoreBreakdown.investmentAlignment.note}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700 font-medium">6. Ground Evidence Corroboration</span>
                  <span className="font-mono font-semibold text-slate-900">{selectedHotspot.scoreBreakdown.evidenceStrength.score} / {selectedHotspot.scoreBreakdown.evidenceStrength.max}</span>
                </div>
                <p className="text-[10px] text-slate-500">{selectedHotspot.scoreBreakdown.evidenceStrength.note}</p>
              </div>
            </div>
          </div>

          {/* Connection to Existing Project Accountability */}
          {selectedHotspot.linkedProjectId && (
            <div className="p-3.5 bg-teal-50/60 border border-teal-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="font-semibold text-teal-950 block text-[11px] uppercase tracking-wider">
                  Commissioned Public Project Record
                </span>
                <span className="text-slate-700 font-normal">
                  Citizen demands in this hotspot resulted in active monitored project: <strong>{selectedHotspot.linkedProjectName}</strong>
                </span>
              </div>
              <Link
                to={`/project/${selectedHotspot.linkedProjectId}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-teal-800 hover:text-teal-950 shrink-0 bg-white border border-teal-200 px-3 py-1.5 rounded-md shadow-2xs transition-colors"
              >
                <span>Inspect Project Evidence</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* Transparency Disclaimer */}
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-[10px] text-slate-500 flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span>
              <strong>Methodology Notice:</strong> This is a prototype decision-support score designed for demonstrator evaluation under BRICS Track 1. AI recommendations are explainable and do not substitute statutory municipal procurement approvals.
            </span>
          </div>

        </div>

      </div>

      {/* Recommended Development Priorities for Policymakers */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1">
          <div>
            <div className="text-[10px] font-mono font-medium text-teal-700 uppercase tracking-wider">
              Policymaker Action Queue
            </div>
            <h3 className="font-semibold text-base text-slate-900">
              Recommended Development Priorities
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            Ranked by Prototype Priority Score & Gap Analysis
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PRIORITY_RECOMMENDATIONS.map((rec) => (
            <div
              key={rec.id}
              className="bg-white rounded-xl border border-slate-200 shadow-soft p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                    rec.category === 'Drainage' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                    rec.category === 'Roads' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                    'bg-slate-100 text-slate-800 border border-slate-200'
                  }`}>
                    {rec.category}
                  </span>

                  <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    {rec.priorityScore} / 100
                  </span>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-slate-900 line-clamp-2 leading-snug">
                    {rec.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {rec.region}
                  </p>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {rec.explanation}
                </p>

                <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Citizen Demand</span>
                    <span className="font-semibold text-slate-800">{rec.citizenDemandCount} reports</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Est. Population</span>
                    <span className="font-semibold text-slate-800">{rec.affectedPopulation}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                {rec.linkedProjectId ? (
                  <Link
                    to={`/project/${rec.linkedProjectId}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 font-semibold text-xs py-2 rounded-lg transition-colors"
                  >
                    <span>Inspect Tracked Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <div className="w-full text-center py-2 px-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-600 font-medium">
                    {rec.statusBadge}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Citizen Development Demands Feed */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-sm text-slate-900">
              Recent Citizen Development Demands
            </h3>
            <p className="text-[11px] text-slate-500">
              Incoming citizen submissions undergoing AI structuring and regional clustering
            </p>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {demands.length} Total Submissions
          </span>
        </div>

        <div className="space-y-2.5">
          {demands.slice(0, 4).map((demand) => (
            <div
              key={demand.id}
              className="p-3.5 bg-slate-50/60 rounded-lg border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                    demand.category === 'Drainage' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                    demand.category === 'Roads' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                    'bg-slate-100 text-slate-800 border border-slate-200'
                  }`}>
                    {demand.category}
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">
                    {demand.submittedBy}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {demand.dateSubmitted}
                  </span>
                  <span className="text-[10px] font-mono text-teal-800 bg-teal-50 px-1.5 py-0.2 rounded border border-teal-200">
                    AI Verified: {demand.aiStructuring?.problemType || 'Structured'}
                  </span>
                </div>
                <h4 className="font-semibold text-slate-900 text-xs">
                  {demand.title}
                </h4>
                <p className="text-[11px] text-slate-600 line-clamp-1 font-normal">
                  {demand.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-mono text-slate-600">
                  {demand.location}
                </span>
                <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-medium">
                  {demand.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
