/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, Compass, Eye, Sparkles, CheckCircle2 } from "lucide-react";

export default function AmbientesViewer() {
  const [activeView, setActiveView] = useState<"todos" | "interno" | "externo">("todos");

  const views = [
    {
      id: "interno" as const,
      title: "Design & Estrutura Interna",
      subtitle: "Drenagem interna impecável",
      image: "https://res.cloudinary.com/daqldshyv/image/upload/v1781574530/dentro2_c7eeto.jpg",
      badge: "Ambiente Interno",
      icon: Home,
      bullets: [
        "Captação perfeita sob a telha, sem vazamentos",
        "Abraçadeiras de fixação extremamente robustas",
        "Vedação de alto padrão que previne mofo e umidade",
        "Tubos ocultos que mantêm a harmonia interna",
      ],
    },
    {
      id: "externo" as const,
      title: "Estética & Harmonia Externa",
      subtitle: "Acabamento pluvial premium de alta durabilidade",
      image: "https://res.cloudinary.com/daqldshyv/image/upload/v1781574530/fora2_qvjtaw.jpg",
      badge: "Ambiente Externo",
      icon: Compass,
      bullets: [
        "Pintura eletrostática premium que não descasca",
        "Design aerodinâmico que suporta fortes chuvas e ventos",
        "Pingadeiras perfeitamente seladas contra infiltração",
        "Valorização imediata da fachada da residência",
      ],
    },
  ];

  return (
    <div className="w-full space-y-8" id="ambientes-viewer-component">
      {/* Dynamic Animated Filter Switch */}
      <div className="flex justify-center items-center">
        <div className="inline-flex rounded-full bg-brand-bg border border-brand-border p-1.5 shadow-sm">
          <button
            onClick={() => setActiveView("todos")}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-bold rounded-full transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
              activeView === "todos"
                ? "bg-brand-dark text-white shadow-sm"
                : "text-brand-text-dark hover:text-brand-secondary"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Lado a Lado
          </button>
          <button
            onClick={() => setActiveView("interno")}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-bold rounded-full transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
              activeView === "interno"
                ? "bg-brand-dark text-white shadow-sm"
                : "text-brand-text-dark hover:text-brand-secondary"
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            Por Dentro
          </button>
          <button
            onClick={() => setActiveView("externo")}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-bold rounded-full transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
              activeView === "externo"
                ? "bg-brand-dark text-white shadow-sm"
                : "text-brand-text-dark hover:text-brand-secondary"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Por Fora
          </button>
        </div>
      </div>

      {/* Grid container with modern transitions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch pt-4 max-w-6xl mx-auto">
        <AnimatePresence mode="popLayout">
          {views
            .filter((v) => activeView === "todos" || activeView === v.id)
            .map((view, index) => {
              const Icon = view.icon;
              const isSingle = activeView !== "todos";

              return (
                <motion.div
                  key={view.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -15 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`flex flex-col bg-white border border-brand-border shadow-md overflow-hidden ${
                    isSingle ? "col-span-1 lg:col-span-2 max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-0" : ""
                  }`}
                >
                  {/* Image container */}
                  <div className={`relative group overflow-hidden aspect-[3/4] ${isSingle ? "md:col-span-7 w-full" : "w-full"}`}>
                    <img
                      src={view.image}
                      alt={view.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient overlay for modern vibes */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                    {/* Left corner elegant badge */}
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-brand-dark text-[10px] font-mono tracking-widest uppercase font-extrabold px-3 py-1.5 border border-brand-border">
                      {view.badge}
                    </span>

                    {/* Interactive indicator badge */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-brand-dark/85 backdrop-blur-md text-white text-[10px] uppercase font-mono px-2.5 py-1.5 rounded-full">
                      <Sparkles className="w-3 h-3 text-brand-light-blue" />
                      Instalação Própria
                    </div>
                  </div>

                  {/* Text Details Section */}
                  <div className={`p-6 md:p-8 flex flex-col justify-between bg-white text-left ${isSingle ? "md:col-span-5" : ""}`}>
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-brand-secondary font-mono tracking-wider text-[11px] uppercase font-bold">
                          <Icon className="w-4 h-4 text-brand-secondary" />
                          {view.subtitle}
                        </div>
                        <h3 className="text-xl md:text-2xl font-extrabold text-brand-dark tracking-tight">
                          {view.title}
                        </h3>
                      </div>

                      <div className="h-px bg-brand-border w-16" />

                      {/* Micro-tech lists to justify quality */}
                      <ul className="space-y-3 pt-2">
                        {view.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-brand-text-dark/90 leading-relaxed font-sans">
                            <CheckCircle2 className="w-4 h-4 text-brand-accent mt-0.5 shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6 mt-6 border-t border-brand-border/60 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-brand-text-dark/60 uppercase">
                        Sincronia Estética Perfeita
                      </span>
                      <a
                        href="#contato"
                        className="text-[11px] uppercase font-mono font-bold tracking-wider text-brand-secondary hover:text-brand-accent transition-colors flex items-center gap-1"
                      >
                        Agendar Visita Grátis →
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </AnimatePresence>
      </div>
    </div>
  );
}
