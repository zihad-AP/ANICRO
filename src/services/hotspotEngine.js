// ANTICRO CR-1 — Demand Hotspot Aggregation & Deterministic AI Priority Intelligence Engine
// Connects: Citizen Reports → Standardization → Geographic & Semantic Aggregation → Transparent Priority Reasoning → Government Decision Support

/**
 * Deterministic Priority Scoring Thresholds (Configurable)
 */
export const PRIORITY_THRESHOLDS = {
  CRITICAL: 80,
  HIGH: 60,
  MEDIUM: 40,
  LOW: 0
};

/**
 * 7-Stage Government Review Workflow Statuses
 */
export const GOV_WORKFLOW_STATUSES = [
  'New Signal',
  'Under Review',
  'Validated',
  'Project Proposed',
  'Project Linked',
  'Action Underway',
  'Resolved'
];

/**
 * Government Responsible Departments / Domains
 */
export const GOV_DEPARTMENTS = [
  'Roads & Highways',
  'Urban Development',
  'Water Supply',
  'Public Health',
  'Education Infrastructure',
  'Drainage & Flood Management',
  'Electricity',
  'Sanitation',
  'Public Transport'
];

/**
 * Calculates transparent, deterministic AI priority for an infrastructure hotspot.
 * STEP 6 — 6 Weighted Factors:
 * - Citizen Demand:       25% (normalized 0-100)
 * - Severity:             20% (normalized 0-100)
 * - Affected Population:  20% (normalized 0-100)
 * - Infrastructure Gap:   15% (normalized 0-100)
 * - Evidence Strength:    10% (normalized 0-100)
 * - Recent Trend:         10% (normalized 0-100)
 *
 * Total Score = Math.round(
 *   citizenDemand * 0.25 +
 *   severity * 0.20 +
 *   affectedPopulation * 0.20 +
 *   infrastructureGap * 0.15 +
 *   evidenceStrength * 0.10 +
 *   recentTrend * 0.10
 * )
 *
 * NOTE: Language is strictly "AI PRIORITY RECOMMENDATION", not "AI DECISION".
 * Final prioritization requires human, engineering, budgetary, and government review.
 *
 * @param {Object} hotspot
 * @returns {{
 *   totalScore: number,
 *   level: 'Critical' | 'High' | 'Medium' | 'Low',
 *   factors: {
 *     citizenDemand: number,
 *     severity: number,
 *     affectedPopulation: number,
 *     infrastructureGap: number,
 *     evidenceStrength: number,
 *     recentTrend: number
 *   },
 *   reasoning: string[],
 *   score: number,
 *   why: string[],
 *   whySummary: string,
 *   breakdown: Object
 * }}
 */
