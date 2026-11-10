import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, 
  ShieldCheck, 
  Info,
  Building2,
  HardHat,
  Ruler
} from "lucide-react";
import { APP_DETAILS } from "../constants";

interface OfficialPagesModalProps {
  isOpen: boolean;
  initialType: "abnt" | "terms" | "privacy" | null;
  onClose: () => void;
}

export default function OfficialPagesModal({ isOpen, initialType, onClose }: OfficialPagesModalProps) {
  const [activeTab, setActiveTab] = useState<"abnt" | "terms" | "privacy">("abnt");

  // Sync active tab with initial type when modal opens
  React.useEffect(() => {
    if (initialType) {
      setActiveTab(initialType);
    }
  }, [initialType]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 sm:p-10">
        
        {/* Backdrop overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#072b59]/60 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Outer Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.97, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 15 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="bg-white border border-sky-200 rounded-2xl text-brand-primary w-full max-w-5xl h-[85vh] flex flex-col relative z-10 shadow-2xl overflow-hidden font-sans"
        >
          {/* Header */}
          <div className="bg-[#0893E6] text-white px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <Compass className="w-5 h-5 text-white" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-mono tracking-widest text-white/90 font-bold">Portal Técnico & Legal</span>
                <span className="font-bold text-base tracking-tight font-sans uppercase">{APP_DETAILS.name} SC</span>
              </div>
            </div>
            
            <button 
              onClick={onClose}
              aria-label="Fechar Modal"
              className="py-1.5 px-3.5 rounded-lg bg-white text-[#0893E6] hover:bg-sky-50 transition-colors duration-150 flex items-center justify-center cursor-pointer font-mono text-[11px] uppercase tracking-wider font-bold"
            >
              <span>Fechar</span>
            </button>
          </div>

          {/* Navigation Bar / Tabs */}
          <div className="bg-[#f5faff] border-b border-sky-100 flex flex-wrap text-xs font-semibold uppercase tracking-wider p-2 gap-2">
            
            {/* Tab: Normas ABNT */}
            <button
              onClick={() => setActiveTab("abnt")}
              className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-center flex items-center justify-center uppercase transition-all cursor-pointer ${
                activeTab === "abnt" 
                  ? "bg-white text-[#072b59] font-extrabold shadow-xs border border-sky-200" 
                  : "text-brand-text-dark hover:bg-white/60"
              }`}
            >
              <span>Normas ABNT</span>
            </button>

            {/* Tab: Termos de Serviço */}
            <button
              onClick={() => setActiveTab("terms")}
              className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-center flex items-center justify-center uppercase transition-all cursor-pointer ${
                activeTab === "terms" 
                  ? "bg-white text-[#072b59] font-extrabold shadow-xs border border-sky-200" 
                  : "text-brand-text-dark hover:bg-white/60"
              }`}
            >
              <span>Termos de Serviço</span>
            </button>

            {/* Tab: Privacidade */}
            <button
              onClick={() => setActiveTab("privacy")}
              className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-center flex items-center justify-center uppercase transition-all cursor-pointer ${
                activeTab === "privacy" 
                  ? "bg-white text-[#072b59] font-extrabold shadow-xs border border-sky-200" 
                  : "text-brand-text-dark hover:bg-white/60"
              }`}
            >
              <span>Privacidade (LGPD)</span>
            </button>

          </div>

          {/* Modal Body Scroll Space */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-white">
            
            {/* CONTENT 1: NORMAS ABNT */}
            {activeTab === "abnt" && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="space-y-6"
              >
                <div className="border-b border-sky-100 pb-3">
                  <h3 className="text-lg font-extrabold uppercase text-[#072b59] tracking-tight">
                    Diretrizes Técnicas e Normas ABNT da Construção Civil
                  </h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    ABNT NBR 6118 · NBR 15575 · NBR 9575 · NBR 5410/8160 · Engenharia e Empreitada de Obras
                  </p>
                </div>

                <div className="bg-[#f5faff] border border-sky-100 rounded-xl p-4 text-xs leading-relaxed text-brand-text-dark">
                  <div className="flex items-start gap-2.5">
                    <Info className="w-5 h-5 text-[#0893E6] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-sans block text-[13px] mb-1 text-[#072b59] font-bold uppercase">Nota de Responsabilidade Técnica</strong>
                      A <strong>Prumo Construções</strong> atua em rigorosa conformidade com as normas técnicas da Associação Brasileira de Normas Técnicas (ABNT) e regulamentações do setor da construção civil. Cada etapa das obras residenciais, comerciais e reformas estruturais é planejada e executada visando estabilidade, durabilidade, estanqueidade e segurança do imóvel.
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#072b59] flex items-center gap-1.5 border-b border-sky-100 pb-1.5">
                      <Building2 className="w-4 h-4 text-[#0893E6]" />
                      1. Estruturas de Concreto e Alvenaria (ABNT NBR 6118 / NBR 16868)
                    </h4>
                    <p className="text-xs text-brand-text-dark leading-relaxed">
                      O dimensionamento e a execução de vigas, colunas, lajes, sapatas e blocos estruturais respeitam as taxas de armadura, cobrimentos mínimos e traço de concreto especificados para a classe de agressividade ambiental do local da obra. Isso assegura capacidade de carga sem patologias como fissuras ou deformações.
                    </p>

                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#072b59] flex items-center gap-1.5 border-b border-sky-100 pb-1.5 mt-4">
                      <Ruler className="w-4 h-4 text-[#0893E6]" />
                      2. Desempenho das Edificações Habitacionais (ABNT NBR 15575)
                    </h4>
                    <p className="text-xs text-brand-text-dark leading-relaxed">
                      Aplica-se às construções residenciais o atendimento aos níveis exigidos de desempenho estrutural, estanqueidade à água, isolamento térmico e acústico, segurança contra incêndios e facilidade de manutenção nas vedações verticais, coberturas e pisos.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#072b59] flex items-center gap-1.5 border-b border-sky-100 pb-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#0893E6]" />
                      3. Impermeabilização e Proteção contra Umidade (ABNT NBR 9575 / 9574)
                    </h4>
                    <p className="text-xs text-brand-text-dark leading-relaxed">
                      Tratamento técnico contra infiltrações em fundações, vigas baldrame, lajes de cobertura, sacadas, banheiros e áreas molhadas. Utilizam-se produtos certificados (mantas asfálticas, tintas impermeabilizantes e argamassas poliméricas) para garantir vida útil prolongada ao imóvel.
                    </p>

                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#072b59] flex items-center gap-1.5 border-b border-sky-100 pb-1.5 mt-4">
                      <HardHat className="w-4 h-4 text-[#0893E6]" />
                      4. Instalações Prediais e Segurança do Trabalho (NR-18 / NR-35 / NBR 5410)
                    </h4>
                    <p className="text-xs text-brand-text-dark leading-relaxed">
                      A execução dos pontos elétricos e hidrossanitários segue os parâmetros das normas NBR 5410 e NBR 8160. Toda a equipe opera com Equipamentos de Proteção Individual e Coletiva (EPIs/EPCs), alinhados às Normas Regulamentadoras NR-18 (Construção Civil) e NR-35 (Trabalho em Altura).
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-sky-100 text-center">
                  <p className="text-[11px] text-slate-500">
                    Prumo Construções: Obras executadas com rigor técnico, pontualidade no cronograma e materiais de procedência em toda Santa Catarina.
                  </p>
                </div>
              </motion.div>
            )}


            {/* CONTENT 2: TERMOS DE SERVIÇO */}
            {activeTab === "terms" && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="space-y-6"
              >
                <div className="border-b border-sky-100 pb-3">
                  <h3 className="text-lg font-extrabold uppercase text-[#072b59] tracking-tight">
                    Termos Gerais de Contratação e Execução de Obras
                  </h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    Atualizado em 2026 · Contrato de Empreitada e Prestação de Serviços de Engenharia
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4 text-xs text-brand-text-dark leading-relaxed">
                    <h4 className="font-bold text-[#072b59] uppercase text-[13px]">1. Orçamento e Vistorias no Imóvel</h4>
                    <p>
                      A elaboração da proposta de orçamento fornecida pela <strong>Prumo Construções</strong> é sem compromisso (para visitas técnicas e vistorias presenciais em obras, consultar taxa de deslocamento conforme a localização do município — se fechar negócio, o valor do deslocamento é integralmente descontado do valor total do serviço). A proposta possui validade comercial de <strong>15 a 30 dias corridos</strong> a partir da data de envio oficial.
                    </p>

                    <h4 className="font-bold text-[#072b59] uppercase text-[13px] mt-4">2. Do Contrato de Empreitada e Medições</h4>
                    <p>
                      Os serviços prestados são regidos por contrato formal de empreitada. Os pagamentos são estruturados em um cronograma físico-financeiro por etapas concluídas de obra (por exemplo: fundação, alvenaria, cobertura, instalações e acabamento), mediante vistoria e aprovação do contratante.
                    </p>

                    <h4 className="font-bold text-[#072b59] uppercase text-[13px] mt-4">3. Gestão de Canteiro e Acesso ao Imóvel</h4>
                    <p>
                      O contratante disponibilizará os acessos necessários, pontos de água e energia elétrica provisória no local da obra. A Prumo Construções compromete-se a manter o canteiro organizado, limpo e devidamente sinalizado durante toda a execução.
                    </p>
                  </div>

                  <div className="space-y-4 text-xs text-brand-text-dark leading-relaxed">
                    <h4 className="font-bold text-[#072b59] uppercase text-[13px]">4. Garantia Legal da Construção (5 Anos)</h4>
                    <p>
                      Nos termos do artigo 618 do Código Civil Brasileiro, a Prumo Construções oferece garantia de <strong>5 (cinco) anos</strong> para a solidez e segurança estrutural da edificação, incluindo fundações, estrutura de alvenaria/concreto e estanqueidade de lajes.
                    </p>
                    <span className="block bg-[#f5faff] p-3.5 rounded-xl border border-sky-100 text-[#072b59] font-sans leading-relaxed text-[11px]">
                      <strong>Exclusão de Garantia:</strong> A garantia não cobre danos decorrentes de mau uso, intervenções de terceiros não autorizadas na estrutura após a entrega da obra, desastres naturais imprevisíveis ou falta de manutenção preventiva recomendada pelo fabricante dos acabamentos.
                    </span>

                    <h4 className="font-bold text-[#072b59] uppercase text-[13px] mt-4">5. Aditivos e Alterações de Projeto</h4>
                    <p>
                      Quaisquer alterações de layout, adição de pontos ou modificação de revestimentos e materiais solicitadas pelo contratante no decorrer da obra serão registradas por termo aditivo, ajustando-se prazos e valores proporcionalmente antes de sua execução.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-sky-100 flex flex-col sm:flex-row items-center justify-between text-slate-600 text-[11px] gap-2">
                  <span>Dúvidas contratuais? Fale com a Prumo Construções: <strong>{APP_DETAILS.phone}</strong></span>
                  <button 
                    onClick={() => {
                      const msg = encodeURIComponent("Olá! Gostaria de esclarecer uma dúvida sobre os Termos de Serviço da Prumo Construções.");
                      window.open(`https://api.whatsapp.com/send?phone=${APP_DETAILS.phoneRaw}&text=${msg}`, "_blank");
                    }}
                    className="flex items-center justify-center bg-[#0893E6] text-white px-4 py-2 rounded-xl hover:bg-[#067ac2] transition-colors font-mono uppercase tracking-wider text-[10px] font-bold cursor-pointer"
                  >
                    <span>Solicitar Orçamento</span>
                  </button>
                </div>
              </motion.div>
            )}


            {/* CONTENT 3: PRIVACIDADE DE DADOS */}
            {activeTab === "privacy" && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="space-y-6"
              >
                <div className="border-b border-sky-100 pb-3">
                  <h3 className="text-lg font-extrabold uppercase text-[#072b59] tracking-tight">
                    Declaração de Privacidade e Proteção de Dados (LGPD)
                  </h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    Conformidade com a Lei Federal nº 13.709/2018 (Lei Geral de Proteção de Dados)
                  </p>
                </div>

                <div className="bg-[#f5faff] border border-sky-100 rounded-xl p-6 space-y-4 text-xs text-brand-text-dark leading-relaxed">
                  <p>
                    A <strong>Prumo Construções</strong> valoriza a confiança e zela pela privacidade e segurança dos dados pessoais de seus clientes e parceiros. 
                    Esta política explica como tratamos e protegemos as informações fornecidas voluntariamente em nossos formulários de contato e canais de atendimento comercial.
                  </p>

                  <h4 className="font-bold text-[#072b59] uppercase tracking-wide text-[12px] border-b border-sky-200/60 pb-1">1. Coleta e Finalidade dos Dados</h4>
                  <p>
                    Ao solicitar um orçamento ou agendamento de visita técnica para obra residencial ou comercial, coletamos:
                  </p>
                  <ul className="list-disc pl-5 mt-1 space-y-1 font-mono text-[11px] text-slate-600">
                    <li><strong>Nome Completo:</strong> Para identificação e atendimento personalizado;</li>
                    <li><strong>Cidade / Bairro do Imóvel (SC):</strong> Para agendamento e estimativa de deslocamento da equipe técnica;</li>
                    <li><strong>Telefone / WhatsApp:</strong> Canal oficial para envio de propostas comerciais e atualizações da obra;</li>
                    <li><strong>Tipo e Descrição da Obra:</strong> Informações do projeto para elaboração da planilha orçamentária preliminar.</li>
                  </ul>

                  <h4 className="font-bold text-[#072b59] uppercase tracking-wide text-[12px] border-b border-sky-200/60 pb-1 mt-4">2. Confidencialidade e Armazenamento Seguro</h4>
                  <p>
                    Adotamos o compromisso de <strong>não vender, alugar ou compartilhar</strong> suas informações pessoais com terceiros para fins publicitários. Os dados são utilizados restritamente pela equipe técnica e administrativa da Prumo Construções para a elaboração do contrato, orçamentos e acompanhamento dos serviços prestados.
                  </p>

                  <h4 className="font-bold text-[#072b59] uppercase tracking-wide text-[12px] border-b border-sky-200/60 pb-1 mt-4">3. Direitos do Titular dos Dados</h4>
                  <p>
                    Nos termos da LGPD, você possui o direito de:
                  </p>
                  <ol className="list-decimal pl-5 mt-1 space-y-1 font-sans text-brand-text-dark">
                    <li>Confirmar a existência do tratamento dos seus dados;</li>
                    <li>Acessar e corrigir dados incompletos ou desatualizados;</li>
                    <li>Solicitar a <strong>eliminação definitiva</strong> de seus dados pessoais dos nossos registros após a conclusão ou encerramento dos serviços.</li>
                  </ol>

                  <p className="pt-2 text-slate-500">
                    Para exercer qualquer um dos seus direitos de privacidade, entre em contato pelo e-mail oficial: <strong className="text-[#0893E6]">{APP_DETAILS.email}</strong> ou pelo telefone/WhatsApp <strong>{APP_DETAILS.phone}</strong>.
                  </p>
                </div>
              </motion.div>
            )}

          </div>

          {/* Modal Footer Brand */}
          <div className="bg-[#f5faff] border-t border-sky-100 px-6 py-3 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-500 font-mono gap-2">
            <span>PRUMO CONSTRUÇÕES · CONSTRUÇÃO CIVIL E REFORMAS EM SANTA CATARINA</span>
            <span className="text-[#072b59] font-bold">{APP_DETAILS.address}</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
