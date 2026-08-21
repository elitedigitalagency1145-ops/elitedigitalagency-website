import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  LayoutDashboard,
  Layers,
  Cpu,
  Share2,
  Mail,
  Settings,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Volume2,
  Save,
  LogOut,
  Sparkles,
  ExternalLink,
  Eye,
  RefreshCw,
  Search,
  Upload,
} from 'lucide-react';
import { Project, Skill, ContactInquiry, SocialMediaExample, AgencySettings, ProjectCategory } from '../types';
import { StorageService } from '../lib/storage';
import { VoiceService } from '../lib/voiceService';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'skills' | 'social' | 'inquiries' | 'settings'>('overview');

  // State data
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [socials, setSocials] = useState<SocialMediaExample[]>([]);
  const [settings, setSettings] = useState<AgencySettings>(StorageService.getSettings());

  // Edit states
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingProject, setIsAddingProject] = useState<boolean>(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [testVoiceText, setTestVoiceText] = useState<string>('');
  const [saveToast, setSaveToast] = useState<string>('');

  const loadData = () => {
    setIsAuthenticated(StorageService.isAdminLoggedIn());
    setProjects(StorageService.getProjects());
    setSkills(StorageService.getSkills());
    setInquiries(StorageService.getInquiries());
    setSocials(StorageService.getSocialExamples());
    setSettings(StorageService.getSettings());
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleStorageUpdate = () => {
      loadData();
    };
    window.addEventListener('eda_storage_update', handleStorageUpdate);
    return () => window.removeEventListener('eda_storage_update', handleStorageUpdate);
  }, []);

  const showToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(''), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (StorageService.adminLogin(passwordInput)) {
      setIsAuthenticated(true);
      setLoginError('');
      setPasswordInput('');
      loadData();
    } else {
      setLoginError('Invalid password. Try "lashu1145".');
    }
  };

  const handleLogout = () => {
    StorageService.adminLogout();
    setIsAuthenticated(false);
  };

  // Projects Handlers
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (isAddingProject) {
      StorageService.addProject(editingProject);
      showToast('Project created successfully!');
    } else {
      StorageService.updateProject(editingProject.id, editingProject);
      showToast('Project updated successfully!');
    }

    setEditingProject(null);
    setIsAddingProject(false);
    loadData();
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      StorageService.deleteProject(id);
      showToast('Project deleted');
      loadData();
    }
  };

  // Skill Handlers
  const handleSaveSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill) return;

    StorageService.updateSkill(editingSkill.id, editingSkill);
    showToast('Skill & Voice Script updated!');
    setEditingSkill(null);
    loadData();
  };

  const handleTestVoice = (text: string) => {
    VoiceService.playSkillVoice('test-admin', text);
  };

  // Settings Handlers
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.updateSettings(settings);
    showToast('Agency settings saved successfully!');
    loadData();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-2xl">
      <div className="relative w-full max-w-6xl bg-[#080d1a]/95 border border-white/15 rounded-3xl shadow-[0_0_80px_rgba(34,211,238,0.2)] backdrop-blur-2xl flex flex-col max-h-[92vh] overflow-hidden my-auto">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.03] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/15 flex items-center justify-center text-cyan-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-white">
                Elite Admin Command Center
              </h2>
              <span className="text-[10px] text-slate-400 font-light">
                Manage Portfolio, Skills, Voices, Socials & Settings
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {saveToast && (
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                {saveToast}
              </span>
            )}

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-red-400 hover:bg-white/[0.05] transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* Login Screen */
          <div className="p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.05] border border-cyan-400/40 flex items-center justify-center text-cyan-400 mb-6 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white font-heading mb-2">
              Admin Authentication
            </h3>
            <p className="text-xs text-slate-400 mb-6 font-light">
              Enter master password to access the content management system.
              (Default: <code className="text-cyan-400 font-mono">elite2026</code>)
            </p>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400"
              />
              {loginError && <p className="text-xs text-red-400">{loginError}</p>}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-heading font-bold text-xs uppercase tracking-widest text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.45)] cursor-pointer transition-all"
              >
                Unlock Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Main Dashboard Layout */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-60 bg-white/[0.02] border-r border-white/10 p-4 shrink-0 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-y-auto">
              {[
                { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                { id: 'projects', label: 'Projects', icon: Layers, count: projects.length },
                { id: 'skills', label: 'Skills & Voices', icon: Cpu, count: skills.length },
                { id: 'social', label: 'Social Accounts', icon: Share2, count: socials.length },
                { id: 'inquiries', label: 'Inquiries', icon: Mail, count: inquiries.filter((i) => !i.read).length },
                { id: 'settings', label: 'Settings', icon: Settings },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      setEditingProject(null);
                      setEditingSkill(null);
                    }}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </div>
                    {tab.count !== undefined && tab.count > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-cyan-400 border border-slate-700">
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="hidden md:block mt-auto pt-4 border-t border-slate-800/80">
                <button
                  onClick={() => {
                    if (confirm('Reset all demo data to default?')) {
                      StorageService.resetToDefaults();
                      loadData();
                      showToast('Reset to defaults');
                    }
                  }}
                  className="w-full py-2 rounded-lg text-[10px] font-medium text-slate-500 hover:text-slate-300 text-center transition-colors"
                >
                  Reset to Initial Data
                </button>
              </div>
            </div>

            {/* Main Tab Content Area */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white font-heading">
                    Agency Operations Overview
                  </h3>

                  {/* Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                      <span className="text-xs text-slate-400 font-medium">Published Projects</span>
                      <div className="text-3xl font-extrabold text-white font-heading mt-2">
                        {projects.filter((p) => p.published).length}
                      </div>
                    </div>
                    <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                      <span className="text-xs text-slate-400 font-medium">Interactive Skills</span>
                      <div className="text-3xl font-extrabold text-cyan-400 font-heading mt-2">
                        {skills.length}
                      </div>
                    </div>
                    <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                      <span className="text-xs text-slate-400 font-medium">New Inquiries</span>
                      <div className="text-3xl font-extrabold text-amber-400 font-heading mt-2">
                        {inquiries.filter((i) => !i.read).length}
                      </div>
                    </div>
                    <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                      <span className="text-xs text-slate-400 font-medium">Social Showcases</span>
                      <div className="text-3xl font-extrabold text-pink-400 font-heading mt-2">
                        {socials.length}
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                      Quick Actions
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => {
                          setActiveTab('projects');
                          setIsAddingProject(true);
                          setEditingProject({
                            id: '',
                            title: '',
                            slug: '',
                            category: 'AI Automation',
                            description: '',
                            media_type: 'image',
                            image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
                            project_url: '',
                            featured: false,
                            is_demo: false,
                            published: true,
                            display_order: projects.length + 1,
                            tags: ['New Solution'],
                            created_at: new Date().toISOString(),
                          });
                        }}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-cyan-400 transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add New Project</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('skills')}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-700 transition-colors cursor-pointer"
                      >
                        <Cpu className="w-4 h-4 text-cyan-400" />
                        <span>Edit Voice Scripts</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('inquiries')}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-700 transition-colors cursor-pointer"
                      >
                        <Mail className="w-4 h-4 text-amber-400" />
                        <span>View Inquiries Inbox</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PROJECTS */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white font-heading">
                        Portfolio Projects
                      </h3>
                      <p className="text-xs text-slate-400">
                        Manage agency portfolio showcases, workflows, and interactive media
                      </p>
                    </div>
                    {!editingProject && (
                      <button
                        onClick={() => {
                          setIsAddingProject(true);
                          setEditingProject({
                            id: '',
                            title: '',
                            slug: '',
                            category: 'AI Automation',
                            description: '',
                            how_it_works: '',
                            results: '',
                            media_type: 'image',
                            image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
                            video_url: '',
                            youtube_url: '',
                            project_url: '',
                            featured: false,
                            is_demo: false,
                            published: true,
                            display_order: projects.length + 1,
                            tags: ['AI Solution'],
                            created_at: new Date().toISOString(),
                          });
                        }}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-cyan-400 transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Project</span>
                      </button>
                    )}
                  </div>

                  {editingProject ? (
                    /* Project Edit/Create Form */
                    <form onSubmit={handleSaveProject} className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                        <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
                          {isAddingProject ? 'Create New Project' : 'Edit Project'}
                        </h4>
                        <button
                          type="button"
                          onClick={() => setEditingProject(null)}
                          className="text-xs text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                            Title *
                          </label>
                          <input
                            type="text"
                            required
                            value={editingProject.title}
                            onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                            Category *
                          </label>
                          <select
                            value={editingProject.category}
                            onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as ProjectCategory })}
                            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                          >
                            {['AI Automation', 'AI Calling Agents', 'Local SEO & Maps', 'AI Agent', 'AI Chatbot', 'AI Videos', 'Websites', 'Social Media Management', 'Meta Ads', 'Wedding Invitation Videos', 'Other'].map((cat) => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                          Short Summary / Description *
                        </label>
                        <textarea
                          rows={2}
                          required
                          value={editingProject.description}
                          onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-cyan-400 uppercase mb-1 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>How this Project Works (Workflow & Architecture Description)</span>
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Describe the step-by-step working process, lead triggers, AI engine processing, and business output..."
                          value={editingProject.how_it_works || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, how_it_works: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs resize-none"
                        />
                      </div>

                      {/* Media Settings */}
                      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                        <div className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                          Media & Visuals Configuration
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[11px] text-slate-400 uppercase mb-1">
                              Primary Media Type
                            </label>
                            <select
                              value={editingProject.media_type || 'image'}
                              onChange={(e) => setEditingProject({ ...editingProject, media_type: e.target.value as any })}
                              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                            >
                              <option value="image">Image (High-Res Picture)</option>
                              <option value="video">Direct Video File (MP4/WebM)</option>
                              <option value="youtube">YouTube Video Embed</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] text-slate-400 uppercase mb-1">
                              Image / Poster Thumbnail URL *
                            </label>
                            <input
                              type="url"
                              required
                              value={editingProject.image_url}
                              onChange={(e) => setEditingProject({ ...editingProject, image_url: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] text-slate-400 uppercase mb-1">
                              Video or YouTube URL (Optional)
                            </label>
                            <input
                              type="url"
                              placeholder="https://..."
                              value={editingProject.video_url || editingProject.youtube_url || ''}
                              onChange={(e) => setEditingProject({ ...editingProject, video_url: e.target.value, youtube_url: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                            Live Project / Demo Link (Optional)
                          </label>
                          <input
                            type="url"
                            placeholder="https://..."
                            value={editingProject.project_url || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, project_url: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                            Business Results / Impact
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 3x lead growth, saves 15 hours weekly"
                            value={editingProject.results || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, results: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-6 pt-2">
                        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingProject.published}
                            onChange={(e) => setEditingProject({ ...editingProject, published: e.target.checked })}
                            className="rounded bg-slate-950 border-slate-800 text-cyan-500"
                          />
                          <span>Published</span>
                        </label>
                      </div>

                      <div className="pt-4 flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setEditingProject(null)}
                          className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs uppercase"
                        >
                          Save Project
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* Project List */
                    <div className="space-y-3">
                      {projects.map((proj) => (
                        <div
                          key={proj.id}
                          className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={proj.image_url}
                              alt={proj.title}
                              className="w-14 h-14 rounded-lg object-cover bg-slate-950 shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-bold text-white truncate font-heading">
                                  {proj.title}
                                </h4>
                              </div>
                              <span className="text-xs text-cyan-400/80">{proj.category}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => {
                                setIsAddingProject(false);
                                setEditingProject(proj);
                              }}
                              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                              title="Edit"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(proj.id)}
                              className="p-2 rounded-lg bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-slate-300"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: SKILLS & VOICES */}
              {activeTab === 'skills' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white font-heading">
                      Skills & Voice Scripts
                    </h3>
                    <p className="text-xs text-slate-400">
                      Manage skill presentations and custom Indian English voice scripts
                    </p>
                  </div>

                  {editingSkill ? (
                    <form onSubmit={handleSaveSkill} className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                        <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
                          Edit Skill: {editingSkill.title}
                        </h4>
                        <button
                          type="button"
                          onClick={() => setEditingSkill(null)}
                          className="text-xs text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                          Skill Title
                        </label>
                        <input
                          type="text"
                          required
                          value={editingSkill.title}
                          onChange={(e) => setEditingSkill({ ...editingSkill, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                          Short Description
                        </label>
                        <input
                          type="text"
                          required
                          value={editingSkill.short_description}
                          onChange={(e) => setEditingSkill({ ...editingSkill, short_description: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                          What is it?
                        </label>
                        <textarea
                          rows={2}
                          value={editingSkill.what_is_it}
                          onChange={(e) => setEditingSkill({ ...editingSkill, what_is_it: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                          Why is it useful?
                        </label>
                        <textarea
                          rows={2}
                          value={editingSkill.why_useful}
                          onChange={(e) => setEditingSkill({ ...editingSkill, why_useful: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                          What I do
                        </label>
                        <textarea
                          rows={2}
                          value={editingSkill.what_i_do}
                          onChange={(e) => setEditingSkill({ ...editingSkill, what_i_do: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs resize-none"
                        />
                      </div>

                      {/* VOICE SCRIPT EDITOR */}
                      <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/40 space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                            <Volume2 className="w-4 h-4" />
                            <span>Spoken Voice Script (Indian English Female Voice)</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => handleTestVoice(editingSkill.voice_script)}
                            className="px-3 py-1 rounded-md bg-cyan-500 text-slate-950 font-bold text-[10px] uppercase hover:bg-cyan-400 cursor-pointer"
                          >
                            Test Voice
                          </button>
                        </div>
                        <textarea
                          rows={4}
                          required
                          value={editingSkill.voice_script}
                          onChange={(e) => setEditingSkill({ ...editingSkill, voice_script: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs resize-none"
                        />
                      </div>

                      <div className="pt-4 flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setEditingSkill(null)}
                          className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs uppercase"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {skills.map((skill) => (
                        <div
                          key={skill.id}
                          className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-bold text-white font-heading">
                                {skill.title}
                              </span>
                              <span className="text-[10px] text-cyan-400 font-mono">
                                0{skill.display_order}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                              {skill.voice_script}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                            <button
                              onClick={() => handleTestVoice(skill.voice_script)}
                              className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>Listen</span>
                            </button>
                            <button
                              onClick={() => setEditingSkill(skill)}
                              className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white"
                            >
                              Edit Script
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: SOCIAL MEDIA SHOWCASE */}
              {activeTab === 'social' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white font-heading">
                      Social Media Projects
                    </h3>
                    <p className="text-xs text-slate-400">
                      Managed accounts displayed in the Social Media Management skill
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {socials.map((soc) => (
                      <div key={soc.id} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-base font-bold text-white font-heading">@{soc.username}</span>
                          <span className="text-xs text-pink-400 uppercase font-bold">{soc.platform}</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-normal">
                          {soc.description}
                        </p>
                        <a
                          href={soc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300"
                        >
                          <span>Open Instagram Link</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: INQUIRIES */}
              {activeTab === 'inquiries' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white font-heading">
                        Contact Inquiries ({inquiries.length})
                      </h3>
                      <p className="text-xs text-slate-400">
                        Messages received from potential clients via the website
                      </p>
                    </div>
                  </div>

                  {inquiries.length === 0 ? (
                    <div className="p-12 text-center text-slate-500 text-sm">
                      No customer inquiries received yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {inquiries.map((inq) => (
                        <div
                          key={inq.id}
                          className={`p-5 rounded-2xl border transition-all ${
                            inq.read
                              ? 'bg-slate-900/40 border-slate-800 text-slate-400'
                              : 'bg-slate-900/90 border-cyan-500/40 text-slate-200'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-3">
                              <h4 className="text-sm font-bold text-white font-heading">
                                {inq.name}
                              </h4>
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                                {inq.service}
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-500">
                              {new Date(inq.created_at).toLocaleString()}
                            </span>
                          </div>

                          <div className="text-xs space-y-1 mb-3">
                            <div>Email: <a href={`mailto:${inq.email}`} className="text-cyan-400">{inq.email}</a></div>
                            {inq.phone && <div>Phone: <a href={`tel:${inq.phone}`} className="text-cyan-400">{inq.phone}</a></div>}
                          </div>

                          <p className="text-xs text-slate-300 p-3 rounded-lg bg-slate-950 border border-slate-800/80 mb-3">
                            {inq.message}
                          </p>

                          <div className="flex items-center justify-end gap-2">
                            {!inq.read && (
                              <button
                                onClick={() => {
                                  StorageService.markInquiryRead(inq.id);
                                  loadData();
                                }}
                                className="px-3 py-1 rounded bg-cyan-500/20 text-cyan-300 text-xs font-semibold hover:bg-cyan-500/30"
                              >
                                Mark Read
                              </button>
                            )}
                            <button
                              onClick={() => {
                                StorageService.deleteInquiry(inq.id);
                                loadData();
                              }}
                              className="p-1.5 rounded bg-slate-800 text-slate-400 hover:text-red-400"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 6: SETTINGS */}
              {activeTab === 'settings' && (
                <form onSubmit={handleSaveSettings} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white font-heading">
                      Agency Profile & Settings
                    </h3>
                    <p className="text-xs text-slate-400">
                      Configure contact details, hero background video and SEO
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={settings.phone}
                        onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                        Instagram Username
                      </label>
                      <input
                        type="text"
                        value={settings.instagram_username}
                        onChange={(e) => setSettings({ ...settings, instagram_username: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                        YouTube Username
                      </label>
                      <input
                        type="text"
                        value={settings.youtube_username}
                        onChange={(e) => setSettings({ ...settings, youtube_username: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-cyan-300 uppercase tracking-wider">
                        Hero Background Video & AI Presenter
                      </label>
                      <label className="px-3 py-1 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[10px] uppercase cursor-pointer transition-colors inline-flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Video File</span>
                        <input
                          type="file"
                          accept="video/mp4,video/webm,video/mov,video/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const objUrl = URL.createObjectURL(file);
                              setSettings({ ...settings, hero_video_url: objUrl });
                              showToast('Video loaded from file!');
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <input
                      type="text"
                      placeholder="Enter video URL or blob path (e.g. /Woman_speaking_to_camera_1080p_202608211059.mp4)"
                      value={settings.hero_video_url}
                      onChange={(e) => setSettings({ ...settings, hero_video_url: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                    />

                    {/* Live Preview Box */}
                    {settings.hero_video_url && (
                      <div className="relative aspect-video w-full max-w-sm rounded-xl overflow-hidden bg-black/60 border border-white/10">
                        <video
                          src={settings.hero_video_url}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[9px] font-mono text-cyan-300">
                          Active Hero Background Video
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                      SEO Meta Title
                    </label>
                    <input
                      type="text"
                      value={settings.seo_title}
                      onChange={(e) => setSettings({ ...settings, seo_title: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                      SEO Meta Description
                    </label>
                    <textarea
                      rows={2}
                      value={settings.seo_description}
                      onChange={(e) => setSettings({ ...settings, seo_description: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs resize-none"
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs uppercase hover:bg-cyan-400 transition-colors cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save All Settings</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
