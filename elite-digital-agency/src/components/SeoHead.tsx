import React, { useEffect } from 'react';
import { AgencySettings, BlogPost } from '../types';
import { SupportedLanguage } from '../data/skillTranslations';

interface SeoHeadProps {
  settings: AgencySettings;
  currentLanguage: SupportedLanguage;
  activeSection?: string;
  activeBlog?: BlogPost | null;
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  settings,
  currentLanguage,
  activeSection = 'home',
  activeBlog = null,
}) => {
  useEffect(() => {
    // 1. Dynamic Titles & Descriptions based on language & active context
    let pageTitle = settings.seo_title || 'Elite Digital Agency | AI Automation, AI Agents, Websites & Digital Marketing';
    let metaDescription = settings.seo_description || 'Elite Digital Agency creates AI automations, AI voice calling agents, verified Google Maps store setup, websites, and high-ROI marketing.';

    if (activeBlog) {
      const blogTitle = currentLanguage === 'te' && activeBlog.title_te ? activeBlog.title_te : activeBlog.title;
      const blogDesc = currentLanguage === 'te' && activeBlog.excerpt_te ? activeBlog.excerpt_te : activeBlog.excerpt;
      pageTitle = `${blogTitle} | Elite Digital Agency Blog`;
      metaDescription = blogDesc;
    } else if (currentLanguage === 'te') {
      pageTitle = 'ఎలైట్ డిజిటల్ ఏజెన్సీ | AI ఆటోమేషన్, AI కాలింగ్ ఏజెంట్స్, గూగుల్ మ్యాప్స్ & వెబ్‌సైట్స్';
      metaDescription = 'ఎలైట్ డిజిటల్ ఏజెన్సీ: మీ వ్యాపారానికి AI వాయిస్ కాలింగ్ ఏజెంట్లు, గూగుల్ మ్యాప్స్ 3-ప్యాక్ ర్యాంకింగ్, 3D వెబ్‌సైట్లు, వాట్సాప్ చాట్‌బాట్‌లు మరియు మెటా యాడ్స్ సర్వీసులు.';
    } else if (currentLanguage === 'hi') {
      pageTitle = 'एलीट डिजिटल एजेंसी | AI ऑटोमेशन, AI कॉलिंग एजेंट्स, गूगल मैप्स और वेबसाइट्स';
      metaDescription = 'एलीट डिजिटल एजेंसी: AI वॉयस कॉलिंग एजेंट्स, गूगल मैप्स 3-पैक रैंकिंग, 3D वेबसाइट्स, व्हाट्सएप चैटबॉट्स और मेटा ऐड्स।';
    }

    document.title = pageTitle;

    // Helper to set or update meta tag
    const setMetaTag = (attr: 'name' | 'property', key: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Primary Meta Tags & Comprehensive High-Value Keywords
    const allKeywords = currentLanguage === 'te'
      ? 'AI వాయిస్ కాలింగ్ ఏజెంట్లు, గూగుల్ మ్యాప్స్ లోకల్ SEO, వాట్సాప్ AI చాట్‌బాట్, 3D వెబ్‌సైట్ డిజైన్, AI ఆటోమేషన్ ఏజెన్సీ, తెలుగు AI కాలింగ్ బాట్, గూగుల్ బిజినెస్ ప్రొఫైల్ వెరిఫికేషన్, హైదరాబాద్ లోకల్ SEO, విజయవాడ డిజిటల్ మార్కెటింగ్, మెటా యాడ్స్ ఎక్స్‌పర్ట్, లీడ్ జనరేషన్ ఏజెన్సీ, ఎలైట్ డిజిటల్ ఏజెన్సీ, Business Automation Telugu, AI Voice Calling Agent, Google Maps 3 Pack Ranking'
      : currentLanguage === 'hi'
      ? 'AI वॉयस कॉलिंग एजेंट्स, गूगल मैप्स लोकल SEO, व्हाट्सएप AI चैटबॉट, 3D वेबसाइट डिजाइन, AI ऑटोमेशन एजेंसी, गूगल बिजनेस प्रोफाइल वेरिफिकेशन, मेटा ऐड्स एक्सपर्ट, लीड जनरेशन, एलीट डिजिटल एजेंसी, AI Voice Calling Agent, Local SEO 3 Pack Ranking'
      : 'AI Voice Calling Agents, AI Voice Agent Telugu, Google Maps SEO, Google Business Profile Verification, Google Maps 3 Pack Ranking, Local SEO Agency Hyderabad, Local SEO Agency Vijayawada, WhatsApp AI Chatbot, 3D Website Design, Three.js Web Development, AI Automation Agency, Meta Ads Expert, Lead Generation Agency, Telugu Digital Marketing Agency, AI Outbound Calling Bot, Autonomous Sales Agents, Instagram Ads Agency, Google Ads Management, Local Store Google Map Setup, Voice AI CRM Integration, Elite Digital Agency, Best AI Agency India, Business Automation Telugu, AI Lead Qualification, SEO Services Andhra Pradesh Telangana';

    setMetaTag('name', 'description', metaDescription);
    setMetaTag('name', 'keywords', allKeywords);
    setMetaTag('name', 'news_keywords', 'AI Voice Agents, Google Maps 3-Pack, WhatsApp AI Bots, 3D Websites, AI Automation 2026');
    setMetaTag('name', 'author', 'Elite Digital Agency');
    setMetaTag('name', 'publisher', 'Elite Digital Agency');
    setMetaTag('name', 'copyright', 'Elite Digital Agency');
    setMetaTag('name', 'coverage', 'Worldwide, India, Andhra Pradesh, Telangana, USA, UK, UAE');
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('name', 'googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setMetaTag('name', 'bingbot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    // Geo tags for Local SEO
    setMetaTag('name', 'geo.region', 'IN-AP');
    setMetaTag('name', 'geo.placename', 'Andhra Pradesh & Telangana, Hyderabad, Vijayawada, Visakhapatnam, Bengaluru, India');
    setMetaTag('name', 'geo.position', '16.5062;80.6480');
    setMetaTag('name', 'ICBM', '16.5062, 80.6480');

    // Open Graph
    setMetaTag('property', 'og:title', pageTitle);
    setMetaTag('property', 'og:description', metaDescription);
    setMetaTag('property', 'og:type', activeBlog ? 'article' : 'website');
    setMetaTag('property', 'og:url', window.location.href);
    setMetaTag('property', 'og:site_name', 'Elite Digital Agency');
    setMetaTag('property', 'og:image', activeBlog ? activeBlog.cover_image : 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=1200&q=80');
    setMetaTag('property', 'og:locale', currentLanguage === 'te' ? 'te_IN' : currentLanguage === 'hi' ? 'hi_IN' : 'en_US');

    // Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', pageTitle);
    setMetaTag('name', 'twitter:description', metaDescription);
    setMetaTag('name', 'twitter:image', activeBlog ? activeBlog.cover_image : 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=1200&q=80');

    // Canonical link tag
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', window.location.origin + (activeBlog ? `#blog-${activeBlog.slug}` : ''));

    // 2. Structured Data JSON-LD Schemas
    const structuredSchemas = [
      // WebSite Schema with SearchAction
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${window.location.origin}/#website`,
        'url': window.location.origin,
        'name': 'Elite Digital Agency',
        'description': settings.seo_description,
        'inLanguage': ['en', 'te', 'hi'],
        'potentialAction': {
          '@type': 'SearchAction',
          'target': `${window.location.origin}/#search?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      },
      // Organization & ProfessionalService Schema
      {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': `${window.location.origin}/#organization`,
        'name': 'Elite Digital Agency',
        'url': window.location.origin,
        'logo': `${window.location.origin}/elite-logo.svg`,
        'image': 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=1200&q=80',
        'telephone': `+91-${settings.phone || '8500995671'}`,
        'email': settings.email || 'elitedigitalagency1145@gmail.com',
        'priceRange': '₹₹ - ₹₹₹₹',
        'address': {
          '@type': 'PostalAddress',
          'addressCountry': 'IN',
          'addressRegion': 'Andhra Pradesh & Telangana',
          'addressLocality': 'Hyderabad / Vijayawada / Global'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 16.5062,
          'longitude': 80.6480
        },
        'openingHoursSpecification': [
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            'opens': '00:00',
            'closes': '23:59'
          }
        ],
        'sameAs': [
          settings.instagram_url || 'https://instagram.com/elitedigitalagency_1145',
          settings.youtube_url || 'https://youtube.com/@elitedigitalagency_1145'
        ],
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': 'Elite Digital Agency Services',
          'itemListElement': [
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'AI Voice Calling Agents',
                'description': 'Autonomous human-like voice agents handling inbound and outbound sales calls in Telugu and English.'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Google Maps Local 3-Pack SEO & Setup',
                'description': 'Google Business Profile verification, citation building, geotagged photos and review acceleration.'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'WhatsApp AI Chatbots',
                'description': '24/7 intelligent WhatsApp conversational assistants for lead capture, quote generation and CRM sync.'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'High-Converting 3D Web Development',
                'description': 'Three.js interactive 3D portfolios and high-speed web apps with 100/100 Core Web Vitals.'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Meta Ads & Viral Video Marketing',
                'description': 'High-ROAS Facebook and Instagram ad funnels with AI video creatives and click-to-WhatsApp leads.'
              }
            }
          ]
        }
      },
      // FAQPage Schema
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What is an AI Voice Calling Agent and how does it help my business?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'An AI Voice Calling Agent is an autonomous conversational system that answers customer calls in human-like voices (Telugu, English, Hindi), books appointments, qualifies leads, and updates your CRM 24/7 without missing a single inquiry.'
            }
          },
          {
            '@type': 'Question',
            'name': 'How does Google Maps Local 3-Pack ranking help local shops and clinics?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Ranking in Google Maps top 3 results drives high-intent local customers who search for services "near me", resulting in immediate foot traffic, phone calls, and direct direction requests.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Can WhatsApp AI Chatbots work in regional languages like Telugu?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes, our WhatsApp AI Chatbots fluently understand and respond in Telugu, English, and transliterated script, handling voice notes, images, product catalogs, and payment links seamlessly.'
            }
          },
          {
            '@type': 'Question',
            'name': 'How fast can a modern 3D website or AI automation be delivered?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Standard AI automations and Google Maps setups are deployed in 48 to 72 hours. Custom full-stack 3D websites and voice agent architectures typically launch in 7 to 14 days with full training.'
            }
          }
        ]
      },
      // BreadcrumbList Schema
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': `${window.location.origin}/#home`
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Skills & Services',
            'item': `${window.location.origin}/#skills`
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': 'Projects',
            'item': `${window.location.origin}/#projects`
          },
          {
            '@type': 'ListItem',
            'position': 4,
            'name': 'Blogs & Insights',
            'item': `${window.location.origin}/#blogs`
          },
          {
            '@type': 'ListItem',
            'position': 5,
            'name': 'Contact',
            'item': `${window.location.origin}/#contact`
          }
        ]
      }
    ];

    // If an active blog post is open, inject BlogPosting Schema
    if (activeBlog) {
      structuredSchemas.push({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${window.location.origin}/#blog-${activeBlog.slug}`,
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': `${window.location.origin}/#blog-${activeBlog.slug}`
        },
        'headline': activeBlog.title,
        'description': activeBlog.excerpt,
        'image': [activeBlog.cover_image],
        'datePublished': `${activeBlog.published_at}T08:00:00+05:30`,
        'dateModified': `${activeBlog.published_at}T10:00:00+05:30`,
        'author': {
          '@type': 'Organization',
          'name': activeBlog.author.name,
          'url': window.location.origin
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Elite Digital Agency',
          'logo': {
            '@type': 'ImageObject',
            'url': `${window.location.origin}/elite-logo.svg`
          }
        },
        'keywords': activeBlog.tags.join(', ')
      } as any);
    }

    // Upsert JSON-LD script tag
    let schemaScript = document.getElementById('eda-structured-data-jsonld');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'eda-structured-data-jsonld';
      schemaScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(structuredSchemas);

  }, [settings, currentLanguage, activeSection, activeBlog]);

  return null;
};
