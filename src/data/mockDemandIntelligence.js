// ANTICRO CR-1 — Civic Infrastructure Intelligence & Development Demand Layer
// Multi-State India Civic Model: Maharashtra, Karnataka, Tamil Nadu, Uttar Pradesh, Gujarat, West Bengal, Rajasthan, Kerala
// Connects: Citizen Voice → AI Understanding → Location Context → Demand Hotspots → Priority Score → Project Recommendation → Government Action → Verified Outcome

export const INDIAN_STATES_META = [
  { id: 'DL', name: 'Delhi', capital: 'New Delhi', lat: 28.61, lng: 77.20, mapX: 40, mapY: 28 },
  { id: 'CG', name: 'Chhattisgarh', capital: 'Raipur', lat: 21.25, lng: 81.63, mapX: 54, mapY: 52 },
  { id: 'KA', name: 'Karnataka', capital: 'Bengaluru', lat: 12.97, lng: 77.59, mapX: 36, mapY: 72 },
  { id: 'MH', name: 'Maharashtra', capital: 'Mumbai', lat: 19.75, lng: 75.71, mapX: 38, mapY: 55 },
  { id: 'UP', name: 'Uttar Pradesh', capital: 'Lucknow', lat: 26.84, lng: 80.94, mapX: 52, mapY: 34 },
  { id: 'BR', name: 'Bihar', capital: 'Patna', lat: 25.09, lng: 85.31, mapX: 65, mapY: 38 },
  { id: 'TN', name: 'Tamil Nadu', capital: 'Chennai', lat: 11.12, lng: 78.65, mapX: 43, mapY: 84 },
  { id: 'WB', name: 'West Bengal', capital: 'Kolkata', lat: 22.98, lng: 87.85, mapX: 74, mapY: 47 },
  { id: 'RJ', name: 'Rajasthan', capital: 'Jaipur', lat: 27.02, lng: 74.21, mapX: 32, mapY: 32 },
  { id: 'OD', name: 'Odisha', capital: 'Bhubaneswar', lat: 20.95, lng: 85.09, mapX: 66, mapY: 56 },
  { id: 'AS', name: 'Assam', capital: 'Dispur', lat: 26.14, lng: 91.73, mapX: 84, mapY: 36 },
  { id: 'KL', name: 'Kerala', capital: 'Thiruvananthapuram', lat: 10.85, lng: 76.27, mapX: 37, mapY: 88 }
];

export const MACRO_INTELLIGENCE_METRICS = {
  totalRequests: 27170,
  demandHotspots: 231,
  highPriorityGaps: 47,
  statesCovered: 10
};

export const DATA_PROVENANCE = {
  citizenRequests: 'Simulated demo data',
  infrastructure: 'Simulated demo records',
  priorityModel: 'ANTICRO Demo Priority Model',
  aiEngine: 'Google Gemini',
  geographicCoverage: 'India — simulated multi-state dataset',
  disclaimer: 'Prototype demonstration only. Figures are illustrative and are not official government statistics.'
};

export const BUILT_FOR_INDIA_LANGUAGES = [
  'Hindi', 'English', 'Kannada', 'Tamil', 'Telugu', 
  'Bengali', 'Marathi', 'Malayalam', 'Odia', 'Assamese'
];

export const DEMAND_CATEGORIES = [
  'Drainage & Flood Mitigation',
  'Roads',
  'Drinking Water',
  'Schools',
  'Healthcare',
  'Sanitation',
  'Public Transport',
  'Electricity',
  'Internet / Digital Connectivity'
];

export const GOV_ACTION_STATUSES = [
  'Needs Review',
  'Under Department Assessment',
  'Project Proposed',
  'Budget Allocated',
  'Work In Progress',
  'Evidence Verification',
  'Completed',
  'Outcome Verified'
];

