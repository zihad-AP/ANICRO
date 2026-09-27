import React, { useState, useEffect, useRef } from 'react';
import { 
  Megaphone, 
  Mic, 
  MapPin, 
  Camera, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Info,
  CheckCircle,
  Globe,
  AlertTriangle,
  Edit3,
  Check,
  RotateCcw,
  Loader2,
  ChevronDown,
  Building,
  Key,
  Activity,
  Volume2,
  MicOff,
  Play
} from 'lucide-react';
import { DEMAND_CATEGORIES } from '../data/mockDemandIntelligence';
import { aiService } from '../services/aiService';
import { isReportMatchingHotspot } from '../services/hotspotEngine';
import { useNavigate } from 'react-router-dom';

export const INDIAN_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', speechCode: 'en-IN', sample: 'During heavy monsoon rains, the main feeder road floods with 2 feet of stagnant water, blocking primary school access and emergency vehicle routing.' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', speechCode: 'hi-IN', sample: 'भारी बारिश के दौरान हमारे क्षेत्र की मुख्य सड़क पर 2 फीट पानी भर जाता है। स्कूल जाने वाले बच्चों और एम्बुलेंस का रास्ता 2 हफ़्ते से बंद है।' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', speechCode: 'ml-IN', sample: 'കനത്ത മഴക്കാലത്ത് സ്കൂൾ റൂട്ടിൽ രണ്ടാഴ്ചയായി വെള്ളക്കെട്ടാണ്. കലുങ്കുകൾ ഇല്ലാത്തതിനാൽ വിദ്യാർത്ഥികൾക്കും ആംബുലൻസുകൾക്കും കടന്നുപോകാൻ കഴിയുന്നില്ല.' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', speechCode: 'ta-IN', sample: 'கனமழையின் போது பள்ளி செல்லும் சாலையில் வெள்ள நீர் தேங்குகிறது. வடிகால் வசதி இல்லாததால் இரண்டு வாரங்களாக போக்குவரத்து துண்டிக்கப்பட்டுள்ளது.' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', speechCode: 'te-IN', sample: 'భారీ వర్షాల సమయంలో పాఠశాల మార్గంలో నీరు నిలిచిపోతుంది. సరైన డ్రైనేజీ లేకపోవడం వల్ల అంబులెన్స్ మరియు రవాణా తీవ్రంగా ప్రభావితమవుతున్నాయి.' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', speechCode: 'kn-IN', sample: 'ಭಾರೀ ಮಳೆಯ ಸಮಯದಲ್ಲಿ ಶಾಲಾ ರಸ್ತೆಯಲ್ಲಿ ನೀರು ನಿಲ್ಲುತ್ತದೆ. ಸರಿಯಾದ ಚರಂಡಿ ವ್ಯವಸ್ಥೆ ಇಲ್ಲದ ಕಾರಣ ವಾಹನ ಸಂಚಾರಕ್ಕೆ ತೊಂದರೆಯಾಗಿದೆ.' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', speechCode: 'bn-IN', sample: 'ভারী বর্ষার সময় স্কুলের প্রধান রাস্তায় জল জমে যায়। ড্রেনেজ কালভার্ট না থাকায় দুই সপ্তাহ ধরে সাধারণ মানুষের যাতায়াত বন্ধ।' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', speechCode: 'mr-IN', sample: 'मुसळधार पावसात शाळेकडे जाणाऱ्या रस्त्यावर पाणी साचते. ड्रेनेज व्यवस्था नसल्यामुळे रुग्णवाहिका आणि नागरिकांची वाहतूक ठप्प होते.' }
];