export function calculatePriorityScore(hotspot = {}) {
  const reasoning = [];

  // -------------------------------------------------------------
  // 1. Citizen Demand Factor (Weight: 25%)
  // -------------------------------------------------------------
  const reportCount = hotspot.reportCount || hotspot.relatedReportsCount || (hotspot.supportingReportIds?.length) || 1;
  const requestCount = hotspot.requestCount || hotspot.relatedRequests || reportCount;
  let citizenDemand = 40;

  if (requestCount >= 1500 || reportCount >= 35) {
    citizenDemand = 94;
    reasoning.push(`High volume of citizen reports (${reportCount} clustered reports, ${requestCount.toLocaleString()} corridor co-reports)`);
  } else if (requestCount >= 500 || reportCount >= 20) {
    citizenDemand = 84;
    reasoning.push(`Substantial citizen report volume (${reportCount} clustered reports, ${requestCount.toLocaleString()} co-reports)`);
  } else if (requestCount >= 100 || reportCount >= 10) {
    citizenDemand = 72;
    reasoning.push(`Consistent citizen demand (${reportCount} reports across corridor)`);
  } else if (requestCount >= 30 || reportCount >= 5) {
    citizenDemand = 55;
    reasoning.push(`Moderate citizen submissions (${reportCount} reports)`);
  } else if (reportCount >= 2 && requestCount <= 25) {
    citizenDemand = 25;
    reasoning.push(`Few related reports (${reportCount} submissions, ${requestCount} co-reports)`);
  } else {
    citizenDemand = 20;
    reasoning.push('Initial community submission (1-2 reports)');
  }

  // -------------------------------------------------------------
  // 2. Problem Severity Factor (Weight: 20%)
  // -------------------------------------------------------------
  const sev = (hotspot.severity || 'Medium').toLowerCase();
  const services = hotspot.affectedServices || [];
  let severity = 65;

  if (sev.includes('crit')) {
    severity = 96;
    reasoning.push('Critical severity (Acute structural safety hazard or vital lifeline cutoff)');
  } else if (sev.includes('high')) {
    severity = 88;
    // Boost if vulnerable school or healthcare access is affected
    const hasSchool = services.some(s => s.toLowerCase().includes('school'));
    const hasHealth = services.some(s => s.toLowerCase().includes('health') || s.toLowerCase().includes('hospital') || s.toLowerCase().includes('ambulance'));
    const hasSafety = services.some(s => s.toLowerCase().includes('pedestrian') || s.toLowerCase().includes('safety'));

    if (hasSchool && hasSafety) {
      severity = 92;
      reasoning.push('High severity (Monsoon inundation impacting school children and pedestrian safety)');
    } else if (hasHealth) {
      severity = 92;
      reasoning.push('High severity (Emergency healthcare and ambulance access disrupted)');
    } else {
      reasoning.push('High severity (Substantial operational disruption and safety risk)');
    }
  } else if (sev.includes('med')) {
    severity = 68;
    reasoning.push('Medium severity (Manageable public disruption with workaround routes)');
  } else {
    severity = 35;
    reasoning.push('Low severity (Minor localized maintenance or cosmetic impairment)');
  }

  // -------------------------------------------------------------
  // 3. Affected Population Factor (Weight: 20%)
  // -------------------------------------------------------------
  let popNum = 1000;
  if (typeof hotspot.affectedPopulation === 'number') {
    popNum = hotspot.affectedPopulation;
  } else if (typeof hotspot.affectedPopulation === 'string') {
    popNum = parseInt(hotspot.affectedPopulation.replace(/[^0-9]/g, ''), 10) || 1000;
  }

  let affectedPopulation = 60;
  if (sev.includes('low') && popNum <= 2000) {
    affectedPopulation = 35;
    reasoning.push(`Limited local neighborhood impact (${popNum.toLocaleString()} residents)`);
  } else if (popNum >= 25000) {
    affectedPopulation = 95;
    reasoning.push(`Extensive affected population (${popNum.toLocaleString()} estimated residents)`);
  } else if (popNum >= 10000) {
    affectedPopulation = 88;
    reasoning.push(`Large affected population (${popNum.toLocaleString()} estimated residents)`);
  } else if (popNum >= 4000) {
    affectedPopulation = 76;
    reasoning.push(`Significant neighborhood population (${popNum.toLocaleString()} residents impacted)`);
  } else if (popNum >= 1000) {
    affectedPopulation = 55;
    reasoning.push(`Localized community impact (${popNum.toLocaleString()} residents)`);
  } else if (popNum >= 200) {
    affectedPopulation = 40;
    reasoning.push(`Micro-corridor population impact (${popNum.toLocaleString()} residents)`);
  } else {
    affectedPopulation = 25;
    reasoning.push(`Isolated cluster (${popNum.toLocaleString()} residents)`);
  }

  // -------------------------------------------------------------
  // 4. Infrastructure Deficit / Gap Factor (Weight: 15%)
  // -------------------------------------------------------------
  const gapText = `${hotspot.infrastructureGap || ''} ${hotspot.category || ''} ${hotspot.standardizedProblem || ''}`.toLowerCase();
  let infrastructureGap = 65;

  if (gapText.includes('curb') || gapText.includes('sign') || gapText.includes('cosmetic') || gapText.includes('faded') || gapText.includes('chipping')) {
    infrastructureGap = 35;
    reasoning.push('Minor cosmetic or routine municipal maintenance shortfall');
  } else if (gapText.includes('flood') || gapText.includes('drain') || gapText.includes('inundat') || gapText.includes('salin') || gapText.includes('contamin') || gapText.includes('collaps')) {
    infrastructureGap = 95;
    reasoning.push('Severe structural deficit in designed municipal capacity');
  } else if (gapText.includes('road') || gapText.includes('bridge') || gapText.includes('water supply') || gapText.includes('sewage')) {
    infrastructureGap = 82;
    reasoning.push('Documented physical infrastructure capacity shortfall');
  } else if (gapText.includes('paving') || gapText.includes('street light') || gapText.includes('sanitation')) {
    infrastructureGap = 64;
    reasoning.push('Municipal maintenance and periodic overhaul deficit');
  } else {
    infrastructureGap = 38;
    reasoning.push('Standard municipal maintenance and cosmetic shortfall');
  }

  // Explicit service mentions in reasoning
  if (services.some(s => s.toLowerCase().includes('school'))) {
    if (!reasoning.some(r => r.toLowerCase().includes('school'))) {
      reasoning.push('School access affected');
    }
  }

  // -------------------------------------------------------------
  // 5. Evidence Strength Factor (Weight: 10%)
  // -------------------------------------------------------------
  const evidenceCount = hotspot.citizenEvidenceCount || (hotspot.communityEvidence?.length) || (hotspot.hasPhoto ? 1 : 0);
  let evidenceStrength = 25;

  if (evidenceCount >= 100) {
    evidenceStrength = 95;
    reasoning.push(`Extensive supporting evidence available (${evidenceCount} shielded photos and telemetry logs)`);
  } else if (evidenceCount >= 20) {
    evidenceStrength = 86;
    reasoning.push(`Strong supporting ground evidence available (${evidenceCount} shielded photos and logs)`);
  } else if (evidenceCount >= 5) {
    evidenceStrength = 75;
    reasoning.push(`Supporting ground photos and citizen telemetry verified (${evidenceCount} records)`);
  } else if (evidenceCount >= 1) {
    evidenceStrength = evidenceCount <= 2 && sev.includes('low') ? 35 : 60;
    reasoning.push(`Initial citizen ground photo evidence verified (${evidenceCount} records)`);
  } else {
    evidenceStrength = 20;
    reasoning.push('No ground photo evidence uploaded yet');
  }

  // -------------------------------------------------------------
  // 6. Recent Trend & Recurrence Factor (Weight: 10%)
  // -------------------------------------------------------------
  const trendText = `${hotspot.trend || ''} ${hotspot.recurrenceIndicator || ''}`.toLowerCase();
  let recentTrend = 60;

  const isExplicitlyIsolated = trendText.includes('no recur') || trendText.includes('no seasonal') || trendText.includes('isolated') || trendText.includes('stable');

  if (isExplicitlyIsolated) {
    recentTrend = 25;
    reasoning.push('Isolated non-recurring incident');
  } else if (trendText.includes('monsoon') || trendText.includes('annual') || trendText.includes('every') || trendText.includes('recur')) {
    recentTrend = 90;
    reasoning.push('Recurring seasonal reports (Documented annual failure pattern)');
  } else if (trendText.includes('+2') || trendText.includes('+3') || trendText.includes('+4') || trendText.includes('accelerat')) {
    recentTrend = 82;
    reasoning.push('Accelerating demand trend (+20% or higher recent co-reports)');
  } else if (trendText.includes('+1') || trendText.includes('grow')) {
    recentTrend = 70;
    reasoning.push('Gradually increasing community reporting');
  } else {
    recentTrend = 35;
    reasoning.push('Non-recurring community notice');
  }

  // -------------------------------------------------------------
  // Mathematical Weighting Formula: Total Score (0–100)
  // -------------------------------------------------------------
  const rawTotal = (
    citizenDemand * 0.25 +
    severity * 0.20 +
    affectedPopulation * 0.20 +
    infrastructureGap * 0.15 +
    evidenceStrength * 0.10 +
    recentTrend * 0.10
  );

  const totalScore = Math.min(Math.max(Math.round(rawTotal), 0), 100);

  // -------------------------------------------------------------
  // Priority Level Classification
  // -------------------------------------------------------------
  let level = 'Low';
  if (totalScore >= PRIORITY_THRESHOLDS.CRITICAL) {
    level = 'Critical';
  } else if (totalScore >= PRIORITY_THRESHOLDS.HIGH) {
    level = 'High';
  } else if (totalScore >= PRIORITY_THRESHOLDS.MEDIUM) {
    level = 'Medium';
  } else {
    level = 'Low';
  }

  // Breakdown of each weighted contribution
  const breakdown = {
    demandScore: Math.round(citizenDemand * 0.25),
    severityScore: Math.round(severity * 0.20),
    populationScore: Math.round(affectedPopulation * 0.20),
    gapScore: Math.round(infrastructureGap * 0.15),
    evidenceScore: Math.round(evidenceStrength * 0.10),
    trendScore: Math.round(recentTrend * 0.10),
    total: totalScore
  };

  const factors = {
    citizenDemand,
    severity,
    affectedPopulation,
    infrastructureGap,
    evidenceStrength,
    recentTrend
  };

  return {
    totalScore,
    level,
    factors,
    reasoning,
    // Backward compatibility aliases
    score: totalScore,
    priorityScore: totalScore,
    priorityLevel: level.toUpperCase(),
    why: reasoning,
    whySummary: reasoning.slice(0, 4).join(' • '),
    breakdown
  };
}

