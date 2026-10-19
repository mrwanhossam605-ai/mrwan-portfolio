import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Projects from './components/Projects';
import Services from './components/Services';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const is404 =
    typeof window !== 'undefined' &&
    window.location.pathname !== '/' &&
    window.location.pathname !== '/index.html' &&
    !window.location.pathname.startsWith('/#');

  if (is404) {
    return (
      <div className="min-h-screen flex flex-col justify-between selection:bg-secondary selection:text-stroke bg-page-bg">
        <header className="p-6">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 font-heading font-extrabold text-2xl text-stroke"
          >
            <span>Mrwan H.</span>
            <span className="text-primary text-2xl">✦</span>
          </a>
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
            <a
              href="/"
              className="neo-btn bg-primary text-white text-base sm:text-lg px-8 py-3.5 font-bold"
            >
              <span>Back Home</span>
              <span>→</span>
            </a>
          </div>
        </main>
        <footer className="p-6 text-center text-xs font-mono text-muted">
          © {new Date().getFullYear()} Mrwan H. ✦ UI/UX Designer
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-secondary selection:text-stroke">
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
        <Projects />

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
