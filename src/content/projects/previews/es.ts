import thumbnailWrenchTowers from "../../../assets/thumbnails/wrench-towers.webp";
import thumbnailAiShopHelper from "../../../assets/thumbnails/aishophelper.webp";
//import thumbnailParticles from "../../../assets/thumbnails/particles.webp";
import thumbnailWebPortfolio from "../../../assets/thumbnails/web-portfolio.webp";
import thumbnailContextChatbot from "../../../assets/thumbnails/contextchatbot.webp";
import thumbnailPokemonStatMaster from "../../../assets/thumbnails/pokemon-stat-master.webp";

import type { ProjectPreview } from "../../types";

export default [
  {
    title: "AI Shop Helper",
    slug: "aishophelper",
    thumbnail: thumbnailAiShopHelper,
    description: "SaaS automatización eCommerce con IA",
  },
  {
    title: "ContextChatbot",
    slug: "contextchatbot",
    thumbnail: thumbnailContextChatbot,
    description: "Chatbot IA embebible para cualquier web",
  },
  {
    title: "Portfolio Web",
    slug: "web-portfolio",
    thumbnail: thumbnailWebPortfolio,
    description: "Webs desarrolladas y optimizadas para SEO",
  },
  {
    title: "Pokémon Stat Master",
    slug: "pokemon-stat-master",
    thumbnail: thumbnailPokemonStatMaster,
    description: "Juego de trivia de stats Pokémon",
  },
  /**  {
    title: "WebGL Partículas",
    slug: "particles",
    thumbnail: thumbnailParticles,
    description: "Partículas 3D dinámicas",
  }, */
  {
    title: "Wrench Towers",
    slug: "wrench-towers",
    thumbnail: thumbnailWrenchTowers,
    description: "Juego tower defense pixel art",
  },
] as const satisfies ProjectPreview[];
