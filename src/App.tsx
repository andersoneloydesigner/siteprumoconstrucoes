/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "motion/react";
import { 
  Star, 
  Menu, 
  X, 
  Target,
  Eye,
  Heart,
  Check,
  BadgeCheck,
  Instagram
} from "lucide-react";
import { APP_DETAILS, IMAGES, TESTIMONIALS, DIFFERENTIALS } from "./constants";

// Subcomponents
import ServicesShowcase from "./components/ServicesShowcase";
import GalleryViewer from "./components/GalleryViewer";
import BeforeAfterSlider from "./components/BeforeAfterSlider";
import ContactForm from "./components/ContactForm";
import OfficialPagesModal from "./components/OfficialPagesModal";
import WhatsAppIcon from "./components/WhatsAppIcon";
import PlumbBob3DIntro from "./components/PlumbBob3DIntro";

const PIKA_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const sectionRevealProps = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12, margin: "0px 0px -50px 0px" },
  transition: { duration: 0.82, ease: PIKA_EASE },
};

const headerRevealProps = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2, margin: "0px 0px -40px 0px" },
  transition: { duration: 0.78, ease: PIKA_EASE },
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [testimonialPaused, setTestimonialPaused] = useState<boolean>(false);
  const [testimonialDragging, setTestimonialDragging] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("#inicio");
  const [showPlumbIntro, setShowPlumbIntro] = useState(true);
  const [heroRevealed, setHeroRevealed] = useState(false);
  const testimonialTrackRef = useRef<HTMLDivElement>(null);
  const testimonialGroupRef = useRef<HTMLDivElement>(null);
  const testimonialOffsetRef = useRef<number>(0);
  const testimonialDragStartXRef = useRef<number>(0);
  const testimonialDragStartOffsetRef = useRef<number>(0);

  // Official Pages Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"abnt" | "terms" | "privacy" | null>(null);

  // Shared smooth scroll state so wheel inertia and anchor link navigation stay 100% synchronized
  const smoothScrollRef = useRef<{
    targetY: number;
    currentY: number;
    rafId: number | null;
    isAnimating: boolean;
    lastTime: number;
    startSmoothLoop: () => void;
  }>({
    targetY: 0,
    currentY: 0,
    rafId: null,
    isAnimating: false,
    lastTime: 0,
    startSmoothLoop: () => {},
  });

  // Fluid, inertial Lenis-grade smooth scrolling for wheel & anchor navigation
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const state = smoothScrollRef.current;
    state.targetY = window.scrollY;
    state.currentY = window.scrollY;

    const updateScroll = (now: number) => {
      const dt = Math.min((now - state.lastTime) / 1000, 0.05);
      state.lastTime = now;
      const diff = state.targetY - state.currentY;

      if (Math.abs(diff) > 0.2) {
        // Silky-smooth exponential damping (lower factor = smoother, longer glide)
        const alpha = 1 - Math.exp(-10.5 * dt);
        state.currentY += diff * alpha;
        window.scrollTo(0, state.currentY);
        state.rafId = requestAnimationFrame(updateScroll);
      } else {
        state.currentY = state.targetY;
        window.scrollTo(0, state.targetY);
        state.isAnimating = false;
        state.rafId = null;
      }
    };

    state.startSmoothLoop = () => {
      state.isAnimating = true;
      if (!state.rafId) {
        state.lastTime = performance.now();
        state.rafId = requestAnimationFrame(updateScroll);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (isModalOpen) return;
      if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      // Allow native scrolling inside scrollable child elements (e.g. textareas)
      const target = e.target as HTMLElement | null;
      if (target && target.closest("textarea")) return;

      e.preventDefault();
      if (!state.isAnimating) {
        state.targetY = window.scrollY;
        state.currentY = window.scrollY;
      }

      // Normalize delta across pixel (trackpad) and line (mouse wheel) modes
      const rawDelta =
        e.deltaMode === 1
          ? e.deltaY * 38
          : e.deltaMode === 2
          ? e.deltaY * window.innerHeight * 0.85
          : e.deltaY;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      state.targetY = Math.max(0, Math.min(maxScroll, state.targetY + rawDelta));
      state.startSmoothLoop();
    };

    const handleNativeScroll = () => {
      if (!state.isAnimating) {
        state.targetY = window.scrollY;
        state.currentY = window.scrollY;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleNativeScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleNativeScroll);
      if (state.rafId) cancelAnimationFrame(state.rafId);
    };
  }, [isModalOpen]);

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveTab(id);
    const targetEl = document.querySelector(id);
    if (!targetEl) return;

    const headerOffset = 88;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const endY = Math.max(0, Math.min(maxScroll, targetEl.getBoundingClientRect().top + window.scrollY - headerOffset));

    const state = smoothScrollRef.current;
    if (!state.isAnimating) {
      state.currentY = window.scrollY;
    }
    state.targetY = endY;
    state.startSmoothLoop();
  }, []);

  // Continuous sideways motion for Testimonials carousel
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    const speed = 42; // Pixels per second sideways motion

    const animateTestimonials = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (!testimonialPaused && !testimonialDragging && testimonialTrackRef.current && testimonialGroupRef.current) {
        const groupWidth = testimonialGroupRef.current.offsetWidth;
        if (groupWidth > 0) {
          testimonialOffsetRef.current += speed * dt;
          if (testimonialOffsetRef.current >= groupWidth) {
            testimonialOffsetRef.current -= groupWidth;
          }
          testimonialTrackRef.current.style.transform = `translate3d(-${testimonialOffsetRef.current}px, 0, 0)`;
        }
      }

      animationFrameId = requestAnimationFrame(animateTestimonials);
    };

    animationFrameId = requestAnimationFrame(animateTestimonials);
    return () => cancelAnimationFrame(animationFrameId);
  }, [testimonialPaused, testimonialDragging]);

  // ScrollSpy to automatically highlight the active section in the floating header
  useEffect(() => {
    const sectionIds = ["#inicio", "#sobre", "#servicos", "#diferenciais", "#galeria", "#comparacao", "#contato"];
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.querySelector(sectionIds[i]);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPosition >= top) {
            setActiveTab(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  const handleTestimonialMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setTestimonialDragging(true);
    setTestimonialPaused(true);
    testimonialDragStartXRef.current = e.pageX;
    testimonialDragStartOffsetRef.current = testimonialOffsetRef.current;
  };

  const handleTestimonialMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!testimonialDragging || !testimonialTrackRef.current || !testimonialGroupRef.current) return;
    e.preventDefault();
    const groupWidth = testimonialGroupRef.current.offsetWidth;
    if (groupWidth <= 0) return;
    const deltaX = e.pageX - testimonialDragStartXRef.current;
    let nextOffset = (testimonialDragStartOffsetRef.current - deltaX) % groupWidth;
    if (nextOffset < 0) nextOffset += groupWidth;
    testimonialOffsetRef.current = nextOffset;
    testimonialTrackRef.current.style.transform = `translate3d(-${testimonialOffsetRef.current}px, 0, 0)`;
  };

  const handleTestimonialTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    setTestimonialDragging(true);
    setTestimonialPaused(true);
    testimonialDragStartXRef.current = e.touches[0].pageX;
    testimonialDragStartOffsetRef.current = testimonialOffsetRef.current;
  };

  const handleTestimonialTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!testimonialDragging || !testimonialTrackRef.current || !testimonialGroupRef.current || e.touches.length !== 1) return;
    const groupWidth = testimonialGroupRef.current.offsetWidth;
    if (groupWidth <= 0) return;
    const deltaX = e.touches[0].pageX - testimonialDragStartXRef.current;
    let nextOffset = (testimonialDragStartOffsetRef.current - deltaX) % groupWidth;
    if (nextOffset < 0) nextOffset += groupWidth;
    testimonialOffsetRef.current = nextOffset;
    testimonialTrackRef.current.style.transform = `translate3d(-${testimonialOffsetRef.current}px, 0, 0)`;
  };

  const handleTestimonialMouseUp = (leaveContainer: boolean) => {
    if (testimonialDragging) {
      setTestimonialDragging(false);
    }
    if (leaveContainer) {
      setTestimonialPaused(false);
    }
  };

  const openOfficialPage = (type: "abnt" | "terms" | "privacy") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleWhatsAppDirect = () => {
    const textMsg = encodeURIComponent(
      "Olá Prumo Construções! Gostaria de solicitar um orçamento sem compromisso para minha obra/reforma."
    );
    window.open(`https://api.whatsapp.com/send?phone=${APP_DETAILS.phoneRaw}&text=${textMsg}`, "_blank");
  };

  const navLinks = [
    { id: "#inicio", label: "Início" },
    { id: "#sobre", label: "Sobre Nós" },
    { id: "#servicos", label: "Serviços" },
    { id: "#diferenciais", label: "Diferenciais" },
    { id: "#galeria", label: "Portfólio" },
    { id: "#comparacao", label: "Antes & Depois" },
    { id: "#contato", label: "Contato" },
  ];

  return (
    <div className="min-h-screen bg-white text-[#041e42] flex flex-col selection:bg-[#0893E6] selection:text-white">
      
      {/* 3D Realistic Plumb Bob Intro Sequence Rendered In Front of ALL Elements (Hero & Header) */}
      {showPlumbIntro && (
        <PlumbBob3DIntro
          onStartExit={() => setHeroRevealed(true)}
          onComplete={() => {
            setHeroRevealed(true);
            setShowPlumbIntro(false);
          }}
        />
      )}

      {/* 1. Header/TopNavBar - Compact Centered Floating Solid Container */}
      <nav
        aria-label="Main Navigation"
        className="bg-[#0893E6] text-white fixed top-3 inset-x-0 mx-auto w-[calc(100%-2rem)] lg:w-max max-w-[calc(100%-2rem)] z-40 rounded-2xl shadow-lg"
      >
        <div className="flex justify-between items-center h-14 md:h-15 px-4 md:px-5 w-full gap-2.5 xl:gap-4">
          
          {/* Logo Brand Image */}
          <a href="#inicio" onClick={(e) => scrollToSection(e, "#inicio")} className="flex items-center group shrink-0">
            <img 
              alt="Prumo Construções Logo" 
              className="key-logo h-10 md:h-11 w-auto object-contain rounded-lg translate-y-1.5 transition-transform duration-150 group-hover:scale-[1.02]" 
              src={IMAGES.logo}
              referrerPolicy="no-referrer"
            />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center justify-center gap-0.5 xl:gap-1.5 text-[10px] xl:text-[11px] uppercase tracking-wider font-bold">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.id}
                onClick={(e) => scrollToSection(e, link.id)}
                className={`transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 px-2 xl:px-2.5 py-1.5 rounded-lg ${
                  activeTab === link.id
                    ? "bg-white/25 text-white font-extrabold shadow-2xs"
                    : "text-white hover:bg-white/15"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA Action - Compact, Proportional, Uppercase Text */}
          <button 
            onClick={handleWhatsAppDirect}
            className="hidden md:inline-flex items-center justify-center bg-[#041e42] text-white px-3.5 py-1.5 rounded-lg text-[10px] xl:text-[11px] tracking-wider uppercase font-extrabold hover:bg-[#072b59] transition-all duration-150 active:translate-y-px shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Solicitar Orçamento</span>
          </button>

          {/* Mobile Hamburger Trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            aria-label="Alternar Menu"
            className="lg:hidden text-white hover:bg-white/15 rounded-lg cursor-pointer transition-colors p-1.5"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0893E6] border-t border-white/20 rounded-b-2xl text-xs uppercase tracking-wider font-bold divide-y divide-white/15 py-3 px-5">
            {navLinks.map((link) => (
              <a 
                key={link.id}
                href={link.id} 
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  scrollToSection(e, link.id);
                }}
                className={`block py-3 px-3 rounded-lg transition-colors ${
                  activeTab === link.id ? "bg-white/15 text-white font-extrabold" : "text-white hover:bg-white/15"
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 pb-2 w-full">
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleWhatsAppDirect();
                }}
                className="w-full bg-[#041e42] text-white py-4 px-5 min-h-[54px] rounded-xl font-extrabold flex items-center justify-center hover:bg-[#072b59] transition-all text-sm uppercase tracking-wider cursor-pointer shadow-md"
              >
                <span>Solicitar Orçamento</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Container */}
      <main className="flex-1">

        {/* 2. Hero Section - Rounded Bottom, Subtle Grayscale Video & Bottom-Up #0893E6 Blue Light Glow */}
        <section id="inicio" className="bg-white border-b border-[#0893E6]/40 rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-[0_12px_35px_-10px_rgba(8,147,230,0.25)] relative overflow-hidden min-h-[680px] md:min-h-[770px] pt-24 md:pt-28 flex items-center justify-center">
          
          {/* Background Video in Black & White with Bottom-Up White & #0893E6 Blue Light Glow */}
          <div className="absolute inset-0 z-0 overflow-hidden rounded-b-[2.5rem] md:rounded-b-[4rem]">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover object-center opacity-20 scale-105 grayscale"
            >
              <source 
                src="https://clientesandersoneloy.b-cdn.net/Empreiteira%20Gon%C3%A7alves/hero-empreiteira.mp4" 
                type="video/mp4" 
              />
            </video>
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.85)_22%,rgba(255,255,255,0.38)_45%,rgba(255,255,255,0.15)_100%)]">
              <div
                className="absolute inset-0 bg-[radial-gradient(ellipse_76%_74%_at_50%_44%,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_64%,rgba(8,147,230,0.50)_85%,#0893E6_100%)] [mask-image:linear-gradient(to_bottom,transparent_0%,transparent_35%,black_62%,black_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,transparent_35%,black_62%,black_100%)]"
              >
                <div
                  className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none [mask-image:radial-gradient(ellipse_76%_74%_at_50%_44%,transparent_0%,transparent_62%,black_82%,black_100%)] [-webkit-mask-image:radial-gradient(ellipse_76%_74%_at_50%_44%,transparent_0%,transparent_62%,black_82%,black_100%)]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: "140px 140px"
                  }}
                />
              </div>
            </div>
          </div>

          <div
            className={`max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10 flex flex-col items-center justify-center text-center w-full ${
              heroRevealed ? "pointer-events-auto" : "pointer-events-none select-none"
            }`}
          >
            
            {/* Core Display Headline in High-Contrast Deep Navy & Cobalt Blue - Zoom Out Reveal */}
            <motion.h1 
              initial={{ opacity: 0, scale: 1.32, filter: "blur(6px)" }}
              animate={
                heroRevealed
                  ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                  : { opacity: 0, scale: 1.32, filter: "blur(6px)" }
              }
              transition={{ duration: 0.85, ease: PIKA_EASE }}
              className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#041e42] drop-shadow-[0_2px_10px_rgba(255,255,255,0.9)] max-w-5xl leading-tight md:leading-[1.1] [text-wrap:balance]"
            >
              Prumo Construções <br />
              <span className="text-[#0066cc]">{APP_DETAILS.slogan}</span>
            </motion.h1>
 
            {/* Subtitle in Deep Blue - Zoom Out Reveal */}
            <motion.p 
              initial={{ opacity: 0, scale: 1.24, filter: "blur(5px)" }}
              animate={
                heroRevealed
                  ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                  : { opacity: 0, scale: 1.24, filter: "blur(5px)" }
              }
              transition={{ duration: 0.85, delay: 0.1, ease: PIKA_EASE }}
              className="text-sm md:text-lg text-[#041e42] mt-5 max-w-3xl leading-relaxed font-sans font-semibold"
            >
              Especialistas em obras residenciais, comerciais, estruturas e reformas em Santa Catarina. Do alicerce ao acabamento fino com rigor no prumo e entrega no prazo!
            </motion.p>

            {/* Action CTAs - Contrasting Blue Shades, Full Width & Larger Touch Target on Mobile - Zoom Out Reveal */}
            <motion.div 
              initial={{ opacity: 0, scale: 1.18, filter: "blur(4px)" }}
              animate={
                heroRevealed
                  ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                  : { opacity: 0, scale: 1.18, filter: "blur(4px)" }
              }
              transition={{ duration: 0.85, delay: 0.18, ease: PIKA_EASE }}
              className="mt-7 flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:max-w-lg text-sm sm:text-xs uppercase font-bold"
            >
              <div className="w-full sm:w-auto flex flex-col items-center">
                <button 
                  onClick={handleWhatsAppDirect}
                  className="w-full sm:w-auto bg-[#0066cc] text-white px-8 py-5 sm:py-4 min-h-[58px] sm:min-h-0 rounded-2xl sm:rounded-xl hover:bg-[#041e42] transition-all flex items-center justify-center active:translate-y-px cursor-pointer font-extrabold uppercase tracking-wider shadow-lg shadow-[#0066cc]/30 whitespace-nowrap"
                >
                  <span>Solicitar Orçamento Grátis</span>
                </button>
                <span className="text-[11px] text-[#041e42] font-mono font-bold mt-2 lowercase normal-case tracking-normal text-center">
                  *consultar taxa de deslocamento
                </span>
              </div>
              <div className="w-full sm:w-auto flex flex-col items-center">
                <a 
                  href="#galeria"
                  onClick={(e) => scrollToSection(e, "#galeria")}
                  className="w-full sm:w-auto bg-white/95 text-[#041e42] border-2 border-[#0066cc] px-8 py-5 sm:py-4 min-h-[58px] sm:min-h-0 rounded-2xl sm:rounded-xl hover:bg-[#041e42] hover:text-white transition-all flex items-center justify-center cursor-pointer font-extrabold uppercase tracking-wider whitespace-nowrap shadow-md"
                >
                  Ver Projetos & Obras
                </a>
                <span className="hidden sm:block text-[11px] text-transparent select-none mt-2">
                  spacer
                </span>
              </div>
            </motion.div>

          </div>
        </section>

        {/* 3. Sobre Nós / História Section - Clean Text on White Background without Outer Boxes */}
        <section id="sobre" className="pt-10 pb-20 bg-white border-b border-sky-100">
          <div className="max-w-7xl mx-auto px-6 space-y-12">
            
            {/* Fast Stats Row - Smooth Staggered Reveal */}
            <div className="w-full max-w-5xl mx-auto py-2 grid grid-cols-2 md:grid-cols-4 gap-6 justify-center border-b border-sky-100 pb-10">
              {[
                { value: "100%", label: "Rigor Técnico & Prumo" },
                { value: "Toda SC", label: "Atendimento Regional" },
                { value: "No Prazo", label: "Entrega Garantida" },
                { value: "Grátis*", label: "Orçamento Sem Custo", sub: "consultar taxa de deslocamento" },
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.72, delay: idx * 0.08, ease: PIKA_EASE }}
                  className="text-center will-change-transform"
                >
                  <span className="block text-2xl md:text-3xl font-extrabold text-[#041e42] font-sans tracking-tight tabular-nums">
                    {stat.value}
                  </span>
                  <span className="block text-[10px] font-mono uppercase text-[#0066cc] font-bold tracking-widest mt-1">
                    {stat.label}
                  </span>
                  {stat.sub && (
                    <span className="block text-[9px] text-[#1e3a5f] font-mono mt-0.5 lowercase normal-case">
                      {stat.sub}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div {...headerRevealProps} className="max-w-3xl mx-auto text-center space-y-3">
              <p className="text-xs font-mono uppercase tracking-widest text-[#0066cc] font-extrabold">
                Identidade & Compromisso · Prumo Construções
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#041e42] tracking-tight [text-wrap:balance]">
                Engenharia, Solidez e Compromisso Ético em <span className="text-[#0893E6]">Cada Obra</span>
              </h2>
            </motion.div>

            {/* History Content - Unboxed Text on White Background */}
            <div className="max-w-4xl mx-auto space-y-10">
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.78, delay: 0.06, ease: PIKA_EASE }}
                className="font-sans text-sm md:text-base text-[#041e42] font-medium leading-relaxed text-center"
              >
                {APP_DETAILS.history}
              </motion.p>

              {/* Mission, Vision, Values Grid - Smooth Staggered Light Blue Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <motion.div
                  initial={{ opacity: 0, y: 28, scale: 0.985 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.75, delay: 0.05, ease: PIKA_EASE }}
                  className="bg-[#eef6ff] border border-[#cbe2ff] rounded-2xl p-6 space-y-2.5 will-change-transform"
                >
                  <div className="flex items-center gap-2 text-[#0066cc] font-mono text-xs font-extrabold uppercase">
                    <Target className="w-4 h-4" />
                    Missão
                  </div>
                  <p className="text-xs text-[#041e42] leading-relaxed font-medium">
                    {APP_DETAILS.mission}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 28, scale: 0.985 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.75, delay: 0.14, ease: PIKA_EASE }}
                  className="bg-[#eef6ff] border border-[#cbe2ff] rounded-2xl p-6 space-y-2.5 will-change-transform"
                >
                  <div className="flex items-center gap-2 text-[#0066cc] font-mono text-xs font-extrabold uppercase">
                    <Eye className="w-4 h-4" />
                    Visão
                  </div>
                  <p className="text-xs text-[#041e42] leading-relaxed font-medium">
                    {APP_DETAILS.vision}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 28, scale: 0.985 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.75, delay: 0.23, ease: PIKA_EASE }}
                  className="bg-[#eef6ff] border border-[#cbe2ff] rounded-2xl p-6 space-y-2.5 will-change-transform"
                >
                  <div className="flex items-center gap-2 text-[#0066cc] font-mono text-xs font-extrabold uppercase">
                    <Heart className="w-4 h-4" />
                    Valores
                  </div>
                  <div className="text-xs text-[#041e42] leading-relaxed font-semibold">
                    {APP_DETAILS.values.join(" · ")}
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </section>

        {/* 4. Serviços Section - Soft Ice-Blue Canvas with High-Contrast Blue Accents */}
        <section id="servicos" className="py-20 bg-[#f2f8ff] border-b border-[#d4e6ff]">
          <div className="max-w-7xl mx-auto px-6 space-y-12">
            
            {/* Header Title */}
            <motion.div {...headerRevealProps} className="text-center max-w-3xl mx-auto space-y-3">
              <p className="text-xs font-mono uppercase tracking-widest text-[#0066cc] font-extrabold">
                Especialidades em Construção Civil
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#041e42] tracking-tight [text-wrap:balance]">
                Soluções Completas para <span className="text-[#0066cc]">Sua Obra ou Reforma</span>
              </h2>
              <p className="text-xs md:text-sm text-[#1e3a5f] leading-relaxed max-w-2xl mx-auto font-medium">
                Mão de obra técnica altamente capacitada para erguer residências, executar reformas estruturais e garantir acabamentos finos do alicerce à entrega das chaves.
              </p>
            </motion.div>

            {/* Services Grid */}
            <ServicesShowcase />

          </div>
        </section>

        {/* 5. Diferenciais Section - Multi-Tone Blue Bento Contrast */}
        <section id="diferenciais" className="py-20 bg-white border-b border-sky-100 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative space-y-12">
            
            {/* Header Title */}
            <motion.div {...headerRevealProps} className="text-center max-w-3xl mx-auto space-y-3">
              <p className="text-xs font-mono uppercase tracking-widest text-[#0066cc] font-extrabold">
                Por Que Escolher a Nossa Equipe
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#041e42] tracking-tight [text-wrap:balance]">
                Diferenciais da <span className="text-[#0893E6]">Prumo Construções</span>
              </h2>
            </motion.div>

            {/* Differentials Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
              {DIFFERENTIALS.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 32, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.14, margin: "0px 0px -40px 0px" }}
                  transition={{ duration: 0.78, delay: (idx % 3) * 0.1, ease: PIKA_EASE }}
                  className="rounded-2xl p-7 text-left space-y-4 flex flex-col justify-between h-full transition-shadow duration-300 shadow-sm hover:shadow-lg bg-[#0893E6] text-white border border-[#067ac2] will-change-transform"
                >
                  <div className="space-y-3.5">
                    <div className="inline-flex items-center justify-center px-3.5 py-2 rounded-xl font-extrabold shadow-xs bg-[#041e42] text-white">
                      <Check className="w-5 h-5 stroke-[3]" />
                    </div>
                    <h3 className="text-base font-extrabold tracking-tight font-sans text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs font-sans leading-relaxed text-white/95">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* 6. Portfólio de Obras Section */}
        <section id="galeria" className="py-20 bg-[#f2f8ff] border-b border-[#d4e6ff] overflow-hidden">
          <div className="space-y-12">
            
            {/* Header Title */}
            <motion.div {...headerRevealProps} className="text-center max-w-3xl mx-auto px-6 space-y-3">
              <p className="text-xs font-mono uppercase tracking-widest text-[#0066cc] font-extrabold">
                Galeria de Engenharia & Arquitetura
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#041e42] tracking-tight [text-wrap:balance]">
                Portfólio de <span className="text-[#0066cc]">Projetos e Obras</span>
              </h2>
              <p className="text-xs md:text-sm text-[#1e3a5f] leading-relaxed font-medium">
                Confira o padrão construtivo da Prumo Construções em obras residenciais, fundações, estruturas de alvenaria e acabamentos de alto padrão.
              </p>
            </motion.div>

            <div className="w-full">
              <GalleryViewer />
            </div>

          </div>
        </section>

        {/* 7. Antes e Depois Section */}
        <section id="comparacao" className="py-20 bg-white border-b border-sky-100">
          <div className="max-w-7xl mx-auto px-6 space-y-12">
            
            {/* Header Title */}
            <motion.div {...headerRevealProps} className="text-center max-w-3xl mx-auto space-y-3">
              <p className="text-xs font-mono uppercase tracking-widest text-[#0066cc] font-extrabold">
                Transformação Completa
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#041e42] tracking-tight [text-wrap:balance]">
                Antes e Depois da <span className="text-[#0893E6]">Obra</span>
              </h2>
              <p className="text-xs md:text-sm text-[#1e3a5f] leading-relaxed font-medium">
                Compare a etapa estrutural em alvenaria e concreto com o resultado final de acabamento entregue pela Prumo Construções.
              </p>
            </motion.div>

            {/* Slider Component */}
            <div className="w-full max-w-6xl mx-auto">
              <BeforeAfterSlider
                beforeImage={IMAGES.beforeImage}
                afterImage={IMAGES.afterImage}
                beforeLabel="Fase Estrutural (Antes)"
                afterLabel="Obra Finalizada (Depois)"
              />
            </div>

          </div>
        </section>

        {/* 8. Depoimentos Section - #0893E6 Background & Continuous Moving Carousel */}
        <section className="py-20 bg-[#0893E6] border-b border-[#067ac2] overflow-hidden">
          <motion.div {...sectionRevealProps} className="space-y-12">
            
            {/* Header Title */}
            <motion.div {...headerRevealProps} className="text-center max-w-3xl mx-auto px-6 space-y-3">
              <p className="text-xs font-mono uppercase tracking-widest text-white/90 font-extrabold">
                Avaliações de Clientes
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
                Depoimentos de <span className="text-[#041e42]">Nossos Clientes</span>
              </h2>
              <p className="text-xs md:text-sm text-white/95 leading-relaxed font-medium max-w-2xl mx-auto">
                Confira o que dizem nossos clientes sobre a pontualidade, organização e rigor técnico da Prumo Construções em Santa Catarina.
              </p>
            </motion.div>

            {/* Continuously Moving Horizontal Cards Carousel */}
            <div 
              className={`relative w-full overflow-hidden py-2 select-none ${
                testimonialDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
              onMouseEnter={() => setTestimonialPaused(true)}
              onMouseLeave={() => handleTestimonialMouseUp(true)}
              onMouseDown={handleTestimonialMouseDown}
              onMouseMove={handleTestimonialMouseMove}
              onMouseUp={() => handleTestimonialMouseUp(false)}
              onTouchStart={handleTestimonialTouchStart}
              onTouchMove={handleTestimonialTouchMove}
              onTouchEnd={() => handleTestimonialMouseUp(true)}
            >
              <div
                ref={testimonialTrackRef}
                className="flex w-max will-change-transform"
              >
                {[0, 1].map((groupIndex) => (
                  <div
                    key={groupIndex}
                    ref={groupIndex === 0 ? testimonialGroupRef : undefined}
                    aria-hidden={groupIndex === 1 ? "true" : undefined}
                    className="flex gap-6 pr-6 shrink-0"
                  >
                    {TESTIMONIALS.map((t) => (
                      <div
                        key={`${groupIndex}-${t.id}`}
                        className="w-[310px] sm:w-[360px] md:w-[400px] shrink-0 bg-white border border-white/25 rounded-2xl p-6 md:p-7 flex flex-col justify-between space-y-5 shadow-xl"
                      >
                        <div className="space-y-4">
                          {/* Client Profile Header with Portrait Photo */}
                          <div className="flex items-center gap-3.5">
                            {t.avatar && (
                              <img
                                src={t.avatar}
                                alt={t.name}
                                loading="lazy"
                                draggable={false}
                                className="w-14 h-14 rounded-full object-cover border-2 border-[#0893E6] shrink-0 shadow-xs pointer-events-none select-none"
                                referrerPolicy="no-referrer"
                              />
                            )}
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <h3 className="text-sm md:text-base font-extrabold text-[#041e42] truncate">
                                  {t.name}
                                </h3>
                                <BadgeCheck
                                  aria-label="Verificado"
                                  className="w-4 h-4 md:w-5 md:h-5 fill-[#0893E6] text-white shrink-0"
                                />
                              </div>
                              <p className="text-xs font-mono text-[#0066cc] font-bold truncate">
                                {t.location}
                              </p>
                              {t.role && (
                                <span className="inline-block mt-1 text-[10px] font-mono uppercase tracking-wider bg-[#eef6ff] text-[#041e42] px-2.5 py-0.5 rounded-md font-bold">
                                  {t.role}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Rating Stars */}
                          <div className="flex items-center gap-1 text-[#0893E6]">
                            {Array.from({ length: t.rating }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current shrink-0" />
                            ))}
                          </div>

                          {/* Testimonial Quote */}
                          <p className="text-xs md:text-sm text-[#1e3a5f] italic font-sans leading-relaxed">
                            "{t.text}"
                          </p>
                        </div>

                        {/* Card Footer */}
                        <div className="flex justify-between items-center border-t border-[#d4e6ff] pt-3.5 text-[11px] font-mono text-[#041e42]">
                          <span className="font-bold">Prumo Construções</span>
                          <span className="text-[#0066cc] font-bold">{t.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </section>

        {/* 9. Contato Section - Left Titles & Right WhatsApp Form */}
        <section id="contato" className="py-20 bg-white border-b border-sky-100">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Side: Header Titles & Trust Highlights */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2, margin: "0px 0px -40px 0px" }}
              transition={{ duration: 0.82, ease: PIKA_EASE }}
              className="lg:col-span-5 text-left space-y-6 will-change-transform"
            >
              <div className="space-y-4">
                <p className="text-xs font-mono uppercase tracking-widest text-[#0066cc] font-extrabold">
                  Atendimento Rápido
                </p>
                <h2 className="text-2xl md:text-4xl font-extrabold text-[#041e42] tracking-tight leading-tight [text-wrap:balance]">
                  Solicite Seu Orçamento <span className="text-[#0893E6]">Sem Compromisso</span>
                </h2>
                <p className="text-xs md:text-sm text-[#1e3a5f] leading-relaxed font-medium">
                  Estamos prontos para planejar e executar seu projeto residencial ou comercial em qualquer município de Santa Catarina. Preencha os dados ao lado para enviar sua solicitação diretamente para o nosso WhatsApp.
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-sky-100">
                {[
                  {
                    title: "Garantia Estrutural de 5 Anos",
                    desc: "Execução técnica em conformidade com as normas ABNT e Código Civil.",
                  },
                  {
                    title: "Retorno Rápido via WhatsApp",
                    desc: "Atendimento direto com nossos responsáveis técnicos para tirar dúvidas e agendar vistorias.",
                  },
                  {
                    title: "Atendimento em Toda Santa Catarina",
                    desc: "Equipe própria e estruturada para obras residenciais, comerciais e reformas em qualquer cidade de SC.",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.72, delay: 0.1 + idx * 0.09, ease: PIKA_EASE }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-0.5 p-1.5 rounded-lg bg-[#eef6ff] text-[#0066cc] shrink-0">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </span>
                    <div>
                      <h4 className="text-xs font-extrabold text-[#041e42] uppercase tracking-wide">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#1e3a5f] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Side: Interactive WhatsApp Form */}
            <div className="lg:col-span-7 w-full">
              <ContactForm />
            </div>

          </div>
        </section>

      </main>

      {/* 10. Footer Section - Exact Logo Blue (#0893E6) and Borderless Logo */}
      <footer className="bg-[#0893E6] text-white py-12 font-sans text-xs overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.78, ease: PIKA_EASE }}
          className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
        >
          
          <div className="space-y-4">
            <div className="flex items-center w-fit">
              <img 
                alt="Prumo Construções Logo" 
                className="h-16 md:h-20 w-auto object-contain" 
                src={IMAGES.logo}
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="text-white/95 font-sans max-w-md leading-relaxed space-y-1.5">
              <p>{APP_DETAILS.address}</p>
              <p>
                <strong>Administrador Geral:</strong> {APP_DETAILS.generalManager}
              </p>
              <p>
                <strong>Técnico Responsável:</strong> {APP_DETAILS.technicalResponsible}
              </p>
              <p>
                <strong>Tel:</strong> {APP_DETAILS.phone}
              </p>
              <p>
                <strong>E-mail:</strong> {APP_DETAILS.email}
              </p>
              <div className="flex items-center gap-3 pt-1.5">
                <a
                  href={APP_DETAILS.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Prumo Construções"
                  className="inline-flex items-center justify-center p-2 rounded-lg bg-white/15 hover:bg-white/25 transition-colors text-white"
                >
                  <Instagram className="w-5 h-5 text-white shrink-0" />
                </a>
                <a
                  href={`https://api.whatsapp.com/send?phone=${APP_DETAILS.phoneRaw}&text=${encodeURIComponent("Olá Prumo Construções! Gostaria de solicitar um orçamento para minha obra.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Prumo Construções"
                  className="inline-flex items-center justify-center p-2 rounded-lg bg-white/15 hover:bg-white/25 transition-colors text-white"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-white shrink-0" />
                </a>
              </div>
            </div>

            <p className="text-[10px] text-white/85 font-mono pt-2">
              © {new Date().getFullYear()} Prumo Construções. Todos os direitos reservados. 
              <br />
              Construção Civil, Obras e Reformas Residenciais e Comerciais em Santa Catarina.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 md:gap-12 text-white font-mono text-[10px] uppercase tracking-wider">
            <div className="space-y-2">
              <h5 className="font-extrabold text-[#041e42] bg-white/95 px-2.5 py-1 rounded-md inline-block tracking-widest text-[11px]">Nossos Serviços</h5>
              <a href="#servicos" onClick={(e) => scrollToSection(e, "#servicos")} className="block hover:text-white hover:underline transition-colors">Construção Residencial</a>
              <a href="#servicos" onClick={(e) => scrollToSection(e, "#servicos")} className="block hover:text-white hover:underline transition-colors">Reformas em Geral</a>
              <a href="#servicos" onClick={(e) => scrollToSection(e, "#servicos")} className="block hover:text-white hover:underline transition-colors">Alvenaria & Concretagem</a>
              <a href="#servicos" onClick={(e) => scrollToSection(e, "#servicos")} className="block hover:text-white hover:underline transition-colors">Acabamentos & Revestimentos</a>
            </div>
            
            <div className="space-y-2 text-left">
              <h5 className="font-extrabold text-[#041e42] bg-white/95 px-2.5 py-1 rounded-md inline-block tracking-widest text-[11px]">Links Oficiais</h5>
              <button 
                onClick={() => openOfficialPage("abnt")} 
                className="block text-left hover:text-white hover:underline transition-colors cursor-pointer w-full uppercase"
              >
                Normas ABNT
              </button>
              <button 
                onClick={() => openOfficialPage("terms")} 
                className="block text-left hover:text-white hover:underline transition-colors cursor-pointer w-full uppercase"
              >
                Termos de Serviço
              </button>
              <button 
                onClick={() => openOfficialPage("privacy")} 
                className="block text-left hover:text-white hover:underline transition-colors cursor-pointer w-full uppercase"
              >
                Privacidade de Dados
              </button>
            </div>
          </div>

        </motion.div>
      </footer>

      {/* Official Pages Modal Portal */}
      <OfficialPagesModal 
        isOpen={isModalOpen} 
        initialType={modalType} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Floating WhatsApp Action Button */}
      <a
        href={`https://api.whatsapp.com/send?phone=${APP_DETAILS.phoneRaw}&text=${encodeURIComponent("Olá Prumo Construções! Gostaria de solicitar um orçamento para minha obra.")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Atendimento via WhatsApp"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1ebe5d] text-white p-4 rounded-full shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center border-2 border-white group"
      >
        <WhatsAppIcon className="w-7 h-7 md:w-8 md:h-8 fill-white" />
      </a>

    </div>
  );
}
