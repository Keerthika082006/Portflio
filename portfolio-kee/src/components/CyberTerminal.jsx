import { useState, useEffect, useRef } from "react";
import { Terminal } from "lucide-react";

const SYSTEM_LOGS = [
  "SYSTEM CONFIG_SYNC: STABLE",
  "DECRYPTED PROTOCOL: KEE.SYS // SEC_COMM",
  "ESTABLISHING HOST CONNECTION ON PORT 8080...",
  "STATUS: ONLINE // READY FOR OPERATOR SPEC",
];

const HELP_RESPONSE = [
  "==============================================",
  " KEE.SYS OPERATIONAL DIRECTIVE MANUAL (v4.0)",
  "==============================================",
  "AVAILABLE COMMANDS:",
  "  help      - DISPLAY SYSTEM DIRECTIVES",
  "  about     - QUERY ARCHITECT PROFILE",
  "  skills    - RENDER PROFICIENCY RATINGS GRAPH",
  "  projects  - VIEW PROJECTS AND DEPLOYED CODE",
  "  open <id> - INITIALIZE LAUNCH (e.g. 'open 1')",
  "  neofetch  - SUMMARIZE SYSTEM SPECIFICATIONS",
  "  matrix    - TOGGLE HOLOGRAPHIC DIGITAL RAIN",
  "  contact   - INITIATE ENCRYPTED OUTSIDE TRANSMISSION",
  "  clear     - ERASE INPUT RECORD ARCHIVE",
  "==============================================",
];

const NEOFETCH_RESPONSE = [
  "   _  _________ ___    __ __ ____________",
  "  / |/ / __/ __/ _ \\  / //_// __/ __/ __/",
  " /    / _// _// // / / ,<  / _// _/_\\ \\  ",
  "/_/|_/___/___/____/ /_/|_|/___/___/___/  ",
  "-----------------------------------------",
  "SYS_INTEGRATION : KEE.SYS // PORTFOLIO v4",
  "OPERATOR        : DEVSYNTHESIS_KEE_08",
  "ENVIRONMENT     : VITE_REACT_NODE_19.2",
  "STYLE_SHEETS    : TAILWIND_V4 // FRAMER_MOTION",
  "ACTIVE_CORES    : JAVA_OOP_ARCHITECTURE (90%)",
  "SOLVED_PROBS    : 420+ ALGORITHMIC CHALLENGES",
  "COGNITIVE_MEM   : REACT_JS (85%) // MYSQL (80%)",
  "SYSTEM_STATUS   : STABLE // PREEMPTIVE_SYS_LOCK",
  "-----------------------------------------",
];

const SKILLS_RESPONSE = [
  "==============================================",
  " CORE PROFICIENCY RATINGS - SYS_SYNCED",
  "==============================================",
  "JAVA & OOP      [██████████████████░] 90% ",
  "REACT & FRONT   [████████████████░░░] 85% ",
  "TAILWIND & CSS  [███████████████████] 95% ",
  "MYSQL & DATABASE[████████████████░░░░] 80% ",
  "==============================================",
];

const ABOUT_RESPONSE = [
  ">> QUERY ARCHITECT BIOGRAPHY...",
  "---------------------------------------------",
  "Full Name   : KEE",
  "Focus       : Back-End Java Engineering & Pixel-Perfect Front-Ends",
  "Objective   : Structuring sleek high-efficiency ecosystems that wow users.",
  "Description : I bridge the gap between heavy algorithm computation (OOP Java)",
  "              and high-fidelity, high-animation interfaces.",
  "---------------------------------------------",
];

const PROJECTS_RESPONSE = [
  "==============================================",
  " DEPLOYED PRODUCTS ARCHIVE (ACTIVE HOST)",
  "==============================================",
  "  [1] CYBERCORE IDE v3.1",
  "      Sleek Monaco-powered synthesizer web editor.",
  "  [2] GALACTIC NAVIGATOR HUB",
  "      Pathfinding solar orbital routing Dijkstra algorithms.",
  "  [3] CYBER SYMPHONY WAVE",
  "      Audio buffer Canvas visualizer simulation.",
  "---------------------------------------------",
  "  TYPE 'open <id>' (e.g. 'open 1') TO INITIALIZE DEPLOYMENT LINK",
  "==============================================",
];

const CONTACT_RESPONSE = [
  "==============================================",
  " INITIATE TRANSMISSION CHANNELS",
  "==============================================",
  "  EMAIL_NODE : contact@example.com",
  "  PHONE_NET  : +1 (555) 019-9284",
  "  LINKEDIN   : linkedin.com (Type 'open linkedin')",
  "  GITHUB     : github.com   (Type 'open github')",
  "==============================================",
];

