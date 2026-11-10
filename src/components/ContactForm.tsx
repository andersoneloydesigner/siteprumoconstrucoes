/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { APP_DETAILS } from "../constants";
import { MapPin, Clock, Mail, UserCheck, Instagram } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";

export default function ContactForm() {
  const handleWhatsApp = () => {
    const message = "Olá! Gostaria de solicitar um orçamento para obras/reformas com a Prumo Construções.";
    const url = `https://api.whatsapp.com/send?phone=${APP_DETAILS.phoneRaw}&text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Contact Details Card - Rounded Rectangular with High-Contrast Blue Shades */}
      <div id="contato-oficial-dados" className="border border-[#cbe2ff] bg-[#eef6ff] rounded-2xl p-6 md:p-10 flex flex-col justify-between shadow-md space-y-8">
        <div className="space-y-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#0066cc] font-extrabold">
              Atendimento Direto & Orçamentos · Prumo Construções
            </span>
            <h4 className="font-extrabold text-2xl text-[#041e42] mt-1">Canais de Atendimento</h4>
            <p className="text-xs text-[#1e3a5f] font-sans font-medium leading-relaxed">
              Entre em contato direto com os especialistas da Prumo Construções para agendar uma visita técnica ou solicitar seu orçamento sem compromisso em qualquer cidade de Santa Catarina.
            </p>
          </div>

          <div className="space-y-4 text-xs font-sans">
            <div className="flex gap-3.5 items-start bg-[#041e42] text-white p-4 rounded-xl border border-[#072b59] shadow-xs">
              <span className="px-3 py-2.5 rounded-lg bg-[#0893E6] text-white shrink-0">
                <WhatsAppIcon className="w-4 h-4 fill-white" />
              </span>
              <div>
                <span className="text-[10px] text-sky-200 block font-mono uppercase tracking-wider">
                  Contato Oficial (WhatsApp / Tel):
                </span>
                <span className="font-extrabold text-base text-white block mt-0.5 tabular-nums">
                  {APP_DETAILS.phone}
                </span>
                <span className="text-[10px] text-sky-300 block font-semibold mt-0.5">
                  Atendimento Rápido via WhatsApp
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex gap-3.5 items-start bg-white p-4 rounded-xl border border-[#cbe2ff]">
                <span className="px-3 py-2.5 rounded-lg bg-[#0066cc] text-white shrink-0">
                  <UserCheck className="w-4 h-4 text-white" />
                </span>
                <div>
                  <span className="text-[10px] text-[#1e3a5f]/80 block font-mono uppercase tracking-wider">
                    Administrador Geral:
                  </span>
                  <span className="font-bold text-xs text-[#041e42] block mt-0.5 leading-snug">
                    {APP_DETAILS.generalManager}
                  </span>
                </div>
              </div>

              <div className="flex gap-3.5 items-start bg-white p-4 rounded-xl border border-[#cbe2ff]">
                <span className="px-3 py-2.5 rounded-lg bg-[#0893E6] text-white shrink-0">
                  <UserCheck className="w-4 h-4 text-white" />
                </span>
                <div>
                  <span className="text-[10px] text-[#1e3a5f]/80 block font-mono uppercase tracking-wider">
                    Técnico Responsável:
                  </span>
                  <span className="font-bold text-xs text-[#041e42] block mt-0.5 leading-snug">
                    {APP_DETAILS.technicalResponsible}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`mailto:${APP_DETAILS.email}`}
                className="flex gap-3.5 items-start bg-white p-4 rounded-xl border border-[#cbe2ff] hover:border-[#0893E6] transition-colors"
              >
                <span className="px-3 py-2.5 rounded-lg bg-[#0893E6] text-white shrink-0">
                  <Mail className="w-4 h-4 text-white" />
                </span>
                <div className="min-w-0">
                  <span className="text-[10px] text-[#1e3a5f]/80 block font-mono uppercase tracking-wider">
                    E-mail Oficial:
                  </span>
                  <span className="font-bold text-xs text-[#041e42] block mt-0.5 truncate">
                    {APP_DETAILS.email}
                  </span>
                </div>
              </a>

              <a
                href={APP_DETAILS.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3.5 items-start bg-white p-4 rounded-xl border border-[#cbe2ff] hover:border-[#0893E6] transition-colors"
              >
                <span className="px-3 py-2.5 rounded-lg bg-[#0066cc] text-white shrink-0">
                  <Instagram className="w-4 h-4 text-white" />
                </span>
                <div className="min-w-0">
                  <span className="text-[10px] text-[#1e3a5f]/80 block font-mono uppercase tracking-wider">
                    Instagram Oficial:
                  </span>
                  <span className="font-bold text-xs text-[#041e42] block mt-0.5 truncate">
                    {APP_DETAILS.instagramHandle}
                  </span>
                </div>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex gap-3.5 items-start bg-white p-4 rounded-xl border border-[#cbe2ff]">
                <span className="px-3 py-2.5 rounded-lg bg-[#0066cc] text-white shrink-0">
                  <MapPin className="w-4 h-4 text-white" />
                </span>
                <div>
                  <span className="text-[10px] text-[#1e3a5f]/80 block font-mono uppercase tracking-wider">
                    Área de Cobertura:
                  </span>
                  <span className="font-bold text-xs text-[#041e42] block mt-0.5 leading-snug">
                    {APP_DETAILS.address}
                  </span>
                </div>
              </div>

              <div className="flex gap-3.5 items-start bg-white p-4 rounded-xl border border-[#cbe2ff]">
                <span className="px-3 py-2.5 rounded-lg bg-[#0893E6] text-white shrink-0">
                  <Clock className="w-4 h-4 text-white" />
                </span>
                <div>
                  <span className="text-[10px] text-[#1e3a5f]/80 block font-mono uppercase tracking-wider">
                    Horário de Atendimento:
                  </span>
                  <span className="font-bold text-xs text-[#041e42] block mt-0.5">
                    {APP_DETAILS.hours}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Direct Link to WhatsApp Button - No Icons, Uppercase Text */}
        <div className="pt-6 border-t border-[#cbe2ff] flex flex-col items-center">
          <button
            onClick={handleWhatsApp}
            className="w-full max-w-md bg-[#0066cc] text-white py-4 px-6 rounded-xl hover:bg-[#041e42] transition-all flex items-center justify-center font-extrabold shadow-lg shadow-[#0066cc]/25 cursor-pointer text-xs uppercase tracking-wider active:translate-y-px whitespace-nowrap"
          >
            <span>Solicitar Orçamento ({APP_DETAILS.phone})</span>
          </button>
          <span className="text-[11px] text-[#041e42] font-mono font-semibold mt-2.5 text-center lowercase max-w-sm">
            *orçamento sem custo • consultar taxa de deslocamento
          </span>
        </div>
      </div>
    </div>
  );
}
