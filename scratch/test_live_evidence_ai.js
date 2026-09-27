// ANTICRO CR-1 — Live Test for AI Evidence Assistance Endpoint
// Tests POST /api/ai/analyze-evidence against running Vite server

const SERVER_URL = 'http://localhost:5173';

async function runTest() {
  console.log('Testing live server endpoint: POST /api/ai/analyze-evidence...\n');

  // Test 1: Ground photo showing standing water vs 64% completion
  const payload1 = {
    evidenceText: "High-resolution perimeter survey photo showing Box Culvert Section #2 still has exposed grade-60 rebar mesh without concrete foundation poured, and 1.5 feet of standing water across the junction.",
    category: "Observation",
    evidenceType: "Photo",
    projectDetails: {
      name: "Riverside Stormwater & Access Corridor Upgrade",
      completionPercentage: 64,
      status: "In Progress",
      department: "Maharashtra Public Works & Pune Municipal Corporation",
      location: "Pune District, Sector 4-B"
    }
  };

  console.log('--- TEST 1: Discrepancy Evidence Item ---');
  const res1 = await fetch(`${SERVER_URL}/api/ai/analyze-evidence`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload1)
  });

  const data1 = await res1.json();
  console.log('Status:', res1.status);
  console.log('Success:', data1.success);
  console.log('Suggested Category:', data1.data?.suggestedCategory);
  console.log('Evidence Type:', data1.data?.evidenceType);
  console.log('Project Relevance:', data1.data?.projectRelevance);
  console.log('Potential Discrepancy:', data1.data?.potentialDiscrepancy);
  console.log('Discrepancy Note:', data1.data?.discrepancyNote);
  console.log('Neutral Caveat:', `"${data1.data?.neutralCaveat}"`);
  console.log('Consistency Check:', data1.data?.consistencyCheck);
  console.log('Model Used:', data1.data?.modelUsed);
  console.log('Human Review Required:', data1.data?.humanReviewRequired);

  if (!data1.success || !data1.data?.neutralCaveat) {
    throw new Error('TEST 1 FAILED');
  }

  // Verify exact Rule #13 string
  if (data1.data?.potentialDiscrepancy && !data1.data.neutralCaveat.includes('This is a potential discrepancy for human review, not a finding of wrongdoing.')) {
    throw new Error('TEST 1 FAILED: Rule #13 Discrepancy Caveat string mismatch');
  }
  console.log('✓ TEST 1 PASSED\n');

  // Test 2: Conforming evidence item
  const payload2 = {
    evidenceText: "Ground photograph showing completed 60m suspension bridge with installed handrails, solar illumination, and active pedestrian transit by village students.",
    category: "Fact",
    evidenceType: "Photo",
    projectDetails: {
      name: "Thamarassery Ghat All-Weather Steel Suspension Bridge",
      completionPercentage: 100,
      status: "Resolved",
      department: "Kerala PWD & Tribal Welfare Department",
      location: "Kozhikode District, Thamarassery Ghats"
    }
  };

  console.log('--- TEST 2: Conforming Verified Evidence Item ---');
  const res2 = await fetch(`${SERVER_URL}/api/ai/analyze-evidence`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload2)
  });

  const data2 = await res2.json();
  console.log('Status:', res2.status);
  console.log('Success:', data2.success);
  console.log('Potential Discrepancy:', data2.data?.potentialDiscrepancy);
  console.log('Neutral Caveat:', `"${data2.data?.neutralCaveat}"`);
  console.log('Model Used:', data2.data?.modelUsed);

  if (!data2.success) {
    throw new Error('TEST 2 FAILED');
  }
  console.log('✓ TEST 2 PASSED\n');

  console.log('========================================================');
  console.log('ALL LIVE EVIDENCE AI TESTS PASSED SUCCESSFULLY!');
  console.log('========================================================');
}

runTest().catch(err => {
  console.error('Test Failed:', err);
  process.exit(1);
});
