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
    description: "SaaS eCommerce automation with AI",
  },
  {
    title: "ContextChatbot",
    slug: "contextchatbot",
    thumbnail: thumbnailContextChatbot,
    description: "Embeddable AI chatbot for any website",
  },
  {
    title: "FreeRouter",
    slug: "freerouter",
    thumbnail: thumbnailFreeRouter,
    description: "Inference router over 24 free providers",
  },
  /**  {
    title: "WebGL Particles",
    slug: "particles",
    thumbnail: thumbnailParticles,
    description: "Dynamic 3D particles",
  }, */
  {
    title: "AI Web Apps",
    slug: "ai-web-apps",
    thumbnail: thumbnailAiWebApps,
    description: "Small apps built with AI",
  },
  {
    title: "Web Portfolio",
    slug: "web-portfolio",
    thumbnail: thumbnailWebPortfolio,
    description: "Websites built & SEO optimized",
  },
] as const satisfies ProjectPreview[];
