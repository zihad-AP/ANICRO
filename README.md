# ANTICRO CR-1 — Public Project Accountability

> **"Connecting public records to public evidence."**  
> *Turn citizen development needs into evidence-backed infrastructure priorities.*

ANTICRO CR-1 is an end-to-end civic accountability and infrastructure intelligence platform built for hackathon demonstration. It connects ground-level citizen reports (voice and text in English and Hindi), multimodal Google Gemini AI understanding, spatial demand clustering, a deterministic 6-factor priority engine, and an executive government decision view to official public projects, photographic evidence, and verified resolutions.

---

## 🏛️ The 5-Step Core Pipeline

ANTICRO closes the civic feedback loop across 5 operational phases:

```
  [ Observe ]       Citizens report real-world infrastructure gaps via voice or text (English / Hindi)
       ↓
 [ Understand ]     Google Gemini extracts structured civic parameters, severity, and service impacts
       ↓
  [ Prioritize ]    Deterministic 6-factor engine ranks corridor hotspots (100-point scale)
       ↓
    [ Act ]         Government triage assigns departments, tracks status, and links capital projects
       ↓
   [ Verify ]       Privacy Shield-protected evidence, engineering audit, and transparent resolution
```

---

## 🔄 The 9-Stage Civic Accountability Journey

On every project detail view (`/project/:id`), ANTICRO displays the full life-cycle trajectory:

1. **Citizen Need Reported [✓]** — Ground-level voice or text intake.
2. **AI Understanding [✓]** — Multilingual semantic extraction by Gemini.
3. **Demand Pattern Identified [✓]** — Clustered into spatial corridor hotspot.
4. **Priority Recommended [✓]** — 6-factor deterministic model scoring.
5. **Government Review [✓]** — Departmental triage & preliminary review.
6. **Project Linked [✓]** — Bound to official capital scheme & budget.
7. **Implementation [●]** — Physical civil engineering works in progress.
8. **Verification [○]** — Multi-stakeholder physical inspection & evidence audit.
9. **Resolution [○]** — Permanent civic closure with verified operational status.

---

## 🧠 Google Gemini AI Integration

ANTICRO integrates **Google Gemini (2.5 Flash / 1.5 Flash)** with a strict security architecture:

- **Server-Side Only**: The Gemini API is called exclusively via Vite backend server middleware (`server/geminiService.js`).
- **Zero Client Leakage**: `GEMINI_API_KEY` is strictly server-side. No `VITE_GEMINI_API_KEY` exists in frontend bundles.
- **Multilingual Support**: Fully parses both English and Hindi vernacular reports, mapping slang and regional descriptors into standard civic taxonomy.
- **Strict Neutrality**: AI provides decision support, never unsubstantiated accusations.
  - *"This is a potential discrepancy for human review, not a finding of wrongdoing."*
  - *"AI-assisted decision support. Final prioritization requires human, engineering, budgetary and government review."*

### Supported AI Endpoints
- `GET /api/ai/status` — Live health check of Gemini connectivity and server configuration.
- `POST /api/ai/analyze-development-request` — Multilingual extraction of category, severity, urgency, and affected services from citizen text/voice.
- `POST /api/ai/analyze-priority` — Executive synthesis and rationale for capital prioritization.
- `POST /api/ai/analyze-evidence` — Evidence discrepancy assessment against official project specifications.

---

## 📊 Deterministic 6-Factor Priority Model

Hotspot prioritization is calculated using a transparent 100-point formula:

$$\text{Priority Score} = \text{Demand (25%)} + \text{Severity (20%)} + \text{Population (20%)} + \text{Deficit (15%)} + \text{Evidence (10%)} + \text{Trend (10%)}$$

This ensures reproducible, unbiased ranking that resists astroturfing while highlighting genuine community hardship.

---

## 🇮🇳 Designed for India

- **10 Prototype States**: Karnataka, Tamil Nadu, Uttar Pradesh, Maharashtra, Delhi NCR, West Bengal, Telangana, Rajasthan, Bihar, and Kerala.
- **Urban & Rural Realities**: Covers both municipal corporation wards (flooding, metro link deficits, industrial road craters) and rural Gram Panchayats (drinking water contamination, irrigation canal breaches).
- **Vernacular Voice First**: Built-in speech recognition for citizens who prefer speaking in Hindi or English over typing.

---

## 🎬 Prepared Hackathon Demo Scenarios

ANTICRO includes 4 pre-configured canonical scenarios for live demonstration:

