import { Project, Skill, ContactInquiry, SocialMediaExample, AgencySettings, BlogPost } from '../types';
import { INITIAL_PROJECTS, INITIAL_SKILLS, INITIAL_SETTINGS, INITIAL_SOCIAL_EXAMPLES } from '../data/initialData';
import { INITIAL_BLOGS } from '../data/blogsData';

const STORAGE_KEYS = {
  PROJECTS: 'eda_projects_v1',
  SKILLS: 'eda_skills_v1',
  SETTINGS: 'eda_settings_v1',
  INQUIRIES: 'eda_inquiries_v1',
  SOCIAL_EXAMPLES: 'eda_social_v1',
  ADMIN_AUTH: 'eda_admin_auth_v1',
  BLOGS: 'eda_blogs_v1',
};

// Safe LocalStorage helpers
function getItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    console.warn(`Failed to parse ${key} from storage:`, e);
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    // Dispatch custom event for reactive multi-component sync
    window.dispatchEvent(new Event('eda_storage_update'));
  } catch (e) {
    console.error(`Failed to save ${key} to storage:`, e);
  }
}

export const StorageService = {
  // Projects
  getProjects(): Project[] {
    const saved = getItem<Project[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
    if (!saved || saved.length === 0) return INITIAL_PROJECTS;
    // Merge with latest initial project details if matching ID exists, while preserving user additions
    return saved.map(p => {
      const initialMatch = INITIAL_PROJECTS.find(init => init.id === p.id);
      if (initialMatch) {
        return {
          ...initialMatch,
          ...p,
          is_demo: false,
          image_url: p.image_url || initialMatch.image_url,
          how_it_works: p.how_it_works || initialMatch.how_it_works,
          workflow_steps: p.workflow_steps || initialMatch.workflow_steps,
          key_features: p.key_features || initialMatch.key_features,
          results: p.results || initialMatch.results,
        };
      }
      return { ...p, is_demo: false };
    });
  },

  saveProjects(projects: Project[]): void {
    setItem(STORAGE_KEYS.PROJECTS, projects);
  },

  addProject(project: Omit<Project, 'id' | 'created_at'>): Project {
    const projects = this.getProjects();
    const newProj: Project = {
      ...project,
      id: `proj-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    this.saveProjects([newProj, ...projects]);
    return newProj;
  },

  updateProject(id: string, updates: Partial<Project>): Project | null {
    const projects = this.getProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) return null;
    const updated = { ...projects[index], ...updates, updated_at: new Date().toISOString() };
    projects[index] = updated;
    this.saveProjects(projects);
    return updated;
  },

  deleteProject(id: string): boolean {
    const projects = this.getProjects();
    const filtered = projects.filter(p => p.id !== id);
    if (filtered.length === projects.length) return false;
    this.saveProjects(filtered);
    return true;
  },

  // Skills
  getSkills(): Skill[] {
    return getItem<Skill[]>(STORAGE_KEYS.SKILLS, INITIAL_SKILLS);
  },

  saveSkills(skills: Skill[]): void {
    setItem(STORAGE_KEYS.SKILLS, skills);
  },

  updateSkill(id: string, updates: Partial<Skill>): Skill | null {
    const skills = this.getSkills();
    const index = skills.findIndex(s => s.id === id);
    if (index === -1) return null;
    const updated = { ...skills[index], ...updates };
    skills[index] = updated;
    this.saveSkills(skills);
    return updated;
  },

  // Settings
  getSettings(): AgencySettings {
    return getItem<AgencySettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  },

  updateSettings(updates: Partial<AgencySettings>): AgencySettings {
    const current = this.getSettings();
    const updated = { ...current, ...updates };
    setItem(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  },

  // Social Examples
  getSocialExamples(): SocialMediaExample[] {
    return getItem<SocialMediaExample[]>(STORAGE_KEYS.SOCIAL_EXAMPLES, INITIAL_SOCIAL_EXAMPLES);
  },

  saveSocialExamples(items: SocialMediaExample[]): void {
    setItem(STORAGE_KEYS.SOCIAL_EXAMPLES, items);
  },

  // Inquiries
  getInquiries(): ContactInquiry[] {
    return getItem<ContactInquiry[]>(STORAGE_KEYS.INQUIRIES, []);
  },

  addInquiry(inquiry: Omit<ContactInquiry, 'id' | 'created_at' | 'read'> & {
    source?: string;
    language?: string;
    transcriptDetails?: {
      step1Question?: string;
      step1Answer?: string;
      step2Question?: string;
      step2Answer?: string;
      step3Question?: string;
      step3Answer?: string;
      closingMessage?: string;
    };
  }): ContactInquiry {
    const list = this.getInquiries();
    const newInquiry: ContactInquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      created_at: new Date().toISOString(),
      read: false,
    };
    setItem(STORAGE_KEYS.INQUIRIES, [newInquiry, ...list]);

    const VERIFIED_FORMSUBMIT_TOKEN = '9081327a6b791ab2ab1a0af55e3d897b';
    const PRIMARY_EMAIL = 'elitedigitalagency1145@gmail.com';

    const tDetails = inquiry.transcriptDetails || {};
    const emailPayload: Record<string, any> = {
      _subject: `🎙️ [AI CONVERSATION & LEAD] ${inquiry.name} (${inquiry.service || 'Service Request'})`,
      _template: 'table',
      _captcha: 'false',
      '👤 Client Name': inquiry.name,
      '📞 Phone Number': inquiry.phone || 'Not Provided',
      '✉️ Email Address': inquiry.email || 'Not Provided',
      '🛠️ Service Requested': inquiry.service || 'AI Automation / Service',
      '🌐 Channel & Source': inquiry.source || 'Live Voice Agent Simulator',
      '🗣️ Language': inquiry.language || 'Telugu',
      '🕒 Date & Time': new Date().toLocaleString(),
    };

    if (tDetails.step1Question || tDetails.step1Answer) {
      emailPayload['1️⃣ [Step 1] Agent Question'] = tDetails.step1Question || 'Service inquiry';
      emailPayload['1️⃣ [Step 1] Client Answer'] = tDetails.step1Answer || inquiry.service;
    }
    if (tDetails.step2Question || tDetails.step2Answer) {
      emailPayload['2️⃣ [Step 2] Agent Question'] = tDetails.step2Question || 'Client name inquiry';
      emailPayload['2️⃣ [Step 2] Client Answer'] = tDetails.step2Answer || inquiry.name;
    }
    if (tDetails.step3Question || tDetails.step3Answer) {
      emailPayload['3️⃣ [Step 3] Agent Question'] = tDetails.step3Question || 'Contact details inquiry';
      emailPayload['3️⃣ [Step 3] Client Answer'] = tDetails.step3Answer || (inquiry.phone || inquiry.email);
    }
    if (tDetails.closingMessage) {
      emailPayload['4️⃣ [Step 4] Agent Closing'] = tDetails.closingMessage;
    }

    emailPayload['📜 Full Conversation Log'] = inquiry.message;

    // 1. Send asynchronously to internal Express server endpoint
    try {
      fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: inquiry.name,
          email: inquiry.email,
          phone: inquiry.phone,
          service: inquiry.service,
          message: inquiry.message,
          source: inquiry.source || 'Website Lead',
          language: inquiry.language || 'te',
          transcriptDetails: tDetails,
        }),
      }).catch((err) => console.warn('Inquiry API background dispatch notice:', err));
    } catch (e) {
      console.warn('Background server inquiry fetch error:', e);
    }

    // 2. Direct Email Dispatch to elitedigitalagency1145@gmail.com
    try {
      fetch(`https://formsubmit.co/ajax/${PRIMARY_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(emailPayload),
      }).catch((err) => console.warn('Direct email dispatch notice:', err));
    } catch (e) {
      console.warn('FormSubmit direct fetch error:', e);
    }

    return newInquiry;
  },

  markInquiryRead(id: string): void {
    const list = this.getInquiries();
    const updated = list.map(inq => inq.id === id ? { ...inq, read: true } : inq);
    setItem(STORAGE_KEYS.INQUIRIES, updated);
  },

  deleteInquiry(id: string): void {
    const list = this.getInquiries();
    setItem(STORAGE_KEYS.INQUIRIES, list.filter(i => i.id !== id));
  },

  // Admin Auth
  isAdminLoggedIn(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'authenticated_true';
  },

  // Blogs
  getBlogs(): BlogPost[] {
    const saved = getItem<BlogPost[]>(STORAGE_KEYS.BLOGS, INITIAL_BLOGS);
    if (!saved || saved.length === 0) return INITIAL_BLOGS;
    return saved;
  },

  saveBlogs(blogs: BlogPost[]): void {
    setItem(STORAGE_KEYS.BLOGS, blogs);
  },

  addBlog(blog: Omit<BlogPost, 'id' | 'published_at'>): BlogPost {
    const blogs = this.getBlogs();
    const newBlog: BlogPost = {
      ...blog,
      id: `blog-${Date.now()}`,
      published_at: new Date().toISOString().split('T')[0],
      views_count: 1,
    };
    this.saveBlogs([newBlog, ...blogs]);
    return newBlog;
  },

  updateBlog(id: string, updates: Partial<BlogPost>): BlogPost | null {
    const blogs = this.getBlogs();
    const index = blogs.findIndex(b => b.id === id);
    if (index === -1) return null;
    const updated = { ...blogs[index], ...updates };
    blogs[index] = updated;
    this.saveBlogs(blogs);
    return updated;
  },

  deleteBlog(id: string): boolean {
    const blogs = this.getBlogs();
    const filtered = blogs.filter(b => b.id !== id);
    if (filtered.length === blogs.length) return false;
    this.saveBlogs(filtered);
    return true;
  },

  incrementBlogViews(id: string): void {
    const blogs = this.getBlogs();
    const index = blogs.findIndex(b => b.id === id);
    if (index !== -1) {
      blogs[index] = { ...blogs[index], views_count: (blogs[index].views_count || 0) + 1 };
      this.saveBlogs(blogs);
    }
  },

  adminLogin(password: string): boolean {
    // Default master password or custom
    if (
      password === 'lashu1145' ||
      password === 'elite2026' ||
      password === 'admin123' ||
      password === 'eda2026'
    ) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'authenticated_true');
        window.dispatchEvent(new Event('eda_storage_update'));
      }
      return true;
    }
    return false;
  },

  adminLogout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
      window.dispatchEvent(new Event('eda_storage_update'));
    }
  },

  // Reset to initial
  resetToDefaults(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.SKILLS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.SOCIAL_EXAMPLES);
    window.dispatchEvent(new Event('eda_storage_update'));
  }
};
