import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  Cpu,
  Languages,
  ChevronDown,
  Check,
  Zap,
  Bot,
  PhoneCall,
  PhoneOff,
  PhoneForwarded,
  Volume2,
  MessageSquare,
  Send,
  ShieldCheck,
  Mic,
  MicOff,
  Radio,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AgencySettings } from '../types';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '../data/skillTranslations';
import { UI_TRANSLATIONS } from '../data/uiTranslations';
import { CONVERSATION_SCRIPTS } from '../data/simulatorDialogues';
import { StorageService } from '../lib/storage';

interface HeroSectionProps {
  settings: AgencySettings;
  onExploreWork: () => void;
  onExploreSkills: () => void;
  onUpdateSettings?: (settings: AgencySettings) => void;
  currentLanguage?: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  settings,
  onExploreWork,
  onExploreSkills,
  currentLanguage = 'te',
  onLanguageChange,
}) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState<boolean>(false);
  const [rotatingIndex, setRotatingIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'call' | 'whatsapp'>('call');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.te;

  // Conversational Call State: 'greeting' -> 'needs' -> 'name' -> 'contact' -> 'closing' -> 'ended'
  type ConvStep = 'greeting' | 'needs' | 'name' | 'contact' | 'closing' | 'ended';
  const [callState, setCallState] = useState<'idle' | 'ringing' | 'connected' | 'ended'>('idle');
  const [convStep, setConvStep] = useState<ConvStep>('greeting');
  const [callSeconds, setCallSeconds] = useState<number>(0);
  const [isSpeakingVoice, setIsSpeakingVoice] = useState<boolean>(false);
  const [isListeningMic, setIsListeningMic] = useState<boolean>(false);
  const [liveVoiceTranscript, setLiveVoiceTranscript] = useState<string>('');
  const [micPermissionError, setMicPermissionError] = useState<string | null>(null);

  // Collected Lead data in Call
  const [callLeadData, setCallLeadData] = useState<{
    serviceNeeded: string;
    clientName: string;
    contactDetail: string;
  }>({
    serviceNeeded: '',
    clientName: '',
    contactDetail: '',
  });

  // Current Bot Spoken Message in Call
  const [activeBotSpokenText, setActiveBotSpokenText] = useState<string>('');

  // Speech Recognition Ref
  const recognitionRef = useRef<any>(null);

  // WhatsApp Simulation State
  const [chatConvStep, setChatConvStep] = useState<ConvStep>('greeting');
  const [chatLeadData, setChatLeadData] = useState<{
    serviceNeeded: string;
    clientName: string;
    contactDetail: string;
  }>({
    serviceNeeded: '',
    clientName: '',
    contactDetail: '',
  });
  const [chatMessages, setChatMessages] = useState<
    Array<{ sender: 'user' | 'bot'; text: string; time: string }>
  >([]);
  const [userChatInput, setUserChatInput] = useState<string>('');
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Dynamic animated service headlines
  const dynamicHeadlines = [
    {
      badge: '24/7 AUTONOMOUS VOICE AI',
      badgeTe: '24/7 AI వాయిస్ కాలింగ్',
      titleTe: 'AI వాయిస్ కాలింగ్ ఏజెంట్లు & లీడ్ ఆటోమేషన్',
      titleEn: 'Autonomous AI Voice Calling Agents & Reception',
      highlightTe: 'కాల్స్ మిస్ అవ్వకుండా 24/7 లీడ్స్ & క్యాలెండర్ బుకింగ్స్',
      highlightEn: 'Zero missed customer calls with sub-0.5s voice response',
      color: 'from-amber-400 via-yellow-200 to-amber-500',
    },
    {
      badge: 'SMART RAG CHATBOTS',
      badgeTe: 'వాట్సాప్ AI చాట్‌బాట్',
      titleTe: 'వాట్సాప్ & వెబ్ AI లీడ్ కన్వర్షన్ చాట్‌బాట్స్',
      titleEn: 'WhatsApp & Web AI Lead Generation Chatbots',
      highlightTe: 'కస్టమర్లకు క్షణాల్లో సమాధానాలు & సేల్స్ బుకింగ్స్',
      highlightEn: 'Instant context-aware customer resolution in under 2 seconds',
      color: 'from-cyan-400 via-sky-200 to-blue-500',
    },
    {
      badge: 'LOCAL SEO & MAPS 3-PACK',
      badgeTe: 'గూగుల్ మ్యాప్స్ లోకల్ SEO',
      titleTe: 'గూగుల్ మ్యాప్స్ స్టోర్ ర్యాంకింగ్ & 5-స్టార్ గ్రోత్',
      titleEn: 'Google Maps Store Dominance & 5-Star Growth',
      highlightTe: 'లోకల్ ఏరియాలో కస్టమర్లు వెతికినప్పుడు మీ బిజినెస్ #1 లో కనిపించేలా',
      highlightEn: 'Top Local 3-Pack placement driving 300%+ footfall & direct calls',
      color: 'from-blue-400 via-indigo-200 to-cyan-400',
    },
    {
      badge: 'WORKFLOW ENGINE',
      badgeTe: 'బిజినెస్ ఆటోమేషన్',
      titleTe: 'ఆటోమేటిక్ బిజినెస్ CRM & బిల్లింగ్ వర్క్‌ఫ్లోలు',
      titleEn: 'Enterprise Business Process & CRM Automation',
      highlightTe: 'డేటా ఎంట్రీ లేకుండా కొటేషన్లు, లీడ్స్ & అలర్ట్స్ ఆటోమేషన్',
      highlightEn: 'Automated CRM sync, instant PDF proposals & multi-channel alerts',
      color: 'from-emerald-400 via-teal-200 to-cyan-400',
    },
    {
      badge: 'MODERN 3D WEB',
      badgeTe: 'హై-స్పీడ్ 3D వెబ్‌సైట్స్',
      titleTe: 'హై-స్పీడ్ 3D వెబ్‌సైట్లు & లగ్జరీ వెబ్ అనుభూతి',
      titleEn: 'Next-Gen 3D Interactive Web Applications',
      highlightTe: 'Three.js యానిమేషన్స్ మరియు 100/100 లైట్‌హౌస్ పెర్ఫార్మెన్స్ స్కోర్',
      highlightEn: 'Ultra-fast conversion-focused digital experiences built to scale',
      color: 'from-purple-400 via-pink-200 to-cyan-400',
    },
  ];

  // Rotate headline every 4.2s
  useEffect(() => {
    const timer = setInterval(() => {
      setRotatingIndex((prev) => (prev + 1) % dynamicHeadlines.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [dynamicHeadlines.length]);

  // Initial chat setup based on currentLanguage
  useEffect(() => {
    const script = CONVERSATION_SCRIPTS[currentLanguage] || CONVERSATION_SCRIPTS.te;
    setChatMessages([
      {
        sender: 'bot',
        text: script.whatsappGreeting,
        time: 'Just now',
      },
    ]);
    setChatConvStep('needs');
  }, [currentLanguage]);

  // Auto-scroll chat window
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isBotTyping]);

  // Phone Call Duration Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callState === 'connected') {
      interval = setInterval(() => {
        setCallSeconds((s) => s + 1);
      }, 1000);
    } else {
      setCallSeconds(0);
    }
    return () => clearInterval(interval);
  }, [callState]);

  // Map language code to Speech Recognition / Synthesis BCP 47 tag
  const getLangCode = (lang?: string): string => {
    const map: Record<string, string> = {
      te: 'te-IN',
      en: 'en-IN',
      hi: 'hi-IN',
      ta: 'ta-IN',
      kn: 'kn-IN',
      ml: 'ml-IN',
    };
    return (lang && map[lang]) || 'te-IN';
  };

  // Stop any active Speech Recognition
  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.stop();
      } catch (_) {}
      recognitionRef.current = null;
    }
    setIsListeningMic(false);
  };

  // Start Speech Recognition to listen to client's voice hands-free
  const startListeningForClientVoice = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognitionClass =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setMicPermissionError('Browser speech recognition not available. You can tap quick answers below!');
      return;
    }

    try {
      stopSpeechRecognition();
      const recognition = new SpeechRecognitionClass();
      recognition.lang = getLangCode(currentLanguage);
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListeningMic(true);
        setMicPermissionError(null);
        setLiveVoiceTranscript('');
      };

      recognition.onresult = (event: any) => {
        let interimText = '';
        let finalText = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalText += event.results[i][0].transcript;
          } else {
            interimText += event.results[i][0].transcript;
          }
        }

        const currentSpoken = finalText || interimText;
        if (currentSpoken) {
          setLiveVoiceTranscript(currentSpoken);
        }

        if (finalText && finalText.trim().length > 0) {
          stopSpeechRecognition();
          handleClientVoiceInputReceived(finalText.trim());
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error/timeout:', event.error);
        setIsListeningMic(false);
        if (event.error === 'not-allowed') {
          setMicPermissionError('Microphone permission blocked. Please allow mic access or use tap options.');
        }
      };

      recognition.onend = () => {
        setIsListeningMic(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.warn('Failed to start speech recognition:', err);
      setIsListeningMic(false);
    }
  };

  // Handle Speech Synthesis (Bot speaking)
  const playVoiceAudio = (text: string, onDoneCallback?: () => void) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      stopSpeechRecognition();
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.96;
      utterance.pitch = 1.05;
      utterance.lang = getLangCode(currentLanguage);

      utterance.onstart = () => {
        setIsSpeakingVoice(true);
        setIsListeningMic(false);
      };

      utterance.onend = () => {
        setIsSpeakingVoice(false);
        if (onDoneCallback) {
          onDoneCallback();
        } else {
          // Immediately listen to user's voice
          startListeningForClientVoice();
        }
      };

      utterance.onerror = () => {
        setIsSpeakingVoice(false);
        if (onDoneCallback) onDoneCallback();
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  // Process the spoken client answer automatically
  const handleClientVoiceInputReceived = (voiceText: string) => {
    if (!voiceText || voiceText.trim().length === 0) return;

    const answer = voiceText.trim();
    const script = CONVERSATION_SCRIPTS[currentLanguage] || CONVERSATION_SCRIPTS.te;

    if (convStep === 'needs' || convStep === 'greeting') {
      // Step 1: Client specified their required service -> Ask for client's name
      setCallLeadData((prev) => ({ ...prev, serviceNeeded: answer }));
      setConvStep('name');
      const botResponse = script.askName;
      setActiveBotSpokenText(botResponse);
      playVoiceAudio(botResponse);
    } else if (convStep === 'name') {
      // Step 2: Client gave their name -> Ask for phone / email
      setCallLeadData((prev) => ({ ...prev, clientName: answer }));
      setConvStep('contact');
      const botResponse = script.askContact;
      setActiveBotSpokenText(botResponse);
      playVoiceAudio(botResponse);
    } else if (convStep === 'contact') {
      // Step 3: Client gave contact info -> Final thank you, deliver lead to elitedigitalagency1145@gmail.com
      const finalContact = answer;
      const finalLead = {
        ...callLeadData,
        contactDetail: finalContact,
      };
      setCallLeadData(finalLead);
      setConvStep('closing');

      const step1Q = script.greeting;
      const step1A = finalLead.serviceNeeded;
      const step2Q = script.askName;
      const step2A = finalLead.clientName;
      const step3Q = script.askContact;
      const step3A = finalContact;
      const step4Close = script.thankYouClose;

      const fullVoiceTranscript = `======================================================
🎙️ 2026 LIVE AI VOICE AGENT - FULL CONVERSATION TRANSCRIPT
======================================================
⏱️ Duration: ${callSeconds}s | 🌐 Language: ${currentLanguage}
🕒 Call Date & Time: ${new Date().toLocaleString()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 COMPLETE STEP-BY-STEP DIALOGUE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣ [STEP 1: SERVICE INQUIRY]
🤖 Agent Asked: "${step1Q}"
🗣️ Client Replied: "${step1A}"

2️⃣ [STEP 2: CLIENT NAME]
🤖 Agent Asked: "${step2Q}"
🗣️ Client Replied: "${step2A}"

3️⃣ [STEP 3: CONTACT NUMBER / EMAIL]
🤖 Agent Asked: "${step3Q}"
🗣️ Client Replied: "${step3A}"

4️⃣ [STEP 4: CLOSING CONFIRMATION]
🤖 Agent Closed: "${step4Close}"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 SUMMARY CLIENT PROFILE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Client Name: ${finalLead.clientName}
• Service Required: ${finalLead.serviceNeeded}
• Phone / Email: ${finalContact}
• Channel: Hands-Free Voice-to-Voice AI Call
• Destination: elitedigitalagency1145@gmail.com
======================================================`;

      // Dispatch full conversation transcript to elitedigitalagency1145@gmail.com
      StorageService.addInquiry({
        name: finalLead.clientName || 'Live Voice Client',
        email: finalContact.includes('@') ? finalContact : 'elitedigitalagency1145@gmail.com',
        phone: !finalContact.includes('@') ? finalContact : '',
        service: finalLead.serviceNeeded || 'AI Voice Agent Client Inquiry',
        message: fullVoiceTranscript,
        source: 'Live Voice AI Call 2026 (Hands-Free Voice Recognition)',
        language: currentLanguage,
        transcriptDetails: {
          step1Question: step1Q,
          step1Answer: step1A,
          step2Question: step2Q,
          step2Answer: step2A,
          step3Question: step3Q,
          step3Answer: step3A,
          closingMessage: step4Close,
        },
      });

      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#06b6d4', '#10b981'],
        });
      } catch (_) {}

      const botResponse = script.thankYouClose;
      setActiveBotSpokenText(botResponse);
      playVoiceAudio(botResponse, () => {
        // When closing speech finishes, close call gracefully
        setTimeout(() => {
          handleEndCall();
        }, 3000);
      });
    }
  };

  // Start Call Simulation
  const handleStartCall = () => {
    setCallState('ringing');
    setCallLeadData({ serviceNeeded: '', clientName: '', contactDetail: '' });
    setLiveVoiceTranscript('');
    setMicPermissionError(null);

    setTimeout(() => {
      setCallState('connected');
      setConvStep('needs');
      const script = CONVERSATION_SCRIPTS[currentLanguage] || CONVERSATION_SCRIPTS.te;
      setActiveBotSpokenText(script.greeting);
      playVoiceAudio(script.greeting);
    }, 1300);
  };

  // End Call Simulation
  const handleEndCall = () => {
    stopSpeechRecognition();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeakingVoice(false);
    setIsListeningMic(false);
    setCallState('ended');
    setTimeout(() => {
      setCallState('idle');
      setConvStep('greeting');
      setLiveVoiceTranscript('');
    }, 2400);
  };

  // WhatsApp Simulation Handle Send
  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userChatInput.trim()) return;

    const userText = userChatInput.trim();
    const newMsg = {
      sender: 'user' as const,
      text: userText,
      time: 'Just now',
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setUserChatInput('');
    setIsBotTyping(true);

    const script = CONVERSATION_SCRIPTS[currentLanguage] || CONVERSATION_SCRIPTS.te;

    setTimeout(() => {
      setIsBotTyping(false);
      let reply = '';

      if (chatConvStep === 'greeting' || chatConvStep === 'needs') {
        setChatLeadData((prev) => ({ ...prev, serviceNeeded: userText }));
        setChatConvStep('name');
        reply = script.askName;
      } else if (chatConvStep === 'name') {
        setChatLeadData((prev) => ({ ...prev, clientName: userText }));
        setChatConvStep('contact');
        reply = script.askContact;
      } else if (chatConvStep === 'contact') {
        const finalContact = userText;
        const finalLead = { ...chatLeadData, contactDetail: finalContact };
        setChatLeadData(finalLead);
        setChatConvStep('closing');

        const step1Q = script.whatsappGreeting;
        const step1A = finalLead.serviceNeeded;
        const step2Q = script.askName;
        const step2A = finalLead.clientName;
        const step3Q = script.askContact;
        const step3A = finalContact;
        const step4Close = script.thankYouClose;

        const fullWhatsappTranscript = `======================================================
📱 2026 WHATSAPP AI CHATBOT - FULL CONVERSATION TRANSCRIPT
======================================================
🌐 Language: ${currentLanguage}
🕒 Date & Time: ${new Date().toLocaleString()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 COMPLETE STEP-BY-STEP CHAT LOG:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣ [STEP 1: SERVICE INQUIRY]
🤖 Agent Asked: "${step1Q}"
👤 Client Replied: "${step1A}"

2️⃣ [STEP 2: CLIENT NAME]
🤖 Agent Asked: "${step2Q}"
👤 Client Replied: "${step2A}"

3️⃣ [STEP 3: CONTACT DETAILS]
🤖 Agent Asked: "${step3Q}"
👤 Client Replied: "${step3A}"

4️⃣ [STEP 4: CONCLUSION]
🤖 Agent Closed: "${step4Close}"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 SUMMARY CLIENT PROFILE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Client Name: ${finalLead.clientName}
• Service Requested: ${finalLead.serviceNeeded}
• Contact Details: ${finalContact}
• Channel: WhatsApp AI Chatbot Simulator
• Destination: elitedigitalagency1145@gmail.com
======================================================`;

        StorageService.addInquiry({
          name: finalLead.clientName || 'WhatsApp Lead',
          email: finalContact.includes('@') ? finalContact : 'elitedigitalagency1145@gmail.com',
          phone: !finalContact.includes('@') ? finalContact : '',
          service: finalLead.serviceNeeded || 'WhatsApp Consultation',
          message: fullWhatsappTranscript,
          source: 'WhatsApp AI Simulator',
          language: currentLanguage,
          transcriptDetails: {
            step1Question: step1Q,
            step1Answer: step1A,
            step2Question: step2Q,
            step2Answer: step2A,
            step3Question: step3Q,
            step3Answer: step3A,
            closingMessage: step4Close,
          },
        });

        reply = script.thankYouClose;

        try {
          confetti({
            particleCount: 50,
            spread: 50,
            origin: { y: 0.6 },
            colors: ['#10b981', '#06b6d4', '#f59e0b'],
          });
        } catch (_) {}
      } else {
        reply = script.serviceKeywordMatchReplies.default;
      }

      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: reply,
          time: 'Just now',
        },
      ]);
    }, 1100);
  };

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (langCode: SupportedLanguage) => {
    if (onLanguageChange) {
      onLanguageChange(langCode);
    }
    setLangDropdownOpen(false);
  };

  const activeHeadline = dynamicHeadlines[rotatingIndex];

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 sm:pt-32 pb-16 lg:pb-24 text-center"
    >
      {/* Background Ambient Glow Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[500px] sm:h-[650px] bg-gradient-to-tr from-cyan-600/15 via-violet-600/15 to-amber-500/10 blur-[140px] rounded-full pointer-events-none -z-10 animate-pulse duration-1000" />
      <div className="absolute top-1/2 right-[-10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-[-5%] w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Main Container - Centered */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center z-10 text-center">
        
        {/* Top Control Bar: Centered Pill & Language Selector */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6 sm:mb-8">
          
          {/* Active Agency Live Status */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/15 backdrop-blur-xl shadow-lg"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
              {currentLanguage === 'te' ? '2026 AI ఏజెన్సీ సిస్టమ్స్ ఆన్' : '2026 AI AGENCY SYSTEMS ACTIVE'}
            </span>
          </motion.div>

          {/* Language Selector Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-cyan-400/50 backdrop-blur-xl text-xs font-semibold text-white flex items-center gap-2 transition-all cursor-pointer shadow-md"
              title="Select spoken language"
            >
              <Languages className="w-3.5 h-3.5 text-cyan-400" />
              <span>
                {SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage)?.flag}{' '}
                {SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage)?.nativeName}
              </span>
              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 rounded-2xl bg-[#090e1d]/95 border border-white/20 backdrop-blur-2xl shadow-2xl p-1.5 z-50 overflow-hidden text-left"
                >
                  <div className="px-2.5 py-1.5 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider border-b border-white/10">
                    Select Agent Language
                  </div>
                  <div className="py-1 space-y-0.5">
                    {SUPPORTED_LANGUAGES.map((lang) => {
                      const isSelected = currentLanguage === lang.code;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => handleSelectLanguage(lang.code)}
                          className={`w-full px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/30'
                              : 'text-slate-300 hover:text-white hover:bg-white/[0.08]'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{lang.flag}</span>
                            <span>{lang.nativeName}</span>
                            <span className="text-[10px] text-slate-400">({lang.name})</span>
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Centered Main Brand & Animated Headlines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center space-y-5 max-w-4xl"
        >
          {/* Animated Eyebrow Badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={rotatingIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-cyan-500/10 to-emerald-500/10 border border-white/20 backdrop-blur-xl shadow-md"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-cyan-300 to-emerald-300">
                {currentLanguage === 'te' ? activeHeadline.badgeTe : activeHeadline.badge}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Main Brand Title - Centered */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white font-heading tracking-tight leading-[1.1] text-center">
            {settings.brand_name.split(' ')[0]}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-amber-300">
              {settings.brand_name.split(' ').slice(1).join(' ') || 'Digital Agency'}
            </span>
          </h1>

          {/* Dynamic Service Sub-Headline - Centered */}
          <div className="min-h-[64px] sm:min-h-[76px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={rotatingIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="space-y-1.5 text-center"
              >
                <p className="text-xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
                  {currentLanguage === 'te' ? activeHeadline.titleTe : activeHeadline.titleEn}
                </p>
                <p className="text-sm sm:text-base font-normal text-cyan-300/90 font-sans">
                  ✦ {currentLanguage === 'te' ? activeHeadline.highlightTe : activeHeadline.highlightEn}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Paragraph Description - Centered */}
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl text-center">
            {currentLanguage === 'te'
              ? 'మేము అత్యాధునిక ఏఐ వాయిస్ కాలింగ్ ఏజెంట్లు, గూగుల్ మ్యాప్స్ లోకల్ స్టోర్ సెటప్, ఆటోమేటిక్ లీడ్ వర్క్‌ఫ్లోలు మరియు హై-కన్వర్షన్ వెబ్‌సైట్లను నిర్మిస్తాము. మీ వ్యాపారాన్ని తదుపరి స్థాయికి తీసుకెళ్లడానికి లైవ్ ఏఐ సిమ్యులేటర్‌ని ఇప్పుడే పరీక్షించండి.'
              : settings.hero_description}
          </p>

          {/* Verified Capabilities Badges - Centered */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {[
              currentLanguage === 'te' ? '24/7 AI వాయిస్ కాలింగ్' : '24/7 AI Voice Calling',
              currentLanguage === 'te' ? 'గూగుల్ మ్యాప్స్ సెటప్' : 'Google Maps Store Setup',
              currentLanguage === 'te' ? 'స్మార్ట్ RAG చాట్‌బాట్స్' : 'Smart RAG Chatbots',
              currentLanguage === 'te' ? 'ఆటోమేటిక్ CRM లీడ్స్' : 'Automatic CRM Sync',
              currentLanguage === 'te' ? 'హై-స్పీడ్ 3D వెబ్' : 'High-Speed 3D Web',
            ].map((pill, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-xs font-mono text-slate-300 bg-white/[0.04] border border-white/10 flex items-center gap-1.5 backdrop-blur-md"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                {pill}
              </span>
            ))}
          </div>

          {/* Action CTA Buttons - Centered */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto pt-2">
            <button
              onClick={onExploreWork}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-heading font-bold text-xs uppercase tracking-widest text-black bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 hover:from-cyan-300 hover:to-amber-200 shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2 group hover:scale-105"
            >
              <span>{t.hero.viewProjects}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreSkills}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-heading font-bold text-xs uppercase tracking-widest text-white bg-white/[0.06] hover:bg-white/[0.14] border border-white/20 hover:border-cyan-400/60 backdrop-blur-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:scale-105"
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>{t.hero.exploreSkills}</span>
            </button>
          </div>
        </motion.div>

        {/* Live Interactive AI Simulator 2026 Console - Centered Directly Below */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-2xl mt-12"
        >
          <div className="relative rounded-[28px] bg-[#070f26]/95 border border-white/20 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.85)] p-5 sm:p-6 overflow-hidden flex flex-col text-left">
            
            {/* Ambient Corner Lights */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-bl-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-400/10 rounded-tr-[80px] pointer-events-none" />

            {/* Console Header & Tabs */}
            <div className="flex flex-col space-y-3 pb-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-200">
                    LIVE AI SIMULATOR 2026 (VOICE MIC RECEIVER)
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  FORWARDING TO GMAIL
                </span>
              </div>

              {/* 2 Focused Modes: AI Voice & WhatsApp */}
              <div className="grid grid-cols-2 gap-2 p-1.5 rounded-xl bg-black/40 border border-white/10">
                <button
                  onClick={() => setActiveTab('call')}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'call'
                      ? 'bg-amber-400 text-black font-bold shadow-md scale-102'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>AI Voice Agent Call</span>
                </button>

                <button
                  onClick={() => setActiveTab('whatsapp')}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    activeTab === 'whatsapp'
                      ? 'bg-cyan-400 text-black font-bold shadow-md scale-102'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp AI Chat</span>
                </button>
              </div>
            </div>

            {/* TAB 1: AI Voice Calling Simulator (Hands-Free Voice Listening & Speech Recognition) */}
            {activeTab === 'call' && (
              <div className="pt-4 flex flex-col items-center space-y-4 text-center">
                {callState === 'idle' && (
                  <div className="space-y-4 py-3 flex flex-col items-center w-full">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500/20 to-yellow-400/30 border border-amber-400/40 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                        <Bot className="w-10 h-10 text-amber-400" />
                      </div>
                      <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#070f26] flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white font-heading">
                        {currentLanguage === 'te' ? 'వాయిస్-టు-వాయిస్ AI కాలింగ్ సిమ్యులేటర్' : 'Hands-Free Voice-to-Voice AI Agent'}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 max-w-sm leading-relaxed">
                        {currentLanguage === 'te'
                          ? 'టైప్ చేయాల్సిన అవసరం లేదు! స్టార్ట్ చేసి నేరుగా మాట్లాడండి. మా AI మీ మాటలను విని, వివరాలను నమోదు చేసుకుంటుంది.'
                          : 'No typing needed! Start the call and speak naturally. Our AI listens to your voice, responds verbally, and captures your project requirements.'}
                      </p>
                    </div>

                    <button
                      onClick={handleStartCall}
                      className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black font-bold font-heading text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(52,211,153,0.5)] transition-all hover:scale-105 cursor-pointer flex items-center gap-2"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>{currentLanguage === 'te' ? '📞 లైవ్ AI కాల్ స్టార్ట్ చేయండి' : '📞 Start Live Voice Call'}</span>
                    </button>
                  </div>
                )}

                {callState === 'ringing' && (
                  <div className="space-y-4 py-8 flex flex-col items-center animate-pulse">
                    <div className="w-20 h-20 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_35px_rgba(34,211,238,0.5)]">
                      <PhoneForwarded className="w-10 h-10 text-cyan-400 animate-bounce" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest">
                        CONNECTING LIVE VOICE AGENT ({SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage)?.name})...
                      </span>
                      <h3 className="text-lg font-bold text-white mt-1">Elite AI Voice Assistant</h3>
                    </div>
                  </div>
                )}

                {callState === 'connected' && (
                  <div className="space-y-3 py-1 w-full flex flex-col items-center">
                    <div className="flex items-center justify-between w-full px-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-xs font-mono text-emerald-400 font-bold">
                          CALL ACTIVE (00:{callSeconds < 10 ? `0${callSeconds}` : callSeconds})
                        </span>
                      </div>
                      <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-amber-300 font-bold">
                        {SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage)?.name}
                      </span>
                    </div>

                    {/* Live Waveform in Call */}
                    <div className="w-full p-3.5 rounded-2xl bg-black/50 border border-white/15 flex flex-col items-center space-y-3">
                      <div className="flex items-center gap-1 h-8 w-full justify-center">
                        {[30, 60, 90, 40, 80, 100, 50, 95, 70, 30, 85, 60, 100, 45, 90, 70, 40, 80, 50].map(
                          (h, idx) => (
                            <motion.div
                              key={idx}
                              animate={{
                                height: isSpeakingVoice || isListeningMic
                                  ? [`${h * 0.25}%`, `${h}%`, `${h * 0.25}%`]
                                  : '20%',
                              }}
                              transition={{
                                repeat: Infinity,
                                duration: isListeningMic ? 0.4 + (idx % 3) * 0.1 : 0.6 + (idx % 4) * 0.1,
                                ease: 'easeInOut',
                              }}
                              className={`w-1.5 rounded-full transition-colors ${
                                isSpeakingVoice
                                  ? 'bg-amber-400'
                                  : isListeningMic
                                  ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]'
                                  : 'bg-white/20'
                              }`}
                            />
                          )
                        )}
                      </div>

                      {/* Bot Voice Transcript */}
                      <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10 text-left w-full">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                            🤖 ELITE AI AGENT:
                          </span>
                          {isSpeakingVoice && (
                            <span className="text-[9px] text-emerald-400 font-mono flex items-center gap-1 animate-pulse">
                              <Volume2 className="w-3 h-3" /> SPEAKING
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-white mt-1 leading-relaxed font-sans">
                          {activeBotSpokenText}
                        </p>
                      </div>

                      {/* Client Voice Receiver Status & Live Speech Detection */}
                      {convStep !== 'closing' && convStep !== 'ended' && (
                        <div className="w-full p-3 rounded-xl bg-cyan-950/40 border border-cyan-400/30 flex flex-col items-center text-center space-y-2">
                          <div className="flex items-center justify-between w-full">
                            <span className="text-[10px] font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                              {isListeningMic ? (
                                <>
                                  <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                                  <span className="text-emerald-300 font-bold uppercase">
                                    {currentLanguage === 'te' ? '🎙️ మైక్ ఆన్‌లో ఉంది • మాట్లాడండి...' : '🎙️ Mic Active • Speak Now...'}
                                  </span>
                                </>
                              ) : isSpeakingVoice ? (
                                <span>AI speaks, mic will turn on next...</span>
                              ) : (
                                <span>Tap mic below to speak</span>
                              )}
                            </span>

                            <button
                              type="button"
                              onClick={() => {
                                if (isListeningMic) {
                                  stopSpeechRecognition();
                                } else {
                                  startListeningForClientVoice();
                                }
                              }}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1 cursor-pointer transition-all ${
                                isListeningMic
                                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                              }`}
                            >
                              {isListeningMic ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                              <span>{isListeningMic ? 'Stop Mic' : 'Start Mic'}</span>
                            </button>
                          </div>

                          {/* Live Transcribed Spoken Text */}
                          {liveVoiceTranscript ? (
                            <div className="w-full p-2 rounded-lg bg-black/60 border border-emerald-400/40 text-left">
                              <span className="text-[9px] font-mono text-emerald-400 block font-bold">
                                🗣️ You are saying:
                              </span>
                              <p className="text-xs text-white font-medium italic mt-0.5">
                                "{liveVoiceTranscript}"
                              </p>
                            </div>
                          ) : (
                            <p className="text-[11px] text-slate-300 italic">
                              {currentLanguage === 'te'
                                ? 'మీరు మాట్లాడుతుంటే ఆటోమేటిక్‌గా ఇక్కడ మాటలు కనిపిస్తాయి...'
                                : 'Speak into your microphone naturally...'}
                            </p>
                          )}

                          {micPermissionError && (
                            <p className="text-[10px] text-rose-300 font-mono">
                              {micPermissionError}
                            </p>
                          )}

                          {/* Quick Spoken Reply Chips (One-Tap Voice Shortcuts) */}
                          <div className="w-full pt-1">
                            <span className="text-[9px] font-mono text-slate-400 block text-left mb-1">
                              {convStep === 'needs'
                                ? 'లేదా శీఘ్ర సమాధానం ఎంచుకోండి (Or Tap Answer):'
                                : convStep === 'name'
                                ? 'మీ పేరు మాట్లాడండి (Say your name):'
                                : 'మీ ఫోన్ నంబర్ లేదా ఈమెయిల్ మాట్లాడండి (Say contact):'}
                            </span>

                            <div className="flex flex-wrap gap-1.5 justify-start">
                              {convStep === 'needs' &&
                                [
                                  'AI Voice Calling Agents',
                                  'Google Maps Setup',
                                  'AI Automations & CRM',
                                  'Modern 3D Website',
                                  'Meta Ads & Branding',
                                ].map((opt) => (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => handleClientVoiceInputReceived(opt)}
                                    className="px-2.5 py-1 rounded-lg bg-white/[0.08] hover:bg-cyan-500/20 border border-white/15 hover:border-cyan-400/40 text-[10px] text-cyan-200 transition-colors cursor-pointer"
                                  >
                                    🗣️ "{opt}"
                                  </button>
                                ))}

                              {convStep === 'name' &&
                                ['Ramesh Sharma', 'Srinivas Reddy', 'Priya Patel', 'Elite Business Client'].map((opt) => (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => handleClientVoiceInputReceived(opt)}
                                    className="px-2.5 py-1 rounded-lg bg-white/[0.08] hover:bg-amber-500/20 border border-white/15 hover:border-amber-400/40 text-[10px] text-amber-200 transition-colors cursor-pointer"
                                  >
                                    🗣️ "{opt}"
                                  </button>
                                ))}

                              {convStep === 'contact' &&
                                ['9876543210', 'client@business.com', '9123456789', 'contact@mycompany.in'].map((opt) => (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => handleClientVoiceInputReceived(opt)}
                                    className="px-2.5 py-1 rounded-lg bg-white/[0.08] hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-400/40 text-[10px] text-emerald-200 transition-colors cursor-pointer"
                                  >
                                    🗣️ "{opt}"
                                  </button>
                                ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Call Controls */}
                    <div className="flex items-center justify-between w-full pt-1">
                      <button
                        type="button"
                        onClick={() => playVoiceAudio(activeBotSpokenText)}
                        className="text-[11px] text-slate-400 hover:text-cyan-300 flex items-center gap-1 font-mono cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Replay Voice</span>
                      </button>

                      <button
                        onClick={handleEndCall}
                        className="py-1.5 px-3.5 rounded-xl bg-rose-500/80 hover:bg-rose-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                      >
                        <PhoneOff className="w-3.5 h-3.5" />
                        <span>End Call</span>
                      </button>
                    </div>
                  </div>
                )}

                {callState === 'ended' && (
                  <div className="space-y-3 py-6 flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.4)]">
                      <Check className="w-7 h-7 stroke-[3]" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white block">
                        {currentLanguage === 'te' ? 'వివరాలు విజయవంతంగా నమోదయ్యాయి!' : 'Inquiry Successfully Registered!'}
                      </span>
                      <span className="text-xs text-emerald-400 mt-1 block">
                        {currentLanguage === 'te' ? 'మా ఎలైట్ టీమ్ త్వరలోనే మిమ్మల్ని సంప్రదిస్తుంది' : 'Our team will contact you shortly'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: WhatsApp Chatbot Simulator */}
            {activeTab === 'whatsapp' && (
              <div className="pt-2 flex flex-col space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-black font-bold text-xs">
                      EDA
                    </div>
                    <div className="text-left">
                      <h4 className="text-xs font-bold text-white">Elite AI WhatsApp Assistant</h4>
                      <span className="text-[10px] text-emerald-400 font-mono">Online • Replies in {SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage)?.name}</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-cyan-300 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    Mail Sync On
                  </span>
                </div>

                {/* Chat Messages Container */}
                <div className="h-52 overflow-y-auto space-y-2.5 pr-1 text-left flex flex-col">
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex flex-col max-w-[88%] ${
                        msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                      }`}
                    >
                      <div
                        className={`p-2.5 rounded-2xl text-xs leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-cyan-500/20 text-cyan-100 border border-cyan-400/30 rounded-tr-xs'
                            : 'bg-white/10 text-slate-100 border border-white/10 rounded-tl-xs'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[9px] font-mono text-slate-500 mt-0.5">{msg.time}</span>
                    </div>
                  ))}

                  {isBotTyping && (
                    <div className="self-start p-2 rounded-xl bg-white/10 border border-white/10 flex items-center gap-1 text-[10px] text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                      <span className="ml-1 font-mono text-cyan-300">
                        {CONVERSATION_SCRIPTS[currentLanguage]?.typingIndicator || 'AI Typing...'}
                      </span>
                    </div>
                  )}
                  <div ref={chatBottomRef} />
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSendChat} className="flex gap-2">
                  <input
                    type="text"
                    value={userChatInput}
                    onChange={(e) => setUserChatInput(e.target.value)}
                    placeholder={
                      chatConvStep === 'needs'
                        ? currentLanguage === 'te'
                          ? 'ఏ సర్వీస్ కావాలి టైప్ చేయండి...'
                          : 'Tell us your project requirement...'
                        : chatConvStep === 'name'
                        ? currentLanguage === 'te'
                          ? 'మీ పేరు టైప్ చేయండి...'
                          : 'Enter your name...'
                        : chatConvStep === 'contact'
                        ? currentLanguage === 'te'
                          ? 'ఫోన్ నంబర్ / ఈమెయిల్ ఇవ్వండి...'
                          : 'Enter your phone / email...'
                        : 'Type a message...'
                    }
                    className="flex-1 bg-black/40 border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    className="p-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold cursor-pointer transition-all shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* Bottom Mail Forwarding Status */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1 text-cyan-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Forwarding: <strong className="text-white font-mono">elitedigitalagency1145@gmail.com</strong></span>
              </span>
              <span className="text-amber-400 font-bold">Sub-0.5s Latency</span>
            </div>
          </div>
        </motion.div>

        {/* Global Verified Stats Bar below Centered Hero */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 w-full p-4 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl grid grid-cols-2 md:grid-cols-4 gap-4 text-center shadow-lg"
        >
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">
              {t.hero.stats.projectsValue}
            </span>
            <span className="text-[11px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider mt-1">
              {t.hero.stats.projectsLabel}
            </span>
          </div>

          <div className="flex flex-col items-center md:border-l border-white/10">
            <span className="text-2xl sm:text-3xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-sky-400">
              {t.hero.stats.satisfactionValue}
            </span>
            <span className="text-[11px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider mt-1">
              {t.hero.stats.satisfactionLabel}
            </span>
          </div>

          <div className="flex flex-col items-center md:border-l border-white/10">
            <span className="text-2xl sm:text-3xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400">
              {t.hero.stats.callsAutomatedValue}
            </span>
            <span className="text-[11px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider mt-1">
              {t.hero.stats.callsAutomatedLabel}
            </span>
          </div>

          <div className="flex flex-col items-center md:border-l border-white/10">
            <span className="text-2xl sm:text-3xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400">
              {t.hero.stats.uptimeValue}
            </span>
            <span className="text-[11px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider mt-1">
              {t.hero.stats.uptimeLabel}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
