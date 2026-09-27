import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Layers, 
  Camera, 
  ShieldCheck, 
  Lock, 
  Info, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  User, 
  Clock, 
  CheckCircle, 
  Scale, 
  FileText, 
  Loader2,
  ExternalLink,
  ChevronRight,
  Send,
  Eye,
  Megaphone
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import StatusBadge from '../components/common/StatusBadge';
import Button from '../components/common/Button';
import { casesService } from '../services/casesService';
import { INITIAL_CASES } from '../data/mockCases';

export default function CaseDetailPage({ 
  onOpenUpload, 
  currentRole = 'citizen' 
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialCase = INITIAL_CASES.find(
    c => c.id === id || c.caseNumber === id || c.id?.toLowerCase() === id?.toLowerCase()
  );
  const [caseItem, setCaseItem] = useState(initialCase || null);
  const [isLoading, setIsLoading] = useState(!initialCase);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadCase() {
      if (!initialCase) {
        setIsLoading(true);
      }
      setErrorMessage(null);

      try {
        const { caseItem: loadedCase, error } = await casesService.getCaseById(id);
        if (!isMounted) return;

        if (error || !loadedCase) {
          if (!initialCase) {
            setErrorMessage("Unable to load this information. Please try again.");
          }
        } else {
          setCaseItem(loadedCase);
        }
      } catch (err) {
        if (isMounted) {
          console.warn('Error loading case detail:', err);
          if (!initialCase) {
            setErrorMessage("Unable to load this information. Please try again.");
          }
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadCase();
    return () => { isMounted = false; };
  }, [id]);

  // Handler to scroll to evidence section
  const scrollToEvidence = () => {
    const el = document.getElementById('evidence-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-20 text-center space-y-3">
        <Loader2 className="w-7 h-7 text-teal-700 animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-medium">Loading case information...</p>
      </div>
    );
  }

  // Error / Not Found State
  if (errorMessage || !caseItem) {
    return (
      <div className="w-full max-w-lg mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h2 className="text-base font-bold text-slate-900">Case Record Not Found</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            {errorMessage || "Unable to load this information. Please try again."}
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 pt-2">
          <Button 
            variant="primary" 
            size="sm" 
            icon={ArrowLeft} 
            onClick={() => navigate('/dashboard?tab=projects')}
          >
            Return to Projects
          </Button>
        </div>
      </div>
    );
  }

  // Determine Discrepancy state for Safety Caveats (Rule #13)
  const isDiscrepant = 
    caseItem.status === 'Correction Ordered' || 
    caseItem.status === 'Correction Requested' || 
    caseItem.status === 'Under Review' ||
    caseItem.aiAnalysis?.potentialDiscrepancy === true;

  const safetyCaveat = isDiscrepant
    ? "This is a potential discrepancy for human review, not a finding of wrongdoing."
    : "No conflicting evidence identified. This does not confirm the project is fully complete or accurate.";

  const evidenceItems = caseItem.evidence || [];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-7 space-y-7 pb-24">
      
      {/* 1. Breadcrumbs & Top Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 text-slate-500">
          <Link to="/dashboard?tab=projects" className="hover:text-slate-900 transition-colors">
            Projects
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to={`/project/${caseItem.projectId}`} className="hover:text-slate-900 transition-colors font-medium">
            {caseItem.projectName || `Project #${caseItem.projectId?.toUpperCase()}`}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-mono text-slate-900 font-bold">
            {caseItem.caseNumber || caseItem.id}
          </span>
        </div>

        {/* Quick Action: Back */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium text-xs py-1 px-2.5 rounded-md hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
      </div>

      {/* 2. CASE HEADER CARD */}
      <Card padding="p-5 sm:p-7" className="space-y-4 border-l-4 border-l-teal-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
              CASE {caseItem.caseNumber || caseItem.id}
            </span>
            <Badge variant="neutral" size="sm">{caseItem.issueCategory || 'Civil Works'}</Badge>
            <StatusBadge status={caseItem.status} />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Opened: {caseItem.createdDate || '2024-09-18'}</span>
          </div>
        </div>

        {/* Case Title */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            {caseItem.title}
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
            <span>Linked Project:</span>
            <Link 
              to={`/project/${caseItem.projectId}`}
              className="font-medium text-teal-800 hover:text-teal-900 underline underline-offset-2 flex items-center gap-1"
            >
              <span>{caseItem.projectName} ({caseItem.projectId?.toUpperCase()})</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100">
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-400 uppercase font-mono font-semibold block">Total Evidence</span>
            <span className="text-sm font-bold font-mono text-slate-900">{caseItem.evidenceCount || evidenceItems.length} records</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-400 uppercase font-mono font-semibold block">Independent Observations</span>
            <span className="text-sm font-bold font-mono text-teal-900">{caseItem.independentObservationsCount || 1} independent</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-400 uppercase font-mono font-semibold block">Case Status</span>
            <span className="text-xs font-bold text-slate-800">{caseItem.status}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-400 uppercase font-mono font-semibold block">Privacy Shield</span>
            <span className="text-xs font-bold font-mono text-emerald-800">ENFORCED</span>
          </div>
        </div>

        {/* Action Buttons (Section 11) */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            icon={Eye} 
            onClick={scrollToEvidence}
          >
            View Evidence
          </Button>

          <Button 
            variant="primary" 
            size="sm" 
            icon={Camera} 
            onClick={() => onOpenUpload(caseItem.projectId)}
          >
            Report Additional Evidence
          </Button>

          <Link
            to={`/project/${caseItem.projectId}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            <span>View Project</span>
          </Link>

          <Link
            to="/dashboard?tab=infrastructure"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
            <span>Return to Priority Queue</span>
          </Link>
        </div>
      </Card>

      {/* 3. CASE TIMELINE / 6 ORDERED SECTIONS (Section 5) */}
      <div className="space-y-6">

        {/* SECTION 1: CITIZEN REPORT */}
        <Card padding="p-5 sm:p-6" className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs font-mono">
                1
              </span>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Originating Citizen Report
              </h2>
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              {caseItem.citizenReport?.submittedDate || caseItem.createdDate}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-mono font-medium text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                <User className="w-3 h-3 text-slate-400" />
                <span>{caseItem.citizenReport?.submittedBy || 'Citizen #A7K29'}</span>
              </span>
              <span className="text-xs font-mono text-slate-400">
                (Public pseudonym • Identity vaulted)
              </span>
            </div>

            <h3 className="text-sm font-semibold text-slate-900">
              {caseItem.citizenReport?.title || caseItem.title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              {caseItem.citizenReport?.description || caseItem.aiSummary}
            </p>
          </div>
        </Card>

        {/* SECTION 2: EVIDENCE (Section 6 & 7) */}
        <div id="evidence-section" className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs font-mono">
                2
              </span>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Evidence Repository ({evidenceItems.length})
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-mono">Privacy Shield Protected</span>
          </div>

          {evidenceItems.length === 0 ? (
            <Card padding="p-8" className="text-center space-y-2">
              <Camera className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-600 font-medium">
                No evidence submitted yet — be the first to contribute.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                icon={Camera}
                onClick={() => onOpenUpload(caseItem.projectId)}
              >
                Submit Evidence
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {evidenceItems.map((item, idx) => {
                // Evidence taxonomy label (Section 7)
                let taxonomyLabel = 'Recorded fact.';
                let badgeStyle = 'bg-slate-100 text-slate-800 border-slate-200';

                if (item.category === 'Observation') {
                  taxonomyLabel = 'Independent observation.';
                  badgeStyle = 'bg-teal-50 text-teal-900 border-teal-200';
                } else if (item.category === 'Allegation') {
                  taxonomyLabel = 'Citizen-reported allegation — not independently established.';
                  badgeStyle = 'bg-amber-50 text-amber-900 border-amber-200';
                }

                // Privacy Shield check (Section 6):
                // If privacy_reviewed = true and protected_file_url exists: show protected image.
                // If privacy_reviewed = false: DO NOT display original file, show pending notice!
                const isPrivacyReviewed = item.privacy_reviewed === true || item.privacyShieldVerified === true;
                const displayImageUrl = isPrivacyReviewed ? (item.protected_file_url || item.imageUrl) : null;

                return (
                  <Card key={item.id || idx} padding="p-5" className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold text-slate-900">
                          #{item.id?.toUpperCase()}
                        </span>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${badgeStyle}`}>
                          {item.category?.toUpperCase()}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono italic">
                          "{taxonomyLabel}"
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                        <span>Duplicate status: <strong>{item.duplicateStatus || 'unique'}</strong></span>
                        <span>•</span>
                        <span>{item.submittedDate || item.date}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>

                    {/* Image rendering with STRICT Privacy Shield enforcement */}
                    {item.imageUrl || item.protected_file_url ? (
                      <div className="pt-2">
                        {isPrivacyReviewed && displayImageUrl ? (
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-1.5 text-teal-800 font-medium">
                                <ShieldCheck className="w-4 h-4 text-teal-700" />
                                <span>Protected Evidence Asset (Privacy Shield Approved)</span>
                              </div>
                              <span className="text-[10px] font-mono text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                                Sanitized Preview
                              </span>
                            </div>

                            <div className="relative rounded-lg overflow-hidden bg-slate-100 max-h-72 border border-slate-200">
                              <img
                                src={displayImageUrl}
                                alt={item.title}
                                className="w-full h-full object-cover max-h-72"
                              />
                              <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-xs text-slate-700 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1 shadow-2xs">
                                <Lock className="w-3 h-3 text-teal-700" />
                                <span>Original Vaulted • PII Redacted</span>
                              </div>
                            </div>

                            {item.detectedPrivacyItems && item.detectedPrivacyItems.length > 0 && (
                              <div className="flex flex-wrap items-center gap-1.5 text-xs pt-1">
                                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Sanitization applied:</span>
                                {item.detectedPrivacyItems.map((redaction, rIdx) => (
                                  <span 
                                    key={rIdx}
                                    className="inline-flex items-center gap-1 text-[10px] font-mono bg-white text-slate-700 px-2 py-0.5 rounded border border-slate-200"
                                  >
                                    <CheckCircle className="w-2.5 h-2.5 text-teal-700" />
                                    <span>{redaction}</span>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          // Explicit security requirement: If privacy_reviewed = false, NEVER display original image publicly
                          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 flex items-center gap-2.5 text-xs">
                            <Lock className="w-4 h-4 text-amber-700 shrink-0" />
                            <div className="space-y-0.5">
                              <span className="font-bold">Evidence image pending privacy review.</span>
                              <p className="text-[11px] text-amber-800 font-normal">
                                Original asset is securely vaulted in private storage until privacy scan verification is confirmed.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : null}

                    {/* Metadata Footer */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3 text-slate-400" />
                        <span>Submitted by: <strong>{item.submittedBy || 'Citizen #A7K29'}</strong></span>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        Type: {item.evidenceType || (item.imageUrl ? 'Photo Evidence' : 'Document')}
                      </span>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* SECTION 3: AI UNDERSTANDING & SUMMARY (Section 8) */}
        <Card padding="p-5 sm:p-6" className="space-y-3.5 bg-slate-50/60">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs font-mono">
                3
              </span>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-teal-800" />
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  AI-Assisted Summary
                </h2>
              </div>
            </div>
            <span className="text-[10px] font-mono text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
              NEUTRAL ANALYSIS
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
              {caseItem.aiSummary || caseItem.aiAnalysis?.summary || "No conflicting evidence identified. Evidence timeline matches public procurement registry."}
            </p>

            {caseItem.aiAnalysis?.discrepancyNote && (
              <p className="text-xs text-slate-600 font-mono pt-1">
                <strong>Technical observation note:</strong> {caseItem.aiAnalysis.discrepancyNote}
              </p>
            )}
          </div>

          {/* Mandatory Rule #13 Safety Caveat */}
          <div className={`p-3.5 rounded-lg border flex items-start gap-2.5 ${
            isDiscrepant 
              ? 'bg-amber-50/80 border-amber-200 text-amber-950'
              : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <Info className={`w-4 h-4 shrink-0 mt-0.5 ${
              isDiscrepant ? 'text-amber-700' : 'text-slate-500'
            }`} />
            <div className="space-y-0.5 text-xs">
              <span className="font-bold block">Neutral AI Safety Standard:</span>
              <p className="font-medium leading-relaxed">
                "{safetyCaveat}"
              </p>
            </div>
          </div>
        </Card>

        {/* SECTION 4: GOVERNMENT RESPONSE (Section 9) */}
        <Card padding="p-5 sm:p-6" className="space-y-3.5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs font-mono">
                4
              </span>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-slate-700" />
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Government Response
                </h2>
              </div>
            </div>
            
            <StatusBadge status={caseItem.govResponse?.status || "Awaiting Response"} />
          </div>

          {caseItem.govResponse && caseItem.govResponse.statement ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>Department: <strong>{caseItem.govResponse.department}</strong></span>
                <span>Date: {caseItem.govResponse.responseDate || 'Pending'}</span>
              </div>
              
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-mono font-semibold block mb-1">Official Statement</span>
                <p className="text-xs text-slate-800 leading-relaxed font-normal">
                  "{caseItem.govResponse.statement}"
                </p>
              </div>

              {caseItem.govResponse.nextAction && (
                <div className="text-xs text-slate-600 flex items-center gap-1 pt-1 font-mono">
                  <span className="font-semibold text-slate-700">Planned Follow-up Action:</span>
                  <span>{caseItem.govResponse.nextAction}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <p className="text-xs font-medium text-slate-700">
                Awaiting Response
              </p>
              <p className="text-[11px] text-slate-500">
                Structured inquiry dispatched to municipal department. Formal response pending review under standard tracking SLA.
              </p>
            </div>
          )}
        </Card>

        {/* SECTION 5: ENGINEER ASSESSMENT (Section 10) */}
        <Card padding="p-5 sm:p-6" className="space-y-3.5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs font-mono">
                5
              </span>
              <div className="flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-slate-700" />
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Engineer Assessment
                </h2>
              </div>
            </div>

            {caseItem.engineerAssessment && (
              <span className="text-xs font-mono font-bold text-teal-900 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                {caseItem.engineerAssessment.status}
              </span>
            )}
          </div>

          {caseItem.engineerAssessment && caseItem.engineerAssessment.comments ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>Assessor: <strong>{caseItem.engineerAssessment.engineerId}</strong></span>
                <span>Audit Date: {caseItem.engineerAssessment.auditDate || 'On Record'}</span>
              </div>

              <div className="p-3.5 rounded-lg bg-teal-50/50 border border-teal-200/80">
                <span className="text-[10px] text-teal-900 uppercase font-mono font-semibold block mb-1">Independent Assessment Findings</span>
                <p className="text-xs text-slate-800 leading-relaxed font-normal">
                  "{caseItem.engineerAssessment.comments}"
                </p>
              </div>

              <p className="text-[11px] text-slate-400 font-mono italic">
                Engineering review conducted in accordance with public infrastructure inspection standards. Does not constitute a final legal adjudication.
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <p className="text-xs font-medium text-slate-600">
                Independent engineering assessment not yet submitted.
              </p>
              <p className="text-[11px] text-slate-400">
                Case is queued for physical audit and technical certification by certified civil engineering panel.
              </p>
            </div>
          )}
        </Card>

        {/* SECTION 6: CURRENT STATUS */}
        <Card padding="p-5 sm:p-6" className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs font-mono">
                6
              </span>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Current Case Status & Tracking
              </h2>
            </div>
            <StatusBadge status={caseItem.status} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-mono font-semibold block">Case Lifecycle</span>
              <span className="font-bold text-slate-800 block">{caseItem.status}</span>
              <span className="text-[11px] text-slate-500">Active monitoring</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-mono font-semibold block">Supervision Phase</span>
              <span className="font-bold text-slate-800 block">
                {caseItem.govResponse?.status === 'Work Ongoing' ? 'Physical Site Execution' : 'Administrative Review'}
              </span>
              <span className="text-[11px] text-slate-500">Regular telemetry feed</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-mono font-semibold block">Next Step</span>
              <span className="font-bold text-teal-900 block">
                {caseItem.govResponse?.nextAction || 'Awaiting site physical audit'}
              </span>
              <span className="text-[11px] text-slate-500">Updated automatically</span>
            </div>
          </div>
        </Card>

      </div>

    </div>
  );
}
