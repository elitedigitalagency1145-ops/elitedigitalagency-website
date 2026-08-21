import React, { useState, useEffect } from 'react';
import { Intro3D } from './components/Intro3D';
import { Canvas3DBackground } from './components/Canvas3DBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { SkillModal } from './components/SkillModal';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectModal } from './components/ProjectModal';
import { BlogSection } from './components/BlogSection';
import { BlogModal } from './components/BlogModal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { SeoHead } from './components/SeoHead';
import { StorageService } from './lib/storage';
import { Skill, Project, AgencySettings, BlogPost } from './types';
import { SupportedLanguage } from './data/skillTranslations';

export default function App() {
  const [introCompleted, setIntroCompleted] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [skills, setSkills] = useState<Skill[]>(StorageService.getSkills());
  const [projects, setProjects] = useState<Project[]>(StorageService.getProjects());
  const [blogs, setBlogs] = useState<BlogPost[]>(StorageService.getBlogs());
  const [settings, setSettings] = useState<AgencySettings>(StorageService.getSettings());
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('te');

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [adminOpen, setAdminOpen] = useState<boolean>(false);

  // Sync with storage updates
  useEffect(() => {
    const handleStorageUpdate = () => {
      setSkills(StorageService.getSkills());
      setProjects(StorageService.getProjects());
      setBlogs(StorageService.getBlogs());
      setSettings(StorageService.getSettings());
    };
    window.addEventListener('eda_storage_update', handleStorageUpdate);
    return () => window.removeEventListener('eda_storage_update', handleStorageUpdate);
  }, []);

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'blogs', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle open blog with view counter
  const handleOpenBlog = (blog: BlogPost) => {
    StorageService.incrementBlogViews(blog.id);
    setSelectedBlog(blog);
  };

  // Scroll to section helper
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* On-Page SEO Engine: Meta Tags, Canonical, OpenGraph, JSON-LD Schemas */}
      <SeoHead
        settings={settings}
        currentLanguage={selectedLanguage}
        activeSection={activeSection}
        activeBlog={selectedBlog}
      />

      {/* Frosted Glass Ambient Lighting & Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Radial Background Tone */}
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background: 'radial-gradient(ellipse at 50% 20%, #0c1833 0%, #050a1b 45%, #030712 100%)',
          }}
        />

        {/* Ambient Frosted Blur Lights */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/4 -right-32 w-[650px] h-[650px] bg-blue-600/15 rounded-full blur-[160px]" />
        <div className="absolute top-2/3 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 -left-32 w-[550px] h-[550px] bg-cyan-600/12 rounded-full blur-[140px]" />
        <div className="absolute -bottom-32 right-10 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[150px]" />

        {/* Frosted Precision Grid */}
        <div className="absolute inset-0 frosted-grid opacity-[0.08]" />
      </div>

      {/* 1. 3D Intro Sequence on load */}
      {!introCompleted && <Intro3D onComplete={() => setIntroCompleted(true)} />}

      {/* 2. Interactive Three.js 3D Background */}
      <Canvas3DBackground />

      {/* 3. Floating Glassmorphism Clean Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenAdmin={() => setAdminOpen(true)}
        settings={settings}
        currentLanguage={selectedLanguage}
      />

      {/* 4. Main Page Sections */}
      <main className="relative z-10">
        <HeroSection
          settings={settings}
          onExploreWork={() => scrollToSection('projects')}
          onExploreSkills={() => scrollToSection('skills')}
          onUpdateSettings={(newSettings) => setSettings(newSettings)}
          currentLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />

        <AboutSection
          onExploreSkills={() => scrollToSection('skills')}
          currentLanguage={selectedLanguage}
        />

        <SkillsSection
          skills={skills}
          activeLanguage={selectedLanguage}
          onLanguageChange={(lang) => setSelectedLanguage(lang)}
          onSelectSkill={(skill) => setSelectedSkill(skill)}
        />

        <ProjectsSection
          projects={projects}
          onSelectProject={(project) => setSelectedProject(project)}
          onShareProject={(project) => setSelectedProject(project)}
          currentLanguage={selectedLanguage}
        />

        {/* 5. In-Depth SEO & Insights Blogs Section */}
        <BlogSection
          blogs={blogs}
          onSelectBlog={handleOpenBlog}
          currentLanguage={selectedLanguage}
        />

        <ContactSection
          settings={settings}
          currentLanguage={selectedLanguage}
        />
      </main>

      {/* 6. Footer */}
      <Footer
        settings={settings}
        onNavigate={scrollToSection}
        currentLanguage={selectedLanguage}
      />

      {/* 7. Skill Modal with Voice Player */}
      <SkillModal
        skill={selectedSkill}
        initialLanguage={selectedLanguage}
        onLanguageChange={(lang) => setSelectedLanguage(lang)}
        onClose={() => setSelectedSkill(null)}
      />

      {/* 8. Project Modal & Share */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* 9. Blog Modal for In-Depth Reading */}
      <BlogModal
        blog={selectedBlog}
        onClose={() => setSelectedBlog(null)}
        currentLanguage={selectedLanguage}
        onOpenContact={() => scrollToSection('contact')}
      />

      {/* 10. Admin Command Center Modal */}
      <AdminDashboard
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />
    </div>
  );
}
