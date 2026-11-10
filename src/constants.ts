/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConstructionService, GalleryItem, Testimonial } from "./types";

export const APP_DETAILS = {
  name: "Prumo Construções",
  phone: "(48) 99829-2637",
  phoneRaw: "5548998292637",
  address: "Atendimento em Toda Santa Catarina (SC)",
  addressShort: "Toda Santa Catarina - SC",
  hours: "Segunda a Sábado - 07:30 às 18:30",
  email: "prumoempreendimento@gmail.com",
  instagramUrl: "https://www.instagram.com/prumo_construcoes/",
  instagramHandle: "@prumo_construcoes",
  generalManager: "Ernani José",
  technicalResponsible: "Wellisson (@wellisson_762)",
  slogan: "Construindo com qualidade, realizando sonhos.",
  tagline: "Do alicerce ao acabamento com precisão e solidez.",
  subtagline: "Obras residenciais, comerciais e reformas em geral.",
  history: "A Prumo Construções atua no mercado da construção civil oferecendo gestão e execução de obras residenciais e comerciais com alto rigor técnico, responsabilidade e dedicação em cada etapa. Do alicerce ao acabamento, nossa trajetória é marcada pelo compromisso com prazos, estruturas sólidas e a satisfação plena de nossos clientes.",
  mission: "Executar obras com qualidade, segurança e responsabilidade, oferecendo soluções de engenharia e construção eficientes que atendam às necessidades de cada cliente.",
  vision: "Ser reconhecida como referência em serviços de construção civil pela excelência no prumo, confiança e profissionalismo.",
  values: [
    "Honestidade",
    "Responsabilidade",
    "Respeito",
    "Qualidade",
    "Segurança",
    "Comprometimento"
  ]
};

export const IMAGES = {
  logo: "/logo-prumo-clean.png",
  beforeImage: "/src/assets/images/obra_antes_mesma_casa_1794319720381.jpg",
  afterImage: "/src/assets/images/obra_depois_concluida_1794270936903.jpg",
  gallery: [
    "/src/assets/images/obra_residencial_alvenaria_1794270928634.jpg",
    "/src/assets/images/obra_fundacao_concretagem_1794270930307.jpg",
    "/src/assets/images/obra_fachada_moderna_1794270931585.jpg",
    "/src/assets/images/obra_reforma_interiores_1794270933063.jpg",
    "/src/assets/images/obra_estrutura_comercial_1794270934295.jpg",
    "/src/assets/images/obra_acabamento_gourmet_1794270934598.jpg",
    "/src/assets/images/obra_antes_mesma_casa_1794319720381.jpg",
    "/src/assets/images/obra_depois_concluida_1794270936903.jpg"
  ]
};

