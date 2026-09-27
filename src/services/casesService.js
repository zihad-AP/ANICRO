import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { INITIAL_CASES } from '../data/mockCases';
import { INITIAL_PROJECTS } from '../data/mockProjects';

export const casesService = {
  // Fetch all cases (with Supabase fallback to mockCases)
  async getAllCases() {
    if (!isSupabaseConfigured() || !supabase) {
      return {
        cases: INITIAL_CASES,
        isLiveSupabase: false,
        error: null
      };
    }

    try {
      const { data, error } = await supabase
        .from('cases')
        .select(`
          *,
          projects (*),
          evidence (*)
        `)
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        return {
          cases: INITIAL_CASES,
          isLiveSupabase: true,
          error: error?.message || null
        };
      }

      // Map Supabase snake_case to frontend model
      const mappedCases = data.map(c => {
        const matchingMock = INITIAL_CASES.find(mc => mc.id === c.id || mc.caseNumber === c.case_number);
        return {
          id: c.id,
          caseNumber: c.case_number || matchingMock?.caseNumber || c.id,
          projectId: c.project_id || matchingMock?.projectId,
          projectName: c.projects?.name || matchingMock?.projectName || 'Public Project',
          title: c.title || matchingMock?.title,
          issueCategory: c.projects?.category || matchingMock?.issueCategory || 'Civil Works',
          status: c.status || matchingMock?.status || 'Government Response Pending',
          aiSummary: c.ai_summary || matchingMock?.aiSummary,
          evidenceCount: c.evidence?.length || matchingMock?.evidenceCount || 0,
          independentObservationsCount: matchingMock?.independentObservationsCount || 1,
          createdDate: c.created_at ? c.created_at.split('T')[0] : matchingMock?.createdDate,
          citizenReport: matchingMock?.citizenReport || {
            reportId: `CIT-${c.id}`,
            submittedBy: 'Citizen #A7K29',
            submittedDate: c.created_at ? c.created_at.split('T')[0] : '2024-10-01',
            title: c.title,
            description: c.ai_summary || 'Citizen report regarding project execution.'
          },
          aiAnalysis: matchingMock?.aiAnalysis || {
            summary: c.ai_summary,
            potentialDiscrepancy: c.status === 'Correction Ordered' || c.status === 'Under Review',
            neutralCaveat: (c.status === 'Correction Ordered' || c.status === 'Under Review')
              ? "This is a potential discrepancy for human review, not a finding of wrongdoing."
              : "No conflicting evidence identified. This does not confirm the project is fully complete or accurate."
          },
          govResponse: matchingMock?.govResponse || {
            status: 'Awaiting Response',
            department: c.projects?.department || 'Municipal Public Works',
            responseDate: null,
            statement: null,
            nextAction: null
          },
          engineerAssessment: matchingMock?.engineerAssessment || null,
          evidence: matchingMock?.evidence || []
        };
      });

      return {
        cases: mappedCases,
        isLiveSupabase: true,
        error: null
      };
    } catch (err) {
      console.warn('Error fetching cases from Supabase:', err);
      return {
        cases: INITIAL_CASES,
        isLiveSupabase: false,
        error: err.message
      };
    }
  },

  // Fetch all cases for a specific project
  async getCasesByProjectId(projectId) {
    const { cases } = await this.getAllCases();
    return cases.filter(c => c.projectId === projectId);
  },

  // Fetch a single case by ID or Case Number
  async getCaseById(caseId) {
    if (!caseId) return { caseItem: null, error: 'Case ID is required' };

    const { cases } = await this.getAllCases();
    const caseItem = cases.find(c => c.id === caseId || c.caseNumber?.toLowerCase() === caseId.toLowerCase()) || null;

    if (caseItem) {
      // Ensure linked project object exists
      const linkedProject = INITIAL_PROJECTS.find(p => p.id === caseItem.projectId);
      return {
        caseItem: {
          ...caseItem,
          project: linkedProject || null
        },
        error: null
      };
    }

    return {
      caseItem: null,
      error: 'Case record not found'
    };
  }
};