/**
 * Backward compatibility alias for calculatePriorityScore
 */
export function calculatePriority(hotspot) {
  return calculatePriorityScore(hotspot);
}

/**
 * Checks if a citizen report belongs to an existing hotspot.
 * Groups by:
 * - Geographic context (state, district, or locality name)
 * - Category / Domain
 * - Problem classification semantic similarity
 * 
 * @param {Object} report
 * @param {Object} hotspot
 * @returns {boolean}
 */
export function isReportMatchingHotspot(report, hotspot) {
  if (!report || !hotspot) return false;

  // 1. Geographic match check
  const reportState = (report.state || '').toLowerCase();
  const hotspotState = (hotspot.state || '').toLowerCase();
  const reportLoc = (report.location || report.district || '').toLowerCase();
  const hotspotLoc = `${hotspot.name || ''} ${hotspot.title || ''} ${hotspot.district || ''} ${hotspot.locality || ''} ${hotspot.location || ''}`.toLowerCase();

  const stateMatches = !reportState || !hotspotState || reportState === hotspotState || hotspotLoc.includes(reportState);
  
  // Specific locality or district keywords match
  const locKeywords = reportLoc.split(/[\s,]+/).filter(w => w.length > 3);
  const locMatches = locKeywords.some(kw => hotspotLoc.includes(kw));

  // 2. Category match check
  const reportCat = (report.category || '').toLowerCase();
  const hotspotCat = `${hotspot.category || ''} ${hotspot.primaryCategory || ''}`.toLowerCase();
  const categoryMatches = !reportCat || hotspotCat.includes(reportCat) || reportCat.includes(hotspotCat);

  // 3. Problem classification semantic similarity
  const reportProb = (report.aiStructuring?.problemType || report.aiStructuring?.standardizedProblem || report.title || '').toLowerCase();
  const hotspotProb = `${hotspot.name || ''} ${hotspot.title || ''} ${hotspot.standardizedProblem || ''} ${hotspot.infrastructureGap || ''}`.toLowerCase();
  
  const probKeywords = reportProb.split(/[\s,]+/).filter(w => w.length > 3);
  const probMatches = probKeywords.filter(kw => hotspotProb.includes(kw)).length >= 1;

  // Matching rule: Must be in same geographic area AND match either category or problem classification
  if (stateMatches && locMatches) {
    return categoryMatches || probMatches;
  }

  // Exact corridor keyword matches
  if (reportLoc.includes('ward 42') && hotspotLoc.includes('ward 42')) return true;
  if (reportLoc.includes('riverside') && hotspotLoc.includes('riverside')) return true;
  if (reportLoc.includes('mandore') && hotspotLoc.includes('mandore')) return true;

  return false;
}

