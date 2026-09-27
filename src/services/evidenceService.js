import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

export const evidenceService = {
  // Fetch evidence records for a specific project
  async getEvidenceByProjectId(projectId) {
    if (!isSupabaseConfigured() || !supabase) {
      // Return null to signal fallback to in-memory mock data
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('evidence')
        .select(`
          id,
          project_id,
          category,
          title,
          description,
          submitted_by_pseudonym,
          created_at,
          image_url,
          privacy_reviewed,
          detected_privacy_items,
          ai_analysis,
          engineer_assessments (
            engineer_id,
            status,
            comments
          ),
          gov_responses (
            department,
            status,
            response_date,
            statement
          )
        `)
        .eq('project_id', projectId)
        .eq('privacy_reviewed', true) // Privacy gate (Rule #11)
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase evidence query failed, using mock data:', error.message);
        return null;
      }

      // Map Supabase snake_case schema to frontend camelCase model
      return data.map(ev => ({
        id: ev.id,
        category: ev.category,
        title: ev.title,
        description: ev.description,
        submittedBy: ev.submitted_by_pseudonym || 'Citizen #A7K29',
        date: ev.created_at ? ev.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
        imageUrl: ev.image_url,
        privacyShieldVerified: ev.privacy_reviewed,
        detectedPrivacyItems: ev.detected_privacy_items || [],
        aiAnalysis: ev.ai_analysis || null,
        engineerAssessment: ev.engineer_assessments && ev.engineer_assessments[0] ? {
          engineerId: ev.engineer_assessments[0].engineer_id,
          status: ev.engineer_assessments[0].status,
          comments: ev.engineer_assessments[0].comments
        } : null,
        govResponse: ev.gov_responses && ev.gov_responses[0] ? {
          department: ev.gov_responses[0].department,
          status: ev.gov_responses[0].status,
          responseDate: ev.gov_responses[0].response_date,
          statement: ev.gov_responses[0].statement
        } : null
      }));
    } catch (err) {
      console.warn('Error connecting to Supabase evidence table:', err);
      return null;
    }
  },

  // Insert a new privacy-reviewed evidence item into Supabase
  async submitEvidence(projectId, evidencePayload) {
    if (!isSupabaseConfigured() || !supabase) {
      return { success: true, isMock: true, data: evidencePayload };
    }

    try {
      const { data, error } = await supabase
        .from('evidence')
        .insert([
          {
            project_id: projectId,
            category: evidencePayload.category,
            title: evidencePayload.title,
            description: evidencePayload.description,
            submitted_by_pseudonym: evidencePayload.submittedBy || 'Citizen #A7K29',
            image_url: evidencePayload.imageUrl,
            privacy_reviewed: evidencePayload.privacyShieldVerified,
            detected_privacy_items: evidencePayload.detectedPrivacyItems,
            ai_analysis: evidencePayload.aiAnalysis,
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (error) {
        console.warn('Supabase evidence insertion error:', error.message);
        return { success: false, error: error.message };
      }

      return { success: true, isMock: false, data };
    } catch (err) {
      console.warn('Failed to insert evidence to Supabase:', err);
      return { success: false, error: err.message };
    }
  }
};