// DEMAND HOTSPOTS ACROSS 10 INDIAN STATES
export const DEMAND_HOTSPOTS = [
  // SEED HOTSPOT: Delhi NCR (Critical - Priority 94)
  {
    id: 'hotspot-delhi',
    title: 'Najafgarh Basin & Outer Arterial Stormwater Inundation',
    name: 'Delhi NCR — Stormwater Drainage & Monsoon Inundation Corridor',
    standardizedProblem: 'Arterial Stormwater Drainage Inundation & Silt Congestion',
    state: 'Delhi',
    stateId: 'DL',
    district: 'South West Delhi',
    locality: 'Najafgarh Drain Feeder Sector',
    location: 'South West Delhi / Najafgarh Basin Corridor, NCT of Delhi',
    category: 'Drainage / Flooding',
    primaryCategory: 'Drainage & Flood Mitigation',
    secondaryCategory: 'Roads',
    reportCount: 42,
    requestCount: 42,
    relatedRequests: 2450,
    affectedLocations: 38,
    affectedPopulation: 68000,
    affectedPopulationDisplay: '68,000 residents & commuters',
    severity: 'Critical',
    priorityScore: 94,
    priorityLevel: 'Critical',
    aiPriorityRecommendation: 'CRITICAL',
    citizenEvidenceCount: 18,
    evidenceCount: 18,
    status: 'Needs Government Review',
    currentStatus: 'Needs Government Review',
    governmentStatus: 'Needs Government Review',
    firstReportedDate: '2025-05-18',
    latestReportedDate: '2025-06-22',
    trend: '+32%',
    affectedServices: ['Road Access', 'Pedestrian Transit', 'Public Health', 'Metro Feeder Corridors'],
    infrastructureGap: 'Silted stormwater interceptor causes 2.5ft waterlogging during peak rains, cutting off arterial metro feeder routes.',
    aiClassification: 'Arterial stormwater drainage and inundation infrastructure deficit.',
    aiSummary: 'Citizen reports indicate recurring monsoon flooding along arterial feeder routes, with 42 localized complaints and 18 shielded photographs verifying 2+ feet water stagnation.',
    whySummary: 'Critical severity + 42 citizen requests + vital metro feeder cutoff + public health hazard',
    whyReasons: [
      'Critical severity (Major urban arterial corridor waterlogging)',
      '42 citizen requests (2,450 verified corridor co-reports)',
      '18 geotagged ground photographs with Privacy Shield protection',
      'Vital public services impaired: Road Access, Emergency Transit, Metro Feeder Routes',
      'High geographic concentration within 1.2km basin radius',
      'Active recent influx with 16 reports in last 7 days'
    ],
    deterministicFactors: [
      { name: 'Citizen Demand', score: 96, weight: '25%', weightNum: 0.25, contribution: 24.0, desc: '42 verified reports & 2,450 corridor co-reports' },
      { name: 'Evidence Strength', score: 92, weight: '20%', weightNum: 0.20, contribution: 18.4, desc: '18 geotagged ground photos processed through Privacy Shield' },
      { name: 'Severity', score: 96, weight: '20%', weightNum: 0.20, contribution: 19.2, desc: 'Critical arterial inundation & metro feeder transit cutoff' },
      { name: 'Public Service Impact', score: 92, weight: '15%', weightNum: 0.15, contribution: 13.8, desc: 'Impaired services: Road Access, Emergency Transit, Public Health' },
      { name: 'Geographic Concentration', score: 94, weight: '10%', weightNum: 0.10, contribution: 9.4, desc: 'High density cluster in 1.2km basin radius' },
      { name: 'Recency', score: 92, weight: '10%', weightNum: 0.10, contribution: 9.2, desc: '16 new reports logged in the past 7 days' }
    ],
    recommendedDomain: 'Delhi Jal Board & Municipal Corporation Engineering',
    recommendedProject: {
      title: 'Najafgarh Feeder Channel De-silting & High-Capacity Sump Augmentation',
      domain: 'Urban Hydrology & Municipal Drainage',
      estimatedBudget: '₹18.5 Cr',
      feasibilityCaveat: 'Requires inter-agency municipal clearance.'
    },
    communityEvidence: [
      {
        id: 'ev-dl-1',
        title: 'Waterlogged Ring Road Feeder Underpass (2.5 ft depth measured)',
        category: 'Photo evidence',
        date: '2025-06-18',
        location: 'Najafgarh Basin Underpass #3',
        privacyShieldStatus: 'Shielded (Faces & Plates Blurred)',
        verificationStatus: 'Verified by Community'
      },
      {
        id: 'ev-dl-2',
        title: 'Silted Outfall Conductor Channel Obstruction',
        category: 'Photo evidence',
        date: '2025-06-15',
        location: 'Culvert Outfall Sector 12',
        privacyShieldStatus: 'Shielded (Faces Blurred)',
        verificationStatus: 'Telemetry Verified'
      }
    ],
    citizenDemandsList: [
      { id: 'need-dl-1', user: 'Citizen #D9X21', date: '2025-06-18', text: 'Every time it rains, the water stands 2 feet deep near the main turn. Buses cannot cross and people are walking through sewage water.', language: 'Hindi' },
      { id: 'need-dl-2', user: 'Citizen #K4M88', date: '2025-06-17', text: 'Drainage culvert is completely jammed with construction rubble. Municipal office has not cleared it since last season.', language: 'English' }
    ],
    coordinates: { lat: 28.61, lng: 77.20, mapX: 40, mapY: 28 }
  },

  // SEED HOTSPOT: Patna, Bihar (High - Priority 88)
  {
    id: 'hotspot-patna',
    title: 'Ashiana-Digha Arterial Road Infrastructure Deficit',
    name: 'Patna, Bihar — Ashiana-Digha Road Surface & Drainage Deficit',
    standardizedProblem: 'Severe Arterial Road Degradation & Inadequate Stormwater Culverts',
    state: 'Bihar',
    stateId: 'BR',
    district: 'Patna District',
    locality: 'Ashiana-Digha Road',
    location: 'Ashiana-Digha Corridor, Patna District, Bihar',
    category: 'Road Infrastructure',
    primaryCategory: 'Roads',
    secondaryCategory: 'Drainage & Flood Mitigation',
    reportCount: 27,
    requestCount: 27,
    relatedRequests: 1620,
    affectedLocations: 24,
    affectedPopulation: 48000,
    affectedPopulationDisplay: '48,000 residents',
    severity: 'High',
    priorityScore: 88,
    priorityLevel: 'High',
    aiPriorityRecommendation: 'HIGH',
    citizenEvidenceCount: 9,
    evidenceCount: 9,
    status: 'Needs Government Review',
    currentStatus: 'Needs Government Review',
    governmentStatus: 'Needs Government Review',
    firstReportedDate: '2025-04-10',
    latestReportedDate: '2025-06-19',
    trend: '+26%',
    affectedServices: ['Road Access', 'Ambulance Transit', 'School Bus Connectivity', 'Public Safety'],
    infrastructureGap: '4.8km arterial road with deep cratering and broken drainage edges, causing 30+ minute ambulance delays.',
    aiClassification: 'Arterial road surface degradation and stormwater runoff bottleneck.',
    aiSummary: 'Citizen reports corroborate extensive surface cratering and delayed emergency vehicle transit along the Ashiana-Digha arterial corridor.',
    whySummary: 'High severity + 27 citizen requests + ambulance transit delays + school route hazard',
    whyReasons: [
      'High severity (Arterial cratering causing frequent vehicular breakdown)',
      '27 citizen requests (1,620 verified corridor co-reports)',
      '9 geotagged road damage photos with Privacy Shield protection',
      'Emergency ambulance transit delayed by 30+ minutes',
      'High geographic concentration along 4.8km link corridor',
      'Active submissions over recent 10-day period'
    ],
    deterministicFactors: [
      { name: 'Citizen Demand', score: 90, weight: '25%', weightNum: 0.25, contribution: 22.5, desc: '27 citizen requests & 1,620 corridor co-reports' },
      { name: 'Evidence Strength', score: 86, weight: '20%', weightNum: 0.20, contribution: 17.2, desc: '9 geotagged road damage photos with Privacy Shield' },
      { name: 'Severity', score: 90, weight: '20%', weightNum: 0.20, contribution: 18.0, desc: 'Severe cratering delaying ambulances and school transit' },
      { name: 'Public Service Impact', score: 86, weight: '15%', weightNum: 0.15, contribution: 12.9, desc: 'Impaired services: Ambulance Transit, School Connectivity, Road Safety' },
      { name: 'Geographic Concentration', score: 86, weight: '10%', weightNum: 0.10, contribution: 8.6, desc: 'Ashiana-Digha feeder corridor cluster' },
      { name: 'Recency', score: 88, weight: '10%', weightNum: 0.10, contribution: 8.8, desc: 'Clustered over recent 10-day period' }
    ],
    recommendedDomain: 'Road Construction Department (RCD Bihar)',
    recommendedProject: {
      title: 'Ashiana-Digha 4-Lane Bituminous Pavement & Reinforced Storm Trench',
      domain: 'State Highway Paving & Urban Corridors',
      estimatedBudget: '₹12.4 Cr',
      feasibilityCaveat: 'Requires utility line shifting.'
    },
    communityEvidence: [
      {
        id: 'ev-pt-1',
        title: 'Deep Road Crater Submergence Near Digha Feeder',
        category: 'Photo evidence',
        date: '2025-06-14',
        location: 'Ashiana-Digha Junction Km 2.4',
        privacyShieldStatus: 'Shielded (Faces & Plates Blurred)',
        verificationStatus: 'Verified by Community'
      }
    ],
    citizenDemandsList: [
      { id: 'need-pt-1', user: 'Citizen #B8J34', date: '2025-06-14', text: 'Ashiana digha road is completely broken. Ambulances take half an hour extra and auto rickshaws overturn in the potholes.', language: 'Hindi' }
    ],
    coordinates: { lat: 25.09, lng: 85.31, mapX: 65, mapY: 38 }
  },

  // SEED HOTSPOT: Guwahati, Assam (Medium - Priority 72)
  {
    id: 'hotspot-guwahati',
    title: 'Jalukbari Sub-divisional Healthcare Transit Deficit',
    name: 'Guwahati, Assam — Jalukbari Healthcare Transit & Clinic Access',
    standardizedProblem: 'Public Healthcare Transit Cutoff & Secondary Road Erosion',
    state: 'Assam',
    stateId: 'AS',
    district: 'Kamrup Metropolitan',
    locality: 'Jalukbari Sub-division',
    location: 'Jalukbari Corridor, Kamrup Metropolitan (Guwahati), Assam',
    category: 'Healthcare',
    primaryCategory: 'Healthcare',
    secondaryCategory: 'Roads',
    reportCount: 14,
    requestCount: 14,
    relatedRequests: 480,
    affectedLocations: 12,
    affectedPopulation: 22000,
    affectedPopulationDisplay: '22,000 residents',
    severity: 'Medium',
    priorityScore: 72,
    priorityLevel: 'Medium',
    aiPriorityRecommendation: 'MEDIUM',
    citizenEvidenceCount: 4,
    evidenceCount: 4,
    status: 'Needs Government Review',
    currentStatus: 'Needs Government Review',
    governmentStatus: 'Needs Government Review',
    firstReportedDate: '2025-05-02',
    latestReportedDate: '2025-06-16',
    trend: '+14%',
    affectedServices: ['Healthcare Access', 'Maternal Health Transit', 'Emergency Ambulance'],
    infrastructureGap: 'Eroded approach road with unstable shoulders causes 35-minute delays for emergency ambulances accessing the sub-divisional health center.',
    aiClassification: 'Public healthcare facility transit access bottleneck.',
    aiSummary: 'Reports document washed-out approach shoulders causing 35-minute delays for emergency ambulances accessing the sub-divisional health center.',
    whySummary: 'Medium severity + 14 citizen requests + healthcare access impact + persistent erosion',
    whyReasons: [
      'Medium severity (Sub-divisional health center access delayed)',
      '14 citizen requests (480 corridor co-reports)',
      '4 geotagged ground photos with Privacy Shield protection',
      'Maternal and emergency healthcare transfers disrupted',
      'Concentrated along the single primary clinic feeder route',
      'Steady submissions logged over the past month'
    ],
    deterministicFactors: [
      { name: 'Citizen Demand', score: 70, weight: '25%', weightNum: 0.25, contribution: 17.5, desc: '14 citizen requests & 480 corridor co-reports' },
      { name: 'Evidence Strength', score: 72, weight: '20%', weightNum: 0.20, contribution: 14.4, desc: '4 geotagged ground photos of eroded approach road' },
      { name: 'Severity', score: 74, weight: '20%', weightNum: 0.20, contribution: 14.8, desc: '35-min ambulance transfer delays to sub-divisional center' },
      { name: 'Public Service Impact', score: 76, weight: '15%', weightNum: 0.15, contribution: 11.4, desc: 'Impaired services: Primary Healthcare, Maternal Transit, Clinic Access' },
      { name: 'Geographic Concentration', score: 70, weight: '10%', weightNum: 0.10, contribution: 7.0, desc: 'Jalukbari healthcare approach corridor' },
      { name: 'Recency', score: 69, weight: '10%', weightNum: 0.10, contribution: 6.9, desc: 'Steady reports over past month' }
    ],
    recommendedDomain: 'Health & Family Welfare / PWD Roads Assam',
    recommendedProject: {
      title: 'Jalukbari Health Center Concrete Approach Road & Retaining Wall',
      domain: 'Rural Healthcare Access Infrastructure',
      estimatedBudget: '₹4.2 Cr',
      feasibilityCaveat: 'Requires slope stabilization clearance.'
    },
    communityEvidence: [
      {
        id: 'ev-gw-1',
        title: 'Eroded Hill Shoulder Near Health Center Gate',
        category: 'Photo evidence',
        date: '2025-06-10',
        location: 'Jalukbari PHC Link Road',
        privacyShieldStatus: 'Shielded (Faces Blurred)',
        verificationStatus: 'Verified by Community'
      }
    ],
    citizenDemandsList: [
      { id: 'need-gw-1', user: 'Citizen #A2N76', date: '2025-06-10', text: 'Ambulance got stuck on the broken slope road while taking a pregnant woman to the hospital. Road must be paved with concrete.', language: 'Assamese' }
    ],
    coordinates: { lat: 26.14, lng: 91.73, mapX: 84, mapY: 36 }
  },

  // SEED HOTSPOT: Raipur, Chhattisgarh (Medium - Priority 68)
  {
    id: 'hotspot-raipur',
    title: 'Birgaon Industrial Belt Electrical Power Grid Deficit',
    name: 'Raipur, Chhattisgarh — Birgaon Electrical Distribution Deficit',
    standardizedProblem: 'Low Voltage Distribution Deficit & Transformer Outages',
    state: 'Chhattisgarh',
    stateId: 'CG',
    district: 'Raipur District',
    locality: 'Birgaon Industrial Sector',
    location: 'Birgaon Municipal Zone, Raipur District, Chhattisgarh',
    category: 'Electricity',
    primaryCategory: 'Electricity',
    secondaryCategory: 'Public Transport',
    reportCount: 5,
    requestCount: 5,
    relatedRequests: 220,
    affectedLocations: 8,
    affectedPopulation: 16000,
    affectedPopulationDisplay: '16,000 residents & artisans',
    severity: 'Medium',
    priorityScore: 68,
    priorityLevel: 'Medium',
    aiPriorityRecommendation: 'MEDIUM',
    citizenEvidenceCount: 5,
    evidenceCount: 5,
    status: 'Needs Government Review',
    currentStatus: 'Needs Government Review',
    governmentStatus: 'Needs Government Review',
    firstReportedDate: '2025-05-12',
    latestReportedDate: '2025-06-14',
    trend: '+12%',
    affectedServices: ['Power Grid Stability', 'Cold Storage', 'Household Electrification'],
    infrastructureGap: 'Low-voltage fluctuations burn local transformers, causing frequent outages for small businesses and households.',
    aiClassification: 'Sub-transmission electrical capacity and transformer overload deficit.',
    aiSummary: 'Local artisans and residents report recurrent voltage drops and transformer burnouts during peak hours.',
    whySummary: 'Medium severity + 5 citizen requests + power grid outages + small enterprise losses',
    whyReasons: [
      'Medium severity (Transformer burnouts and low-voltage fluctuations)',
      '5 citizen requests (220 local co-reports)',
      '5 transformer outage and meter voltage logs',
      'Essential services impacted: Grid Reliability, Cold Storage, Small Commerce',
      'Localized in Birgaon municipal cluster',
      'Consistent summer load surge'
    ],
    deterministicFactors: [
      { name: 'Citizen Demand', score: 64, weight: '25%', weightNum: 0.25, contribution: 16.0, desc: '5 citizen requests & 220 local co-reports' },
      { name: 'Evidence Strength', score: 70, weight: '20%', weightNum: 0.20, contribution: 14.0, desc: '5 transformer outage and voltage drop logs' },
      { name: 'Severity', score: 70, weight: '20%', weightNum: 0.20, contribution: 14.0, desc: 'Low-voltage fluctuations burning cold storage units' },
      { name: 'Public Service Impact', score: 68, weight: '15%', weightNum: 0.15, contribution: 10.2, desc: 'Impaired services: Power Grid Stability, Cold Storage, Electrification' },
      { name: 'Geographic Concentration', score: 70, weight: '10%', weightNum: 0.10, contribution: 7.0, desc: 'Birgaon municipal industrial sector' },
      { name: 'Recency', score: 68, weight: '10%', weightNum: 0.10, contribution: 6.8, desc: 'Consistent summer load surge' }
    ],
    recommendedDomain: 'CSPDCL (Chhattisgarh State Power Distribution Company)',
    recommendedProject: {
      title: 'Birgaon 33/11kV Power Substation & Dedicated Distribution Lines',
      domain: 'Electrical Distribution & Grid Modernization',
      estimatedBudget: '₹6.8 Cr',
      feasibilityCaveat: 'Requires right-of-way for feeder cables.'
    },
    communityEvidence: [
      {
        id: 'ev-rp-1',
        title: 'Overheated Transformer Unit & Voltage Log (160V recorded)',
        category: 'Photo evidence',
        date: '2025-06-11',
        location: 'Birgaon Sector 3 Substation',
        privacyShieldStatus: 'Shielded (Official Meter)',
        verificationStatus: 'Verified by Community'
      }
    ],
    citizenDemandsList: [
      { id: 'need-rp-1', user: 'Citizen #C5K19', date: '2025-06-11', text: 'Voltage drops to 160V every evening. Motor pumps and machinery are failing and burning out.', language: 'Hindi' }
    ],
    coordinates: { lat: 21.25, lng: 81.63, mapX: 54, mapY: 52 }
  },

  // 1. Karnataka — Scenario A: Road flooding near a school (High Severity, Recurring, School safety impact)
  {
    id: 'hotspot-001',
    title: 'Seasonal Road Inundation & Drainage Deficit',
    name: 'Ward 42 School Access Corridor — Seasonal Road Inundation & Drainage Deficit',
    standardizedProblem: 'Seasonal Road Inundation & Stormwater Drainage Deficit',
    state: 'Karnataka',
    stateId: 'KA',
    district: 'Bengaluru Urban',
    locality: 'Ward 42, HSR - Bellandur Feeder Link',
    location: 'Near Government Higher Secondary School, Ward 42, Bengaluru Urban, Karnataka',
    category: 'Drainage & Flood Mitigation',
    primaryCategory: 'Drainage & Flood Mitigation',
    secondaryCategory: 'Roads',
    reportCount: 37,
    relatedRequests: 1840,
    requestCount: 31,
    evidenceCount: 12,
    deterministicFactors: [
      { name: 'Citizen Demand', score: 92, weight: '25%', weightNum: 0.25, contribution: 23.0, desc: '31 citizen requests & 1,840 community co-reports' },
      { name: 'Evidence Strength', score: 90, weight: '20%', weightNum: 0.20, contribution: 18.0, desc: '12 verified ground photos & flood depth logs' },
      { name: 'Severity', score: 90, weight: '20%', weightNum: 0.20, contribution: 18.0, desc: 'Critical monsoon road inundation and transit block' },
      { name: 'Public Service Impact', score: 92, weight: '15%', weightNum: 0.15, contribution: 13.8, desc: 'Direct transit cutoff to Govt High School' },
      { name: 'Geographic Concentration', score: 91, weight: '10%', weightNum: 0.10, contribution: 9.1, desc: 'Dense 1.4km school feeder corridor' },
      { name: 'Recency', score: 91, weight: '10%', weightNum: 0.10, contribution: 9.1, desc: 'Active recurring reports during monsoon season' }
    ],
    affectedLocations: 42,
    affectedPopulation: 12600,
    affectedPopulationDisplay: '12,600 residents',
    severity: 'High',
    status: 'Needs Government Review',
    recurrenceIndicator: 'Recurring seasonal problem',
    firstReportedDate: '2025-01-14',
    latestReportedDate: '2025-06-18',
    supportingReportIds: ['need-01', 'need-02', 'need-03', 'need-101', 'need-102'],
    infrastructureGap: 'Seasonal flooding and unsafe school access',
    citizenEvidenceCount: 427,
    languagesReported: ['Kannada', 'Hindi', 'English'],
    trend: '+24%',
    priorityScore: 91,
    priorityLevel: 'High',
    aiPriorityRecommendation: 'HIGH',
    prioritySignal: 'High',
    whySummary: 'Recurring flooding + high report volume + school access impact + pedestrian safety impact',
    whyReasons: [
      'High severity (Critical monsoon inundation risk)',
      '37 related reports (1,840 citizen co-reports across corridor)',
      'School access affected (Government Higher Secondary School transit cutoff)',
      'Pedestrian safety affected (students stranded in 2+ ft water)',
      'Severe structural deficit in designed municipal capacity',
      'Recurring seasonal problem (every monsoon since 2023)',
      'Supporting ground evidence available (427 shielded citizen photos & depth telemetry)'
    ],
    recommendedDomain: 'Stormwater Drainage & Urban Roads Engineering',
    recommendedAction: 'Stormwater drainage upgrade and road rehabilitation',
    suggestedIntervention: 'Construct dual 1000mm RCC box culverts and elevate 1.4km school corridor road',
    scoreBreakdown: {
      demandScore: 23,       // 25% weight
      severityScore: 18,     // 20% weight
      populationScore: 18,   // 20% weight
      gapScore: 14,          // 15% weight
      evidenceScore: 9,      // 10% weight
      trendScore: 9,         // 10% weight
      total: 91
    },
    affectedServices: ['School Access', 'Road Access', 'Pedestrian Safety', 'Emergency Transit'],
    languagesRepresented: [
      { language: 'Kannada', percentage: 48 },
      { language: 'Hindi', percentage: 28 },
      { language: 'English', percentage: 24 }
    ],
    demandTrend: [
      { month: 'Jan', requests: 140 },
      { month: 'Feb', requests: 280 },
      { month: 'Mar', requests: 460 },
      { month: 'Apr', requests: 790 },
      { month: 'May', requests: 1240 },
      { month: 'Jun', requests: 1840 }
    ],
    communityEvidence: [
      {
        id: 'ev-001',
        title: 'Waterlogged School Gate & Stranded Bus',
        category: 'Photo evidence',
        date: '2025-06-12',
        location: 'Gate 2, Ward 42 Govt High School',
        privacyShieldStatus: 'Shielded (Faces & Plates Blurred)',
        verificationStatus: 'Verified by Community'
      },
      {
        id: 'ev-002',
        title: 'Citizen Flood Depth Log (2.4 ft measured)',
        category: 'Citizen observation',
        date: '2025-06-14',
        location: 'Main Feeder Link Junction',
        privacyShieldStatus: 'Public Safe View',
        verificationStatus: 'Telemetry Verified'
      },
      {
        id: 'ev-003',
        title: 'Municipal Pre-Monsoon Drain Silt Inspection',
        category: 'Infrastructure document',
        date: '2025-05-28',
        location: 'Culvert #8-B Outfall',
        privacyShieldStatus: 'Official Record',
        verificationStatus: 'Verified Source'
      },
      {
        id: 'ev-004',
        title: 'Resident Association Co-report Petition (427 co-signers)',
        category: 'Location report',
        date: '2025-06-18',
        location: 'Sector 4 Residential Block',
        privacyShieldStatus: 'Shielded Citizen Signatures',
        verificationStatus: 'Verified by Community'
      }
    ],
    summary: 'Repeated citizen reports indicate recurring monsoon flooding along a school access corridor, combined with inadequate stormwater drainage.',
    aiSummary: 'Citizen reports indicate recurring monsoon flooding affecting road access and school attendance across multiple nearby communities. Reports are concentrated around Ward 42 and indicate a persistent drainage and road connectivity infrastructure gap.',
    recommendedProject: {
      title: 'Ward 42 / Riverside Stormwater Drainage Upgrade & Culvert Augmentation',
      domain: 'Stormwater Drainage & Urban Roads Engineering',
      estimatedBudget: '₹14.2 Cr',
      feasibilityCaveat: 'AI-assisted project recommendation. Requires municipal public works feasibility review.'
    },
    relatedProjects: [
      { id: 'pr-01', title: 'Riverside / Ward 42 Stormwater Drainage & Access Corridor Upgrade', status: 'In Progress' }
    ],
    governmentStatus: 'Action Underway',
    currentStatus: 'Action Underway',
    linkedProjectId: 'pr-01',
    coordinates: { lat: 12.9716, lng: 77.5946, mapX: 36, mapY: 72 }
  },

  // Scenario B: Rajasthan — Drinking water shortage (High Severity, High Public-Service Impact)
  {
    id: 'hotspot-015',
    deterministicFactors: [
      { name: 'Citizen Demand', score: 76, weight: '25%', weightNum: 0.25, contribution: 19.0, desc: '19 citizen requests & 530 community co-reports' },
      { name: 'Evidence Strength', score: 75, weight: '20%', weightNum: 0.20, contribution: 15.0, desc: '7 verified photos of dried community kiosks & salinity logs' },
      { name: 'Severity', score: 80, weight: '20%', weightNum: 0.20, contribution: 16.0, desc: 'High summer drought & brackish groundwater dependency' },
      { name: 'Public Service Impact', score: 76, weight: '15%', weightNum: 0.15, contribution: 11.4, desc: 'Impaired services: Potable Water Supply, Household Sanitation' },
      { name: 'Geographic Concentration', score: 74, weight: '10%', weightNum: 0.10, contribution: 7.4, desc: 'Mandore block 8-hamlet cluster' },
      { name: 'Recency', score: 72, weight: '10%', weightNum: 0.10, contribution: 7.2, desc: 'Recurring summer season requests' }
    ],
    aiClassification: 'Potable water supply and groundwater salinity deficit.',
    evidenceCount: 7,
    requestCount: 19,
    priorityScore: 76,
    priorityLevel: 'Medium',
    status: 'Needs Government Review',
    title: 'Potable Drinking Water Shortage & Pipeline Salinity Infiltration',
    name: 'Mandore Block Drinking Water Shortage & Salinity Crisis',
    standardizedProblem: 'Groundwater Salinity & Piped Drinking Water Deficit',
    state: 'Rajasthan',
    stateId: 'RJ',
    district: 'Jodhpur District',
    locality: 'Mandore Block / Sector 8 Hamlets',
    location: 'Mandore Block, Jodhpur District, Rajasthan',
    category: 'Drinking Water',
    primaryCategory: 'Drinking Water',
    secondaryCategory: 'Sanitation',
    reportCount: 24,
    relatedRequests: 530,
    affectedLocations: 18,
    affectedPopulation: 28000,
    affectedPopulationDisplay: '28,000 residents',
    severity: 'Medium',
    recurrenceIndicator: 'Chronic summer seasonal shortage (5-day tanker delivery gaps)',
    firstReportedDate: '2025-02-04',
    latestReportedDate: '2025-06-19',
    supportingReportIds: ['need-143', 'need-144', 'need-155'],
    infrastructureGap: 'Zero municipal piped water conveyance; groundwater salinity TDS exceeds 2,200 ppm.',
    citizenEvidenceCount: 86,
    languagesReported: ['Hindi', 'English'],
    trend: '+18%',
    aiPriorityRecommendation: 'MEDIUM',
    prioritySignal: 'Medium',
    whySummary: 'High severity + acute potable water shortage + 24 related reports + recurring summer drought',
    whyReasons: [
      'High severity (Acute potable water shortage in 46°C heat)',
      '24 related reports (530 community co-reports across 8 hamlets)',
      'Drinking water & basic household sanitation access disrupted',
      'Public health risk from saline groundwater consumption',
      'Recurring summer drought crisis',
      'Supporting ground telemetry and tanker arrival logs available (86 records)'
    ],
    recommendedDomain: 'Public Health Engineering Department (PHED) & Water Works',
    recommendedAction: 'Construct 6.8km dedicated DI pipeline extension and RO purification booster station',
    suggestedIntervention: 'Extend 6.8km ductile iron potable water pipeline from regional canal feeder and install 50,000 LPH filtration unit.',
    scoreBreakdown: {
      demandScore: 18,       // 25% weight
      severityScore: 19,     // 20% weight
      populationScore: 17,   // 20% weight
      gapScore: 11,          // 15% weight
      evidenceScore: 7,      // 10% weight
      trendScore: 6,         // 10% weight
      total: 78
    },
    affectedServices: ['Drinking Water', 'Household Sanitation', 'Public Health Access'],
    languagesRepresented: [
      { language: 'Hindi', percentage: 72 },
      { language: 'English', percentage: 28 }
    ],
    demandTrend: [
      { month: 'Jan', requests: 40 },
      { month: 'Feb', requests: 75 },
      { month: 'Mar', requests: 120 },
      { month: 'Apr', requests: 210 },
      { month: 'May', requests: 380 },
      { month: 'Jun', requests: 530 }
    ],
    communityEvidence: [
      {
        id: 'ev-015-1',
        title: 'Empty Community Cisterns & 5-Day Tanker Delay Notice',
        category: 'Photo evidence',
        date: '2025-06-10',
        location: 'Mandore Central Water Kiosk',
        privacyShieldStatus: 'Shielded (Faces Blurred)',
        verificationStatus: 'Verified by Community'
      },
      {
        id: 'ev-015-2',
        title: 'Borewell Salinity TDS Chemistry Test (2,340 ppm recorded)',
        category: 'Infrastructure document',
        date: '2025-05-22',
        location: 'PHED Sub-divisional Laboratory',
        privacyShieldStatus: 'Official Record',
        verificationStatus: 'Verified Source'
      }
    ],
    summary: 'Citizen reports document acute potable drinking water deficits and brackish tubewell dependency across Mandore block hamlets.',
    aiSummary: 'Normalized citizen reports confirm chronic summer drinking water shortage requiring municipal piped extension from canal feeder.',
    recommendedProject: {
      title: 'Mandore Elevated Drinking Water Reservoir & Piped Distribution',
      domain: 'Public Health Engineering Department (PHED) & Water Works',
      estimatedBudget: '₹8.9 Cr',
      feasibilityCaveat: 'AI-assisted project recommendation. Requires department feasibility review.'
    },
    relatedProjects: [
      { id: 'pr-15', title: 'Mandore Elevated Drinking Water Reservoir & Piped Distribution', status: 'Budget Allocated' }
    ],
    governmentStatus: 'Budget Allocated',
    currentStatus: 'Budget Allocated',
    linkedProjectId: 'pr-15',
    coordinates: { lat: 26.3533, lng: 73.0458, mapX: 32, mapY: 34 }
  },

  // Scenario C: Rajasthan — Minor infrastructure issue (Few Reports, Lower Severity)
  {
    id: 'hotspot-099',
    title: 'Damaged Pavement Curb & Faded Street Signage',
    name: 'Sector 9 Market Access Road Curb & Signage Defect',
    standardizedProblem: 'Pavement Curb Erosion & Traffic Signage Degradation',
    state: 'Rajasthan',
    stateId: 'RJ',
    district: 'Jaipur District',
    locality: 'Sector 9 Market Access Road',
    location: 'Sector 9 Market Access Road, Jaipur, Rajasthan',
    category: 'Roads',
    primaryCategory: 'Roads',
    secondaryCategory: 'Public Transport',
    reportCount: 3,
    relatedRequests: 18,
    requestCount: 18,
    affectedLocations: 1,
    affectedPopulation: 1200,
    affectedPopulationDisplay: '1,200 residents',
    severity: 'Low',
    recurrenceIndicator: 'Isolated defect (no seasonal recurrence)',
    firstReportedDate: '2025-05-10',
    latestReportedDate: '2025-06-02',
    supportingReportIds: ['need-160', 'need-161'],
    infrastructureGap: 'Cosmetic curb chipping and faded street signs along 120m market pavement stretch.',
    citizenEvidenceCount: 2,
    languagesReported: ['Hindi', 'English'],
    trend: 'Stable',
    priorityScore: 32,
    priorityLevel: 'LOW',
    aiPriorityRecommendation: 'LOW',
    prioritySignal: 'Low',
    whySummary: 'Low severity + few related reports (3 submissions) + no vital services disrupted + isolated non-recurring incident',
    whyReasons: [
      'Low severity (Minor cosmetic curb chipping and faded lettering)',
      'Few related reports (3 submissions)',
      'No vital services (school, hospital, potable water) disrupted',
      'No imminent public safety hazard',
      'Isolated non-recurring incident',
      'Limited ground photos (2 citizen submissions)'
    ],
    recommendedDomain: 'Municipal Traffic Maintenance & Minor Works',
    recommendedAction: 'Schedule routine curb recasting and reflective sign replacement during quarterly maintenance',
    suggestedIntervention: 'Repave 120m concrete curb edges and install standard municipal retroreflective street signs.',
    scoreBreakdown: {
      demandScore: 6,        // 25% weight
      severityScore: 6,      // 20% weight
      populationScore: 8,    // 20% weight
      gapScore: 5,           // 15% weight
      evidenceScore: 4,      // 10% weight
      trendScore: 3,         // 10% weight
      total: 32
    },
    affectedServices: ['Street Signage', 'Pedestrian Walkway'],
    languagesRepresented: [
      { language: 'Hindi', percentage: 65 },
      { language: 'English', percentage: 35 }
    ],
    demandTrend: [
      { month: 'Jan', requests: 1 },
      { month: 'Feb', requests: 2 },
      { month: 'Mar', requests: 5 },
      { month: 'Apr', requests: 8 },
      { month: 'May', requests: 14 },
      { month: 'Jun', requests: 18 }
    ],
    communityEvidence: [
      {
        id: 'ev-099-1',
        title: 'Chipped Curb Edge near Grocery Lane',
        category: 'Photo evidence',
        date: '2025-05-12',
        location: 'Sector 9 Market Crossing',
        privacyShieldStatus: 'Public Safe View',
        verificationStatus: 'Verified by Community'
      }
    ],
    summary: 'Citizen reports note worn pedestrian curb stone and faded directional sign near market intersection.',
    aiSummary: 'Minor localized traffic maintenance defect. Does not compromise essential mobility or public safety.',
    recommendedProject: {
      title: 'Sector 9 Market Pavement & Signage Routine Maintenance',
      domain: 'Municipal Traffic Maintenance & Minor Works',
      estimatedBudget: '₹45,000',
      feasibilityCaveat: 'Standard routine municipal maintenance item.'
    },
    governmentStatus: 'Needs Government Review',
    currentStatus: 'Needs Government Review',
    linkedProjectId: null,
    coordinates: { lat: 26.9124, lng: 75.7873, mapX: 32, mapY: 33 }
  },


  // 2. Maharashtra — Riverside Basin Flood & Drainage Hotspot
  {
    id: 'hotspot-01',
    name: 'Riverside Basin Flood & Drainage Hotspot',
    state: 'Maharashtra',
    stateId: 'MH',
    district: 'Riverside County / Pune District',
    locality: 'Haveli Block / Sector 4-B',
    category: 'Drainage & Flood Mitigation',
    primaryCategory: 'Drainage & Flood Mitigation',
    secondaryCategory: 'Roads',
    requestCount: 2340,
    relatedRequests: 2340,
    affectedLocations: 67,
    affectedPopulation: 45000,
    affectedPopulationDisplay: '45,000 residents',
    severity: 'Critical',
    prioritySignal: 'Very High',
    priorityScore: 94,
    priorityLevel: 'Critical',
    trend: '+31%',
    citizenEvidenceCount: 512,
    languagesReported: ['Hindi', 'Marathi', 'English'],
    infrastructureGap: 'Stormwater drainage capacity deficit',
    recommendedAction: 'Construct dual 1200mm RCC box culverts and elevate 1.8km arterial road corridor',
    suggestedIntervention: 'Construct dual 1200mm RCC box culverts, elevate the 1.8km arterial road by 0.6m, and connect outfall to secondary canal.',
    scoreBreakdown: {
      demandScore: 96,       // 25% weight -> 24.0
      severityScore: 95,     // 20% weight -> 19.0
      populationScore: 92,   // 20% weight -> 18.4
      gapScore: 98,          // 15% weight -> 14.7
      evidenceScore: 90,     // 10% weight -> 9.0
      trendScore: 92,        // 10% weight -> 9.2
      total: 94
    },
    affectedServices: ['Road Access', 'School Attendance', 'Pedestrian Safety', 'Emergency Ambulance Transit'],
    languagesRepresented: [
      { language: 'Hindi', percentage: 42 },
      { language: 'Marathi', percentage: 31 },
      { language: 'English', percentage: 18 },
      { language: 'Other', percentage: 9 }
    ],
    demandTrend: [
      { month: 'Jan', requests: 210 },
      { month: 'Feb', requests: 380 },
      { month: 'Mar', requests: 590 },
      { month: 'Apr', requests: 840 },
      { month: 'May', requests: 1420 },
      { month: 'Jun', requests: 2340 }
    ],
    communityEvidence: [
      {
        id: 'ev-101',
        title: 'Inundated Arterial Feeder Road (2.2 ft water)',
        category: 'Photo evidence',
        date: '2025-06-15',
        location: 'Sector 4-B Riverside Corridor',
        privacyShieldStatus: 'Shielded (Vehicle Plates Anonymized)',
        verificationStatus: 'Verified by Community'
      },
      {
        id: 'ev-102',
        title: 'Ambulance Rerouting Notice & Telemetry Log',
        category: 'Citizen observation',
        date: '2025-06-16',
        location: 'Sub-Centre Clinic Access Point',
        privacyShieldStatus: 'Public Safe View',
        verificationStatus: 'Telemetry Verified'
      },
      {
        id: 'ev-103',
        title: 'Subterranean Runoff Deficit Assessment Document',
        category: 'Infrastructure document',
        date: '2025-05-19',
        location: 'Basin Outfall Canal Sluice',
        privacyShieldStatus: 'Official Record',
        verificationStatus: 'Verified Source'
      },
      {
        id: 'ev-104',
        title: 'Resident Association Ground Telemetry Submission',
        category: 'Location report',
        date: '2025-06-18',
        location: 'Haveli Block Community Center',
        privacyShieldStatus: 'Shielded Citizen Signatures',
        verificationStatus: 'Verified by Community'
      }
    ],
    summary: 'Citizen reports indicate recurring monsoon flooding affecting road access and school attendance across multiple nearby communities. Reports are concentrated around the Riverside Basin and indicate a persistent drainage infrastructure gap.',
    aiSummary: 'Citizen reports indicate recurring monsoon flooding affecting road access and school attendance across multiple nearby communities. Reports are concentrated around the Riverside Basin and indicate a persistent drainage infrastructure gap.',
    recommendedProject: {
      title: 'Riverside Municipal Water Treatment Plant Expansion',
      domain: 'Municipal Stormwater & Urban Road Works',
      estimatedBudget: '₹14.2 Cr',
      feasibilityCaveat: 'AI-assisted project recommendation. Requires municipal public works feasibility review.'
    },
    relatedProjects: [
      { id: 'pr-01', title: 'Riverside Municipal Water Treatment Plant Expansion', status: 'Work Ongoing' }
    ],
    governmentStatus: 'Work Ongoing',
    linkedProjectId: 'pr-01',
    coordinates: { lat: 18.5204, lng: 73.8567, mapX: 37, mapY: 56 }
  },

  // 2. Karnataka
  {
    id: 'hotspot-02',
    name: 'North Ward Rural Transit & Feeder Link',
    state: 'Karnataka',
    stateId: 'KA',
    district: 'Bengaluru Urban',
    block: 'Anekal Taluk',
    primaryCategory: 'Roads',
    secondaryCategory: 'Healthcare',
    requestCount: 1820,
    affectedPopulation: '62,000 residents',
    affectedPopulationRaw: 62000,
    affectedServices: ['Ambulance Transit', 'Agricultural Logistics', 'Bus Transport'],
    severity: 'High',
    priorityScore: 89,
    scoreBreakdown: {
      demandScore: 27,
      severityScore: 22,
      populationScore: 19,
      gapScore: 12,
      urgencyScore: 9,
      total: 89
    },
    infrastructureGap: '4.2km unpaved arterial link road with severe cratering; delays critical emergency hospital transfers by 45+ minutes during rainy periods.',
    aiReasoning: 'AI synthesized 1,820 regional Kannada and English voice reports into an arterial transportation deficit bottleneck.',
    evidenceSummary: '86 geotagged citizen photos showing impassable mud tracks and ambulance detours.',
    existingCoverage: '32% all-weather road connectivity',
    suggestedIntervention: 'Pave 4.2km two-lane bituminous carriage with storm shoulders and concrete culverts.',
    recommendedProject: {
      title: 'Anekal Feeder Corridor All-Weather Bituminous Upgrade',
      domain: 'Rural Transportation & Highway Paving',
      estimatedBudget: '₹8.6 Cr',
      feasibilityCaveat: 'AI-assisted project recommendation. Requires department feasibility review.'
    },
    governmentStatus: 'Project Proposed',
    linkedProjectId: 'pr-02',
    coordinates: { lat: 12.7104, lng: 77.6976, mapX: 36, mapY: 74 }
  },

  // 3. Tamil Nadu
  {
    id: 'hotspot-03',
    name: 'Tambaram Coastal Salinity & Piped Water Gap',
    state: 'Tamil Nadu',
    stateId: 'TN',
    district: 'Chengalpattu District',
    block: 'Tambaram Sub-division',
    primaryCategory: 'Drinking Water',
    secondaryCategory: 'Sanitation',
    requestCount: 1650,
    affectedPopulation: '38,000 residents',
    affectedPopulationRaw: 38000,
    affectedServices: ['Potable Water Supply', 'Public Health', 'Household Economy'],
    severity: 'High',
    priorityScore: 86,
    scoreBreakdown: {
      demandScore: 26,
      severityScore: 21,
      populationScore: 17,
      gapScore: 13,
      urgencyScore: 9,
      total: 86
    },
    infrastructureGap: 'Zero piped drinking water lines in low-income peri-urban hamlets; groundwater TDS exceeds 1,800 ppm, forcing residents to spend 18% of income on private tankers.',
    aiReasoning: 'Normalized Tamil vernacular and text statements identifying tanker exploitation and brackish borewell dependency.',
    evidenceSummary: 'Certified water chemistry test sheets and daily community queue photographs.',
    existingCoverage: '14% piped tap connection',
    suggestedIntervention: 'Extend 8.4km ductile iron potable pipeline network from regional reverse-osmosis feeder plant.',
    recommendedProject: {
      title: 'Chengalpattu Coastal Water Pipeline & Booster Network',
      domain: 'Water Resources & Municipal Supply Engineering',
      estimatedBudget: '₹11.8 Cr',
      feasibilityCaveat: 'AI-assisted project recommendation. Requires department feasibility review.'
    },
    governmentStatus: 'Under Department Assessment',
    linkedProjectId: 'pr-03',
    coordinates: { lat: 12.9249, lng: 80.1000, mapX: 43, mapY: 83 }
  },

  // 4. Uttar Pradesh
  {
    id: 'hotspot-04',
    name: 'Varanasi Heritage Ghat Feeder Storm Drainage',
    state: 'Uttar Pradesh',
    stateId: 'UP',
    district: 'Varanasi District',
    block: 'Kashi Urban Zone',
    primaryCategory: 'Drainage & Flood Mitigation',
    secondaryCategory: 'Sanitation',
    requestCount: 1540,
    affectedPopulation: '52,000 residents & pilgrims',
    affectedPopulationRaw: 52000,
    affectedServices: ['Pedestrian Pilgrimage Routing', 'Heritage Sanitation', 'Flood Discharge'],
    severity: 'High',
    priorityScore: 84,
    scoreBreakdown: {
      demandScore: 25,
      severityScore: 21,
      populationScore: 18,
      gapScore: 12,
      urgencyScore: 8,
      total: 84
    },
    infrastructureGap: 'Silted 80-year-old brick masonry conduits fail during monsoon, causing sewage and stormwater to flood dense market alleys.',
    aiReasoning: 'Clustered 1,540 citizen reports describing raw sewage backflow into narrow pedestrian lanes during cloudbursts.',
    evidenceSummary: '54 video clips of water stagnation and merchant association representations.',
    existingCoverage: '26% functional drainage capacity',
    suggestedIntervention: 'Micro-tunnel high-density polyethylene stormwater interceptor to bypass ancient market alleys.',
    recommendedProject: {
      title: 'Varanasi Heritage Core Trenchless Drainage Interceptor',
      domain: 'Heritage Urban Hydrology & Municipal Sanitation',
      estimatedBudget: '₹16.5 Cr',
      feasibilityCaveat: 'AI-assisted project recommendation. Requires department feasibility review.'
    },
    governmentStatus: 'Budget Allocated',
    linkedProjectId: 'pr-04',
    coordinates: { lat: 25.3176, lng: 82.9739, mapX: 53, mapY: 36 }
  },

  // 5. West Bengal
  {
    id: 'hotspot-05',
    name: 'Salt Lake Wetland Feeder Sluice & Drainage',
    state: 'West Bengal',
    stateId: 'WB',
    district: 'North 24 Parganas',
    block: 'Bidhannagar Sub-division',
    primaryCategory: 'Drainage & Flood Mitigation',
    secondaryCategory: 'Roads',
    requestCount: 1420,
    affectedPopulation: '34,000 residents',
    affectedPopulationRaw: 34000,
    affectedServices: ['Urban Transit', 'Vector-Borne Disease Control', 'School Access'],
    severity: 'High',
    priorityScore: 82,
    scoreBreakdown: {
      demandScore: 25,
      severityScore: 20,
      populationScore: 16,
      gapScore: 13,
      urgencyScore: 8,
      total: 82
    },
    infrastructureGap: 'Siltation in primary sluice gates causes rainwater to accumulate for 12-16 days post-cyclone, submerging bus terminals.',
    aiReasoning: 'Bengali and English citizen submissions indicate recurring tidal backflow and non-functional sluice pumps.',
    evidenceSummary: 'Drone survey orthomosaics and 72 citizen ground photos.',
    existingCoverage: '35% active sluice discharge rate',
    suggestedIntervention: 'Automate 4 primary sluice gates with solar telemetry and desilt the 3.5km feeder outfall.',
    recommendedProject: {
      title: 'Bidhannagar Stormwater Sluice Modernization & Outfall Desilting',
      domain: 'Wetland Hydrology & Coastal Defense',
      estimatedBudget: '₹9.4 Cr',
      feasibilityCaveat: 'AI-assisted project recommendation. Requires department feasibility review.'
    },
    governmentStatus: 'Needs Review',
    linkedProjectId: 'pr-05',
    coordinates: { lat: 22.5800, lng: 88.4200, mapX: 74, mapY: 48 }
  },

  // 6. Gujarat
  {
    id: 'hotspot-06',
    name: 'Surat Industrial Perimeter Effluent & Storm Runoff',
    state: 'Gujarat',
    stateId: 'GJ',
    district: 'Surat District',
    block: 'Pandesara Sector',
    primaryCategory: 'Sanitation',
    secondaryCategory: 'Drainage & Flood Mitigation',
    requestCount: 1310,
    affectedPopulation: '41,000 residents & workers',
    affectedPopulationRaw: 41000,
    affectedServices: ['Industrial Worker Safety', 'Drinking Water Protection', 'Air & Soil Quality'],
    severity: 'High',
    priorityScore: 81,
    scoreBreakdown: {
      demandScore: 24,
      severityScore: 21,
      populationScore: 16,
      gapScore: 12,
      urgencyScore: 8,
      total: 81
    },
    infrastructureGap: 'Lack of separate storm and industrial runoff channels causes chemical overflow into adjacent residential housing colonies.',
    aiReasoning: 'Gujarati voice and text reports describe corrosive stagnant runoff entering ground-floor worker quarters.',
    evidenceSummary: 'Resident association water acidity tests and photographic logs of damaged building footings.',
    existingCoverage: '42% channel segregation',
    suggestedIntervention: 'Construct chemically-resistant closed conduit network and 15 MLD common effluent pumping station.',
    recommendedProject: {
      title: 'Surat Pandesara Industrial Runoff Segregation Network',
      domain: 'Industrial Effluent & Environmental Sanitation',
      estimatedBudget: '₹18.2 Cr',
      feasibilityCaveat: 'AI-assisted project recommendation. Requires department feasibility review.'
    },
    governmentStatus: 'Under Department Assessment',
    linkedProjectId: 'pr-06',
    coordinates: { lat: 21.1702, lng: 72.8311, mapX: 26, mapY: 51 }
  },

  // 7. Rajasthan
  {
    id: 'hotspot-07',
    name: 'Jaipur Peri-Urban High School Structural Deficit',
    state: 'Rajasthan',
    stateId: 'RJ',
    district: 'Jaipur Rural District',
    block: 'Amer Block',
    primaryCategory: 'Schools',
    secondaryCategory: 'Electricity',
    requestCount: 1180,
    affectedPopulation: '3,800 students & teachers',
    affectedPopulationRaw: 3800,
    affectedServices: ['Girls Educational Retention', 'Extreme Heat Shelter', 'Digital Literacy'],
    severity: 'High',
    priorityScore: 79,
    scoreBreakdown: {
      demandScore: 23,
      severityScore: 20,
      populationScore: 15,
      gapScore: 13,
      urgencyScore: 8,
      total: 79
    },
    infrastructureGap: 'Government Senior Secondary School has 480 female pupils with zero functional sanitation blocks and 42°C exposed asbestos classrooms.',
    aiReasoning: 'Parent-Teacher Council reports in Hindi highlighting student dropouts due to lack of sanitation and extreme classroom heat.',
    evidenceSummary: 'Building inspection photos, student petitions, and summer absenteeism logs.',
    existingCoverage: '28% statutory school facility index',
    suggestedIntervention: 'Build 8 climate-insulated modular classrooms, dedicated girls hygiene block, and 15kW rooftop solar array.',
    recommendedProject: {
      title: 'Amer Block Model Girls Secondary School Infrastructure Upgrade',
      domain: 'Public Education Infrastructure & Renewable Power',
      estimatedBudget: '₹4.2 Cr',
      feasibilityCaveat: 'AI-assisted project recommendation. Requires department feasibility review.'
    },
    governmentStatus: 'Project Proposed',
    linkedProjectId: 'pr-07',
    coordinates: { lat: 26.9855, lng: 75.8507, mapX: 33, mapY: 33 }
  },

  // 8. Kerala
  {
    id: 'hotspot-08',
    name: 'Kochi Coastal Ward Storm Canal Expansion',
    state: 'Kerala',
    stateId: 'KL',
    district: 'Ernakulam District',
    block: 'Kochi Municipal Corp',
    primaryCategory: 'Drainage & Flood Mitigation',
    secondaryCategory: 'Drinking Water',
    requestCount: 1750,
    affectedPopulation: '48,000 residents',
    affectedPopulationRaw: 48000,
    affectedServices: ['Tidal Backflow Prevention', 'Urban Water Supply', 'Public Health'],
    severity: 'High',
    priorityScore: 88,
    scoreBreakdown: {
      demandScore: 27,
      severityScore: 22,
      populationScore: 18,
      gapScore: 13,
      urgencyScore: 8,
      total: 88
    },
    infrastructureGap: 'Missing tidal lock gates along 3.2km feeder canal; spring high tides inundate residential basements twice daily for 4 months.',
    aiReasoning: 'Malayalam transcripts detailing continuous saltwater incursions contaminating municipal drinking water cisterns.',
    evidenceSummary: 'Tidal level measurements, flood depth markers, and 94 resident ground photographs.',
    existingCoverage: '22% tidal barrier coverage',
    suggestedIntervention: 'Install automated electro-hydraulic tidal regulator gates and reinforce 3.2km embankment.',
    recommendedProject: {
      title: 'Kochi South Canal Automated Tidal Gate & Bank Hardening',
      domain: 'Coastal Water Management & Flood Defense',
      estimatedBudget: '₹12.6 Cr',
      feasibilityCaveat: 'AI-assisted project recommendation. Requires department feasibility review.'
    },
    governmentStatus: 'Work In Progress',
    linkedProjectId: 'pr-08',
    coordinates: { lat: 9.9312, lng: 76.2673, mapX: 37, mapY: 87 }
  },

  // 9. Maharashtra (Thane)
  {
    id: 'hotspot-09',
    name: 'Thane Ghodbunder Road Pedestrian Safety Skywalk',
    state: 'Maharashtra',
    stateId: 'MH',
    district: 'Thane District',
    block: 'Wagle Estate',
    primaryCategory: 'Public Transport',
    secondaryCategory: 'Roads',
    requestCount: 1280,
    affectedPopulation: '58,000 commuters & students',
    affectedPopulationRaw: 58000,
    affectedServices: ['Pedestrian Safety', 'Commuter Transit', 'School Crossing'],
    severity: 'High',
    priorityScore: 78,
    scoreBreakdown: {
      demandScore: 23,
      severityScore: 20,
      populationScore: 16,
      gapScore: 11,
      urgencyScore: 8,
      total: 78
    },
    infrastructureGap: '8-lane highway separates 3 schools from dense residential sectors with zero grade-separated pedestrian crossings.',
    aiReasoning: 'Citizen reports describe recurring road accidents and children stranded waiting 25 minutes to cross arterial roadway.',
    evidenceSummary: 'Traffic density video logs and police accident report citations.',
    existingCoverage: 'Zero grade-separated crossings for 3.4km',
    suggestedIntervention: 'Erect steel skywalk with elevator ramps and CCTV surveillance connected to city traffic control.',
    recommendedProject: {
      title: 'Ghodbunder Road Grade-Separated Universal Skywalk',
      domain: 'Urban Transit & Pedestrian Safety Engineering',
      estimatedBudget: '₹5.8 Cr',
      feasibilityCaveat: 'AI-assisted project recommendation. Requires department feasibility review.'
    },
    governmentStatus: 'Under Department Assessment',
    linkedProjectId: 'pr-09',
    coordinates: { lat: 19.2183, lng: 72.9781, mapX: 38, mapY: 53 }
  },

  // 10. Karnataka (Mysuru)
  {
    id: 'hotspot-10',
    name: 'Mysuru Rural Primary Health Centre Power Reliability',
    state: 'Karnataka',
    stateId: 'KA',
    district: 'Mysuru District',
    block: 'Nanjangud Taluk',
    primaryCategory: 'Healthcare',
    secondaryCategory: 'Electricity',
    requestCount: 960,
    affectedPopulation: '28,000 rural residents',
    affectedPopulationRaw: 28000,
    affectedServices: ['Emergency Delivery Care', 'Vaccine Cold Storage', 'Trauma Care'],
    severity: 'High',
    priorityScore: 77,
    scoreBreakdown: {
      demandScore: 23,
      severityScore: 20,
      populationScore: 15,
      gapScore: 11,
      urgencyScore: 8,
      total: 77
    },
    infrastructureGap: 'Frequent 8-12 hour power blackouts disable vaccine cold-chain refrigeration and emergency childbirth care units.',
    aiReasoning: 'Health workers and villagers submitted Kannada transcripts detailing vaccine spoilage and flashlight deliveries.',
    evidenceSummary: 'PHC generator breakdown maintenance logs and diesel expenditure vouchers.',
    existingCoverage: 'Unreliable rural feeder grid',
    suggestedIntervention: 'Install 25kW rooftop solar microgrid with lithium-ferro-phosphate backup and dedicated 11kV hospital line.',
    recommendedProject: {
      title: 'Nanjangud PHC Solar Microgrid & Critical Care Power Resiliency',
      domain: 'Rural Healthcare Infrastructure & Energy',
      estimatedBudget: '₹2.8 Cr',
      feasibilityCaveat: 'AI-assisted project recommendation. Requires department feasibility review.'
    },
    governmentStatus: 'Needs Review',
    linkedProjectId: 'pr-10',
    coordinates: { lat: 12.1200, lng: 76.6800, mapX: 35, mapY: 76 }
  },

  // 11. Tamil Nadu (Coimbatore)
  {
    id: 'hotspot-11',
    name: 'Coimbatore Textile Hub Groundwater Remediation',
    state: 'Tamil Nadu',
    stateId: 'TN',
    district: 'Coimbatore District',
    block: 'Sulur Taluk',
    primaryCategory: 'Drinking Water',
    secondaryCategory: 'Sanitation',
    requestCount: 1140,
    affectedPopulation: '32,000 residents',
    affectedPopulationRaw: 32000,
    affectedServices: ['Potable Water Supply', 'Agricultural Productivity', 'Public Health'],
    severity: 'High',
    priorityScore: 76,
    scoreBreakdown: {
      demandScore: 22,
      severityScore: 20,
      populationScore: 15,
      gapScore: 11,
      urgencyScore: 8,
      total: 76
    },
    infrastructureGap: 'Dyeing unit seepage contaminated shallow aquifers with heavy metals and sulfate, leaving 14 villages without clean drinking water.',
    aiReasoning: 'Tamil reports detailing skin irritations and dried community wells.',
    evidenceSummary: 'Pollution control board water tests and farmer union petitions.',
    existingCoverage: '20% clean water access',
    suggestedIntervention: 'Install 3 community-scale reverse-osmosis filtration kiosks and deep Bhavani river intake pipeline.',
    recommendedProject: {
      title: 'Sulur Bhavani River Water Supply & Kiosk Network',
      domain: 'Rural Water Purification & Distribution',
      estimatedBudget: '₹6.5 Cr',
      feasibilityCaveat: 'AI-assisted project recommendation. Requires department feasibility review.'
    },
    governmentStatus: 'Budget Allocated',
    linkedProjectId: 'pr-11',
    coordinates: { lat: 11.0168, lng: 76.9558, mapX: 41, mapY: 82 }
  },

  // 12. Uttar Pradesh (Lucknow)
  {
    id: 'hotspot-12',
    name: 'Lucknow Outer Ring Road School Bus Transit Corridor',
    state: 'Uttar Pradesh',
    stateId: 'UP',
    district: 'Lucknow District',
    block: 'Mohanlalganj Block',
    primaryCategory: 'Roads',
    secondaryCategory: 'Public Transport',
    requestCount: 1080,
    affectedPopulation: '36,000 residents',
    affectedPopulationRaw: 36000,
    affectedServices: ['School Transport', 'Commuter Logistics', 'Pedestrian Safety'],
    severity: 'Medium',
    priorityScore: 74,
    scoreBreakdown: {
      demandScore: 22,
      severityScore: 18,
      populationScore: 15,
      gapScore: 11,
      urgencyScore: 8,
      total: 74
    },
    infrastructureGap: 'Unpaved 3.1km road connects 6 villages to rural high school; monsoon waterlogging causes school buses to cancel routes.',
    aiReasoning: 'Village pradhans and teachers submitted Hindi voice reports on educational isolation.',
    evidenceSummary: 'School attendance drop records during rainy months and road condition photos.',
    existingCoverage: '40% paved connectivity',
    suggestedIntervention: 'Construct all-weather bitumen road with concrete side drains and road signs.',
    recommendedProject: {
      title: 'Mohanlalganj Rural Education Link Road Paving',
      domain: 'Rural Road Construction & Connectivity',
      estimatedBudget: '₹4.8 Cr',
      feasibilityCaveat: 'AI-assisted project recommendation. Requires department feasibility review.'
    },
    governmentStatus: 'Needs Review',
    linkedProjectId: 'pr-12',
    coordinates: { lat: 26.6800, lng: 80.9800, mapX: 52, mapY: 35 }
  },

  // 13. Gujarat (Ahmedabad)
  {
    id: 'hotspot-13',
    name: 'Ahmedabad Eastern Feeder Canal Water Quality',
    state: 'Gujarat',
    stateId: 'GJ',
    district: 'Ahmedabad District',
    block: 'Vatva Industrial Estate',
    primaryCategory: 'Sanitation',
    secondaryCategory: 'Healthcare',
    requestCount: 1020,
    affectedPopulation: '35,000 residents',
    affectedPopulationRaw: 35000,
    affectedServices: ['Groundwater Purity', 'Respiratory Health', 'Urban Drainage'],
    severity: 'Medium',
    priorityScore: 73,
    scoreBreakdown: {
      demandScore: 21,
      severityScore: 18,
      populationScore: 15,
      gapScore: 11,
      urgencyScore: 8,
      total: 73
    },
    infrastructureGap: 'Solid waste dumped in open monsoon channel creates foul stagnant water that breeds mosquitoes and causes malaria outbreaks.',
    aiReasoning: 'Gujarati community statements citing high dengue counts and open canal pollution.',
    evidenceSummary: 'Hospital admission records and ground survey photos of blocked culverts.',
    existingCoverage: '45% municipal waste clearance',
    suggestedIntervention: 'Enclose 2.4km canal in precast concrete pipes and establish automated trash screens.',
    recommendedProject: {
      title: 'Vatva Storm Canal Pipe Enclosure & Trash Rack Installation',
      domain: 'Urban Sanitation & Drainage Infrastructure',
      estimatedBudget: '₹7.2 Cr',
      feasibilityCaveat: 'AI-assisted project recommendation. Requires department feasibility review.'
    },
    governmentStatus: 'Under Department Assessment',
    linkedProjectId: 'pr-13',
    coordinates: { lat: 22.9500, lng: 72.6300, mapX: 25, mapY: 48 }
  },

  // 14. West Bengal (Howrah)
  {
    id: 'hotspot-14',
    name: 'Howrah Railway Outfall Sump Rehabilitation',
    state: 'West Bengal',
    stateId: 'WB',
    district: 'Howrah District',
    block: 'Bally Sub-division',
    primaryCategory: 'Drainage & Flood Mitigation',
    secondaryCategory: 'Public Transport',
    requestCount: 990,
    affectedPopulation: '44,000 commuters',
    affectedPopulationRaw: 44000,
    affectedServices: ['Suburban Railway Access', 'Road Traffic', 'Public Safety'],
    severity: 'Medium',
    priorityScore: 72,
    scoreBreakdown: {
      demandScore: 21,
      severityScore: 18,
      populationScore: 15,
      gapScore: 11,
      urgencyScore: 7,
      total: 72
    },
    infrastructureGap: 'Subway underpass floods with 3ft water after 30 minutes of rain, halting access to central railway terminal.',
    aiReasoning: 'Bengali commuter submissions highlighting pedestrian risk and train cancellations.',
    evidenceSummary: 'Railway commuter tweets, station flood logs, and video telemetry.',
    existingCoverage: 'Under-capacity diesel pump system',
    suggestedIntervention: 'Install high-discharge electric submersible pumping station and separate storm retention sump.',
    recommendedProject: {
      title: 'Bally Railway Subway Storm Pumping Station Rehabilitation',
      domain: 'Transport Hub Hydrology & Flood Prevention',
      estimatedBudget: '₹3.9 Cr',
      feasibilityCaveat: 'AI-assisted project recommendation. Requires department feasibility review.'
    },
    governmentStatus: 'Project Proposed',
    linkedProjectId: 'pr-14',
    coordinates: { lat: 22.6500, lng: 88.3400, mapX: 73, mapY: 48 }
  },

  // 15. Rajasthan (Jodhpur)
  {
    id: 'hotspot-15',
    name: 'Jodhpur Arid Zone Drinking Water Tanker Depot Replacement',
    state: 'Rajasthan',
    stateId: 'RJ',
    district: 'Jodhpur District',
    block: 'Mandore Block',
    primaryCategory: 'Drinking Water',
    secondaryCategory: 'Healthcare',
    requestCount: 920,
    affectedPopulation: '26,000 residents',
    affectedPopulationRaw: 26000,
    affectedServices: ['Drinking Water Access', 'Maternal Health', 'Cattle Wellbeing'],
    severity: 'High',
    priorityScore: 75,
    scoreBreakdown: {
      demandScore: 22,
      severityScore: 20,
      populationScore: 14,
      gapScore: 11,
      urgencyScore: 8,
      total: 75
    },
    infrastructureGap: 'Acute summer drought forces residents to walk 3km to access brackish tubewell water when municipal tankers fail to arrive.',
    aiReasoning: 'Hindi transcripts describing tanker price gouging and severe livestock dehydration.',
    evidenceSummary: 'GPS records of tanker delays and community water quality test results.',
    existingCoverage: '20% piped water connectivity',
    suggestedIntervention: 'Construct 500,000 litre elevated reservoir connected to the Rajiv Gandhi Lift Canal.',
    recommendedProject: {
      title: 'Mandore Elevated Drinking Water Reservoir & Piped Distribution',
      domain: 'Arid Zone Water Supply Engineering',
      estimatedBudget: '₹8.9 Cr',
      feasibilityCaveat: 'AI-assisted project recommendation. Requires department feasibility review.'
    },
    governmentStatus: 'Budget Allocated',
    linkedProjectId: 'pr-15',
    coordinates: { lat: 26.3500, lng: 73.0400, mapX: 30, mapY: 35 }
  },

  // 16. Kerala (Kozhikode)
  {
    id: 'hotspot-16',
    name: 'Kozhikode Hilly Tribal Hamlet All-Weather Footbridge',
    state: 'Kerala',
    stateId: 'KL',
    district: 'Kozhikode District',
    block: 'Thamarassery Ghats',
    primaryCategory: 'Roads',
    secondaryCategory: 'Healthcare',
    requestCount: 880,
    affectedPopulation: '6,500 tribal residents',
    affectedPopulationRaw: 6500,
    affectedServices: ['Emergency Health Transfer', 'School Attendance', 'PDS Ration Access'],
    severity: 'High',
    priorityScore: 76,
    scoreBreakdown: {
      demandScore: 22,
      severityScore: 21,
      populationScore: 13,
      gapScore: 12,
      urgencyScore: 8,
      total: 76
    },
    infrastructureGap: 'Temporary bamboo bridge across mountain torrent washes away each monsoon, completely cutting off 4 tribal hamlets for 90 days.',
    aiReasoning: 'Malayalam audio reports documenting pregnant women carried on makeshift stretchers across swollen streams.',
    evidenceSummary: 'Video footage of washed-out bamboo bridge and tribal council resolutions.',
    existingCoverage: 'Zero all-weather crossings',
    suggestedIntervention: 'Erect 60-meter steel suspension footbridge with solar lighting and concrete abutments.',
    recommendedProject: {
      title: 'Thamarassery Ghat All-Weather Steel Suspension Bridge',
      domain: 'Mountain Infrastructure & Pedestrian Access',
      estimatedBudget: '₹3.4 Cr',
      feasibilityCaveat: 'AI-assisted project recommendation. Requires department feasibility review.'
    },
    governmentStatus: 'Work In Progress',
    linkedProjectId: 'pr-16',
    coordinates: { lat: 11.4100, lng: 75.9300, mapX: 37, mapY: 86 }
  },

  // 17. Maharashtra (Nashik)
  {
    id: 'hotspot-17',
    name: 'Nashik Grape Farm Belt Cold Storage Power Grid',
    state: 'Maharashtra',
    stateId: 'MH',
    district: 'Nashik District',
    block: 'Dindori Taluk',
    primaryCategory: 'Electricity',
    secondaryCategory: 'Roads',
    requestCount: 840,
    affectedPopulation: '18,000 farmers',
    affectedPopulationRaw: 18000,
    affectedServices: ['Agricultural Produce Storage', 'Rural Livelihood', 'Cold Chain'],
    severity: 'Medium',
    priorityScore: 71,
    scoreBreakdown: {
      demandScore: 20,
      severityScore: 18,
      populationScore: 14,
      gapScore: 11,
      urgencyScore: 8,
      total: 71
    },
    infrastructureGap: 'Low voltage fluctuations burn cold storage compressors, causing 25% harvest loss for smallholder grape cultivators.',
    aiReasoning: 'Marathi farmer cooperative petitions regarding electrical transformer burnouts.',
    evidenceSummary: 'Electricity board outage receipts and crop rotting insurance claims.',
    existingCoverage: '55% stable voltage supply',
    suggestedIntervention: 'Install dedicated 33/11kV agri-feeder substation with automatic voltage regulators.',
    recommendedProject: {
      title: 'Dindori Agri-Cold Chain Dedicated Electrical Substation',
      domain: 'Rural Electrical Distribution & Food Security',
      estimatedBudget: '₹5.5 Cr',
      feasibilityCaveat: 'AI-assisted project recommendation. Requires department feasibility review.'
    },
    governmentStatus: 'Needs Review',
    linkedProjectId: null,
    coordinates: { lat: 20.2000, lng: 73.8300, mapX: 38, mapY: 52 }
  },

  // 18. Karnataka (Dakshina Kannada)
  {
    id: 'hotspot-18',
    name: 'Mangaluru Coastal Erosion Defense & Fishing Jetty',
    state: 'Karnataka',
    stateId: 'KA',
    district: 'Dakshina Kannada',
    block: 'Ullal Coastal Ward',
    primaryCategory: 'Drainage & Flood Mitigation',
    secondaryCategory: 'Public Transport',
    requestCount: 810,
    affectedPopulation: '14,000 fishermen & families',
    affectedPopulationRaw: 14000,
    affectedServices: ['Coastal Fishermen Livelihood', 'Home Security', 'Storm Protection'],
    severity: 'High',
    priorityScore: 74,
    scoreBreakdown: {
      demandScore: 21,
      severityScore: 20,
      populationScore: 13,
      gapScore: 12,
      urgencyScore: 8,
      total: 74
    },
    infrastructureGap: 'Sea surge eroded 45 meters of shoreline, destroying 18 artisanal fishing boat landing ramps and endangering coastal homes.',
    aiReasoning: 'Kannada voice reports by fishermen cooperative describing boat destruction during high swells.',
    evidenceSummary: 'Coastal erosion photographic records and port authority survey notes.',
    existingCoverage: '30% seawall barrier',
    suggestedIntervention: 'Install geo-synthetic armor rock sea groynes and a concrete small-boat launch jetty.',
    recommendedProject: {
      title: 'Ullal Coastal Protection Rock Groyne & Fishing Jetty',
      domain: 'Marine Engineering & Coastal Resiliency',
      estimatedBudget: '₹9.8 Cr',
      feasibilityCaveat: 'AI-assisted project recommendation. Requires department feasibility review.'
    },
    governmentStatus: 'Under Department Assessment',
    linkedProjectId: null,
    coordinates: { lat: 12.8000, lng: 74.8500, mapX: 35, mapY: 75 }
  },

  // 19. Tamil Nadu (Madurai)
  {
    id: 'hotspot-19',
    name: 'Madurai Heritage Ring Urban Bus Shelter & Sanitation',
    state: 'Tamil Nadu',
    stateId: 'TN',
    district: 'Madurai District',
    block: 'Central City Ward',
    primaryCategory: 'Public Transport',
    secondaryCategory: 'Sanitation',
    requestCount: 780,
    affectedPopulation: '45,000 daily commuters',
    affectedPopulationRaw: 45000,
    affectedServices: ['Public Transit Comfort', 'Women Commuter Safety', 'Sanitation'],
    severity: 'Medium',
    priorityScore: 69,
    scoreBreakdown: {
      demandScore: 20,
      severityScore: 16,
      populationScore: 15,
      gapScore: 11,
      urgencyScore: 7,
      total: 69
    },
    infrastructureGap: 'Key multi-modal transit interchange has zero sheltered bus bays and no functional public toilets for women commuters.',
    aiReasoning: 'Tamil reports from women commuter groups highlighting heat exhaustion and safety concerns.',
    evidenceSummary: 'Photographs of crowds waiting under direct sun and municipal petitions.',
    existingCoverage: '15% modern transit shelter coverage',
    suggestedIntervention: 'Construct 6 solar-powered bus passenger shelters with digital route boards and accessible sanitation.',
    recommendedProject: {
      title: 'Madurai Central Ring Road Smart Bus Shelter Network',
      domain: 'Urban Transit Facilities & Public Amenities',
      estimatedBudget: '₹3.2 Cr',
      feasibilityCaveat: 'AI-assisted project recommendation. Requires department feasibility review.'
    },
    governmentStatus: 'Needs Review',
    linkedProjectId: null,
    coordinates: { lat: 9.9252, lng: 78.1198, mapX: 42, mapY: 85 }
  },

  // 20. Uttar Pradesh (Gautam Buddha Nagar)
  {
    id: 'hotspot-20',
    name: 'Greater Noida Rural Digital Connectivity & Fiber Gap',
    state: 'Uttar Pradesh',
    stateId: 'UP',
    district: 'Gautam Buddha Nagar',
    block: 'Jewar Rural Zone',
    primaryCategory: 'Internet / Digital Connectivity',
    secondaryCategory: 'Schools',
    requestCount: 750,
    affectedPopulation: '22,000 residents & students',
    affectedPopulationRaw: 22000,
    affectedServices: ['Digital Public Services', 'Online Schooling', 'Banking Access'],
    severity: 'Medium',
    priorityScore: 68,
    scoreBreakdown: {
      demandScore: 19,
      severityScore: 16,
      populationScore: 14,
      gapScore: 11,
      urgencyScore: 8,
      total: 68
    },
    infrastructureGap: 'Zero broadband fiber links across 8 villages; mobile network towers frequently blackout, halting DBT pensions and student admissions.',
    aiReasoning: 'Hindi submissions detailing failed ration card biometric verification and school online exam dropouts.',
    evidenceSummary: 'CSC kiosk downtime logs and student speed test submissions.',
    existingCoverage: '18% reliable 4G data coverage',
    suggestedIntervention: 'Deploy 24km underground BharatNet optical fiber loop with Wi-Fi hotspots at panchayat bhavans.',
    recommendedProject: {
      title: 'Jewar Rural Digital Public Infrastructure Fiber Ring',
      domain: 'Telecommunications & Digital Public Infrastructure',
      estimatedBudget: '₹4.1 Cr',
      feasibilityCaveat: 'AI-assisted project recommendation. Requires department feasibility review.'
    },
    governmentStatus: 'Needs Review',
    linkedProjectId: null,
    coordinates: { lat: 28.1300, lng: 77.5500, mapX: 50, mapY: 33 }
  },

  // 21. Gujarat (Vadodara)
  {
    id: 'hotspot-21',
    name: 'Vadodara Vishwamitri River Bank Inundation',
    state: 'Gujarat',
    stateId: 'GJ',
    district: 'Vadodara District',
    block: 'Sayajigunj Ward',
    primaryCategory: 'Drainage & Flood Mitigation',
    secondaryCategory: 'Healthcare',
    requestCount: 720,
    affectedPopulation: '38,000 residents',
    affectedPopulationRaw: 38000,
    affectedServices: ['Flood Defense', 'River Ecology', 'Urban Road Safety'],
    severity: 'Medium',
    priorityScore: 70,
    scoreBreakdown: {
      demandScore: 20,
      severityScore: 17,
      populationScore: 15,
      gapScore: 11,
      urgencyScore: 7,
      total: 70
    },
    infrastructureGap: 'River bank breaches during excess monsoon discharge from Ajwa reservoir, flooding low-lying housing societies with silt and urban debris.',
    aiReasoning: 'Gujarati citizen petitions regarding seasonal crocodile incursions and severe residential waterlogging.',
    evidenceSummary: 'Drone flood mapping photos and municipal disaster response records.',
    existingCoverage: '38% riverbank revetment',
    suggestedIntervention: 'Construct 2.8km reinforced retaining wall with automatic return-flow flap gates.',
    recommendedProject: {
      title: 'Vishwamitri Riverbank Reinforced Flood Wall & Embankment',
      domain: 'Riverine Flood Defense & Urban Protection',
      estimatedBudget: '₹14.8 Cr',
      feasibilityCaveat: 'AI-assisted project recommendation. Requires department feasibility review.'
    },
    governmentStatus: 'Project Proposed',
    linkedProjectId: null,
    coordinates: { lat: 22.3072, lng: 73.1812, mapX: 27, mapY: 49 }
  },

  // 22. West Bengal (Kolkata)
  {
    id: 'hotspot-22',
    name: 'Kolkata Central Gariahat Storm Drain Interceptor',
    state: 'West Bengal',
    stateId: 'WB',
    district: 'Kolkata District',
    block: 'Ward 85 / Gariahat',
    primaryCategory: 'Drainage & Flood Mitigation',
    secondaryCategory: 'Roads',
    requestCount: 690,
    affectedPopulation: '50,000 residents & shoppers',
    affectedPopulationRaw: 50000,
    affectedServices: ['Commercial Area Access', 'Tram Line Transit', 'Pedestrian Walkability'],
    severity: 'Medium',
    priorityScore: 67,
    scoreBreakdown: {
      demandScore: 19,
      severityScore: 16,
      populationScore: 15,
      gapScore: 10,
      urgencyScore: 7,
      total: 67
    },
    infrastructureGap: 'Severe urban street waterlogging disrupts major commercial intersection and tram routes after heavy monsoon showers.',
    aiReasoning: 'Bengali business owners and residents co-reporting stormwater blockage in heritage outfall pipes.',
    evidenceSummary: 'Merchant association photos of waterlogged storefronts and tram service suspension logs.',
    existingCoverage: '48% drainage efficiency benchmark',
    suggestedIntervention: 'Re-align 1.6km stormwater conduit and install high-rate silt interceptor pits.',
    recommendedProject: {
      title: 'Gariahat Commercial Hub Storm Drainage Re-engineering',
      domain: 'Urban Storm Drainage & Commercial Corridor Works',
      estimatedBudget: '₹4.5 Cr',
      feasibilityCaveat: 'AI-assisted project recommendation. Requires department feasibility review.'
    },
    governmentStatus: 'Needs Review',
    linkedProjectId: null,
    coordinates: { lat: 22.5186, lng: 88.3667, mapX: 74, mapY: 49 }
  },

  // 23. Bihar (Patna / Nalanda)
  {
    id: 'hotspot-23',
    name: 'Nalanda Rural River Embankment & Irrigation Sluice Deficit',
    title: 'Nalanda Regional River Embankment & High-Discharge Sluice Deficit',
    standardizedProblem: 'Riverine Flood Embankment Breaching & Agricultural Sluice Deficit',
    state: 'Bihar',
    stateId: 'BR',
    district: 'Nalanda District',
    locality: 'Bihar Sharif / Harnaut Sector',
    location: 'Harnaut Block, Nalanda District, Bihar',
    category: 'Drainage & Flood Mitigation',
    primaryCategory: 'Drainage & Flood Mitigation',
    secondaryCategory: 'Roads',
    reportCount: 31,
    requestCount: 1620,
    relatedRequests: 1620,
    affectedLocations: 28,
    affectedPopulation: 68000,
    affectedPopulationDisplay: '68,000 residents & farmers',
    affectedServices: ['Agricultural Flood Defense', 'Rural Highway Transit', 'School Access'],
    severity: 'High',
    priorityScore: 86,
    priorityLevel: 'Critical',
    aiPriorityRecommendation: 'CRITICAL',
    prioritySignal: 'High',
    trend: '+22%',
    citizenEvidenceCount: 84,
    languagesReported: ['Hindi', 'English'],
    infrastructureGap: 'Unreinforced earthen river embankment suffers seasonal breaches, submerging 4,200 acres of paddy and the primary state link road.',
    whySummary: 'High severity + 31 clustered reports + vital rural transit cutoff + annual monsoon agricultural destruction',
    whyReasons: [
      'High severity (Riverine flood embankment breach inundating 14 agricultural villages)',
      '31 related citizen submissions (1,620 verified community co-reports)',
      'State highway transit cut off for 3 weeks during peak monsoon',
      'High economic loss impacting 68,000 smallholder agrarian residents',
      'Supporting ground photos and flood depth telemetry available (84 records)'
    ],
    recommendedDomain: 'Water Resources Department (WRD Bihar) & Rural Works',
    recommendedAction: 'Construct 6.2km geotextile-reinforced boulder embankment and dual automated sluice regulator gates',
    suggestedIntervention: 'Reinforce 6.2km flood embankment with stone revetment and install 2 automated high-discharge sluice gates.',
    scoreBreakdown: {
      demandScore: 23,
      severityScore: 21,
      populationScore: 18,
      gapScore: 13,
      evidenceScore: 6,
      trendScore: 5,
      total: 86
    },
    languagesRepresented: [
      { language: 'Hindi', percentage: 88 },
      { language: 'English', percentage: 12 }
    ],
    demandTrend: [
      { month: 'Jan', requests: 45 },
      { month: 'Feb', requests: 90 },
      { month: 'Mar', requests: 160 },
      { month: 'Apr', requests: 310 },
      { month: 'May', requests: 680 },
      { month: 'Jun', requests: 1620 }
    ],
    communityEvidence: [
      {
        id: 'ev-023-1',
        title: 'Breached River Embankment & Submerged State Link Highway',
        category: 'Photo evidence',
        date: '2025-06-20',
        location: 'Harnaut Embankment Kilometer 14',
        privacyShieldStatus: 'Shielded (Faces & Plates Blurred)',
        verificationStatus: 'Verified by Community'
      }
    ],
    summary: 'Citizen reports document annual flood breaches along the unpaved river embankment, cutting off highway transit and school routes.',
    aiSummary: 'Normalized Hindi submissions confirm acute riverine flood vulnerability requiring structural boulder revetment and automated sluice controls.',
    recommendedProject: {
      title: 'Nalanda Regional River Embankment & High-Discharge Sluice Network',
      domain: 'River Hydrology & Flood Mitigation Engineering',
      estimatedBudget: '₹15.4 Cr',
      feasibilityCaveat: 'AI-assisted project recommendation. Requires department feasibility review.'
    },
    relatedProjects: [
      { id: 'pr-17', title: 'Nalanda Regional River Embankment & High-Discharge Sluice Network', status: 'In Progress' }
    ],
    governmentStatus: 'Action Underway',
    currentStatus: 'Action Underway',
    linkedProjectId: 'pr-17',
    coordinates: { lat: 25.09, lng: 85.31, mapX: 65, mapY: 38 }
  },

  // 24. Odisha (Puri)
  {
    id: 'hotspot-24',
    name: 'Puri Coastal Cyclone Evacuation Corridor & Saline Embankment',
    title: 'Puri Coastal All-Weather Cyclone Resilient Corridor & Saline Embankment',
    standardizedProblem: 'Cyclone Evacuation Route Degradation & Coastal Surge Deficit',
    state: 'Odisha',
    stateId: 'OD',
    district: 'Puri District',
    locality: 'Brahmagiri Coastal Sector',
    location: 'Brahmagiri Block, Puri District, Odisha',
    category: 'Roads',
    primaryCategory: 'Roads',
    secondaryCategory: 'Drainage & Flood Mitigation',
    reportCount: 29,
    requestCount: 1480,
    relatedRequests: 1480,
    affectedLocations: 22,
    affectedPopulation: 54000,
    affectedPopulationDisplay: '54,000 coastal residents',
    affectedServices: ['Disaster Evacuation Access', 'Ambulance Transit', 'Fisheries Logistics'],
    severity: 'Critical',
    priorityScore: 88,
    priorityLevel: 'Critical',
    aiPriorityRecommendation: 'CRITICAL',
    prioritySignal: 'Very High',
    trend: '+28%',
    citizenEvidenceCount: 96,
    languagesReported: ['Odia', 'English'],
    infrastructureGap: 'Eroded coastal evacuation road lacks storm shoulders and culverts, submerging under 3ft saltwater surge during tropical depressions.',
    whySummary: 'Critical severity + official cyclone shelter route cutoff + 29 clustered reports + life-safety hazard',
    whyReasons: [
      'Critical severity (Official cyclone shelter evacuation corridor impassable in cyclonic surges)',
      '29 related citizen submissions (1,480 community co-reports across 22 coastal hamlets)',
      'Ambulance and disaster response vehicles delayed 1+ hour',
      'Protecting 54,000 vulnerable coastal residents from storm surges',
      'Supporting drone surveys and ground damage photography available (96 items)'
    ],
    recommendedDomain: 'Works Department (Odisha) & OSDMA Disaster Infrastructure',
    recommendedAction: 'Elevate 5.4km coastal corridor by 1.2m with precast concrete culverts and saline-resistant bituminous armor',
    suggestedIntervention: 'Elevate 5.4km coastal highway with reinforced concrete box culverts and geo-textile embankment stabilization.',
    scoreBreakdown: {
      demandScore: 23,
      severityScore: 23,
      populationScore: 17,
      gapScore: 13,
      evidenceScore: 6,
      trendScore: 6,
      total: 88
    },
    languagesRepresented: [
      { language: 'Odia', percentage: 84 },
      { language: 'English', percentage: 16 }
    ],
    demandTrend: [
      { month: 'Jan', requests: 40 },
      { month: 'Feb', requests: 80 },
      { month: 'Mar', requests: 140 },
      { month: 'Apr', requests: 280 },
      { month: 'May', requests: 720 },
      { month: 'Jun', requests: 1480 }
    ],
    communityEvidence: [
      {
        id: 'ev-024-1',
        title: 'Saltwater Surge Overtopping Coastal Evacuation Highway',
        category: 'Photo evidence',
        date: '2025-05-30',
        location: 'Brahmagiri Coastal Sector Point 4',
        privacyShieldStatus: 'Shielded (Faces & Plates Blurred)',
        verificationStatus: 'Verified by Community'
      }
    ],
    summary: 'Citizen reports document critical vulnerabilities on the primary cyclone evacuation corridor during pre-monsoon storm surges.',
    aiSummary: 'Normalized Odia and English reports confirm urgent life-safety requirement to elevate coastal evacuation highway above spring surge levels.',
    recommendedProject: {
      title: 'Puri Coastal All-Weather Cyclone Resilient Corridor & Drainage',
      domain: 'Coastal Highway Engineering & Disaster Resiliency',
      estimatedBudget: '₹18.6 Cr',
      feasibilityCaveat: 'AI-assisted project recommendation. Requires department feasibility review.'
    },
    relatedProjects: [
      { id: 'pr-18', title: 'Puri Coastal All-Weather Cyclone Resilient Corridor & Drainage', status: 'In Progress' }
    ],
    governmentStatus: 'Action Underway',
    currentStatus: 'Action Underway',
    linkedProjectId: 'pr-18',
    coordinates: { lat: 20.95, lng: 85.09, mapX: 66, mapY: 56 }
  },

  // 25. Assam (Majuli / Kamrup)
  {
    id: 'hotspot-25',
    name: 'Brahmaputra Flood Embankment & Majuli River Island Transit Sump',
    title: 'Brahmaputra Basin Geo-Bag Embankment & Floating Jetty Resiliency',
    standardizedProblem: 'Brahmaputra River Island Erosion & Transit Cutoff',
    state: 'Assam',
    stateId: 'AS',
    district: 'Majuli District',
    locality: 'Kamalabari Ghat Transit Perimeter',
    location: 'Kamalabari Ghat, Majuli District, Assam',
    category: 'Drainage & Flood Mitigation',
    primaryCategory: 'Drainage & Flood Mitigation',
    secondaryCategory: 'Public Transport',
    reportCount: 35,
    requestCount: 1910,
    relatedRequests: 1910,
    affectedLocations: 32,
    affectedPopulation: 72000,
    affectedPopulationDisplay: '72,000 island residents',
    affectedServices: ['River Ferry Transit', 'Emergency Medical Transfer', 'Essential Goods Supply'],
    severity: 'Critical',
    priorityScore: 92,
    priorityLevel: 'Critical',
    aiPriorityRecommendation: 'CRITICAL',
    prioritySignal: 'Very High',
    trend: '+34%',
    citizenEvidenceCount: 112,
    languagesReported: ['Assamese', 'Hindi', 'English'],
    infrastructureGap: 'Severe riverbank erosion threatens Kamalabari ferry landing ghat, threatening to isolate the world largest inhabited river island.',
    whySummary: 'Critical severity + island transit lifeline cutoff + 35 clustered reports + accelerating riverbank erosion',
    whyReasons: [
      'Critical severity (Riverbank erosion cutting off primary lifeline ferry ghat for 72,000 residents)',
      '35 related citizen submissions (1,910 verified co-reports across island panchayats)',
      'Emergency medical transit to mainland hospital halted during high flood surges',
      'Accelerating riverbank collapse threatening municipal transit infrastructure',
      'High-resolution erosion photos and river stage telemetry available (112 items)'
    ],
    recommendedDomain: 'Assam Water Resources Department (AWRD) & Inland Waterways',
    recommendedAction: 'Deploy heavy geo-synthetic bags, porcupine screens, and modular floating all-weather jetty',
    suggestedIntervention: 'Install heavy geo-bag spurs, RCC porcupine deflectors, and all-weather articulated floating ferry ramps.',
    scoreBreakdown: {
      demandScore: 24,
      severityScore: 24,
      populationScore: 19,
      gapScore: 14,
      evidenceScore: 6,
      trendScore: 5,
      total: 92
    },
    languagesRepresented: [
      { language: 'Assamese', percentage: 78 },
      { language: 'Hindi', percentage: 14 },
      { language: 'English', percentage: 8 }
    ],
    demandTrend: [
      { month: 'Jan', requests: 50 },
      { month: 'Feb', requests: 110 },
      { month: 'Mar', requests: 220 },
      { month: 'Apr', requests: 460 },
      { month: 'May', requests: 980 },
      { month: 'Jun', requests: 1910 }
    ],
    communityEvidence: [
      {
        id: 'ev-025-1',
        title: 'Collapsing Kamalabari Ghat Riverbank & Stranded Ambulance',
        category: 'Photo evidence',
        date: '2025-06-18',
        location: 'Kamalabari Ghat Ramp 2',
        privacyShieldStatus: 'Shielded (Faces & Plates Blurred)',
        verificationStatus: 'Verified by Community'
      }
    ],
    summary: 'Citizen reports document critical riverbank collapse at Kamalabari Ghat, threatening daily ferry connectivity for Majuli river island.',
    aiSummary: 'Normalized Assamese and English submissions confirm urgent lifeline risk requiring geo-bag bank protection and reinforced floating jetty landing.',
    recommendedProject: {
      title: 'Brahmaputra Basin Geo-Bag Embankment & Floating Jetty Resiliency',
      domain: 'Riverine Erosion Defense & Inland Waterways',
      estimatedBudget: '₹21.5 Cr',
      feasibilityCaveat: 'AI-assisted project recommendation. Requires department feasibility review.'
    },
    relatedProjects: [
      { id: 'pr-19', title: 'Brahmaputra Basin Geo-Bag Embankment & Floating Jetty Resiliency', status: 'In Progress' }
    ],
    governmentStatus: 'Action Underway',
    currentStatus: 'Action Underway',
    linkedProjectId: 'pr-19',
    coordinates: { lat: 26.14, lng: 91.73, mapX: 84, mapY: 36 }
  }
];

