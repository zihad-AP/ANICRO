// scratch/test_step9_final_demo.js
// Automated verification suite for ANTICRO CR-1 Step 9 Final Demo

async function runStep9Verification() {
  console.log('=================================================================');
  console.log('ANTICRO CR-1 — STEP 9 FINAL DEMO VERIFICATION (LIVE GEMINI)');
  console.log('=================================================================');

  let passed = 0;
  let failed = 0;

  // 1. Health check
  console.log('\n[TEST 1] Checking /api/ai/status...');
  try {
    const statusRes = await fetch('http://localhost:5173/api/ai/status');
    const statusData = await statusRes.json();
    console.log('Status Response:', statusData);
    if (statusRes.ok && (statusData.geminiConfigured === true || statusData.configured === true)) {
      console.log('✓ PASS: Gemini API service is online and configured.');
      passed++;
    } else {
      console.error('✗ FAIL: Unexpected status response', statusData);
      failed++;
    }
  } catch (err) {
    console.error('✗ FAIL: Error checking status:', err.message);
    failed++;
  }

  // Helper for POST requests
  async function postAi(endpoint, payload) {
    const res = await fetch(`http://localhost:5173${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    return { ok: res.ok, status: res.status, data: json };
  }

  // 2. Canonical Scenario 1: Flooding & Drainage Collapse
  console.log('\n[TEST 2] Testing Scenario 1: Flooding & Drainage Collapse (East Tambaram, Chennai)...');
  try {
    const sc1 = await postAi('/api/ai/analyze-development-request', {
      text: "Severe waterlogging on Mudichur Road, East Tambaram after 2 hours of rainfall. Water is 3 feet deep, entering ground floor homes and hospital access road is completely cut off. Stormwater drain work was approved 2 years ago but abandoned midway.",
      location: "East Tambaram, Chennai, Tamil Nadu"
    });
    console.log('Scenario 1 Analysis Result:');
    console.log('  Category:', sc1.data?.data?.category);
    console.log('  Severity:', sc1.data?.data?.severity);
    console.log('  Urgency:', sc1.data?.data?.urgencyReason || sc1.data?.data?.urgency);
    console.log('  Affected Services:', sc1.data?.data?.affectedServices);
    console.log('  Summary:', sc1.data?.data?.civicSummary || sc1.data?.data?.summary);

    if (sc1.ok && sc1.data?.data?.category) {
      console.log('✓ PASS: Scenario 1 successfully parsed by Gemini.');
      passed++;
    } else {
      console.error('✗ FAIL: Scenario 1 parsing failed', sc1);
      failed++;
    }
  } catch (err) {
    console.error('✗ FAIL: Scenario 1 error:', err.message);
    failed++;
  }

  // 3. Canonical Scenario 2: Drinking Water Pipeline Contamination
  console.log('\n[TEST 3] Testing Scenario 2: Drinking Water Contamination (Ward 14, Varanasi)...');
  try {
    const sc2 = await postAi('/api/ai/analyze-development-request', {
      text: "Drinking water pipeline contaminated with sewage line leakage in Ward 14 near Kabir Nagar, Varanasi. Foul smelling black water coming from municipal taps for 10 days. 25 children reported severe gastroenteritis. Immediate pipeline replacement needed.",
      location: "Ward 14, Varanasi, Uttar Pradesh"
    });
    console.log('Scenario 2 Analysis Result:');
    console.log('  Category:', sc2.data?.data?.category);
    console.log('  Severity:', sc2.data?.data?.severity);
    console.log('  Urgency:', sc2.data?.data?.urgencyReason || sc2.data?.data?.urgency);
    console.log('  Affected Services:', sc2.data?.data?.affectedServices);
    console.log('  Summary:', sc2.data?.data?.civicSummary || sc2.data?.data?.summary);

    if (sc2.ok && sc2.data?.data?.category) {
      console.log('✓ PASS: Scenario 2 successfully parsed by Gemini.');
      passed++;
    } else {
      console.error('✗ FAIL: Scenario 2 parsing failed', sc2);
      failed++;
    }
  } catch (err) {
    console.error('✗ FAIL: Scenario 2 error:', err.message);
    failed++;
  }

  // 4. Canonical Scenario 3: Heavy Freight Road Craters
  console.log('\n[TEST 4] Testing Scenario 3: Heavy Freight Road Craters (Peenya, Bengaluru)...');
  try {
    const sc3 = await postAi('/api/ai/analyze-development-request', {
      text: "Severe craters and unpaved craters on Peenya 4th Phase Main Industrial Road, Bengaluru. Heavy container freight trucks getting stuck daily, causing 4 km traffic jams. Two motorcycle riders severely injured last week due to deep water-filled potholes.",
      location: "Peenya Industrial Area, Bengaluru, Karnataka"
    });
    console.log('Scenario 3 Analysis Result:');
    console.log('  Category:', sc3.data?.data?.category);
    console.log('  Severity:', sc3.data?.data?.severity);
    console.log('  Urgency:', sc3.data?.data?.urgencyReason || sc3.data?.data?.urgency);
    console.log('  Affected Services:', sc3.data?.data?.affectedServices);
    console.log('  Summary:', sc3.data?.data?.civicSummary || sc3.data?.data?.summary);

    if (sc3.ok && sc3.data?.data?.category) {
      console.log('✓ PASS: Scenario 3 successfully parsed by Gemini.');
      passed++;
    } else {
      console.error('✗ FAIL: Scenario 3 parsing failed', sc3);
      failed++;
    }
  } catch (err) {
    console.error('✗ FAIL: Scenario 3 error:', err.message);
    failed++;
  }

  // 5. Canonical Scenario 4: Hindi Voice Intake
  console.log('\n[TEST 5] Testing Scenario 4: Hindi Vernacular Voice Intake...');
  try {
    const sc4 = await postAi('/api/ai/analyze-development-request', {
      text: "कबीर नगर वार्ड 14 में पिछले दस दिनों से नलों में सीवर का गंदा काला बदबूदार पानी आ रहा है। मोहल्ले के 20 से ज्यादा बच्चे बीमार पड़ चुके हैं। तुरंत पानी की पाइपलाइन की मरम्मत कराई जाए।",
      location: "वाराणसी, उत्तर प्रदेश"
    });
    console.log('Scenario 4 (Hindi) Analysis Result:');
    console.log('  Category:', sc4.data?.data?.category);
    console.log('  Severity:', sc4.data?.data?.severity);
    console.log('  Language Detected:', sc4.data?.data?.detectedLanguage);
    console.log('  Summary:', sc4.data?.data?.civicSummary || sc4.data?.data?.summary);

    if (sc4.ok && sc4.data?.data?.category) {
      console.log('✓ PASS: Hindi intake successfully parsed by Gemini with civic categorization.');
      passed++;
    } else {
      console.error('✗ FAIL: Hindi parsing failed', sc4);
      failed++;
    }
  } catch (err) {
    console.error('✗ FAIL: Scenario 4 error:', err.message);
    failed++;
  }

  // 6. Gemini Priority Executive Synthesis
  console.log('\n[TEST 6] Testing Gemini Priority Executive Synthesis (/api/ai/analyze-priority)...');
  try {
    const prioRes = await postAi('/api/ai/analyze-priority', {
      title: "Tambaram-Mudichur Drainage Corridor Failure",
      location: "East Tambaram, Chennai, Tamil Nadu",
      category: "Drainage & Flood Mitigation",
      reportCount: 37,
      severity: "Critical",
      affectedPopulation: "12,600 residents",
      infrastructureGap: "Stormwater culvert capacity deficit under GST Road",
      affectedServices: ["Ambulance & Hospital Access", "Primary School Mobility"]
    });
    console.log('Priority Synthesis Result:');
    console.log('  Recommended Intervention:', prioRes.data?.data?.recommendedIntervention || prioRes.data?.data?.recommendedAction);
    console.log('  Priority Rationale:', prioRes.data?.data?.priorityRationale);

    if (prioRes.ok && (prioRes.data?.data?.priorityRationale || prioRes.data?.data?.recommendedIntervention)) {
      console.log('✓ PASS: Gemini Priority Executive Synthesis returned actionable rationale.');
      passed++;
    } else {
      console.error('✗ FAIL: Priority synthesis failed', prioRes);
      failed++;
    }
  } catch (err) {
    console.error('✗ FAIL: Priority synthesis error:', err.message);
    failed++;
  }

  console.log('\n=================================================================');
  console.log(`VERIFICATION SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('=================================================================');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runStep9Verification();
