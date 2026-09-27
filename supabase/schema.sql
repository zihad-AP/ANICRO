-- ==============================================================================
-- ANTICRO CR-1 — Supabase Database Migration 01: 9 Core Tables (Rule #8)
-- ==============================================================================

-- 1. USERS TABLE (Rule #6, #9)
-- Contains private real identity details; MUST NEVER BE PUBLICLY EXPOSED.
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    real_name TEXT,
    email TEXT,
    role TEXT NOT NULL CHECK (role IN ('citizen', 'engineer', 'government', 'admin')) DEFAULT 'citizen',
    pseudonym TEXT NOT NULL UNIQUE,
    verification_status TEXT NOT NULL CHECK (verification_status IN ('active', 'verification_pending', 'rejected')) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. PROJECTS TABLE (Rule #8, #17)
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    department TEXT NOT NULL,
    location TEXT NOT NULL,
    budget NUMERIC NOT NULL DEFAULT 0,
    budget_formatted TEXT,
    expenditure NUMERIC NOT NULL DEFAULT 0,
    expenditure_formatted TEXT,
    completion_percentage INT NOT NULL DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
    status TEXT NOT NULL CHECK (status IN ('Pending', 'Acknowledged', 'Work Ongoing', 'Work Completed', 'Correction Requested', 'Awaiting Response')) DEFAULT 'Work Ongoing',
    is_verified_source BOOLEAN DEFAULT false,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    contractor TEXT NOT NULL,
    start_date DATE NOT NULL,
    expected_completion_date DATE NOT NULL,
    source_record TEXT NOT NULL,
    evidence_count INT DEFAULT 0,
    cases_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. CASES TABLE (Rule #8, #12)
CREATE TABLE IF NOT EXISTS public.cases (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    case_number TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('Pending', 'Under Review', 'Correction Ordered', 'Resolved')) DEFAULT 'Pending',
    ai_summary TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. EVIDENCE TABLE (Rule #8, #10, #11)
-- Stores original vaulted file URL as private, and privacy-shielded image for public preview.
CREATE TABLE IF NOT EXISTS public.evidence (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    case_id TEXT REFERENCES public.cases(id) ON DELETE SET NULL,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    submitted_by_pseudonym TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Fact', 'Observation', 'Allegation')),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    original_file_url TEXT, -- PRIVATE VAULT ONLY
    image_url TEXT,         -- PRIVACY-SHIELDED PUBLIC ASSET
    privacy_reviewed BOOLEAN NOT NULL DEFAULT false,
    detected_privacy_items JSONB DEFAULT '[]'::jsonb,
    ai_analysis JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. COMMENTS TABLE (Rule #8)
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    evidence_id TEXT REFERENCES public.evidence(id) ON DELETE CASCADE,
    case_id TEXT REFERENCES public.cases(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    submitted_by_pseudonym TEXT NOT NULL,
    comment_text TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. REPORTS TABLE (Rule #8)
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id TEXT REFERENCES public.cases(id) ON DELETE SET NULL,
    project_id TEXT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    report_type TEXT NOT NULL CHECK (report_type IN ('discrepancy_dossier', 'compliance_audit', 'resolution_summary')),
    content JSONB NOT NULL,
    generated_by_user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. GOV_RESPONSES TABLE (Rule #8, #14)
CREATE TABLE IF NOT EXISTS public.gov_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id TEXT REFERENCES public.cases(id) ON DELETE SET NULL,
    evidence_id TEXT REFERENCES public.evidence(id) ON DELETE CASCADE,
    department TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('Pending', 'Acknowledged', 'Work Ongoing', 'Work Completed', 'Correction Requested', 'Awaiting Response')) DEFAULT 'Awaiting Response',
    statement TEXT,
    response_date DATE DEFAULT CURRENT_DATE,
    responder_user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. ENGINEER_ASSESSMENTS TABLE (Rule #8, #15)
CREATE TABLE IF NOT EXISTS public.engineer_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id TEXT REFERENCES public.cases(id) ON DELETE SET NULL,
    evidence_id TEXT REFERENCES public.evidence(id) ON DELETE CASCADE,
    engineer_id TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('Verified', 'Verified On-Record', 'Flagged for Physical Audit', 'Under Expert Review', 'Completed Review', 'Critical Discrepancy Flagged')),
    comments TEXT NOT NULL,
    assessor_user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    audit_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. AUDIT_LOGS TABLE (Rule #8, #16)
-- Records admin identity accesses and sensitive actions; NEVER PUBLICLY READABLE.
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    target_user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    reason TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
\n\n-- ==============================================================================
-- ANTICRO CR-1 — Supabase Database Migration 02: Security, RLS & Views
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. PUBLIC-SAFE VIEWS (Rule #9 & Rule #11)
-- ------------------------------------------------------------------------------

-- Public Safe User Profile View: Never returns real_name or email
CREATE OR REPLACE VIEW public.public_user_profiles AS
SELECT 
    id,
    pseudonym,
    role,
    verification_status,
    created_at
FROM public.users;

-- Public Safe Evidence View: Never exposes raw original_file_url
CREATE OR REPLACE VIEW public.public_evidence AS
SELECT
    id,
    project_id,
    case_id,
    submitted_by_pseudonym,
    category,
    title,
    description,
    image_url,
    privacy_reviewed,
    detected_privacy_items,
    ai_analysis,
    created_at
FROM public.evidence
WHERE privacy_reviewed = true;

-- Grant SELECT access on public views to anonymous & authenticated users
GRANT SELECT ON public.public_user_profiles TO anon, authenticated;
GRANT SELECT ON public.public_evidence TO anon, authenticated;

-- ------------------------------------------------------------------------------
-- 2. ENABLE ROW LEVEL SECURITY (RLS) ON ALL 9 TABLES
-- ------------------------------------------------------------------------------
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gov_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.engineer_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 3. HELPER FUNCTIONS
-- ------------------------------------------------------------------------------

-- Check if current user is an active administrator
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin' AND verification_status = 'active'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if current user is a verified engineer (Rule #15)
CREATE OR REPLACE FUNCTION public.is_verified_engineer()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'engineer' AND verification_status = 'active'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if current user is an active government official (Rule #14)
CREATE OR REPLACE FUNCTION public.is_verified_government()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'government' AND verification_status = 'active'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ------------------------------------------------------------------------------
-- 4. RLS POLICIES
-- ------------------------------------------------------------------------------

-- (1) USERS POLICIES (Rule #9: Raw table never publicly exposed)
CREATE POLICY "Users can read own row"
ON public.users FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update own row"
ON public.users FOR UPDATE
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Admins can view users"
ON public.users FOR SELECT
TO authenticated
USING (public.is_admin());

-- (2) PROJECTS POLICIES (Public read access)
CREATE POLICY "Public read projects"
ON public.projects FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admins manage projects"
ON public.projects FOR ALL
TO authenticated
USING (public.is_admin());

-- (3) CASES POLICIES (Public read access)
CREATE POLICY "Public read cases"
ON public.cases FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Authorized roles manage cases"
ON public.cases FOR ALL
TO authenticated
USING (public.is_admin() OR public.is_verified_engineer() OR public.is_verified_government());

-- (4) EVIDENCE POLICIES (Rule #11: Privacy reviewed gate)
CREATE POLICY "Public read privacy reviewed evidence"
ON public.evidence FOR SELECT
TO anon, authenticated
USING (privacy_reviewed = true);

CREATE POLICY "Users can read own unreviewed evidence"
ON public.evidence FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users submit evidence"
ON public.evidence FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Users can update own evidence"
ON public.evidence FOR UPDATE
TO authenticated
USING (auth.uid() = user_id OR public.is_admin());

-- (5) COMMENTS POLICIES
CREATE POLICY "Public read comments"
ON public.comments FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Authenticated users insert comments"
ON public.comments FOR INSERT
TO authenticated
WITH CHECK (true);

-- (6) REPORTS POLICIES
CREATE POLICY "Public read reports"
ON public.reports FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Authorized users insert reports"
ON public.reports FOR INSERT
TO authenticated
WITH CHECK (public.is_admin() OR public.is_verified_engineer());

-- (7) GOV_RESPONSES POLICIES (Rule #14: Government writes require government role)
CREATE POLICY "Public read government responses"
ON public.gov_responses FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Verified government officials write responses"
ON public.gov_responses FOR INSERT
TO authenticated
WITH CHECK (public.is_verified_government() OR public.is_admin());

CREATE POLICY "Verified government officials update responses"
ON public.gov_responses FOR UPDATE
TO authenticated
USING (public.is_verified_government() OR public.is_admin());

-- (8) ENGINEER_ASSESSMENTS POLICIES (Rule #15: Assessment writes require engineer role)
CREATE POLICY "Public read engineer assessments"
ON public.engineer_assessments FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Verified engineers write assessments"
ON public.engineer_assessments FOR INSERT
TO authenticated
WITH CHECK (public.is_verified_engineer() OR public.is_admin());

CREATE POLICY "Verified engineers update assessments"
ON public.engineer_assessments FOR UPDATE
TO authenticated
USING (public.is_verified_engineer() OR public.is_admin());

-- (9) AUDIT_LOGS POLICIES (Rule #16: Never publicly readable)
CREATE POLICY "Admins only read audit logs"
ON public.audit_logs FOR SELECT
TO authenticated
USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- 5. ADMIN IDENTITY ACCESS AUDITED FUNCTION (Rule #16)
-- Accessing real citizen identity requires a mandatory reason and logs an audit record.
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_user_identity_for_audit(
    target_user_uuid UUID,
    access_reason TEXT
)
RETURNS TABLE (
    id UUID,
    real_name TEXT,
    email TEXT,
    pseudonym TEXT,
    role TEXT,
    verification_status TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    caller_role TEXT;
BEGIN
    -- Verify caller is active admin
    SELECT u.role INTO caller_role FROM public.users u WHERE u.id = auth.uid() AND u.verification_status = 'active';
    IF caller_role IS NULL OR caller_role != 'admin' THEN
        RAISE EXCEPTION 'Access Denied: Only active administrators can access real user identity.';
    END IF;

    -- Verify access reason is non-empty
    IF access_reason IS NULL OR trim(access_reason) = '' THEN
        RAISE EXCEPTION 'Access Denied: A mandatory non-empty reason is required to access real identity.';
    END IF;

    -- Insert audit log record
    INSERT INTO public.audit_logs (admin_id, action, target_user_id, reason)
    VALUES (auth.uid(), 'ADMIN_IDENTITY_ACCESS', target_user_uuid, access_reason);

    -- Return identity details
    RETURN QUERY
    SELECT u.id, u.real_name, u.email, u.pseudonym, u.role, u.verification_status
    FROM public.users u
    WHERE u.id = target_user_uuid;
END;
$$;

-- ------------------------------------------------------------------------------
-- 6. AUTOMATED USER REGISTRATION TRIGGER (Rule #6, #9)
-- Sets pseudonyms and enforces verification_pending on engineer & gov roles.
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
    chosen_role TEXT;
    v_status TEXT;
    random_suffix TEXT;
    generated_pseudonym TEXT;
BEGIN
    chosen_role := COALESCE(new.raw_user_meta_data->>'role', 'citizen');
    
    -- Rule #6: Engineer & Government accounts default to verification_pending
    IF chosen_role IN ('engineer', 'government') THEN
        v_status := 'verification_pending';
    ELSE
        v_status := 'active';
    END IF;

    -- Generate Pseudonym (e.g. Citizen #A7K29)
    random_suffix := upper(substr(md5(random()::text), 1, 5));
    IF chosen_role = 'engineer' THEN
        generated_pseudonym := 'Engineer #ENG-' || random_suffix;
    ELSIF chosen_role = 'government' THEN
        generated_pseudonym := 'Official #GOV-' || random_suffix;
    ELSIF chosen_role = 'admin' THEN
        generated_pseudonym := 'Admin #SYS-' || random_suffix;
    ELSE
        generated_pseudonym := 'Citizen #' || random_suffix;
    END IF;

    INSERT INTO public.users (
        id,
        real_name,
        email,
        role,
        pseudonym,
        verification_status
    ) VALUES (
        new.id,
        new.raw_user_meta_data->>'real_name',
        new.email,
        chosen_role,
        generated_pseudonym,
        v_status
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger execution on auth.users registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
\n\n-- ==============================================================================
-- ANTICRO CR-1 — Supabase Database Migration 03: Seed Projects & Evidence
-- ==============================================================================

-- 1. SEED PROJECTS (6 initial simulated projects)
INSERT INTO public.projects (
    id, name, department, location, budget, budget_formatted, expenditure, expenditure_formatted,
    completion_percentage, status, is_verified_source, category, description, contractor,
    start_date, expected_completion_date, source_record, evidence_count, cases_count
) VALUES
(
    'pr-01',
    'Riverside Municipal Water Treatment Plant Expansion',
    'Department of Water Resources & Sanitation',
    'Riverside County, Sector 4-B',
    14200000,
    '$14,200,000',
    9850000,
    '$9,850,000',
    70,
    'Work Ongoing',
    false,
    'Water & Sanitation',
    'Construction of advanced multi-stage filtration units, tertiary clarifiers, and pipeline interconnection for 45,000 residents.',
    'Apex Infrastructure & Civil Engineering Ltd.',
    '2024-03-15',
    '2025-11-30',
    'State Infrastructure Portal Ref: WRS-2024-00892',
    3,
    1
),
(
    'pr-02',
    'Metro Transit Line-4 Elevated Overpass & Flyover',
    'Urban Transit Authority & Public Works',
    'Central Metro Corridor, Pier 12 to 28',
    28500000,
    '$28,500,000',
    24100000,
    '$24,100,000',
    85,
    'Work Ongoing',
    false,
    'Transportation',
    'Construction of 2.4km elevated transit viaduct, seismic damper installation, and acoustic noise barrier panels.',
    'Metro Bridge & Structural Consortium',
    '2023-08-01',
    '2025-06-30',
    'City Transit Capital Works Registry #UTA-2023-L4',
    2,
    1
),
(
    'pr-03',
    'Highland Public Library & Digital Learning Community Hub',
    'Department of Community Development & Public Libraries',
    'North Highland Sector, Block C-7',
    4800000,
    '$4,800,000',
    4800000,
    '$4,800,000',
    100,
    'Work Completed',
    false,
    'Civic Facilities',
    'Two-story civic library facility featuring 60-seat digital lab, community meeting spaces, rooftop solar installation, and ADA accessibility.',
    'Civic Horizon Builders Co.',
    '2023-01-10',
    '2024-04-30',
    'Municipal Civic Infrastructure Register #LIB-2023-88',
    2,
    0
),
(
    'pr-04',
    'Greenfield District Primary Health Center Upgrade',
    'Ministry of Public Health & Rural Infrastructure',
    'Greenfield Sub-District, Sector 9',
    6300000,
    '$6,300,000',
    3200000,
    '$3,200,000',
    45,
    'Pending',
    false,
    'Healthcare',
    'Modernization of 40-bed maternal care unit, emergency trauma wing, solar backup microgrid, and cold-chain vaccine storage.',
    'Vanguard Health Infrastructure Group',
    '2024-04-01',
    '2025-12-31',
    'Health Infrastructure Development Fund #HCF-2024-031',
    0,
    0
),
(
    'pr-05',
    'Oakridge Smart Traffic Signal & Pedestrian Crossing Network',
    'Municipal Department of Transportation',
    'Oakridge Commercial Corridor, 14 Intersections',
    1850000,
    '$1,850,000',
    1400000,
    '$1,400,000',
    75,
    'Work Ongoing',
    false,
    'Smart City',
    'Installation of 32 AI-adaptive traffic signal controllers, tactile pedestrian sensors, and high-visibility LED crosswalk warnings.',
    'SmartGrid Traffic Solutions Inc.',
    '2024-02-01',
    '2025-04-30',
    'Smart City Modernization Project #TRF-2024-89',
    1,
    0
),
(
    'pr-06',
    'Grand Central Stormwater Drainage & Flood Mitigation Canal',
    'Flood Control District & Civil Protection Agency',
    'South Basin Marshland Buffer, Reach 1-6',
    19400000,
    '$19,400,000',
    18900000,
    '$18,900,000',
    92,
    'Correction Requested',
    false,
    'Flood Mitigation',
    '4.8km reinforced concrete stormwater diversion canal, retention basin sluice gates, and automated water-level telemetry sensors.',
    'HydraTech Civil Engineering Consortium',
    '2023-04-15',
    '2024-10-31',
    'Regional Climate Resilience Fund #FLD-2023-019',
    2,
    1
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    budget = EXCLUDED.budget,
    expenditure = EXCLUDED.expenditure,
    completion_percentage = EXCLUDED.completion_percentage,
    status = EXCLUDED.status;

-- 2. SEED CASES
INSERT INTO public.cases (id, project_id, case_number, title, status, ai_summary)
VALUES
(
    'case-wtr-01',
    'pr-01',
    'CASE-WTR-2024-04',
    'Clarifier Unit #2 Foundation Milestone Discrepancy',
    'Under Review',
    'Contractor claimed milestone completion for clarifier concrete pour; field observation indicates exposed rebar.'
),
(
    'case-tra-01',
    'pr-02',
    'CASE-TRA-2024-18',
    'Pier 18 Damper Bearing Specification Inquiry',
    'Under Review',
    'Aerial imagery indicates installed bearing pads differ in geometry from Class-IV damper specs.'
),
(
    'case-fld-01',
    'pr-06',
    'CASE-FLD-2024-09',
    'Reach 3 Culvert Wall Thickness Non-Conformance',
    'Correction Ordered',
    'Field caliper measurement indicated culvert wall thickness 180mm against mandated 300mm standard.'
)
ON CONFLICT (id) DO NOTHING;

-- 3. SEED EVIDENCE
INSERT INTO public.evidence (
    id, project_id, case_id, submitted_by_pseudonym, category, title, description,
    image_url, privacy_reviewed, detected_privacy_items, ai_analysis, created_at
) VALUES
(
    'ev-101',
    'pr-01',
    'case-wtr-01',
    'Citizen #A7K29',
    'Fact',
    'Official Milestone Report #03 (Clarifier Concrete Pour)',
    'Official contractor billing records state that Tertiary Clarifier Unit #2 completed all structural concrete pour on Sept 14, 2024.',
    'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
    true,
    '["1 Face blurred", "1 Vehicle license plate redacted", "GPS sanitized"]'::jsonb,
    '{"summary": "Contract milestone document matched against approved procurement schedule.", "potentialDiscrepancy": false, "discrepancyNote": "Document corresponds to official tender schedule item 4.2.", "duplicateStatus": "unique", "neutralCaveat": "No conflicting evidence identified. This does not confirm the project is fully complete or accurate."}'::jsonb,
    '2024-09-18 10:30:00+00'
),
(
    'ev-102',
    'pr-01',
    'case-wtr-01',
    'Citizen #B4X92',
    'Observation',
    'Photographic Evidence: Unfinished Clarifier Foundation',
    'High-resolution perimeter survey photo showing Tertiary Clarifier Unit #2 still has exposed rebar mesh without concrete foundation poured as of Oct 02, 2024.',
    'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
    true,
    '["2 Worker faces blurred", "EXIF GPS converted to public ward bounds"]'::jsonb,
    '{"summary": "Visual analysis compares photographed structure with CAD blueprint for Clarifier #2.", "potentialDiscrepancy": true, "discrepancyNote": "Contractor claimed completion of concrete pour in Milestone #03, whereas ground photo indicates incomplete foundation slab.", "duplicateStatus": "independent_corroboration", "neutralCaveat": "This is a potential discrepancy for human review, not a finding of wrongdoing."}'::jsonb,
    '2024-10-03 14:15:00+00'
),
(
    'ev-103',
    'pr-01',
    'case-wtr-01',
    'Citizen #F2M55',
    'Allegation',
    'Community Inquiry on Premature Milestone Disbursement',
    'Community resident association inquiry regarding whether billing milestone 3 was disbursed prior to site verification.',
    NULL,
    true,
    '["Text-only submission sanitized"]'::jsonb,
    '{"summary": "Case matched with existing Discrepancy Case #CASE-WTR-04.", "potentialDiscrepancy": true, "discrepancyNote": "Inquiry correlates with existing case timeline.", "duplicateStatus": "possible_duplicate", "neutralCaveat": "This is a potential discrepancy for human review, not a finding of wrongdoing."}'::jsonb,
    '2024-10-12 09:00:00+00'
),
(
    'ev-201',
    'pr-02',
    'case-tra-01',
    'Citizen #T9P11',
    'Fact',
    'Contract Specifications for Seismic Dampers (Class-IV)',
    'Tender document Section 8.4 mandates Class-IV elastomeric seismic bearings across all 16 pier caps.',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    true,
    '["1 Document watermark sanitized"]'::jsonb,
    '{"summary": "Technical baseline established against municipal standard.", "potentialDiscrepancy": false, "discrepancyNote": "Matches published transit authority design standards.", "duplicateStatus": "unique", "neutralCaveat": "No conflicting evidence identified. This does not confirm the project is fully complete or accurate."}'::jsonb,
    '2024-05-14 11:20:00+00'
),
(
    'ev-202',
    'pr-02',
    'case-tra-01',
    'Citizen #L3R88',
    'Observation',
    'Drone Imagery: Pier 18 Bearing Assembly Installation',
    'Aerial evidence shows installed bearing pads at Pier 18 appear to be standard grade neoprene rather than specified multi-directional seismic dampers.',
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
    true,
    '["License plate obscured", "Altitude & serial metadata scrubbed"]'::jsonb,
    '{"summary": "Visual model highlights component geometry variance between standard neoprene pad and Class-IV damper.", "potentialDiscrepancy": true, "discrepancyNote": "Installed component dimensions exhibit variance from approved structural blueprint #DR-88.", "duplicateStatus": "unique", "neutralCaveat": "This is a potential discrepancy for human review, not a finding of wrongdoing."}'::jsonb,
    '2024-08-22 16:45:00+00'
)
ON CONFLICT (id) DO NOTHING;

-- 4. SEED ENGINEER ASSESSMENTS
INSERT INTO public.engineer_assessments (
    evidence_id, case_id, engineer_id, status, comments, audit_date
) VALUES
(
    'ev-101',
    'case-wtr-01',
    'Engineer #ENG-882',
    'Verified On-Record',
    'Documentation matches public procurement registry item 4.2.',
    '2024-09-20'
),
(
    'ev-102',
    'case-wtr-01',
    'Engineer #ENG-409',
    'Flagged for Physical Audit',
    'Exposed grade-60 rebar suggests structural pour phase was deferred. Recommending on-site core inspection.',
    '2024-10-06'
),
(
    'ev-201',
    'case-tra-01',
    'Engineer #ENG-102',
    'Verified',
    'Baseline standard verified against AASHTO specifications.',
    '2024-05-18'
),
(
    'ev-202',
    'case-tra-01',
    'Engineer #ENG-102',
    'Under Expert Review',
    'Independent load rating test recommended before rail girder placement.',
    '2024-08-28'
)
ON CONFLICT DO NOTHING;

-- 5. SEED GOV RESPONSES
INSERT INTO public.gov_responses (
    evidence_id, case_id, department, status, response_date, statement
) VALUES
(
    'ev-101',
    'case-wtr-01',
    'Department of Water Resources',
    'Acknowledged',
    '2024-09-22',
    'Record received and matched to milestone claim.'
),
(
    'ev-102',
    'case-wtr-01',
    'Department of Water Resources',
    'Work Ongoing',
    '2024-10-10',
    'Sub-divisional engineer dispatched to verify contractor milestone certification.'
),
(
    'ev-103',
    'case-wtr-01',
    'Department of Water Resources',
    'Awaiting Response',
    NULL,
    NULL
),
(
    'ev-201',
    'case-tra-01',
    'Urban Transit Authority',
    'Acknowledged',
    '2024-05-20',
    'Specification acknowledged as binding contract requirement.'
),
(
    'ev-202',
    'case-tra-01',
    'Urban Transit Authority',
    'Correction Requested',
    '2024-09-05',
    'Contractor instructed to submit certified manufacturer testing sheet for Pier 18 bearings.'
)
ON CONFLICT DO NOTHING;