export const INDIAN_STATES = [
  { name: 'Karnataka', districts: ['Bengaluru Urban', 'Mysuru', 'Dakshina Kannada', 'Belagavi', 'Hubballi'] },
  { name: 'Maharashtra', districts: ['Mumbai Suburban', 'Pune', 'Thane', 'Nagpur', 'Nashik'] },
  { name: 'Tamil Nadu', districts: ['Chennai', 'Coimbatore', 'Madurai', 'Chengalpattu', 'Salem'] },
  { name: 'Uttar Pradesh', districts: ['Lucknow', 'Varanasi', 'Kanpur Nagar', 'Gautam Buddha Nagar', 'Agra'] },
  { name: 'Bihar', districts: ['Patna', 'Nalanda', 'Gaya', 'Muzaffarpur', 'Bhagalpur'] },
  { name: 'Rajasthan', districts: ['Jaipur', 'Jodhpur', 'Kota', 'Ajmer', 'Udaipur'] },
  { name: 'West Bengal', districts: ['Kolkata', 'North 24 Parganas', 'Howrah', 'Darjeeling', 'Hooghly'] },
  { name: 'Odisha', districts: ['Puri', 'Khordha (Bhubaneswar)', 'Cuttack', 'Ganjam', 'Balasore'] },
  { name: 'Kerala', districts: ['Ernakulam', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Kollam'] },
  { name: 'Assam', districts: ['Kamrup Metropolitan', 'Majuli', 'Dibrugarh', 'Silchar', 'Jorhat'] },
  { name: 'Other State / UT', districts: ['Central District', 'Urban Ward'] }
];

export const DEMO_SCENARIOS = [
  {
    id: 'scenario_a',
    title: 'School Access Flooding (English)',
    shortLabel: 'Scenario A: School Flooding',
    langCode: 'en',
    sampleTitle: 'School Access Road Inundation & Severe Stormwater Drainage Deficit',
    sampleDescription: 'Every monsoon the road near our government school becomes flooded with two feet of water and children cannot safely reach school. Emergency ambulances cannot enter the ward.',
    category: 'Drainage & Flood Mitigation',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    municipality: 'Bengaluru Municipal Corporation',
    ward: 'Ward 42 - Bellandur Feeder Link',
    landmark: 'Near Government Higher Secondary School'
  },
  {
    id: 'scenario_b',
    title: 'Rural Drinking Water Crisis (English)',
    shortLabel: 'Scenario B: Drinking Water',
    langCode: 'en',
    sampleTitle: 'Acute Potable Drinking Water Deficit & Saline Groundwater Intrusion',
    sampleDescription: 'Our village does not have reliable drinking water. Families walk several kilometres to collect water, and municipal tankers fail to arrive for days in extreme summer heat.',
    category: 'Drinking Water',
    state: 'Rajasthan',
    district: 'Jodhpur',
    municipality: 'Mandore Block Development Council',
    ward: 'Sector 8 Hamlets',
    landmark: 'Central Water Kiosk & Panchayat Bhavan'
  },
  {
    id: 'scenario_c',
    title: 'Road Infrastructure & Potholes (English)',
    shortLabel: 'Scenario C: Road Infrastructure',
    langCode: 'en',
    sampleTitle: 'Severe Road Craters Obstructing Public Transport & Safety',
    sampleDescription: 'Several potholes on the main road are making travel unsafe and slowing public transport. Ambulances face severe delays during emergency transfers.',
    category: 'Roads',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    municipality: 'Anekal Taluk Panchayat',
    ward: 'Ward 8 Link',
    landmark: 'Feeder Link near Community Health Centre'
  },
  {
    id: 'scenario_d',
    title: 'ग्रामीण पेयजल संकट (हिन्दी Vernacular)',
    shortLabel: 'Scenario D: हिन्दी पेयजल संकट',
    langCode: 'hi',
    sampleTitle: 'ग्रामीण पेयजल की गंभीर कमी और पानी लाने में कठिनाई',
    sampleDescription: 'हमारे गांव में पीने का पानी नहीं है। लोगों को पानी लेने के लिए कई किलोमीटर दूर जाना पड़ता है। सरकारी टैंकर हफ्तों तक नहीं आते हैं।',
    category: 'Drinking Water',
    state: 'Rajasthan',
    district: 'Jodhpur',
    municipality: 'Mandore Block Development Council',
    ward: 'Sector 8 Hamlets',
    landmark: 'केंद्रीय जल कियोस्क और पंचायत भवन'
  }
];

const STEP_DESCRIBE = 1;
const STEP_LOCATION_CAT = 2;
const STEP_EVIDENCE = 3;
const STEP_PRIVACY = 4;
const STEP_AI_RESULT = 5;

export default function ReportNeedModal({ isOpen, onClose, onDemandSubmitted, hotspots = [] }) {
  const navigate = useNavigate();
  const [matchedHotspotResult, setMatchedHotspotResult] = useState(null);
  const [step, setStep] = useState(STEP_DESCRIBE);
  const [selectedLang, setSelectedLang] = useState(INDIAN_LANGUAGES[0]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Drainage');

  // Indian Civic Location Fields
  const [selectedState, setSelectedState] = useState('Kerala');
  const [selectedDistrict, setSelectedDistrict] = useState('Ernakulam');
  const [municipalityOrBlock, setMunicipalityOrBlock] = useState('Kochi Municipal Corporation');
  const [wardOrPanchayat, setWardOrPanchayat] = useState('Ward 42 - Vyttila');
  const [landmark, setLandmark] = useState('Near Govt Higher Secondary School, Feeder Link');

  // Evidence & Privacy
  const [hasPhoto, setHasPhoto] = useState(true);
  const [isDictating, setIsDictating] = useState(false);
  const [dictationDone, setDictationDone] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState(null);
  const [userConfirmedPrivacy, setUserConfirmedPrivacy] = useState(false);

  // AI Intelligence Execution State
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [aiResult, setAiResult] = useState(null);
  const [isEditingAi, setIsEditingAi] = useState(false);
  const [editedAiValues, setEditedAiValues] = useState({
    category: 'Drainage',
    problemType: '',
    severity: 'High',
    summary: '',
    affectedServices: []
  });
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  const samplePhotoUrl = 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80';
  const recognitionRef = useRef(null);

  // Clean up speech recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  if (!isOpen) return null;

  // Compute clean formatted Indian civic location string
  const getComputedLocation = () => {
    const parts = [
      landmark.trim(),
      wardOrPanchayat.trim(),
      municipalityOrBlock.trim(),
      selectedDistrict.trim(),
      selectedState.trim()
    ].filter(Boolean);
    return parts.join(', ');
  };

  // Voice Dictation with Web Speech API & Graceful Fallback (Part 6)
  const handleToggleVoiceDictation = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceNotice('Voice input is not supported in this browser. You can type your request instead or load a demo scenario.');
      return;
    }

    if (isDictating) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsDictating(false);
      return;
    }

    setVoiceNotice(null);
    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = selectedLang.speechCode || 'en-IN';
      recognition.interimResults = true;
      recognition.continuous = false;

      recognition.onstart = () => {
        setIsDictating(true);
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(r => r[0].transcript)
          .join('');
        setDescription(transcript);
        if (!title.trim()) {
          setTitle(`${selectedLang.name} Voice Request — ${category}`);
        }
        setDictationDone(true);
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition notice:', event.error);
        setIsDictating(false);
        if (event.error === 'not-allowed') {
          setVoiceNotice('Microphone access was denied. Please allow microphone permissions or type your request.');
        } else {
          setVoiceNotice('Voice input is temporarily unavailable. You can type your request or load a sample.');
        }
      };

      recognition.onend = () => {
        setIsDictating(false);
      };

      recognition.start();
    } catch (err) {
      console.warn('Failed to start speech recognition:', err);
      setIsDictating(false);
      setVoiceNotice('Voice input is not supported in this browser. You can type your request instead.');
    }
  };

  // Load Demo Scenarios (Part 11)
  const handleLoadDemoScenario = (scenario) => {
    const langObj = INDIAN_LANGUAGES.find(l => l.code === scenario.langCode) || INDIAN_LANGUAGES[0];
    setSelectedLang(langObj);
    setTitle(scenario.sampleTitle);
    setDescription(scenario.sampleDescription);
    setCategory(scenario.category);
    setSelectedState(scenario.state);
    setSelectedDistrict(scenario.district);
    setMunicipalityOrBlock(scenario.municipality);
    setWardOrPanchayat(scenario.ward);
    setLandmark(scenario.landmark);
    setDictationDone(true);
    setVoiceNotice(null);
  };

  // Quick Vernacular Sample Loader for Testing Regional Languages
  const simulateVernacularSample = () => {
    setIsDictating(true);
    setTimeout(() => {
      setIsDictating(false);
      setDictationDone(true);
      setDescription(selectedLang.sample);
      setTitle(`${selectedLang.name} Community Need: ${category} Access`);
    }, 600);
  };

  // Switch Language
  const handleSelectLanguage = (lang) => {
    setSelectedLang(lang);
  };

  // Execute Real Gemini AI Analysis
  const handleTriggerAiAnalysis = async () => {
    setStep(STEP_AI_RESULT);
    setIsAiLoading(true);
    setAiError(null);

    const fullLocation = getComputedLocation();
    const textToAnalyze = `${title ? title + ': ' : ''}${description}`.trim();

    try {
      const result = await aiService.analyzeDevelopmentRequest({
        text: textToAnalyze,
        language: selectedLang.name,
        location: fullLocation,
        category: category,
        hasPhoto: hasPhoto
      });

      if (result.success && result.data) {
        setAiResult(result.data);
        setEditedAiValues({
          category: result.data.category || category,
          problemType: result.data.problemType || `${category} Infrastructure Deficit`,
          severity: result.data.severity || 'High',
          summary: result.data.summary || textToAnalyze.slice(0, 150),
          affectedServices: result.data.affectedServices || ['Community Access', 'Transport']
        });
        setAiError(null);
      } else {
        // Handle honest error reporting (Rule #18)
        setAiError({
          code: result.code || 'AI_UNAVAILABLE',
          message: result.message || 'Gemini integration implemented but requires GEMINI_API_KEY configuration for live testing.'
        });
        // Populate standard civic baseline for manual review
        const baselineData = {
          language: selectedLang.name,
          category: category,
          problemType: `${category} Infrastructure Deficit`,
          summary: textToAnalyze.slice(0, 160) || 'Citizen reported municipal infrastructure demand requiring planning assessment.',
          severity: category === 'Drainage' || category === 'Roads' ? 'Critical' : 'High',
          affectedServices: ['Local Transit Route', 'School Access', 'Public Safety'],
          locationMentioned: fullLocation,
          citizenIntent: `Citizen requesting municipal intervention for ${category.toLowerCase()} improvement`,
          confidence: 85,
          recommendedInfrastructureDomain: `${category} Engineering & Municipal Works`,
          modelUsed: 'Standard Rule Baseline (Pending Gemini Key)'
        };
        setAiResult(baselineData);
        setEditedAiValues({
          category: baselineData.category,
          problemType: baselineData.problemType,
          severity: baselineData.severity,
          summary: baselineData.summary,
          affectedServices: baselineData.affectedServices
        });
      }
    } catch (err) {
      console.error('Error invoking AI analysis:', err);
      setAiError({
        code: 'CLIENT_ERROR',
        message: 'AI analysis is temporarily unavailable. Your request has not been lost.'
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  // Citizen Final Confirmation & Indexing
  const handleConfirmAndContinue = () => {
    const fullLocation = getComputedLocation();
    const finalCategory = editedAiValues.category || category;
    const finalSeverity = editedAiValues.severity || 'High';

    const newDemand = {
      id: `need-${Date.now().toString().slice(-4)}`,
      title: title || editedAiValues.problemType || 'Community Infrastructure Need',
      description: description || 'Citizen reported development demand requiring municipal planning.',
      category: finalCategory,
      location: fullLocation,
      state: selectedState,
      district: selectedDistrict,
      severity: finalSeverity,
      affectedPopulation: finalSeverity === 'Critical' ? 42000 : 26000,
      affectedPopulationDisplay: finalSeverity === 'Critical' ? '42,000 residents' : '26,000 residents',
      dateSubmitted: new Date().toISOString().split('T')[0],
      submittedBy: 'Citizen #A7K29',
      supportCount: 1,
      hasPhoto: hasPhoto,
      photoUrl: hasPhoto ? samplePhotoUrl : null,
      audioDictated: dictationDone,
      languageSubmitted: selectedLang.name,
      aiStructuring: {
        problemType: editedAiValues.problemType,
        summary: editedAiValues.summary,
        severityScore: finalSeverity === 'Critical' ? 94 : 76,
        affectedServices: editedAiValues.affectedServices,
        detectedLanguage: aiResult?.language || selectedLang.name,
        citizenIntent: aiResult?.citizenIntent || 'Citizen requested infrastructure improvement',
        recommendedDomain: aiResult?.recommendedInfrastructureDomain || `${finalCategory} Engineering`,
        simulatedConfidence: aiResult?.confidence || 90,
        categoryConfidence: `${finalCategory} (${aiResult?.confidence || 90}%)`,
        isLiveGemini: !aiError && aiResult?.modelUsed?.includes('gemini'),
        modelUsed: aiResult?.modelUsed || 'Gemini 2.5 Flash'
      },
      status: 'Aggregated into Hotspot',
      hotspotId: 'hotspot-01'
    };

    // Match against current active hotspots
    let matched = null;
    if (hotspots && hotspots.length > 0) {
      matched = hotspots.find(h => isReportMatchingHotspot(newDemand, h));
    }

    // Intelligent fallback for demo scenarios
    if (!matched && hotspots && hotspots.length > 0) {
      const fullText = `${newDemand.title} ${newDemand.description} ${newDemand.location}`.toLowerCase();
      if (fullText.includes('flood') || fullText.includes('school') || fullText.includes('जलभराव') || fullText.includes('स्कूल')) {
        matched = hotspots.find(h => h.id === 'hotspot-001' || h.id === 'hotspot-01');
      } else if (fullText.includes('water') || fullText.includes('salin') || fullText.includes('tanker') || fullText.includes('पानी') || fullText.includes('जल')) {
        matched = hotspots.find(h => h.id === 'hotspot-015' || h.id === 'hotspot-15');
      } else if (fullText.includes('road') || fullText.includes('crater') || fullText.includes('hospital') || fullText.includes('सड़क') || fullText.includes('anekal')) {
        matched = hotspots.find(h => h.id === 'hotspot-02');
      }
    }

    newDemand.hotspotId = matched ? matched.id : 'hotspot-01';
    newDemand.linkedProjectId = matched?.linkedProjectId || 'pr-01';
    setMatchedHotspotResult(matched || null);

    onDemandSubmitted(newDemand);
    setIsSubmittedSuccess(true);
  };

  const handleResetAndClose = () => {
    setStep(STEP_DESCRIBE);
    setTitle('');
    setDescription('');
    setCategory('Drainage');
    setHasPhoto(true);
    setIsDictating(false);
    setDictationDone(false);
    setUserConfirmedPrivacy(false);
    setIsAiLoading(false);
    setAiError(null);
    setAiResult(null);
    setIsEditingAi(false);
    setIsSubmittedSuccess(false);
    setMatchedHotspotResult(null);
    onClose();
  };

  const currentDistricts = INDIAN_STATES.find(s => s.name === selectedState)?.districts || ['Center Ward'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-xl max-w-xl w-full shadow-card border border-slate-200 overflow-hidden relative">
        
        {/* Header Strip */}
        <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
              <Megaphone className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-xs text-slate-900">
                  Report a Development Need
                </h3>
                <span className="text-[10px] font-medium bg-teal-50 text-teal-800 border border-teal-200 px-1.5 py-0.2 rounded">
                  Gemini AI Powered
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Citizen Voice → AI Understanding → Infrastructure Gap & Hotspot Clustering
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

        {/* Progress Tracker */}
        <div className="bg-slate-50/70 border-b border-slate-200 px-5 py-2 flex items-center justify-between text-[11px]">
          <span className={`flex items-center gap-1 ${step >= 1 ? 'text-teal-800 font-semibold' : 'text-slate-400'}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-mono ${step >= 1 ? 'bg-teal-700 text-white' : 'bg-slate-200'}`}>1</span>
            Describe
          </span>
          <div className="w-4 h-px bg-slate-200" />
          <span className={`flex items-center gap-1 ${step >= 2 ? 'text-teal-800 font-semibold' : 'text-slate-400'}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-mono ${step >= 2 ? 'bg-teal-700 text-white' : 'bg-slate-200'}`}>2</span>
            Location
          </span>
          <div className="w-4 h-px bg-slate-200" />
          <span className={`flex items-center gap-1 ${step >= 3 ? 'text-teal-800 font-semibold' : 'text-slate-400'}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-mono ${step >= 3 ? 'bg-teal-700 text-white' : 'bg-slate-200'}`}>3</span>
            Evidence
          </span>
          <div className="w-4 h-px bg-slate-200" />
          <span className={`flex items-center gap-1 ${step >= 4 ? 'text-teal-800 font-semibold' : 'text-slate-400'}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-mono ${step >= 4 ? 'bg-teal-700 text-white' : 'bg-slate-200'}`}>4</span>
            Shield
          </span>
          <div className="w-4 h-px bg-slate-200" />
          <span className={`flex items-center gap-1 ${step >= 5 ? 'text-teal-800 font-semibold' : 'text-slate-400'}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-mono ${step >= 5 ? 'bg-teal-700 text-white' : 'bg-slate-200'}`}>5</span>
            AI Understanding
          </span>
        </div>

        {/* Modal Body */}
        <div className="p-5 max-h-[75vh] overflow-y-auto">
          
          {/* STEP 1: Describe Need & Vernacular Language / Dictation */}
          {step === STEP_DESCRIBE && (
            <div className="space-y-3.5">
              
              {/* DEMO MODE: Prepared Scenarios (Part 11) */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-md space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 font-mono flex items-center gap-1.5">
                    <Play className="w-3 h-3 text-slate-600" />
                    <span>DEMO MODE — LOAD PREPARED SCENARIO</span>
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white text-slate-600 border border-slate-200">
                    Simulated Demo Data
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {DEMO_SCENARIOS.map(sc => (
                    <button
                      key={sc.id}
                      type="button"
                      onClick={() => handleLoadDemoScenario(sc)}
                      className="px-2 py-1.5 rounded bg-white hover:bg-slate-100/80 border border-slate-200 text-left text-[11px] font-medium text-slate-800 transition-colors shadow-2xs cursor-pointer flex flex-col"
                    >
                      <span className="font-semibold text-slate-900 truncate">{sc.shortLabel}</span>
                      <span className="text-[9px] text-slate-500 truncate font-mono">{sc.category}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Voice Notice / Fallback Message (Part 6) */}
              {voiceNotice && (
                <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                  <MicOff className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-medium">{voiceNotice}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setVoiceNotice(null)}
                    className="text-amber-700 hover:text-amber-900 text-xs font-bold cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              )}

              {/* Dedicated Voice Input Button Bar (Part 6) */}
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleToggleVoiceDictation}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold shadow-xs transition-all cursor-pointer ${
                      isDictating
                        ? 'bg-rose-600 text-white ring-2 ring-rose-300 animate-pulse'
                        : dictationDone
                        ? 'bg-emerald-600 text-white'
                        : 'bg-teal-900 hover:bg-teal-950 text-white'
                    }`}
                  >
                    <Mic className="w-4 h-4" />
                    <span>{isDictating ? 'Listening... Speak Now' : dictationDone ? 'Voice Recorded ✓' : 'Speak Your Development Need'}</span>
                  </button>
                  <span className="text-[11px] text-slate-500 hidden sm:inline">
                    {isDictating ? 'Capturing speech in browser...' : `Web Speech API • ${selectedLang.name}`}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={simulateVernacularSample}
                  className="text-[11px] text-teal-700 hover:text-teal-900 underline cursor-pointer font-medium"
                >
                  Load Sample
                </button>
              </div>

              {/* Language Selection Row */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-semibold text-slate-700 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-teal-700" />
                    <span>Select Language (Indian Regional Languages Supported)</span>
                  </label>
                  <span className="text-[10px] text-slate-500">
                    Type or speak in your language
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {INDIAN_LANGUAGES.map((lang) => (
                    <button
                      type="button"
                      key={lang.code}
                      onClick={() => handleSelectLanguage(lang)}
                      className={`px-2 py-1 rounded text-xs transition-colors cursor-pointer flex items-center gap-1 border ${
                        selectedLang.code === lang.code
                          ? 'bg-teal-50 border-teal-600 text-teal-900 font-semibold shadow-2xs'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <span>{lang.native}</span>
                      <span className="text-[10px] text-slate-400">({lang.name})</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Summarize the Development Need
                </label>
                <input
                  type="text"
                  placeholder="e.g. Chronic monsoon waterlogging along school route"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:ring-1 focus:ring-teal-700 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-semibold text-slate-700">
                    Detailed Community Problem Description ({selectedLang.native})
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Citizen Review & Edit Enabled
                  </span>
                </div>
                <textarea
                  rows={3}
                  placeholder={`Explain what is missing or broken in ${selectedLang.name}...`}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:ring-1 focus:ring-teal-700 focus:bg-white focus:outline-none leading-relaxed"
                />
              </div>

              {dictationDone && (
                <div className="p-2.5 bg-teal-50/60 border border-teal-200 rounded-lg text-[11px] text-teal-900 flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">{selectedLang.name} Voice Input Captured</span>
                    <span className="text-slate-600">
                      Regional vernacular speech captured. Gemini AI will analyze the original language context into standardized civic intelligence.
                    </span>
                  </div>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  disabled={!title.trim() && !description.trim()}
                  onClick={() => setStep(STEP_LOCATION_CAT)}
                  className="inline-flex items-center gap-1.5 bg-teal-700 hover:bg-teal-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-medium px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer shadow-2xs"
                >
                  <span>Continue to Location & Category</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Category & Localized Indian Civic Location */}
          {step === STEP_LOCATION_CAT && (
            <div className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1.5">
                  Infrastructure Category
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {DEMAND_CATEGORIES.map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`p-2 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                        category === cat
                          ? 'bg-teal-50 border-teal-600 text-teal-900 font-semibold shadow-2xs'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span>{cat}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Localized Indian Civic Hierarchy */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-semibold text-slate-800 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-teal-700" />
                    <span>Indian Civic Governance Location</span>
                  </label>
                  <span className="text-[10px] text-slate-500">Tier 1 - Tier 4 Hierarchy</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-600 mb-0.5">State</label>
                    <select
                      value={selectedState}
                      onChange={(e) => {
                        setSelectedState(e.target.value);
                        const s = INDIAN_STATES.find(item => item.name === e.target.value);
                        if (s && s.districts[0]) {
                          setSelectedDistrict(s.districts[0]);
                        }
                      }}
                      className="w-full text-xs bg-white border border-slate-200 rounded-md px-2 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-700"
                    >
                      {INDIAN_STATES.map(s => (
                        <option key={s.name} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-600 mb-0.5">District</label>
                    <select
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      className="w-full text-xs bg-white border border-slate-200 rounded-md px-2 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-700"
                    >
                      {currentDistricts.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-600 mb-0.5">Municipality / Block / Taluk</label>
                    <input
                      type="text"
                      value={municipalityOrBlock}
                      onChange={(e) => setMunicipalityOrBlock(e.target.value)}
                      placeholder="e.g. Kochi Municipal Corp"
                      className="w-full text-xs bg-white border border-slate-200 rounded-md px-2 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-700"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-600 mb-0.5">Ward / Gram Panchayat</label>
                    <input
                      type="text"
                      value={wardOrPanchayat}
                      onChange={(e) => setWardOrPanchayat(e.target.value)}
                      placeholder="e.g. Ward 42 - Vyttila"
                      className="w-full text-xs bg-white border border-slate-200 rounded-md px-2 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-600 mb-0.5">Street / Landmark / Feeder</label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="e.g. Near Govt Higher Secondary School"
                    className="w-full text-xs bg-white border border-slate-200 rounded-md px-2 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-700"
                  />
                </div>

                <div className="pt-1 text-[10px] text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">Preview: {getComputedLocation()}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(STEP_DESCRIBE)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(STEP_EVIDENCE)}
                  className="inline-flex items-center gap-1.5 bg-teal-700 hover:bg-teal-800 text-white font-medium px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer shadow-2xs"
                >
                  <span>Continue to Evidence</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Optional Evidence */}
          {step === STEP_EVIDENCE && (
            <div className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Optional Ground Evidence (Photo Asset)
                </label>
                <p className="text-[11px] text-slate-500 mb-2">
                  Ground photos help the AI priority engine corroborate real-world infrastructure gaps and assess severity.
                </p>

                <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <input
                    type="checkbox"
                    id="attachPhoto"
                    checked={hasPhoto}
                    onChange={(e) => setHasPhoto(e.target.checked)}
                    className="w-4 h-4 text-teal-700 rounded border-slate-300 cursor-pointer"
                  />
                  <label htmlFor="attachPhoto" className="text-xs text-slate-800 font-medium cursor-pointer">
                    Attach staged ground survey photograph
                  </label>
                </div>
              </div>

              {hasPhoto && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-3">
                  <img
                    src={samplePhotoUrl}
                    alt="Sample evidence"
                    className="w-16 h-16 object-cover rounded border border-slate-200 shrink-0"
                  />
                  <div className="text-xs space-y-0.5">
                    <span className="font-semibold text-slate-800 block text-[11px]">inundation_survey_sample.jpg</span>
                    <span className="text-[10px] text-slate-500 block">Exposed bystander biometrics & GPS telemetry detected</span>
                    <span className="text-[10px] font-medium text-teal-800 flex items-center gap-1 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
                      Requires Privacy Shield sanitization before aggregation
                    </span>
                  </div>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(STEP_LOCATION_CAT)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(STEP_PRIVACY)}
                  className="inline-flex items-center gap-1.5 bg-teal-700 hover:bg-teal-800 text-white font-medium px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer shadow-2xs"
                >
                  <span>Proceed to Privacy Review</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Privacy Shield Review */}
          {step === STEP_PRIVACY && (
            <div className="space-y-3.5">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-700" />
                  <span className="font-semibold text-xs text-slate-900">Privacy Shield Protection Gate</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-white rounded border border-slate-200 space-y-0.5">
                    <span className="text-[10px] uppercase text-slate-400 font-medium block">Public Identity</span>
                    <span className="font-mono text-slate-800 font-medium text-xs">Citizen #A7K29</span>
                    <span className="text-[10px] text-slate-500 block">Real identity confidential</span>
                  </div>
                  <div className="p-2 bg-white rounded border border-slate-200 space-y-0.5">
                    <span className="text-[10px] uppercase text-slate-400 font-medium block">GPS Telemetry</span>
                    <span className="font-mono text-slate-800 font-medium text-xs">{wardOrPanchayat || 'Ward Bounds'}</span>
                    <span className="text-[10px] text-slate-500 block">Precise coordinates sanitized</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userConfirmedPrivacy}
                    onChange={(e) => setUserConfirmedPrivacy(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-teal-700 focus:ring-teal-700 border-slate-300 cursor-pointer"
                  />
                  <div className="text-xs text-slate-800 space-y-0.5">
                    <span className="font-semibold block text-xs">
                      Authorize Submission Under ANTICRO Privacy Shield
                    </span>
                    <span className="text-[11px] text-slate-500 block leading-relaxed">
                      I confirm this development request can be analyzed by Gemini AI and aggregated into public infrastructure intelligence. Private identity will never be exposed.
                    </span>
                  </div>
                </label>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(STEP_EVIDENCE)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={!userConfirmedPrivacy}
                  onClick={handleTriggerAiAnalysis}
                  className={`inline-flex items-center gap-1.5 font-medium px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                    userConfirmedPrivacy
                      ? 'bg-teal-700 hover:bg-teal-800 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Submit Need to Gemini AI Intelligence Engine</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: AI Understanding Card & Citizen Controls */}
          {step === STEP_AI_RESULT && (
            <div className="space-y-3.5">
              
              {/* State A: Loading Restrained Civic Indicator */}
              {isAiLoading && (
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-teal-50 border border-teal-200 text-teal-700">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-900">
                      ANTICRO is analyzing your development request...
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 max-w-sm mx-auto">
                      Interpreting vernacular context in {selectedLang.name} ({selectedLang.native}), extracting affected public services, and standardizing infrastructure classification...
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400">
                    <ShieldCheck className="w-3 h-3 text-teal-600" />
                    <span>Executing via secure server-side Gemini intelligence</span>
                  </div>
                </div>
              )}

              {/* State B: Success or Transparent Configuration Notice */}
              {!isAiLoading && aiResult && !isSubmittedSuccess && (
                <>
                  {/* Transparent Notice if Key is missing (Rule #18) */}
                  {aiError && aiError.code === 'CONFIG_REQUIRED' && (
                    <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-lg text-xs space-y-1">
                      <div className="flex items-center gap-2 text-amber-900 font-semibold">
                        <Key className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span>Gemini Integration Active (API Key Pending)</span>
                      </div>
                      <p className="text-[11px] text-amber-800 leading-relaxed">
                        {aiError.message}
                      </p>
                      <p className="text-[10px] text-amber-700">
                        The structured server endpoint <code className="bg-amber-100/70 px-1 py-0.5 rounded font-mono">POST /api/ai/analyze-development-request</code> is mounted and ready. For this demonstration, you can review, edit, and confirm using standard municipal baseline rules.
                      </p>
                    </div>
                  )}

                  {/* General AI Notice if other network error */}
                  {aiError && aiError.code !== 'CONFIG_REQUIRED' && (
                    <div className="p-3 bg-slate-100 border border-slate-200 rounded-lg text-xs space-y-1">
                      <div className="flex items-center gap-2 text-slate-900 font-semibold">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>AI Analysis Notice</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {aiError.message}
                      </p>
                    </div>
                  )}

                  {/* Live AI Success Header */}
                  {!aiError && (
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-md flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-teal-700" />
                        <div>
                          <span className="font-bold text-xs text-slate-900 block font-mono uppercase tracking-wide">
                            Civic Technical Assessment Complete
                          </span>
                          <span className="text-[11px] text-slate-500">
                            Language: <span className="font-semibold text-slate-700">{aiResult.language}</span> • Estimated Confidence: <span className="font-mono font-semibold text-slate-700">{aiResult.confidence}%</span>
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono bg-white text-slate-700 border border-slate-300 px-2 py-0.5 rounded shadow-2xs">
                        {aiResult.modelUsed || 'Gemini 3.5 Flash'}
                      </span>
                    </div>
                  )}

                  {/* ANTICRO Structured Civic Assessment Sheet */}
                  <div className="border border-slate-200 rounded-md overflow-hidden bg-white shadow-2xs space-y-0">
                    <div className="bg-slate-50 px-3.5 py-2 border-b border-slate-200 flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-600">
                        Assessment Specification
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsEditingAi(!isEditingAi)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-800 hover:text-teal-950 cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>{isEditingAi ? 'Save Edits' : 'Edit Assessment'}</span>
                      </button>
                    </div>

                    {/* Editable / Readonly Fields */}
                    {!isEditingAi ? (
                      <div className="divide-y divide-slate-100 text-xs">
                        
                        {/* Row 1: Core Dimensions Strip */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-100 p-px">
                          <div className="p-2.5 bg-white space-y-0.5">
                            <span className="text-[9px] font-mono uppercase font-bold text-slate-400 block tracking-wider">
                              Category
                            </span>
                            <span className="font-bold text-slate-900 text-[11px] block truncate">
                              {editedAiValues.category}
                            </span>
                          </div>

                          <div className="p-2.5 bg-white space-y-0.5">
                            <span className="text-[9px] font-mono uppercase font-bold text-slate-400 block tracking-wider">
                              Severity Rating
                            </span>
                            <span className={`inline-block text-[10px] font-bold font-mono px-1.5 py-0.2 rounded border uppercase tracking-wider ${
                              editedAiValues.severity === 'Critical' ? 'bg-rose-50 text-rose-800 border-rose-200' :
                              editedAiValues.severity === 'High' ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-teal-50 text-teal-800 border-teal-200'
                            }`}>
                              {editedAiValues.severity}
                            </span>
                          </div>

                          <div className="p-2.5 bg-white space-y-0.5">
                            <span className="text-[9px] font-mono uppercase font-bold text-slate-400 block tracking-wider">
                              Language
                            </span>
                            <span className="font-medium font-mono text-slate-800 text-[11px] block">
                              {aiResult.language}
                            </span>
                          </div>

                          <div className="p-2.5 bg-white space-y-0.5">
                            <span className="text-[9px] font-mono uppercase font-bold text-slate-400 block tracking-wider">
                              Domain
                            </span>
                            <span className="font-semibold text-teal-900 text-[11px] block truncate">
                              {aiResult.recommendedInfrastructureDomain || `${editedAiValues.category} Works`}
                            </span>
                          </div>
                        </div>

                        {/* Row 2: Standardized Problem */}
                        <div className="p-3 space-y-0.5 bg-white">
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                            Standardized Problem Classification
                          </span>
                          <span className="font-bold text-slate-900 text-xs block">
                            {editedAiValues.problemType}
                          </span>
                        </div>

                        {/* Row 3: Objective Summary */}
                        <div className="p-3 space-y-0.5 bg-white">
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                            Objective Civic Summary
                          </span>
                          <p className="text-slate-700 text-[11px] leading-relaxed font-normal">
                            {editedAiValues.summary}
                          </p>
                        </div>

                        {/* Row 4: Location & Services */}
                        <div className="p-3 bg-white grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-0.5">
                            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                              Location Context
                            </span>
                            <span className="font-medium text-slate-800 text-[11px] block" title={getComputedLocation()}>
                              {getComputedLocation()}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                              Impacted Public Services
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {editedAiValues.affectedServices.map((srv, idx) => (
                                <span 
                                  key={idx}
                                  className="text-[10px] bg-slate-50 text-slate-700 px-1.5 py-0.2 rounded border border-slate-200 font-medium"
                                >
                                  {srv}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                      </div>
                    ) : (
                      /* Citizen Inline Edit Form */
                      <div className="p-3.5 space-y-2.5 text-xs bg-white">
                        <div>
                          <label className="block text-[10px] font-mono font-bold text-slate-600 uppercase mb-0.5">Category</label>
                          <select
                            value={editedAiValues.category}
                            onChange={(e) => setEditedAiValues(prev => ({ ...prev, category: e.target.value }))}
                            className="w-full text-xs bg-white border border-slate-200 rounded p-1.5 focus:outline-none focus:ring-1 focus:ring-teal-700"
                          >
                            {DEMAND_CATEGORIES.map(c => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono font-bold text-slate-600 uppercase mb-0.5">Problem Classification</label>
                          <input
                            type="text"
                            value={editedAiValues.problemType}
                            onChange={(e) => setEditedAiValues(prev => ({ ...prev, problemType: e.target.value }))}
                            className="w-full text-xs bg-white border border-slate-200 rounded p-1.5 focus:outline-none focus:ring-1 focus:ring-teal-700"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono font-bold text-slate-600 uppercase mb-0.5">Severity</label>
                          <select
                            value={editedAiValues.severity}
                            onChange={(e) => setEditedAiValues(prev => ({ ...prev, severity: e.target.value }))}
                            className="w-full text-xs bg-white border border-slate-200 rounded p-1.5 focus:outline-none focus:ring-1 focus:ring-teal-700"
                          >
                            <option value="Critical">Critical</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono font-bold text-slate-600 uppercase mb-0.5">Civic Summary</label>
                          <textarea
                            rows={2}
                            value={editedAiValues.summary}
                            onChange={(e) => setEditedAiValues(prev => ({ ...prev, summary: e.target.value }))}
                            className="w-full text-xs bg-white border border-slate-200 rounded p-1.5 focus:outline-none focus:ring-1 focus:ring-teal-700"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Mandatory Neutral Civic Disclaimer */}
                  <div className="p-2.5 bg-slate-50 rounded-md border border-slate-200 text-[11px] text-slate-600 flex items-center gap-2">
                    <Info className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>
                      <strong>Institutional Notice:</strong> "AI-assisted interpretation. Review and confirm before submission."
                    </span>
                  </div>

                  {/* Citizen Action Buttons */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setStep(STEP_PRIVACY)}
                      className="text-xs text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmAndContinue}
                      className="inline-flex items-center gap-1.5 bg-teal-800 hover:bg-teal-900 text-white font-semibold px-4 py-2 rounded-md text-xs shadow-xs transition-colors cursor-pointer border border-teal-900"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Confirm & Index into Hotspot</span>
                    </button>
                  </div>
                </>
              )}

              {/* State C: Successfully Indexed Screen (PART 12) */}
              {!isAiLoading && isSubmittedSuccess && (
                <div className="p-5 text-center space-y-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-teal-900 font-mono">
                      YOUR REQUEST HAS BEEN UNDERSTOOD
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-1 max-w-sm mx-auto font-medium">
                      Your voice has been structured and recorded into ANTICRO's citizen intelligence layer.
                    </p>
                  </div>

                  {/* Understood details */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-left text-xs space-y-1.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500 font-medium">Category:</span>
                      <span className="font-semibold text-slate-900">{editedAiValues.category || category}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500 font-medium">Severity:</span>
                      <span className={`font-semibold ${
                        editedAiValues.severity === 'Critical' ? 'text-rose-700' :
                        editedAiValues.severity === 'High' ? 'text-amber-700' : 'text-teal-800'
                      }`}>{editedAiValues.severity}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500 font-medium">Location:</span>
                      <span className="font-semibold text-slate-800 truncate max-w-[280px]" title={getComputedLocation()}>
                        {getComputedLocation()}
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px] pt-1 border-t border-slate-200/60">
                      <span className="text-slate-400">Public Pseudonym:</span>
                      <span className="font-mono text-slate-600">Citizen #A7K29</span>
                    </div>
                  </div>

                  {/* Demand Intelligence Match or Emerging Pattern */}
                  <div className="space-y-2">
                    <div className="text-left">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono block">
                        DEMAND INTELLIGENCE
                      </span>
                      <p className="text-[11px] text-slate-600">
                        This request may contribute to a broader infrastructure demand pattern.
                      </p>
                    </div>

                    {matchedHotspotResult ? (
                      <div className="p-3.5 bg-teal-50/70 border border-teal-200/90 rounded-xl text-left space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-950 font-mono flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-teal-700" />
                            <span>MATCHED DEMAND HOTSPOT</span>
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-teal-100 text-teal-900 font-mono font-semibold">
                            {matchedHotspotResult.id}
                          </span>
                        </div>

                        <div className="text-xs font-extrabold text-slate-900">
                          {matchedHotspotResult.title || matchedHotspotResult.name}
                        </div>

                        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-teal-100 text-xs">
                          <div>
                            <span className="text-[10px] text-slate-500 block uppercase">Related Reports</span>
                            <span className="font-mono font-bold text-teal-950">
                              {(matchedHotspotResult.reportCount || matchedHotspotResult.relatedReportsCount || 1) + 1} reports
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 block uppercase">Priority</span>
                            <span className="font-mono font-bold text-teal-950">
                              {matchedHotspotResult.priorityScore || 91} / 100 ({matchedHotspotResult.priorityLevel || 'Critical'})
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 block uppercase">Evidence</span>
                            <span className="font-mono font-bold text-teal-950">
                              {matchedHotspotResult.citizenEvidenceCount || 427} records
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-left text-xs text-slate-600">
                        <p className="font-medium text-slate-800">
                          No existing hotspot match. This request may contribute to a new emerging demand pattern.
                        </p>
                        <p className="text-[11px] text-slate-500 mt-1">
                          As more nearby residents report similar issues, ANTICRO will automatically cluster them into a prioritized infrastructure demand hotspot.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* PART 13: CITIZEN OUTCOME VIEW — WHAT HAPPENED? */}
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-left space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 font-mono flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-teal-700" />
                        <span>WHAT HAPPENED? (ACCOUNTABILITY TRACKING)</span>
                      </span>
                      <span className="text-[10px] font-medium text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                        Under Review
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Related Capital Project:</span>
                        <span className="font-bold text-slate-900 truncate block">
                          {matchedHotspotResult?.linkedProjectId ? `Tracked Project #${matchedHotspotResult.linkedProjectId.toUpperCase()}` : 'Ward 42 Drainage Improvement (PR-01)'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">Project Status & Progress:</span>
                        <span className="font-bold text-teal-900 block font-mono">
                          In Progress (64% Complete)
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/80 text-[11px] text-slate-600 flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                      <span>
                        <strong>Community Impact:</strong> Your report contributed to the community evidence base for this infrastructure issue.
                      </span>
                    </div>
                  </div>

                  {/* Safety language: Do not promise government action */}
                  <div className="p-2.5 bg-amber-50/70 border border-amber-200/80 rounded-lg text-left text-[10px] text-amber-900 flex items-start gap-1.5">
                    <Info className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                    <span>
                      AI-assisted decision support. Final municipal prioritization requires human, engineering, budgetary, and government review. ANTICRO does not promise unilateral administrative action.
                    </span>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-2">
                    {matchedHotspotResult?.linkedProjectId && (
                      <button
                        type="button"
                        onClick={() => {
                          handleResetAndClose();
                          navigate(`/project/${matchedHotspotResult.linkedProjectId}`);
                        }}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 bg-indigo-900 hover:bg-indigo-950 text-white font-medium py-2 px-3 rounded-lg text-xs shadow-xs transition-colors cursor-pointer"
                      >
                        <Layers className="w-3.5 h-3.5 text-indigo-200" />
                        <span>Track Project #{matchedHotspotResult.linkedProjectId.toUpperCase()}</span>
                      </button>
                    )}
                    {matchedHotspotResult ? (
                      <button
                        type="button"
                        onClick={() => {
                          handleResetAndClose();
                          navigate(`/decision-view/${matchedHotspotResult.id}`);
                        }}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 bg-teal-800 hover:bg-teal-900 text-white font-medium py-2 px-3 rounded-lg text-xs shadow-xs transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-teal-200" />
                        <span>View in Decision View</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          handleResetAndClose();
                          navigate('/decision-view');
                        }}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 bg-teal-800 hover:bg-teal-900 text-white font-medium py-2 px-3 rounded-lg text-xs shadow-xs transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-teal-200" />
                        <span>Open Government Decision View</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        handleResetAndClose();
                        navigate('/intelligence');
                      }}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg text-xs transition-colors cursor-pointer"
                    >
                      All Hotspots
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