export const SERVICES: ConstructionService[] = [
  {
    id: "construcao",
    name: "Construção de Residências",
    description: "Execução completa de obras residenciais da fundação ao acabamento final, prezando pelo alto padrão estrutural e rigor técnico.",
    detailedDesc: "Edificação de casas e sobrados com acompanhamento rigoroso em todas as fases. Garantimos infraestruturas robustas, fundações calculadas e alvenaria impecável para transformar seu projeto em lar.",
    image: "/src/assets/images/obra_fachada_moderna_1794270931585.jpg"
  },
  {
    id: "reformas",
    name: "Reformas Residenciais e Comerciais",
    description: "Reformas residenciais, comerciais e prediais com otimização de ambientes e total renovação estrutural e estética.",
    detailedDesc: "Reestruturação completa de espaços, trocas de pisos e revestimentos, ampliações e modernização de fachadas. Executamos sua reforma com mínimo impacto na rotina e máximo aproveitamento de espaço.",
    image: "/src/assets/images/obra_depois_concluida_1794270936903.jpg"
  },
  {
    id: "alvenaria",
    name: "Alvenaria Estrutural e Concretagem",
    description: "Elevação de paredes, pilares, vigas, lajes e concretagem técnica de alto desempenho estrutural.",
    detailedDesc: "Construção de paredes estruturais e de vedação com travamento correto, alinhamento milimétrico no prumo e formas reforçadas para concretagem de lajes, vigas e baldrame.",
    image: "/src/assets/images/obra_residencial_alvenaria_1794270928634.jpg"
  },
  {
    id: "acabamentos",
    name: "Acabamentos, Pisos e Porcelanatos",
    description: "Assentamento de porcelanatos, cerâmicas, pastilhas e acabamentos finos de alta precisão.",
    detailedDesc: "Nivelamento a laser de pisos, contrapiso técnico, cortes em 45 graus, rejuntamento fino e aplicação de revestimentos de alto padrão em salas, cozinhas, fachadas e áreas gourmet.",
    image: "/src/assets/images/obra_reforma_interiores_1794270933063.jpg"
  },
  {
    id: "fundacoes",
    name: "Fundações e Estruturas Comerciais",
    description: "Execução de fundações profundas e rasas, armaduras de aço e estruturas para galpões e prédios comerciais.",
    detailedDesc: "Sapatas, blocos de coroamento, vigas baldrame e estruturas mistas com rigoroso controle de qualidade do concreto e ferragem para edificações seguras e duráveis.",
    image: "/src/assets/images/obra_fundacao_concretagem_1794270930307.jpg"
  },
  {
    id: "areas-gourmet",
    name: "Áreas Gourmet, Drywall e Pintura",
    description: "Na Prumo Construções, transformamos e valorizamos espaços com áreas de lazer completas, forros em drywall e pintura técnica.",
    detailedDesc: "Construção de espaços gourmet, churrasqueiras revestidas, forros e divisórias em drywall, emassamento e pintura acrílica premium com acabamento impecável.",
    image: "/src/assets/images/obra_acabamento_gourmet_1794270934598.jpg"
  }
];

export const DIFFERENTIALS = [
  {
    id: "d1",
    title: "Atuação do Planejamento ao Acabamento",
    desc: "Acompanhamento integral em todas as etapas da obra, garantindo total sinergia entre o projeto arquitetônico e a execução final."
  },
  {
    id: "d2",
    title: "Infraestruturas Robustas & Segurança",
    desc: "Métodos modernos de construção civil que garantem solidez estrutural, prumo exato, durabilidade e conformidade técnica."
  },
  {
    id: "d3",
    title: "Entrega Rigorosa no Prazo",
    desc: "Cronograma de execução respeitado com pontualidade, organização de canteiro e relatórios frequentes do avanço da obra."
  },
  {
    id: "d4",
    title: "Atendimento em Toda SC",
    desc: "Estrutura ágil para atender obras residenciais, comerciais e reformas em todas as regiões de Santa Catarina."
  },
  {
    id: "d5",
    title: "Orçamento Sem Compromisso",
    desc: "Avaliação técnica transparente, detalhada e sem custos para você planejar sua obra com clareza. Consultar taxa de deslocamento."
  },
  {
    id: "d6",
    title: "Satisfação Plena do Cliente",
    desc: "Compromisso ético, comunicação direta e dedicação absoluta para transformar seus projetos em realidade."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Carlos Eduardo M.",
    location: "Florianópolis, SC",
    role: "Construção Residencial",
    avatar: "/src/assets/images/cliente_carlos_eduardo_1794318144152.jpg",
    text: "Contratamos a Prumo Construções para a execução da nossa residência. Do alicerce ao acabamento, a equipe demonstrou extremo profissionalismo, pontualidade e transparência. O resultado superou nossas expectativas!",
    rating: 5,
    date: "Julho de 2026"
  },
  {
    id: "t2",
    name: "Mariana Alvez",
    location: "Joinville, SC",
    role: "Reforma Comercial",
    avatar: "/src/assets/images/cliente_mariana_alvez_1794318147343.jpg",
    text: "A Prumo Construções executou a reforma completa do nosso espaço comercial. Cumprimento rigoroso do prazo combinado e qualidade técnica impecável nos pisos de porcelanato e pintura. Recomendo fortemente!",
    rating: 5,
    date: "Junho de 2026"
  },
  {
    id: "t3",
    name: "Afonso Guimarães",
    location: "Itajaí, SC",
    role: "Fundação & Estrutura",
    avatar: "/src/assets/images/cliente_afonso_guimaraes_1794318145526.jpg",
    text: "Trabalho excepcional de fundação, alvenaria e concretagem. A equipe da Prumo Construções é muito organizada, limpa e dedicada. Ter a garantia de entrega no prazo nos deu total tranquilidade.",
    rating: 5,
    date: "Maio de 2026"
  },
  {
    id: "t4",
    name: "Fernanda Rocha",
    location: "Balneário Camboriú, SC",
    role: "Acabamentos & Interiores",
    avatar: "/src/assets/images/cliente_fernanda_rocha_1794318146863.jpg",
    text: "Ficamos encantados com o cuidado nos detalhes do porcelanato e forro de gesso. A equipe manteve a obra limpa todos os dias e cumpriu cada etapa exatamente como planejado no cronograma.",
    rating: 5,
    date: "Abril de 2026"
  },
  {
    id: "t5",
    name: "Ricardo Menezes",
    location: "Blumenau, SC",
    role: "Sobrado Alto Padrão",
    avatar: "/src/assets/images/cliente_ricardo_menezes_1794318149767.jpg",
    text: "Excelência técnica de verdade. A estrutura ficou impecável no prumo e o acompanhamento semanal nos trouxe total segurança durante toda a construção do nosso sobrado.",
    rating: 5,
    date: "Março de 2026"
  },
  {
    id: "t6",
    name: "Patrícia Lima",
    location: "São José, SC",
    role: "Área Gourmet & Reforma",
    avatar: "/src/assets/images/cliente_patricia_lima_1794318149329.jpg",
    text: "Construíram nossa área gourmet e reformaram toda a fachada da casa. Atendimento atencioso, orçamento claro sem surpresas e acabamento de primeiríssima qualidade!",
    rating: 5,
    date: "Fevereiro de 2026"
  }
];

