import img0 from "../../../assets/images/projects/ContextChatbot/0.gif";
import img1 from "../../../assets/images/projects/ContextChatbot/1.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "ContextChatbot",
  theme: "dark",
  tags: ["n8n", "openrouter", "postgresql", "api"],
  videoBorder: true,
  live: "https://www.multiplicalia.com/",
  description:
    "<p class='description-hook'>Un chatbot, cualquier web.</p><p>ContextChatbot es un chatbot de IA autoalojable construido en n8n que genera una URL embebible. Intégrala en cualquier iframe o frontend y tendrás al instante un asistente de chat completamente entrenado.</p><p>Cada bot se entrena con el conocimiento específico de la web objetivo, mediante un prompt personalizado o una base de datos según el tamaño del sitio. Usa OpenRouter para garantizar una inferencia ultrarrápida con fallbacks automáticos entre múltiples proveedores y modelos, y tiene un alcance estrictamente definido para no salirse del tema.</p>",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: img0,
        alt: "Chatbot en vivo",
        caption: "Chatbot en vivo",
        captionAlign: "left",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: img1,
        alt: "Configuración",
        caption: "Configuración",
      },
    },
  ],
} as const satisfies ProjectContent;
