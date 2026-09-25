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
  facts: [
    { label: "Producto", value: "Plataforma SaaS" },
    { label: "Rol", value: "Full stack y automatización IA" },
    { label: "Integraciones", value: "WordPress · WooCommerce · Shopify" },
    { label: "Despliegue", value: "AWS · Docker" },
  ],
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
      type: "heading",
      props: {
        eyebrow: "Por dentro",
        title: "Un equipo de agentes <em>que nunca ficha la salida.</em>",
        text: "El catálogo de la tienda, la voz de marca y el calendario alimentan a un orquestador que reparte el trabajo entre agentes especializados, y cada uno publica directamente en la tienda.",
      },
    },
    {
      type: "diagram",
      props: {
        name: "agents-hub",
        caption: "Simulación: el contenido fluyendo desde los datos de la tienda a cada canal",
      },
    },
    {
      type: "features",
      props: {
        items: [
          {
            icon: "search",
            title: "Blog SEO en piloto automático",
            text: "Artículos investigados, redactados y optimizados para buscadores, y publicados en WordPress con sus imágenes.",
          },
          {
            icon: "message",
            title: "Redes sociales",
            text: "Publicaciones adaptadas a cada red y programadas desde el mismo calendario que el resto del contenido.",
          },
          {
            icon: "image",
            title: "Imágenes y vídeo",
            text: "Visuales generados para productos, publicaciones y campañas sin salir de la plataforma.",
          },
          {
            icon: "chart",
            title: "Campañas publicitarias",
            text: "Campañas redactadas a partir del catálogo para que cada producto tenga su propia promoción.",
          },
          {
            icon: "cart",
            title: "Integración con tiendas",
            text: "Conectado a WordPress, WooCommerce y Shopify para leer productos y publicar resultados.",
          },
          {
            icon: "layers",
            title: "Orquestado con n8n y LangGraph",
            text: "Flujos en n8n y Make, agentes en LangGraph, backend en Python y frontend en React sobre AWS.",
          },
        ],
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
