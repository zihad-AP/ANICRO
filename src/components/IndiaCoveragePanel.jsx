import React from 'react';
import { 
  Globe, 
  MapPin, 
  Layers, 
  Building2, 
  CheckCircle2, 
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';
import { INDIAN_STATES_META, DEMAND_CATEGORIES } from '../data/mockDemandIntelligence';

export default function IndiaCoveragePanel({
  selectedState = 'ALL',
  onSelectState = () => {},
  hotspots = [],
  className = ''
}) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50/50">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-teal-50 text-teal-800 border border-teal-200">
              <Globe className="w-3.5 h-3.5 text-teal-700" />
            </span>
            <h3 className="text-base font-bold text-slate-900">
              India-Wide Civic Demand Coverage
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 font-normal">
            Multi-tier consolidation of fragmented citizen demand across 10 priority states, 48 districts, and 9 regional vernacular languages.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-teal-900 bg-teal-50 border border-teal-200 px-3 py-1.5 rounded-xl shrink-0">
          <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
          <span>10 STATES • NATIONWIDE PROTOCOL</span>
        </div>
      </div>

      {/* 10-State Cards Grid */}
      <div className="p-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {INDIAN_STATES_META.map((st) => {
            const stateHotspots = hotspots.filter(h => h.stateId === st.id || h.state === st.name);
            const totalReports = stateHotspots.reduce((acc, h) => acc + (h.requestCount || 0), 0);
            const isSelected = selectedState === st.id;

            return (
              <button
                key={st.id}
                type="button"
                onClick={() => onSelectState(isSelected ? 'ALL' : st.id)}
                className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between space-y-2.5 ${
                  isSelected
                    ? 'bg-teal-900 text-white border-teal-900 shadow-xs ring-2 ring-teal-700/20'
                    : 'bg-slate-50/70 hover:bg-slate-100/70 border-slate-200 text-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-teal-800 text-teal-100' : 'bg-white border border-slate-200 text-slate-600'
                    }`}>
                      {st.id}
                    </span>
                    <span className={`text-[11px] font-mono font-semibold ${isSelected ? 'text-teal-200' : 'text-teal-800'}`}>
                      {stateHotspots.length} {stateHotspots.length === 1 ? 'cluster' : 'clusters'}
                    </span>
                  </div>

                  <h5 className="text-xs sm:text-sm font-bold mt-1.5 truncate">
                    {st.name}
                  </h5>
                  <span className={`text-[10px] block truncate ${isSelected ? 'text-teal-200' : 'text-slate-400'}`}>
                    Cap: {st.capital}
                  </span>
                </div>

                <div className={`pt-2 border-t text-[11px] font-mono flex items-center justify-between ${
                  isSelected ? 'border-teal-800 text-teal-100' : 'border-slate-200 text-slate-600'
                }`}>
                  <span>Reports:</span>
                  <span className="font-bold">{totalReports > 0 ? totalReports.toLocaleString() : '1,240'}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Categories Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-medium text-slate-700 mr-1">Domains Covered:</span>
            {DEMAND_CATEGORIES.slice(0, 6).map((cat, i) => (
              <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px]">
                {cat}
              </span>
            ))}
            <span className="text-[11px] text-slate-400 font-mono">+3 more</span>
          </div>

          <span className="text-[11px] text-slate-400 font-mono shrink-0">
            * Prototype Dataset: Simulated Indian public records & citizen co-reports
          </span>
        </div>
      </div>
    </div>
  );
}
