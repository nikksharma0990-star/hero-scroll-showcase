import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroCar from "@/assets/hero-car.png";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE = "WELCOME ITZFIZZ";
const METRICS = [
  { value: "80%", label: "Increase in engagement" },
  { value: "120%", label: "Faster performance" },
  { value: "50K+", label: "Active users" },
  { value: "99%", label: "Client satisfaction" },
];

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline letter stagger animation
      const letters = headlineRef.current?.querySelectorAll(".headline-letter");
      if (letters) {
        gsap.fromTo(
          letters,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.04,
            ease: "power3.out",
            delay: 0.3,
          }
        );
      }

      // Metrics scroll-based fade in/out with stagger
      const metrics = metricsRef.current?.querySelectorAll(".metric-card");
      if (metrics) {
        // Initial entrance animation
        const introDelay = 0.3 + (letters?.length || 0) * 0.04 + 0.3;
        gsap.fromTo(
          metrics,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            delay: introDelay,
          }
        );

        // Scroll-based fade out/in (staggered, reverses on scroll up)
        metrics.forEach((metric, i) => {
          gsap.fromTo(
            metric,
            { opacity: 1, y: 0 },
            {
              opacity: 0,
              y: -40,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: containerRef.current,
                start: () => `top+=${100 + i * 120}px top`,
                end: () => `top+=${250 + i * 120}px top`,
                scrub: true,
              },
            }
          );
        });
      }

      // Car scroll animation
      if (carRef.current) {
        gsap.fromTo(
          carRef.current,
          { x: "-60vw", scale: 0.8, rotation: -2 },
          {
            x: "60vw",
            scale: 1.1,
            rotation: 2,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "+=1500",
              scrub: 1.5,
              pin: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="section-scroll relative">
      <div className="min-h-screen flex flex-col items-center justify-center gap-12 px-4 overflow-hidden relative">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] animate-glow-pulse pointer-events-none" />

        {/* Headline */}
        <div ref={headlineRef} className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold font-display tracking-[0.3em] md:tracking-[0.5em] leading-tight">
            {HEADLINE.split("").map((char, i) => (
              <span key={i} className="headline-letter">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
          <p className="mt-4 text-muted-foreground text-sm md:text-base tracking-[0.2em] uppercase opacity-0 animate-[fade-in_0.8s_ease-out_1.5s_forwards]">
            Scroll to experience
          </p>
        </div>

        {/* Car */}
        <img
          ref={carRef}
          src={heroCar}
          alt="Luxury sports car"
          className="scroll-object w-[70vw] max-w-[900px] z-10 drop-shadow-[0_20px_60px_rgba(200,160,60,0.15)]"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        />

        {/* Metrics */}
        <div
          ref={metricsRef}
          className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mt-8"
        >
          {METRICS.map((m, i) => (
            <div key={i} className="metric-card">
              <span className="metric-value">{m.value}</span>
              <span className="metric-label">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-[fade-in_0.8s_ease-out_2s_forwards]">
          <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/40 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-primary animate-[bounce_2s_infinite]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
