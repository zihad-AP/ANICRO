# ANTICRO CR-1 — Permanent Project Instructions

## 1. Project identity

Project name: ANTICRO CR-1 — Public Project Accountability.

ANTICRO is a civic-tech evidence platform connecting public project records, citizen evidence, AI-assisted analysis, expert review, and government response.

Core product idea:

Observe → Capture Evidence → Privacy Shield → AI Analysis → Case Matching → Expert Review → Government Response → Resolution

The prototype is being built for a hackathon demonstration.

This is a prototype, not a production platform.

---

## 2. Source of truth

Treat the ANTICRO project specifications supplied by the user as the source of truth.

Do not invent major features or architecture that contradicts those specifications.

When there is a choice between adding a new feature and keeping the prototype scope small, prefer the smallest implementation that supports the demonstrated end-to-end flow.

Do not expand the prototype into the full production platform unless explicitly instructed.

---

## 3. Prototype philosophy

Build a credible, polished, working end-to-end prototype.

Prioritize:

1. Working user flow
2. Clear UX
3. Privacy protection
4. Neutral AI language
5. Correct data relationships
6. Reliable demo behavior
7. Visual polish

Do not spend hackathon time building unnecessary production infrastructure.

---

## 4. Frontend

Use:

* React
* Vite
* Tailwind CSS
* react-router-dom

Use a clean civic-tech visual style.

Preferred visual language:

* navy / indigo primary
* teal / cyan secondary
* white cards
* rounded corners
* clean spacing
* professional typography
* restrained use of gradients
* responsive design
* mobile-friendly layout

Avoid:

* excessive gradients
* gaming-style UI
* excessive animations
* clutter
* fake futuristic interfaces
* dark interfaces that reduce readability

---

## 5. Core frontend pages

The prototype should support the following core pages and flows:

* Landing page
* Project dashboard/list
* Project detail
* Evidence submission
* Privacy Shield review
* Case detail
* Government response
* Engineer assessment
* Appropriate authentication/role screens required for the demo

The frontend must ultimately connect to the Supabase backend rather than relying permanently on dummy data.

---

## 6. Four user roles

The prototype supports:

* citizen
* engineer
* government
* admin

Engineer and government accounts must not automatically become active.

Their verification status begins as:

`verification_pending`

until approved by an administrator.

---

## 7. Core backend architecture

Use Supabase for:

* PostgreSQL database
* authentication
* storage
* REST/data access
* Row Level Security

Do not create a custom backend server unless explicitly requested.

AI-related operations may use a small serverless function.

---

## 8. Prototype database

The prototype backend uses these 9 tables:

1. users
2. projects
3. cases
4. evidence
5. comments
6. reports
7. gov_responses
8. engineer_assessments
9. audit_logs

Do not add production-only tables unless explicitly instructed.

---

## 9. Important user privacy rule

The raw `users` table must never be publicly exposed.

Public-facing UI showing who submitted something must use the public-safe user profile view.

Citizens use a public pseudonym such as:

`Citizen #A7K29`

Never expose a citizen's private real name or email publicly.

---

## 10. Evidence categories

Evidence uses exactly these categories:

* Fact
* Observation
* Allegation

Do not treat these categories as interchangeable.

The conceptual evidence chain is:

Fact → Observation → AI Finding → Allegation → Determination

AI findings are not determinations of wrongdoing.

---

## 11. Privacy Shield

Privacy protection is a core feature, not optional polish.

Evidence upload flow:

1. User uploads evidence.
2. Original file is stored privately.
3. Privacy scan is performed.
4. Detected privacy-sensitive items are shown.
5. A protected image preview is generated.
6. User explicitly confirms use of the protected image.
7. Only then can the protected image become publicly displayable.
8. AI evidence analysis can then occur.

The original uploaded file must never be publicly returned.

Never bypass the `privacy_reviewed` gate.

---

## 12. AI behavior

The prototype has three AI-related functions:

### Privacy scan

Input: image URL

Output should be structured, for example:

* detected items
* counts
* protected image URL

### Evidence/case matching

Compare new evidence with existing evidence for the same project.

Return structured information including:

* matched case ID or null
* duplicate status
* neutral AI summary

Duplicate status may be:

