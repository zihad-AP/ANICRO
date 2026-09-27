import React, { useState } from 'react';
import { 
  Shield, 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  CheckCircle2, 
  X, 
  Sparkles, 
  Loader2, 
  ArrowRight, 
  Info, 
  CheckCircle, 
  Scan, 
  GitMerge, 
  FolderPlus 
} from 'lucide-react';
import { privacyScanService } from '../services/privacyScanService';
import { aiMatchingService } from '../services/aiMatchingService';

const STEP_UPLOAD = 1;
const STEP_SCANNING = 2;
const STEP_REVIEW = 3;
const STEP_CONFIRMED_READY = 4;

export default function PrivacyShieldModal({ 
  isOpen, 
  onClose, 
  preselectedProjectId, 
  projects, 
  onEvidenceSubmitted 
}) {
  const [step, setStep] = useState(STEP_UPLOAD);
  const [projectId, setProjectId] = useState(preselectedProjectId || (projects[0] ? projects[0].id : ''));
  const [category, setCategory] = useState('Observation');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const [stagedEvidence, setStagedEvidence] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [userConfirmedUseProtectedImage, setUserConfirmedUseProtectedImage] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [selectedImageUrl] = useState(
    'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80'
  );

  if (!isOpen) return null;

  const targetProject = projects.find(p => p.id === (projectId || preselectedProjectId)) || projects[0];

  // 1. Submit Form & Start Privacy Scan
  const handleStartScan = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setStep(STEP_SCANNING);
    setIsProcessing(true);

    const initialStaged = {
      id: `ev-${Date.now().toString().slice(-4)}`,
      projectId: targetProject ? targetProject.id : 'pr-01',
      category: category,
      title: title,
      description: description,
      submittedBy: "Citizen #A7K29",
      date: new Date().toISOString().split('T')[0],
      originalFileUrl: selectedImageUrl,
      imageUrl: selectedImageUrl,
      privacyReviewed: false,
      detectedPrivacyItems: [],
      aiAnalysis: null
    };
    setStagedEvidence(initialStaged);

    try {
      const scanData = await privacyScanService.runPrivacyScan({
        originalFileUrl: selectedImageUrl,
        projectId: targetProject ? targetProject.id : 'pr-01',
        category: category
      });

      setScanResult(scanData);
      setStagedEvidence(prev => ({
        ...prev,
        detectedPrivacyItems: scanData.redactionSummary,
        privacyReviewed: false
      }));

      setStep(STEP_REVIEW);
    } catch (err) {
      console.warn('Privacy scan error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  // 2. Explicit "Use Protected Image" Confirmation -> Run AI Case Matching (Requirements 1-7)
  const handleConfirmAndPublish = async () => {
    if (!userConfirmedUseProtectedImage || !stagedEvidence) return;

    setIsProcessing(true);
    setStep(STEP_CONFIRMED_READY);

    try {
      const matchResult = await aiMatchingService.matchEvidenceToCases({
        newEvidence: stagedEvidence,
        project: targetProject
      });

      setAiResult(matchResult);

      const finalVerifiedEvidence = {
        ...stagedEvidence,
        privacyReviewed: true,
        privacyShieldVerified: true,
        imageUrl: scanResult.protectedImageUrl,
        detectedPrivacyItems: scanResult.redactionSummary,
        caseId: matchResult.matchedCaseId,
        caseNumber: matchResult.matchedCaseNumber,
        caseTitle: matchResult.matchedCaseTitle,
        isNewCase: matchResult.isNewCase,
        aiAnalysis: {
          summary: matchResult.summary,
          duplicateStatus: matchResult.duplicateStatus,
          potentialDiscrepancy: matchResult.potentialDiscrepancy,
          neutralCaveat: matchResult.neutralCaveat,
          matchedCaseId: matchResult.matchedCaseId,
          matchedCaseNumber: matchResult.matchedCaseNumber
        },
        engineerAssessment: null,
        govResponse: {
          department: targetProject ? targetProject.department : "Public Works Agency",
          status: "Awaiting Response",
          responseDate: null,
          statement: null
        }
      };

      onEvidenceSubmitted(targetProject.id, finalVerifiedEvidence, matchResult);
    } catch (err) {
      console.warn('AI matching error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetAndClose = () => {
    setStep(STEP_UPLOAD);
    setTitle('');
    setDescription('');
    setStagedEvidence(null);
    setScanResult(null);
    setUserConfirmedUseProtectedImage(false);
    setAiResult(null);
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-xl max-w-xl w-full shadow-card border border-slate-200 overflow-hidden relative">
        
        {/* Header Strip */}
        <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-xs text-slate-900">
                Privacy Shield Evidence Submission
              </h3>
              <p className="text-[11px] text-slate-500">
                Original media vaulted; protected preview confirmed before publishing (Rule #11)
              </p>
            </div>
          </div>
          <button 
            onClick={handleResetAndClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* State Progression Tracker */}
        <div className="bg-slate-50/70 border-b border-slate-200 px-5 py-2.5 flex items-center justify-between text-[11px]">
          <div className={`flex items-center gap-1.5 ${step >= STEP_UPLOAD ? 'text-teal-800 font-semibold' : 'text-slate-400 font-normal'}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-mono ${step >= STEP_UPLOAD ? 'bg-teal-700 text-white' : 'bg-slate-200'}`}>1</span>
            <span>Upload</span>
          </div>
          <div className="w-4 h-px bg-slate-200" />
          <div className={`flex items-center gap-1.5 ${step >= STEP_SCANNING ? 'text-teal-800 font-semibold' : 'text-slate-400 font-normal'}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-mono ${step >= STEP_SCANNING ? 'bg-teal-700 text-white' : 'bg-slate-200'}`}>2</span>
            <span>Scan</span>
          </div>
          <div className="w-4 h-px bg-slate-200" />
          <div className={`flex items-center gap-1.5 ${step >= STEP_REVIEW ? 'text-teal-800 font-semibold' : 'text-slate-400 font-normal'}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-mono ${step >= STEP_REVIEW ? 'bg-teal-700 text-white' : 'bg-slate-200'}`}>3</span>
            <span>Review</span>
          </div>
          <div className="w-4 h-px bg-slate-200" />
          <div className={`flex items-center gap-1.5 ${step >= STEP_CONFIRMED_READY ? 'text-teal-800 font-semibold' : 'text-slate-400 font-normal'}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-mono ${step >= STEP_CONFIRMED_READY ? 'bg-teal-700 text-white' : 'bg-slate-200'}`}>4</span>
            <span>Match</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5">
          
          {/* STEP 1: Upload & Form */}
          {step === STEP_UPLOAD && (
            <form onSubmit={handleStartScan} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Target Public Project
                </label>
                <select
                  value={projectId || targetProject.id}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-800 focus:ring-1 focus:ring-teal-700 focus:bg-white focus:outline-none cursor-pointer"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.department})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Evidence Category (Rule #10)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'Fact', label: 'Fact', desc: 'Official drawings, tenders, bills', color: 'border-blue-200 bg-blue-50/70 text-blue-900' },
                    { id: 'Observation', label: 'Observation', desc: 'Ground photos, physical state', color: 'border-amber-200 bg-amber-50/70 text-amber-900' },
                    { id: 'Allegation', label: 'Allegation', desc: 'Community inquiry, claim', color: 'border-rose-200 bg-rose-50/70 text-rose-900' }
                  ].map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                        category === cat.id 
                          ? `${cat.color} ring-1 ring-teal-700 font-semibold shadow-2xs` 
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
                      }`}
                    >
                      <div className="text-xs font-semibold">{cat.label}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">{cat.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Evidence Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Photographic observation of clarifier rebar foundation"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-800 focus:ring-1 focus:ring-teal-700 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Observations & Context
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Describe location, milestone component, or visible discrepancies..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-teal-700 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Staged Media Asset
                </label>
                <div className="flex items-center space-x-3 p-2.5 bg-slate-50 border border-dashed border-slate-200 rounded-lg">
                  <img
                    src={selectedImageUrl}
                    alt="Preview"
                    className="w-14 h-14 object-cover rounded border border-slate-200 shrink-0"
                  />
                  <div className="flex-1 text-xs">
                    <span className="font-semibold text-slate-800 block text-[11px]">field_observation_photo.jpg</span>
                    <span className="text-[10px] text-slate-500 block">3.4 MB • GPS & face tags present</span>
                    <span className="text-[10px] text-teal-800 font-medium flex items-center gap-1 mt-0.5">
                      <ShieldCheck className="w-3 h-3 text-teal-700" />
                      Ready for Privacy Shield scan
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                  <Lock className="w-3.5 h-3.5 text-teal-700" />
                  <span>Pseudonym: <strong>Citizen #A7K29</strong></span>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center space-x-1.5 bg-teal-700 hover:bg-teal-800 text-white font-medium px-4 py-2 rounded-lg text-xs shadow-xs transition-colors cursor-pointer"
                >
                  <span>Run Privacy Scan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Scanning State */}
          {step === STEP_SCANNING && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
                <Scan className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-semibold text-slate-900 text-sm">Running ANTICRO Privacy Shield Scan...</h4>
                <p className="text-xs text-slate-500 max-w-sm">
                  Detecting facial biometrics, vehicle license plates, and EXIF coordinates.
                </p>
              </div>
              <div className="flex gap-2 text-[10px] font-mono text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                <span>[SCANNING_FACES]</span>
                <span>•</span>
                <span>[PLATE_OCR]</span>
                <span>•</span>
                <span>[EXIF_SANITIZER]</span>
              </div>
            </div>
          )}

          {/* STEP 3: Review Protected Image & Explicit Confirmation Gate */}
          {step === STEP_REVIEW && scanResult && (
            <div className="space-y-3.5">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-slate-900 text-xs">
                      Privacy Shield Scan: {scanResult.itemCount} Items Redacted
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 pt-0.5">
                    {scanResult.detectedItems.map((det) => (
                      <div key={det.id} className="p-1.5 bg-white rounded border border-slate-200 text-[10px] text-slate-700">
                        <span className="font-medium block">{det.label}</span>
                        <span className="text-[9px] text-slate-500 block">{det.redactionApplied}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="border border-slate-200 rounded-lg p-2.5 bg-slate-50 text-center space-y-1.5">
                  <span className="text-[10px] uppercase font-semibold text-slate-500 block">
                    Original File (Private Vault)
                  </span>
                  <div className="relative rounded overflow-hidden h-32 bg-slate-950">
                    <img src={selectedImageUrl} alt="Raw" className="w-full h-full object-cover opacity-40" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-[11px] font-medium gap-1 p-2 text-center">
                      <Lock className="w-4 h-4 text-amber-400" />
                      <span>Encrypted Vault</span>
                      <span className="text-[9px] text-slate-300 font-mono">Never returned</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 block">privacy_reviewed = false</span>
                </div>

                <div className="border border-teal-600 rounded-lg p-2.5 bg-teal-50/30 text-center space-y-1.5">
                  <span className="text-[10px] uppercase font-semibold text-teal-800 block flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-teal-700" />
                    Protected Image Preview
                  </span>
                  <div className="relative rounded overflow-hidden h-32 bg-slate-900">
                    <img src={selectedImageUrl} alt="Protected" className="w-full h-full object-cover filter blur-[0.4px]" />
                    <div className="absolute top-4 left-6 w-9 h-9 bg-white/70 backdrop-blur-xs rounded-full border border-teal-500 flex items-center justify-center">
                      <EyeOff className="w-3.5 h-3.5 text-teal-900" />
                    </div>
                    <div className="absolute bottom-5 left-10 w-16 h-4 bg-slate-950 border border-slate-700 rounded flex items-center justify-center">
                      <span className="text-[7px] font-mono text-slate-300 font-bold tracking-wider">[REDACTED]</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-teal-800 font-semibold block">Public Safe Asset</span>
                </div>
              </div>

              {/* Requirement #8: Explicit "Use Protected Image" Confirmation */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userConfirmedUseProtectedImage}
                    onChange={(e) => setUserConfirmedUseProtectedImage(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-teal-700 focus:ring-teal-700 border-slate-300 cursor-pointer"
                  />
                  <div className="text-xs text-slate-800 space-y-0.5">
                    <span className="font-semibold block text-xs">
                      Use Protected Image (I explicitly confirm and authorize publishing this protected version).
                    </span>
                    <span className="text-[11px] text-slate-500 block leading-relaxed">
                      In accordance with Rule #11, the original file remains in confidential private storage and only this privacy-shielded version will be published.
                    </span>
                  </div>
                </label>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(STEP_UPLOAD)}
                  className="text-xs text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={!userConfirmedUseProtectedImage || isProcessing}
                  onClick={handleConfirmAndPublish}
                  className={`inline-flex items-center space-x-1.5 font-medium px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                    userConfirmedUseProtectedImage && !isProcessing
                      ? 'bg-teal-700 hover:bg-teal-800 text-white shadow-xs' 
                      : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Confirm Protected Image & Match</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: AI Analysis & Case Matching Result */}
          {step === STEP_CONFIRMED_READY && (
            <div className="space-y-3.5">
              {isProcessing ? (
                <div className="py-10 flex flex-col items-center justify-center text-center space-y-3">
                  <Loader2 className="w-6 h-6 text-teal-700 animate-spin" />
                  <div>
                    <h4 className="font-semibold text-slate-900 text-xs">Matching with project discrepancy cases...</h4>
                    <p className="text-[11px] text-slate-500 max-w-sm mt-0.5">
                      Cross-referencing confirmed evidence against existing project timeline.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  
                  {/* Case Matching Outcome Banner */}
                  {aiResult?.matchedCaseNumber ? (
                    <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-start gap-2.5">
                      {aiResult.isNewCase ? (
                        <FolderPlus className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                      ) : (
                        <GitMerge className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                      )}
                      <div className="text-xs space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900">
                            {aiResult.isNewCase ? 'New Discrepancy Case Created' : 'Matched Existing Discrepancy Case'}
                          </span>
                          <span className="font-mono text-[10px] bg-white px-1.5 py-0.5 rounded border border-slate-200 font-medium text-slate-700">
                            {aiResult.matchedCaseNumber}
                          </span>
                        </div>
                        <p className="text-slate-600">
                          {aiResult.isNewCase 
                            ? `Initialized tracking file: ${aiResult.matchedCaseTitle}` 
                            : `Attached evidence to: ${aiResult.matchedCaseTitle}`}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />
                      <div className="text-xs">
                        <span className="font-semibold text-slate-900 block">Baseline Document Cataloged</span>
                        <span className="text-slate-500">Official project baseline recorded on public timeline.</span>
                      </div>
                    </div>
                  )}

                  {/* Duplicate Status & Structured AI Summary Card */}
                  <div className="border border-slate-200 rounded-lg p-3.5 bg-slate-50/50 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-teal-800" />
                        <span className="font-semibold text-xs text-slate-900">AI Analysis Summary</span>
                      </div>
                      
                      <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded border ${
                        aiResult?.duplicateStatus === 'independent_corroboration' ? 'bg-teal-50 text-teal-800 border-teal-200' :
                        aiResult?.duplicateStatus === 'possible_duplicate' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                        'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        Duplicate Status: {aiResult?.duplicateStatus}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {aiResult?.summary}
                    </p>

                    {/* Mandatory AI Neutrality Caveat Banner (Rule #13) */}
                    <div className="p-2.5 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-950 flex items-start gap-2">
                      <Info className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold leading-snug">
                          “{aiResult?.neutralCaveat}”
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={handleResetAndClose}
                      className="bg-teal-700 hover:bg-teal-800 text-white font-medium px-4 py-2 rounded-lg text-xs shadow-xs transition-colors cursor-pointer"
                    >
                      View in Project Evidence Timeline
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}