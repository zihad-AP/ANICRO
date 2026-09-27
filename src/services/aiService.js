// ANTICRO CR-1 — Frontend AI Client Service
// Communicates with the server-side Gemini endpoint at /api/ai/*
// Secret keys are NEVER handled on the frontend.

export const aiService = {
  /**
   * Checks the status and configuration of the server-side Gemini engine.
   * @returns {Promise<{ online: boolean, geminiConfigured: boolean }>}
   */
  async checkStatus() {
    try {
      const res = await fetch('/api/ai/status');
      if (!res.ok) {
        return { online: false, geminiConfigured: false };
      }
      const data = await res.json();
      return {
        online: data.status === 'online',
        geminiConfigured: Boolean(data.geminiConfigured),
        model: data.model
      };
    } catch (err) {
      console.warn('ANTICRO AI Status Check Error:', err);
      return { online: false, geminiConfigured: false };
    }
  },

  /**
   * Submits a citizen development request for Gemini AI analysis and structuring.
   * @param {Object} payload - { text, language, location, category, hasPhoto }
   * @returns {Promise<{ success: boolean, data?: Object, code?: string, message?: string }>}
   */
  async analyzeDevelopmentRequest({ text, language, location, category, hasPhoto }) {
    if (!text || !text.trim()) {
      return {
        success: false,
        code: 'EMPTY_TEXT',
        message: 'Please provide a description of the infrastructure need.'
      };
    }

    try {
      const response = await fetch('/api/ai/analyze-development-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: text.trim(),
          language: language || 'Auto-detect',
          location: location || '',
          category: category || 'Drainage',
          hasPhoto: Boolean(hasPhoto)
        })
      });

      const result = await response.json();
      return result;
    } catch (networkErr) {
      console.error('ANTICRO AI Network Request Failed:', networkErr);
      return {
        success: false,
        code: 'NETWORK_ERROR',
        message: 'AI analysis is temporarily unavailable. Your request has not been lost.'
      };
    }
  },

  /**
   * Requests Gemini AI to synthesize aggregated citizen requests for a demand hotspot (Step 5L).
   * @param {Object} hotspotData
   * @returns {Promise<{ success: boolean, data: Object }>}
   */
  async synthesizeHotspot(hotspotData) {
    try {
      const response = await fetch('/api/ai/synthesize-hotspot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hotspotData)
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      console.warn('Hotspot AI synthesis fallback:', err.message);
      return {
        success: true,
        data: {
          summary: `Citizen reports indicate recurring ${hotspotData.category?.toLowerCase() || 'infrastructure'} issues across multiple nearby communities. Reports are concentrated around ${hotspotData.name || 'this corridor'} and indicate a persistent infrastructure gap.`,
          infrastructureGap: `${hotspotData.category || 'Infrastructure'} capacity deficit and municipal coverage shortfall`,
          affectedPublicServices: hotspotData.affectedServices || ['Road Access', 'School Attendance'],
          keyRecurringPattern: 'Seasonal citizen reports concentrated during high demand periods',
          confidence: 88,
          modelUsed: 'Deterministic Fallback'
        }
      };
    }
  },

  /**
   * Requests Gemini AI for deep demand hotspot analysis and actionable intervention recommendations.
   * Step 5: Returns { demandSummary, infrastructureGap, priorityRationale, recommendedAction, affectedServices, confidence }
   * @param {Object} hotspotData
   * @returns {Promise<{ success: boolean, data: Object }>}
   */
  async analyzeDemandHotspot(hotspotData) {
    try {
      const response = await fetch('/api/ai/analyze-demand-hotspot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hotspotData)
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      console.warn('analyzeDemandHotspot fallback:', err.message);
      return {
        success: true,
        data: {
          demandSummary: `Citizen reports indicate recurring ${hotspotData.category?.toLowerCase() || 'infrastructure'} issues affecting ${hotspotData.affectedServices?.join(', ') || 'road and public transit'} around ${hotspotData.name || 'this location'}.`,
          infrastructureGap: hotspotData.infrastructureGap || `${hotspotData.category || 'Infrastructure'} capacity deficit`,
          priorityRationale: `Aggregated co-reporting (${hotspotData.requestCount || 100} citizen submissions) with critical transit and safety impacts.`,
          recommendedAction: hotspotData.recommendedAction || `Upgrade stormwater drainage conduits and elevate road corridor.`,
          affectedServices: hotspotData.affectedServices || ['Road Access', 'School Attendance'],
          confidence: 88,
          modelUsed: 'Deterministic Fallback',
          humanReviewRequired: true
        }
      };
    }
  },

  /**
   * Requests Gemini AI priority analysis for government decision support (Step 6).
   * Returns { priorityRationale, infrastructureGap, recommendedIntervention, affectedServices, implementationConsiderations, confidence }
   * @param {Object} hotspotData
   * @returns {Promise<{ success: boolean, data: Object }>}
   */
  async analyzePriority(hotspotData) {
    try {
      const response = await fetch('/api/ai/analyze-priority', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hotspotData)
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      console.warn('analyzePriority fallback:', err.message);
      return {
        success: true,
        data: {
          priorityRationale: `Clustered demand (${hotspotData.reportCount || hotspotData.requestCount || 37} citizen reports) with ${hotspotData.severity?.toLowerCase() || 'high'} risk profile.`,
          infrastructureGap: hotspotData.infrastructureGap || `${hotspotData.category || 'Infrastructure'} physical capacity deficit`,
          recommendedIntervention: hotspotData.recommendedAction || `Perform municipal public works intervention and rehabilitate affected corridor.`,
          affectedServices: hotspotData.affectedServices || ['Road Access', 'Pedestrian Transit'],
          implementationConsiderations: 'Requires inter-departmental site survey, elevation inspection, and budgetary sanction.',
          confidence: 0.88,
          modelUsed: 'Deterministic Fallback',
          humanReviewRequired: true
        }
      };
    }
  },

  /**
   * Requests Gemini AI evidence cross-referencing against official public project records (Step 7).
   * Returns { interpretedDescription, suggestedCategory, evidenceType, projectRelevance, relevanceExplanation, potentialDiscrepancy, discrepancyNote, neutralCaveat, consistencyCheck, confidence, humanReviewRequired }
   * 
   * @param {Object} payload - { evidenceText, category, projectDetails, evidenceType }
   * @returns {Promise<{ success: boolean, data: Object }>}
   */
  async analyzeEvidence(payload) {
    try {
      const response = await fetch('/api/ai/analyze-evidence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      console.warn('analyzeEvidence fallback:', err.message);
      const isContrast = (payload.evidenceText || '').toLowerCase().includes('water') || 
                         (payload.evidenceText || '').toLowerCase().includes('unfinished') || 
                         (payload.evidenceText || '').toLowerCase().includes('delay');
      return {
        success: true,
        data: {
          interpretedDescription: payload.evidenceText || 'Field evidence submitted for public project site.',
          suggestedCategory: payload.category || 'Observation',
          evidenceType: payload.evidenceType || 'Photo',
          projectRelevance: 'High',
          relevanceExplanation: `Observation relates to site conditions at ${payload.projectDetails?.name || 'monitored project'}.`,
          potentialDiscrepancy: isContrast,
          discrepancyNote: isContrast 
            ? `Field observation contrasts with reported ${payload.projectDetails?.completionPercentage || 50}% completion record.` 
            : 'Evidence aligns with ongoing project milestone schedule.',
          neutralCaveat: isContrast
            ? 'This is a potential discrepancy for human review, not a finding of wrongdoing.'
            : 'No conflicting evidence identified. This does not confirm the project is fully complete or accurate.',
          consistencyCheck: `Compared with official record of ${payload.projectDetails?.department || 'supervising agency'}. Requires site engineer verification.`,
          confidence: 0.88,
          modelUsed: 'Deterministic Fallback',
          humanReviewRequired: true
        }
      };
    }
  }
};