// 52 REALISTIC MULTILINGUAL CITIZEN DEVELOPMENT REQUESTS
export const INITIAL_DEVELOPMENT_DEMANDS = [
  {
    id: 'need-101',
    title: 'Monsoon Overflow & School Route Inundation in Sector 4-B',
    description: 'During heavy rains our sector street overflows with 2.4 ft of water and backs up into primary school routes. Children cannot reach school and emergency vehicles cannot enter.',
    category: 'Drainage & Flood Mitigation',
    location: 'Pune District, Haveli Block (Maharashtra) — Sector 4-B',
    state: 'Maharashtra',
    district: 'Pune',
    block: 'Haveli Block',
    ward: 'Sector 4-B Ward',
    severity: 'Critical',
    affectedPopulation: 45000,
    affectedPopulationDisplay: '45,000 residents',
    dateSubmitted: '2024-11-12',
    submittedBy: 'Citizen #A7K29',
    supportCount: 2340,
    hasPhoto: true,
    photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
    audioDictated: true,
    languageSubmitted: 'Marathi',
    aiStructuring: {
      standardizedProblem: 'Severe Monsoon Hydrological Inundation & Educational Route Cutoff',
      problemType: 'Severe Monsoon Hydrological Inundation & Educational Route Cutoff',
      severityScore: 94,
      affectedPopulationEstimate: '42,000 - 48,000 residents',
      detectedLanguage: 'Marathi',
      evidenceAvailability: 'High (Geotagged ground photo & runoff survey)',
      simulatedConfidence: 96,
      categoryConfidence: 'Drainage & Flood Mitigation (99.2%)',
      civicSummary: 'Persistent seasonal street inundation creating an acute barrier for school children and emergency transit due to lack of subterranean drainage culverts.'
    },
    status: 'Aggregated into Hotspot',
    hotspotId: 'hotspot-01',
    linkedProjectId: 'pr-01'
  },
  {
    id: 'need-102',
    title: 'Severely Damaged Feeder Road to Taluk Hospital in Anekal',
    description: 'The primary 4.2 km arterial road connecting southern rural panchayat wards to the government taluk hospital has deep unpaved craters. Ambulances face 40+ minute delays during critical transfers.',
    category: 'Roads',
    location: 'Bengaluru Urban District, Anekal Taluk (Karnataka)',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    block: 'Anekal Taluk',
    ward: 'Ward 8 Link',
    severity: 'High',
    affectedPopulation: 62000,
    affectedPopulationDisplay: '62,000 residents',
    dateSubmitted: '2024-11-20',
    submittedBy: 'Citizen #K4M19',
    supportCount: 1820,
    hasPhoto: true,
    photoUrl: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
    audioDictated: false,
    languageSubmitted: 'Kannada',
    aiStructuring: {
      standardizedProblem: 'Arterial Transportation Bottleneck / Emergency Healthcare Route Compromise',
      problemType: 'Arterial Transportation Bottleneck / Emergency Healthcare Route Compromise',
      severityScore: 89,
      affectedPopulationEstimate: '60,000 - 65,000 residents',
      detectedLanguage: 'Kannada',
      evidenceAvailability: 'High (38 Co-reported photos from community health workers)',
      simulatedConfidence: 94,
      categoryConfidence: 'Roads (98.7%)',
      civicSummary: 'Arterial unpaved transit route with critical cratering obstructing patient access to regional hospital.'
    },
    status: 'Aggregated into Hotspot',
    hotspotId: 'hotspot-02',
    linkedProjectId: 'pr-02'
  },
  {
    id: 'need-103',
    title: 'Lack of Potable Piped Drinking Water & High Salinity in Tambaram',
    description: 'Community relies on intermittent private water tankers costing 18% of household income. Groundwater borewells show high salinity and chemical runoff.',
    category: 'Drinking Water',
    location: 'Chengalpattu District, Tambaram Municipality (Tamil Nadu)',
    state: 'Tamil Nadu',
    district: 'Chengalpattu',
    block: 'Tambaram Municipality',
    ward: 'Ward 14 Peri-Urban',
    severity: 'High',
    affectedPopulation: 38000,
    affectedPopulationDisplay: '38,000 residents',
    dateSubmitted: '2024-12-02',
    submittedBy: 'Citizen #D9R41',
    supportCount: 1650,
    hasPhoto: true,
    photoUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
    audioDictated: true,
    languageSubmitted: 'Tamil',
    aiStructuring: {
      standardizedProblem: 'Safe Drinking Water Access Deficit & High Tanker Dependency',
      problemType: 'Safe Drinking Water Access Deficit & High Tanker Dependency',
      severityScore: 86,
      affectedPopulationEstimate: '35,000 - 40,000 residents',
      detectedLanguage: 'Tamil',
      evidenceAvailability: 'Moderate (Water salinity test document submitted)',
      simulatedConfidence: 91,
      categoryConfidence: 'Drinking Water (99.0%)',
      civicSummary: 'Peri-urban hamlet with unpotable brackish groundwater and financial strain from private water tanker reliance.'
    },
    status: 'Aggregated into Hotspot',
    hotspotId: 'hotspot-03',
    linkedProjectId: 'pr-03'
  },
  {
    id: 'need-104',
    title: 'Heritage Market Alley Sewage & Stormwater Overflows',
    description: 'Narrow alleys near the central ghats flood with blackwater during cloudbursts. Pilgrim foot traffic is halted and merchants suffer structural shop damage.',
    category: 'Drainage & Flood Mitigation',
    location: 'Varanasi District, Kashi Urban Zone (Uttar Pradesh)',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    block: 'Kashi Urban Zone',
    ward: 'Ward 22 Heritage Core',
    severity: 'High',
    affectedPopulation: 52000,
    affectedPopulationDisplay: '52,000 residents & pilgrims',
    dateSubmitted: '2024-12-14',
    submittedBy: 'Citizen #W3T88',
    supportCount: 1540,
    hasPhoto: true,
    photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
    audioDictated: false,
    languageSubmitted: 'Hindi',
    aiStructuring: {
      standardizedProblem: 'Heritage Corridor Siltation & Stormwater Surcharge',
      problemType: 'Heritage Corridor Siltation & Stormwater Surcharge',
      severityScore: 84,
      affectedPopulationEstimate: '50,000+ citizens and visitors',
      detectedLanguage: 'Hindi',
      evidenceAvailability: 'High (Merchant association video logs)',
      simulatedConfidence: 93,
      categoryConfidence: 'Drainage & Flood Mitigation (98.4%)',
      civicSummary: 'Century-old brick drains collapsing under monsoon rain volume, inundating pedestrian alleys with contaminated overflow.'
    },
    status: 'Aggregated into Hotspot',
    hotspotId: 'hotspot-04',
    linkedProjectId: 'pr-04'
  },
  {
    id: 'need-105',
    title: 'Sluice Gate Siltation Causing 2-Week Suburban Inundation',
    description: 'The canal outfall near Bidhannagar has not been dredged. During pre-monsoon squalls the entire residential bus depot remains submerged under 1.5 ft water for 14 days.',
    category: 'Drainage & Flood Mitigation',
    location: 'North 24 Parganas District, Bidhannagar (West Bengal)',
    state: 'West Bengal',
    district: 'North 24 Parganas',
    block: 'Bidhannagar',
    ward: 'Ward 31',
    severity: 'High',
    affectedPopulation: 34000,
    affectedPopulationDisplay: '34,000 residents',
    dateSubmitted: '2024-12-28',
    submittedBy: 'Citizen #B9L22',
    supportCount: 1420,
    hasPhoto: true,
    photoUrl: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
    audioDictated: true,
    languageSubmitted: 'Bengali',
    aiStructuring: {
      standardizedProblem: 'Canal Siltation & Sluice Gate Outfall Bottleneck',
      problemType: 'Canal Siltation & Sluice Gate Outfall Bottleneck',
      severityScore: 82,
      affectedPopulationEstimate: '30,000 - 35,000 residents',
      detectedLanguage: 'Bengali',
      evidenceAvailability: 'Moderate (Community drone survey & photo)',
      simulatedConfidence: 90,
      categoryConfidence: 'Drainage & Flood Mitigation (97.8%)',
      civicSummary: 'Silted canal choke-point obstructing regional storm discharge and submerging local transit depots.'
    },
    status: 'Aggregated into Hotspot',
    hotspotId: 'hotspot-05',
    linkedProjectId: 'pr-05'
  },
  {
    id: 'need-106',
    title: 'Industrial Effluent Mixed in Open Residential Storm Conduits',
    description: 'Pandesara industrial units discharge dark chemical effluents into the municipal storm channel which backs up into housing ground floors during high rains.',
    category: 'Sanitation',
    location: 'Surat District, Pandesara Sector (Gujarat)',
    state: 'Gujarat',
    district: 'Surat',
    block: 'Pandesara',
    ward: 'Ward 12 Industrial Colony',
    severity: 'High',
    affectedPopulation: 41000,
    affectedPopulationDisplay: '41,000 residents',
    dateSubmitted: '2025-01-08',
    submittedBy: 'Citizen #G7N14',
    supportCount: 1310,
    hasPhoto: true,
    photoUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
    audioDictated: false,
    languageSubmitted: 'Gujarati',
    aiStructuring: {
      standardizedProblem: 'Toxic Chemical Runoff Intermixing with Stormwater Channels',
      problemType: 'Toxic Chemical Runoff Intermixing with Stormwater Channels',
      severityScore: 81,
      affectedPopulationEstimate: '40,000+ residents and industrial workers',
      detectedLanguage: 'Gujarati',
      evidenceAvailability: 'High (Photographic corrosion logs & water test)',
      simulatedConfidence: 92,
      categoryConfidence: 'Sanitation (98.9%)',
      civicSummary: 'Industrial waste mixing into open stormwater culverts causing immediate civic health and structural degradation risk.'
    },
    status: 'Aggregated into Hotspot',
    hotspotId: 'hotspot-06',
    linkedProjectId: 'pr-06'
  },
  {
    id: 'need-107',
    title: 'Girls Secondary School Structural & Extreme Heat Deficit in Amer',
    description: '480 enrolled girls study under uninsulated tin roofs in 43°C summer temperatures with no working toilets. Dropout rates in classes 8-10 have risen sharply.',
    category: 'Schools',
    location: 'Jaipur Rural District, Amer Block (Rajasthan)',
    state: 'Rajasthan',
    district: 'Jaipur Rural',
    block: 'Amer Block',
    ward: 'Gram Panchayat Amer Central',
    severity: 'High',
    affectedPopulation: 3800,
    affectedPopulationDisplay: '3,800 students & teachers',
    dateSubmitted: '2025-01-19',
    submittedBy: 'Citizen #R4P89',
    supportCount: 1180,
    hasPhoto: true,
    photoUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
    audioDictated: true,
    languageSubmitted: 'Hindi',
    aiStructuring: {
      standardizedProblem: 'Thermal Inadequacy & Female Sanitation Facility Deficit in Rural Secondary Education',
      problemType: 'Thermal Inadequacy & Female Sanitation Facility Deficit in Rural Secondary Education',
      severityScore: 79,
      affectedPopulationEstimate: '3,500 - 4,000 pupils and educators',
      detectedLanguage: 'Hindi',
      evidenceAvailability: 'High (School committee inspection photos)',
      simulatedConfidence: 91,
      categoryConfidence: 'Schools (99.0%)',
      civicSummary: 'Basic education structure lacks thermal insulation and functioning female hygiene blocks, impacting enrollment.'
    },
    status: 'Aggregated into Hotspot',
    hotspotId: 'hotspot-07',
    linkedProjectId: 'pr-07'
  },
  {
    id: 'need-108',
    title: 'Tidal Water Intrusions Contaminating Household Drinking Sump Tanks',
    description: 'High tides in Kochi backwaters push saltwater up the open drainage conduits twice daily, destroying freshwater storage tanks and eroding home foundations.',
    category: 'Drainage & Flood Mitigation',
    location: 'Ernakulam District, Kochi Municipal Corporation (Kerala)',
    state: 'Kerala',
    district: 'Ernakulam',
    block: 'Kochi Municipal Corp',
    ward: 'Ward 18 Coastal',
    severity: 'High',
    affectedPopulation: 48000,
    affectedPopulationDisplay: '48,000 residents',
    dateSubmitted: '2025-01-25',
    submittedBy: 'Citizen #M1C92',
    supportCount: 1750,
    hasPhoto: true,
    photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
    audioDictated: true,
    languageSubmitted: 'Malayalam',
    aiStructuring: {
      standardizedProblem: 'Saline Tidal Inundation & Freshwater Sump Contamination',
      problemType: 'Saline Tidal Inundation & Freshwater Sump Contamination',
      severityScore: 88,
      affectedPopulationEstimate: '45,000 - 50,000 coastal residents',
      detectedLanguage: 'Malayalam',
      evidenceAvailability: 'High (Tidal height logs and salinity recordings)',
      simulatedConfidence: 95,
      categoryConfidence: 'Drainage & Flood Mitigation (98.6%)',
      civicSummary: 'Tidal backwater surges flooding residential sumps and infrastructure due to absence of tidal control flap regulators.'
    },
    status: 'Aggregated into Hotspot',
    hotspotId: 'hotspot-08',
    linkedProjectId: 'pr-08'
  },
  {
    id: 'need-109',
    title: 'Arterial Highway Lacks Pedestrian Crossing for School Children in Wagle',
    description: 'School children and elder pedestrians must sprint across 8 lanes of Ghodbunder arterial traffic. 4 accidents recorded in 60 days near the transit junction.',
    category: 'Public Transport',
    location: 'Thane District, Wagle Estate (Maharashtra)',
    state: 'Maharashtra',
    district: 'Thane',
    block: 'Wagle Estate',
    ward: 'Ghodbunder Junction',
    severity: 'High',
    affectedPopulation: 58000,
    affectedPopulationDisplay: '58,000 daily commuters & pupils',
    dateSubmitted: '2025-02-01',
    submittedBy: 'Citizen #T5W44',
    supportCount: 1280,
    hasPhoto: false,
    photoUrl: null,
    audioDictated: false,
    languageSubmitted: 'Marathi',
    aiStructuring: {
      standardizedProblem: 'Highway Pedestrian Severance & Grade Separation Deficit',
      problemType: 'Highway Pedestrian Severance & Grade Separation Deficit',
      severityScore: 78,
      affectedPopulationEstimate: '55,000+ daily pedestrians',
      detectedLanguage: 'Marathi',
      evidenceAvailability: 'Moderate (Traffic police accident report citations)',
      simulatedConfidence: 89,
      categoryConfidence: 'Public Transport (96.5%)',
      civicSummary: 'High-speed 8-lane road bisects community residential and educational zones with zero safe pedestrian crossings.'
    },
    status: 'Aggregated into Hotspot',
    hotspotId: 'hotspot-09',
    linkedProjectId: 'pr-09'
  },
  {
    id: 'need-110',
    title: 'Frequent 10-Hour Blackouts Paralyzing PHC Vaccine Storage in Nanjangud',
    description: 'The Primary Health Centre generator has broken down. Cold chain fridges lose temperature during frequent power cuts, risking hepatitis and polio vaccine batches.',
    category: 'Healthcare',
    location: 'Mysuru District, Nanjangud Taluk (Karnataka)',
    state: 'Karnataka',
    district: 'Mysuru',
    block: 'Nanjangud Taluk',
    ward: 'PHC Sector Ward',
    severity: 'High',
    affectedPopulation: 28000,
    affectedPopulationDisplay: '28,000 rural residents',
    dateSubmitted: '2025-02-08',
    submittedBy: 'Citizen #N2K71',
    supportCount: 960,
    hasPhoto: true,
    photoUrl: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
    audioDictated: true,
    languageSubmitted: 'Kannada',
    aiStructuring: {
      standardizedProblem: 'Rural Medical Cold Chain Power Interruption Risk',
      problemType: 'Rural Medical Cold Chain Power Interruption Risk',
      severityScore: 77,
      affectedPopulationEstimate: '25,000 - 30,000 beneficiaries',
      detectedLanguage: 'Kannada',
      evidenceAvailability: 'High (PHC power log and temperature recording graphs)',
      simulatedConfidence: 93,
      categoryConfidence: 'Healthcare (98.2%)',
      civicSummary: 'Unreliable rural electricity grid endangering public healthcare deliveries and infant vaccination storage.'
    },
    status: 'Aggregated into Hotspot',
    hotspotId: 'hotspot-10',
    linkedProjectId: 'pr-10'
  }
];

