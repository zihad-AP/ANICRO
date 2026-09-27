// ANTICRO CR-1 — AI Case Matching Service (Rule #12 & #13)
// Strictly follows Rule #12 (Mock AI with structured output) and Rule #13 (Fixed safety caveats).

export const aiMatchingService = {
  /**
   * Compare new evidence with existing evidence and cases for a project.
   * @param {Object} params - { newEvidence, project }
   * @returns {Promise<Object>} - Structured AI matching result
   */
  async matchEvidenceToCases({ newEvidence, project }) {
    // Realistic matching latency
    await new Promise((resolve) => setTimeout(resolve, 1400));

    const existingTimeline = project.evidenceTimeline || [];
    const lowerTitle = (newEvidence.title || '').toLowerCase();
    const lowerDesc = (newEvidence.description || '').toLowerCase();

    // Check for matching keywords across existing evidence items
    const keywords = ['clarifier', 'foundation', 'rebar', 'concrete', 'damper', 'bearing', 'pier', 'drainage', 'culvert', 'thickness', 'milestone', 'billing'];
    const matchedKeyword = keywords.find(kw => lowerTitle.includes(kw) || lowerDesc.includes(kw));

    let matchedItem = null;
    if (matchedKeyword) {
      matchedItem = existingTimeline.find(item => 
        item.title.toLowerCase().includes(matchedKeyword) || 
        item.description.toLowerCase().includes(matchedKeyword)
      );
    }

    const isDiscrepant = newEvidence.category === 'Observation' || newEvidence.category === 'Allegation';

    // Duplicate Status: strictly one of 'unique' | 'possible_duplicate' | 'independent_corroboration'
    let duplicateStatus = 'unique';
    let matchedCaseId = null;
    let matchedCaseNumber = null;
    let matchedCaseTitle = null;
    let isNewCase = false;
    let aiSummary = '';

    if (matchedItem && isDiscrepant) {
      // Existing discrepancy case matched
      matchedCaseId = matchedItem.caseId || `case-${project.id}-01`;
      matchedCaseNumber = `CASE-${project.id.toUpperCase().replace(/[^A-Z0-9]/g, '')}-2024-01`;
      matchedCaseTitle = `${matchedKeyword ? matchedKeyword.charAt(0).toUpperCase() + matchedKeyword.slice(1) : 'Milestone'} Specification Discrepancy`;

      if (newEvidence.category === 'Observation') {
        duplicateStatus = 'independent_corroboration';
        aiSummary = `Physical observation matches existing discrepancy record (${matchedCaseNumber}). Submitted visual evidence provides independent corroboration of site progress variance against contractor milestone claims.`;
      } else {
        duplicateStatus = 'possible_duplicate';
        aiSummary = `Submission references existing case record (${matchedCaseNumber}). Correlated inquiry attached to active discrepancy investigation file.`;
      }
    } else if (isDiscrepant) {
      // No existing case matches -> Create a new case
      isNewCase = true;
      const caseSeq = ((project.casesCount || 0) + 1).toString().padStart(2, '0');
      matchedCaseId = `case-${project.id}-${Date.now().toString().slice(-4)}`;
      matchedCaseNumber = `CASE-${project.id.toUpperCase().replace(/[^A-Z0-9]/g, '')}-2024-${caseSeq}`;
      matchedCaseTitle = `${newEvidence.title.slice(0, 48)} Discrepancy Record`;
      duplicateStatus = 'unique';
      aiSummary = `No matching prior case found for this project. Initial AI scan identifies potential physical variance from published project specifications. New discrepancy tracking case initialized.`;
    } else {
      // Fact / Baseline documentation
      duplicateStatus = 'unique';
      matchedCaseId = null;
      matchedCaseNumber = null;
      matchedCaseTitle = null;
      isNewCase = false;
      aiSummary = `Public record documentation cataloged and cross-referenced against municipal procurement registry baseline.`;
    }

    // Mandatory Rule #13 Fixed Strings
    const neutralCaveat = isDiscrepant
      ? "This is a potential discrepancy for human review, not a finding of wrongdoing."
      : "No conflicting evidence identified. This does not confirm the project is fully complete or accurate.";

    return {
      success: true,
      engine: "ANTICRO Case Matching Engine v1.0 (Simulated AI)",
      isMock: true,
      matchedCaseId,
      matchedCaseNumber,
      matchedCaseTitle,
      isNewCase,
      duplicateStatus, // 'unique' | 'possible_duplicate' | 'independent_corroboration'
      summary: aiSummary,
      potentialDiscrepancy: isDiscrepant,
      neutralCaveat // Exact required string
    };
  }
};