const GALLERY_DESCRIPTIONS = [
  {
    title: "Alvenaria Estrutural & Lajes",
    category: "Obras Residenciais",
    desc: "Execução de alvenaria, pilares e formas de madeira com rigoroso alinhamento e segurança."
  },
  {
    title: "Fundações & Armaduras de Aço",
    category: "Infraestrutura & Concreto",
    desc: "Malha de aço e vigas baldrame dimensionadas para máxima solidez estrutural."
  },
  {
    title: "Residência Contemporânea Alto Padrão",
    category: "Obras Concluídas",
    desc: "Acabamento externo em branco e revestimentos nobres com guarda-corpo em vidro."
  },
  {
    title: "Assentamento de Porcelanato & Drywall",
    category: "Acabamentos Internos",
    desc: "Nivelamento a laser para grandes formatos e forro de gesso acartonado com iluminação."
  },
  {
    title: "Edificação Comercial & Estrutura Mista",
    category: "Obras Comerciais",
    desc: "Pilares de concreto armado e estrutura metálica de cobertura para grandes vãos."
  },
  {
    title: "Espaço Gourmet & Área Externa",
    category: "Reformas & Lazer",
    desc: "Bancadas em granito, revestimentos cerâmicos e iluminação arquitetônica integrada."
  },
  {
    title: "Levantamento Estrutural Residencial",
    category: "Alvenaria & Estrutura",
    desc: "Fase estrutural de sobrado residencial com vigamento e alvenaria de vedação."
  },
  {
    title: "Fachada Residencial Finalizada",
    category: "Obra Entregue",
    desc: "Entrega completa com pintura impermeabilizante, esquadrias e paisagismo."
  }
];

export const GALLERY: GalleryItem[] = IMAGES.gallery.map((url, idx) => ({
  id: `g${idx + 1}`,
  url,
  alt: `Projeto Prumo Construções - ${GALLERY_DESCRIPTIONS[idx]?.title || `Obra ${idx + 1}`}`,
  category: GALLERY_DESCRIPTIONS[idx]?.category || "Construção Civil",
  title: GALLERY_DESCRIPTIONS[idx]?.title || `Projeto ${idx + 1}`,
  desc: GALLERY_DESCRIPTIONS[idx]?.desc || "Execução técnica com alto padrão de qualidade, rigor estrutural e acabamento impecável."
}));