// Additional 42 synthetic citizen requests mapped into the 22 hotspots to achieve 52+ total:
const ADDITIONAL_DEMANDS_SEEDED = [
  // Maharashtra
  { id: 'need-111', title: 'Road collapsed near primary school after cloudburst', hotspotId: 'hotspot-01', state: 'Maharashtra', category: 'Roads', severity: 'Critical', lang: 'Marathi', support: 890 },
  { id: 'need-112', title: 'Water remains 3 feet deep blocking ambulance entrance', hotspotId: 'hotspot-01', state: 'Maharashtra', category: 'Drainage & Flood Mitigation', severity: 'Critical', lang: 'English', support: 620 },
  { id: 'need-113', title: 'Grape cold storage transformer tripped again in harvest week', hotspotId: 'hotspot-17', state: 'Maharashtra', category: 'Electricity', severity: 'Medium', lang: 'Marathi', support: 410 },
  { id: 'need-114', title: 'Pedestrians injured crossing Ghodbunder highway at night', hotspotId: 'hotspot-09', state: 'Maharashtra', category: 'Public Transport', severity: 'High', lang: 'Hindi', support: 530 },
  { id: 'need-115', title: 'Drainage culvert clogged with construction debris in Ward 4', hotspotId: 'hotspot-01', state: 'Maharashtra', category: 'Drainage & Flood Mitigation', severity: 'High', lang: 'Marathi', support: 480 },
  
  // Karnataka
  { id: 'need-116', title: 'Unpaved road has 2-foot ruts during monsoon', hotspotId: 'hotspot-02', state: 'Karnataka', category: 'Roads', severity: 'High', lang: 'Kannada', support: 740 },
  { id: 'need-117', title: 'Students falling from cycles into mud ditches on link road', hotspotId: 'hotspot-02', state: 'Karnataka', category: 'Roads', severity: 'High', lang: 'Kannada', support: 580 },
  { id: 'need-118', title: 'Nanjangud PHC vaccine fridge was warm for 6 hours', hotspotId: 'hotspot-10', state: 'Karnataka', category: 'Healthcare', severity: 'High', lang: 'Kannada', support: 320 },
  { id: 'need-119', title: 'Ullal sea waves broke concrete boat ramp again', hotspotId: 'hotspot-18', state: 'Karnataka', category: 'Drainage & Flood Mitigation', severity: 'High', lang: 'Kannada', support: 490 },
  { id: 'need-120', title: 'High tide entering fishing village houses in Ullal', hotspotId: 'hotspot-18', state: 'Karnataka', category: 'Drainage & Flood Mitigation', severity: 'High', lang: 'English', support: 320 },

  // Tamil Nadu
  { id: 'need-121', title: 'Borewell water turned yellow and salty in hamlet 3', hotspotId: 'hotspot-03', state: 'Tamil Nadu', category: 'Drinking Water', severity: 'High', lang: 'Tamil', support: 610 },
  { id: 'need-122', title: 'Water tanker prices doubled to 1200 rupees per load', hotspotId: 'hotspot-03', state: 'Tamil Nadu', category: 'Drinking Water', severity: 'High', lang: 'Tamil', support: 490 },
  { id: 'need-123', title: 'Dyeing chemical runoff found in community pond', hotspotId: 'hotspot-11', state: 'Tamil Nadu', category: 'Drinking Water', severity: 'High', lang: 'Tamil', support: 440 },
  { id: 'need-124', title: 'Sulur agricultural borewells failing TDS standards', hotspotId: 'hotspot-11', state: 'Tamil Nadu', category: 'Drinking Water', severity: 'High', lang: 'Tamil', support: 380 },
  { id: 'need-125', title: 'Elderly commuters fainting waiting at unshaded bus stop', hotspotId: 'hotspot-19', state: 'Tamil Nadu', category: 'Public Transport', severity: 'Medium', lang: 'Tamil', support: 390 },

  // Uttar Pradesh
  { id: 'need-126', title: 'Kashi heritage alley sewer line backed up into courtyard', hotspotId: 'hotspot-04', state: 'Uttar Pradesh', category: 'Drainage & Flood Mitigation', severity: 'High', lang: 'Hindi', support: 620 },
  { id: 'need-127', title: 'Monsoon silt blocking temple approach road', hotspotId: 'hotspot-04', state: 'Uttar Pradesh', category: 'Drainage & Flood Mitigation', severity: 'High', lang: 'Hindi', support: 480 },
  { id: 'need-128', title: 'Mohanlalganj village school bus stuck in muddy rut', hotspotId: 'hotspot-12', state: 'Uttar Pradesh', category: 'Roads', severity: 'Medium', lang: 'Hindi', support: 410 },
  { id: 'need-129', title: 'Students miss board exams due to impassable village road', hotspotId: 'hotspot-12', state: 'Uttar Pradesh', category: 'Roads', severity: 'Medium', lang: 'Hindi', support: 380 },
  { id: 'need-130', title: 'Jewar panchayat computer center has no internet for 3 weeks', hotspotId: 'hotspot-20', state: 'Uttar Pradesh', category: 'Internet / Digital Connectivity', severity: 'Medium', lang: 'Hindi', support: 420 },

  // West Bengal
  { id: 'need-131', title: 'Bidhannagar bus terminus flooded for tenth straight day', hotspotId: 'hotspot-05', state: 'West Bengal', category: 'Drainage & Flood Mitigation', severity: 'High', lang: 'Bengali', support: 590 },
  { id: 'need-132', title: 'Sluice gate pump engine broken since last cyclone', hotspotId: 'hotspot-05', state: 'West Bengal', category: 'Drainage & Flood Mitigation', severity: 'High', lang: 'Bengali', support: 480 },
  { id: 'need-133', title: 'Howrah train subway flooded waist deep with water', hotspotId: 'hotspot-14', state: 'West Bengal', category: 'Drainage & Flood Mitigation', severity: 'Medium', lang: 'Bengali', support: 520 },
  { id: 'need-134', title: 'Bally commuter pedestrian passage blocked by stagnant sump', hotspotId: 'hotspot-14', state: 'West Bengal', category: 'Drainage & Flood Mitigation', severity: 'Medium', lang: 'English', support: 470 },
  { id: 'need-135', title: 'Gariahat shopping crossing submerged after 40 min rain', hotspotId: 'hotspot-22', state: 'West Bengal', category: 'Drainage & Flood Mitigation', severity: 'Medium', lang: 'Bengali', support: 410 },

  // Gujarat
  { id: 'need-136', title: 'Acidic chemical runoff corroding housing building pillars', hotspotId: 'hotspot-06', state: 'Gujarat', category: 'Sanitation', severity: 'High', lang: 'Gujarati', support: 680 },
  { id: 'need-137', title: 'Pandesara industrial canal choked with plastic and dye waste', hotspotId: 'hotspot-06', state: 'Gujarat', category: 'Sanitation', severity: 'High', lang: 'Gujarati', support: 510 },
  { id: 'need-138', title: 'Vatva open canal emitting toxic sulfur gas near school', hotspotId: 'hotspot-13', state: 'Gujarat', category: 'Sanitation', severity: 'Medium', lang: 'Gujarati', support: 460 },
  { id: 'need-139', title: 'Mosquito breeding in stagnant Vatva industrial channel', hotspotId: 'hotspot-13', state: 'Gujarat', category: 'Sanitation', severity: 'Medium', lang: 'Gujarati', support: 410 },
  { id: 'need-140', title: 'Vishwamitri river overflowed into ground floor apartments', hotspotId: 'hotspot-21', state: 'Gujarat', category: 'Drainage & Flood Mitigation', severity: 'Medium', lang: 'Gujarati', support: 480 },

  // Rajasthan
  { id: 'need-141', title: 'Amer school tin roof reaches 46 degrees in May', hotspotId: 'hotspot-07', state: 'Rajasthan', category: 'Schools', severity: 'High', lang: 'Hindi', support: 580 },
  { id: 'need-142', title: 'Girls dropping out due to broken school latrines in Amer', hotspotId: 'hotspot-07', state: 'Rajasthan', category: 'Schools', severity: 'High', lang: 'Hindi', support: 490 },
  { id: 'need-143', title: 'Mandore tanker did not arrive for 5 days in extreme heat', hotspotId: 'hotspot-15', state: 'Rajasthan', category: 'Drinking Water', severity: 'High', lang: 'Hindi', support: 530 },
  { id: 'need-144', title: 'Women walking 3km for brackish tubewell in Jodhpur hamlet', hotspotId: 'hotspot-15', state: 'Rajasthan', category: 'Drinking Water', severity: 'High', lang: 'Hindi', support: 390 },

  // Kerala
  { id: 'need-145', title: 'Saltwater entered drinking cistern in Ward 18 Kochi', hotspotId: 'hotspot-08', state: 'Kerala', category: 'Drainage & Flood Mitigation', severity: 'High', lang: 'Malayalam', support: 710 },
  { id: 'need-146', title: 'Canal bank crumbling into backwaters after high tide', hotspotId: 'hotspot-08', state: 'Kerala', category: 'Drainage & Flood Mitigation', severity: 'High', lang: 'Malayalam', support: 540 },
  { id: 'need-147', title: 'Bamboo footbridge washed away, children cannot cross river', hotspotId: 'hotspot-16', state: 'Kerala', category: 'Roads', severity: 'High', lang: 'Malayalam', support: 480 },
  { id: 'need-148', title: 'Patient carried on blanket across swollen mountain stream', hotspotId: 'hotspot-16', state: 'Kerala', category: 'Roads', severity: 'High', lang: 'Malayalam', support: 400 },

  // Additional Diversity
  { id: 'need-149', title: 'Jewar village students cannot register for scholarship online', hotspotId: 'hotspot-20', state: 'Uttar Pradesh', category: 'Internet / Digital Connectivity', severity: 'Medium', lang: 'Hindi', support: 330 },
  { id: 'need-150', title: 'Madurai bus bay floods ankle deep with water during drizzle', hotspotId: 'hotspot-19', state: 'Tamil Nadu', category: 'Public Transport', severity: 'Medium', lang: 'Tamil', support: 390 },
  { id: 'need-151', title: 'Dindori cold room shut down during night power voltage drop', hotspotId: 'hotspot-17', state: 'Maharashtra', category: 'Electricity', severity: 'Medium', lang: 'Marathi', support: 430 },
  { id: 'need-152', title: 'Sayajigunj retaining wall cracked from river pressure', hotspotId: 'hotspot-21', state: 'Gujarat', category: 'Drainage & Flood Mitigation', severity: 'Medium', lang: 'Gujarati', support: 340 }
];

