// ANTICRO CR-1 — Project Accountability & Lifecycle Engine
// Manages project lifecycle states, 5-stage progress tracking,
// health signals, government responses, and verified resolution.

export const LIFECYCLE_STATUSES = [
  'Proposed',
  'Approved',
  'In Progress',
  'Delayed',
  'Completed',
  'Under Verification',
  'Resolved'
];

export const PROGRESS_STAGES = [
  { id: 'planning', label: 'Planning', order: 1 },
  { id: 'procurement', label: 'Procurement', order: 2 },
  { id: 'construction', label: 'Construction', order: 3 },
  { id: 'verification', label: 'Verification', order: 4 },
  { id: 'resolution', label: 'Resolution', order: 5 }
];

export const GOV_RESPONSE_STATUSES = [
  'Action Underway',
  'Acknowledged',
  'Correction Requested',
  'Work Completed',
  'Awaiting Response'
];

export const EVIDENCE_TYPES = [
  'Photo',
  'Video',
  'Document',
  'Citizen Observation',
  'Official Project Record',
  'Location Evidence'
];

export const EVIDENCE_CATEGORIES = [
  'Fact',
  'Observation',
  'Allegation'
];

/**
 * Calculates an explainable, deterministic project health signal (Part 17).
 * @param {Object} project
 * @returns {{ status: 'On Track' | 'At Risk' | 'Delayed', reason: string, label: string, color: string }}
 */
export function calculateProjectHealth(project) {
  if (!project) {
    return {
      status: 'On Track',
      reason: 'Project initialized within standard parameters.',
      label: 'On Track',
      badgeClass: 'bg-teal-50 text-teal-800 border-teal-200'
    };
  }

  const { status, completionPercentage = 0, expectedCompletionDate, startDate } = project;

  // Immediate status overrides
  if (status === 'Resolved' || status === 'Work Completed') {
    return {
      status: 'On Track',
      reason: 'Rehabilitation work completed and field outcomes verified under civil supervision.',
      label: 'On Track',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    };
  }

  if (status === 'Delayed' || status === 'Correction Requested') {
    return {
      status: 'Delayed',
      reason: 'Physical progress halted or formal administrative correction requested following citizen discrepancy audit.',
      label: 'Delayed',
      badgeClass: 'bg-rose-50 text-rose-800 border-rose-200'
    };
  }

  // Calculate elapsed time ratio if dates available
  let elapsedRatio = 0.5;
  if (startDate && expectedCompletionDate) {
    const start = new Date(startDate).getTime();
    const end = new Date(expectedCompletionDate).getTime();
    const now = Date.now();
    if (end > start) {
      elapsedRatio = Math.max(0, Math.min(1, (now - start) / (end - start)));
    }
  }

  const expectedProgress = Math.round(elapsedRatio * 100);
  const progressGap = expectedProgress - completionPercentage;

  if (progressGap > 25) {
    return {
      status: 'Delayed',
      reason: `Expected timeline elapsed by ${expectedProgress}%, while reported physical completion is at ${completionPercentage}%.`,
      label: 'Delayed',
      badgeClass: 'bg-rose-50 text-rose-800 border-rose-200'
    };
  }

  if (progressGap > 12) {
    return {
      status: 'At Risk',
      reason: 'Target completion milestone approaching while reported physical execution lags planned delivery pacing.',
      label: 'At Risk',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-200'
    };
  }

  return {
    status: 'On Track',
    reason: 'Contractor site mobilization and milestone billing correspond with approved masterplan schedule.',
    label: 'On Track',
    badgeClass: 'bg-teal-50 text-teal-800 border-teal-200'
  };
}

/**
 * Computes the 5-stage progress indicator state based on project status and completion %.
 * @param {Object} project
 * @returns {Array<{ id: string, label: string, status: 'completed' | 'current' | 'upcoming' }>}
 */
export function getProgressStages(project) {
  const status = project?.status || 'In Progress';
  const pct = project?.completionPercentage || 0;

  // Stages: Planning -> Procurement -> Construction -> Verification -> Resolution
  if (status === 'Resolved') {
    return PROGRESS_STAGES.map(s => ({ ...s, status: 'completed' }));
  }

  if (status === 'Under Verification') {
    return PROGRESS_STAGES.map(s => {
      if (s.id === 'verification') return { ...s, status: 'current' };
      if (s.id === 'resolution') return { ...s, status: 'upcoming' };
      return { ...s, status: 'completed' };
    });
  }

  if (status === 'Completed' || pct >= 95) {
    return PROGRESS_STAGES.map(s => {
      if (s.id === 'resolution') return { ...s, status: 'upcoming' };
      if (s.id === 'verification') return { ...s, status: 'current' };
      return { ...s, status: 'completed' };
    });
  }

  if (status === 'In Progress' || status === 'Work Ongoing' || status === 'Delayed') {
    return PROGRESS_STAGES.map(s => {
      if (s.id === 'planning' || s.id === 'procurement') return { ...s, status: 'completed' };
      if (s.id === 'construction') return { ...s, status: 'current' };
      return { ...s, status: 'upcoming' };
    });
  }

  if (status === 'Approved') {
    return PROGRESS_STAGES.map(s => {
      if (s.id === 'planning') return { ...s, status: 'completed' };
      if (s.id === 'procurement') return { ...s, status: 'current' };
      return { ...s, status: 'upcoming' };
    });
  }

  // Proposed
  return PROGRESS_STAGES.map(s => {
    if (s.id === 'planning') return { ...s, status: 'current' };
    return { ...s, status: 'upcoming' };
  });
}

