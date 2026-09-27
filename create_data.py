import pathlib

data_content = """// ANTICRO CR-1 — Mock Project Records & Evidence Chain Data
// Source of truth compliant with AGENTS.md

export const INITIAL_PROJECTS = [
  {
    id: "pr-01",
    name: "Riverside Municipal Water Treatment Plant Expansion",
    department: "Department of Water Resources & Sanitation",
    location: "Riverside County, Sector 4-B",
    budget: "$14,200,000",
    budgetRaw: 14200000,
    expenditure: "$9,850,000",
    expenditureRaw: 9850000,
    completionPercentage: 70,
    status: "Work Ongoing", // Pending | Acknowledged | Work Ongoing | Work Completed | Correction Requested | Awaiting Response
    badgeType: "Simulated Data", // "Verified Source" | "Simulated Data"
    category: "Water & Sanitation",
    description: "Construction of advanced multi-stage filtration units, tertiary clarifiers, and pipeline interconnection for 45,000 residents.",
    contractor: "Apex Infrastructure & Civil Engineering Ltd.",
    startDate: "2024-03-15",
    expectedCompletionDate: "2025-11-30",
    sourceRecord: "State Infrastructure Portal Ref: WRS-2024-00892",
    evidenceCount: 3,
    casesCount: 1,
    evidenceTimeline: [
      {
        id: "ev-101",
        category: "Fact", // Fact | Observation | Allegation
        title: "Official Milestone Report #03 (Clarifier Concrete Pour)",
        description: "Official contractor billing records state that Tertiary Clarifier Unit #2 completed all structural concrete pour and sealing inspections on Sept 14, 2024.",
        submittedBy: "Citizen #A7K29",
        date: "2024-09-18",
        imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80",
        privacyShieldVerified: true,
        detectedPrivacyItems: ["1 Face blurred", "1 Vehicle license plate redacted", "GPS sanitized"],
        aiAnalysis: {
          summary: "Contract milestone document matched against approved procurement schedule.",
          potentialDiscrepancy: false,
          discrepancyNote: "Document corresponds to official tender schedule item 4.2.",
          duplicateStatus: "unique",
          neutralCaveat: "No conflicting evidence identified. This does not confirm the project is fully complete or accurate."
        },
        engineerAssessment: {
          engineerId: "Engineer #ENG-882",
          status: "Verified On-Record",
          comments: "Documentation matches public procurement registry item 4.2."
        },
        govResponse: {
          department: "Department of Water Resources",
          status: "Acknowledged",
          responseDate: "2024-09-22",
          statement: "Record received and matched to milestone claim."
        }
      },
      {
        id: "ev-102",
        category: "Observation",
        title: "Photographic Evidence: Unfinished Clarifier Foundation",
        description: "High-resolution perimeter survey photo showing Tertiary Clarifier Unit #2 still has exposed rebar mesh without concrete foundation poured as of Oct 02, 2024.",
        submittedBy: "Citizen #B4X92",
        date: "2024-10-03",
        imageUrl: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80",
        privacyShieldVerified: true,
        detectedPrivacyItems: ["2 Worker faces blurred", "EXIF GPS converted to public ward bounds"],
        aiAnalysis: {
          summary: "Visual analysis compares photographed structure with CAD blueprint for Clarifier #2.",
          potentialDiscrepancy: true,
          discrepancyNote: "Contractor claimed completion of concrete pour in Milestone #03, whereas ground photo indicates incomplete foundation slab.",
          duplicateStatus: "independent_corroboration",
          neutralCaveat: "This is a potential discrepancy for human review, not a finding of wrongdoing."
        },
        engineerAssessment: {
          engineerId: "Engineer #ENG-409",
          status: "Flagged for Physical Audit",
          comments: "Exposed grade-60 rebar suggests structural pour phase was deferred. Recommending on-site core inspection."
        },
        govResponse: {
          department: "Department of Water Resources",
          status: "Work Ongoing",
          responseDate: "2024-10-10",
          statement: "Sub-divisional engineer dispatched to verify contractor milestone certification."
        }
      },
      {
        id: "ev-103",
        category: "Allegation",
        title: "Community Inquiry on Premature Milestone Disbursement",
        description: "Community resident association inquiry regarding whether billing milestone 3 was disbursed prior to site verification.",
        submittedBy: "Citizen #F2M55",
        date: "2024-10-12",
        imageUrl: null,
        privacyShieldVerified: true,
        detectedPrivacyItems: ["Text-only submission sanitized"],
        aiAnalysis: {
          summary: "Case matched with existing Discrepancy Case #CASE-WTR-04.",
          potentialDiscrepancy: true,
          discrepancyNote: "Inquiry correlates with existing case timeline.",
          duplicateStatus: "possible_duplicate",
          neutralCaveat: "This is a potential discrepancy for human review, not a finding of wrongdoing."
        },
        engineerAssessment: null,
        govResponse: {
          department: "Department of Water Resources",
          status: "Awaiting Response",
          responseDate: null,
          statement: null
        }
      }
    ]
  },
  {
    id: "pr-02",
    name: "Metro Transit Line-4 Elevated Overpass & Flyover",
    department: "Urban Transit Authority & Public Works",
    location: "Central Metro Corridor, Pier 12 to 28",
    budget: "$28,500,000",
    budgetRaw: 28500000,
    expenditure: "$24,100,000",
    expenditureRaw: 24100000,
    completionPercentage: 85,
    status: "Work Ongoing",
    badgeType: "Simulated Data",
    category: "Transportation",
    description: "Construction of 2.4km elevated transit viaduct, seismic damper installation, and acoustic noise barrier panels.",
    contractor: "Metro Bridge & Structural Consortium",
    startDate: "2023-08-01",
    expectedCompletionDate: "2025-06-30",
    sourceRecord: "City Transit Capital Works Registry #UTA-2023-L4",
    evidenceCount: 2,
    casesCount: 1,
    evidenceTimeline: [
      {
        id: "ev-201",
        category: "Fact",
        title: "Contract Specifications for Seismic Dampers (Class-IV)",
        description: "Tender document Section 8.4 mandates Class-IV elastomeric seismic bearings across all 16 pier caps.",
        submittedBy: "Citizen #T9P11",
        date: "2024-05-14",
        imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
        privacyShieldVerified: true,
        detectedPrivacyItems: ["1 Document watermark sanitized"],
        aiAnalysis: {
          summary: "Technical baseline established against municipal standard.",
          potentialDiscrepancy: false,
          discrepancyNote: "Matches published transit authority design standards.",
          duplicateStatus: "unique",
          neutralCaveat: "No conflicting evidence identified. This does not confirm the project is fully complete or accurate."
        },
        engineerAssessment: {
          engineerId: "Engineer #ENG-102",
          status: "Verified",
          comments: "Baseline standard verified against AASHTO specifications."
        },
        govResponse: {
          department: "Urban Transit Authority",
          status: "Acknowledged",
          responseDate: "2024-05-20",
          statement: "Specification acknowledged as binding contract requirement."
        }
      },
      {
        id: "ev-202",
        category: "Observation",
        title: "Drone Imagery: Pier 18 Bearing Assembly Installation",
        description: "Aerial evidence shows installed bearing pads at Pier 18 appear to be standard grade neoprene rather than specified multi-directional seismic dampers.",
        submittedBy: "Citizen #L3R88",
        date: "2024-08-22",
        imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
        privacyShieldVerified: true,
        detectedPrivacyItems: ["License plate obscured", "Altitude & serial metadata scrubbed"],
        aiAnalysis: {
          summary: "Visual model highlights component geometry variance between standard neoprene pad and Class-IV damper.",
          potentialDiscrepancy: true,
          discrepancyNote: "Installed component dimensions exhibit variance from approved structural blueprint #DR-88.",
          duplicateStatus: "unique",
          neutralCaveat: "This is a potential discrepancy for human review, not a finding of wrongdoing."
        },
        engineerAssessment: {
          engineerId: "Engineer #ENG-102",
          status: "Under Expert Review",
          comments: "Independent load rating test recommended before rail girder placement."
        },
        govResponse: {
          department: "Urban Transit Authority",
          status: "Correction Requested",
          responseDate: "2024-09-05",
          statement: "Contractor instructed to submit certified manufacturer testing sheet for Pier 18 bearings."
        }
      }
    ]
  },
  {
    id: "pr-03",
    name: "Highland Public Library & Digital Learning Community Hub",
    department: "Department of Community Development & Public Libraries",
    location: "North Highland Sector, Block C-7",
    budget: "$4,800,000",
    budgetRaw: 4800000,
    expenditure: "$4,800,000",
    expenditureRaw: 4800000,
    completionPercentage: 100,
    status: "Work Completed",
    badgeType: "Simulated Data",
    category: "Civic Facilities",
    description: "Two-story civic library facility featuring 60-seat digital lab, community meeting spaces, rooftop solar installation, and ADA accessibility.",
    contractor: "Civic Horizon Builders Co.",
    startDate: "2023-01-10",
    expectedCompletionDate: "2024-04-30",
    sourceRecord: "Municipal Civic Infrastructure Register #LIB-2023-88",
    evidenceCount: 2,
    casesCount: 0,
    evidenceTimeline: [
      {
        id: "ev-301",
        category: "Fact",
        title: "Certificate of Occupancy & Facility Commissioning",
        description: "Official municipal inspection certificate declaring Highland Library fully compliant with fire, safety, and ADA guidelines.",
        submittedBy: "Citizen #K1V33",
        date: "2024-05-02",
        imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80",
        privacyShieldVerified: true,
        detectedPrivacyItems: ["Inspector signature redacted for privacy", "Official seal verified"],
        aiAnalysis: {
          summary: "Commissioning document matches public record.",
          potentialDiscrepancy: false,
          discrepancyNote: "Matches official certificate registry.",
          duplicateStatus: "unique",
          neutralCaveat: "No conflicting evidence identified. This does not confirm the project is fully complete or accurate."
        },
        engineerAssessment: {
          engineerId: "Engineer #ENG-512",
          status: "Completed Review",
          comments: "Standard compliance criteria fulfilled."
        },
        govResponse: {
          department: "Department of Community Development",
          status: "Work Completed",
          responseDate: "2024-05-05",
          statement: "Facility opened for public access."
        }
      },
      {
        id: "ev-302",
        category: "Observation",
        title: "Operational Verification: Public Digital Lab in Use",
        description: "Citizen photo of functioning digital lab with operational computer terminals during public library operating hours.",
        submittedBy: "Citizen #C9Z44",
        date: "2024-06-15",
        imageUrl: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=800&q=80",
        privacyShieldVerified: true,
        detectedPrivacyItems: ["4 Citizen faces blurred automatically by Privacy Shield"],
        aiAnalysis: {
          summary: "Facility observed active and serving public.",
          potentialDiscrepancy: false,
          discrepancyNote: "Site observation matches completed status.",
          duplicateStatus: "independent_corroboration",
          neutralCaveat: "No conflicting evidence identified. This does not confirm the project is fully complete or accurate."
        },
        engineerAssessment: null,
        govResponse: {
          department: "Department of Community Development",
          status: "Work Completed",
          responseDate: "2024-06-20",
          statement: "Community usage verified."
        }
      }
    ]
  },
  {
    id: "pr-04",
    name: "Greenfield District Primary Health Center Upgrade",
    department: "Ministry of Public Health & Rural Infrastructure",
    location: "Greenfield Sub-District, Sector 9",
    budget: "$6,300,000",
    budgetRaw: 6300000,
    expenditure: "$3,200,000",
    expenditureRaw: 3200000,
    completionPercentage: 45,
    status: "Pending",
    badgeType: "Simulated Data",
    category: "Healthcare",
    description: "Modernization of 40-bed maternal care unit, emergency trauma wing, solar backup microgrid, and cold-chain vaccine storage.",
    contractor: "Vanguard Health Infrastructure Group",
    startDate: "2024-04-01",
    expectedCompletionDate: "2025-12-31",
    sourceRecord: "Health Infrastructure Development Fund #HCF-2024-031",
    evidenceCount: 0,
    casesCount: 0,
    evidenceTimeline: []
  },
  {
    id: "pr-05",
    name: "Oakridge Smart Traffic Signal & Pedestrian Crossing Network",
    department: "Municipal Department of Transportation",
    location: "Oakridge Commercial Corridor, 14 Intersections",
    budget: "$1,850,000",
    budgetRaw: 1850000,
    expenditure: "$1,400,000",
    expenditureRaw: 1400000,
    completionPercentage: 75,
    status: "Work Ongoing",
    badgeType: "Simulated Data",
    category: "Smart City",
    description: "Installation of 32 AI-adaptive traffic signal controllers, tactile pedestrian sensors, and high-visibility LED crosswalk warnings.",
    contractor: "SmartGrid Traffic Solutions Inc.",
    startDate: "2024-02-01",
    expectedCompletionDate: "2025-04-30",
    sourceRecord: "Smart City Modernization Project #TRF-2024-89",
    evidenceCount: 1,
    casesCount: 0,
    evidenceTimeline: [
      {
        id: "ev-501",
        category: "Observation",
        title: "Intersection 4 & 5 Smart Controllers Operational",
        description: "Field photo showing newly activated adaptive controllers with working pedestrian countdown displays at Oakridge & 5th Avenue.",
        submittedBy: "Citizen #M2Q71",
        date: "2024-09-28",
        imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80",
        privacyShieldVerified: true,
        detectedPrivacyItems: ["Vehicle registration numbers obscured", "Pedestrian face blurred"],
        aiAnalysis: {
          summary: "Equipment serial and operational status verified against phase 2 deployment map.",
          potentialDiscrepancy: false,
          discrepancyNote: "Active deployment conforms to stage 2 milestones.",
          duplicateStatus: "unique",
          neutralCaveat: "No conflicting evidence identified. This does not confirm the project is fully complete or accurate."
        },
        engineerAssessment: null,
        govResponse: {
          department: "Municipal Department of Transportation",
          status: "Work Ongoing",
          responseDate: "2024-10-02",
          statement: "Phase 2 commissioning progressing as scheduled."
        }
      }
    ]
  },
  {
    id: "pr-06",
    name: "Grand Central Stormwater Drainage & Flood Mitigation Canal",
    department: "Flood Control District & Civil Protection Agency",
    location: "South Basin Marshland Buffer, Reach 1-6",
    budget: "$19,400,000",
    budgetRaw: 19400000,
    expenditure: "$18,900,000",
    expenditureRaw: 18900000,
    completionPercentage: 92,
    status: "Correction Requested",
    badgeType: "Simulated Data",
    category: "Flood Mitigation",
    description: "4.8km reinforced concrete stormwater diversion canal, retention basin sluice gates, and automated water-level telemetry sensors.",
    contractor: "HydraTech Civil Engineering Consortium",
    startDate: "2023-04-15",
    expectedCompletionDate: "2024-10-31",
    sourceRecord: "Regional Climate Resilience Fund #FLD-2023-019",
    evidenceCount: 2,
    casesCount: 1,
    evidenceTimeline: [
      {
        id: "ev-601",
        category: "Fact",
        title: "Culvert Reinforcement Technical Drawing Rev-B",
        description: "Culvert specification #S-102 mandates 300mm reinforced concrete box structure with geotextile filtration wrap.",
        submittedBy: "Citizen #X8B19",
        date: "2024-07-10",
        imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
        privacyShieldVerified: true,
        detectedPrivacyItems: ["Proprietary CAD boundary sanitized"],
        aiAnalysis: {
          summary: "Technical baseline for culvert wall thickness loaded.",
          potentialDiscrepancy: false,
          discrepancyNote: "Conforms to Civil Engineering Code #CE-2021.",
          duplicateStatus: "unique",
          neutralCaveat: "No conflicting evidence identified. This does not confirm the project is fully complete or accurate."
        },
        engineerAssessment: {
          engineerId: "Engineer #ENG-304",
          status: "Verified Specification",
          comments: "Hydraulic retention calculations verified."
        },
        govResponse: {
          department: "Flood Control District",
          status: "Acknowledged",
          responseDate: "2024-07-15",
          statement: "Specification recorded."
        }
      },
      {
        id: "ev-602",
        category: "Observation",
        title: "Cross-Section Measurement: Culvert Reach 3 Wall Thickness",
        description: "On-site caliper photograph of culvert wall measuring 180mm compared to the mandated 300mm structural specification.",
        submittedBy: "Citizen #R4K62",
        date: "2024-09-04",
        imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
        privacyShieldVerified: true,
        detectedPrivacyItems: ["2 Faces blurred", "Camera serial sanitized"],
        aiAnalysis: {
          summary: "Automated measurement comparison between photo gauge scale and specification requirement #S-102.",
          potentialDiscrepancy: true,
          discrepancyNote: "Photographed wall cross-section (180mm) indicates a 120mm variance below the specified 300mm requirement.",
          duplicateStatus: "unique",
          neutralCaveat: "This is a potential discrepancy for human review, not a finding of wrongdoing."
        },
        engineerAssessment: {
          engineerId: "Engineer #ENG-304",
          status: "Critical Discrepancy Flagged",
          comments: "Variance of 40% below design tolerance poses risk under 50-year storm surge. Non-destructive ultrasound testing required."
        },
        govResponse: {
          department: "Flood Control District",
          status: "Correction Requested",
          responseDate: "2024-09-12",
          statement: "Stop-work order issued on Reach 3. Third-party structural re-verification mandated."
        }
      }
    ]
  }
];

export const MOCK_USER_ROLES = [
  { id: "citizen", name: "Citizen", pseudonym: "Citizen #A7K29", status: "active", icon: "User" },
  { id: "engineer", name: "Certified Engineer", pseudonym: "Engineer #ENG-409", status: "verification_pending", icon: "Compass" },
  { id: "government", name: "Government Official", pseudonym: "Official #GOV-DEPT", status: "verification_pending", icon: "Building2" },
  { id: "admin", name: "System Administrator", pseudonym: "Admin #SYS-01", status: "active", icon: "ShieldCheck" }
];
"""

pathlib.Path("src/data/mockProjects.js").write_text(data_content, encoding="utf-8")
print("Mock data generated successfully.")