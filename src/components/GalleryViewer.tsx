/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { GALLERY } from "../constants";
import { GalleryItem } from "../types";

export default function GalleryViewer() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const buttonTimeoutRef = useRef<number | null>(null);
  const [gutterX, setGutterX] = useState(24);
  const [isPaused, setIsPaused] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const dragMovedRef = useRef(false);

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

  // Open Lightbox when user clicks on an image (only if not dragging)
  const handleImageClick = (item: GalleryItem) => {
    if (dragMovedRef.current) return;
    setSelectedItem(item);
    setIsPaused(true);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setIsPaused(true);
    dragMovedRef.current = false;
    dragStartXRef.current = e.pageX - scrollRef.current.offsetLeft;
    dragStartScrollLeftRef.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.scrollBehavior = "auto";
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - dragStartXRef.current) * 1.25;
    if (Math.abs(walk) > 5) {
      dragMovedRef.current = true;
    }
    scrollRef.current.scrollLeft = dragStartScrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = (leaveContainer: boolean) => {
    if (isDragging) {
      setIsDragging(false);
    }
    if (leaveContainer && !selectedItem) {
      setIsPaused(false);
    }
  };

  // Continuous auto-scrolling that pauses on hover, drag, lightbox, or after interaction
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    const speed = 35; // Pixels per second constant motion

    const animate = (time: number) => {
      if (!isPaused && !isButtonClicked && !isDragging && !selectedItem && container) {
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
  }, [isPaused, isButtonClicked, isDragging, selectedItem]);

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
      onMouseLeave={() => handleMouseUpOrLeave(true)}
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

      {/* Scrollable Track - Full bleed container with padding-left/right dynamic offsets & drag support */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={() => handleMouseUpOrLeave(false)}
        style={{ paddingLeft: `${gutterX}px`, paddingRight: `${gutterX}px`, scrollBehavior: "auto" }}
        className={`flex gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-2 select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        {GALLERY.map((item, index) => (
          <div
            key={item.id || index}
            onClick={() => handleImageClick(item)}
            title="Arraste para o lado ou clique para ampliar"
            className="w-[82vw] sm:w-[54vw] md:w-[42vw] lg:w-[32vw] xl:w-[28vw] shrink-0 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer aspect-[16/10] relative bg-slate-900/10"
          >
            <img
              src={item.url}
              alt={item.alt || `Obra Prumo Construções ${index + 1}`}
              loading="lazy"
              draggable={false}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05] pointer-events-none select-none"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>

      {/* Lightbox Modal for Zooming Portfolio Image */}
      {selectedItem && (
        <div
          onClick={() => {
            setSelectedItem(null);
            setIsPaused(false);
          }}
          className="fixed inset-0 z-50 bg-[#041e42]/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-black rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl cursor-default"
          >
            <div className="relative aspect-[16/10] w-full">
              <img
                src={selectedItem.url}
                alt={selectedItem.alt}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                type="button"
                onClick={() => {
                  setSelectedItem(null);
                  setIsPaused(false);
                }}
                className="absolute top-4 right-4 bg-[#041e42]/85 hover:bg-[#0893E6] text-white px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer shadow-lg backdrop-blur-xs"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
