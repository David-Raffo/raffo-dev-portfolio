import thumbnailAiShopHelper from "../../../assets/thumbnails/aishophelper.webp";
import thumbnailVideoTools from "../../../assets/thumbnails/videotools.webp";
import thumbnailFreeRouter from "../../../assets/thumbnails/freerouter.webp";
import thumbnailContextChatbot from "../../../assets/thumbnails/contextchatbot.webp";
import thumbnailAiWebApps from "../../../assets/thumbnails/ai-web-apps.webp";
import thumbnailWebPortfolio from "../../../assets/thumbnails/web-portfolio.webp";

import type { ProjectPreview } from "../../types";

export default [
  {
    title: "AI Shop Helper",
    slug: "aishophelper",
    thumbnail: thumbnailAiShopHelper,
    description: "SaaS automatización eCommerce con IA",
    category: "SaaS · Agentes IA",
  },
  {
    title: "Video Tools",
    slug: "videotools",
    thumbnail: thumbnailVideoTools,
    description: "Editor de vídeo web renderizado con FFmpeg",
    category: "Open source · Self-hosted",
  },
  {
    title: "FreeRouter",
    slug: "freerouter",
    thumbnail: thumbnailFreeRouter,
    description: "Router de inferencia sobre 24 proveedores gratis",
    category: "Open source · Infra LLM",
  },
  {
    title: "ContextChatbot",
    slug: "contextchatbot",
    thumbnail: thumbnailContextChatbot,
    description: "Chatbot IA embebible para cualquier web",
    category: "n8n · RAG",
  },
  {
    title: "Aplicaciones Web (IA)",
    slug: "ai-web-apps",
    thumbnail: thumbnailAiWebApps,
    description: "Cuatro apps pequeñas construidas con IA",
    category: "Proyectos propios · Online",
  },
  {
    title: "Portfolio Web",
    slug: "web-portfolio",
    thumbnail: thumbnailWebPortfolio,
    description: "Webs desarrolladas y optimizadas para SEO",
    category: "Clientes · SEO",
  },
] as const satisfies ProjectPreview[];
