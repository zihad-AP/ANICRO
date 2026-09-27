import React, { useState, useMemo } from 'react';
import { 
  Camera, 
  ArrowRight, 
  MapPin, 
  Filter, 
  ShieldCheck, 
  ChevronRight,
  Sparkles,
  Search
} from 'lucide-react';
import { DEMAND_HOTSPOTS } from '../data/mockDemandIntelligence';

export default function PriorityQueueTable({ 
  items = DEMAND_HOTSPOTS,
  onReviewHotspot = () => {}
}) {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'critical' | 'high' | 'medium' | 'low'
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Sort deterministically by priority score descending
  const sortedItems = useMemo(() => {
    const list = items && items.length > 0 ? items : DEMAND_HOTSPOTS;
    return [...list].sort((a, b) => {
      const scoreA = Number(a.priorityScore || a.totalScore || 0);
      const scoreB = Number(b.priorityScore || b.totalScore || 0);
      return scoreB - scoreA;
    });
  }, [items]);

  // Counts for filter tabs
  const counts = useMemo(() => {
    let critical = 0;
    let high = 0;
    let medium = 0;
    let low = 0;

    sortedItems.forEach(item => {
      const score = Number(item.priorityScore || item.totalScore || 0);
      const sev = (item.severity || item.priorityLevel || '').toLowerCase();
      if (sev.includes('crit') || score >= 85) critical++;
      else if (sev.includes('high') || score >= 70) high++;
      else if (sev.includes('med') || score >= 50) medium++;
      else low++;
    });

    return { total: sortedItems.length, critical, high, medium, low };
  }, [sortedItems]);

  // 2. Filter rows based on active filter and optional search query
  const filteredRows = useMemo(() => {
    return sortedItems.filter(item => {
      const score = Number(item.priorityScore || item.totalScore || 0);
      const sev = (item.severity || item.priorityLevel || '').toLowerCase();

      // Severity match
      if (activeFilter === 'critical' && !(sev.includes('crit') || score >= 85)) return false;
      if (activeFilter === 'high' && !(sev.includes('high') || (score >= 70 && score < 85))) return false;
      if (activeFilter === 'medium' && !(sev.includes('med') || (score >= 50 && score < 70))) return false;
      if (activeFilter === 'low' && !(sev.includes('low') || score < 50)) return false;

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches = 
          (item.name || '').toLowerCase().includes(q) ||
          (item.title || '').toLowerCase().includes(q) ||
          (item.location || '').toLowerCase().includes(q) ||
          (item.district || '').toLowerCase().includes(q) ||
          (item.state || '').toLowerCase().includes(q) ||
          (item.category || '').toLowerCase().includes(q) ||
          (item.primaryCategory || '').toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    });
  }, [sortedItems, activeFilter, searchQuery]);

  const getSeverityBadge = (severity, score) => {
    const s = (severity || '').toUpperCase();
    const sc = Number(score || 0);
    if (s.includes('CRIT') || sc >= 93) {
      return (
        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-50 text-rose-800 border border-rose-200">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
          CRITICAL ({sc || 94})
        </span>
      );
    }
    if (s.includes('HIGH') || sc >= 80) {
      return (
        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
          HIGH ({sc || 91})
        </span>
      );
    }
    if (s.includes('MED') || sc >= 50) {
      return (
        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
          MEDIUM ({sc || 76})
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
        LOW ({sc || 32})
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col">
      
      {/* Interactive Filter Command Bar */}
      <div className="p-3.5 sm:p-4 border-b border-slate-200 bg-slate-50/60 flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Severity Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 mr-1 hidden sm:inline">
            Filters:
          </span>

          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`text-xs px-3 py-1 rounded-lg font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              activeFilter === 'all'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>All</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
              activeFilter === 'all' ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-600'
            }`}>
              {counts.total}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('critical')}
            className={`text-xs px-3 py-1 rounded-lg font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              activeFilter === 'critical'
                ? 'bg-rose-800 text-white shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span>Critical</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
              activeFilter === 'critical' ? 'bg-rose-900 text-rose-100' : 'bg-slate-100 text-slate-600'
            }`}>
              {counts.critical}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('high')}
            className={`text-xs px-3 py-1 rounded-lg font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              activeFilter === 'high'
                ? 'bg-amber-700 text-white shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>High</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
              activeFilter === 'high' ? 'bg-amber-800 text-amber-100' : 'bg-slate-100 text-slate-600'
            }`}>
              {counts.high}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('medium')}
            className={`text-xs px-3 py-1 rounded-lg font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              activeFilter === 'medium'
                ? 'bg-blue-800 text-white shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>Medium</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
              activeFilter === 'medium' ? 'bg-blue-900 text-blue-100' : 'bg-slate-100 text-slate-600'
            }`}>
              {counts.medium}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('low')}
            className={`text-xs px-3 py-1 rounded-lg font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              activeFilter === 'low'
                ? 'bg-slate-700 text-white shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            <span>Low</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
              activeFilter === 'low' ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-600'
            }`}>
              {counts.low}
            </span>
          </button>
        </div>

        {/* Quick Filter Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search state, city, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 transition-all"
          />
        </div>

      </div>

      {/* Main Table View */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-600">
              <th className="py-3 px-4 w-12 text-center">#</th>
              <th className="py-3 px-4">Infrastructure Need</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Priority</th>
              <th className="py-3 px-4 text-center">Evidence</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {filteredRows.length > 0 ? (
              filteredRows.map((item, idx) => {
                const rank = String(idx + 1).padStart(2, '0');
                const evidenceCount = item.evidenceCount || item.citizenEvidenceCount || 12;
                const statusText = item.status || item.currentStatus || item.governmentStatus || 'Needs Government Review';

                return (
                  <tr 
                    key={item.id} 
                    className="hover:bg-teal-50/30 transition-colors group"
                  >
                    {/* # Rank Index */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-400 text-center tabular-nums">
                      {rank}
                    </td>

                    {/* Infrastructure Need */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-slate-900 group-hover:text-teal-900 transition-colors">
                            {item.category || item.primaryCategory || item.standardizedProblem || item.name}
                          </span>
                          <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                            {item.primaryCategory || item.category || 'Civil Works'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1 max-w-md">
                          {item.name || item.title}
                        </p>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="font-medium truncate max-w-[180px] sm:max-w-xs">
                          {item.district || item.locality || item.location}, {item.state}
                        </span>
                      </div>
                    </td>

                    {/* Priority Badge */}
                    <td className="py-3.5 px-4 shrink-0 whitespace-nowrap">
                      {getSeverityBadge(item.severity || item.priorityLevel, item.priorityScore)}
                    </td>

                    {/* Evidence */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-mono font-medium">
                        <Camera className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                        <span className="tabular-nums font-bold">{evidenceCount}</span>
                        <span className="text-[10px] text-slate-400">photos</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-teal-50 text-teal-900 text-[11px] font-mono font-medium border border-teal-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                        <span className="truncate max-w-[150px]">{statusText}</span>
                      </span>
                    </td>

                    {/* Action: Review -> opens detail modal */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onReviewHotspot(item)}
                        className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 transition-colors cursor-pointer group-hover:shadow-2xs"
                      >
                        <span>Review</span>
                        <ChevronRight className="w-3.5 h-3.5 text-teal-700 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="py-10 text-center text-slate-500">
                  <div className="max-w-sm mx-auto space-y-2">
                    <Filter className="w-6 h-6 mx-auto text-slate-400" />
                    <div className="text-xs font-semibold text-slate-800">
                      No infrastructure needs found
                    </div>
                    <p className="text-[11px] text-slate-500">
                      No priority items match the filter "{activeFilter}". Try selecting "All" or clearing the search query.
                    </p>
                    <button
                      type="button"
                      onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}
                      className="px-3 py-1 rounded bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700 cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer with Deterministic Provenance */}
      <div className="py-2.5 px-4 bg-slate-50/70 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
        <span className="font-mono">
          Showing {filteredRows.length} of {sortedItems.length} prioritized corridors • Deterministic 6-Factor Model
        </span>
        <span className="text-[11px] font-mono text-teal-900 font-medium">
          Click "Review →" on any item to inspect explainable factors & Gemini AI reasoning
        </span>
      </div>

    </div>
  );
}
