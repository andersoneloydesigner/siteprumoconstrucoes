/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { GALLERY } from "../constants";

export default function GalleryViewer() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const buttonTimeoutRef = useRef<number | null>(null);
  const [gutterX, setGutterX] = useState(24);
  const [isPaused, setIsPaused] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  // Auto-calculated custom gutter to align first image with container margins
  useEffect(() => {
    const calcGutter = () => {
      if (window.innerWidth > 1280) {
        setGutterX((window.innerWidth - 1280) / 2 + 24);
      } else {
        setGutterX(24);
      }
    };
    calcGutter();
    window.addEventListener("resize", calcGutter);
    return () => {
      window.removeEventListener("resize", calcGutter);
      if (buttonTimeoutRef.current) {
        window.clearTimeout(buttonTimeoutRef.current);
      }
    };
  }, []);

  // Toggle pause when user clicks on an image
  const handleImageClick = () => {
    setIsPaused((prev) => !prev);
  };

  // Continuous auto-scrolling that pauses on hover or after interaction
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    const speed = 35; // Pixels per second constant motion

    const animate = (time: number) => {
      if (!isPaused && !isButtonClicked && container) {
        const delta = (time - lastTime) / 1000;
        lastTime = time;

        const maxScroll = container.scrollWidth - container.clientWidth;
        if (maxScroll <= 0) {
          animationFrameId = requestAnimationFrame(animate);
          return;
        }

        let nextScroll = container.scrollLeft + speed * delta;
        
        // Endless loop back to beginning
        if (nextScroll >= maxScroll - 1) {
          nextScroll = 0;
        }
        container.scrollLeft = nextScroll;
      } else {
        lastTime = time;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, isButtonClicked]);

  const slide = (direction: "left" | "right") => {
    if (scrollRef.current) {
      // Pause auto-scrolling for 6 seconds when a control button is clicked
      setIsButtonClicked(true);
      if (buttonTimeoutRef.current) {
        window.clearTimeout(buttonTimeoutRef.current);
      }
      buttonTimeoutRef.current = window.setTimeout(() => {
        setIsButtonClicked(false);
      }, 6000);

      const { clientWidth, scrollLeft, scrollWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const step = clientWidth * 0.70; // shift 70% of view
      
      let targetScroll = scrollLeft + step * (direction === "left" ? -1 : 1);
      
      // Loop over bounds if we can't scroll further
      if (direction === "left" && scrollLeft <= 15) {
        targetScroll = maxScroll;
      } else if (direction === "right" && scrollLeft >= maxScroll - 15) {
        targetScroll = 0;
      }
      
      // Temporarily use smooth scroll for buttons
      scrollRef.current.style.scrollBehavior = "smooth";
      scrollRef.current.scrollTo({ left: targetScroll });
      
      // Reset scroll behavior to auto after animation finishes to keep auto-scroll smooth
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.style.scrollBehavior = "auto";
        }
      }, 450);
    }
  };

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Left Overlay Navigation Button (Low Opacity, Arrow Icon Only) */}
      <button
        type="button"
        onClick={() => slide("left")}
        aria-label="Projetos anteriores"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-xl border border-white/30 bg-[#041e42]/75 text-white opacity-35 hover:opacity-95 hover:bg-[#0893E6] transition-all duration-200 cursor-pointer shadow-md backdrop-blur-xs flex items-center justify-center"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Right Overlay Navigation Button (Low Opacity, Arrow Icon Only) */}
      <button
        type="button"
        onClick={() => slide("right")}
        aria-label="Mais projetos"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-xl border border-white/30 bg-[#041e42]/75 text-white opacity-35 hover:opacity-95 hover:bg-[#0893E6] transition-all duration-200 cursor-pointer shadow-md backdrop-blur-xs flex items-center justify-center"
      >
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* Scrollable Track - Full bleed container with padding-left/right dynamic offsets */}
      <div
        ref={scrollRef}
        style={{ paddingLeft: `${gutterX}px`, paddingRight: `${gutterX}px`, scrollBehavior: "auto" }}
        className="flex gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-2 select-none"
      >
        {GALLERY.map((item, index) => (
          <div
            key={item.id || index}
            onClick={handleImageClick}
            title={isPaused ? "Clique para continuar o carrossel" : "Clique para pausar o carrossel"}
            className="w-[82vw] sm:w-[54vw] md:w-[42vw] lg:w-[32vw] xl:w-[28vw] shrink-0 snap-start border border-sky-100 rounded-2xl bg-white p-3 transition-all duration-200 hover:border-[#0893E6] hover:shadow-md overflow-hidden group shadow-xs flex flex-col justify-between cursor-pointer"
          >
            {/* Image Frame - Rectangular with Rounded Borders */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-sky-50">
              <img
                src={item.url}
                alt={item.alt || `Obra Prumo Construções ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Caption Footer */}
            <div className="pt-4 px-2 pb-2 bg-white space-y-1">
              <div className="text-[10px] font-mono text-[#0893E6] uppercase tracking-wider font-bold">
                {item.category} · Prumo Construções
              </div>
              <h3 className="text-sm font-extrabold text-[#072b59] tracking-tight">
                {item.title}
              </h3>
              <p className="text-xs text-brand-text-dark leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
