// ANTICRO CR-1 — Mock Cases Registry & Timeline
// Source of truth compliant with AGENTS.md Rules #6, #8, #10, #11, #12, #13, #14, #15
// Clean civic-tech evidence platform connecting projects, citizen evidence, AI, expert review, and government response.

export const INITIAL_CASES = [
  {
    id: "case-wtr-01",
    caseNumber: "AC-1042",
    projectId: "pr-01",
    projectName: "Riverside Stormwater & Access Corridor Upgrade",
    title: "Dual 1200mm Box Culvert Section #2 Foundation Discrepancy",
    issueCategory: "Drainage",
    status: "Government Response Pending", // Awaiting Response | Pending | Under Review | Work Ongoing | Correction Ordered | Resolved
    aiSummary: "Contractor claimed milestone completion for box culvert concrete pour; field photographic observation indicates exposed grade-60 rebar without poured slab foundation.",
    evidenceCount: 3,
    independentObservationsCount: 1,
    createdDate: "2024-09-18",
    createdAt: "2024-09-18T10:30:00Z",
    citizenReport: {
      reportId: "CIT-REP-8821",
      submittedBy: "Citizen #A7K29",
      submittedDate: "2024-09-18",
      title: "Incomplete Culvert Pour vs Official Milestone Billing Record",
      description: "Official contractor billing milestone #03 indicates Dual 1200mm Box Culvert Section #2 completed all structural concrete pours on Sept 14, 2024. Physical inspection at Sector 4-B junction showed exposed rebar mesh without concrete foundation poured."
    },
    aiAnalysis: {
      summary: "Contract milestone document matched against approved procurement schedule and ground photographic survey.",
      potentialDiscrepancy: true,
      discrepancyNote: "Contractor claimed completion of concrete pour in Milestone #03, whereas ground photo indicates incomplete foundation slab at Sector 4-B junction.",
      duplicateStatus: "independent_corroboration",
      neutralCaveat: "This is a potential discrepancy for human review, not a finding of wrongdoing."
    },
    govResponse: {
      status: "Work Ongoing",
      department: "Maharashtra Public Works & Pune Municipal Corporation",
      responseDate: "2024-10-10",
      statement: "Sub-divisional engineer dispatched to verify contractor milestone certification. Core culvert rehabilitation is currently underway under active engineering supervision.",
      nextAction: "Complete remaining 450m culvert foundation and conduct pre-monsoon flow audit."
    },
    engineerAssessment: {
      engineerId: "Engineer #ENG-409",
      status: "Flagged for Physical Audit",
      auditDate: "2024-10-06",
      comments: "Exposed grade-60 rebar suggests structural pour phase was deferred. Recommending on-site core inspection prior to next fiscal disbursement."
    },
    evidence: [
      {
        id: "ev-101",
        category: "Fact",
        evidenceType: "Official Project Record",
        title: "Official Milestone Report #03 (Box Culvert Installation)",
        description: "Official contractor billing records state that Dual 1200mm Box Culvert Section #2 completed all structural concrete pour and sealing inspections on Sept 14, 2024.",
        submittedBy: "Citizen #A7K29",
        date: "2024-09-18",
        submittedDate: "2024-09-18",
        imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80",
        protected_file_url: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80",
        privacy_reviewed: true,
        privacyShieldVerified: true,
        duplicateStatus: "unique",
        detectedPrivacyItems: ["1 Face blurred", "1 Vehicle license plate redacted", "GPS sanitized"]
      },
      {
        id: "ev-102",
        category: "Observation",
        evidenceType: "Photo",
        title: "Photographic Evidence: Unfinished Culvert Foundation at Junction",
        description: "High-resolution perimeter survey photo showing Box Culvert Section #2 still has exposed rebar mesh without concrete foundation poured as of Oct 02, 2024.",
        submittedBy: "Citizen #B4X92",
        date: "2024-10-03",
        submittedDate: "2024-10-03",
        imageUrl: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80",
        protected_file_url: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80",
        privacy_reviewed: true,
        privacyShieldVerified: true,
        duplicateStatus: "independent_corroboration",
        detectedPrivacyItems: ["2 Worker faces blurred", "EXIF GPS converted to public ward bounds"]
      },
      {
        id: "ev-103",
        category: "Allegation",
        evidenceType: "Citizen Observation",
        title: "Community Inquiry on Premature Milestone Disbursement",
        description: "Community resident welfare association inquiry regarding whether billing milestone 3 was disbursed prior to site verification.",
        submittedBy: "Citizen #F2M55",
        date: "2024-10-12",
        submittedDate: "2024-10-12",
        imageUrl: null,
        protected_file_url: null,
        privacy_reviewed: true,
        privacyShieldVerified: true,
        duplicateStatus: "possible_duplicate",
        detectedPrivacyItems: ["Text-only submission sanitized"]
      }
    ]
  },
  {
    id: "case-tra-01",
    caseNumber: "AC-2018",
    projectId: "pr-02",
    projectName: "Anekal Feeder Corridor All-Weather Bituminous Upgrade",
    title: "Feeder Corridor Sub-base Compaction & Bituminous Thickness Variance",
    issueCategory: "Road",
    status: "Correction Requested",
    aiSummary: "Visual evidence and core-sample telemetry indicates asphalt wearing course measures 35mm against tender mandated 60mm compacted specification.",
    evidenceCount: 2,
    independentObservationsCount: 1,
    createdDate: "2024-10-02",
    createdAt: "2024-10-02T09:15:00Z",
    citizenReport: {
      reportId: "CIT-REP-9014",
      submittedBy: "Citizen #T9P11",
      submittedDate: "2024-10-02",
      title: "Premature Pavement Pitting along Anekal Feeder Section 3",
      description: "Sections of recently laid bitumen along KM 2.4 started raveling within 3 weeks of rain. Measured depth appears significantly thinner than the heavy-vehicle design standard."
    },
    aiAnalysis: {
      summary: "Depth measurement report compared with Karnataka Rural Infrastructure specification sheet Ref: KRIDL-2024-00411.",
      potentialDiscrepancy: true,
      discrepancyNote: "Core measurement exhibits -25mm variance from contractual wearing course thickness requirement.",
      duplicateStatus: "independent_corroboration",
      neutralCaveat: "This is a potential discrepancy for human review, not a finding of wrongdoing."
    },
    govResponse: {
      status: "Correction Requested",
      department: "Karnataka Rural Infrastructure Development Ltd. (KRIDL)",
      responseDate: "2024-10-25",
      statement: "Contractor Deccan Infra Developers instructed to mill non-conforming 400m section and relay with specified 60mm hot-mix asphalt under executive engineer supervision.",
      nextAction: "Issue non-conformance notice and verify rectification before final payment release."
    },
    engineerAssessment: {
      engineerId: "Engineer #ENG-102",
      status: "Flagged for Physical Audit",
      auditDate: "2024-10-18",
      comments: "Independent core drill confirmed asphalt thickness is 36mm average. Rectification required per PWD Specification Section 500."
    },
    evidence: [
      {
        id: "ev-201",
        category: "Fact",
        evidenceType: "Contract Specification",
        title: "Tender Schedule Pavement Cross-Section Blueprint",
        description: "Contract specification Section 4.1 mandates 150mm Wet Mix Macadam base topped by 60mm Bituminous Concrete wearing course.",
        submittedBy: "Citizen #T9P11",
        date: "2024-10-02",
        submittedDate: "2024-10-02",
        imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
        protected_file_url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
        privacy_reviewed: true,
        privacyShieldVerified: true,
        duplicateStatus: "unique",
        detectedPrivacyItems: ["1 Document watermark sanitized"]
      },
      {
        id: "ev-202",
        category: "Observation",
        evidenceType: "Photo",
        title: "Field Caliper Depth Measurement of Edge Curb Paving",
        description: "Physical vernier caliper measurement at road shoulder showing 35mm asphalt pavement thickness.",
        submittedBy: "Citizen #L3R88",
        date: "2024-10-08",
        submittedDate: "2024-10-08",
        imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
        protected_file_url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
        privacy_reviewed: true,
        privacyShieldVerified: true,
        duplicateStatus: "independent_corroboration",
        detectedPrivacyItems: ["License plate obscured", "Altitude & serial metadata scrubbed"]
      }
    ]
  },
  {
    id: "case-wtr-02",
    caseNumber: "AC-3091",
    projectId: "pr-03",
    projectName: "Chengalpattu Coastal Water Pipeline & Booster Network",
    title: "Coastal Booster Piped Line Pressure Drop & Valve Sealing",
    issueCategory: "Water",
    status: "Acknowledged",
    aiSummary: "Telemetry pressure readings show 1.4 bar deficit across terminal hamlets compared to hydraulic simulation model.",
    evidenceCount: 1,
    independentObservationsCount: 1,
    createdDate: "2024-11-12",
    createdAt: "2024-11-12T14:20:00Z",
    citizenReport: {
      reportId: "CIT-REP-9432",
      submittedBy: "Citizen #C8V21",
      submittedDate: "2024-11-12",
      title: "Intermittent Potable Water Pressure in Tambaram Terminal Sector",
      description: "Piped water distribution reaches only ground floor taps for 2 hours daily, failing the guaranteed 24x7 gravity pressure threshold."
    },
    aiAnalysis: {
      summary: "Citizen co-reporting cross-referenced against TWAD booster pump operating telemetry.",
      potentialDiscrepancy: false,
      discrepancyNote: "Booster pump installation corresponds with Phase 1 pipeline layout; Phase 2 secondary pumps pending connection.",
      duplicateStatus: "unique",
      neutralCaveat: "No conflicting evidence identified. This does not confirm the project is fully complete or accurate."
    },
    govResponse: {
      status: "Acknowledged",
      department: "Tamil Nadu Water Supply and Drainage (TWAD) Board",
      responseDate: "2024-11-20",
      statement: "TWAD engineering team has verified line pressure. Booster Station #02 is scheduled for commissioning in Dec 2024 to resolve terminal pressure deficit.",
      nextAction: "Complete Phase 2 electrical transformer tie-in."
    },
    engineerAssessment: {
      engineerId: "Engineer #ENG-512",
      status: "Verified On-Record",
      auditDate: "2024-11-18",
      comments: "Current mainline capacity meets intermediate design threshold. Secondary booster integration will stabilize flow."
    },
    evidence: [
      {
        id: "ev-301",
        category: "Observation",
        evidenceType: "Pressure Log",
        title: "Digital Flow Meter Telemetry at Hamlet Distribution Point #04",
        description: "Daily pressure monitoring log recording 1.2 to 1.4 bar during peak morning delivery windows.",
        submittedBy: "Citizen #C8V21",
        date: "2024-11-12",
        submittedDate: "2024-11-12",
        imageUrl: null,
        protected_file_url: null,
        privacy_reviewed: true,
        privacyShieldVerified: true,
        duplicateStatus: "unique",
        detectedPrivacyItems: ["Sensor IP sanitized"]
      }
    ]
  },
  {
    id: "case-drn-01",
    caseNumber: "AC-4015",
    projectId: "pr-04",
    projectName: "Varanasi Heritage Core Trenchless Drainage Interceptor",
    title: "Heritage Ghat Trenchless Interceptor Alignment Verification",
    issueCategory: "Drainage",
    status: "Awaiting Response",
    aiSummary: "Trenchless micro-tunneling route surveyed near historic river embankment to ensure zero seismic impact on ancient structural foundations.",
    evidenceCount: 1,
    independentObservationsCount: 0,
    createdDate: "2025-01-20",
    createdAt: "2025-01-20T11:00:00Z",
    citizenReport: {
      reportId: "CIT-REP-9710",
      submittedBy: "Citizen #G4K99",
      submittedDate: "2025-01-20",
      title: "Vibration Monitoring Log along Kashi Urban Corridor",
      description: "Verification request for soil stability records during trenchless boring underneath residential alleyways."
    },
    aiAnalysis: {
      summary: "Baseline engineering geotechnical report logged and filed.",
      potentialDiscrepancy: false,
      discrepancyNote: "Boring alignment matches sanctioned Smart City micro-tunnel route Ref: UP-VNS-2025-0012.",
      duplicateStatus: "unique",
      neutralCaveat: "No conflicting evidence identified. This does not confirm the project is fully complete or accurate."
    },
    govResponse: {
      status: "Awaiting Response",
      department: "UP Jal Nigam & Varanasi Smart City Mission",
      responseDate: null,
      statement: null,
      nextAction: null
    },
    engineerAssessment: null,
    evidence: [
      {
        id: "ev-401",
        category: "Fact",
        evidenceType: "Geotechnical Survey",
        title: "Soil Core Stratigraphy Record for Reach 1 Boring",
        description: "Official geotechnical borehole report confirming stable clay-silt matrix at 8m depth.",
        submittedBy: "Citizen #G4K99",
        date: "2025-01-20",
        submittedDate: "2025-01-20",
        imageUrl: null,
        protected_file_url: null,
        privacy_reviewed: true,
        privacyShieldVerified: true,
        duplicateStatus: "unique",
        detectedPrivacyItems: ["Sanitized document metadata"]
      }
    ]
  },
  {
    id: "case-drn-02",
    caseNumber: "AC-5022",
    projectId: "pr-05",
    projectName: "Bidhannagar Stormwater Sluice Modernization & Outfall Desilting",
    title: "Sluice Gate #03 Telemetry Link & Actuator Operational Status",
    issueCategory: "Drainage",
    status: "Under Review",
    aiSummary: "Field inspection photo confirms actuator motor installed; solar telemetry transmission antenna remains disconnected.",
    evidenceCount: 1,
    independentObservationsCount: 1,
    createdDate: "2025-02-15",
    createdAt: "2025-02-15T15:45:00Z",
    citizenReport: {
      reportId: "CIT-REP-9880",
      submittedBy: "Citizen #W7N34",
      submittedDate: "2025-02-15",
      title: "Automated Sluice Gate Inoperable During High-Tide Surge",
      description: "Automated gate #03 did not close during lunar tidal surge, resulting in backflow into secondary drainage channels."
    },
    aiAnalysis: {
      summary: "Citizen observation highlights actuator wiring disconnected prior to monsoon commissioning test.",
      potentialDiscrepancy: true,
      discrepancyNote: "Contractor claimed automated telemetry active; visual inspection reveals disconnected solar modem lead.",
      duplicateStatus: "unique",
      neutralCaveat: "This is a potential discrepancy for human review, not a finding of wrongdoing."
    },
    govResponse: {
      status: "Work Ongoing",
      department: "West Bengal Irrigation & Waterways Directorate",
      responseDate: "2025-02-28",
      statement: "Technicians deployed to reconnect telemetry cabling and perform dry-run gate cycle.",
      nextAction: "Complete dry run and log live SCADA readings."
    },
    engineerAssessment: {
      engineerId: "Engineer #ENG-230",
      status: "Under Expert Review",
      auditDate: "2025-02-24",
      comments: "Actuator physical gears verified intact. Telemetry cabling requires waterproof junction box."
    },
    evidence: [
      {
        id: "ev-501",
        category: "Observation",
        evidenceType: "Photo",
        title: "Actuator Junction Box and Disconnected Telemetry Leads",
        description: "Close-up photograph of Sluice #03 electrical conduit showing unfastened solar transmission cable.",
        submittedBy: "Citizen #W7N34",
        date: "2025-02-15",
        submittedDate: "2025-02-15",
        imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80",
        protected_file_url: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80",
        privacy_reviewed: true,
        privacyShieldVerified: true,
        duplicateStatus: "unique",
        detectedPrivacyItems: ["Worker face blurred", "EXIF GPS sanitized"]
      }
    ]
  },
  {
    id: "case-fld-01",
    caseNumber: "AC-6084",
    projectId: "pr-06",
    projectName: "Surat Pandesara Industrial Runoff Segregation Network",
    title: "Effluent Segregation Sump Wall Thickness Non-Conformance",
    issueCategory: "Drainage",
    status: "Correction Ordered",
    aiSummary: "Chemical-resistant retention sump wall thickness measured at 210mm against tender mandated 350mm structural safety minimum.",
    evidenceCount: 2,
    independentObservationsCount: 1,
    createdDate: "2024-10-15",
    createdAt: "2024-10-15T12:00:00Z",
    citizenReport: {
      reportId: "CIT-REP-9102",
      submittedBy: "Citizen #K4M19",
      submittedDate: "2024-10-15",
      title: "Structural Wall Thickness Measurement at Retention Sump #2",
      description: "Field ultrasonic thickness measurement indicates concrete sump wall is significantly thinner than required for industrial corrosive effluent containment."
    },
    aiAnalysis: {
      summary: "Comparison of non-destructive testing log with GPCB environmental engineering specification.",
      potentialDiscrepancy: true,
      discrepancyNote: "Measured wall thickness of 210mm represents 40% deficit from 350mm design requirement.",
      duplicateStatus: "independent_corroboration",
      neutralCaveat: "This is a potential discrepancy for human review, not a finding of wrongdoing."
    },
    govResponse: {
      status: "Correction Requested",
      department: "Gujarat Pollution Control Board & Surat Municipal Corporation",
      responseDate: "2024-11-04",
      statement: "Contractor Gujarat Environmental Infrastructure Ltd. issued immediate stop-work notice on Sump #2 until structural reinforcement lining is poured.",
      nextAction: "Pour additional 140mm chemical-resistant reinforced concrete encasement."
    },
    engineerAssessment: {
      engineerId: "Engineer #ENG-304",
      status: "Flagged for Physical Audit",
      auditDate: "2024-10-28",
      comments: "Rebound hammer and ultrasonic thickness tests confirm non-conformance. Sump cannot be commissioned without structural reinforcement."
    },
    evidence: [
      {
        id: "ev-601",
        category: "Fact",
        evidenceType: "Engineering Blueprint",
        title: "Sanctioned Retention Sump Structural Cross Section",
        description: "GPCB approved blueprint showing mandatory 350mm double-reinforced concrete retaining barrier.",
        submittedBy: "Citizen #K4M19",
        date: "2024-10-15",
        submittedDate: "2024-10-15",
        imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
        protected_file_url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
        privacy_reviewed: true,
        privacyShieldVerified: true,
        duplicateStatus: "unique",
        detectedPrivacyItems: ["Blueprint stamp sanitized"]
      },
      {
        id: "ev-602",
        category: "Observation",
        evidenceType: "Ultrasonic Test",
        title: "Ultrasonic Concrete Wall Thickness Field Measurement",
        description: "Calibration readout showing 210mm thickness along northern retention wall perimeter.",
        submittedBy: "Citizen #R8D41",
        date: "2024-10-22",
        submittedDate: "2024-10-22",
        imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
        protected_file_url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
        privacy_reviewed: true,
        privacyShieldVerified: true,
        duplicateStatus: "independent_corroboration",
        detectedPrivacyItems: ["Operator face sanitized", "Equipment serial redacted"]
      }
    ]
  },
  {
    id: "case-sch-01",
    caseNumber: "AC-7033",
    projectId: "pr-07",
    projectName: "Amer Block Model Girls Secondary School Infrastructure Upgrade",
    title: "Secondary Wing Structural Crack in Foundation Plinth",
    issueCategory: "School",
    status: "Awaiting Response",
    aiSummary: "Visual observation documents 4mm diagonal structural fracture along foundation plinth beam prior to classroom handover.",
    evidenceCount: 1,
    independentObservationsCount: 1,
    createdDate: "2024-11-20",
    createdAt: "2024-11-20T10:00:00Z",
    citizenReport: {
      reportId: "CIT-REP-9601",
      submittedBy: "Citizen #J1P77",
      submittedDate: "2024-11-20",
      title: "Visible Structural Fissure on New Classroom Foundation",
      description: "Parents and teachers identified visible cracks on the load-bearing plinth beam of the new STEM wing before classroom occupation."
    },
    aiAnalysis: {
      summary: "Photographic crack gauge measurement logged for civil engineering evaluation.",
      potentialDiscrepancy: true,
      discrepancyNote: "Crack width of 4mm exceeds standard acceptable cosmetic settlement tolerance of 1mm.",
      duplicateStatus: "unique",
      neutralCaveat: "This is a potential discrepancy for human review, not a finding of wrongdoing."
    },
    govResponse: {
      status: "Awaiting Response",
      department: "Rajasthan School Education Dept",
      responseDate: null,
      statement: null,
      nextAction: null
    },
    engineerAssessment: null,
    evidence: [
      {
        id: "ev-701",
        category: "Observation",
        evidenceType: "Photo",
        title: "Crack Gauge Measurement along Plinth Beam",
        description: "High-resolution photo showing optical crack comparator card recording 4.0mm settlement fissure.",
        submittedBy: "Citizen #J1P77",
        date: "2024-11-20",
        submittedDate: "2024-11-20",
        imageUrl: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80",
        protected_file_url: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80",
        privacy_reviewed: true,
        privacyShieldVerified: true,
        duplicateStatus: "unique",
        detectedPrivacyItems: ["Student faces blurred", "EXIF GPS sanitized"]
      }
    ]
  },
  {
    id: "case-hwy-01",
    caseNumber: "AC-8019",
    projectId: "pr-08",
    projectName: "Kaziranga Highway Wildlife Underpass & Elevated Viaduct",
    title: "Official Milestone Record Verification for Wildlife Underpass #04",
    issueCategory: "Bridge",
    status: "Resolved",
    aiSummary: "Official public procurement records and acoustic monitoring telemetry match all environmental clearance standards.",
    evidenceCount: 1,
    independentObservationsCount: 0,
    createdDate: "2024-08-10",
    createdAt: "2024-08-10T08:30:00Z",
    citizenReport: {
      reportId: "CIT-REP-8520",
      submittedBy: "Citizen #A7K29",
      submittedDate: "2024-08-10",
      title: "Environmental Baseline Record for Underpass Passage #04",
      description: "Submission of official Ministry of Road Transport and Highways (MoRTH) and Wildlife Institute of India baseline monitoring report."
    },
    aiAnalysis: {
      summary: "Official highway record matched against published national procurement registry.",
      potentialDiscrepancy: false,
      discrepancyNote: "Design parameters conform to official Wildlife Corridor standards.",
      duplicateStatus: "unique",
      neutralCaveat: "No conflicting evidence identified. This does not confirm the project is fully complete or accurate."
    },
    govResponse: {
      status: "Work Completed",
      department: "National Highways Authority of India (NHAI)",
      responseDate: "2024-09-01",
      statement: "Wildlife Underpass #04 civil construction certified completed. Acoustic sensory gates operational.",
      nextAction: "Continue automated telemetry monitoring during monsoon animal migration window."
    },
    engineerAssessment: {
      engineerId: "Engineer #ENG-882",
      status: "Verified On-Record",
      auditDate: "2024-08-25",
      comments: "All structural clearance heights and acoustic dampening barriers comply with Supreme Court wildlife corridor guidelines."
    },
    evidence: [
      {
        id: "ev-801",
        category: "Fact",
        evidenceType: "Official Project Record",
        title: "MoRTH & WII Wildlife Corridor Compliance Clearance #WII-2024-09",
        description: "Official certification of underpass structural clearance and acoustic barrier installation.",
        submittedBy: "Citizen #A7K29",
        date: "2024-08-10",
        submittedDate: "2024-08-10",
        imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80",
        protected_file_url: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80",
        privacy_reviewed: true,
        privacyShieldVerified: true,
        duplicateStatus: "unique",
        detectedPrivacyItems: ["Official seal sanitized"]
      }
    ]
  },
  {
    id: "case-wtr-03",
    caseNumber: "AC-9041",
    projectId: "pr-09",
    projectName: "Koraput Tribal Residential School Potable Water & Solar Microgrid",
    title: "Potable Water Deep Filtration Membrane Delivery Verification",
    issueCategory: "Water",
    status: "Awaiting Response",
    aiSummary: "Solar microgrid batteries operational; ultra-filtration reverse osmosis membrane delivery pending contractor dispatch.",
    evidenceCount: 1,
    independentObservationsCount: 1,
    createdDate: "2024-12-05",
    createdAt: "2024-12-05T13:10:00Z",
    citizenReport: {
      reportId: "CIT-REP-9950",
      submittedBy: "Citizen #N5B12",
      submittedDate: "2024-12-05",
      title: "Filtration Plant Still Uninstalled at School Site",
      description: "Solar panels and battery storage are installed, but the water filtration plant sheds remain locked without filtration membranes installed."
    },
    aiAnalysis: {
      summary: "Observation matches procurement milestone schedule stage 4.1.",
      potentialDiscrepancy: false,
      discrepancyNote: "Membrane installation scheduled for delivery in Milestone #04 (Jan 2025).",
      duplicateStatus: "unique",
      neutralCaveat: "No conflicting evidence identified. This does not confirm the project is fully complete or accurate."
    },
    govResponse: {
      status: "Awaiting Response",
      department: "Odisha ST & SC Development Dept",
      responseDate: null,
      statement: null,
      nextAction: null
    },
    engineerAssessment: null,
    evidence: [
      {
        id: "ev-901",
        category: "Observation",
        evidenceType: "Photo",
        title: "Water Shed Perimeter Photo",
        description: "External view of water purification plant shed awaiting final equipment arrival.",
        submittedBy: "Citizen #N5B12",
        date: "2024-12-05",
        submittedDate: "2024-12-05",
        imageUrl: null,
        protected_file_url: null,
        privacy_reviewed: true,
        privacyShieldVerified: true,
        duplicateStatus: "unique",
        detectedPrivacyItems: ["Sanitized text metadata"]
      }
    ]
  },
  {
    id: "case-med-01",
    caseNumber: "AC-1012",
    projectId: "pr-10",
    projectName: "Bhopal Sub-District Hospital Oxygen Generation & Pediatric ICU",
    title: "Liquid Medical Oxygen Tank Cryogenic Valve Certification",
    issueCategory: "Hospital",
    status: "Under Review",
    aiSummary: "Cryogenic relief valve certification documentation submitted by hospital staff welfare committee for verification.",
    evidenceCount: 1,
    independentObservationsCount: 0,
    createdDate: "2024-11-28",
    createdAt: "2024-11-28T16:00:00Z",
    citizenReport: {
      reportId: "CIT-REP-9788",
      submittedBy: "Citizen #B4X92",
      submittedDate: "2024-11-28",
      title: "Calibration Safety Certificate Inquiry for Hospital Oxygen Tank",
      description: "Public health inquiry regarding third-party hydrostatic pressure certificate for new 10KL cryogenic tank."
    },
    aiAnalysis: {
      summary: "Third-party inspection report matched against Petroleum & Explosives Safety Organization (PESO) approval.",
      potentialDiscrepancy: false,
      discrepancyNote: "PESO inspection certificate Ref: PESO-BPL-2024-11 on record.",
      duplicateStatus: "unique",
      neutralCaveat: "No conflicting evidence identified. This does not confirm the project is fully complete or accurate."
    },
    govResponse: {
      status: "Acknowledged",
      department: "MP Public Health & Family Welfare",
      responseDate: "2024-12-02",
      statement: "PESO compliance certificate validated. Final gas safety audit underway prior to pediatric ward opening.",
      nextAction: "Complete pneumatic line leak test."
    },
    engineerAssessment: {
      engineerId: "Engineer #ENG-882",
      status: "Verified On-Record",
      auditDate: "2024-12-01",
      comments: "PESO statutory certificate verified authentic and active."
    },
    evidence: [
      {
        id: "ev-1001",
        category: "Fact",
        evidenceType: "Safety Certificate",
        title: "PESO Hydrostatic Tank Certification #PESO-BPL-2024-11",
        description: "Statutory safety inspection certification for 10KL Liquid Medical Oxygen tank installation.",
        submittedBy: "Citizen #B4X92",
        date: "2024-11-28",
        submittedDate: "2024-11-28",
        imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
        protected_file_url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
        privacy_reviewed: true,
        privacyShieldVerified: true,
        duplicateStatus: "unique",
        detectedPrivacyItems: ["Official signature redacted"]
      }
    ]
  }
];
