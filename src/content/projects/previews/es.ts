import thumbnailAiShopHelper from "../../../assets/thumbnails/aishophelper.webp";
//import thumbnailParticles from "../../../assets/thumbnails/particles.webp";
import thumbnailWebPortfolio from "../../../assets/thumbnails/web-portfolio.webp";
import thumbnailContextChatbot from "../../../assets/thumbnails/contextchatbot.webp";
import thumbnailFreeRouter from "../../../assets/thumbnails/freerouter.webp";
import thumbnailAiWebApps from "../../../assets/thumbnails/ai-web-apps.webp";

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
    title: "FreeRouter",
    slug: "freerouter",
    thumbnail: thumbnailFreeRouter,
    description: "Router de inferencia sobre 24 proveedores gratis",
  },
  /**  {
    title: "WebGL Partículas",
    slug: "particles",
    thumbnail: thumbnailParticles,
    description: "Partículas 3D dinámicas",
  }, */
  {
    title: "Aplicaciones Web (IA)",
    slug: "ai-web-apps",
    thumbnail: thumbnailAiWebApps,
    description: "Apps pequeñas construidas con IA",
  },
  {
    title: "Portfolio Web",
    slug: "web-portfolio",
    thumbnail: thumbnailWebPortfolio,
    description: "Webs desarrolladas y optimizadas para SEO",
  },
] as const satisfies ProjectPreview[];
