import thumbnail from "../../../assets/thumbnails/aishophelper.webp";
import img0 from "../../../assets/images/projects/aishophelper/0.webp";
import img1 from "../../../assets/images/projects/aishophelper/1.webp";
import img2 from "../../../assets/images/projects/aishophelper/2.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "AI Shop Helper",
  theme: "light",
  tags: ["python", "react", "n8n", "docker", "langgraph", "postgresql", "api"],
  videoBorder: true,
  live: "https://aishophelper.ai/",
  description:
    "<p class='description-hook'>¿Y si tu eCommerce se gestionara solo?</p><p>AI Shop Helper es una plataforma SaaS que automatiza el eCommerce y el marketing digital mediante agentes de IA. Genera y publica automáticamente artículos de blog optimizados para SEO, publicaciones en redes sociales, imágenes, vídeos y campañas publicitarias.</p><p>Construido con backend en Python, frontend en React, base de datos PostgreSQL y automatización IA con n8n, LangGraph y Make. Integrado con WordPress, WooCommerce y Shopify, y desplegado en AWS con Docker.</p>",
  components: [
    {
      type: "media",
      props: {
        type: "youtube",
        src: "U05kj9PCtXM",
        caption: "Demo",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: img0,
        alt: "Agentes de IA",
        caption: "Agentes",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: img1,
        alt: "Inicio de sesión",
        caption: "Inicio de sesión",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: img2,
        alt: "Redactor de blog",
        caption: "Redactor de blog",
      },
    },
  ],
} as const satisfies ProjectContent;
