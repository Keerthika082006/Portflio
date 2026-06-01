import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hidden, setHidden] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const canvasRef = useRef(null);
  const trailParticles = useRef([]);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 30, stiffness: 280, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  useEffect(() => {
    const checkDevice = () => {
      if (window.innerWidth < 1024) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      dotX.set(e.clientX - 3);
      dotY.set(e.clientY - 3);
      setHidden(false);

      if (canvasRef.current && Math.random() < 0.35) {
        trailParticles.current.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 3 + 1,
          color: Math.random() > 0.5 ? "#A594F9" : "#CDC1FF",
          alpha: 1,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
        });
      }
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    const addHoverListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, select, input, textarea, [role="button"], .interactive-glow'
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", () => setHovered(true));
        el.addEventListener("mouseleave", () => setHovered(false));
      });
    };

    const hoverInterval = setInterval(addHoverListeners, 1000);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      clearInterval(hoverInterval);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  useEffect(() => {
    if (hidden) return;

    let animFrame;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const updateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < trailParticles.current.length; i++) {
        const p = trailParticles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.02;

        if (p.alpha <= 0) {
          trailParticles.current.splice(i, 1);
          i--;
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }

      animFrame = requestAnimationFrame(updateParticles);
    };

    updateParticles();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animFrame);
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-9998 mix-blend-multiply opacity-80 overflow-hidden"
      />

      <motion.div
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        className="fixed w-8 h-8 rounded-full border pointer-events-none z-9999"
        animate={{
          scale: clicked ? 0.75 : hovered ? 1.6 : 1,
          borderColor: hovered ? "#1C1635" : "#A594F9",
          backgroundColor: hovered ? "rgba(205, 193, 255, 0.3)" : "rgba(229, 217, 242, 0.15)",
          boxShadow: hovered 
            ? "0 0 15px rgba(165, 148, 249, 0.5)" 
            : "0 0 10px rgba(165, 148, 249, 0.25)",
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
      />

      <motion.div
        style={{
          x: dotX,
          y: dotY,
        }}
        className="fixed w-1.5 h-1.5 rounded-full bg-deep-text pointer-events-none z-9999 shadow-[0_0_8px_rgba(28,22,53,0.3)]"
        animate={{
          scale: hovered ? 0.5 : 1,
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.1 }}
      />
    </>
  );
}
