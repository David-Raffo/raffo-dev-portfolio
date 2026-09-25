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
    description: "SaaS eCommerce automation with AI",
    category: "SaaS · AI agents",
  },
  {
    title: "Video Tools",
    slug: "videotools",
    thumbnail: thumbnailVideoTools,
    description: "Browser video editor rendered with FFmpeg",
    category: "Open source · Self-hosted",
  },
  {
    title: "FreeRouter",
    slug: "freerouter",
    thumbnail: thumbnailFreeRouter,
    description: "Inference router over 24 free providers",
    category: "Open source · LLM infra",
  },
  {
    title: "ContextChatbot",
    slug: "contextchatbot",
    thumbnail: thumbnailContextChatbot,
    description: "Embeddable AI chatbot for any website",
    category: "n8n · RAG",
  },
  {
    title: "AI Web Apps",
    slug: "ai-web-apps",
    thumbnail: thumbnailAiWebApps,
    description: "Four small apps built with AI",
    category: "Side projects · Live",
  },
  {
    title: "Web Portfolio",
    slug: "web-portfolio",
    thumbnail: thumbnailWebPortfolio,
    description: "Websites built & SEO optimized",
    category: "Client work · SEO",
  },
] as const satisfies ProjectPreview[];
