// ANTICRO CR-1 — Step 7 Automated Unit & Verification Test
// Tests: Lifecycle State Transitions, Health Calculation, 5-Stage Tracker, Government Responses, Resolution

import { 
  calculateProjectHealth, 
  getProgressStages, 
  updateProjectStatus, 
  updateGovernmentResponse,
  LIFECYCLE_STATUSES 
} from '../src/services/projectLifecycleEngine.js';

import { INITIAL_PROJECTS } from '../src/data/mockProjects.js';

console.log('========================================================');
console.log('ANTICRO STEP 7 — ACCOUNTABILITY & LIFECYCLE ENGINE TEST');
console.log('========================================================\n');

// Test 1: Verify Initial Projects dataset has required Step 7 properties
console.log('--- TEST 1: Initial Projects Dataset ---');
const pr01 = INITIAL_PROJECTS.find(p => p.id === 'pr-01');
const pr08 = INITIAL_PROJECTS.find(p => p.id === 'pr-08');
const pr16 = INITIAL_PROJECTS.find(p => p.id === 'pr-16');

console.log(`PR-01 (${pr01.name}):`);
console.log(`  Status: ${pr01.status}`);
console.log(`  Completion: ${pr01.completionPercentage}%`);
console.log(`  Gov Response: ${pr01.governmentResponse ? pr01.governmentResponse.status : 'None'}`);
console.log(`  Timeline milestones: ${pr01.projectTimeline ? pr01.projectTimeline.length : 0}`);
console.log(`  Accountability Discrepancy: ${pr01.accountabilityComparison?.hasDiscrepancy}`);
console.log(`  Caveat: "${pr01.accountabilityComparison?.neutralCaveat}"\n`);

console.log(`PR-08 (${pr08.name}):`);
console.log(`  Status: ${pr08.status}`);
console.log(`  Completion: ${pr08.completionPercentage}%`);
console.log(`  Resolution Status: ${pr08.resolution ? pr08.resolution.status : 'None'}\n`);

console.log(`PR-16 (${pr16.name}):`);
console.log(`  Status: ${pr16.status}`);
console.log(`  Completion: ${pr16.completionPercentage}%`);
console.log(`  Resolution Date: ${pr16.resolution ? pr16.resolution.date : 'None'}`);
console.log(`  Outcome: "${pr16.resolution ? pr16.resolution.outcome : 'None'}"\n`);

if (!pr01.governmentResponse || !pr01.accountabilityComparison || !pr16.resolution) {
  throw new Error('TEST 1 FAILED: Missing Step 7 properties in mockProjects.js');
}
console.log('✓ TEST 1 PASSED\n');

// Test 2: Project Health Signal Calculation
console.log('--- TEST 2: Deterministic Project Health Signal ---');
const health01 = calculateProjectHealth(pr01);
console.log(`PR-01 Health: ${health01.label} (Reason: ${health01.reason})`);

const healthDelayed = calculateProjectHealth({
  status: 'Delayed',
  completionPercentage: 30
});
console.log(`Delayed Project Health: ${healthDelayed.label} (Reason: ${healthDelayed.reason})`);

const healthResolved = calculateProjectHealth(pr16);
console.log(`Resolved Project Health: ${healthResolved.label} (Reason: ${healthResolved.reason})`);

if (healthDelayed.label !== 'Delayed' || healthResolved.label !== 'On Track') {
  throw new Error('TEST 2 FAILED: Health calculation mismatch');
}
console.log('✓ TEST 2 PASSED\n');

// Test 3: 5-Stage Progress Tracker
console.log('--- TEST 3: 5-Stage Progress Stages ---');
const stages01 = getProgressStages(pr01);
console.log('PR-01 (In Progress, 64%):', stages01.map(s => `${s.label}:${s.status}`).join(' | '));

const stages08 = getProgressStages(pr08);
console.log('PR-08 (Under Verification, 88%):', stages08.map(s => `${s.label}:${s.status}`).join(' | '));

const stages16 = getProgressStages(pr16);
console.log('PR-16 (Resolved, 100%):', stages16.map(s => `${s.label}:${s.status}`).join(' | '));

const pr16AllCompleted = stages16.every(s => s.status === 'completed');
if (!pr16AllCompleted) {
  throw new Error('TEST 3 FAILED: Resolved project should have all stages completed');
}
console.log('✓ TEST 3 PASSED\n');

// Test 4: Lifecycle Status Transitions
console.log('--- TEST 4: Lifecycle State Transitions ---');
let testProjects = [...INITIAL_PROJECTS];

for (const nextStatus of LIFECYCLE_STATUSES) {
  testProjects = updateProjectStatus(testProjects, 'pr-01', nextStatus);
  const updated = testProjects.find(p => p.id === 'pr-01');
  console.log(`Transition to "${nextStatus}": status=${updated.status}, completion=${updated.completionPercentage}%, resolution=${updated.resolution?.status || 'none'}`);
  if (updated.status !== nextStatus) {
    throw new Error(`TEST 4 FAILED: Transition to ${nextStatus} did not persist`);
  }
}
console.log('✓ TEST 4 PASSED\n');

// Test 5: Government Response Updates
console.log('--- TEST 5: Government Response Updates ---');
testProjects = updateGovernmentResponse(testProjects, 'pr-01', {
  status: 'Work Completed',
  department: 'Maharashtra Public Works Department',
  statement: '1.8km arterial road elevation and box culvert pour certified 100% complete.',
  nextAction: 'Final joint walk-through with citizen ward delegates.'
});
const updatedResp = testProjects.find(p => p.id === 'pr-01');
console.log(`Updated Gov Response: status=${updatedResp.governmentResponse.status}`);
console.log(`Statement: "${updatedResp.governmentResponse.statement}"`);
console.log(`Next Action: "${updatedResp.governmentResponse.nextAction}"`);

if (updatedResp.governmentResponse.status !== 'Work Completed') {
  throw new Error('TEST 5 FAILED: Government response did not update');
}
console.log('✓ TEST 5 PASSED\n');

console.log('========================================================');
console.log('ALL STEP 7 UNIT TESTS PASSED SUCCESSFULLY!');
console.log('========================================================');
