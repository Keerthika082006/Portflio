import { useEffect, useRef } from "react";

export default function BackgroundEffects() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      document.documentElement.style.setProperty("--mouse-x", `${x}px`);
      document.documentElement.style.setProperty("--mouse-y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particleCount = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 25000));
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 1.5 + 0.5,
        speedY: -(Math.random() * 0.4 + 0.1),
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.7 + 0.1,
        fadeSpeed: Math.random() * 0.005 + 0.002,
        pulseDir: Math.random() > 0.5 ? 1 : -1,
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10 || p.x > canvas.width + 10) {
          p.speedX = -p.speedX;
        }

        p.opacity += p.fadeSpeed * p.pulseDir;
        if (p.opacity >= 0.8) {
          p.pulseDir = -1;
        } else if (p.opacity <= 0.1) {
          p.pulseDir = 1;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(165, 148, 249, ${p.opacity})`;
        ctx.shadowBlur = p.size * 4;
        ctx.shadowColor = "#A594F9";
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-lavender-bg select-none pointer-events-none">
      {/* 1. Base Mesh Gradient Overlay */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-95" />

      {/* 2. Drift Blurred Glowing Blobs */}
      <div className="absolute -top-[15%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-lavender-light/40 blur-[120px] mix-blend-multiply animate-float" />
      <div 
        className="absolute top-[40%] -right-[15%] w-[45vw] h-[45vw] rounded-full bg-lavender-medium/30 blur-[100px] mix-blend-multiply"
        style={{ animation: "float 8s ease-in-out infinite alternate" }}
      />
      <div 
        className="absolute -bottom-[10%] left-[20%] w-[35vw] h-[35vw] rounded-full bg-lavender-vibrant/20 blur-[90px] mix-blend-multiply"
        style={{ animation: "float 10s ease-in-out infinite alternate-reverse" }}
      />

      {/* 3. Global Mouse-Spotlight Glowing Effect */}
      <div 
        className="absolute inset-0 z-1 pointer-events-none transition-opacity duration-300 opacity-40 lg:opacity-50"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(165, 148, 249, 0.22), transparent 80%)`
        }}
      />

      {/* 4. Canvas Stars Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-2 opacity-80 mix-blend-multiply"
      />
    </div>
  );
}
