import { SupportedLanguage } from '../data/skillTranslations';

export interface DialogueNode {
  step: 'greeting' | 'ask_needs' | 'ask_name' | 'ask_contact' | 'thank_you_close';
  text: string;
  expectedInputPrompt: string;
}

export const CONVERSATION_SCRIPTS: Record<
  SupportedLanguage,
  {
    greeting: string;
    skillsSummary: string;
    askNeeds: string;
    askName: string;
    askContact: string;
    thankYouClose: string;
    callEndedBanner: string;
    typingIndicator: string;
    whatsappGreeting: string;
    serviceKeywordMatchReplies: Record<string, string>;
  }
> = {
  te: {
    greeting:
      'నమస్తే! Elite Digital Agency కి స్వాగతం. మేము AI Voice Calling Agents, AI Automations, AI Chatbots, Google Maps Setup, Modern Websites, SEO, Branding & Meta Ads సేవలను అందిస్తాము. మీకు మా ఏజెన్సీ నుండి ఏ సర్వీస్ కావాలి?',
    skillsSummary:
      'మేము AI వాయిస్ కాలింగ్, ఆటోమేషన్, గూగుల్ మ్యాప్స్, వెబ్‌సైట్స్ మరియు డిజిటల్ మార్కెటింగ్ సేవలను అందిస్తాము.',
    askNeeds: 'మీకు ఏ సర్వీస్ లేదా ప్రాజెక్ట్ అవసరం ఉందో దయచేసి చెప్పండి?',
    askName: 'చాలా మంచిది! మీ ప్రాజెక్ట్ వివరాలను మా సీనియర్ టీమ్‌కి ఫార్వర్డ్ చేయడానికి దయచేసి మీ పేరు చెప్పండి?',
    askContact:
      'ధన్యవాదాలు! మా టీమ్ మిమ్మల్ని వెంటనే సంప్రదించడానికి మీ ఫోన్ నంబర్ లేదా ఈమెయిల్ ఐడీ చెప్పండి?',
    thankYouClose:
      'చాలా ధన్యవాదాలు! మీ వివరాలు మరియు ప్రాజెక్ట్ రిక్వెస్ట్ విజయవంతంగా నమోదయ్యాయి. మా ఎలైట్ టీమ్ త్వరలోనే మిమ్మల్ని సంప్రదిస్తుంది. హావ్ ఎ గ్రేట్ డే!',
    callEndedBanner: 'కాల్ ముగిసింది • ప్రాజెక్ట్ ఎంక్వైరీ విజయవంతంగా నమోదైంది',
    typingIndicator: 'AI సమాధానం టైప్ చేస్తోంది...',
    whatsappGreeting:
      'నమస్తే! Elite Digital Agency కి స్వాగతం. మేము AI Voice Calling, AI Automations, Google Maps Setup, Websites & Meta Ads అందిస్తున్నాం. మీకు ఏ సర్వీస్ కావాలి?',
    serviceKeywordMatchReplies: {
      default: 'ధన్యవాదాలు! మీ ప్రాజెక్ట్ కోసం మా టీమ్ ప్లాన్ సిద్ధం చేస్తుంది. దయచేసి మీ పేరు మరియు ఫోన్ నంబర్ లేదా ఈమెయిల్ ఇవ్వండి.',
    },
  },
  en: {
    greeting:
      'Hi, welcome to Elite Digital Agency! We engineer AI Voice Calling Agents, AI Automations, AI Chatbots, Google Maps Setup, Modern High-Speed Websites, SEO, Video Production & Meta Ads. Which service are you looking for today?',
    skillsSummary:
      'We offer AI Voice Calling Agents, Automations, Chatbots, Google Maps Store Setup, Custom Websites, SEO, and Meta Ads.',
    askNeeds: 'Please tell me which service or solution you would like for your business?',
    askName: 'Excellent! To tailor the proposal and connect you with our specialist, may I know your name?',
    askContact:
      'Thank you! Please share your phone number or email address so our team can send the details.',
    thankYouClose:
      'Thank you so much! Your details and project requirements have been successfully registered with our team. Our team will contact you shortly. Have a wonderful day!',
    callEndedBanner: 'Call Completed • Project Inquiry Successfully Registered',
    typingIndicator: 'AI is typing...',
    whatsappGreeting:
      'Hi! Welcome to Elite Digital Agency. We specialize in AI Voice Calling Agents, Automations, Google Maps, Websites & Meta Ads. Which service are you looking for?',
    serviceKeywordMatchReplies: {
      default: 'Got it! To help our team prepare the exact quote, could you please share your name and contact number/email?',
    },
  },
  hi: {
    greeting:
      'नमस्ते! Elite Digital Agency में आपका स्वागत है। हम AI Voice Calling Agents, AI Automations, Google Maps Setup, Websites, SEO और Meta Ads प्रदान करते हैं। आपको कौन सी सर्विस चाहिए?',
    skillsSummary:
      'हम AI वॉयस कॉलिंग, ऑटोमेशन, गूगल मैप्स, वेबसाइट्स और डिजिटल मार्केटिंग समाधान प्रदान करते हैं।',
    askNeeds: 'कृपया बताएं कि आपके व्यवसाय के लिए आपको कौन सी सेवा चाहिए?',
    askName: 'बहुत बढ़िया! आपकी प्रोजेक्ट डिटेल्स नोट करने के लिए कृपया अपना नाम बताएं?',
    askContact:
      'धन्यवाद! हमारी टीम द्वारा तुरंत संपर्क करने के लिए कृपया अपना फोन नंबर या ईमेल आईडी बताएं?',
    thankYouClose:
      'बहुत-बहुत धन्यवाद! आपकी सारी जानकारी और आवश्यकताएं सफलतापूर्वक दर्ज कर ली गई हैं। हमारी टीम जल्द ही आपसे संपर्क करेगी। आपका दिन शुभ हो!',
    callEndedBanner: 'कॉल समाप्त • पूछताछ सफलतापूर्वक दर्ज की गई',
    typingIndicator: 'AI टाइप कर रहा है...',
    whatsappGreeting:
      'नमस्ते! Elite Digital Agency में आपका स्वागत है। हम AI Calling Agents, Automations, Google Maps और Websites प्रदान करते हैं। आपको किस सेवा की आवश्यकता है?',
    serviceKeywordMatchReplies: {
      default: 'धन्यवाद! आपकी सहायता के लिए कृपया अपना नाम और फोन नंबर/ईमेल शेयर करें।',
    },
  },
  ta: {
    greeting:
      'வணக்கம்! Elite Digital Agency க்கு உங்களை வரவேற்கிறோம். நாங்கள் AI Voice Calling Agents, AI Automations, Google Maps Setup, Websites மற்றும் Meta Ads சேவைகளை வழங்குகிறோம். உங்களுக்கு எந்த சேவை தேவை?',
    skillsSummary:
      'நாங்கள் AI வாய்ஸ் காலிங், ஆட்டோமேஷன், கூகுள் மேப்ஸ் மற்றும் இணையதள சேவைகளை வழங்குகிறோம்.',
    askNeeds: 'உங்கள் வணிகத்திற்கு எந்த சேவை தேவை என்று தயவுசெய்து கூறுங்கள்?',
    askName: 'அருமை! திட்ட விவரங்களை பதிவு செய்ய உங்கள் பெயரை கூறவும்?',
    askContact:
      'நன்றி! எங்கள் குழு உங்களை தொடர்பு கொள்ள உங்கள் தொலைபேசி எண் அல்லது மின்னஞ்சலை பகிரவும்?',
    thankYouClose:
      'மிக்க நன்றி! உங்கள் விவரங்கள் மற்றும் தேவைகள் வெற்றிகரமாக பதிவு செய்யப்பட்டுள்ளது. எங்கள் குழு விரைவில் உங்களை தொடர்பு கொள்ளும். நல்ல நாளாக அமையட்டும்!',
    callEndedBanner: 'அழைப்பு முடிந்தது • தகவல் வெற்றிகரமாக பதிவு செய்யப்பட்டது',
    typingIndicator: 'AI தட்டச்சு செய்கிறது...',
    whatsappGreeting:
      'வணக்கம்! Elite Digital Agency க்கு வருக. AI Voice Calling, Google Maps, Websites & Ads சேவைகளில் எது உங்களுக்கு வேண்டும்?',
    serviceKeywordMatchReplies: {
      default: 'நன்றி! உங்கள் பெயர் மற்றும் தொடர்பு எண்ணை பகிருங்கள்.',
    },
  },
  kn: {
    greeting:
      'ನಮಸ್ಕಾರ! Elite Digital Agency ಗೆ ಸ್ವಾಗತ. ನಾವು AI Voice Calling Agents, AI Automations, Google Maps Setup, Websites & Meta Ads ಸೇವೆಗಳನ್ನು ಒದಗಿಸುತ್ತೇವೆ. ನಿಮಗೆ ಯಾವ ಸೇವೆ ಬೇಕು?',
    skillsSummary:
      'ನಾವು AI ವಾಯ್ಸ್ ಕಾಲಿಂಗ್, ಆಟೊಮೇಷನ್, ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್ ಮತ್ತು ವೆಬ್‌ಸೈಟ್ ಸೇವೆಗಳನ್ನು ಒದಗಿಸುತ್ತೇವೆ.',
    askNeeds: 'ನಿಮ್ಮ ವ್ಯವಹಾರಕ್ಕೆ ಯಾವ ಸೇವೆ ಬೇಕು ಎಂದು ದಯವಿಟ್ಟು ತಿಳಿಸಿ?',
    askName: 'ಉತ್ತಮ! ನಿಮ್ಮ ಪ್ರಾಜೆಕ್ಟ್ ವಿವರಗಳಿಗಾಗಿ ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರನ್ನು ತಿಳಿಸಿ?',
    askContact:
      'ಧನ್ಯವಾದಗಳು! ನಮ್ಮ ತಂಡ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಲು ದಯವಿಟ್ಟು ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆ ಅಥವಾ ಇಮೇಲ್ ನೀಡಿ?',
    thankYouClose:
      'ತುಂಬಾ ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ವಿವರಗಳು ಮತ್ತು ಪ್ರಾಜೆಕ್ಟ್ ಮಾಹಿತಿ ಯಶಸ್ವಿಯಾಗಿ ದಾಖಲಾಗಿದೆ. ನಮ್ಮ ತಂಡ ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತದೆ. ಹ್ಯಾವ್ ಎ ಗ್ರೇಟ್ ಡೇ!',
    callEndedBanner: 'ಕರೆ ಮುಕ್ತಾಯಗೊಂಡಿದೆ • ಮಾಹಿತಿ ಯಶಸ್ವಿಯಾಗಿ ದಾಖಲಾಗಿದೆ',
    typingIndicator: 'AI ಟೈಪ್ ಮಾಡುತ್ತಿದೆ...',
    whatsappGreeting:
      'ನಮಸ್ಕಾರ! Elite Digital Agency ಗೆ ಸ್ವಾಗತ. AI Voice Calling, Websites & Meta Ads ಗಳಲ್ಲಿ ನಿಮಗೆ ಏನು ಬೇಕು?',
    serviceKeywordMatchReplies: {
      default: 'ಧನ್ಯವಾದಗಳು! ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರು ಮತ್ತು ಫೋನ್ ಸಂಖ್ಯೆ ತಿಳಿಸಿ.',
    },
  },
  ml: {
    greeting:
      'നമസ്കാരം! Elite Digital Agency ലേക്ക് സ്വാഗതം. ഞങ്ങൾ AI Voice Calling Agents, AI Automations, Google Maps Setup, Websites & Meta Ads നൽകുന്നു. നിങ്ങൾക്ക് ഏത് സേവനമാണ് വേണ്ടത്?',
    skillsSummary:
      'ഞങ്ങൾ AI വോയ്സ് കോളിംഗ്, ഓട്ടോമേഷൻ, ഗൂഗിൾ മാപ്സ്, വെബ്‌സൈറ്റുകൾ എന്നിവ നൽകുന്നു.',
    askNeeds: 'നിങ്ങൾക്ക് ഏത് സേവനമാണ് ആവശ്യമെന്ന് ദയവായി പറയുക?',
    askName: 'വളരെ നല്ലത്! പ്രോജക്റ്റ് വിശദാംശങ്ങൾക്കായി ദയവായി നിങ്ങളുടെ പേര് പറയുക?',
    askContact:
      'നന്ദി! ഞങ്ങളുടെ ടീം ബന്ധപ്പെടാൻ നിങ്ങളുടെ ഫോൺ നമ്പറോ ഇമെയിലോ നൽകുക?',
    thankYouClose:
      'വളരെ നന്ദി! നിങ്ങളുടെ വിവരങ്ങളും പ്രോജക്റ്റ് ആവശ്യകതകളും വിജയകരമായി രജിസ്റ്റർ ചെയ്തു. ഞങ്ങളുടെ ടീം ഉടൻ ബന്ധപ്പെടും. ഹാവ് എ ഗ്രേറ്റ് ഡേ!',
    callEndedBanner: 'കോൾ അവസാനിച്ചു • വിവരങ്ങൾ വിജയകരമായി രജിസ്റ്റർ ചെയ്തു',
    typingIndicator: 'AI ടൈപ്പ് ചെയ്യുന്നു...',
    whatsappGreeting:
      'നമസ്കാരം! Elite Digital Agency ലേക്ക് സ്വാഗതം. AI Calling, Google Maps & Websites ൽ എന്ത് സേവനമാണ് വേണ്ടത്?',
    serviceKeywordMatchReplies: {
      default: 'നന്ദി! ദയവായി നിങ്ങളുടെ പേരും ഫോൺ നമ്പറും പങ്കിടുക.',
    },
  },
};
