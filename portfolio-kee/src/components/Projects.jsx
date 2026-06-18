import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useInView } from "framer-motion";
import { 
  GitBranch, Server, Settings, ShieldAlert, Cpu, 
  Activity, Play, CheckCircle2, ChevronRight, 
  Database, Radio, Wifi, Bell, ArrowRight, Zap 
} from "lucide-react";

// Inline Counter for Project Metrics
function MetricCounter({ value, duration = 1.0 }) {
  const [count, setCount] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const numericPart = parseInt(value);
    if (isNaN(numericPart)) {
      setCount(value);
      return;
    }
    const suffix = value.toString().replace(/[0-9]/g, "");
    let start = 0;
    const end = numericPart;
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / (duration * 1000), 1);
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      const currentCount = Math.floor(easeProgress * (end - start) + start);
      setCount(currentCount + suffix);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [value, duration, isInView]);

  return <span ref={ref}>{count}</span>;
}

// ----------------------------------------------------
// PROJECT 1: R-Choice Approval Workflow & Routing Simulator
// ----------------------------------------------------
function RChoiceVisualizer() {
  const [activeStep, setActiveStep] = useState(0);
  const [trafficRoute, setTrafficRoute] = useState("Idle");
  const [isRouting, setIsRouting] = useState(false);

  const steps = [
    "Student Profile Submit",
    "Dept Advisor Audit",
    "HOD verification",
    "Placement Cell validation",
    "Company Agent review",
    "Neon Audit DB Locked"
  ];

  const triggerRouteAudit = () => {
    if (isRouting) return;
    setIsRouting(true);
    setTrafficRoute("Client Request");
    
    setTimeout(() => setTrafficRoute("NextAuth Filter"), 600);
    setTimeout(() => setTrafficRoute("CSRF & IDOR Checks"), 1200);
    setTimeout(() => setTrafficRoute("Elysia Route Controller"), 1800);
    setTimeout(() => setTrafficRoute("Neon Log Sync"), 2400);
    setTimeout(() => {
      setTrafficRoute("Success // Complete");
      setIsRouting(false);
    }, 3000);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="w-full flex flex-col space-y-6 pt-4">
      {/* 6-Tier Approval Steps */}
      <div>
        <h4 className="font-cyber text-[9px] tracking-widest text-lavender-vibrant font-extrabold uppercase mb-3 flex items-center space-x-2">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>6-Tier Automaton Approval Workflow Status</span>
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {steps.map((step, idx) => {
            const isActive = idx === activeStep;
            const isPassed = idx < activeStep;
            return (
              <div 
                key={idx}
                className={`p-2.5 rounded-xl border transition-all duration-300 ${
                  isActive 
                    ? "bg-lavender-vibrant/25 border-lavender-vibrant text-deep-text shadow-[0_0_10px_rgba(165,148,249,0.2)]" 
                    : isPassed 
                    ? "bg-lavender-light/10 border-lavender-medium/40 text-deep-text/60"
                    : "bg-white/10 border-lavender-medium/10 text-deep-text/40"
                }`}
              >
                <div className="font-cyber text-[8px] font-black mb-1 text-lavender-vibrant">
                  STAGE_0{idx + 1}
                </div>
                <div className="font-sans text-[9px] font-bold leading-tight uppercase">
                  {step}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Middleware Routing Stream */}
      <div className="p-4 rounded-xl bg-lavender-light/10 border border-lavender-medium/20 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <span className="font-cyber text-[8px] tracking-wider text-deep-text/50 uppercase font-black block">
            IDOR & CSRF MIDDLEWARE DECODER
          </span>
          <div className="font-cyber text-xs font-bold text-deep-text mt-1 flex items-center space-x-2 uppercase">
            <span>PACKET STATUS:</span>
            <span className={trafficRoute.includes("Success") ? "text-green-600 animate-pulse font-extrabold" : "text-lavender-vibrant font-black"}>
              {trafficRoute}
            </span>
          </div>
        </div>

        <button 
          onClick={triggerRouteAudit}
          disabled={isRouting}
          className="px-4 py-2.5 rounded-lg border border-lavender-medium/40 bg-white/50 hover:border-lavender-vibrant hover:bg-white text-deep-text font-cyber text-[9px] tracking-widest font-black uppercase transition-all flex items-center space-x-2"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{isRouting ? "AUDITING_PIPELINE..." : "EXECUTE_API_ROUTE_AUDIT"}</span>
        </button>
      </div>

      {/* Interactive Circuit Connection map */}
      <div className="relative h-20 w-full rounded-xl bg-white/20 border border-lavender-medium/15 flex items-center justify-around overflow-hidden p-2">
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_center,_#1C1635_1px,_transparent_1px)] bg-[size:8px_8px]" />
        
        {/* Animated flow dots inside SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="glow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#CDC1FF" />
              <stop offset="50%" stopColor="#A594F9" />
              <stop offset="100%" stopColor="#1C1635" />
            </linearGradient>
          </defs>
          <path 
            d="M 50,40 Q 200,10 350,40 T 650,40 T 950,40" 
            fill="none" 
            stroke="url(#glow-grad)" 
            strokeWidth="1.5" 
            strokeDasharray="4 8"
            className="animate-[dash_30s_linear_infinite]"
          />
        </svg>

        <div className="z-10 flex flex-col items-center">
          <Server className="w-4 h-4 text-lavender-vibrant" />
          <span className="font-cyber text-[8px] text-deep-text/60 mt-1 uppercase font-bold">CLIENT</span>
        </div>
        <div className="z-10 flex flex-col items-center">
          <GitBranch className="w-4 h-4 text-lavender-vibrant" />
          <span className="font-cyber text-[8px] text-deep-text/60 mt-1 uppercase font-bold">ROUTER</span>
        </div>
        <div className="z-10 flex flex-col items-center">
          <Settings className="w-4 h-4 text-lavender-vibrant" />
          <span className="font-cyber text-[8px] text-deep-text/60 mt-1 uppercase font-bold">NEON_DB</span>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// PROJECT 2: TNEB-GridSense Smart Telemetry Simulator
// ----------------------------------------------------
function GridSenseVisualizer() {
  const [telemetry, setTelemetry] = useState({
    voltage: 230,
    current: 4.5,
    status: "STABLE",
    temp: 34.2
  });
  const [isSimulatingFault, setIsSimulatingFault] = useState(false);

  useEffect(() => {
    if (isSimulatingFault) return;
    const interval = setInterval(() => {
      setTelemetry({
        voltage: Math.floor(228 + Math.random() * 6),
        current: parseFloat((4.2 + Math.random() * 0.8).toFixed(2)),
        status: "STABLE",
        temp: parseFloat((33.5 + Math.random() * 1.5).toFixed(1))
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [isSimulatingFault]);

  const triggerGridTrip = () => {
    setIsSimulatingFault(true);
    setTelemetry({
      voltage: 90,
      current: 18.5, // Overcurrent spike
      status: "TRIPPED // OVERCURRENT",
      temp: 58.9
    });
    
    // Auto-recover after 4 seconds
    setTimeout(() => {
      setIsSimulatingFault(false);
      setTelemetry({
        voltage: 230,
        current: 4.5,
        status: "STABLE // AUTOMATIC_RECOVERY_ENGAGED",
        temp: 35.0
      });
    }, 4500);
  };

  return (
    <div className="w-full flex flex-col space-y-6 pt-4">
      {/* Telemetry metrics dashboard */}
      <div>
        <h4 className="font-cyber text-[9px] tracking-widest text-lavender-vibrant font-extrabold uppercase mb-3 flex items-center space-x-2">
          <Activity className="w-3.5 h-3.5" />
          <span>Real-time Grid Telemetry telemetry dashboard</span>
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass p-3 rounded-xl border-lavender-medium/20 text-center bg-white/20">
            <span className="font-cyber text-[8px] text-deep-text/60 uppercase block font-bold">GRID_VOLTAGE</span>
            <div className="font-cyber text-lg font-black text-deep-text mt-1">
              {telemetry.voltage} <span className="text-[10px] text-lavender-vibrant">V</span>
            </div>
            <div className="w-full bg-lavender-medium/20 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-lavender-vibrant h-full transition-all duration-500" 
                style={{ width: `${(telemetry.voltage / 260) * 100}%` }}
              />
            </div>
          </div>

          <div className="glass p-3 rounded-xl border-lavender-medium/20 text-center bg-white/20">
            <span className="font-cyber text-[8px] text-deep-text/60 uppercase block font-bold">GRID_CURRENT</span>
            <div className="font-cyber text-lg font-black text-deep-text mt-1">
              {telemetry.current} <span className="text-[10px] text-lavender-vibrant">A</span>
            </div>
            <div className="w-full bg-lavender-medium/20 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-lavender-vibrant h-full transition-all duration-500" 
                style={{ width: `${Math.min((telemetry.current / 20) * 100, 100)}%` }}
              />
            </div>
          </div>

          <div className="glass p-3 rounded-xl border-lavender-medium/20 text-center bg-white/20">
            <span className="font-cyber text-[8px] text-deep-text/60 uppercase block font-bold">CORE_TEMPERATURE</span>
            <div className="font-cyber text-lg font-black text-deep-text mt-1">
              {telemetry.temp} <span className="text-[10px] text-lavender-vibrant">°C</span>
            </div>
            <div className="w-full bg-lavender-medium/20 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-lavender-vibrant h-full transition-all duration-500" 
                style={{ width: `${(telemetry.temp / 80) * 100}%` }}
              />
            </div>
          </div>

          <div className="glass p-3 rounded-xl border-lavender-medium/20 text-center bg-white/20 flex flex-col justify-center items-center">
            <span className="font-cyber text-[8px] text-deep-text/60 uppercase block font-bold">GRID_STATUS</span>
            <div className={`font-cyber text-xs font-black mt-2 px-2 py-1 rounded border leading-tight ${
              telemetry.status.includes("TRIPPED") 
                ? "bg-red-100 border-red-400 text-red-700 animate-pulse" 
                : "bg-green-100 border-green-300 text-green-700"
            }`}>
              {telemetry.status}
            </div>
          </div>
        </div>
      </div>

      {/* Sensor path network with flowing packets */}
      <div className="p-4 rounded-xl bg-lavender-light/10 border border-lavender-medium/20 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <span className="font-cyber text-[8px] tracking-wider text-deep-text/50 uppercase font-black block">
            LORA GATEWAY SYNC INTERFACE
          </span>
          <p className="font-sans text-[10px] text-deep-text/75 leading-tight mt-1 font-medium">
            Node sensors relay grid power packets using LoRa SX1278 channels.
          </p>
        </div>

        <button 
          onClick={triggerGridTrip}
          disabled={isSimulatingFault}
          className="px-4 py-2.5 rounded-lg border border-red-300 bg-red-50 hover:bg-red-100 text-red-700 font-cyber text-[9px] tracking-widest font-black uppercase transition-all flex items-center space-x-2"
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>{isSimulatingFault ? "SAFETY TRIPPED // ACTIVE" : "SIMULATE GRID OVERVOLTAGE FAULT"}</span>
        </button>
      </div>

      {/* Network flowing packets visualizer */}
      <div className="relative h-20 w-full rounded-xl bg-white/20 border border-lavender-medium/15 flex items-center justify-between overflow-hidden px-8">
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_center,_#1C1635_1px,_transparent_1px)] bg-[size:8px_8px]" />
        
        {/* Animated LoRa Signal Wave */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <span className="w-12 h-12 rounded-full border border-lavender-vibrant animate-ping absolute" />
          <span className="w-24 h-24 rounded-full border border-lavender-medium animate-ping absolute" />
        </div>

        <div className="z-10 flex flex-col items-center">
          <div className="p-2 rounded-lg bg-white/40 border border-lavender-medium/20 text-deep-text">
            <Cpu className="w-4 h-4" />
          </div>
          <span className="font-cyber text-[7px] text-deep-text/60 mt-1 uppercase font-bold">ESP32 SENSOR</span>
        </div>

        <div className="z-10 flex flex-col items-center">
          <div className="p-2 rounded-lg bg-white/40 border border-lavender-medium/20 text-deep-text animate-pulse">
            <Radio className="w-4 h-4 text-lavender-vibrant" />
          </div>
          <span className="font-cyber text-[7px] text-deep-text/60 mt-1 uppercase font-bold">LoRa SX1278</span>
        </div>

        <div className="z-10 flex flex-col items-center">
          <div className="p-2 rounded-lg bg-white/40 border border-lavender-medium/20 text-deep-text">
            <Database className="w-4 h-4" />
          </div>
          <span className="font-cyber text-[7px] text-deep-text/60 mt-1 uppercase font-bold">REACT CLOUD</span>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// PROJECT 3: SheBloom Real-Time WebSocket & Alert Stream
// ----------------------------------------------------
function SheBloomVisualizer() {
  const [logs, setLogs] = useState([]);
  const [patientStatus, setPatientStatus] = useState("STABLE");
  const logEndRef = useRef(null);

  const mockLogPool = [
    "WS Connected: PATIENT_NODE_09 // Elysia Handshake completed",
    "ECG Pulse Stream: 78 bpm // Stable",
    "SpO2 Saturation: 99% // High Efficiency",
    "WebSocket Packet sync completed (RTT: 12ms)",
    "Bun microservice router loaded in 4ms",
    "Capacitor Local notification channel refreshed",
    "Maternal Circle Hub status checked // Synchronous stability verified"
  ];

  useEffect(() => {
    // Populate initial logs
    setLogs(Array.from({ length: 4 }).map(() => {
      const time = new Date().toLocaleTimeString();
      const text = mockLogPool[Math.floor(Math.random() * mockLogPool.length)];
      return `[${time}] ${text}`;
    }));
  }, []);

  useEffect(() => {
    const logInterval = setInterval(() => {
      const time = new Date().toLocaleTimeString();
      const text = mockLogPool[Math.floor(Math.random() * mockLogPool.length)];
      setLogs((prev) => [...prev.slice(-12), `[${time}] ${text}`]);
    }, 3000);

    return () => clearInterval(logInterval);
  }, []);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  const triggerMaternalAlert = () => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [
      ...prev,
      `[${time}] [CRITICAL_FAILSAFE] Alert Triggered: Maternal Circle Network pinged!`,
      `[${time}] [ALERT_STATUS] Elysia WebSocket sending low-latency emergency packet...`,
      `[${time}] [ALERT_STATUS] Node ESP32 alert relay initiated...`
    ]);
    setPatientStatus("ALERTING");
    
    setTimeout(() => {
      setPatientStatus("STABLE");
      const recoverTime = new Date().toLocaleTimeString();
      setLogs((prev) => [
        ...prev,
        `[${recoverTime}] [FAILSAFE_RECOVERY] Safety validation confirmed. Patient Circle safe.`
      ]);
    }, 5000);
  };

  return (
    <div className="w-full flex flex-col space-y-6 pt-4">
      {/* Live web socket logging console */}
      <div>
        <h4 className="font-cyber text-[9px] tracking-widest text-lavender-vibrant font-extrabold uppercase mb-3 flex items-center space-x-2">
          <Wifi className="w-3.5 h-3.5" />
          <span>Real-time Clinical WebSocket Alert Stream Console</span>
        </h4>
        
        <div className="w-full h-36 bg-[#1C1635] text-white/90 border border-lavender-medium/25 rounded-xl p-4 font-cyber text-[9px] leading-relaxed overflow-y-auto flex flex-col shadow-inner select-text">
          <div className="flex-grow">
            {logs.map((log, idx) => (
              <div key={idx} className={`mb-1 tracking-wider ${
                log.includes("CRITICAL") 
                  ? "text-red-400 font-extrabold animate-pulse" 
                  : log.includes("Elysia") 
                  ? "text-lavender-medium" 
                  : "text-white/60"
              }`}>
                {log}
              </div>
            ))}
            <div ref={logEndRef} />
          </div>
        </div>
      </div>

      {/* Elysia WebSocket relay options */}
      <div className="p-4 rounded-xl bg-lavender-light/10 border border-lavender-medium/20 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <span className="font-cyber text-[8px] tracking-wider text-deep-text/50 uppercase font-black block">
            ELYSIA WS BROADCAST HUB
          </span>
          <div className="font-cyber text-xs font-bold text-deep-text mt-1 flex items-center space-x-2 uppercase">
            <span>PATIENT INTEGRITY:</span>
            <span className={patientStatus === "ALERTING" ? "text-red-600 animate-bounce font-black" : "text-green-600 font-extrabold"}>
              {patientStatus}
            </span>
          </div>
        </div>

        <button 
          onClick={triggerMaternalAlert}
          disabled={patientStatus === "ALERTING"}
          className="px-4 py-2.5 rounded-lg border border-lavender-vibrant bg-white hover:bg-lavender-light/10 text-lavender-vibrant font-cyber text-[9px] tracking-widest font-black uppercase transition-all flex items-center space-x-2"
        >
          <Bell className="w-3.5 h-3.5" />
          <span>{patientStatus === "ALERTING" ? "ALERT SENT // PENDING" : "TRIGGER CRITICAL FAIL-SAFE ALERT"}</span>
        </button>
      </div>

      {/* Architecture pipeline connections */}
      <div className="relative h-20 w-full rounded-xl bg-white/20 border border-lavender-medium/15 flex items-center justify-around overflow-hidden px-4">
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_center,_#1C1635_1px,_transparent_1px)] bg-[size:8px_8px]" />
        
        <div className="z-10 flex flex-col items-center">
          <Cpu className="w-4 h-4 text-lavender-vibrant" />
          <span className="font-cyber text-[7px] text-deep-text/60 mt-1 uppercase font-bold">ESP32 Client</span>
        </div>
        <div className="flex items-center text-lavender-vibrant/40">
          <ChevronRight className="w-3.5 h-3.5 animate-pulse" />
          <span className="font-cyber text-[6px] uppercase tracking-widest font-black">WS</span>
          <ChevronRight className="w-3.5 h-3.5 animate-pulse" />
        </div>
        <div className="z-10 flex flex-col items-center">
          <Server className="w-4 h-4 text-lavender-vibrant" />
          <span className="font-cyber text-[7px] text-deep-text/60 mt-1 uppercase font-bold">Elysia WS</span>
        </div>
        <div className="flex items-center text-lavender-vibrant/40">
          <ChevronRight className="w-3.5 h-3.5 animate-pulse" />
          <span className="font-cyber text-[6px] uppercase tracking-widest font-black">HTTP</span>
          <ChevronRight className="w-3.5 h-3.5 animate-pulse" />
        </div>
        <div className="z-10 flex flex-col items-center">
          <Landmark className="w-4 h-4 text-lavender-vibrant" />
          <span className="font-cyber text-[7px] text-deep-text/60 mt-1 uppercase font-bold">Capacitor Mobile</span>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// MAIN PROJECTS COMPONENT
// ----------------------------------------------------
const PROJECTS = [
  {
    id: "r-choice",
    title: "R-Choice",
    subtitle: "Placement Platform",
    role: "API & Routing Architect, DevOps Handling (Team of 4)",
    highlights: [
      "Architected a Next.js 16 & NextAuth v5 role-based engine.",
      "Engineered a 6-tier automated approval workflow.",
      "Eliminated spreadsheet-based processes.",
      "Implemented IDOR prevention.",
      "Built CSRF protection middleware.",
      "Added audit logging using Neon PostgreSQL."
    ],
    tech: ["Next.js 16", "NextAuth v5", "TypeScript", "PostgreSQL", "DevOps"],
    metrics: [
      { label: "Approval Latency Red.", value: "94%" },
      { label: "Audit Log Integrity", value: "100%" },
      { label: "Workflow Tiers Built", value: "6" }
    ],
    visualizer: RChoiceVisualizer
  },
  {
    id: "gridsense",
    title: "TNEB-GridSense",
    subtitle: "Smart Pole Telemetry System",
    role: "IoT Architect & Frontend Developer (Team of 4)",
    highlights: [
      "Built an industrial IoT telemetry ecosystem.",
      "Integrated ESP32, LoRa SX1278, ADS1115, ACS712.",
      "Developed automated trip-relay mechanisms.",
      "Reduced power-grid downtime.",
      "Built a React/Tailwind analytics dashboard.",
      "Connected predictive monitoring algorithms."
    ],
    tech: ["React", "Tailwind CSS", "ESP32", "LoRa", "IoT", "Analytics"],
    metrics: [
      { label: "Trip Failsafe Speed", value: "24ms" },
      { label: "LoRa Range Secured", value: "3.5km" },
      { label: "Power-grid Downtime Red.", value: "32%" }
    ],
    visualizer: GridSenseVisualizer
  },
  {
    id: "shebloom",
    title: "SheBloom",
    subtitle: "Maternal Healthcare Platform",
    role: "Turborepo Architect & Lead Developer",
    highlights: [
      "Architected a Turborepo monorepo.",
      "Built with Bun, Elysia.js, Next.js 16.",
      "Wrapped inside a Capacitor mobile shell.",
      "Managed real-time maternal healthcare circles.",
      "Developed zero-cost fail-safe alerting.",
      "Integrated ESP32 WebSocket streams.",
      "Enabled low-latency clinical monitoring."
    ],
    tech: ["Next.js 16", "Bun", "Elysia.js", "Capacitor", "ESP32", "WebSockets"],
    metrics: [
      { label: "WS Connection Latency", value: "12ms" },
      { label: "Failsafe Alert Cost", value: "0" },
      { label: "Sync Frequency", value: "60Hz" }
    ],
    visualizer: SheBloomVisualizer
  }
];

function ProjectSystemNode({ project, idx, activeId, setActiveId }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, margin: "-100px 0px -100px 0px" });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const isExpanded = activeId === project.id;

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleToggle = () => {
    if (isExpanded) {
      setActiveId(null);
    } else {
      setActiveId(project.id);
    }
  };

  const VisualizerComponent = project.visualizer;

  return (
    <div
      ref={cardRef}
      className="relative w-full flex items-start gap-8 md:gap-12 text-left mb-16"
    >
      {/* 1. Large Expandable System Node indicator on Timeline */}
      <div className="hidden md:flex flex-col items-center absolute left-4 md:left-[39px] top-0 bottom-0 z-10">
        <motion.button
          onClick={handleToggle}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
            isExpanded 
              ? "bg-lavender-vibrant border-lavender-vibrant shadow-[0_0_15px_#A594F9] text-white" 
              : "bg-white border-lavender-medium/40 hover:border-lavender-vibrant text-lavender-vibrant"
          }`}
        >
          <Cpu className={`w-5 h-5 ${isExpanded ? "animate-spin-slow" : ""}`} />
        </motion.button>
        
        {/* Animated connection path line */}
        <div className="w-[2px] flex-grow bg-gradient-to-b from-lavender-vibrant/50 to-transparent mt-2 border-dashed border-r border-lavender-medium/20" />
      </div>

      {/* 2. Main dashboard panel container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={handleMouseMove}
        className={`w-full md:ml-20 glass p-6 sm:p-8 rounded-3xl border-lavender-medium/25 hover:border-lavender-vibrant/60 shadow-xl transition-all duration-500 bg-white/35 relative overflow-hidden flex flex-col justify-between ${
          isExpanded ? "ring-2 ring-lavender-vibrant/30 bg-white/45" : ""
        }`}
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, rgba(165, 148, 249, 0.09), transparent 80%)`
        }}
      >
        {/* Top Header details */}
        <div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-lavender-medium/20 pb-4 mb-5">
            <div>
              <span className="font-cyber text-[9px] tracking-[0.25em] text-lavender-vibrant font-extrabold uppercase block mb-1">
                SYSTEM_NODE_0{idx + 1} // ENGINEERING_RECORD
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-deep-text uppercase tracking-wide">
                {project.title} <span className="font-sans font-light text-deep-text/65 text-lg block sm:inline">| {project.subtitle}</span>
              </h3>
            </div>
            
            <div className="text-left md:text-right mt-1 md:mt-0">
              <span className="font-cyber text-[8px] tracking-wider text-deep-text/50 uppercase font-black block">ROLE RESPONSIBILITIES</span>
              <span className="font-sans text-xs text-deep-text/80 font-bold uppercase">{project.role}</span>
            </div>
          </div>

          {/* highlights checklist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="font-cyber text-[8px] tracking-[0.2em] text-lavender-vibrant font-black uppercase mb-3.5">
                ARCHITECTURE_HIGHLIGHTS
              </h4>
              <ul className="space-y-2.5">
                {project.highlights.map((highlight, hIdx) => (
                  <li key={hIdx} className="flex items-start space-x-2 text-deep-text/85 font-sans text-xs leading-relaxed font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-lavender-vibrant shrink-0 mt-2 shadow-[0_0_4px_#A594F9]" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* floating technology chips & metrics */}
            <div className="flex flex-col justify-between">
              <div>
                <h4 className="font-cyber text-[8px] tracking-[0.2em] text-lavender-vibrant font-black uppercase mb-3.5">
                  CORE_INTEGRATIONS
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((techItem, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1.5 rounded-lg bg-lavender-light/20 border border-lavender-medium/30 font-cyber text-[9px] tracking-widest font-black text-lavender-vibrant uppercase shadow-sm hover:border-lavender-vibrant/60 transition-all hover:-translate-y-0.5 duration-300"
                    >
                      {techItem}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics dashboard */}
              <div className="mt-6 pt-4 border-t border-lavender-medium/20">
                <div className="grid grid-cols-3 gap-2">
                  {project.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="text-center">
                      <div className="font-cyber text-lg sm:text-xl font-black text-deep-text">
                        <MetricCounter value={metric.value} />
                      </div>
                      <span className="font-cyber text-[8px] text-deep-text/60 uppercase font-bold block mt-0.5">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard expansion trigger button */}
        <div className="pt-4 border-t border-lavender-medium/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-cyber text-[8px] tracking-[0.2em] text-deep-text/50 uppercase font-black">
            {isExpanded ? "AUDITING STATE STABLE // LOGS_ACTIVE" : "VAULT READY // INITIALIZE AUDIT_PORTAL"}
          </span>
          
          <button 
            onClick={handleToggle}
            className={`px-5 py-3 rounded-xl border font-cyber text-[9px] tracking-widest font-black uppercase transition-all flex items-center space-x-2 cursor-pointer shadow-sm ${
              isExpanded 
                ? "bg-lavender-bg border-lavender-vibrant text-lavender-vibrant hover:bg-lavender-light/20" 
                : "bg-gradient-to-r from-lavender-light to-lavender-vibrant border-lavender-medium/30 text-deep-text hover:shadow-[0_0_15px_rgba(165,148,249,0.38)]"
            }`}
          >
            <span>{isExpanded ? "CLOSE ENGINEERING AUDIT" : "INITIALIZE SYSTEM AUDIT"}</span>
            <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`} />
          </button>
        </div>

        {/* Expandable Visual dashboard */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden mt-6 pt-6 border-t border-lavender-medium/25"
            >
              <VisualizerComponent />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const containerRef = useRef(null);
  const [activeId, setActiveId] = useState(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001
  });

  return (
    <section
      id="projects"
      className="relative min-h-screen py-24 px-6 md:px-12 xl:px-24 select-none overflow-hidden bg-transparent"
    >
      {/* Background Soft Flares */}
      <div className="absolute top-[15%] right-[5%] w-[35vw] h-[35vw] rounded-full bg-lavender-light/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[25%] left-[5%] w-[30vw] h-[30vw] rounded-full bg-lavender-medium/15 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 relative">
        
        {/* Module Header */}
        <div className="text-center mb-20">
          <span className="font-cyber text-[10px] tracking-[0.4em] uppercase text-lavender-vibrant font-extrabold block mb-2">
            SEC_COMPILATION // SYSTEM_ENGINEERING
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-deep-text tracking-tight uppercase">
            Featured <span className="bg-gradient-to-r from-lavender-vibrant via-lavender-medium to-deep-text bg-clip-text text-transparent neon-text-vibrant">Projects</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-deep-text/75 max-w-xl mx-auto mt-4 font-medium leading-relaxed">
            Building scalable platforms, intelligent systems, and real-world solutions.
          </p>
          <div className="w-24 h-[2px] bg-gradient-to-r from-lavender-light via-lavender-medium to-lavender-vibrant mx-auto mt-6" />
        </div>

        {/* Vertical Journey Timeline Nodes */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto py-8">
          {/* Main timeline track vector */}
          <div className="absolute left-[20px] md:left-[58px] -translate-x-1/2 top-4 bottom-4 w-[2px] bg-lavender-light/40 border-r border-lavender-medium/20" />
          
          <motion.div 
            style={{ 
              scaleY,
              transformOrigin: "top" 
            }}
            className="absolute left-[20px] md:left-[58px] -translate-x-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-lavender-light via-lavender-medium to-lavender-vibrant shadow-[0_0_12px_#A594F9]" 
          />

          <div className="space-y-4">
            {PROJECTS.map((project, idx) => (
              <ProjectSystemNode
                key={project.id}
                project={project}
                idx={idx}
                activeId={activeId}
                setActiveId={setActiveId}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
