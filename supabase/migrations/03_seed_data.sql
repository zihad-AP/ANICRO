-- ==============================================================================
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