// Append the seeded records to INITIAL_DEVELOPMENT_DEMANDS
ADDITIONAL_DEMANDS_SEEDED.forEach(item => {
  INITIAL_DEVELOPMENT_DEMANDS.push({
    id: item.id,
    title: item.title,
    description: `Citizen report submitted in ${item.lang}: ${item.title}. Urgent public works remediation required.`,
    category: item.category,
    location: `${item.state} — Associated with Demand Hotspot #${item.hotspotId}`,
    state: item.state,
    district: `${item.state} Regional Sector`,
    severity: item.severity,
    affectedPopulation: 25000,
    affectedPopulationDisplay: '25,000 residents',
    dateSubmitted: '2025-02-12',
    submittedBy: `Citizen #${item.id.toUpperCase()}`,
    supportCount: item.support,
    hasPhoto: true,
    photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
    audioDictated: true,
    languageSubmitted: item.lang,
    aiStructuring: {
      standardizedProblem: item.title,
      problemType: item.title,
      severityScore: item.severity === 'Critical' ? 92 : item.severity === 'High' ? 84 : 72,
      affectedPopulationEstimate: '20,000 - 30,000 residents',
      detectedLanguage: item.lang,
      evidenceAvailability: 'Moderate (Citizen ground report & photo)',
      simulatedConfidence: 91,
      categoryConfidence: `${item.category} (98%)`,
      civicSummary: `Citizen-reported deficiency in ${item.state} clustered into regional Demand Hotspot #${item.hotspotId}.`
    },
    status: 'Aggregated into Hotspot',
    hotspotId: item.hotspotId
  });
});

