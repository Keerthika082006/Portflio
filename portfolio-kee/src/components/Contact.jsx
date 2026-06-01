import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Phone, Mail, Terminal } from "lucide-react";

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

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true, margin: "-100px" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setFormState({ name: "", email: "", message: "" });
      
      setTimeout(() => setSuccess(false), 4000);
    }, 2000);
  };

  return (
    <section id="contact" className="relative min-h-screen py-24 px-6 md:px-12 xl:px-24 select-none overflow-hidden bg-transparent">
      {/* Background neon elements */}
      <div className="absolute top-[20%] left-[0%] w-[35vw] h-[35vw] rounded-full bg-lavender-light/20 blur-[95px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[0%] w-[30vw] h-[30vw] rounded-full bg-lavender-medium/15 blur-[85px] pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto w-full z-10 relative">
        {/* Module Header */}
        <div className="text-center mb-16">
          <span className="font-cyber text-[10px] tracking-[0.4em] uppercase text-lavender-vibrant font-extrabold block mb-2">
            SEC_ESTABLISHMENT // INITIATE_COMM
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-deep-text tracking-tight uppercase">
            Contact <span className="bg-gradient-to-r from-lavender-vibrant via-lavender-medium to-deep-text bg-clip-text text-transparent neon-text-vibrant">The Core</span>
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-lavender-light via-lavender-medium to-lavender-vibrant mx-auto mt-4" />
        </div>

        {/* Contact Split Columns */}
        <div 
          ref={formRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch"
        >
          
          {/* Left Column: Social links and terminal specs */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="glass p-6 rounded-2xl border-lavender-medium/25 shadow-xl h-full flex flex-col justify-between relative overflow-hidden"
            >
              {/* Retro HUD Corner decors */}
              <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-lavender-vibrant/60" />
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-lavender-vibrant/60" />

              <div className="space-y-6">
                <h3 className="font-cyber text-sm tracking-[0.2em] uppercase text-deep-text/75 mb-4 flex items-center space-x-2 font-bold">
                  <Terminal className="w-4 h-4 text-lavender-vibrant" />
                  <span>TRANSMISSION_INFO</span>
                </h3>

                <p className="font-sans text-xs sm:text-sm text-deep-text/85 leading-relaxed font-medium">
                  Have an exciting project role, core integration challenge, or just want to synchronize server configurations? Send a transmission packet, or link directly using any official media channel below.
                </p>

                {/* Info Blocks */}
                <div className="space-y-4 pt-4 border-t border-lavender-medium/20">
                  
                  {/* Phone */}
                  <div className="flex items-center space-x-4 group">
                    <div className="w-10 h-10 rounded-xl border border-lavender-medium/30 bg-lavender-light/20 flex items-center justify-center text-lavender-vibrant group-hover:text-deep-text group-hover:border-lavender-vibrant group-hover:shadow-[0_0_8px_#A594F9] transition-all">
                      <Phone className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <span className="font-cyber text-[8px] tracking-widest text-deep-text/60 font-extrabold uppercase block">PHONE_NET</span>
                      <a href="tel:+15550199284" className="font-cyber text-xs sm:text-sm text-deep-text hover:text-lavender-vibrant transition-colors font-extrabold">+1 (555) 019-9284</a>
                    </div>
                  </div>

                  {/* Mail */}
                  <div className="flex items-center space-x-4 group">
                    <div className="w-10 h-10 rounded-xl border border-lavender-medium/30 bg-lavender-light/20 flex items-center justify-center text-lavender-vibrant group-hover:text-deep-text group-hover:border-lavender-vibrant group-hover:shadow-[0_0_8px_#A594F9] transition-all">
                      <Mail className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <span className="font-cyber text-[8px] tracking-widest text-deep-text/60 font-extrabold uppercase block">EMAIL_NODE</span>
                      <a href="mailto:dkeerthika1808@gmail.com" className="font-cyber text-xs sm:text-sm text-deep-text hover:text-lavender-vibrant transition-colors font-extrabold font-bold">dkeerthika1808@gmail.com</a>
                    </div>
                  </div>

                </div>
              </div>

              {/* Bottom Social Badges */}
              <div className="grid grid-cols-2 gap-4 pt-8 border-t border-lavender-medium/20 mt-8">
                {/* LinkedIn Link */}
                <a
                  href="https://www.linkedin.com/in/keerthika0812/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 font-cyber text-[9px] tracking-widest uppercase border border-lavender-medium/35 bg-white/40 hover:border-lavender-vibrant hover:bg-white/85 text-deep-text py-3.5 px-4 rounded-xl transition-all interactive-glow font-bold"
                >
                  <LinkedinIcon className="w-4 h-4 text-lavender-vibrant" />
                  <span>LinkedIn</span>
                </a>

                {/* Github Link */}
                <a
                  href="https://github.com/Keerthika082006"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 font-cyber text-[9px] tracking-widest uppercase border border-lavender-medium/35 bg-white/40 hover:border-lavender-vibrant hover:bg-white/85 text-deep-text py-3.5 px-4 rounded-xl transition-all interactive-glow font-bold"
                >
                  <GithubIcon className="w-4 h-4 text-deep-text" />
                  <span>GitHub</span>
                </a>
              </div>

            </motion.div>
          </div>

          {/* Right Column: Cyber Form */}
          <div className="lg:col-span-7 w-full h-full flex">
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="glass p-6 sm:p-8 rounded-2xl border-lavender-medium/25 shadow-xl w-full text-left bg-white/35 relative flex flex-col justify-between"
            >
              <h3 className="font-cyber text-sm tracking-[0.2em] uppercase text-lavender-vibrant font-extrabold mb-6">
                &gt;&gt; INITIATE_ENCRYPTED_PACKET
              </h3>

              <form onSubmit={handleFormSubmit} className="space-y-5 flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Name field */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="font-cyber text-[9px] tracking-widest text-deep-text/75 font-bold uppercase">identification_name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      placeholder="ENTER CALL SIGN OR NAME..."
                      className="w-full bg-white/35 border border-lavender-medium/35 rounded-xl px-4 py-3.5 font-cyber text-xs text-deep-text placeholder-deep-text/45 focus:outline-none focus:border-lavender-vibrant focus:shadow-[0_0_10px_rgba(165,148,249,0.25)] transition-all uppercase font-medium"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="font-cyber text-[9px] tracking-widest text-deep-text/75 font-bold uppercase">transmission_node (email)</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      placeholder="ENTER RETURN ROUTE (EMAIL)..."
                      className="w-full bg-white/35 border border-lavender-medium/35 rounded-xl px-4 py-3.5 font-cyber text-xs text-deep-text placeholder-deep-text/45 focus:outline-none focus:border-lavender-vibrant focus:shadow-[0_0_10px_rgba(165,148,249,0.25)] transition-all uppercase font-medium"
                    />
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="font-cyber text-[9px] tracking-widest text-deep-text/75 font-bold uppercase">payload_description (message)</label>
                    <textarea
                      required
                      rows={4}
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      placeholder="TYPE SECURE ENCRYPTED PACKET PAYLOAD..."
                      className="w-full bg-white/35 border border-lavender-medium/35 rounded-xl px-4 py-3.5 font-sans text-xs sm:text-sm text-deep-text placeholder-deep-text/45 focus:outline-none focus:border-lavender-vibrant focus:shadow-[0_0_10px_rgba(165,148,249,0.25)] transition-all resize-none font-medium"
                    />
                  </div>
                </div>

                {/* Submit button / Success dialogs */}
                <div className="pt-4 mt-auto">
                  {success ? (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-full py-4 rounded-xl border border-lavender-vibrant bg-lavender-light/20 text-center font-cyber text-[10px] tracking-widest text-deep-text font-extrabold uppercase shadow-[0_0_15px_rgba(165,148,249,0.15)]"
                    >
                      ✔ transmission packet delivered successfully
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

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
