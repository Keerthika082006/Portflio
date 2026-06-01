import { useState, useEffect } from "react";
import { Eye } from "lucide-react";
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

const LeetcodeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2c5.522 0 10 4.477 10 10s-4.478 10-10 10S2 17.523 2 12 6.478 2 12 2Z" />
    <path d="m14.5 13.5-3-3m0 0a1.5 1.5 0 1 0-2.12 2.12l4.24 4.24a1.5 1.5 0 0 0 2.12 0l4.24-4.24a1.5 1.5 0 0 0-2.12-2.12l-3.36 3.36" />
  </svg>
);

const TYPING_STRINGS = [
  "Tech Explorer",
  "Software Developer",
  "Problem Solver",
];

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [stringIdx, setStringIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

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



  return (
    <section 
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center pt-24 px-6 md:px-12 xl:px-24 select-none overflow-hidden bg-transparent"
    >
      {/* Background soft flares */}
      <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-lavender-light/20 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[35vw] h-[35vw] rounded-full bg-lavender-medium/15 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left Side Info Panel */}
        <div className="lg:col-span-7 flex flex-col space-y-6 text-left">

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-deep-text leading-[1.05]"
          >
            Hi, I Am <span className="bg-gradient-to-r from-lavender-vibrant via-lavender-medium to-deep-text bg-clip-text text-transparent inline-block font-black neon-text-vibrant">Keerthika</span>
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
            Software developer passionate about creating end-to-end web applications, spanning from interactive user interfaces to reliable server architecture. I rely on a solid academic foundation in algorithms and data structures to turn complex problems into clean, maintainable code. Ready to bring adaptability and a strong work ethic to a team building real-world software solutions.
          </motion.p>

          {/* Social Links with Hover Glow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex items-center space-x-4 pt-4 border-t border-lavender-medium/20 w-fit"
          >
            <a
              href="https://github.com/Keerthika082006"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group w-9 h-9 rounded-full border border-lavender-medium/30 bg-white/30 flex items-center justify-center text-deep-text hover:text-lavender-vibrant hover:border-lavender-vibrant hover:shadow-[0_0_12px_rgba(165,148,249,0.45)] transition-all interactive-glow"
            >
              <GithubIcon className="w-4 h-4" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 scale-0 group-hover:scale-100 transition-all duration-200 bg-deep-text/90 backdrop-blur border border-lavender-medium/30 text-white font-cyber text-[7px] tracking-widest uppercase px-2 py-0.5 rounded shadow-lg pointer-events-none select-none z-30 whitespace-nowrap">
                github
              </span>
            </a>
            <a
              href="https://leetcode.com/u/keerthiduraiselvan/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group w-9 h-9 rounded-full border border-lavender-medium/30 bg-white/30 flex items-center justify-center text-deep-text hover:text-lavender-vibrant hover:border-lavender-vibrant hover:shadow-[0_0_12px_rgba(165,148,249,0.45)] transition-all interactive-glow"
            >
              <LeetcodeIcon className="w-4 h-4" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 scale-0 group-hover:scale-100 transition-all duration-200 bg-deep-text/90 backdrop-blur border border-lavender-medium/30 text-white font-cyber text-[7px] tracking-widest uppercase px-2 py-0.5 rounded shadow-lg pointer-events-none select-none z-30 whitespace-nowrap">
                leetcode
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/keerthika0812/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group w-9 h-9 rounded-full border border-lavender-medium/30 bg-white/30 flex items-center justify-center text-deep-text hover:text-lavender-vibrant hover:border-lavender-vibrant hover:shadow-[0_0_12px_rgba(165,148,249,0.45)] transition-all interactive-glow"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 scale-0 group-hover:scale-100 transition-all duration-200 bg-deep-text/90 backdrop-blur border border-lavender-medium/30 text-white font-cyber text-[7px] tracking-widest uppercase px-2 py-0.5 rounded shadow-lg pointer-events-none select-none z-30 whitespace-nowrap">
                linkedin
              </span>
            </a>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="pt-2"
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert("Resume viewing is coming soon...");
              }}
              className="inline-flex items-center space-x-2 font-cyber text-xs tracking-widest uppercase bg-gradient-to-r from-lavender-light via-lavender-medium to-lavender-vibrant text-deep-text px-6 py-4 rounded font-extrabold hover:shadow-[0_0_20px_rgba(165,148,249,0.38)] transition-all group border border-lavender-medium/30 interactive-glow"
            >
              <span>View Resume</span>
              <Eye className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Right Side Parallax Illustration Panel */}
        <div className="lg:col-span-5 flex justify-center items-center relative py-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.04, y: -6 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[340px] aspect-[3/4] flex items-center justify-center cursor-pointer group"
          >
            {/* Spinning background geometric HUD grid */}
            <div className="absolute w-[105%] h-[105%] border border-dashed border-lavender-vibrant/25 rounded-full animate-spin-slow opacity-50" />

            {/* Glowing neon blobs specific to photo background */}
            <div className="absolute top-[10%] right-[10%] w-44 h-44 rounded-full bg-lavender-medium/20 blur-3xl pointer-events-none" />
            <div className="absolute bottom-[10%] left-[10%] w-36 h-36 rounded-full bg-lavender-light/30 blur-3xl pointer-events-none" />

            {/* Premium Flat Framed Illustration Wrapper for Proper View & Glow */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-lavender-vibrant/40 shadow-[0_0_20px_rgba(165,148,249,0.3)] transition-all duration-500 group-hover:border-lavender-vibrant/80 group-hover:shadow-[0_0_35px_rgba(165,148,249,0.6)] bg-white/10">
              <img
                src={developerPhoto}
                alt="Software Developer Keerthika Profile"
                className="w-full h-full object-cover rounded-xl pointer-events-none"
              />
              
              {/* Internal overlay gradient glare */}
              <div 
                className="absolute inset-0 pointer-events-none rounded-xl z-20"
                style={{
                  background: `radial-gradient(circle at 50% 50%, rgba(165, 148, 249, 0.08) 0%, transparent 60%)`,
                  mixBlendMode: "overlay"
                }}
              />
            </div>

            {/* Floating glowing particle dots around */}
            <div className="absolute top-2 left-10 w-2.5 h-2.5 rounded-full bg-lavender-vibrant shadow-[0_0_8px_#A594F9]" />
            <div className="absolute bottom-12 right-2 w-3.5 h-3.5 rounded-full bg-lavender-medium shadow-[0_0_10px_#CDC1FF] animate-pulse" />
            <div className="absolute top-1/2 -right-6 w-2 h-2 rounded-full bg-lavender-light shadow-[0_0_8px_#E5D9F2]" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