export const DEMAND_CATEGORY_STATS = [
  { category: 'Drainage & Flood Mitigation', requestCount: 8420, hotspotCount: 67, priorityTier: 'Critical', recentTrend: '+14% this month' },
  { category: 'Roads', requestCount: 6210, hotspotCount: 43, priorityTier: 'High', recentTrend: '+9% this month' },
  { category: 'Drinking Water', requestCount: 4190, hotspotCount: 38, priorityTier: 'Critical', recentTrend: '+11% this month' },
  { category: 'Schools', requestCount: 2840, hotspotCount: 29, priorityTier: 'Medium', recentTrend: '+6% this month' },
  { category: 'Public Transport', requestCount: 2110, hotspotCount: 22, priorityTier: 'High', recentTrend: '+8% this month' },
  { category: 'Healthcare', requestCount: 1980, hotspotCount: 18, priorityTier: 'High', recentTrend: '+5% this month' },
  { category: 'Sanitation', requestCount: 1820, hotspotCount: 17, priorityTier: 'High', recentTrend: '+7% this month' },
  { category: 'Electricity', requestCount: 1420, hotspotCount: 14, priorityTier: 'Medium', recentTrend: '+3% this month' },
  { category: 'Internet / Digital Connectivity', requestCount: 950, hotspotCount: 11, priorityTier: 'Medium', recentTrend: '+12% this month' }
];

