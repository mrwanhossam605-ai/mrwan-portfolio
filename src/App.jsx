import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Projects from './components/Projects';
import Services from './components/Services';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import CaseStudyDetail from './components/CaseStudyDetail';
import CaseStudyLoadingOverlay from './components/CaseStudyLoadingOverlay';
import { CASE_STUDIES } from './data/caseStudies';

function parseRoute(pathname) {
  if (!pathname || pathname === '/' || pathname === '/index.html' || pathname.startsWith('/#')) {
    return { type: 'home' };
  }

  // Support /case-study/:slug
  const match = pathname.match(/^\/case-study\/([^/]+)\/?$/i);
  if (match) {
    const slug = match[1].toLowerCase();
    return { type: 'case-study', slug };
  }

  return { type: '404' };
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(() =>
    parseRoute(typeof window !== 'undefined' ? window.location.pathname : '/')
  );

  const [loadingTransition, setLoadingTransition] = useState({
    active: false,
    targetSlug: '',
    projectTitle: '',
    figmaFile: '',
  });

  // Handle browser Back / Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const route = parseRoute(window.location.pathname);
      setCurrentRoute(route);
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Trigger Case Study Loading Screen Transition
  const handleOpenCaseStudy = useCallback((slug) => {
    const study = CASE_STUDIES[slug] || CASE_STUDIES.wakandarides;
    const title = study?.title || slug;
    const figma = study?.figmaFile || `${slug}.fig`;

    setLoadingTransition({
      active: true,
      targetSlug: slug,
      projectTitle: title,
      figmaFile: figma,
    });
  }, []);

  // Prepare reveal: swap underlying view right before or as overlay slides up
  const handlePrepareReveal = useCallback(() => {
    if (loadingTransition.targetSlug) {
      window.history.pushState({}, '', `/case-study/${loadingTransition.targetSlug}`);
      setCurrentRoute({ type: 'case-study', slug: loadingTransition.targetSlug });
      window.scrollTo(0, 0);
    }
  }, [loadingTransition.targetSlug]);

  // Loading transition complete: overlay fully slid out
  const handleLoadingComplete = useCallback(() => {
    setLoadingTransition((prev) => ({ ...prev, active: false }));
  }, []);

  // Return to portfolio home
  const handleBackToHome = useCallback(() => {
    window.history.pushState({}, '', '/#work');
    setCurrentRoute({ type: 'home' });
    setTimeout(() => {
      const workSection = document.getElementById('work');
      if (workSection) {
        workSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  }, []);

  // Render 404 View
  if (currentRoute.type === '404') {
    return (
      <div className="min-h-screen flex flex-col justify-between selection:bg-secondary selection:text-stroke bg-page-bg">
        <header className="p-6">
          <button
            type="button"
            onClick={() => {
              window.history.pushState({}, '', '/');
              setCurrentRoute({ type: 'home' });
            }}
            className="inline-flex items-center gap-1.5 font-heading font-extrabold text-2xl text-stroke hover:opacity-80 transition-opacity"
          >
            <span>Mrwan H.</span>
            <span className="text-primary text-2xl">✦</span>
          </button>
        </header>
        <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
          <div className="bg-card-bg border-3 border-stroke rounded-[24px] shadow-[6px_6px_0_#18181B] p-8 sm:p-12 max-w-lg w-full relative">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-secondary border-3 border-stroke rounded-full shadow-neo text-stroke font-bold text-sm mb-6 select-none -rotate-2">
              <span>✦</span>
              <span>404 - Not Found</span>
            </div>
            <h1 className="font-heading font-extrabold text-stroke text-6xl sm:text-7xl mb-4 tracking-tight">
              404
            </h1>
            <p className="font-body text-muted text-lg sm:text-xl font-medium mb-8">
              Oops! This screen got lost in wireframing.
            </p>
            <button
              type="button"
              onClick={() => {
                window.history.pushState({}, '', '/');
                setCurrentRoute({ type: 'home' });
              }}
              className="neo-btn bg-primary text-white text-base sm:text-lg px-8 py-3.5 font-bold"
            >
              <span>Back Home</span>
              <span>→</span>
            </button>
          </div>
        </main>
        <footer className="p-6 text-center text-xs font-mono text-muted">
          © {new Date().getFullYear()} Mrwan H. ✦ UI/UX Designer
        </footer>
      </div>
    );
  }

  // Render Case Study View
  if (currentRoute.type === 'case-study') {
    return (
      <div className="min-h-screen flex flex-col justify-between selection:bg-secondary selection:text-stroke">
        {/* Page Transition Loading Overlay */}
        <CaseStudyLoadingOverlay
          active={loadingTransition.active}
          projectTitle={loadingTransition.projectTitle}
          figmaFile={loadingTransition.figmaFile}
          onPrepareReveal={handlePrepareReveal}
          onComplete={handleLoadingComplete}
        />

        <main className="flex-1">
          <CaseStudyDetail
            slug={currentRoute.slug}
            onBack={handleBackToHome}
            onSelectProject={handleOpenCaseStudy}
          />
        </main>
        <Footer />
      </div>
    );
  }

  // Render Main Portfolio Home
  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-secondary selection:text-stroke">
      {/* Dedicated Page Transition Loading Overlay */}
      <CaseStudyLoadingOverlay
        active={loadingTransition.active}
        projectTitle={loadingTransition.projectTitle}
        figmaFile={loadingTransition.figmaFile}
        onPrepareReveal={handlePrepareReveal}
        onComplete={handleLoadingComplete}
      />

      {/* Modern Neubrutalist Loading Screen & Interactive Replay */}
      <LoadingScreen />

      {/* Accessible Skip to Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:border-3 focus:border-stroke focus:rounded-full focus:shadow-neo focus:font-bold focus:outline-none"
      >
        Skip to content
      </a>

      {/* Sticky Top Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 flex flex-col">
        {/* Hero Section */}
        <Hero />

        {/* Scrolling Yellow Marquee Strip directly below Hero */}
        <Marquee />

        {/* Section: Projects (id="work") */}
        <Projects onOpenCaseStudy={handleOpenCaseStudy} />

        {/* Section: Services (id="services") */}
        <Services />

        {/* Section: About (id="about") */}
        <About />

        {/* Section: Skills (id="skills") */}
        <Skills />

        {/* Section: Contact (id="contact") */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
