/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Home, Wrench, Layers, Paintbrush, Building2, Users } from "lucide-react";
import { SERVICES, APP_DETAILS } from "../constants";

export default function ServicesShowcase() {
  const serviceIcons = [Home, Wrench, Layers, Building2, Paintbrush, Users];

  const handleServiceQuote = () => {
    const textMsg = encodeURIComponent(
      "Olá Prumo Construções! Gostaria de solicitar um orçamento sem compromisso para minha obra/reforma."
    );
    window.open(`https://api.whatsapp.com/send?phone=${APP_DETAILS.phoneRaw}&text=${textMsg}`, "_blank");
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-10 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service, idx) => {
          const IconComponent = serviceIcons[idx % serviceIcons.length];

          return (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="group rounded-2xl p-5 flex flex-col justify-start transition-all duration-200 shadow-sm hover:shadow-lg bg-white text-[#041e42] border border-[#cbe2ff] hover:border-[#0066cc]"
            >
              {/* Image box - Rounded Rectangular */}
              <div className="relative aspect-[16/10] shrink-0 overflow-hidden rounded-xl mb-5 border border-[#d4e6ff] bg-sky-50">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Content box */}
              <div className="flex-1 flex flex-col justify-start">
                <div className="space-y-3">
                  {/* Title and Icon - Fixed min-h so descriptions align across cards */}
                  <div className="flex items-center gap-3 min-h-[3.25rem]">
                    <span className="px-2.5 py-2 rounded-lg shrink-0 bg-[#eef6ff] text-[#0066cc]">
                      <IconComponent className="w-5 h-5" />
                    </span>
                    <h3 className="font-extrabold text-base md:text-lg tracking-tight leading-snug text-[#041e42]">
                      {service.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs leading-relaxed text-[#1e3a5f]">
                    {service.detailedDesc || service.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Standard Section CTA Button Below Cards */}
      <div className="flex justify-center pt-2">
        <button
          type="button"
          onClick={handleServiceQuote}
          className="bg-[#0066cc] text-white px-8 py-4 rounded-xl hover:bg-[#041e42] transition-all flex items-center justify-center active:translate-y-px cursor-pointer text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-[#0066cc]/25 whitespace-nowrap"
        >
          <span>Solicitar Orçamento</span>
        </button>
      </div>
    </div>
  );
}
