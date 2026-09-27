import React from 'react';
import { Sparkles, Info } from 'lucide-react';
import Card from './Card';

export default function PriorityCard({
  score = 91,
  maxScore = 100,
  title = 'ANTICRO Demo Priority Model',
  subtitle = 'Illustrative scoring for prototype demonstration — not an official government allocation formula.',
  explanation = 'High citizen demand combined with critical monsoon inundation risk, severe subterranean drainage deficit, and school corridor transit disruption.',
  breakdown = null,
  factors = null,
  className = ''
}) {
  // Helper to resolve score whether provided as 0-100 index or raw weighted points
  const resolveFactorScore = (val, maxPts, fallbackFraction) => {
    if (val === undefined || val === null) {
      return Math.round(score * fallbackFraction);
    }
    if (val > maxPts) {
      return Math.round((val / 100) * maxPts);
    }
    return val;
  };

  // 6-Factor Transparent Priority Model:
  // Demand 25%, Severity 20%, Population 20%, Gap 15%, Evidence 10%, Trend 10%
  const resolvedFactors = factors || (breakdown ? [
    {
      label: 'Citizen Demand Volume',
      weight: '25%',
      score: resolveFactorScore(breakdown.demandScore, 25, 0.25),
      max: 25,
      note: breakdown.demandNote || 'Density and count of verified citizen submissions'
    },
    {
      label: 'Problem Severity & Risk',
      weight: '20%',
      score: resolveFactorScore(breakdown.severityScore, 20, 0.20),
      max: 20,
      note: breakdown.severityNote || 'Structural safety, hazard level & flooding cutoff'
    },
    {
      label: 'Affected Population & Access',
      weight: '20%',
      score: resolveFactorScore(breakdown.populationScore, 20, 0.20),
      max: 20,
      note: breakdown.populationNote || 'Scale of public disruption across schools and clinics'
    },
    {
      label: 'Infrastructure Deficit / Gap',
      weight: '15%',
      score: resolveFactorScore(breakdown.gapScore, 15, 0.15),
      max: 15,
      note: breakdown.gapNote || 'Measured physical deficit in municipal capacity'
    },
    {
      label: 'Evidence Strength & Quality',
      weight: '10%',
      score: resolveFactorScore(breakdown.evidenceScore, 10, 0.10),
      max: 10,
      note: breakdown.evidenceNote || 'Ground photos, depth measurements & telemetry'
    },
    {
      label: 'Recent Demand Trend',
      weight: '10%',
      score: resolveFactorScore(breakdown.trendScore, 10, 0.10),
      max: 10,
      note: breakdown.trendNote || 'Accelerating co-reports ahead of seasonal monsoon'
    }
  ] : [
    {
      label: 'Citizen Demand Volume',
      weight: '25%',
      score: 24,
      max: 25,
      note: '2,340 verified citizen co-reports across 67 locations'
    },
    {
      label: 'Problem Severity & Risk',
      weight: '20%',
      score: 19,
      max: 20,
      note: 'Critical monsoon waterlogging and road cutoff'
    },
    {
      label: 'Affected Population & Access',
      weight: '20%',
      score: 18,
      max: 20,
      note: '45,000 residents and school access corridor'
    },
    {
      label: 'Infrastructure Deficit / Gap',
      weight: '15%',
      score: 14,
      max: 15,
      note: '82% subterranean stormwater conduit deficit'
    },
    {
      label: 'Evidence Strength & Quality',
      weight: '10%',
      score: 9,
      max: 10,
      note: '512 shielded ground photos and citizen logs'
    },
    {
      label: 'Recent Demand Trend',
      weight: '10%',
      score: 9,
      max: 10,
      note: '+31% increase in submissions over 60 days'
    }
  ]);

  const displayScore = breakdown?.total ?? score;

  return (
    <Card padding="p-5 sm:p-6" className={`space-y-5 ${className}`}>
      {/* Header & Score */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800">
            <Sparkles className="w-4 h-4 text-teal-700" />
            <span>{title}</span>
          </div>
          <p className="text-xs text-slate-500 font-normal leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="flex items-baseline gap-1.5 bg-teal-50/70 border border-teal-200/80 px-4 py-2 rounded-xl shrink-0 self-start sm:self-auto">
          <span className="text-2xl sm:text-3xl font-bold font-mono text-teal-900 tracking-tight">
            {displayScore}
          </span>
          <span className="text-xs font-mono text-teal-700 font-medium">
            / {maxScore}
          </span>
        </div>
      </div>

      {/* Explanation Box */}
      {explanation && (
        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/70 text-xs text-slate-700 leading-relaxed font-normal">
          <strong className="font-semibold text-slate-900 block mb-0.5">Priority Rationale:</strong>
          {explanation}
        </div>
      )}

      {/* 6-Factor Breakdown Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-800 tracking-wide uppercase text-[10px]">
            Weighted Factor Breakdown ({resolvedFactors.length} Dimensions)
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            Σ = 100 max points
          </span>
        </div>
        <div className="space-y-2.5">
          {resolvedFactors.map((factor, idx) => {
            const pct = Math.round((factor.score / factor.max) * 100);
            return (
              <div
                key={idx}
                className="p-2.5 sm:p-3 rounded-lg border border-slate-100 bg-slate-50/50 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-medium text-slate-700 truncate">{factor.label}</span>
                    {factor.weight && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono shrink-0">
                        {factor.weight}
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-slate-900 font-semibold shrink-0 ml-2">
                    {factor.score} <span className="text-slate-400 font-normal">/ {factor.max}</span>
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-teal-700 h-full rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                {factor.note && (
                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    {factor.note}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Regulatory Safety Disclaimer */}
      <div className="pt-3 border-t border-slate-100 flex items-start gap-2 text-[11px] text-slate-500 font-normal">
        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
        <span>
          Decision-support model for human capital planning, not an automatic statutory determination.
        </span>
      </div>
    </Card>
  );
}

