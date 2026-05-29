import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Console", href: "#console" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const sections = NAV_LINKS.map(link => link.href.substring(1));
      let currentSection = "home";

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const targetId = href.substring(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled 
            ? "py-3 bg-lavender-bg/75 backdrop-blur-md border-b border-lavender-medium/20 shadow-sm" 
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Cyberpunk Glowing Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleLinkClick(e, "#home")}
            className="group flex items-center space-x-2 font-cyber tracking-widest font-extrabold text-lg text-deep-text hover:text-lavender-vibrant transition-colors select-none"
          >
            <div className="relative w-8 h-8 rounded bg-lavender-light/25 border border-lavender-vibrant/60 flex items-center justify-center group-hover:border-lavender-vibrant group-hover:shadow-[0_0_12px_rgba(165,148,249,0.35)] transition-all">
              <span className="text-sm font-black text-lavender-vibrant group-hover:text-deep-text">K</span>
              <div className="absolute inset-0 bg-lavender-vibrant/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span>KEE<span className="text-lavender-vibrant group-hover:animate-ping">.</span>SYS</span>
          </a>

          {/* Desktop Nav List */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative font-cyber text-xs tracking-widest uppercase transition-colors py-1 ${
                    isActive ? "text-lavender-vibrant font-extrabold neon-text-vibrant" : "text-deep-text/75 hover:text-lavender-vibrant font-medium"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-lavender-medium to-lavender-vibrant shadow-[0_0_6px_#A594F9]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Call To Action Button (Desktop Only) */}
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, "#contact")}
            className="hidden lg:flex items-center space-x-1.5 font-cyber text-[10px] tracking-widest uppercase px-4 py-2 rounded border border-lavender-vibrant/40 text-lavender-vibrant bg-lavender-light/10 hover:bg-lavender-light/35 hover:border-lavender-vibrant hover:text-deep-text shadow-sm interactive-glow transition-all font-bold"
          >
            <span>Initiate Link</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex lg:hidden text-deep-text hover:text-lavender-vibrant p-1.5 rounded border border-lavender-medium/20 bg-lavender-light/25"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 lg:hidden bg-lavender-bg/95 backdrop-blur-lg flex flex-col justify-center p-8 select-none"
          >
            {/* Top glowing radial flare */}
            <div className="absolute top-0 right-0 w-[80vw] h-[80vw] rounded-full bg-lavender-vibrant/10 blur-[90px]" />

            <nav className="flex flex-col space-y-6 text-center z-10">
              {NAV_LINKS.map((link, idx) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.a
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.05, ease: "easeOut" }}
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`font-cyber text-lg tracking-widest uppercase py-2 ${
                      isActive ? "text-lavender-vibrant font-extrabold neon-text-vibrant" : "text-deep-text/80 hover:text-lavender-vibrant"
                    }`}
                  >
                    {link.label}
                  </motion.a>
                );
              })}
              
              <motion.a
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: NAV_LINKS.length * 0.05 }}
                href="#contact"
                onClick={(e) => handleLinkClick(e, "#contact")}
                className="mt-8 mx-auto flex items-center space-x-1.5 font-cyber text-xs tracking-widest uppercase px-6 py-3 rounded border border-lavender-vibrant text-deep-text bg-lavender-light/35 shadow-md"
              >
                <span>Initiate Connection</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
