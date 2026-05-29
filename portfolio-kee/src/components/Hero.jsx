import { useState, useEffect } from "react";
import { ArrowRight, Mail, Download } from "lucide-react";
import { motion } from "framer-motion";
import developerPhoto from "../assets/developer_photo.png";

// Direct lightweight SVG definitions of brand icons
const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" h="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TYPING_STRINGS = [
  "Java Developer",
  "Frontend Enthusiast",
  "Problem Solver",
  "Tech Explorer",
];

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [stringIdx, setStringIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const currentStr = TYPING_STRINGS[stringIdx];
    let timer;

    const handleTyping = () => {
      if (isDeleting) {
        setTypedText((prev) => prev.slice(0, -1));
        if (typedText === "") {
          setIsDeleting(false);
          setStringIdx((prev) => (prev + 1) % TYPING_STRINGS.length);
        }
      } else {
        setTypedText(currentStr.slice(0, typedText.length + 1));
        if (typedText === currentStr) {
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      }
    };

    const speed = isDeleting ? 40 : 120;
    if (!timer) {
      timer = setTimeout(handleTyping, speed);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, stringIdx]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    const x = (clientX - width / 2) / width;
    const y = (clientY - height / 2) / height;
    
    setMousePos({ x, y });
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex items-center justify-center pt-24 px-6 md:px-12 xl:px-24 select-none overflow-hidden bg-transparent"
    >
      {/* Background soft flares */}
      <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-lavender-light/20 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[35vw] h-[35vw] rounded-full bg-lavender-medium/15 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left Side Info Panel */}
        <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-cyber text-xs md:text-sm tracking-[0.35em] uppercase text-lavender-vibrant font-extrabold block mb-3">
              SYSTEM_INTERFACE_ACTIVE // PORTFOLIO
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-deep-text leading-[1.05]"
          >
            Hi, I am <span className="bg-gradient-to-r from-lavender-vibrant via-lavender-medium to-deep-text bg-clip-text text-transparent inline-block font-black neon-text-vibrant">KEE</span>
          </motion.h1>

          {/* Typing Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex items-center space-x-2 font-cyber text-lg sm:text-2xl text-lavender-vibrant min-h-[38px]"
          >
            <span className="text-lavender-vibrant font-extrabold">&gt;&gt;</span>
            <span className="font-extrabold tracking-wider">{typedText}</span>
            <span className="w-1.5 h-6 bg-lavender-vibrant animate-[pulse_1s_infinite] shadow-[0_0_8px_#A594F9]" />
          </motion.div>

          {/* Intro Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-deep-text/80 font-sans text-sm sm:text-base leading-relaxed max-w-xl font-medium"
          >
            I architect elegant full-stack ecosystems and responsive virtual worlds. 
            Blending high-performance Java algorithms with pixel-perfect frontend experiences, 
            I synthesize sleek digital products that deliver premium utility and visuals.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <a
              href="#contact"
              onClick={handleContactClick}
              className="flex items-center space-x-2 font-cyber text-xs tracking-widest uppercase bg-gradient-to-r from-lavender-light via-lavender-medium to-lavender-vibrant text-deep-text px-6 py-4 rounded font-extrabold hover:shadow-[0_0_20px_rgba(165,148,249,0.38)] transition-all group border border-lavender-medium/30 interactive-glow"
            >
              <span>Initialize Transmission</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="flex items-center space-x-2 font-cyber text-xs tracking-widest uppercase border border-lavender-medium/40 bg-white/30 text-deep-text px-6 py-4 rounded font-extrabold hover:border-lavender-vibrant hover:text-lavender-vibrant hover:bg-white/60 transition-all interactive-glow"
            >
              <span>Download System Spec</span>
              <Download className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Social Links with Hover Glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="flex items-center space-x-5 pt-6 border-t border-lavender-medium/20 w-fit"
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-lavender-medium/30 bg-white/30 flex items-center justify-center text-deep-text hover:text-lavender-vibrant hover:border-lavender-vibrant hover:shadow-[0_0_12px_rgba(165,148,249,0.25)] transition-all interactive-glow"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-lavender-medium/30 bg-white/30 flex items-center justify-center text-deep-text hover:text-lavender-vibrant hover:border-lavender-vibrant hover:shadow-[0_0_12px_rgba(165,148,249,0.25)] transition-all interactive-glow"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href="mailto:contact@example.com"
              className="w-10 h-10 rounded-full border border-lavender-medium/30 bg-white/30 flex items-center justify-center text-deep-text hover:text-lavender-vibrant hover:border-lavender-vibrant hover:shadow-[0_0_12px_rgba(165,148,249,0.25)] transition-all interactive-glow"
            >
              <Mail className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Right Side Parallax Illustration Panel */}
        <div className="lg:col-span-5 flex justify-center items-center relative py-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[420px] aspect-square flex items-center justify-center"
          >
            {/* Background parallax container */}
            <div 
              className="absolute inset-0 border border-lavender-medium/20 rounded-2xl bg-gradient-to-tr from-lavender-light/10 to-lavender-medium/10 transition-transform duration-200 ease-out"
              style={{
                transform: `translate3d(${-mousePos.x * 25}px, ${-mousePos.y * 25}px, 0) rotate(2deg)`,
              }}
            />
            
            {/* Spinning background geometric hud grid */}
            <div 
              className="absolute w-[105%] h-[105%] border-2 border-dashed border-lavender-vibrant/20 rounded-full animate-spin-slow opacity-60 transition-transform duration-200 ease-out"
              style={{
                transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0)`,
              }}
            />

            {/* Glowing neon blobs specific to photo background */}
            <div className="absolute top-[10%] right-[10%] w-48 h-48 rounded-full bg-lavender-medium/25 blur-3xl pointer-events-none" />
            <div className="absolute bottom-[10%] left-[10%] w-40 h-40 rounded-full bg-lavender-light/35 blur-3xl pointer-events-none" />

            {/* Parallax Illustration Wrapper */}
            <div
              className="relative w-full h-full rounded-2xl overflow-hidden glass p-3 border-lavender-medium/40 shadow-xl transition-transform duration-200 ease-out"
              style={{
                transform: `translate3d(${mousePos.x * 35}px, ${mousePos.y * 35}px, 0) rotateX(${-mousePos.y * 18}deg) rotateY(${mousePos.x * 18}deg)`,
                transformStyle: "preserve-3d",
                perspective: "1000px"
              }}
            >
              <img
                src={developerPhoto}
                alt="Software Developer Kee Profile"
                className="w-full h-full object-cover rounded-xl border border-white/10 pointer-events-none"
                style={{
                  transform: "translateZ(30px) scale(1.05)",
                }}
              />
              
              {/* Internal overlay gradient glare */}
              <div 
                className="absolute inset-0 pointer-events-none rounded-xl"
                style={{
                  background: `radial-gradient(circle at ${50 + mousePos.x * 60}% ${50 + mousePos.y * 60}%, rgba(165, 148, 249, 0.15) 0%, transparent 60%)`,
                  mixBlendMode: "overlay"
                }}
              />
            </div>

            {/* Floating glowing particle dots around */}
            <div 
              className="absolute top-2 left-10 w-2.5 h-2.5 rounded-full bg-lavender-vibrant shadow-[0_0_8px_#A594F9] transition-transform duration-300 ease-out"
              style={{ transform: `translate3d(${mousePos.x * 50}px, ${mousePos.y * 50}px, 0)` }}
            />
            <div 
              className="absolute bottom-12 right-2 w-3.5 h-3.5 rounded-full bg-lavender-medium shadow-[0_0_10px_#CDC1FF] transition-transform duration-300 ease-out animate-pulse"
              style={{ transform: `translate3d(${mousePos.x * -40}px, ${mousePos.y * -40}px, 0)` }}
            />
            <div 
              className="absolute top-1/2 -right-6 w-2 h-2 rounded-full bg-lavender-light shadow-[0_0_8px_#E5D9F2] transition-transform duration-300 ease-out"
              style={{ transform: `translate3d(${mousePos.x * 30}px, ${mousePos.y * -30}px, 0)` }}
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
