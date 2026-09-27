import { calculatePriorityScore, applyGovernmentAction, GOV_WORKFLOW_STATUSES, GOV_DEPARTMENTS } from '../src/services/hotspotEngine.js';
import { DEMAND_HOTSPOTS } from '../src/data/mockDemandIntelligence.js';

console.log('====================================================');
console.log('ANTICRO STEP 6 — COMPREHENSIVE AUTOMATED VERIFICATION');
console.log('====================================================');

// 1. TEST CALCULATE PRIORITY SCORE
console.log('\n[TEST 1] Testing calculatePriorityScore() function structure & factors');
const sampleHotspot = DEMAND_HOTSPOTS[0];
const res = calculatePriorityScore(sampleHotspot);

console.log('Total Score:', res.totalScore);
console.log('Level:', res.level);
console.log('Factors:', res.factors);
console.log('Reasoning Bullets (Count):', res.reasoning.length);

if (typeof res.totalScore !== 'number' || res.totalScore < 0 || res.totalScore > 100) {
  console.error('FAIL: totalScore out of range!');
  process.exit(1);
}

const requiredFactors = ['citizenDemand', 'severity', 'affectedPopulation', 'infrastructureGap', 'evidenceStrength', 'recentTrend'];
for (const f of requiredFactors) {
  if (typeof res.factors[f] !== 'number' || res.factors[f] < 0 || res.factors[f] > 100) {
    console.error(`FAIL: Factor ${f} is missing or invalid!`);
    process.exit(1);
  }
}
console.log('PASS: All 6 required factors verified (0-100 normalized range)!');

// 2. TEST DYNAMIC RECALCULATION (Score must change when underlying data changes)
console.log('\n[TEST 2] Verifying score changes dynamically with underlying data');
const modifiedHotspot = {
  ...sampleHotspot,
  severity: 'Low',
  reportCount: 2,
  requestCount: 2,
  affectedPopulation: 100,
  affectedServices: ['Local Path'],
  citizenEvidenceCount: 0,
  trend: 'Isolated occurrence'
};
const modifiedRes = calculatePriorityScore(modifiedHotspot);
console.log(`Original score: ${res.totalScore} -> Low data score: ${modifiedRes.totalScore}`);
if (modifiedRes.totalScore >= res.totalScore) {
  console.error('FAIL: Score did not decrease when data severity/demand decreased!');
  process.exit(1);
}
console.log('PASS: Dynamic calculation verified (Score adjusts accurately based on hotspot attributes)!');

// 3. TEST NATURAL RANKING OF SCENARIOS A, B, C
console.log('\n[TEST 3] Testing natural ranking for Demo Scenarios A, B, C');
const scenarioA = DEMAND_HOTSPOTS.find(h => h.id === 'hotspot-001');
const scenarioB = DEMAND_HOTSPOTS.find(h => h.id === 'hotspot-015');
const scenarioC = DEMAND_HOTSPOTS.find(h => h.id === 'hotspot-099');

const scoreA = calculatePriorityScore(scenarioA);
const scoreB = calculatePriorityScore(scenarioB);
const scoreC = calculatePriorityScore(scenarioC);

console.log(`Scenario A (Road Flooding Near School): ${scoreA.totalScore} / 100 (${scoreA.level})`);
console.log(`Scenario B (Drinking Water Shortage):  ${scoreB.totalScore} / 100 (${scoreB.level})`);
console.log(`Scenario C (Minor Curb Issue):          ${scoreC.totalScore} / 100 (${scoreC.level})`);

if (scoreA.totalScore > scoreB.totalScore && scoreB.totalScore > scoreC.totalScore) {
  console.log('PASS: Natural ranking confirmed: Scenario A > Scenario B > Scenario C');
} else {
  console.error('FAIL: Natural ranking order incorrect!');
  process.exit(1);
}

// 4. TEST 7-STAGE GOVERNMENT REVIEW WORKFLOW
console.log('\n[TEST 4] Testing 7-Stage Government Review Workflow transitions');
let testHotspots = [...DEMAND_HOTSPOTS];
const targetId = 'hotspot-001';

for (const status of GOV_WORKFLOW_STATUSES) {
  testHotspots = applyGovernmentAction(testHotspots, targetId, { status });
  const curr = testHotspots.find(h => h.id === targetId);
  if (curr.status !== status) {
    console.error(`FAIL: Status transition to "${status}" failed!`);
    process.exit(1);
  }
}
console.log('PASS: All 7 workflow transitions verified:');
console.log('  ' + GOV_WORKFLOW_STATUSES.join(' -> '));

// 5. TEST DEPARTMENT ASSIGNMENT & PROJECT LINKING
console.log('\n[TEST 5] Testing Department Assignment & Project Linking');
testHotspots = applyGovernmentAction(testHotspots, targetId, {
  assignedDepartment: 'Drainage & Flood Management',
  linkedProjectId: 'pr-01',
  linkedProject: { id: 'pr-01', name: 'Riverside Stormwater Upgrade', budget: '₹14.2 Cr' }
});
const afterLink = testHotspots.find(h => h.id === targetId);
console.log('Assigned Department:', afterLink.assignedDepartment);
console.log('Linked Project ID:', afterLink.linkedProjectId);
console.log('Linked Project Name:', afterLink.linkedProject?.name);

if (afterLink.assignedDepartment !== 'Drainage & Flood Management' || afterLink.linkedProjectId !== 'pr-01') {
  console.error('FAIL: Department or project linking failed!');
  process.exit(1);
}
console.log('PASS: Department assignment and Project linking verified!');

console.log('\n====================================================');
console.log('ALL IN-MEMORY ENGINE & WORKFLOW TESTS PASSED CLEANLY');
console.log('====================================================');
