import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  Send, Mail, MapPin, 
  Terminal, ShieldCheck, HelpCircle, Briefcase 
} from "lucide-react";

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

const OPEN_TO_ROLES = [
  "Software Engineering Internships",
  "Full Stack Development",
  "Web Development Projects",
  "Hackathons",
  "Technical Collaborations"
];

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  // Real-time validation
  const validateField = (name, value) => {
    let error = "";
    if (name === "name") {
      if (!value.trim()) error = "Name identification packet is required.";
      else if (value.trim().length < 2) error = "Name must be at least 2 characters.";
    } else if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) error = "Return route email node is required.";
      else if (!emailRegex.test(value)) error = "Invalid routing format for email address.";
    } else if (name === "subject") {
      if (!value.trim()) error = "Subject transmission tag is required.";
    } else if (name === "message") {
      if (!value.trim()) error = "Payload message content is required.";
      else if (value.trim().length < 10) error = "Message payload must exceed 10 characters.";
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formState).forEach((key) => {
      const error = validateField(key, formState[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ name: true, email: true, subject: true, message: true });
      return;
    }

    setSubmitting(true);

    // Simulate secure network transmission delay
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
      setErrors({});
      setTouched({});
      
      setTimeout(() => setSuccess(false), 5000);
    }, 2000);
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen py-24 px-6 md:px-12 xl:px-24 select-none overflow-hidden bg-transparent flex items-center justify-center"
      style={{
        background: `radial-gradient(500px circle at ${mousePos.x}% ${mousePos.y}%, rgba(165, 148, 249, 0.05), transparent 85%)`
      }}
    >
      {/* Background communication network nodes animation */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <svg className="w-full h-full">
          {/* Animated node wires */}
          <line x1="20%" y1="30%" x2="40%" y2="70%" stroke="#A594F9" strokeWidth="1" strokeDasharray="5,10" className="animate-[dash_60s_linear_infinite]" />
          <line x1="40%" y1="70%" x2="80%" y2="50%" stroke="#CDC1FF" strokeWidth="1" strokeDasharray="5,10" className="animate-[dash_40s_linear_infinite]" />
          <line x1="80%" y1="50%" x2="50%" y2="20%" stroke="#A594F9" strokeWidth="1" strokeDasharray="5,10" className="animate-[dash_50s_linear_infinite]" />
          <line x1="50%" y1="20%" x2="20%" y2="30%" stroke="#E5D9F2" strokeWidth="1" strokeDasharray="5,10" className="animate-[dash_35s_linear_infinite]" />
          
          {/* Floating communication node points */}
          <circle cx="20%" cy="30%" r="4" fill="#A594F9" className="animate-pulse" />
          <circle cx="40%" cy="70%" r="5" fill="#CDC1FF" />
          <circle cx="80%" cy="50%" r="4" fill="#A594F9" />
          <circle cx="50%" cy="20%" r="6" fill="#E5D9F2" className="animate-pulse" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full z-10 relative">
        
        {/* Module Header */}
        <div className="text-center mb-16">
          <span className="font-cyber text-[10px] tracking-[0.4em] uppercase text-lavender-vibrant font-extrabold block mb-2">
            SEC_ESTABLISHMENT // SECURE_HANDSHAKE
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-deep-text tracking-tight uppercase">
            Let's Build <span className="bg-gradient-to-r from-lavender-vibrant via-lavender-medium to-deep-text bg-clip-text text-transparent neon-text-vibrant font-black">Something Amazing</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-deep-text/75 max-w-xl mx-auto mt-4 font-medium leading-relaxed">
            Open to internships, software engineering opportunities, collaborations, hackathons, and innovative projects.
          </p>
          <div className="w-24 h-[2px] bg-gradient-to-r from-lavender-light via-lavender-medium to-lavender-vibrant mx-auto mt-6" />
        </div>

        {/* Split screen content layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Intro + Availability Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left"
          >
            <div className="glass p-6 sm:p-8 rounded-3xl border-lavender-medium/25 shadow-xl h-full flex flex-col justify-between relative overflow-hidden bg-white/20">
              {/* Corner brackets details */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-lavender-vibrant/60" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-lavender-vibrant/60" />

              <div className="space-y-6">
                
                {/* Availability status indicator */}
                <div className="flex items-center space-x-3 w-fit px-4 py-2 rounded-full bg-green-50 border border-green-200">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <span className="font-cyber text-[8px] tracking-[0.2em] text-green-700 font-black uppercase">
                    Available for Opportunities
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="font-cyber text-xs tracking-[0.2em] uppercase text-deep-text/75 flex items-center space-x-2 font-black">
                    <Terminal className="w-4 h-4 text-lavender-vibrant" />
                    <span>SYSTEM_COMMUNICATION_INFO</span>
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-deep-text/85 leading-relaxed font-medium">
                    Have an idea, opportunity, or challenge? Let's connect and create something impactful together. Reach out via the encrypted gateway or connect directly on professional network hubs.
                  </p>
                </div>

                {/* Info blocks: Email and Location */}
                <div className="space-y-4 pt-4 border-t border-lavender-medium/20">
                  {/* Email */}
                  <div className="flex items-center space-x-4 group">
                    <div className="w-10 h-10 rounded-xl border border-lavender-medium/30 bg-lavender-light/25 flex items-center justify-center text-lavender-vibrant group-hover:text-deep-text group-hover:border-lavender-vibrant group-hover:shadow-[0_0_8px_#A594F9] transition-all">
                      <Mail className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <span className="font-cyber text-[8px] tracking-widest text-deep-text/60 font-black uppercase block">EMAIL_NODE</span>
                      <a href="mailto:dkeerthika1808@gmail.com" className="font-cyber text-xs sm:text-sm text-deep-text hover:text-lavender-vibrant transition-colors font-extrabold">dkeerthika1808@gmail.com</a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center space-x-4 group">
                    <div className="w-10 h-10 rounded-xl border border-lavender-medium/30 bg-lavender-light/25 flex items-center justify-center text-lavender-vibrant transition-all">
                      <MapPin className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <span className="font-cyber text-[8px] tracking-widest text-deep-text/60 font-black uppercase block">LOCATION_NODE</span>
                      <span className="font-sans text-xs sm:text-sm text-deep-text font-bold">Coimbatore, Tamil Nadu, India</span>
                    </div>
                  </div>
                </div>

                {/* Currently Open To role tags */}
                <div className="pt-4 border-t border-lavender-medium/20">
                  <h4 className="font-cyber text-[8px] tracking-[0.2em] text-deep-text/60 font-black uppercase mb-3 flex items-center space-x-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-lavender-vibrant" />
                    <span>CURRENTLY_OPEN_TO:</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {OPEN_TO_ROLES.map((role, idx) => (
                      <span 
                        key={idx}
                        className="px-2.5 py-1 rounded bg-lavender-light/15 border border-lavender-medium/25 font-sans text-[9px] text-deep-text/90 font-bold uppercase tracking-wider"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Social links expansion cards */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-lavender-medium/20 mt-6 z-10">
                {/* LinkedIn Link */}
                <a
                  href="https://www.linkedin.com/in/keerthika0812/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 font-cyber text-[9px] tracking-widest uppercase border border-lavender-medium/35 bg-white/40 hover:border-lavender-vibrant hover:bg-white text-deep-text py-3.5 px-4 rounded-xl transition-all font-black hover:-translate-y-0.5 duration-300"
                >
                  <LinkedinIcon className="w-4 h-4 text-lavender-vibrant" />
                  <span>LinkedIn</span>
                </a>

                {/* Github Link */}
                <a
                  href="https://github.com/Keerthika082006"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 font-cyber text-[9px] tracking-widest uppercase border border-lavender-medium/35 bg-white/40 hover:border-lavender-vibrant hover:bg-white text-deep-text py-3.5 px-4 rounded-xl transition-all font-black hover:-translate-y-0.5 duration-300"
                >
                  <GithubIcon className="w-4 h-4 text-deep-text" />
                  <span>GitHub</span>
                </a>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Encrypted Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 w-full h-full flex"
          >
            <div className="glass p-6 sm:p-8 rounded-3xl border-lavender-medium/25 shadow-xl w-full text-left bg-white/20 relative flex flex-col justify-between">
              <h3 className="font-cyber text-xs tracking-[0.2em] uppercase text-lavender-vibrant font-black mb-6">
                &gt;&gt; BROADCAST_ENCRYPTED_PACKET
              </h3>

              <form onSubmit={handleFormSubmit} className="space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Name field */}
                  <div className="flex flex-col space-y-1">
                    <label className="font-cyber text-[8px] tracking-widest text-deep-text/75 font-black uppercase">identification_name</label>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="ENTER CALL SIGN OR NAME..."
                      className={`w-full bg-white/25 border rounded-xl px-4 py-3 font-cyber text-xs text-deep-text placeholder-deep-text/40 focus:outline-none focus:border-lavender-vibrant focus:shadow-[0_0_10px_rgba(165,148,249,0.25)] transition-all uppercase font-semibold ${
                        errors.name ? "border-red-400 focus:border-red-500" : "border-lavender-medium/35"
                      }`}
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.span 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-[8px] font-cyber text-red-500 uppercase tracking-wider font-extrabold mt-1 block"
                        >
                          {errors.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col space-y-1">
                    <label className="font-cyber text-[8px] tracking-widest text-deep-text/75 font-black uppercase">transmission_route (email)</label>
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="ENTER RETURN ROUTE (EMAIL)..."
                      className={`w-full bg-white/25 border rounded-xl px-4 py-3 font-cyber text-xs text-deep-text placeholder-deep-text/40 focus:outline-none focus:border-lavender-vibrant focus:shadow-[0_0_10px_rgba(165,148,249,0.25)] transition-all uppercase font-semibold ${
                        errors.email ? "border-red-400 focus:border-red-500" : "border-lavender-medium/35"
                      }`}
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.span 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-[8px] font-cyber text-red-500 uppercase tracking-wider font-extrabold mt-1 block"
                        >
                          {errors.email}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Subject field */}
                  <div className="flex flex-col space-y-1">
                    <label className="font-cyber text-[8px] tracking-widest text-deep-text/75 font-black uppercase">transmission_subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formState.subject}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="ENTER TOPIC / JOB ROLE / IDEATION MODULE..."
                      className={`w-full bg-white/25 border rounded-xl px-4 py-3 font-cyber text-xs text-deep-text placeholder-deep-text/40 focus:outline-none focus:border-lavender-vibrant focus:shadow-[0_0_10px_rgba(165,148,249,0.25)] transition-all uppercase font-semibold ${
                        errors.subject ? "border-red-400 focus:border-red-500" : "border-lavender-medium/35"
                      }`}
                    />
                    <AnimatePresence>
                      {errors.subject && (
                        <motion.span 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-[8px] font-cyber text-red-500 uppercase tracking-wider font-extrabold mt-1 block"
                        >
                          {errors.subject}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col space-y-1">
                    <label className="font-cyber text-[8px] tracking-widest text-deep-text/75 font-black uppercase">payload_message</label>
                    <textarea
                      rows={4}
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="TYPE SECURE ENCRYPTED PACKET PAYLOAD..."
                      className={`w-full bg-white/25 border rounded-xl px-4 py-3 font-sans text-xs sm:text-sm text-deep-text placeholder-deep-text/40 focus:outline-none focus:border-lavender-vibrant focus:shadow-[0_0_10px_rgba(165,148,249,0.25)] transition-all resize-none font-medium ${
                        errors.message ? "border-red-400 focus:border-red-500" : "border-lavender-medium/35"
                      }`}
                    />
                    <AnimatePresence>
                      {errors.message && (
                        <motion.span 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-[8px] font-cyber text-red-500 uppercase tracking-wider font-extrabold mt-1 block"
                        >
                          {errors.message}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Submit button / Success animations */}
                <div className="pt-4 mt-auto">
                  {success ? (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-full py-4 rounded-xl border border-green-500/40 bg-green-50 text-center font-cyber text-[10px] tracking-widest text-green-700 font-extrabold uppercase shadow-[0_0_15px_rgba(34,197,94,0.15)] flex items-center justify-center space-x-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-green-600" />
                      <span>✔ transmission packet delivered successfully</span>
                    </motion.div>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center space-x-2 font-cyber text-xs tracking-[0.2em] uppercase bg-gradient-to-r from-lavender-light via-lavender-medium to-lavender-vibrant text-deep-text py-4 rounded-xl font-extrabold hover:shadow-[0_0_20px_rgba(165,148,249,0.35)] border border-lavender-medium/30 transition-all cursor-pointer animate-[glow-pulse_3s_infinite_alternate]"
                    >
                      <Send className={`w-4 h-4 ${submitting ? "animate-ping" : ""}`} />
                      <span>{submitting ? "transmitting_packet..." : "initialize_transmission"}</span>
                    </button>
                  )}
                </div>
              </form>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
