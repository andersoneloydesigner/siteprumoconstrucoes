/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { APP_DETAILS, SERVICES } from "../constants";

const SMOOTH_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ContactForm() {
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [city, setCity] = useState("");
  const [serviceType, setServiceType] = useState(SERVICES[0]?.name || "Construção de Residências");
  const [notes, setNotes] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 11);
    if (digits.length === 0) {
      setClientPhone("");
    } else if (digits.length <= 2) {
      setClientPhone(`(${digits}`);
    } else if (digits.length <= 6) {
      setClientPhone(`(${digits.slice(0, 2)}) ${digits.slice(2)}`);
    } else if (digits.length <= 10) {
      setClientPhone(`(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`);
    } else {
      setClientPhone(`(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`);
    }
  };

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    const lines = [
      "Olá Prumo Construções! Gostaria de solicitar um orçamento:",
      "",
      `*Nome:* ${clientName.trim() || "Não informado"}`,
      `*Telefone / WhatsApp:* ${clientPhone.trim() || "Não informado"}`,
      `*Cidade / Bairro (SC):* ${city.trim() || "Não informado"}`,
      `*Serviço Desejado:* ${serviceType}`,
      notes.trim() ? `*Detalhes da Obra:* ${notes.trim()}` : ""
    ].filter(Boolean);

    const message = lines.join("\n");
    const url = `https://api.whatsapp.com/send?phone=${APP_DETAILS.phoneRaw}&text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <motion.div
      id="contato-oficial-dados"
      initial={{ opacity: 0, y: 32, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.82, delay: 0.1, ease: SMOOTH_EASE }}
      className="w-full border border-[#cbe2ff] bg-[#eef6ff] rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-md will-change-transform"
    >
      <form onSubmit={handleSubmitWhatsApp} className="space-y-5 font-sans">
        <div className="space-y-1 border-b border-[#cbe2ff] pb-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#0066cc] font-extrabold">
            Orçamento Rápido via WhatsApp
          </span>
          <h3 className="font-extrabold text-xl md:text-2xl text-[#041e42]">
            Preencha os Dados da Sua Obra
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="clientName" className="block text-xs font-extrabold uppercase tracking-wider text-[#041e42]">
              Seu Nome *
            </label>
            <input
              id="clientName"
              type="text"
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Ex: João da Silva"
              className="w-full bg-white border border-[#cbe2ff] focus:border-[#0893E6] focus:outline-none rounded-xl px-4 py-3 text-xs md:text-sm text-[#041e42] placeholder:text-[#1e3a5f]/45 font-medium transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="clientPhone" className="block text-xs font-extrabold uppercase tracking-wider text-[#041e42]">
              Telefone / WhatsApp *
            </label>
            <input
              id="clientPhone"
              type="tel"
              required
              value={clientPhone}
              onChange={handlePhoneChange}
              placeholder="Ex: (48) 99999-9999"
              className="w-full bg-white border border-[#cbe2ff] focus:border-[#0893E6] focus:outline-none rounded-xl px-4 py-3 text-xs md:text-sm text-[#041e42] placeholder:text-[#1e3a5f]/45 font-medium transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="city" className="block text-xs font-extrabold uppercase tracking-wider text-[#041e42]">
              Cidade / Bairro (SC) *
            </label>
            <input
              id="city"
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Ex: Florianópolis - Centro"
              className="w-full bg-white border border-[#cbe2ff] focus:border-[#0893E6] focus:outline-none rounded-xl px-4 py-3 text-xs md:text-sm text-[#041e42] placeholder:text-[#1e3a5f]/45 font-medium transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="serviceType" className="block text-xs font-extrabold uppercase tracking-wider text-[#041e42]">
              Tipo de Serviço *
            </label>
            <select
              id="serviceType"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full bg-white border border-[#cbe2ff] focus:border-[#0893E6] focus:outline-none rounded-xl px-4 py-3 text-xs md:text-sm text-[#041e42] font-medium transition-colors cursor-pointer"
            >
              {SERVICES.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
              <option value="Outro / Orçamento Geral">Outro / Orçamento Geral</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="notes" className="block text-xs font-extrabold uppercase tracking-wider text-[#041e42]">
            Detalhes do Projeto ou Reforma
          </label>
          <textarea
            id="notes"
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Conte um pouco sobre o que você precisa construir ou reformar, metragem aproximada ou dúvidas..."
            className="w-full bg-white border border-[#cbe2ff] focus:border-[#0893E6] focus:outline-none rounded-xl px-4 py-3 text-xs md:text-sm text-[#041e42] placeholder:text-[#1e3a5f]/45 font-medium transition-colors resize-y"
          />
        </div>

        <div className="pt-2 flex flex-col items-center w-full">
          <button
            type="submit"
            className="w-full bg-[#0066cc] text-white py-5 sm:py-4 px-6 min-h-[58px] sm:min-h-0 rounded-2xl sm:rounded-xl hover:bg-[#041e42] transition-all flex items-center justify-center font-extrabold shadow-lg shadow-[#0066cc]/25 cursor-pointer text-xs uppercase tracking-wider active:translate-y-px whitespace-nowrap"
          >
            <span className="text-xs">Enviar Orçamento pelo WhatsApp</span>
          </button>
          <span className="text-[11px] text-[#041e42] font-mono font-semibold mt-2.5 text-center lowercase">
            *orçamento sem custo • consultar taxa de deslocamento
          </span>
        </div>
      </form>
    </motion.div>
  );
}