* unique
* possible_duplicate
* independent_corroboration

### Case chatbot

The chatbot must answer questions using only information actually available for that case, including its project, evidence, and response data.

If information is insufficient, say so rather than inventing an answer.

Mock AI is acceptable for the hackathon, but never claim a real external AI connection if one does not exist.

---

## 13. AI safety / neutrality

Never make an AI output sound like a proven accusation.

When a potential discrepancy is detected, use:

"This is a potential discrepancy for human review, not a finding of wrongdoing."

When no discrepancy is identified, use:

"No conflicting evidence identified. This does not confirm the project is fully complete or accurate."

These are fixed product strings and must not be casually rewritten.

Every AI finding requires human review.

---

## 14. Government response

Government participation is framed as structured tracking and response management, not as an accusation system.

Use neutral response statuses.

Do not describe government silence as guilt or avoidance.

Preferred waiting status:

"Awaiting Response"

Government response statuses include:

* Pending
* Acknowledged
* Work Ongoing
* Work Completed
* Correction Requested

---

## 15. Engineer assessment

Engineer assessments are separate from AI findings.

The application must verify that the current user has the engineer role before allowing an engineer assessment to be created.

---

## 16. Admin identity access

Real identity is sensitive.

If an administrator accesses a citizen's real identity, that access must:

* require a reason
* be recorded in `audit_logs`

The audit log must never be publicly readable.

This requirement must not be removed for convenience.

---

## 17. Real vs simulated project data

The hackathon prototype may contain fictional/seeded projects.

Exactly one project may be sourced from a real public record for credibility.

For the real project:

Only the official record information should be treated as real:

* project name
* department/agency
* location
* approved budget
* expenditure if disclosed
* official completion/status
* source

Do not attach fictional allegations, fictional evidence, or fictional discrepancies to a real project/entity.

Clearly distinguish:

`Verified Source`

from:

`Simulated Data`

---

## 18. Important UI copy

Use:

Tagline:

"Connecting public records to public evidence."

Discrepancy:

"This is a potential discrepancy for human review, not a finding of wrongdoing."

No discrepancy:

"No conflicting evidence identified. This does not confirm the project is fully complete or accurate."

Empty evidence timeline:

"No evidence submitted yet — be the first to contribute."

Real data badge:

"Verified Source"

Fictional data badge:

"Simulated Data"

Government waiting status:

"Awaiting Response"

---

## 19. Scope boundaries

Do NOT build these unless explicitly requested:

* historical transparency-score tracking
* relationship graph
* project maps
* natural-language global queries
* detailed historical timeline table
* separate verification-request table
* advanced coordinated-abuse detection
* production-grade rate limiting
* advanced malware scanning
* full whistleblower system
* real government integration

These may be described as future work.

---

## 20. Development behavior

Before making large changes:

1. Inspect the existing project.
2. Understand the current architecture.
3. Reuse existing components when appropriate.
4. Do not overwrite working functionality unnecessarily.
5. Keep changes small and testable.
6. Run the application after major changes.
7. Check browser console errors.
8. Test navigation.
9. Test the complete user flow.

If something is ambiguous, ask rather than silently inventing a major requirement.

---

## 21. Testing priority

The most important test is the complete demo flow:

Citizen login
→ Dashboard
→ Select project
→ Upload photo
→ Privacy scan
→ Confirm protected image
→ AI analysis
→ Existing case matched or new case created
→ Neutral AI summary
→ Citizen adds evidence
→ Government responds
→ Engineer submits assessment
→ Citizen sees updated case

The prototype should be optimized around this flow.

---

## 22. Demo discipline

This is a hackathon prototype.

Do not add features simply because they sound impressive.

A smaller flow that works reliably is better than a huge system with broken features.

Never claim something is implemented when it is only mocked.

Clearly identify mocked AI behavior when appropriate.

---

## 23. When receiving new instructions

For every new user instruction:

1. Check it against these project rules.
2. Preserve the existing architecture unless change is necessary.
3. Prefer the prototype scope.
4. Protect privacy requirements.
5. Preserve neutral language.
6. Avoid unnecessary dependencies.
7. Explain conflicts before making a contradictory change.

These instructions remain active throughout the ANTICRO project.