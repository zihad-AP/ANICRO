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