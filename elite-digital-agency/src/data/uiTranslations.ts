import { SupportedLanguage } from './skillTranslations';

export interface UiTranslations {
  navbar: {
    home: string;
    about: string;
    skills: string;
    projects: string;
    blogs?: string;
    contact: string;
    admin: string;
    getInTouch: string;
    chooseLanguage: string;
  };
  languageBanner: {
    title: string;
    subtitle: string;
  };
  hero: {
    badge: string;
    titlePart1: string;
    titleGradient: string;
    titlePart2: string;
    description: string;
    highlights: string[];
    exploreSkills: string;
    viewProjects: string;
    contactUs: string;
    stats: {
      projectsValue: string;
      projectsLabel: string;
      speedValue: string;
      speedLabel: string;
      satisfactionValue: string;
      satisfactionLabel: string;
    };
    hostGreeting: string;
    hostTitle: string;
    hostSubtitle: string;
    hostAudioOn: string;
    hostAudioOff: string;
  };
  about: {
    badge: string;
    title: string;
    description: string;
    pillars: {
      aiAgents: {
        title: string;
        description: string;
        highlights: string[];
      };
      googleMaps: {
        title: string;
        description: string;
        highlights: string[];
      };
      web3d: {
        title: string;
        description: string;
        highlights: string[];
      };
      metaAds: {
        title: string;
        description: string;
        highlights: string[];
      };
    };
    exploreSkillsBtn: string;
  };
  skills: {
    badge: string;
    title: string;
    description: string;
    audioLanguageLabel: string;
    allCategory: string;
    tapToListen: string;
    categories: Record<string, string>;
  };
  projects: {
    badge: string;
    title: string;
    description: string;
    allCategory: string;
    viewProject: string;
    liveDemo: string;
    shareProject: string;
    categories: Record<string, string>;
  };
  contact: {
    badge: string;
    title: string;
    description: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    serviceLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitBtn: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    sendAnother: string;
    directContactTitle: string;
    whatsappBtn: string;
    callBtn: string;
    responseTime: string;
    addressLabel: string;
  };
  footer: {
    tagline: string;
    description: string;
    navigation: string;
    contact: string;
    social: string;
    allRightsReserved: string;
    designedWith: string;
  };
}