export const REGIONAL_HOTSPOTS_BY_TIER = {
  highDemand: DEMAND_HOTSPOTS.filter(h => h.priorityScore >= 80),
  mediumDemand: DEMAND_HOTSPOTS.filter(h => h.priorityScore >= 70 && h.priorityScore < 80),
  lowDemand: DEMAND_HOTSPOTS.filter(h => h.priorityScore < 70)
};

export const PRIORITY_RECOMMENDATIONS = DEMAND_HOTSPOTS.slice(0, 5).map(h => ({
  id: `rec-${h.id}`,
  hotspotId: h.id,
  title: h.recommendedProject?.title || h.name,
  category: h.primaryCategory,
  priorityLevel: h.severity,
  priorityScore: h.priorityScore,
  status: h.governmentStatus,
  explanation: h.aiReasoning || h.infrastructureGap,
  affectedPopulation: h.affectedPopulation,
  estimatedBudget: h.recommendedProject?.estimatedBudget || '₹10.5 Cr',
  linkedProjectId: h.linkedProjectId || null,
  statusBadge: h.governmentStatus
}));



/**
 * Helper function to retrieve or compute the 6 deterministic priority factors for any hotspot
 */
export function getDeterministicPriorityBreakdown(hotspot = {}) {
  if (hotspot.deterministicFactors && hotspot.deterministicFactors.length > 0) {
    return {
      totalScore: hotspot.priorityScore || 80,
      factors: hotspot.deterministicFactors
    };
  }

  const score = hotspot.priorityScore || 75;
  const requests = hotspot.requestCount || 15;
  const evidence = hotspot.evidenceCount || hotspot.citizenEvidenceCount || 6;
  const sev = hotspot.severity || 'Medium';

  const demandScore = Math.min(98, Math.max(30, Math.round(score * 1.02)));
  const evidenceScore = Math.min(95, Math.max(25, Math.round(score * 0.96)));
  const severityScore = Math.min(98, Math.max(35, Math.round(score * 1.05)));
  const publicServiceScore = Math.min(95, Math.max(35, Math.round(score * 0.98)));
  const geoScore = Math.min(92, Math.max(40, Math.round(score * 0.92)));
  const recencyScore = Math.min(92, Math.max(40, Math.round(score * 0.90)));

  const c1 = Number((demandScore * 0.25).toFixed(1));
  const c2 = Number((evidenceScore * 0.20).toFixed(1));
  const c3 = Number((severityScore * 0.20).toFixed(1));
  const c4 = Number((publicServiceScore * 0.15).toFixed(1));
  const c5 = Number((geoScore * 0.10).toFixed(1));
  const c6 = Number((recencyScore * 0.10).toFixed(1));

  const factors = [
    { name: 'Citizen Demand', score: demandScore, weight: '25%', weightNum: 0.25, contribution: c1, desc: `${requests} citizen submissions & verified co-reports` },
    { name: 'Evidence Strength', score: evidenceScore, weight: '20%', weightNum: 0.20, contribution: c2, desc: `${evidence} ground photos processed through Privacy Shield` },
    { name: 'Severity', score: severityScore, weight: '20%', weightNum: 0.20, contribution: c3, desc: `${sev} severity impact on community mobility and safety` },
    { name: 'Public Service Impact', score: publicServiceScore, weight: '15%', weightNum: 0.15, contribution: c4, desc: 'Impaired essential municipal and connectivity services' },
    { name: 'Geographic Concentration', score: geoScore, weight: '10%', weightNum: 0.10, contribution: c5, desc: 'Clustered within localized neighborhood corridor radius' },
    { name: 'Recency', score: recencyScore, weight: '10%', weightNum: 0.10, contribution: c6, desc: 'Submissions actively recorded in recent reporting cycles' }
  ];

  return {
    totalScore: score,
    factors
  };
}
