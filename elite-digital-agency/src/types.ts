export type SkillCategory = 
  | 'AI Automation'
  | 'AI Agent'
  | 'AI Chatbot'
  | 'AI Video'
  | 'Website'
  | 'SEO'
  | 'Branding'
  | 'Design'
  | 'Social Media'
  | 'Marketing'
  | 'Video Production';

export interface Skill {
  id: string;
  title: string;
  slug: string;
  icon: string;
  category: string;
  short_description: string;
  what_is_it: string;
  why_useful: string;
  what_i_do: string;
  voice_script: string;
  voice_audio_url?: string;
  image_url?: string;
  video_url?: string;
  enabled: boolean;
  display_order: number;
  social_examples?: {
    handle: string;
    platform: string;
    url: string;
    description: string;
  }[];
}

export type ProjectCategory = 
  | 'AI Automation'
  | 'AI Agent'
  | 'AI Chatbot'
  | 'AI Videos'
  | 'AI Calling Agents'
  | 'Local SEO & Maps'
  | 'Google Maps & Store Setup'
  | 'Websites'
  | 'Social Media Management'
  | 'Meta Ads'
  | 'Wedding Invitation Videos'
  | 'Other';

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  description: string;
  how_it_works?: string;
  workflow_steps?: { step: number; title: string; detail: string }[];
  key_features?: string[];
  results?: string;
  media_type: 'image' | 'video' | 'youtube';
  image_url: string;
  video_url?: string;
  project_url?: string;
  youtube_url?: string;
  gallery?: string[];
  featured: boolean;
  is_demo?: boolean;
  published: boolean;
  display_order: number;
  tags: string[];
  created_at: string;
  updated_at?: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  created_at: string;
  read: boolean;
}

export interface SocialMediaExample {
  id: string;
  username: string;
  platform: 'Instagram' | 'YouTube' | 'TikTok' | 'Facebook';
  url: string;
  description: string;
  image_url?: string;
  video_url?: string;
}

export interface AgencySettings {
  brand_name: string;
  hero_headline: string;
  hero_subheadline: string;
  hero_description: string;
  hero_video_url: string;
  phone: string;
  email: string;
  instagram_username: string;
  instagram_url: string;
  youtube_username: string;
  youtube_url: string;
  seo_title: string;
  seo_description: string;
  tts_provider: 'browser' | 'gemini' | 'elevenlabs';
  tts_voice_id: string;
  tts_speed: number;
  tts_pitch: number;
}

export type BlogCategory = 
  | 'AI Voice Agents'
  | 'Google Maps & Local SEO'
  | 'AI Chatbots & WhatsApp'
  | 'Web Design & 3D Web'
  | 'Meta Ads & Marketing'
  | 'Workflow Automation';

export interface BlogPost {
  id: string;
  title: string;
  title_te?: string;
  slug: string;
  excerpt: string;
  excerpt_te?: string;
  content: string;
  content_te?: string;
  category: BlogCategory;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  cover_image: string;
  published_at: string;
  read_time: string;
  tags: string[];
  key_takeaways: string[];
  key_takeaways_te?: string[];
  seo_keywords: string[];
  seo_meta_description: string;
  views_count?: number;
  featured?: boolean;
}