export const UI_TRANSLATIONS: Record<SupportedLanguage, UiTranslations> = {
  te: {
    navbar: {
      home: 'హోమ్',
      about: 'మా గురించి',
      skills: 'నైపుణ్యాలు',
      projects: 'ప్రాజెక్టులు',
      blogs: 'బ్లాగ్స్',
      contact: 'సంప్రదించండి',
      admin: 'అడ్మిన్',
      getInTouch: 'మమ్మల్ని కలవండి',
      chooseLanguage: 'భాష మార్చుకోండి',
    },
    languageBanner: {
      title: 'వెబ్‌సైట్ భాషను ఎంచుకోండి (Language Selection):',
      subtitle: 'మీకు అనుకూలమైన భాషలో పూర్తి వెబ్‌సైట్ మరియు వాయిస్ వివరణలను వినండి',
    },
    hero: {
      badge: 'AI & డిజిటల్ గ్రోత్ ఏజెన్సీ • ELITE DIGITAL AGENCY',
      titlePart1: 'మీ వ్యాపారానికి',
      titleGradient: 'ఆధునిక AI & డిజిటల్',
      titlePart2: 'రూపాన్ని అందించండి',
      description:
        'ఎలైట్ డిజిటల్ ఏజెన్సీ ద్వారా 24/7 AI వాయిస్ కాలింగ్ ఏజెంట్లు, ధృవీకరించబడిన గూగుల్ మ్యాప్స్ స్టోర్ సెటప్, 3D వెబ్ అప్లికేషన్లు మరియు హై-ROAS మెటా ప్రకటనలతో మీ వ్యాపారాన్ని తదుపరి స్థాయికి తీసుకెళ్లండి.',
      highlights: [
        '24/7 AI కాలింగ్ & కస్టమర్ రిసెప్షన్ ఏజెంట్లు',
        'గూగుల్ మ్యాప్స్ వెరిఫికేషన్ & లోకల్ ర్యాంకింగ్',
        'హై-స్పీడ్ 3D వెబ్‌సైట్లు & వెబ్ అప్లికేషన్లు',
        'హై-ROAS మెటా ప్రకటనలు & క్రియేటివ్ వీడియోలు',
      ],
      exploreSkills: 'నైపుణ్యాలు & ఆడియో వినండి',
      viewProjects: 'మా ప్రాజెక్టులు చూడండి',
      contactUs: 'ఉచిత కన్సల్టేషన్ బుక్ చేయండి',
      stats: {
        projectsValue: '50+',
        projectsLabel: 'విజయవంతమైన ప్రాజెక్టులు',
        speedValue: '<1 సెకను',
        speedLabel: 'AI ప్రతిస్పందన వేగం',
        satisfactionValue: '100%',
        satisfactionLabel: 'క్లయింట్ సంతృప్తి',
      },
      hostGreeting:
        'నమస్కారం! ఎలైట్ డిజిటల్ ఏజెన్సీకి స్వాగతం. నేను లాహరిని. మోడ్రన్ వెబ్ అప్లికేషన్లు, AI ఆటోమేషన్లు మరియు డిజిటల్ అనుభవాలను రూపొందించడంలో నాకు అమితమైన ఆసక్తి.',
      hostTitle: 'లాహరి (Lahari)',
      hostSubtitle: 'ఎలైట్ డిజిటల్ ఏజెన్సీ AI హోస్ట్',
      hostAudioOn: 'లాహరి వాయిస్ ఆన్‌లో ఉంది',
      hostAudioOff: 'లాహరి వాయిస్ వినండి',
    },
    about: {
      badge: 'మేము ఎవరు • WHO WE ARE',
      title: 'ఎలైట్ డిజిటల్ ఏజెన్సీ గురించి',
      description:
        'ఎలైట్ డిజిటల్ ఏజెన్సీ వ్యాపారాలు, క్రియేటర్లు మరియు బ్రాండ్‌లను సరికొత్త AI టెక్నాలజీ, ఆటోమేషన్, క్రియేటివ్ కంటెంట్, ఆధునిక వెబ్‌సైట్లు మరియు డిజిటల్ మార్కెటింగ్ ద్వారా అత్యున్నత స్థాయికి చేర్చుతుంది. సమయాన్ని ఆదా చేసి వ్యాపార వృద్ధిని వేగవంతం చేయడమే మా లక్ష్యం.',
      pillars: {
        aiAgents: {
          title: 'AI & వాయిస్ కాలింగ్ ఏజెంట్లు',
          description:
            'కస్టమర్ల కాల్స్ మాట్లాడే 24/7 ఆటోమేటెడ్ AI వాయిస్ ఏజెంట్లు, కస్టమర్ లీడ్ క్వాలిఫికేషన్ చాట్‌బాట్లు మరియు రోజువారీ వ్యాపార పనులను ఆటోమేట్ చేసే ఇంటెలిజెంట్ వర్క్‌ఫ్లోలు.',
          highlights: ['24/7 AI వాయిస్ కాలింగ్ సిస్టమ్', 'ఆటోమేటిక్ బిజినెస్ వర్క్‌ఫ్లోలు', 'స్మార్ట్ లీడ్ చాట్‌బాట్లు'],
        },
        googleMaps: {
          title: 'గూగుల్ మ్యాప్స్ & లోకల్ ర్యాంకింగ్',
          description:
            'మీ షాప్/ఆఫీస్ యొక్క పూర్తి గూగుల్ బిజినెస్ ప్రొఫైల్ సెటప్, ఖచ్చితమైన GPS పిన్ వెరిఫికేషన్, ఫోటో ఎన్‌హాన్స్‌మెంట్స్ మరియు స్థానిక కస్టమర్ల నుండి ఎక్కువ కాల్స్, విజిట్స్ వచ్చేలా ర్యాంకింగ్.',
          highlights: ['గూగుల్ మ్యాప్స్ పిన్ వెరిఫికేషన్', '"Near Me" లోకల్ SEO ర్యాంకింగ్', '5-స్టార్ రివ్యూ వృద్ధి విధానం'],
        },
        web3d: {
          title: 'వెబ్ & 3D డిజిటల్ అనుభవాలు',
          description:
            'సూపర్ ఫాస్ట్ లోడింగ్, అత్యాధునిక డిజైన్, ఫ్రాస్టెడ్ గ్లాస్ లుక్ మరియు మొబైల్ అనుకూలమైన ఆధునిక వెబ్‌సైట్లు, వెబ్ అప్లికేషన్లు.',
          highlights: ['మోడ్రన్ వెబ్ ఆర్కిటెక్చర్', '3D ఇంటరాక్టివ్ ఇంటర్‌ఫేస్', 'సబ్-సెకండ్ లోడింగ్ వేగం'],
        },
        metaAds: {
          title: 'మెటా ప్రకటనలు & క్రియేటివ్ మీడియా',
          description:
            'ఫేస్‌బుక్ & ఇన్‌స్టాగ్రామ్ హై-ROAS ప్రకటనలు, AI సినిమాటిక్ వీడియో యాడ్స్, లగ్జరీ వెడ్డింగ్ ఇన్విటేషన్ వీడియోలు మరియు సోషల్ మీడియా మేనేజ్‌మెంట్.',
          highlights: ['హై-ROAS మెటా యాడ్ ఫన్నెల్స్', 'సినిమాటిక్ AI వీడియోలు', 'ప్రత్యేకమైన వెడ్డింగ్ ఇన్విటేషన్ వీడియోలు'],
        },
      },
      exploreSkillsBtn: 'అన్ని నైపుణ్యాలను పరిశీలించండి',
    },
    skills: {
      badge: 'ఇంటరాక్టివ్ నైపుణ్యాలు • GALAXY',
      title: '3D స్కిల్స్ గెలాక్సీ',
      description:
        'AI, డిజిటల్ ఇంజనీరింగ్ మరియు క్రియేటివ్ ప్రొడక్షన్‌లో మా ప్రత్యేక నైపుణ్యాలను అన్వేషించండి. ఏదైనా కార్డుపై క్లిక్ చేసి పూర్తి వివరాలను ఎంచుకున్న భాషలో సహజమైన వాయిస్ ద్వారా వినండి.',
      audioLanguageLabel: 'ఆడియో వివరణ భాష:',
      allCategory: 'అన్నీ',
      tapToListen: 'వినడానికి నొక్కండి',
      categories: {
        'All': 'అన్నీ (All)',
        'AI & Automation': 'AI & ఆటోమేషన్',
        'Local Growth & Maps': 'లోకల్ గ్రోత్ & మ్యాప్స్',
        'Development': 'వెబ్ డెవలప్‌మెంట్',
        'Marketing': 'మార్కెటింగ్ & యాడ్స్',
        'Creative & Video': 'క్రియేటివ్ & వీడియోలు',
        'Creative & Design': 'డిజైన్ & బ్రాండింగ్',
      },
    },
    projects: {
      badge: 'పోర్ట్‌ఫోలియో & పరిష్కారాలు',
      title: 'మేము రూపొందించిన ప్రాజెక్టులు',
      description: 'మేము విజయవంతంగా పూర్తి చేసిన డిజిటల్ అనుభవాలు, AI పరిష్కారాలు మరియు క్రియేటివ్ పనులు.',
      allCategory: 'అన్నీ',
      viewProject: 'వివరాలు చూడండి',
      liveDemo: 'లైవ్ డెమో',
      shareProject: 'షేర్ చేయండి',
      categories: {
        'All': 'అన్నీ (All)',
        'AI Automation': 'AI ఆటోమేషన్',
        'AI Calling Agents': 'AI కాలింగ్ ఏజెంట్లు',
        'Local SEO & Maps': 'లోకల్ SEO & మ్యాప్స్',
        'AI Agent': 'AI ఏజెంట్',
        'AI Chatbot': 'AI చాట్‌బాట్',
        'AI Videos': 'AI వీడియోలు',
        'Websites': 'వెబ్‌సైట్లు',
        'Social Media Management': 'సోషల్ మీడియా మేనేజ్‌మెంట్',
        'Meta Ads': 'మెటా యాడ్స్',
        'Wedding Invitation Videos': 'వెడ్డింగ్ ఇన్విటేషన్ వీడియోలు',
      },
    },
    contact: {
      badge: 'మమ్మల్ని సంప్రదించండి • CONTACT',
      title: 'మీ ప్రాజెక్ట్ గురించి చర్చిద్దాం',
      description:
        'మీ వ్యాపారానికి AI ఆటోమేషన్లు, గూగుల్ మ్యాప్స్ సెటప్ లేదా ఆధునిక వెబ్‌సైట్ కావాలా? క్రింది ఫారమ్‌ను పూరించండి లేదా నేరుగా వాట్సాప్/ఫోన్ ద్వారా సంప్రదించండి.',
      formTitle: 'ప్రాజెక్ట్ వివరాలను పంపండి',
      formSubtitle: 'మేము సాధారణంగా 15 నిమిషాలలోపు ప్రతిస్పందిస్తాము',
      nameLabel: 'మీ పూర్తి పేరు *',
      namePlaceholder: 'ఉదా: రాహుల్ వర్మ',
      emailLabel: 'ఈమెయిల్ చిరునామా *',
      emailPlaceholder: 'rahul@example.com',
      phoneLabel: 'ఫోన్ నంబర్ / వాట్సాప్',
      phonePlaceholder: '+91 98765 43210',
      serviceLabel: 'మీకు అవసరమైన సేవ *',
      messageLabel: 'మీ ప్రాజెక్ట్ లేదా అవసరాల గురించి వివరించండి *',
      messagePlaceholder: 'మీ వ్యాపారం మరియు మీకు అవసరమైన AI / వెబ్ / మ్యాప్స్ సేవల గురించి రాయండి...',
      submitBtn: 'సందేశం పంపండి',
      submitting: 'పంపుతోంది...',
      successTitle: 'సందేశం విజయవంతంగా అందింది!',
      successMessage: 'ధన్యవాదాలు! మా ప్రతినిధి త్వరలోనే మీతో వాట్సాప్ లేదా ఈమెయిల్ ద్వారా సంప్రదిస్తారు.',
      sendAnother: 'మరొక సందేశం పంపండి',
      directContactTitle: 'నేరుగా సంప్రదించండి',
      whatsappBtn: 'వాట్సాప్‌లో చాట్ చేయండి',
      callBtn: 'నేరుగా కాల్ చేయండి',
      responseTime: 'సగటు ప్రతిస్పందన సమయం: 15 నిమిషాలు',
      addressLabel: 'కార్యాలయ ప్రదేశం',
    },
    footer: {
      tagline: 'AI • ఆటోమేషన్ • గూగుల్ మ్యాప్స్ & స్టోర్స్ • గ్రోత్',
      description:
        'తదుపరి తరం డిజిటల్ అనుభవాలు, తెలివైన AI ఆటోమేషన్లు, వాయిస్ కాలింగ్ ఏజెంట్లు, ధృవీకరించబడిన గూగుల్ మ్యాప్స్ స్టోర్స్ మరియు హై-ROAS మార్కెటింగ్ పరిష్కారాలు.',
      navigation: 'నావిగేషన్',
      contact: 'సంప్రదించండి',
      social: 'సోషల్ మీడియా',
      allRightsReserved: 'సర్వహక్కులు ప్రత్యేకించబడ్డాయి.',
      designedWith: 'ఎలైట్ డిజిటల్ ఏజెన్సీ ద్వారా రూపొందించబడింది.',
    },
  },

  en: {
    navbar: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact',
      admin: 'Admin',
      getInTouch: 'Get in Touch',
      chooseLanguage: 'Select Language',
    },
    languageBanner: {
      title: 'Select Website Language:',
      subtitle: 'Experience the entire website and natural voice narration in your preferred language',
    },
    hero: {
      badge: 'AI & DIGITAL GROWTH AGENCY • ELITE DIGITAL AGENCY',
      titlePart1: 'Transform Your Business with',
      titleGradient: 'Next-Gen AI & Digital',
      titlePart2: 'Solutions',
      description:
        'Elite Digital Agency empowers forward-thinking businesses with 24/7 AI voice calling agents, verified Google Maps store rankings, ultra-fast 3D web applications, and high-ROAS Meta ad campaigns.',
      highlights: [
        '24/7 AI Voice Calling & Inbound Receptionists',
        'Google Maps Store Verification & Local SEO Ranking',
        'High-Speed Modern 3D Web Applications',
        'High-ROAS Meta Ads & Cinematic AI Video Media',
      ],
      exploreSkills: 'Explore Skills & Audio',
      viewProjects: 'View Portfolio Projects',
      contactUs: 'Book Free Consultation',
      stats: {
        projectsValue: '50+',
        projectsLabel: 'Projects Delivered',
        speedValue: '<1 sec',
        speedLabel: 'AI Response Speed',
        satisfactionValue: '100%',
        satisfactionLabel: 'Client Satisfaction',
      },
      hostGreeting:
        "Hi! Welcome to Elite Digital Agency. I'm Lahari. Passionate about creating modern web applications and digital experiences.",
      hostTitle: 'Lahari',
      hostSubtitle: 'Elite Digital Agency AI Presenter',
      hostAudioOn: "Host Audio ON",
      hostAudioOff: "Play Lahari's Voice",
    },
    about: {
      badge: 'WHO WE ARE',
      title: 'About Elite Digital Agency',
      description:
        'Elite Digital Agency helps businesses, creators and brands build a stronger digital presence through AI, automation, creative content, modern websites and digital marketing. We combine technology, creativity and strategy to create practical digital solutions that help businesses save time, improve their online presence and grow.',
      pillars: {
        aiAgents: {
          title: 'AI & Voice Calling Agents',
          description:
            'Autonomous 24/7 AI voice calling agents for customer reception & outbound calls, intelligent automation workflows, and contextual lead qualification chatbots.',
          highlights: ['24/7 AI Voice Calling Agents', 'Automated Business Workflows', 'Smart Lead Qualification Chatbots'],
        },
        googleMaps: {
          title: 'Google Maps & Local Domination',
          description:
            'End-to-end Google Business Profile setup, verified physical store GPS location tagging, photo enhancements, and local search ranking to drive walk-in customers and calls.',
          highlights: ['Google Maps Verification & Pinning', 'Local SEO & "Near Me" Ranking', '5-Star Review Acquisition Systems'],
        },
        web3d: {
          title: 'Web & 3D Experiences',
          description:
            'High-speed, responsive modern websites and interactive 3D web applications built with cutting-edge frontends, frosted glass styling, and conversion-focused design.',
          highlights: ['Modern Web Architecture', '3D Interactive Interfaces', 'Sub-second Load Speeds'],
        },
        metaAds: {
          title: 'Meta Ads & Creative Media',
          description:
            'Targeted high-ROAS Meta Ads (Facebook/Instagram), cinematic AI video commercials, luxury wedding invitation reels, and social media content curation.',
          highlights: ['High-ROAS Meta Ad Funnels', 'Cinematic AI & Storytelling Videos', 'Bespoke Wedding Invitation Videos'],
        },
      },
      exploreSkillsBtn: 'Explore All Skills',
    },
    skills: {
      badge: 'INTERACTIVE EXPERIENCES • GALAXY',
      title: '3D Skills Galaxy',
      description:
        'Explore our specialized capabilities across AI, digital engineering, and creative production. Click any card to experience the interactive 3D breakdown with our natural voice explanation in your preferred language.',
      audioLanguageLabel: 'Audio Explanation Language:',
      allCategory: 'All',
      tapToListen: 'Tap to Listen',
      categories: {
        'All': 'All',
        'AI & Automation': 'AI & Automation',
        'Local Growth & Maps': 'Local Growth & Maps',
        'Development': 'Web Development',
        'Marketing': 'Marketing & Ads',
        'Creative & Video': 'Creative & Videos',
        'Creative & Design': 'Design & Branding',
      },
    },
    projects: {
      badge: 'PORTFOLIO & SOLUTIONS',
      title: "Projects I've Created",
      description: 'A selection of digital experiences, AI solutions and creative work built for global and local brands.',
      allCategory: 'All',
      viewProject: 'View Details',
      liveDemo: 'Live Demo',
      shareProject: 'Share',
      categories: {
        'All': 'All',
        'AI Automation': 'AI Automation',
        'AI Calling Agents': 'AI Calling Agents',
        'Local SEO & Maps': 'Local SEO & Maps',
        'AI Agent': 'AI Agent',
        'AI Chatbot': 'AI Chatbot',
        'AI Videos': 'AI Videos',
        'Websites': 'Websites',
        'Social Media Management': 'Social Media Management',
        'Meta Ads': 'Meta Ads',
        'Wedding Invitation Videos': 'Wedding Invitation Videos',
      },
    },
    contact: {
      badge: 'GET IN TOUCH',
      title: "Let's Build Something Exceptional",
      description:
        'Ready to elevate your business with AI automations, Google Maps dominance, or modern digital experiences? Send a message below or connect directly via WhatsApp/Phone.',
      formTitle: 'Send a Message',
      formSubtitle: 'We typically respond within 15 minutes',
      nameLabel: 'Full Name *',
      namePlaceholder: 'e.g. Alex Johnson',
      emailLabel: 'Email Address *',
      emailPlaceholder: 'alex@example.com',
      phoneLabel: 'Phone / WhatsApp',
      phonePlaceholder: '+91 98765 43210',
      serviceLabel: 'Service Needed *',
      messageLabel: 'Project Details & Goals *',
      messagePlaceholder: 'Tell us about your business goals and what services you are looking for...',
      submitBtn: 'Send Message',
      submitting: 'Sending...',
      successTitle: 'Message Sent Successfully!',
      successMessage: 'Thank you! We have received your inquiry and will contact you via WhatsApp or Email shortly.',
      sendAnother: 'Send Another Message',
      directContactTitle: 'Direct Connect',
      whatsappBtn: 'Chat on WhatsApp',
      callBtn: 'Call Us Directly',
      responseTime: 'Average response time: 15 minutes',
      addressLabel: 'Office Location',
    },
    footer: {
      tagline: 'AI • Automation • Maps & Stores • Growth',
      description:
        'Building next-generation digital experiences, intelligent AI automations, voice calling agents, verified Google Maps presences, and high-converting marketing campaigns.',
      navigation: 'Navigation',
      contact: 'Contact',
      social: 'Social Media',
      allRightsReserved: 'All rights reserved.',
      designedWith: 'Crafted by Elite Digital Agency.',
    },
  },

  hi: {
    navbar: {
      home: 'होम',
      about: 'हमारे बारे में',
      skills: 'कौशल (Skills)',
      projects: 'प्रोजेक्ट्स',
      contact: 'संपर्क करें',
      admin: 'एडमिन',
      getInTouch: 'संपर्क करें',
      chooseLanguage: 'भाषा चुनें',
    },
    languageBanner: {
      title: 'वेबसाइट की भाषा चुनें (Select Language):',
      subtitle: 'अपनी पसंदीदा भाषा में पूरी वेबसाइट और प्राकृतिक वॉयस विवरण का अनुभव करें',
    },
    hero: {
      badge: 'AI और डिजिटल ग्रोथ एजेंसी • ELITE DIGITAL AGENCY',
      titlePart1: 'अपने व्यवसाय को दें',
      titleGradient: 'आधुनिक AI और डिजिटल',
      titlePart2: 'की नई शक्ति',
      description:
        'एलीट डिजिटल एजेंसी आपके व्यवसाय को 24/7 AI वॉयस कॉलिंग एजेंट, सत्यापित गूगल मैप्स स्टोर रैंकिंग, सुपरफास्ट 3D वेबसाइट्स और हाई-ROAS मेटा विज्ञापनों से नई ऊंचाइयों पर ले जाती है।',
      highlights: [
        '24/7 AI वॉयस कॉलिंग और कस्टमर रिसेप्शन एजेंट',
        'गूगल मैप्स वेरिफिकेशन और लोकल "Near Me" रैंकिंग',
        'हाई-स्पीड आधुनिक 3D वेब एप्लिकेशन',
        'हाई-ROAS मेटा विज्ञापन और सिनेमैटिक AI वीडियो',
      ],
      exploreSkills: 'कौशल और ऑडियो सुनें',
      viewProjects: 'हमारे प्रोजेक्ट्स देखें',
      contactUs: 'मुफ्त परामर्श बुक करें',
      stats: {
        projectsValue: '50+',
        projectsLabel: 'सफल प्रोजेक्ट्स',
        speedValue: '<1 सेकंड',
        speedLabel: 'AI रिस्पांस स्पीड',
        satisfactionValue: '100%',
        satisfactionLabel: 'ग्राहक संतुष्टि',
      },
      hostGreeting:
        'नमस्ते! एलीट डिजिटल एजेंसी में आपका स्वागत है। मैं लहरी हूँ। हम आपके बिजनेस को आधुनिक AI ऑटोमेशन, गूगल मैप्स रैंकिंग और वेबसाइट्स के जरिए तेजी से आगे बढ़ाने में मदद करते हैं।',
      hostTitle: 'लहरी (Lahari)',
      hostSubtitle: 'एलीट डिजिटल एजेंसी AI होस्ट',
      hostAudioOn: 'होस्ट ऑडियो ऑन है',
      hostAudioOff: 'लहरी की आवाज सुनें',
    },
    about: {
      badge: 'हम कौन हैं • WHO WE ARE',
      title: 'एलीट डिजिटल एजेंसी के बारे में',
      description:
        'एलीट डिजिटल एजेंसी व्यवसायों और ब्रांड्स को AI, ऑटोमेशन, रचनात्मक कंटेंट, आधुनिक वेबसाइटों और डिजिटल मार्केटिंग के माध्यम से मजबूत ऑनलाइन उपस्थिति बनाने में मदद करती है।',
      pillars: {
        aiAgents: {
          title: 'AI और वॉयस कॉलिंग एजेंट्स',
          description:
            'ग्राहकों से सीधे बात करने वाले 24/7 AI वॉयस कॉलिंग एजेंट्स, स्मार्ट चैटबॉट्स और स्वचालित बिजनेस वर्कफ़्लो।',
          highlights: ['24/7 AI वॉयस कॉलिंग सिस्टम', 'ऑटोमेटेड बिजनेस वर्कफ़्लो', 'स्मार्ट लीड चैटबॉट्स'],
        },
        googleMaps: {
          title: 'गूगल मैप्स और लोकल डोमिनेशन',
          description:
            'गूगल बिजनेस प्रोफाइल का संपूर्ण सेटअप, पिन वेरिफिकेशन, फोटो सुधार और स्थानीय ग्राहकों से ज्यादा कॉल्स व विज़िट्स के लिए रैंकिंग।',
          highlights: ['गूगल मैप्स पिन वेरिफिकेशन', 'लोकल SEO और "Near Me" रैंकिंग', '5-स्टार रिव्यू ग्रोथ'],
        },
        web3d: {
          title: 'वेब और 3D डिजिटल अनुभव',
          description:
            'अल्ट्रा-फास्ट लोडिंग स्पीड, आधुनिक फ्रॉस्टेड ग्लास लुक और मोबाइल-फ्रेंडली 3D वेबसाइट्स व वेब ऐप्स।',
          highlights: ['आधुनिक वेब आर्किटेक्चर', '3D इंटरएक्टिव इंटरफ़ेस', 'सब-सेकंड लोडिंग स्पीड'],
        },
        metaAds: {
          title: 'मेटा विज्ञापन और क्रिएटिव मीडिया',
          description:
            'फेसबुक और इंस्टाग्राम हाई-ROAS विज्ञापन, सिनेमैटिक AI वीडियो, शादी के डिजिटल इनविटेशन वीडियो और सोशल मीडिया मैनेजमेंट।',
          highlights: ['हाई-ROAS मेटा ऐड फनेल्स', 'सिनेमैटिक AI वीडियो', 'लक्जरी वेडिंग इनविटेशन वीडियो'],
        },
      },
      exploreSkillsBtn: 'सभी स्किल्स देखें',
    },
    skills: {
      badge: 'इंटरएक्टिव अनुभव • GALAXY',
      title: '3D स्किल्स गैलेक्सी',
      description:
        'AI, डिजिटल इंजीनियरिंग और वीडियो प्रोडक्शन में हमारी क्षमताओं को एक्सप्लोर करें। किसी भी कार्ड पर क्लिक करके अपनी चुनी हुई भाषा में प्राकृतिक आवाज विवरण सुनें।',
      audioLanguageLabel: 'ऑडियो विवरण भाषा:',
      allCategory: 'सभी',
      tapToListen: 'सुनने के लिए टैप करें',
      categories: {
        'All': 'सभी (All)',
        'AI & Automation': 'AI और ऑटोमेशन',
        'Local Growth & Maps': 'लोकल ग्रोथ और मैप्स',
        'Development': 'वेब डेवलपमेंट',
        'Marketing': 'मार्केटिंग और ऐड्स',
        'Creative & Video': 'क्रिएटिव और वीडियो',
        'Creative & Design': 'डिजाइन और ब्रांडिंग',
      },
    },
    projects: {
      badge: 'पोर्टफोलियो और समाधान',
      title: 'हमारे बनाए गए प्रोजेक्ट्स',
      description: 'हमारे द्वारा निर्मित सफल डिजिटल अनुभव, AI सॉल्यूशंस और रचनात्मक प्रोजेक्ट्स।',
      allCategory: 'सभी',
      viewProject: 'विवरण देखें',
      liveDemo: 'लाइव डेमो',
      shareProject: 'शेयर करें',
      categories: {
        'All': 'सभी (All)',
        'AI Automation': 'AI ऑटोमेशन',
        'AI Calling Agents': 'AI कॉलिंग एजेंट्स',
        'Local SEO & Maps': 'लोकल SEO और मैप्स',
        'AI Agent': 'AI एजेंट',
        'AI Chatbot': 'AI चैटबॉट',
        'AI Videos': 'AI वीडियो',
        'Websites': 'वेबसाइट्स',
        'Social Media Management': 'सोशल मीडिया मैनेजमेंट',
        'Meta Ads': 'मेटा ऐड्स',
        'Wedding Invitation Videos': 'वेडिंग इनविटेशन वीडियो',
      },
    },
    contact: {
      badge: 'संपर्क करें • CONTACT',
      title: 'आइए एक शानदार प्रोजेक्ट शुरू करें',
      description:
        'क्या आप अपने व्यवसाय को AI और आधुनिक डिजिटल तकनीकों से आगे बढ़ाना चाहते हैं? नीचे दिया गया फॉर्म भरें या सीधे व्हाट्सएप/फोन पर जुड़ें।',
      formTitle: 'प्रोजेक्ट विवरण भेजें',
      formSubtitle: 'हम आमतौर पर 15 मिनट में जवाब देते हैं',
      nameLabel: 'पूरा नाम *',
      namePlaceholder: 'जैसे: अमित शर्मा',
      emailLabel: 'ईमेल पता *',
      emailPlaceholder: 'amit@example.com',
      phoneLabel: 'फोन नंबर / व्हाट्सएप',
      phonePlaceholder: '+91 98765 43210',
      serviceLabel: 'आवश्यक सेवा *',
      messageLabel: 'प्रोजेक्ट विवरण *',
      messagePlaceholder: 'अपने व्यवसाय और आवश्यक सेवाओं के बारे में लिखें...',
      submitBtn: 'संदेश भेजें',
      submitting: 'भेज रहा है...',
      successTitle: 'संदेश सफलतापूर्वक भेजा गया!',
      successMessage: 'धन्यवाद! हमें आपका संदेश मिल गया है और हम जल्द ही आपसे व्हाट्सएप या ईमेल पर संपर्क करेंगे।',
      sendAnother: 'दूसरा संदेश भेजें',
      directContactTitle: 'सीधा संपर्क',
      whatsappBtn: 'व्हाट्सएप पर चैट करें',
      callBtn: 'सीधे कॉल करें',
      responseTime: 'औसत प्रतिक्रिया समय: 15 मिनट',
      addressLabel: 'ऑफिस का पता',
    },
    footer: {
      tagline: 'AI • ऑटोमेशन • गूगल मैप्स और स्टोर्स • ग्रोथ',
      description:
        'अत्याधुनिक डिजिटल अनुभव, इंटेलिजेंट AI ऑटोमेशन, वॉयस कॉलिंग एजेंट्स, सत्यापित गूगल मैप्स स्टोर्स और हाई-कनवर्टिंग मार्केटिंग समाधान।',
      navigation: 'नेविगेशन',
      contact: 'संपर्क',
      social: 'सोशल मीडिया',
      allRightsReserved: 'सर्वाधिकार सुरक्षित।',
      designedWith: 'एलीट डिजिटल एजेंसी द्वारा निर्मित।',
    },
  },

  ta: {
    navbar: {
      home: 'முகப்பு',
      about: 'எங்களை பற்றி',
      skills: 'திறன்கள் (Skills)',
      projects: 'திட்டங்கள் (Projects)',
      contact: 'தொடர்புக்கு',
      admin: 'அட்மின்',
      getInTouch: 'இணைந்திடுங்கள்',
      chooseLanguage: 'மொழியைத் தேர்வு செய்க',
    },
    languageBanner: {
      title: 'வலைத்தள மொழியைத் தேர்வுசெய்க (Language Selection):',
      subtitle: 'முழு வலைத்தளத்தையும் குரல் விளக்கத்தையும் உங்கள் விருப்ப மொழியில் அனுபவியுங்கள்',
    },
    hero: {
      badge: 'AI & டிஜிட்டல் வளர்ச்சி நிறுவனம் • ELITE DIGITAL AGENCY',
      titlePart1: 'உங்கள் வணிகத்திற்கு',
      titleGradient: 'நவீன AI & டிஜிட்டல்',
      titlePart2: 'புதிய பரிமாணம்',
      description:
        'எலைட் டிஜிட்டல் ஏஜென்சி மூலம் 24/7 AI வாய்ஸ் காலிங் ஏஜெண்டுகள், கூகுள் மேப்ஸ் லொகேஷன் ரேங்கிங், அதிவேக 3D வலைத்தளங்கள் மற்றும் உயர் ROAS மெட்டா விளம்பரங்களுடன் உங்கள் தொழிலை வளர்க்கிறோம்.',
      highlights: [
        '24/7 AI வாய்ஸ் காலிங் & வாடிக்கையாளர் வரவேற்பு',
        'கூகுள் மேப்ஸ் சரிபார்ப்பு & உள்ளூர் SEO ரேங்கிங்',
        'அதிவேக நவீன 3D வலைத்தளங்கள்',
        'உயர் ROAS மெட்டா விளம்பரங்கள் & AI வீடியோக்கள்',
      ],
      exploreSkills: 'திறன்கள் & ஆடியோ கேளுங்கள்',
      viewProjects: 'திட்டங்களை பாருங்கள்',
      contactUs: 'இலவச ஆலோசனை பெறுங்கள்',
      stats: {
        projectsValue: '50+',
        projectsLabel: 'வெற்றிகரமான திட்டங்கள்',
        speedValue: '<1 வினாடி',
        speedLabel: 'AI பதில் வேகம்',
        satisfactionValue: '100%',
        satisfactionLabel: 'வாடிக்கையாளர் திருப்தி',
      },
      hostGreeting:
        'வணக்கம்! எலைட் டிஜிட்டல் ஏஜென்சிக்கு வரவேற்கிறோம். நான் லஹரி. AI ஆட்டோமேஷன், கூகுள் மேப்ஸ் செட்டப் மற்றும் நவீன வலைத்தளங்கள் மூலம் உங்கள் வணிகத்தை மேம்படுத்த நாங்கள் உதவுகிறோம்.',
      hostTitle: 'லஹரி (Lahari)',
      hostSubtitle: 'எலைட் டிஜிட்டல் ஏஜென்சி AI தொகுப்பாளர்',
      hostAudioOn: 'குரல் ஒலி இயக்கத்தில் உள்ளது',
      hostAudioOff: 'லஹரியின் குரலைக் கேளுங்கள்',
    },
    about: {
      badge: 'நாங்கள் யார் • WHO WE ARE',
      title: 'எலைட் டிஜிட்டல் ஏஜென்சி பற்றி',
      description:
        'எலைட் டிஜிட்டல் ஏஜென்சி வணிகங்கள் மற்றும் பிராண்டுகளுக்கு AI, ஆட்டோமேஷன், கவர்ச்சிகரமான கன்டென்ட், நவீன வலைத்தளங்கள் மற்றும் டிஜிட்டல் மார்க்கெட்டிங் மூலம் வலுவான டிஜிட்டல் இருப்பை உருவாக்குகிறது.',
      pillars: {
        aiAgents: {
          title: 'AI & வாய்ஸ் காலிங் ஏஜெண்டுகள்',
          description:
            'வாடிக்கையாளர்களுடன் நேரடியாக பேசும் 24/7 AI வாய்ஸ் காலிங் அமைப்புகள், ஸ்மார்ட் சாட்பாட்கள் மற்றும் வணிக ஆட்டோமேஷன்.',
          highlights: ['24/7 AI வாய்ஸ் காலிங் அமைப்பு', 'தானியங்கி வணிக பணிகள்', 'ஸ்மார்ட் லீட் சாட்பாட்கள்'],
        },
        googleMaps: {
          title: 'கூகுள் மேப்ஸ் & லோக்கல் ரேங்கிங்',
          description:
            'கூகுள் பிசினஸ் புரொபைல் செட்டப், துல்லியமான GPS பின் சரிபார்ப்பு மற்றும் உள்ளூர் வாடிக்கையாளர்களை கவரும் ரேங்கிங்.',
          highlights: ['கூகுள் மேப்ஸ் பின் சரிபார்ப்பு', 'உள்ளூர் "Near Me" SEO', '5-ஸ்டார் மதிப்பீடு வளர்ச்சி'],
        },
        web3d: {
          title: 'வலைத்தளங்கள் & 3D அனுபவங்கள்',
          description:
            'மின்னல் வேக லோடிங், நவீன 3D தோற்றம் மற்றும் மொபைல் நட்பு கொண்ட புதிய தலைமுறை வலைத்தளங்கள்.',
          highlights: ['நவீன வலைத்தள கட்டமைப்பு', '3D ஊடாடும் வடிவமைப்பு', 'அதிவேக லோடிங்'],
        },
        metaAds: {
          title: 'மெட்டா விளம்பரங்கள் & வீடியோ மீடியா',
          description:
            'பேஸ்புக் & இன்ஸ்டாகிராம் உயர் ROAS விளம்பரங்கள், சினிமாட்டிக் AI வீடியோக்கள் மற்றும் திருமண அழைப்பிதழ் வீடியோக்கள்.',
          highlights: ['உயர் ROAS மெட்டா விளம்பரங்கள்', 'சினிமாட்டிக் AI வீடியோக்கள்', 'திருமண அழைப்பிதழ் வீடியோக்கள்'],
        },
      },
      exploreSkillsBtn: 'அனைத்து திறன்களையும் காண்க',
    },
    skills: {
      badge: 'ஊடாடும் திறன்கள் • GALAXY',
      title: '3D திறன்கள் மண்டலம் (Skills Galaxy)',
      description:
        'AI, டிஜிட்டல் வடிவமைப்பு மற்றும் படைப்பாற்றலில் எங்கள் பிரத்யேக திறன்களை ஆராயுங்கள். எந்த கார்டையும் கிளிக் செய்து உங்கள் மொழியில் நேரடி ஆடியோ குரல் விளக்கத்தைக் கேளுங்கள்.',
      audioLanguageLabel: 'ஆடியோ விளக்க மொழி:',
      allCategory: 'அனைத்தும்',
      tapToListen: 'கேட்க தட்டவும்',
      categories: {
        'All': 'அனைத்தும் (All)',
        'AI & Automation': 'AI & ஆட்டோமேஷன்',
        'Local Growth & Maps': 'உள்ளூர் வளர்ச்சி & மேப்ஸ்',
        'Development': 'வலைத்தள உருவாக்கம்',
        'Marketing': 'சந்தைப்படுத்தல் & விளம்பரங்கள்',
        'Creative & Video': 'வீடியோ & படைப்பாற்றல்',
        'Creative & Design': 'வடிவமைப்பு & பிராண்டிங்',
      },
    },
    projects: {
      badge: 'திட்டங்கள் & தீர்வுகள்',
      title: 'நாங்கள் உருவாக்கிய திட்டங்கள்',
      description: 'நாங்கள் உருவாக்கிய வெற்றிகரமான AI தீர்வுகள், வலைத்தளங்கள் மற்றும் டிஜிட்டல் தயாரிப்புகள்.',
      allCategory: 'அனைத்தும்',
      viewProject: 'விவரங்களை காண்க',
      liveDemo: 'நேரடி செயல்முறை',
      shareProject: 'பகிர்',
      categories: {
        'All': 'அனைத்தும் (All)',
        'AI Automation': 'AI ஆட்டோமேஷன்',
        'AI Calling Agents': 'AI காலிங் ஏஜெண்டுகள்',
        'Local SEO & Maps': 'லோக்கல் SEO & மேப்ஸ்',
        'AI Agent': 'AI ஏஜென்ட்',
        'AI Chatbot': 'AI சாட்பாட்',
        'AI Videos': 'AI வீடியோக்கள்',
        'Websites': 'வலைத்தளங்கள்',
        'Social Media Management': 'சமூக ஊடக மேலாண்மை',
        'Meta Ads': 'மெட்டா விளம்பரங்கள்',
        'Wedding Invitation Videos': 'திருமண அழைப்பிதழ் வீடியோக்கள்',
      },
    },
    contact: {
      badge: 'தொடர்புக்கு • CONTACT',
      title: 'உங்கள் திட்டத்தை தொடங்குங்கள்',
      description:
        'உங்கள் தொழிலை AI மற்றும் நவீன டிஜிட்டல் முறைகள் மூலம் வளர்க்க தயாரா? கீழே உள்ள படிவத்தை நிரப்பவும் அல்லது வாட்ஸ்அப் வழியாக தொடர்பு கொள்ளவும்.',
      formTitle: 'திட்ட விவரங்களை அனுப்பவும்',
      formSubtitle: '15 நிமிடங்களுக்குள் நாங்கள் பதிலளிப்போம்',
      nameLabel: 'முழு பெயர் *',
      namePlaceholder: 'எ.கா: கார்த்திக் ராஜா',
      emailLabel: 'மின்னஞ்சல் முகவரி *',
      emailPlaceholder: 'karthik@example.com',
      phoneLabel: 'தொலைபேசி / வாட்ஸ்அப்',
      phonePlaceholder: '+91 98765 43210',
      serviceLabel: 'தேவையான சேவை *',
      messageLabel: 'திட்ட விவரங்கள் *',
      messagePlaceholder: 'உங்கள் வணிகம் மற்றும் உங்களுக்கு தேவையான சேவைகளைப் பற்றி எழுதுங்கள்...',
      submitBtn: 'செய்தி அனுப்பு',
      submitting: 'அனுப்பப்படுகிறது...',
      successTitle: 'செய்தி வெற்றிகரமாக அனுப்பப்பட்டது!',
      successMessage: 'நன்றி! உங்கள் செய்தி எங்களுக்கு கிடைத்துள்ளது. விரைவில் வாட்ஸ்அப் அல்லது மின்னஞ்சல் வழியாக தொடர்பு கொள்வோம்.',
      sendAnother: 'மற்றொரு செய்தி அனுப்பு',
      directContactTitle: 'நேரடி தொடர்பு',
      whatsappBtn: 'வாட்ஸ்அப்பில் அரட்டையடிக்கவும்',
      callBtn: 'நேரடியாக அழைக்கவும்',
      responseTime: 'சராசரி பதில் நேரம்: 15 நிமிடங்கள்',
      addressLabel: 'அலுவலக இருப்பிடம்',
    },
    footer: {
      tagline: 'AI • ஆட்டோமேஷன் • கூகுள் மேப்ஸ் • வணிக வளர்ச்சி',
      description:
        'அதிநவீன டிஜிட்டல் அனுபவங்கள், அறிவார்ந்த AI ஆட்டோமேஷன், வாய்ஸ் காலிங் ஏஜெண்டுகள் மற்றும் கூகுள் மேப்ஸ் சேவைகள்.',
      navigation: 'வழிகாட்டி',
      contact: 'தொடர்பு',
      social: 'சமூக வலைத்தளங்கள்',
      allRightsReserved: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
      designedWith: 'எலைட் டிஜிட்டல் ஏஜென்சி மூலம் உருவாக்கப்பட்டது.',
    },
  },

  kn: {
    navbar: {
      home: 'ಮುಖಪುಟ',
      about: 'ನಮ್ಮ ಬಗ್ಗೆ',
      skills: 'ಕೌಶಲ್ಯಗಳು (Skills)',
      projects: 'ಯೋಜನೆಗಳು (Projects)',
      contact: 'ಸಂಪರ್ಕಿಸಿ',
      admin: 'ಅಡ್ಮಿನ್',
      getInTouch: 'ಸಂಪರ್ಕಿಸಿ',
      chooseLanguage: 'ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ',
    },
    languageBanner: {
      title: 'ವೆಬ್‌ಸೈಟ್ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ (Select Language):',
      subtitle: 'ನಿಮ್ಮ ಮೆಚ್ಚಿನ ಭಾಷೆಯಲ್ಲಿ ಸಂಪೂರ್ಣ ವೆಬ್‌ಸೈಟ್ ಮತ್ತು ನೈಸರ್ಗಿಕ ಧ್ವನಿ ವಿವರಣೆಯನ್ನು ಆಲಿಸಿ',
    },
    hero: {
      badge: 'AI ಮತ್ತು ಡಿಜಿಟಲ್ ಬೆಳವಣಿಗೆ ಸಂಸ್ಥೆ • ELITE DIGITAL AGENCY',
      titlePart1: 'ನಿಮ್ಮ ವ್ಯಾಪಾರಕ್ಕೆ ನೀಡಿ',
      titleGradient: 'ಅತ್ಯಾಧುನಿಕ AI ಮತ್ತು ಡಿಜಿಟಲ್',
      titlePart2: 'ರೂಪಾಂತರ',
      description:
        'ಎಲೈಟ್ ಡಿಜಿಟಲ್ ಏಜೆನ್ಸಿಯ ಮೂಲಕ 24/7 AI ವಾಯ್ಸ್ ಕಾಲಿಂಗ್ ಏಜೆಂಟ್‌ಗಳು, ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್ ಪರಿಶೀಲನೆ, ವೇಗದ 3D ವೆಬ್‌ಸೈಟ್‌ಗಳು ಮತ್ತು ಹೈ-ROAS ಮೆಟಾ ಜಾಹೀರಾತುಗಳೊಂದಿಗೆ ನಿಮ್ಮ ವ್ಯವಹಾರವನ್ನು ಬೆಳೆಸಿ.',
      highlights: [
        '24/7 AI ವಾಯ್ಸ್ ಕಾಲಿಂಗ್ ಮತ್ತು ರಿಸೆಪ್ಷನ್ ಏಜೆಂಟ್‌ಗಳು',
        'ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್ ಪರಿಶೀಲನೆ ಮತ್ತು ಲೋಕಲ್ SEO ಶ್ರೇಯಾಂಕ',
        'ಅತಿ ವೇಗದ ಆಧುನಿಕ 3D ವೆಬ್ ಅಪ್ಲಿಕೇಶನ್‌ಗಳು',
        'ಹೈ-ROAS ಮೆಟಾ ಜಾಹೀರಾತುಗಳು ಮತ್ತು AI ವೀಡಿಯೊಗಳು',
      ],
      exploreSkills: 'ಕೌಶಲ್ಯಗಳು & ಆಡಿಯೋ ಆಲಿಸಿ',
      viewProjects: 'ನಮ್ಮ ಯೋಜನೆಗಳನ್ನು ನೋಡಿ',
      contactUs: 'ಉಚಿತ ಸಮಾಲೋಚನೆ ಬುಕ್ ಮಾಡಿ',
      stats: {
        projectsValue: '50+',
        projectsLabel: 'ಯಶಸ್ವಿ ಯೋಜನೆಗಳು',
        speedValue: '<1 ಸೆಕೆಂಡ್',
        speedLabel: 'AI ಪ್ರತಿಕ್ರಿಯೆ ವೇಗ',
        satisfactionValue: '100%',
        satisfactionLabel: 'ಗ್ರಾಹಕರ ತೃಪ್ತಿ',
      },
      hostGreeting:
        'ನಮಸ್ಕಾರ! ಎಲೈಟ್ ಡಿಜಿಟಲ್ ಏಜೆನ್ಸಿಗೆ ಸ್ವಾಗತ. ನಾನು ಲಹರಿ. AI ಆಟೊಮೇಷನ್, ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್ ಬೆಳವಣಿಗೆ ಮತ್ತು ಆಧುನಿಕ ವೆಬ್‌ಸೈಟ್‌ಗಳ ಮೂಲಕ ನಿಮ್ಮ ವ್ಯಾಪಾರವನ್ನು ಬೆಳೆಸಲು ನಾವು ಸಹಾಯ ಮಾಡುತ್ತೇವೆ.',
      hostTitle: 'ಲಹರಿ (Lahari)',
      hostSubtitle: 'ಎಲೈಟ್ ಡಿಜಿಟಲ್ ಏಜೆನ್ಸಿ AI ನಿರೂಪಕಿ',
      hostAudioOn: 'ಧ್ವನಿ ಆನ್ ಆಗಿದೆ',
      hostAudioOff: 'ಲಹರಿಯ ಧ್ವನಿಯನ್ನು ಆಲಿಸಿ',
    },
    about: {
      badge: 'ನಾವು ಯಾರು • WHO WE ARE',
      title: 'ಎಲೈಟ್ ಡಿಜಿಟಲ್ ಏಜೆನ್ಸಿ ಬಗ್ಗೆ',
      description:
        'ಎಲೈಟ್ ಡಿಜಿಟಲ್ ಏಜೆನ್ಸಿ ವ್ಯಾಪಾರಗಳು ಮತ್ತು ಬ್ರ್ಯಾಂಡ್‌ಗಳಿಗೆ AI, ಆಟೊಮೇಷನ್, ಆಧುನಿಕ ವೆಬ್‌ಸೈಟ್‌ಗಳು ಮತ್ತು ಡಿಜಿಟಲ್ ಮಾರ್ಕೆಟಿಂಗ್ ಮೂಲಕ ಬಲವಾದ ಡಿಜಿಟಲ್ ಉಪಸ್ಥಿತಿಯನ್ನು ನಿರ್ಮಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
      pillars: {
        aiAgents: {
          title: 'AI ಮತ್ತು ವಾಯ್ಸ್ ಕಾಲಿಂಗ್ ಏಜೆಂಟ್‌ಗಳು',
          description:
            'ಗ್ರಾಹಕರೊಂದಿಗೆ 24/7 ಮಾತನಾಡುವ AI ವಾಯ್ಸ್ ಏಜೆಂಟ್‌ಗಳು, ಸ್ಮಾರ್ಟ್ ಚಾಟ್‌ಬಾಟ್‌ಗಳು ಮತ್ತು ವ್ಯಾಪಾರ ಆಟೊಮೇಷನ್.',
          highlights: ['24/7 AI ವಾಯ್ಸ್ ಕಾಲಿಂಗ್ ಸಿಸ್ಟಮ್', 'ಸ್ವಯಂಚಾಲಿತ ವ್ಯಾಪಾರ ಕಾರ್ಯಗಳು', 'ಸ್ಮಾರ್ಟ್ ಲೀಡ್ ಚಾಟ್‌ಬಾಟ್‌ಗಳು'],
        },
        googleMaps: {
          title: 'ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್ ಮತ್ತು ಲೋಕಲ್ ಶ್ರೇಯಾಂಕ',
          description:
            'ಗೂಗಲ್ ಬಿಸಿನೆಸ್ ಪ್ರೊಫೈಲ್ ಸೆಟಪ್, ಜಿಪಿಎಸ್ ಪಿನ್ ಪರಿಶೀಲನೆ ಮತ್ತು ಸ್ಥಳೀಯ ಗ್ರಾಹಕರಿಂದ ಹೆಚ್ಚಿನ ಕರೆಗಳನ್ನು ಪಡೆಯಲು ಶ್ರೇಯಾಂಕ.',
          highlights: ['ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್ ಪಿನ್ ಪರಿಶೀಲನೆ', 'ಲೋಕಲ್ "Near Me" SEO', '5-ಸ್ಟಾರ್ ವಿಮರ್ಶೆಗಳ ಬೆಳವಣಿಗೆ'],
        },
        web3d: {
          title: 'ವೆಬ್ ಮತ್ತು 3D ಡಿಜಿಟಲ್ ಅನುಭವಗಳು',
          description:
            'ಅತಿ ವೇಗದ ಲೋಡಿಂಗ್, ಆಧುನಿಕ ಫ್ರಾಸ್ಟೆಡ್ ಗ್ಲಾಸ್ ಶೈಲಿ ಮತ್ತು ಮೊಬೈಲ್ ಸ್ನೇಹಿ 3D ವೆಬ್‌ಸೈಟ್‌ಗಳು.',
          highlights: ['ಆಧುನಿಕ ವೆಬ್ ವಿನ್ಯಾಸ', '3D ಸಂವಾದಾತ್ಮಕ ಇಂಟರ್ಫೇಸ್', 'ಅತಿ ವೇಗದ ಲೋಡಿಂಗ್'],
        },
        metaAds: {
          title: 'ಮೆಟಾ ಜಾಹೀರಾತುಗಳು ಮತ್ತು ಕ್ರಿಯೇಟಿವ್ ಮೀಡಿಯಾ',
          description:
            'ಫೇಸ್‌ಬುಕ್ ಮತ್ತು ಇನ್‌ಸ್ಟಾಗ್ರಾಮ್ ಹೈ-ROAS ಜಾಹೀರಾತುಗಳು, ಸಿನೆಮ್ಯಾಟಿಕ್ AI ವೀಡಿಯೊಗಳು ಮತ್ತು ಮದುವೆಯ ಆಮಂತ್ರಣ ವೀಡಿಯೊಗಳು.',
          highlights: ['ಹೈ-ROAS ಮೆಟಾ ಜಾಹೀರಾತುಗಳು', 'ಸಿನೆಮ್ಯಾಟಿಕ್ AI ವೀಡಿಯೊಗಳು', 'ಆಕರ್ಷಕ ಮದುವೆಯ ಆಮಂತ್ರಣ ವೀಡಿಯೊಗಳು'],
        },
      },
      exploreSkillsBtn: 'ಎಲ್ಲಾ ಕೌಶಲ್ಯಗಳನ್ನು ನೋಡಿ',
    },
    skills: {
      badge: 'ಸಂವಾದಾತ್ಮಕ ಕೌಶಲ್ಯಗಳು • GALAXY',
      title: '3D ಸ್ಕಿಲ್ಸ್ ಗ್ಯಾಲಕ್ಸಿ (Skills Galaxy)',
      description:
        'AI, ಡಿಜಿಟಲ್ ಎಂಜಿನಿಯರಿಂಗ್ ಮತ್ತು ಕ್ರಿಯೇಟಿವ್ ನಿರ್ಮಾಣದಲ್ಲಿ ನಮ್ಮ ಕೌಶಲ್ಯಗಳನ್ನು ಅನ್ವೇಷಿಸಿ. ಕಾರ್ಡ್ ಅನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಲೈವ್ ಆಡಿಯೋ ವಿವರಣೆಯನ್ನು ಆಲಿಸಿ.',
      audioLanguageLabel: 'ಆಡಿಯೋ ವಿವರಣೆಯ ಭಾಷೆ:',
      allCategory: 'ಎಲ್ಲವೂ',
      tapToListen: 'ಆಲಿಸಲು ಟ್ಯಾಪ್ ಮಾಡಿ',
      categories: {
        'All': 'ಎಲ್ಲವೂ (All)',
        'AI & Automation': 'AI ಮತ್ತು ಆಟೊಮೇಷನ್',
        'Local Growth & Maps': 'ಲೋಕಲ್ ಗ್ರೋತ್ ಮತ್ತು ಮ್ಯಾಪ್ಸ್',
        'Development': 'ವೆಬ್ ಡೆವಲಪ್‌ಮೆಂಟ್',
        'Marketing': 'ಮಾರ್ಕೆಟಿಂಗ್ ಮತ್ತು ಜಾಹೀರಾತುಗಳು',
        'Creative & Video': 'ಕ್ರಿಯೇಟಿವ್ ಮತ್ತು ವೀಡಿಯೊಗಳು',
        'Creative & Design': 'ವಿನ್ಯಾಸ ಮತ್ತು ಬ್ರ್ಯಾಂಡಿಂಗ್',
      },
    },
    projects: {
      badge: 'ಪೋರ್ಟ್‌ಫೋಲಿಯೊ ಮತ್ತು ಪರಿಹಾರಗಳು',
      title: 'ನಾವು ನಿರ್ಮಿಸಿದ ಯೋಜನೆಗಳು',
      description: 'ನಾವು ಯಶಸ್ವಿಯಾಗಿ ರಚಿಸಿದ ಡಿಜಿಟಲ್ ಅನುಭವಗಳು, AI ಪರಿಹಾರಗಳು ಮತ್ತು ಕ್ರಿಯೇಟಿವ್ ಕೆಲಸಗಳು.',
      allCategory: 'ಎಲ್ಲವೂ',
      viewProject: 'ವಿವರಗಳನ್ನು ನೋಡಿ',
      liveDemo: 'ಲೈವ್ ಡೆಮೊ',
      shareProject: 'ಹಂಚಿಕೊಳ್ಳಿ',
      categories: {
        'All': 'ಎಲ್ಲವೂ (All)',
        'AI Automation': 'AI ಆಟೊಮೇಷನ್',
        'AI Calling Agents': 'AI ಕಾಲಿಂಗ್ ಏಜೆಂಟ್‌ಗಳು',
        'Local SEO & Maps': 'ಲೋಕಲ್ SEO & ಮ್ಯಾಪ್ಸ್',
        'AI Agent': 'AI ಏಜೆಂಟ್',
        'AI Chatbot': 'AI ಚಾಟ್‌ಬಾಟ್',
        'AI Videos': 'AI ವೀಡಿಯೊಗಳು',
        'Websites': 'ವೆಬ್‌ಸೈಟ್‌ಗಳು',
        'Social Media Management': 'ಸೋಷಿಯಲ್ ಮೀಡಿಯಾ ಮ್ಯಾನೇಜ್‌ಮೆಂಟ್',
        'Meta Ads': 'ಮೆಟಾ ಜಾಹೀರಾತುಗಳು',
        'Wedding Invitation Videos': 'ಮದುವೆಯ ಆಮಂತ್ರಣ ವೀಡಿಯೊಗಳು',
      },
    },
    contact: {
      badge: 'ಸಂಪರ್ಕಿಸಿ • CONTACT',
      title: 'ನಿಮ್ಮ ಹೊಸ ಯೋಜನೆಯನ್ನು ಪ್ರಾರಂಭಿಸೋಣ',
      description:
        'ನಿಮ್ಮ ವ್ಯಾಪಾರವನ್ನು AI ಮತ್ತು ಆಧುನಿಕ ತಂತ್ರಜ್ಞಾನಗಳ ಮೂಲಕ ಬೆಳೆಸಲು ಸಿದ್ಧರಿದ್ದೀರಾ? ಕೆಳಗಿನ ಫಾರ್ಮ್ ಅನ್ನು ಭರ್ತಿ ಮಾಡಿ ಅಥವಾ ನೇರವಾಗಿ ಸಂಪರ್ಕಿಸಿ.',
      formTitle: 'ಯೋಜನೆಯ ವಿವರಗಳನ್ನು ಕಳುಹಿಸಿ',
      formSubtitle: 'ನಾವು ಸಾಮಾನ್ಯವಾಗಿ 15 ನಿಮಿಷಗಳಲ್ಲಿ ಪ್ರತಿಕ್ರಿಯಿಸುತ್ತೇವೆ',
      nameLabel: 'ಪೂರ್ಣ ಹೆಸರು *',
      namePlaceholder: 'ಉದಾ: ಪ್ರಕಾಶ್ ರಾವ್',
      emailLabel: 'ಇಮೇಲ್ ವಿಳಾಸ *',
      emailPlaceholder: 'prakash@example.com',
      phoneLabel: 'ಫೋನ್ ಸಂಖ್ಯೆ / ವಾಟ್ಸಾಪ್',
      phonePlaceholder: '+91 98765 43210',
      serviceLabel: 'ಅಗತ್ಯವಿರುವ ಸೇವೆ *',
      messageLabel: 'ಯೋಜನೆಯ ವಿವರಗಳು *',
      messagePlaceholder: 'ನಿಮ್ಮ ವ್ಯಾಪಾರ ಮತ್ತು ನಿಮಗೆ ಅಗತ್ಯವಿರುವ ಸೇವೆಗಳ ಬಗ್ಗೆ ಬರೆಯಿರಿ...',
      submitBtn: 'ಸಂದೇಶ ಕಳುಹಿಸಿ',
      submitting: 'ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...',
      successTitle: 'ಸಂದೇಶ ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ!',
      successMessage: 'ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಸಂದೇಶ ನಮಗೆ ತಲುಪಿದೆ, ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತೇವೆ.',
      sendAnother: 'ಇನ್ನೊಂದು ಸಂದೇಶ ಕಳುಹಿಸಿ',
      directContactTitle: 'ನೇರ ಸಂಪರ್ಕ',
      whatsappBtn: 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಚಾಟ್ ಮಾಡಿ',
      callBtn: 'ನೇರವಾಗಿ ಕರೆ ಮಾಡಿ',
      responseTime: 'ಸರಾಸರಿ ಪ್ರತಿಕ್ರಿಯೆ ಸಮಯ: 15 ನಿಮಿಷಗಳು',
      addressLabel: 'ಕಚೇರಿ ವಿಳಾಸ',
    },
    footer: {
      tagline: 'AI • ಆಟೊಮೇಷನ್ • ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್ • ವ್ಯಾಪಾರ ಬೆಳವಣಿಗೆ',
      description:
        'ಮುಂದಿನ ಪೀಳಿಗೆಯ ಡಿಜಿಟಲ್ ಅನುಭವಗಳು, AI ಆಟೊಮೇಷನ್‌ಗಳು, ವಾಯ್ಸ್ ಕಾಲಿಂಗ್ ಏಜೆಂಟ್‌ಗಳು ಮತ್ತು ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್ ಸೇವೆಗಳು.',
      navigation: 'ನ್ಯಾವಿಗೇಷನ್',
      contact: 'ಸಂಪರ್ಕ',
      social: 'ಸಾಮಾಜಿಕ ಮಾಧ್ಯಮ',
      allRightsReserved: 'ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.',
      designedWith: 'ಎಲೈಟ್ ಡಿಜಿಟಲ್ ಏಜೆನ್ಸಿ ನಿರ್ಮಿಸಿದೆ.',
    },
  },

  ml: {
    navbar: {
      home: 'ഹോം',
      about: 'ഞങ്ങളെക്കുറിച്ച്',
      skills: 'കഴിവുകൾ (Skills)',
      projects: 'പദ്ധതികൾ (Projects)',
      contact: 'ബന്ധപ്പെടുക',
      admin: 'അഡ്മിൻ',
      getInTouch: 'ബന്ധപ്പെടുക',
      chooseLanguage: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
    },
    languageBanner: {
      title: 'വെബ്സൈറ്റ് ഭാഷ തിരഞ്ഞെടുക്കുക (Language Selection):',
      subtitle: 'നിങ്ങളുടെ ഇഷ്ടപ്പെട്ട ഭാഷയിൽ പൂർണ്ണ വെബ്‌സൈറ്റും വോയ്‌സ് വിവരണവും അനുഭവിക്കുക',
    },
    hero: {
      badge: 'AI & ഡിജിറ്റൽ ഗ്രോത്ത് ഏജൻസി • ELITE DIGITAL AGENCY',
      titlePart1: 'നിങ്ങളുടെ ബിസിനസ്സിന് നൽകൂ',
      titleGradient: 'അത്യാധുനിക AI & ഡിജിറ്റൽ',
      titlePart2: 'മാറ്റം',
      description:
        'എലൈറ്റ് ഡിജിറ്റൽ ഏജൻസി വഴി 24/7 AI വോയ്‌സ് കോളിംഗ് ഏജന്റുകൾ, വെരിഫൈഡ് ഗൂഗിൾ മാപ്‌സ് സ്റ്റോർ സെറ്റപ്പ്, 3D വെബ്‌സൈറ്റുകൾ, ഹൈ-ROAS മെറ്റാ പരസ്യങ്ങൾ എന്നിവ ഉപയോഗിച്ച് നിങ്ങളുടെ ബിസിനസ്സ് വളർത്തുക.',
      highlights: [
        '24/7 AI വോയ്‌സ് കോളിംഗ് & റിസപ്ഷൻ ഏജന്റുകൾ',
        'ഗൂഗിൾ മാപ്‌സ് വെരിഫിക്കേഷൻ & ലോക്കൽ SEO റാങ്കിംഗ്',
        'അതിവേഗ ആധുനിക 3D വെബ് ആപ്ലിക്കേഷനുകൾ',
        'ഹൈ-ROAS മെറ്റാ പരസ്യങ്ങൾ & AI വീഡിയോകൾ',
      ],
      exploreSkills: 'കഴിവുകൾ & ഓഡിയോ കേൾക്കൂ',
      viewProjects: 'പ്രോജക്ടുകൾ കാണുക',
      contactUs: 'സൗജന്യ കൺസൾട്ടേഷൻ ബുക്ക് ചെയ്യുക',
      stats: {
        projectsValue: '50+',
        projectsLabel: 'വിജയകരമായ പ്രോജക്ടുകൾ',
        speedValue: '<1 സെക്കൻഡ്',
        speedLabel: 'AI പ്രതികരണ വേഗത',
        satisfactionValue: '100%',
        satisfactionLabel: 'ഉപഭോക്തൃ സംതൃപ്തി',
      },
      hostGreeting:
        'നമസ്കാരം! എലൈറ്റ് ഡിജിറ്റൽ ഏജൻസിയിലേക്ക് സ്വാഗതം. ഞാൻ ലഹരി. ആധുനിക AI ഓട്ടോമേഷൻ, ഗൂഗിൾ മാപ്‌സ് ഗ്രോത്ത്, വെബ്‌സൈറ്റുകൾ എന്നിവയിലൂടെ നിങ്ങളുടെ ബിസിനസ്സ് വികസിപ്പിക്കാൻ ഞങ്ങൾ സഹായിക്കുന്നു.',
      hostTitle: 'ലഹരി (Lahari)',
      hostSubtitle: 'എലൈറ്റ് ഡിജിറ്റൽ ഏജൻസി AI അവതാരക',
      hostAudioOn: 'വോയ്‌സ് ഓൺ ആണ്',
      hostAudioOff: 'ലഹരിയുടെ ശബ്ദം കേൾക്കൂ',
    },
    about: {
      badge: 'ഞങ്ങൾ ആര് • WHO WE ARE',
      title: 'എലൈറ്റ് ഡിജിറ്റൽ ഏജൻസിയെക്കുറിച്ച്',
      description:
        'എലൈറ്റ് ഡിജിറ്റൽ ഏജൻസി ബിസിനസുകൾക്കും ബ്രാൻഡുകൾക്കും AI, ഓട്ടോമേഷൻ, ക്രിയേറ്റീവ് കണ്ടന്റ്, ആധുനിക വെബ്‌സൈറ്റുകൾ, ഡിജിറ്റൽ മാർക്കറ്റിംഗ് എന്നിവയിലൂടെ ശക്തമായ ഡിജിറ്റൽ സാന്നിധ്യം ഉറപ്പാക്കാൻ സഹായിക്കുന്നു.',
      pillars: {
        aiAgents: {
          title: 'AI & വോയ്‌സ് കോളിംഗ് ഏജന്റുകൾ',
          description:
            'ഉപഭോക്താക്കളുമായി സംസാരിക്കുന്ന 24/7 AI വോയ്‌സ് കോളിംഗ് സംവിധാനങ്ങൾ, സ്മാർട്ട് ചാറ്റ്ബോട്ടുകൾ, ബിസിനസ്സ് ഓട്ടോമേഷൻ.',
          highlights: ['24/7 AI വോയ്‌സ് കോളിംഗ് സിസ്റ്റം', 'ഓട്ടോമേറ്റഡ് ബിസിനസ്സ് വർക്ക്‌ഫ്ലോകൾ', 'സ്മാർട്ട് ലീഡ് ചാറ്റ്ബോട്ടുകൾ'],
        },
        googleMaps: {
          title: 'ഗൂഗിൾ മാപ്‌സ് & ലോക്കൽ റാങ്കിംഗ്',
          description:
            'ഗൂഗിൾ ബിസിനസ്സ് പ്രൊഫൈൽ സെറ്റപ്പ്, GPS പിൻ വെരിഫിക്കേഷൻ, പ്രാദേശിക ഉപഭോക്താക്കളെ ആകർഷിക്കുന്ന റാങ്കിംഗ്.',
          highlights: ['ഗൂഗിൾ മാപ്‌സ് പിൻ വെരിഫിക്കേഷൻ', 'ലോക്കൽ "Near Me" SEO', '5-സ്റ്റാർ റിവ്യൂ വളർച്ച'],
        },
        web3d: {
          title: 'വെബ് & 3D ഡിജിറ്റൽ അനുഭവങ്ങൾ',
          description:
            'അതിവേഗ ലോഡിംഗ്, ആധുനിക ഫ്രോസ്റ്റഡ് ഗ്ലാസ് ലുക്ക്, മൊബൈൽ സൗഹൃദ 3D വെബ്‌സൈറ്റുകൾ.',
          highlights: ['ആധുനിക വെബ് ഘടന', '3D ഇന്ററാക്ടീവ് ഇന്റർഫേസ്', 'അതിവേഗ ലോഡിംഗ് വേഗത'],
        },
        metaAds: {
          title: 'മെറ്റാ പരസ്യങ്ങൾ & ക്രിയേറ്റീവ് മീഡിയ',
          description:
            'ഫേസ്ബുക്ക്, ഇൻസ്റ്റാഗ്രാം ഹൈ-ROAS പരസ്യങ്ങൾ, സിനിമാറ്റിക് AI വീഡിയോകൾ, ആഡംബര വിവാഹ ക്ഷണക്കത്ത് വീഡിയോകൾ.',
          highlights: ['ഹൈ-ROAS മെറ്റാ പരസ്യങ്ങൾ', 'സിനിമാറ്റിക് AI വീഡിയോകൾ', 'ആകർഷകമായ വിവാഹ ക്ഷണക്കത്ത് വീഡിയോകൾ'],
        },
      },
      exploreSkillsBtn: 'എല്ലാ കഴിവുകളും കാണുക',
    },
    skills: {
      badge: 'ഇന്ററാക്ടീവ് കഴിവുകൾ • GALAXY',
      title: '3D സ്കിൽസ് ഗാലക്സി (Skills Galaxy)',
      description:
        'AI, ഡിജിറ്റൽ എഞ്ചിനീയറിംഗ്, ക്രിയേറ്റീവ് പ്രൊഡക്ഷൻ എന്നിവയിലെ ഞങ്ങളുടെ വൈദഗ്ധ്യം അറിയുക. ഏത് കാർഡിലും ക്ലിക്ക് ചെയ്ത് ഇഷ്ടപ്പെട്ട ഭാഷയിൽ തത്സമയ ശബ്ദ വിവരണം കേൾക്കുക.',
      audioLanguageLabel: 'ഓഡിയോ വിവരണ ഭാഷ:',
      allCategory: 'എല്ലാം',
      tapToListen: 'കേൾക്കാൻ ടാപ്പ് ചെയ്യുക',
      categories: {
        'All': 'എല്ലാം (All)',
        'AI & Automation': 'AI & ഓട്ടോമേഷൻ',
        'Local Growth & Maps': 'ലോക്കൽ ഗ്രോത്ത് & മാപ്‌സ്',
        'Development': 'വെബ് ഡെവലപ്‌മെന്റ്',
        'Marketing': 'മാർക്കറ്റിംഗ് & പരസ്യങ്ങൾ',
        'Creative & Video': 'ക്രിയേറ്റീവ് & വീഡിയോകൾ',
        'Creative & Design': 'ഡിസൈൻ & ബ്രാൻഡിംഗ്',
      },
    },
    projects: {
      badge: 'പോർട്ട്ഫോളിയോ & പരിഹാരങ്ങൾ',
      title: 'ഞങ്ങൾ നിർമ്മിച്ച പദ്ധതികൾ',
      description: 'ഞങ്ങൾ വിജയകരമായി പൂർത്തിയാക്കിയ ഡിജിറ്റൽ അനുഭവങ്ങളും AI സൊല്യൂഷനുകളും.',
      allCategory: 'എല്ലാം',
      viewProject: 'വിശദാംശങ്ങൾ കാണുക',
      liveDemo: 'തത്സമയ ഡെമോ',
      shareProject: 'പങ്കിടുക',
      categories: {
        'All': 'എല്ലാം (All)',
        'AI Automation': 'AI ഓട്ടോമേഷൻ',
        'AI Calling Agents': 'AI കോളിംഗ് ഏജന്റുകൾ',
        'Local SEO & Maps': 'ലോക്കൽ SEO & മാപ്‌സ്',
        'AI Agent': 'AI ഏജന്റ്',
        'AI Chatbot': 'AI ചാറ്റ്ബോട്ട്',
        'AI Videos': 'AI വീഡിയോകൾ',
        'Websites': 'വെബ്‌സൈറ്റുകൾ',
        'Social Media Management': 'സോഷ്യൽ മീഡിയ മാനേജ്‌മെന്റ്',
        'Meta Ads': 'മെറ്റാ പരസ്യങ്ങൾ',
        'Wedding Invitation Videos': 'വിവാഹ ക്ഷണക്കത്ത് വീഡിയോകൾ',
      },
    },
    contact: {
      badge: 'ബന്ധപ്പെടുക • CONTACT',
      title: 'ഒരു പുതിയ പ്രോജക്റ്റ് ആരംഭിക്കാം',
      description:
        'നിങ്ങളുടെ ബിസിനസ്സിനെ AI സാങ്കേതികവിദ്യയിലൂടെ ഉയർത്താൻ തയ്യാറാണോ? ഫോം പൂരിപ്പിക്കുക അല്ലെങ്കിൽ വാട്സാപ്പ് വഴി ബന്ധപ്പെടുക.',
      formTitle: 'പ്രോജക്റ്റ് വിവരങ്ങൾ അയക്കുക',
      formSubtitle: '15 മിനിറ്റിനുള്ളിൽ ഞങ്ങൾ മറുപടി നൽകും',
      nameLabel: 'മുഴുവൻ പേര് *',
      namePlaceholder: 'ഉദാ: രാഹുൽ കൃഷ്ണൻ',
      emailLabel: 'ഇമെയിൽ വിലാസം *',
      emailPlaceholder: 'rahul@example.com',
      phoneLabel: 'ഫോൺ നമ്പർ / വാട്സാപ്പ്',
      phonePlaceholder: '+91 98765 43210',
      serviceLabel: 'ആവശ്യമായ സേവനം *',
      messageLabel: 'പ്രോജക്റ്റ് വിവരങ്ങൾ *',
      messagePlaceholder: 'നിങ്ങളുടെ ബിസിനസ്സ് ആവശ്യങ്ങളെക്കുറിച്ച് എഴുതുക...',
      submitBtn: 'സന്ദേശം അയക്കുക',
      submitting: 'അയക്കുന്നു...',
      successTitle: 'സന്ദേശം വിജയകരമായി അയച്ചു!',
      successMessage: 'നന്ദി! നിങ്ങളുടെ സന്ദേശം ലഭിച്ചു. ഉടൻ തന്നെ വാട്സാപ്പ് അല്ലെങ്കിൽ ഇമെയിൽ വഴി ബന്ധപ്പെടും.',
      sendAnother: 'മറ്റൊരു സന്ദേശം അയക്കുക',
      directContactTitle: 'നേരിട്ടുള്ള ബന്ധപ്പെടൽ',
      whatsappBtn: 'വാട്സാപ്പിൽ ചാറ്റ് ചെയ്യുക',
      callBtn: 'നേരിട്ട് വിളിക്കുക',
      responseTime: 'ശരാശരി പ്രതികരണ സമയം: 15 മിനിറ്റ്',
      addressLabel: 'ഓഫീസ് വിലാസം',
    },
    footer: {
      tagline: 'AI • ഓട്ടോമേഷൻ • ഗൂഗിൾ മാപ്‌സ് • വളർച്ച',
      description:
        'അത്യാധുനിക ഡിജിറ്റൽ അനുഭവങ്ങൾ, AI ഓട്ടോമേഷനുകൾ, വോയ്‌സ് കോളിംഗ് ഏജന്റുകൾ, ഗൂഗിൾ മാപ്‌സ് സേവനങ്ങൾ.',
      navigation: 'നാവിഗേഷൻ',
      contact: 'ബന്ധപ്പെടുക',
      social: 'സോഷ്യൽ മീഡിയ',
      allRightsReserved: 'എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം.',
      designedWith: 'എലൈറ്റ് ഡിജിറ്റൽ ഏജൻസി രൂപകൽപ്പന ചെയ്തത്.',
    },
  },
};
