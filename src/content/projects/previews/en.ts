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
    description: "SaaS eCommerce automation with AI",
  },
  {
    title: "ContextChatbot",
    slug: "contextchatbot",
    thumbnail: thumbnailContextChatbot,
    description: "Embeddable AI chatbot for any website",
  },
  {
    title: "Web Portfolio",
    slug: "web-portfolio",
    thumbnail: thumbnailWebPortfolio,
    description: "Websites built & SEO optimized",
  },
  {
    title: "Pokémon Stat Master",
    slug: "pokemon-stat-master",
    thumbnail: thumbnailPokemonStatMaster,
    description: "Pokémon trivia ranking game",
  },
  /**  {
    title: "WebGL Particles",
    slug: "particles",
    thumbnail: thumbnailParticles,
    description: "Dynamic 3D particles",
  }, */
  {
    title: "Wrench Towers",
    slug: "wrench-towers",
    thumbnail: thumbnailWrenchTowers,
    description: "Pixel art tower defense game",
  },
] as const satisfies ProjectPreview[];
