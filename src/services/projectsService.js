import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { INITIAL_PROJECTS } from '../data/mockProjects';
import { evidenceService } from './evidenceService';

// Format helper
const formatCurrency = (val, formatted) => {
  if (formatted && typeof formatted === 'string' && formatted.startsWith('$')) {
    return formatted;
  }
  const num = Number(val || 0);
  return `$${num.toLocaleString()}`;
};

export const projectsService = {
  // Fetch all projects from Supabase or fallback mock dataset
  async getAllProjects() {
    if (!isSupabaseConfigured() || !supabase) {
      return {
        isLiveSupabase: false,
        projects: INITIAL_PROJECTS,
        error: null
      };
    }

    try {
      const { data: dbProjects, error } = await supabase
        .from('projects')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.warn('Supabase projects query returned error, falling back to mock dataset:', error.message);
        return {
          isLiveSupabase: true,
          projects: INITIAL_PROJECTS,
          error: error.message
        };
      }

      if (!dbProjects || dbProjects.length === 0) {
        return {
          isLiveSupabase: true,
          projects: [],
          error: null
        };
      }

      // Map Supabase snake_case records to frontend UI model
      const enrichedProjects = await Promise.all(
        dbProjects.map(async (p) => {
          // Attempt to fetch evidence for this project
          const liveEvidence = await evidenceService.getEvidenceByProjectId(p.id);

          return {
            id: p.id,
            name: p.name || 'Untitled Project',
            department: p.department || 'Public Agency',
            location: p.location || 'Municipal Location',
            budget: formatCurrency(p.budget, p.budget_formatted),
            budgetRaw: Number(p.budget || 0),
            expenditure: formatCurrency(p.expenditure, p.expenditure_formatted),
            expenditureRaw: Number(p.expenditure || 0),
            completionPercentage: Number(p.completion_percentage || 0),
            status: p.status || 'Work Ongoing',
            is_real: Boolean(p.is_real || p.is_verified_source),
            isReal: Boolean(p.is_real || p.is_verified_source),
            is_verified_source: Boolean(p.is_real || p.is_verified_source),
            badgeType: (p.is_real || p.is_verified_source) ? 'Verified Source' : 'Simulated Data',
            category: p.category || 'Public Infrastructure',
            description: p.description || '',
            contractor: p.contractor || 'Public Works Contractor',
            startDate: p.start_date || '2024-01-01',
            expectedCompletionDate: p.expected_completion_date || '2025-12-31',
            sourceRecord: p.source_record || 'Public Record Registry',
            image_url: p.image_url || null,
            evidenceCount: liveEvidence ? liveEvidence.length : (p.evidence_count || 0),
            casesCount: p.cases_count || 0,
            evidenceTimeline: liveEvidence || []
          };
        })
      );

      return {
        isLiveSupabase: true,
        projects: enrichedProjects,
        error: null
      };
    } catch (err) {
      console.warn('Error in projectsService.getAllProjects:', err);
      return {
        isLiveSupabase: false,
        projects: INITIAL_PROJECTS,
        error: err.message
      };
    }
  },

  // Fetch single project by ID with associated evidence
  async getProjectById(projectId) {
    if (!isSupabaseConfigured() || !supabase) {
      const project = INITIAL_PROJECTS.find(p => p.id === projectId) || null;
      return { project, isLiveSupabase: false, error: null };
    }

    try {
      const { data: p, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (error || !p) {
        // Check if fallback project exists in mock data
        const fallbackProject = INITIAL_PROJECTS.find(item => item.id === projectId) || null;
        return { project: fallbackProject, isLiveSupabase: true, error: error?.message };
      }

      const liveEvidence = await evidenceService.getEvidenceByProjectId(projectId);

      const project = {
        id: p.id,
        name: p.name || 'Untitled Project',
        department: p.department || 'Public Agency',
        location: p.location || 'Municipal Location',
        budget: formatCurrency(p.budget, p.budget_formatted),
        budgetRaw: Number(p.budget || 0),
        expenditure: formatCurrency(p.expenditure, p.expenditure_formatted),
        expenditureRaw: Number(p.expenditure || 0),
        completionPercentage: Number(p.completion_percentage || 0),
        status: p.status || 'Work Ongoing',
        is_real: Boolean(p.is_real || p.is_verified_source),
        isReal: Boolean(p.is_real || p.is_verified_source),
        is_verified_source: Boolean(p.is_real || p.is_verified_source),
        badgeType: (p.is_real || p.is_verified_source) ? 'Verified Source' : 'Simulated Data',
        category: p.category || 'Public Infrastructure',
        description: p.description || '',
        contractor: p.contractor || 'Public Works Contractor',
        startDate: p.start_date || '2024-01-01',
        expectedCompletionDate: p.expected_completion_date || '2025-12-31',
        sourceRecord: p.source_record || 'Public Record Registry',
        image_url: p.image_url || null,
        evidenceCount: liveEvidence ? liveEvidence.length : (p.evidence_count || 0),
        casesCount: p.cases_count || 0,
        evidenceTimeline: liveEvidence || []
      };

      return { project, isLiveSupabase: true, error: null };
    } catch (err) {
      console.warn('Error fetching project by ID:', err);
      const fallbackProject = INITIAL_PROJECTS.find(item => item.id === projectId) || null;
      return { project: fallbackProject, isLiveSupabase: false, error: err.message };
    }
  }
};