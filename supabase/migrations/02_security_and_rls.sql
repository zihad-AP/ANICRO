-- ==============================================================================
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