export const languages = {
  en: 'English',
  te: 'తెలుగు',
  hi: 'हिंदी',
};

export const defaultLang = 'en';

export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.cars': 'Cars',
    'nav.locations': 'Locations',
    'nav.blog': 'Insights',
    'nav.contact': 'Service & Contact',
    'hero.title': 'The Future Is Here.',
    'hero.cta': 'Chat on WhatsApp',
    'whatsapp.msg': 'Hi Prakash Hyundai, I am interested in a car.',
    'blog.title': 'Latest Insights',
    'loc.title': 'Visit Our Showrooms',
    'contact.title': 'Get in Touch',
  },
  te: {
    'nav.home': 'ముఖపుట',
    'nav.cars': 'కార్లు',
    'nav.locations': 'షోరూమ్స్',
    'nav.blog': 'విశేషాలు',
    'nav.contact': 'సంప్రదించండి',
    'hero.title': 'భవిష్యత్తు ఇక్కడే ఉంది.',
    'hero.cta': 'వాట్సాప్ లో చాట్ చేయండి',
    'whatsapp.msg': 'నమస్తే ప్రకాష్ హ్యుందాయ్, నేను వాహనాల పట్ల ఆసక్తిగా ఉన్నాను.',
    'blog.title': 'తాజా విశేషాలు',
    'loc.title': 'మా షోరూమ్స్',
    'contact.title': 'మమ్మల్ని సంప్రదించండి',
  },
  hi: {
    'nav.home': 'होम',
    'nav.cars': 'कारें',
    'nav.locations': 'लोकेशन्स',
    'nav.blog': 'जानकारी',
    'nav.contact': 'संपर्क करें',
    'hero.title': 'भविष्य यहाँ है।',
    'hero.cta': 'व्हाट्सएप पर चैट करें',
    'whatsapp.msg': 'नमस्ते प्रकाश ह्यूंदै, मैं वाहनों में रुचि रखता हूं।',
    'blog.title': 'नवीनतम जानकारी',
    'loc.title': 'हमारे शोरूम',
    'contact.title': 'संपर्क करें',
  },
} as const;

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}