/**
 * Aggregates a new citizen report into the hotspot list.
 * Updates an existing hotspot if matched, or creates a new hotspot.
 * Recalculates priority deterministically.
 * 
 * @param {Object} newReport
 * @param {Array} currentHotspots
 * @returns {{ updatedHotspots: Array, matchedHotspot: Object, isNewHotspot: boolean }}
 */
export function aggregateReportIntoHotspots(newReport, currentHotspots = []) {
  let matched = null;
  let isNewHotspot = false;

  // Clone current hotspots
  const updatedHotspots = currentHotspots.map(h => ({ ...h }));

  // Search for matching hotspot
  for (let i = 0; i < updatedHotspots.length; i++) {
    if (isReportMatchingHotspot(newReport, updatedHotspots[i])) {
      matched = updatedHotspots[i];
      break;
    }
  }

  if (matched) {
    // 1. Update existing hotspot
    const currentCount = matched.reportCount || matched.relatedReportsCount || 1;
    matched.reportCount = currentCount + 1;
    matched.relatedReportsCount = currentCount + 1;
    matched.requestCount = (matched.requestCount || currentCount) + 1;
    matched.relatedRequests = (matched.relatedRequests || matched.requestCount) + 1;
    matched.latestReportedDate = newReport.dateSubmitted || new Date().toISOString().split('T')[0];

    // Append supporting report ID
    matched.supportingReportIds = matched.supportingReportIds || [];
    if (!matched.supportingReportIds.includes(newReport.id)) {
      matched.supportingReportIds.push(newReport.id);
    }

    // Evidence count increment
    if (newReport.hasPhoto) {
      matched.citizenEvidenceCount = (matched.citizenEvidenceCount || 0) + 1;
    }

    // Merge affected services
    const reportServices = newReport.aiStructuring?.affectedServices || [];
    if (Array.isArray(reportServices) && reportServices.length > 0) {
      const existingServices = new Set(matched.affectedServices || []);
      reportServices.forEach(s => existingServices.add(s));
      matched.affectedServices = Array.from(existingServices);
    }

    // Re-calculate deterministic priority
    const priorityResult = calculatePriorityScore(matched);
    matched.priorityScore = priorityResult.totalScore;
    matched.priorityLevel = priorityResult.level;
    matched.aiPriorityRecommendation = priorityResult.level.toUpperCase();
    matched.factors = priorityResult.factors;
    matched.whyReasons = priorityResult.reasoning;
    matched.reasoning = priorityResult.reasoning;
    matched.whySummary = priorityResult.whySummary;
    matched.scoreBreakdown = priorityResult.breakdown;

  } else {
    // 2. Create brand new Hotspot
    isNewHotspot = true;
    const reportProb = newReport.aiStructuring?.problemType || newReport.aiStructuring?.standardizedProblem || newReport.title || 'Community Infrastructure Need';
    const reportCat = newReport.category || 'Drainage & Flood Mitigation';
    const reportLoc = newReport.location || `${newReport.district || 'District'}, ${newReport.state || 'India'}`;

    matched = {
      id: `hotspot-${Date.now().toString().slice(-4)}`,
      name: reportProb,
      title: reportProb,
      standardizedProblem: reportProb,
      category: reportCat,
      primaryCategory: reportCat,
      location: reportLoc,
      state: newReport.state || 'India',
      stateId: newReport.state ? newReport.state.slice(0, 2).toUpperCase() : 'IN',
      district: newReport.district || 'Local Sector',
      locality: newReport.location || 'Civic Corridor',
      reportCount: 1,
      relatedReportsCount: 1,
      requestCount: 1,
      relatedRequests: 1,
      affectedLocations: 1,
      affectedPopulation: newReport.affectedPopulation || 15000,
      affectedPopulationDisplay: `${(newReport.affectedPopulation || 15000).toLocaleString()} residents`,
      severity: newReport.severity || 'Medium',
      firstReportedDate: newReport.dateSubmitted || new Date().toISOString().split('T')[0],
      latestReportedDate: newReport.dateSubmitted || new Date().toISOString().split('T')[0],
      recurrenceIndicator: (newReport.description || '').toLowerCase().includes('monsoon') || (newReport.description || '').toLowerCase().includes('every') ? 'Recurring seasonal issue' : 'Initial community report',
      supportingReportIds: [newReport.id],
      citizenEvidenceCount: newReport.hasPhoto ? 1 : 0,
      affectedServices: newReport.aiStructuring?.affectedServices || ['Local Road Access', 'Pedestrian Transit'],
      recommendedAction: `Inspect and develop public works intervention for ${reportCat.toLowerCase()}.`,
      suggestedIntervention: `Undertake municipal engineering assessment for ${reportProb}.`,
      recommendedDomain: newReport.aiStructuring?.recommendedDomain || `${reportCat} Engineering & Public Works`,
      assignedDepartment: '',
      status: 'New Signal',
      currentStatus: 'New Signal',
      governmentStatus: 'New Signal',
      linkedProjectId: null,
      trend: '+100% (New Cluster)'
    };

    const priorityResult = calculatePriorityScore(matched);
    matched.priorityScore = priorityResult.totalScore;
    matched.priorityLevel = priorityResult.level;
    matched.aiPriorityRecommendation = priorityResult.level.toUpperCase();
    matched.factors = priorityResult.factors;
    matched.whyReasons = priorityResult.reasoning;
    matched.reasoning = priorityResult.reasoning;
    matched.whySummary = priorityResult.whySummary;
    matched.scoreBreakdown = priorityResult.breakdown;

    // Prepend to list
    updatedHotspots.unshift(matched);
  }

  // Sort by priorityScore descending
  updatedHotspots.sort((a, b) => (b.priorityScore || 0) - (a.priorityScore || 0));

  return {
    updatedHotspots,
    matchedHotspot: matched,
    isNewHotspot
  };
}

