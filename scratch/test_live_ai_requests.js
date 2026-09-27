async function testLiveFlow() {
  console.log('--- TEST A: Road flooding near school ---');
  const res1 = await fetch('http://localhost:5173/api/ai/analyze-development-request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: 'Every monsoon the road near the government school becomes flooded and children cannot safely reach school.',
      location: 'Ward 42, Bengaluru Urban, Karnataka',
      category: 'Drainage & Flood Mitigation'
    })
  });
  const data1 = await res1.json();
  console.log('Result 1 (Road Flooding):');
  console.log('  Success:', data1.success);
  console.log('  Category:', data1.data?.category);
  console.log('  Severity:', data1.data?.severity);
  console.log('  Problem:', data1.data?.standardizedProblem);
  console.log('  Affected Services:', data1.data?.affectedServices);
  console.log('  Language:', data1.data?.detectedLanguage);

  console.log('\n--- TEST B: Drinking water shortage ---');
  const res2 = await fetch('http://localhost:5173/api/ai/analyze-development-request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: 'Our village does not have reliable drinking water and families walk several kilometres to collect water.',
      location: 'Mandore Block, Jodhpur, Rajasthan',
      category: 'Drinking Water'
    })
  });
  const data2 = await res2.json();
  console.log('Result 2 (Drinking Water):');
  console.log('  Success:', data2.success);
  console.log('  Category:', data2.data?.category);
  console.log('  Severity:', data2.data?.severity);
  console.log('  Problem:', data2.data?.standardizedProblem);
  console.log('  Affected Services:', data2.data?.affectedServices);
  console.log('  Language:', data2.data?.detectedLanguage);

  console.log('\n--- TEST C: Multilingual Hindi Request ---');
  const res3 = await fetch('http://localhost:5173/api/ai/analyze-development-request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: 'भारी बारिश के दौरान हमारे क्षेत्र की मुख्य सड़क पर 2 फीट पानी भर जाता है। स्कूल जाने वाले बच्चों और एम्बुलेंस का रास्ता 2 हफ़्ते से बंद है।',
      location: 'Ward 42, HSR Feeder, Bengaluru',
      category: 'Drainage & Flood Mitigation'
    })
  });
  const data3 = await res3.json();
  console.log('Result 3 (Hindi Road/Drainage):');
  console.log('  Success:', data3.success);
  console.log('  Category:', data3.data?.category);
  console.log('  Severity:', data3.data?.severity);
  console.log('  Problem:', data3.data?.standardizedProblem);
  console.log('  Language Detected:', data3.data?.detectedLanguage);
  console.log('  Civic Summary (in English):', data3.data?.civicSummary);

  console.log('\n--- TEST D: Priority Rationale Endpoint (/api/ai/analyze-priority) ---');
  const res4 = await fetch('http://localhost:5173/api/ai/analyze-priority', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'Seasonal Road Inundation & Drainage Deficit',
      location: 'Ward 42, Bengaluru Urban, Karnataka',
      category: 'Drainage & Flood Mitigation',
      reportCount: 37,
      severity: 'High',
      affectedPopulation: '12,600 residents',
      affectedServices: ['School Access', 'Pedestrian Transit', 'Emergency Vehicles']
    })
  });
  const data4 = await res4.json();
  console.log('Result 4 (Gemini Executive Synthesis):');
  console.log('  Success:', data4.success);
  console.log('  Priority Rationale:', data4.data?.priorityRationale);
  console.log('  Recommended Intervention:', data4.data?.recommendedIntervention);
  console.log('  Confidence:', data4.data?.confidence);
}

testLiveFlow().catch(console.error);
