import { useState, useEffect } from "react";
import Lenis from "lenis";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Utility & Visual Components
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import BackgroundEffects from "./components/BackgroundEffects";
import Navbar from "./components/Navbar";

// Content Modules
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Certifications from "./components/Certifications";
import Interests from "./components/Interests";
import SysOpsDashboard from "./components/SysOpsDashboard";
import Contact from "./components/Contact";


export default function App() {
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Dynamic Loader Screen */}
      <Loader onFinish={() => setLoading(false)} />

      {/* Global Ambient Layout Layers */}
      <BackgroundEffects />
      <CustomCursor />

      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full z-10 flex flex-col min-h-screen text-deep-text"
          >
            {/* Sticky Navigation Header */}
            <Navbar />

            {/* Content Modules */}
            <main className="w-full flex flex-col">
              <Hero />
              <About />
              <Projects />
              <Experience />
              <Certifications />
              <Interests />
              <SysOpsDashboard />
              <Contact />
            </main>

            {/* System Minimalist Footer */}
            <footer className="w-full py-10 px-6 border-t border-lavender-medium/20 bg-lavender-bg/85 backdrop-blur text-center select-none z-10">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <span className="font-cyber text-[9px] tracking-[0.25em] text-deep-text/60 uppercase font-bold">
                  © 2026 KEERTHIKA. ALL RIGHTS RESERVED. SECURE TRANSMISSION.
                </span>
                
                <span className="font-cyber text-[8px] tracking-widest text-lavender-vibrant font-black uppercase flex items-center space-x-1.5 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-lavender-vibrant" />
                  <span>CORE_INTERFACE_STABLE // HOLOGRAPHIC_SYS_ONLINE</span>
                </span>
              </div>
            </footer>

            {/* Back-To-Top Floating Cyber Trigger */}
            <AnimatePresence>
              {showScrollTop && (
                <motion.button
                  initial={{ scale: 0.8, opacity: 0, y: 15 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: 15 }}
                  onClick={scrollToTop}
                  className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full border border-lavender-medium/25 bg-white/70 backdrop-blur flex items-center justify-center text-lavender-vibrant hover:text-deep-text hover:border-lavender-vibrant hover:shadow-[0_0_12px_rgba(165,148,249,0.3)] transition-all cursor-pointer interactive-glow shadow-md"
                >
                  <ArrowUp className="w-4 h-4 animate-bounce" />
                </motion.button>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
