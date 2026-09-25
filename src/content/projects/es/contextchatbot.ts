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
  facts: [
    { label: "Construido con", value: "n8n · OpenRouter" },
    { label: "Versiones", value: "Landing · Tienda con RAG" },
    { label: "Tipo", value: "Autoalojable · Embebible" },
    { label: "En producción", value: "3 webs" },
  ],
  description:
    "<p class='description-hook'>Dos chatbots, cualquier web.</p><p>ContextChatbot es un chatbot de IA autoalojable construido en n8n que genera una URL embebible. Intégrala en cualquier iframe o frontend y tendrás al instante un asistente entrenado con el conocimiento de esa web. Usa OpenRouter para garantizar una inferencia ultrarrápida con fallbacks automáticos entre múltiples proveedores y modelos, y tiene un alcance estrictamente definido para no salirse del tema. Existen dos versiones según lo que necesite el sitio.</p><p>La versión landing está pensada para webs corporativas y empresas con un catálogo de servicios acotado. Se entrena mediante un prompt personalizado y se encarga de resolver dudas, cualificar leads y guiar al visitante hacia el contacto.</p><p>La versión tienda es un RAG conectado a una base de datos con todos los productos del eCommerce. Además de responder, recomienda productos según lo que busca el cliente, se los muestra en un carrusel dentro del propio chat y los añade al carrito sin que tenga que salir de la conversación.</p>",
  components: [
    {
      type: "diagram",
      props: {
        name: "chat-demo",
        caption: "Simulación: la versión landing cualifica un lead y la versión tienda vende",
      },
    },
    {
      type: "features",
      props: {
        items: [
          {
            icon: "globe",
            title: "Una URL embebible",
            text: "n8n genera una URL que funciona en cualquier iframe o frontend, así que el mismo bot encaja en cualquier web.",
          },
          {
            icon: "message",
            title: "Versión landing",
            text: "Entrenada con un prompt propio para resolver dudas, cualificar leads y llevar al visitante al contacto.",
          },
          {
            icon: "database",
            title: "Versión tienda con RAG",
            text: "Busca en toda la base de datos de productos, muestra los que encajan en un carrusel y los añade al carrito.",
          },
          {
            icon: "route",
            title: "Fallbacks automáticos",
            text: "OpenRouter mantiene la inferencia rápida cambiando de modelo y proveedor cuando alguno falla.",
          },
          {
            icon: "shield",
            title: "Siempre en su tema",
            text: "Limitado al dominio de la web, así que nunca se desvía a conversaciones que no son del negocio.",
          },
          {
            icon: "box",
            title: "Autoalojable",
            text: "Corre en tu propia instancia de n8n, con los datos y los prompts bajo tu control.",
          },
        ],
      },
    },
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