| # | Scenario | Location | Category | Primary Impact |
|---|---|---|---|---|
| **1** | **Flooding & Drainage Collapse** | East Tambaram, Chennai, Tamil Nadu | Drainage & Flood Mitigation | 12,600 residents cut off; ambulance disruption |
| **2** | **Drinking Water Contamination** | Ward 14, Varanasi, Uttar Pradesh | Water Supply & Sanitation | 18,400 residents; jaundice cases reported |
| **3** | **Heavy Freight Road Craters** | Peenya Industrial Area, Bengaluru, Karnataka | Transport & Roads | 42,000 daily commuters; spine injuries, gridlock |
| **4** | **Hindi Voice Intake (पीने का पानी)** | Ward 14, Varanasi, Uttar Pradesh | पेयजल एवं स्वच्छता | 18,400 नागरिक; गंदे पानी की समस्या |

Use the floating **"Demo Guide"** widget on the bottom right of any screen to trigger these flows with a single click.

---

## 🛡️ Privacy Shield Architecture

To protect citizen identity and prevent retaliatory action:
1. **Pseudonymization**: Citizens are publicly identified only as `Citizen #A7K29` or similar hashed pseudonyms.
2. **Metadata Scrubbing**: EXIF data and GPS precision are normalized.
3. **Face & License Plate Obfuscation**: Automated detection shields personally identifiable elements before evidence is published.
4. **Human Confirmation Gate**: No photograph becomes public until the citizen confirms the protected preview.

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- Node.js 18+ (tested on Node v20/v22)
- npm or pnpm
- Google Gemini API Key ([Get one free at Google AI Studio](https://aistudio.google.com/app/apikey))

### 1. Clone & Install
```bash
git clone https://github.com/your-org/anticro.git
cd anticro
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```
Edit `.env` and add your Google Gemini API key:
```env
GEMINI_API_KEY=AIzaSy...your_real_gemini_api_key...
```

### 3. Start Development Server
```bash
npm run dev
```
The application will start at `http://localhost:5173`. The Vite server automatically spins up the server-side Gemini AI middleware on port 5173 under `/api/ai/*`.

### 4. Run Automated Test Suite
```bash
node scratch/test_step9_final_demo.js
```
This tests all 4 canonical scenarios and verifies live Gemini multilingual analysis and scoring.

### 5. Production Build
```bash
npm run build
```

---

## 📂 Core Project Architecture

```
anticro/
├── server/
│   ├── geminiService.js          # Server-side Gemini API client (API key never leaves server)
│   ├── viteAiMiddleware.js       # Vite plugin exposing /api/ai/* routes
├── src/
│   ├── components/
│   │   ├── DemoFlowHelper.jsx    # Floating hackathon demo guide widget
│   │   ├── DataMethodModal.jsx   # Data provenance & 6-factor methodology modal
│   │   ├── ReportNeedModal.jsx   # Multilingual citizen voice/text intake modal
│   │   ├── PrivacyShieldModal.jsx# Privacy scrub & preview gate
│   │   ├── IndiaMapVisualization.jsx # 10-state SVG geographic intelligence map
│   │   ├── IndiaCoveragePanel.jsx# Multi-state coverage metrics & distribution
│   │   └── HotspotDetail.jsx     # Deep dive into demand cluster & AI synthesis
│   ├── data/
│   │   ├── mockProjects.js       # Official capital projects (simulated & verified)
│   │   ├── mockDemandIntelligence.js # Clustered hotspots & corridor datasets
│   │   └── indiaGeoData.js       # GeoJSON/SVG centroids & coordinates for 10 states
│   ├── pages/
│   │   ├── LandingPage.jsx       # Hero, 5-step pipeline, India section, provenance
│   │   ├── DecisionViewPage.jsx  # National Infrastructure Demand Intelligence
│   │   ├── DemandHotspotsPage.jsx# Geographic corridor hotspot list & filter
│   │   ├── ProjectDetailPage.jsx # 9-step timeline, evidence, gov response, resolution
│   │   └── ProjectsPage.jsx      # Projects registry & health tracker
│   ├── services/
│   │   ├── aiService.js          # Frontend client for /api/ai/* endpoints
│   │   ├── hotspotEngine.js      # 6-factor deterministic scoring engine
│   │   └── projectLifecycleEngine.js # 9-step timeline & status state transitions
│   ├── App.jsx                   # Master routing & global modal state
│   └── main.jsx                  # Entry point
├── .env.example                  # Safe config template with placeholder keys
└── README.md                     # This documentation
```

---

## ⚖️ Civic Tech & AI Safety Disclaimers

1. **Demonstration Prototype**: ANTICRO is developed for civic-tech demonstration and hackathon evaluation. Data records labeled `Simulated Data` are realistic models designed to illustrate institutional scale.
2. **AI Is Decision Support**: ANTICRO never automates procurement, budgetary sanctions, or judicial judgments. Every AI suggestion requires verified human and engineering review.
3. **Neutrality by Design**: Discrepancies identified by AI between citizen evidence and official records are flagged as *"potential discrepancies for human review, not findings of wrongdoing"*.