/**
 * Applies a government action to a hotspot (local state representation).
 * Handles the 7-stage workflow:
 * New Signal → Under Review → Validated → Project Proposed → Project Linked → Action Underway → Resolved
 *
 * Also handles department assignment, project linking, and priority overrides.
 * 
 * @param {Array} hotspots
 * @param {string} hotspotId
 * @param {Object} action - { status, assignedDepartment, priorityOverride, linkedProjectId, linkedProject, actionHistory, notes }
 * @returns {Array} updated hotspots
 */
export function applyGovernmentAction(hotspots, hotspotId, action = {}) {
  return hotspots.map(h => {
    if (h.id === hotspotId) {
      const updated = { ...h };

      // Update 7-Stage Workflow Status
      if (action.status) {
        updated.status = action.status;
        updated.governmentStatus = action.status;
        updated.currentStatus = action.status;
      }

      // Assign Responsible Department
      if (action.assignedDepartment) {
        updated.assignedDepartment = action.assignedDepartment;
        updated.recommendedDomain = action.assignedDepartment;
      }

      // Priority Override (Human Decision Point)
      if (action.priorityOverride) {
        updated.priorityLevel = action.priorityOverride;
        updated.priorityOverride = action.priorityOverride;
        updated.aiPriorityRecommendation = action.priorityOverride.toUpperCase();
      }

      // Link Existing Project
      if (action.linkedProjectId !== undefined) {
        updated.linkedProjectId = action.linkedProjectId;
        if (action.linkedProject) {
          updated.linkedProject = action.linkedProject;
        }
      }

      // Audit History Trail
      if (action.actionHistory) {
        updated.actionHistory = [action.actionHistory, ...(updated.actionHistory || [])];
      } else if (action.notes || action.status || action.assignedDepartment) {
        const historyEntry = {
          timestamp: new Date().toISOString(),
          status: updated.status,
          assignedDepartment: updated.assignedDepartment,
          priority: updated.priorityLevel,
          linkedProjectId: updated.linkedProjectId,
          notes: action.notes || `Status updated to "${updated.status}" by Government Reviewer`
        };
        updated.actionHistory = [historyEntry, ...(updated.actionHistory || [])];
      }

      return updated;
    }
    return h;
  });
}