/**
 * Updates a project's lifecycle status and synchronizes completion % and stages.
 * @param {Array<Object>} projects
 * @param {string} projectId
 * @param {string} newStatus
 * @returns {Array<Object>}
 */
export function updateProjectStatus(projects, projectId, newStatus) {
  return projects.map(proj => {
    if (proj.id !== projectId) return proj;

    let updatedPct = proj.completionPercentage;
    let resolution = proj.resolution || null;

    if (newStatus === 'Proposed') {
      updatedPct = Math.min(updatedPct, 15);
    } else if (newStatus === 'Approved') {
      updatedPct = Math.max(updatedPct, 20);
    } else if (newStatus === 'In Progress') {
      updatedPct = updatedPct < 30 ? 45 : updatedPct;
    } else if (newStatus === 'Under Verification') {
      updatedPct = Math.max(updatedPct, 85);
      resolution = {
        status: 'Under Verification',
        date: new Date().toISOString().split('T')[0],
        outcome: 'Subterranean conduit installation concluded; pending final monsoon load test.',
        verification: 'Joint physical survey scheduled by municipal chief auditor.',
        remainingIssues: 'Silt accumulation monitoring required at junction point.'
      };
    } else if (newStatus === 'Resolved') {
      updatedPct = 100;
      resolution = {
        status: 'Resolved',
        date: new Date().toISOString().split('T')[0],
        outcome: 'Drainage corridor fully operational with dual 1200mm box culvert installed and road resurfaced.',
        verification: 'Post-completion physical engineering audit verified and signed off.',
        remainingIssues: 'Routine annual pre-monsoon desilting maintenance mandated.'
      };
    }

    const updatedProj = {
      ...proj,
      status: newStatus,
      lifecycleStage: newStatus,
      governmentActionStatus: newStatus,
      completionPercentage: updatedPct,
      resolution,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    return updatedProj;
  });
}

/**
 * Updates the official government response for a project.
 * @param {Array<Object>} projects
 * @param {string} projectId
 * @param {Object} responsePayload - { status, department, statement, nextAction }
 * @returns {Array<Object>}
 */
export function updateGovernmentResponse(projects, projectId, responsePayload) {
  return projects.map(proj => {
    if (proj.id !== projectId) return proj;

    const responseDate = new Date().toISOString().split('T')[0];
    const newResponse = {
      status: responsePayload.status || 'Action Underway',
      department: responsePayload.department || proj.department,
      responseDate,
      statement: responsePayload.statement || 'Department review underway.',
      nextAction: responsePayload.nextAction || 'Continue scheduled site works.'
    };

    return {
      ...proj,
      governmentResponse: newResponse,
      lastUpdated: responseDate
    };
  });
}

/**
 * 9-Stage End-to-End Civic Accountability Pipeline
 * Tracks full journey: Citizen Report -> Multilingual AI -> Hotspot -> Priority -> Gov Review -> Project Link -> Implementation -> Verification -> Resolution
 */
export const CIVIC_ACCOUNTABILITY_STAGES = [
  { id: 'need_reported', step: 1, label: 'Citizen Need Reported', desc: 'Voice / text intake' },
  { id: 'ai_understanding', step: 2, label: 'AI Understanding', desc: 'Multilingual semantic extraction' },
  { id: 'demand_pattern', step: 3, label: 'Demand Pattern Identified', desc: 'Corridor clustered hotspot' },
  { id: 'priority_recommended', step: 4, label: 'Priority Recommended', desc: '6-factor deterministic model' },
  { id: 'gov_review', step: 5, label: 'Government Review', desc: 'Departmental triage & verification' },
  { id: 'project_linked', step: 6, label: 'Project Linked', desc: 'Capital budget allocation' },
  { id: 'implementation', step: 7, label: 'Implementation', desc: 'Engineering works underway' },
  { id: 'verification', step: 8, label: 'Verification', desc: 'Audit & physical inspection' },
  { id: 'resolution', step: 9, label: 'Resolution', desc: 'Permanent civic closure' }
];

export function getAccountabilityStages(project) {
  const status = project?.status || 'In Progress';
  const pct = project?.completionPercentage || 0;

  return CIVIC_ACCOUNTABILITY_STAGES.map(stage => {
    // Stages 1-6 are the upstream demand & linking journey already achieved for this linked project
    if (stage.step <= 6) {
      return { ...stage, status: 'completed' };
    }

    // Step 7: Implementation
    if (stage.step === 7) {
      if (status === 'Resolved' || status === 'Under Verification' || status === 'Completed' || pct >= 95) {
        return { ...stage, status: 'completed' };
      }
      return { ...stage, status: 'current' };
    }

    // Step 8: Verification
    if (stage.step === 8) {
      if (status === 'Resolved') {
        return { ...stage, status: 'completed' };
      }
      if (status === 'Under Verification' || status === 'Completed') {
        return { ...stage, status: 'current' };
      }
      return { ...stage, status: 'upcoming' };
    }

    // Step 9: Resolution
    if (stage.step === 9) {
      if (status === 'Resolved') {
        return { ...stage, status: 'completed' };
      }
      return { ...stage, status: 'upcoming' };
    }

    return { ...stage, status: 'upcoming' };
  });
}

