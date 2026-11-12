/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";

const SMOOTH_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Início da Obra",
  afterLabel = "Obra Concluída"
}: BeforeAfterSliderProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 34, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.82, ease: SMOOTH_EASE }}
      className="w-full max-w-6xl mx-auto space-y-3 will-change-transform"
    >
      {/* Rectangular Box with Rounded Borders */}
      <div className="border border-sky-100 bg-[#f5faff] p-5 md:p-8 shadow-md rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {/* LEFT SIDE: ANTES */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.78, delay: 0.08, ease: SMOOTH_EASE }}
            className="relative overflow-hidden aspect-[4/3] rounded-xl border border-sky-100 bg-white group shadow-xs"
          >
            <img
              src={beforeImage}
              alt="Antes da obra - Estrutura em execução"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Label Header */}
            <div className="absolute top-3 left-3 z-10">
              <span className="px-3.5 py-1.5 rounded-lg bg-white/95 text-[#072b59] text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest shadow-sm border border-sky-100">
                {beforeLabel}
              </span>
            </div>
          </motion.div>

          {/* RIGHT SIDE: DEPOIS (Blurred until clicked) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.78, delay: 0.16, ease: SMOOTH_EASE }}
            onClick={() => setIsRevealed(!isRevealed)}
            className="relative overflow-hidden aspect-[4/3] rounded-xl border border-sky-100 bg-white cursor-pointer group select-none shadow-xs"
            title="Clique para ver o resultado"
          >
            <img
              src={afterImage}
              alt="Depois da obra - Residência concluída"
              className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${
                isRevealed ? "blur-0 scale-100" : "blur-xl md:blur-2xl scale-110 brightness-95"
              }`}
              referrerPolicy="no-referrer"
            />

            {/* Label Header */}
            <div className="absolute top-3 left-3 z-10">
              <span className="px-3.5 py-1.5 rounded-lg bg-[#0893E6] text-white text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest shadow-sm">
                {afterLabel}
              </span>
            </div>

            {/* Click to Reveal Overlay (when blurred) */}
            {!isRevealed && (
              <div className="absolute inset-0 bg-white/45 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center z-20 transition-opacity duration-200">
                <div className="w-full sm:w-auto flex items-center justify-center bg-[#0893E6] text-white hover:bg-[#067ac2] px-6 py-4 sm:py-3 min-h-[54px] sm:min-h-0 rounded-2xl sm:rounded-xl shadow-lg transition-transform duration-150 group-hover:scale-105 active:scale-95">
                  <span className="text-xs font-extrabold uppercase tracking-wider font-sans whitespace-nowrap">
                    Clique para ver o resultado
                  </span>
                </div>
                <p className="text-[10px] md:text-[11px] text-[#072b59] font-mono font-semibold mt-2 hidden sm:block">
                  Toque na imagem para revelar a obra pronta
                </p>
              </div>
            )}

            {/* Re-blur option button when revealed */}
            {isRevealed && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsRevealed(false);
                }}
                className="absolute top-3 right-3 z-20 bg-white/95 hover:bg-white text-[#072b59] text-[10px] md:text-[11px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-lg border border-sky-200 flex items-center justify-center shadow-sm transition-colors cursor-pointer font-bold"
              >
                <span>Ocultar</span>
              </button>
            )}
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
