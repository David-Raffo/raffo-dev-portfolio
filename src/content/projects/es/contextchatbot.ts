import video0 from "../../../assets/images/projects/ContextChatbot/0.mp4";
import img1 from "../../../assets/images/projects/ContextChatbot/1.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "ContextChatbot",
  theme: "dark",
  tags: ["n8n", "rag", "openrouter", "postgresql", "api"],
  videoBorder: true,
  sites: [
    { label: "Multiplicalia (landing)", url: "https://www.multiplicalia.com/" },
    { label: "AI Shop Helper (landing)", url: "https://aishophelper.ai/" },
    { label: "Instituto Europroject (tienda)", url: "https://institutoeuroproject.com/es/" },
  ],
  description:
    "<p class='description-hook'>Dos chatbots, cualquier web.</p><p>ContextChatbot es un chatbot de IA autoalojable construido en n8n que genera una URL embebible. Intégrala en cualquier iframe o frontend y tendrás al instante un asistente entrenado con el conocimiento de esa web. Usa OpenRouter para garantizar una inferencia ultrarrápida con fallbacks automáticos entre múltiples proveedores y modelos, y tiene un alcance estrictamente definido para no salirse del tema. Existen dos versiones según lo que necesite el sitio.</p><p>La versión landing está pensada para webs corporativas y empresas con un catálogo de servicios acotado. Se entrena mediante un prompt personalizado y se encarga de resolver dudas, cualificar leads y guiar al visitante hacia el contacto.</p><p>La versión tienda es un RAG conectado a una base de datos con todos los productos del eCommerce. Además de responder, recomienda productos según lo que busca el cliente, se los muestra en un carrusel dentro del propio chat y los añade al carrito sin que tenga que salir de la conversación.</p>",
  components: [
    {
      type: "media",
      props: {
        type: "video",
        src: video0,
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