export default function CyberTerminal() {
  const [history, setHistory] = useState([
    { text: "KEE.SYS INTERFACE CONSOLE ONLINE.", type: "system" },
    { text: "TYPE 'help' TO DISCOVER AVAILABLE OPERATIONS.", type: "system" },
    { text: "", type: "break" },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [matrixActive, setMatrixActive] = useState(false);

  const canvasRef = useRef(null);
  const terminalEndRef = useRef(null);
  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);
  
  // Matrix animation references
  const animFrameIdRef = useRef(null);
  const columnsRef = useRef([]);
  const dropsRef = useRef([]);

  // Scroll to bottom on updates (of terminal container only, not the page)
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  // Handle focus trigger on body click
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Matrix Digital Rain background generator
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = terminalBodyRef.current?.clientWidth || 600);
    let height = (canvas.height = terminalBodyRef.current?.clientHeight || 350);

    const fontSize = 11;
    let columns = Math.floor(width / fontSize);

    // Initializing matrix columns
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    dropsRef.current = drops;
    columnsRef.current = columns;

    const handleResize = () => {
      if (!canvas || !terminalBodyRef.current) return;
      width = canvas.width = terminalBodyRef.current.clientWidth;
      height = canvas.height = terminalBodyRef.current.clientHeight;
      columns = Math.floor(width / fontSize);
      
      const newDrops = [];
      for (let i = 0; i < columns; i++) {
        newDrops[i] = Math.random() * -100;
      }
      dropsRef.current = newDrops;
      columnsRef.current = columns;
    };

    window.addEventListener("resize", handleResize);

    const chars = "0101XYZSYSTEMKEEPORTFOLIOCYBERNETICDATAGRID101";

    const drawMatrix = () => {
      if (!matrixActive) return;

      // Dark translucent black overlay to create trail effect
      ctx.fillStyle = "rgba(28, 22, 53, 0.08)";
      ctx.fillRect(0, 0, width, height);

      // Soft purple matrix fonts
      ctx.fillStyle = "rgba(165, 148, 249, 0.45)";
      ctx.font = `${fontSize}px Orbitron`;

      for (let i = 0; i < dropsRef.current.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = dropsRef.current[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          dropsRef.current[i] = 0;
        }

        dropsRef.current[i]++;
      }

      animFrameIdRef.current = requestAnimationFrame(drawMatrix);
    };

    if (matrixActive) {
      ctx.fillStyle = "#1C1635";
      ctx.fillRect(0, 0, width, height);
      drawMatrix();
    } else {
      ctx.clearRect(0, 0, width, height);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    }

    // Battery-saver intersection observer / content visibility wrapper
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting && animFrameIdRef.current) {
          cancelAnimationFrame(animFrameIdRef.current);
        } else if (entry.isIntersecting && matrixActive) {
          drawMatrix();
        }
      });
    }, { rootMargin: "100px" });

    observer.observe(canvas);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      observer.disconnect();
    };
  }, [matrixActive]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    setInputVal("");

    if (!cmd) return;

    // Log the typed command first
    const newHistory = [...history, { text: `> ${cmd}`, type: "command" }];

    // Command parser routing logic
    if (cmd === "help") {
      setHistory([
        ...newHistory,
        ...HELP_RESPONSE.map((t) => ({ text: t, type: "manual" })),
        { text: "", type: "break" },
      ]);
    } else if (cmd === "about") {
      setHistory([
        ...newHistory,
        ...ABOUT_RESPONSE.map((t) => ({ text: t, type: "info" })),
        { text: "", type: "break" },
      ]);
    } else if (cmd === "skills") {
      setHistory([
        ...newHistory,
        ...SKILLS_RESPONSE.map((t) => ({ text: t, type: "stat" })),
        { text: "", type: "break" },
      ]);
    } else if (cmd === "projects") {
      setHistory([
        ...newHistory,
        ...PROJECTS_RESPONSE.map((t) => ({ text: t, type: "info" })),
        { text: "", type: "break" },
      ]);
    } else if (cmd === "neofetch") {
      setHistory([
        ...newHistory,
        ...NEOFETCH_RESPONSE.map((t) => ({ text: t, type: "badge" })),
        { text: "", type: "break" },
      ]);
    } else if (cmd === "contact") {
      setHistory([
        ...newHistory,
        ...CONTACT_RESPONSE.map((t) => ({ text: t, type: "info" })),
        { text: "", type: "break" },
      ]);
    } else if (cmd === "matrix") {
      setMatrixActive((prev) => {
        const nextState = !prev;
        setHistory([
          ...newHistory,
          {
            text: nextState
              ? "⚡ HOLOGRAPHIC QUANTUM MATRIX EMULATOR CHARGED."
              : "⚡ MATRIX SHIELD SHUTDOWN.",
            type: "system",
          },
          { text: "", type: "break" },
        ]);
        return nextState;
      });
    } else if (cmd === "clear") {
      setHistory([]);
    } else if (cmd.startsWith("open ")) {
      const target = cmd.substring(5).trim();
      let launched = false;
      let url = "";

      if (target === "1") {
        url = "https://github.com"; // CyberCore IDE v3.1
        launched = true;
      } else if (target === "2") {
        url = "https://github.com"; // Galactic Navigator
        launched = true;
      } else if (target === "3") {
        url = "https://github.com"; // Cyber Symphony
        launched = true;
      } else if (target === "linkedin") {
        url = "https://linkedin.com";
        launched = true;
      } else if (target === "github") {
        url = "https://github.com";
        launched = true;
      }

      if (launched) {
        window.open(url, "_blank");
        setHistory([
          ...newHistory,
          { text: `🚀 TRANSMISSION PIPELINE ESTABLISHED TO ROOT PATH: ${url}`, type: "system" },
          { text: "", type: "break" },
        ]);
      } else {
        setHistory([
          ...newHistory,
          { text: `❌ INITIALIZATION FAULT: SECURE ADDRESS UNKNOWN '${target}'`, type: "error" },
          { text: "", type: "break" },
        ]);
      }
    } else {
      setHistory([
        ...newHistory,
        { text: `❌ SYS_ERROR: INTERPRETATION FAILED. UNKNOWN DIRECTIVE '${cmd}'`, type: "error" },
        { text: "   TYPE 'help' FOR COMPILATION GUIDELINES.", type: "manual" },
        { text: "", type: "break" },
      ]);
    }
  };

  return (
    <div
      onClick={focusInput}
      className="relative w-full h-[480px] rounded-2xl overflow-hidden glass border-lavender-medium/25 bg-deep-text/95 p-1 select-none flex flex-col font-cyber text-xs cursor-text shadow-2xl relative"
    >
      {/* Sleek CRT scanlines glass overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%] opacity-50 z-20" />

      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-lavender-medium/20 bg-deep-text/98 text-deep-text/80 z-30">
        <div className="flex items-center space-x-2">
          <Terminal className="w-3.5 h-3.5 text-lavender-vibrant" />
          <span className="font-cyber text-[9px] tracking-widest text-deep-surface/90 uppercase font-black">
            KEE.SYS // OPERATOR_SHELL
          </span>
        </div>
        
        {/* Retro dot indicators */}
        <div className="flex space-x-1.5 items-center">
          <span className="w-2 h-2 rounded-full bg-red-400 opacity-60 hover:opacity-100 transition-opacity" />
          <span className="w-2 h-2 rounded-full bg-yellow-400 opacity-60 hover:opacity-100 transition-opacity" />
          <span className="w-2 h-2 rounded-full bg-green-400 opacity-60 hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Stateful Matrix Rain Canvas Backdrop */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-30 rounded-2xl"
      />

      {/* Terminal body */}
      <div
        ref={terminalBodyRef}
        className="flex-grow overflow-y-auto px-5 py-4 space-y-2.5 z-10 scrollbar-thin relative scroll-smooth text-deep-surface"
      >
        <div className="space-y-1">
          {SYSTEM_LOGS.map((log, idx) => (
            <div key={idx} className="text-lavender-vibrant/75 font-semibold leading-relaxed tracking-wider text-[10px]">
              {log}
            </div>
          ))}
        </div>

        <div className="w-full h-[1px] bg-lavender-medium/15" />

        {/* Dynamic Command History */}
        <div className="space-y-1.5 leading-relaxed tracking-wide text-left">
          {history.map((hist, idx) => {
            if (hist.type === "break") return <div key={idx} className="h-1" />;
            
            let colorClass = "text-deep-surface/85";
            if (hist.type === "system") colorClass = "text-lavender-medium font-bold";
            else if (hist.type === "command") colorClass = "text-emerald-300 font-extrabold text-[13px]";
            else if (hist.type === "error") colorClass = "text-red-400 font-semibold";
            else if (hist.type === "manual") colorClass = "text-lavender-light/90";
            else if (hist.type === "badge") colorClass = "text-indigo-200 font-mono text-[10px] sm:text-[11px] whitespace-pre";
            else if (hist.type === "stat") colorClass = "text-lavender-vibrant font-mono whitespace-pre text-[10px] sm:text-[11px]";
            else if (hist.type === "info") colorClass = "text-deep-surface/90 font-medium whitespace-pre";

            return (
              <div key={idx} className={`${colorClass}`}>
                {hist.text}
              </div>
            );
          })}
          <div ref={terminalEndRef} />
        </div>
      </div>

      {/* Terminal Input Footer */}
      <form
        onSubmit={handleSubmit}
        className="relative px-5 py-3 border-t border-lavender-medium/20 bg-deep-text/98 flex items-center z-10"
      >
        <span className="text-emerald-300 font-extrabold mr-2 select-none">&gt;&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="TYPE DIRECTIVES (e.g. 'help', 'neofetch')..."
          className="flex-grow bg-transparent border-none outline-none font-cyber text-xs text-deep-surface placeholder-deep-surface/40 uppercase tracking-widest"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </form>
    </div>
  );
}
