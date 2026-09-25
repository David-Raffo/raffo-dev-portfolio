import imgSlazenger from "../../../assets/images/projects/web-portfolio/slazenger.webp";
import imgNersa from "../../../assets/images/projects/web-portfolio/nersa.webp";
import imgIturri from "../../../assets/images/projects/web-portfolio/iturri.webp";
import imgFrame from "../../../assets/images/projects/web-portfolio/frame.webp";
import imgCoworking from "../../../assets/images/projects/web-portfolio/coworking.webp";
import imgMultiplicalia from "../../../assets/images/projects/web-portfolio/multiplicalia.webp";
import imgZarzuela from "../../../assets/images/projects/web-portfolio/restaurantezarzuela.webp";
import imgBonanza from "../../../assets/images/projects/web-portfolio/bonanza.webp";
import imgCiudadJardin from "../../../assets/images/projects/web-portfolio/ciudadjardin.webp";
import imgFontaclic from "../../../assets/images/projects/web-portfolio/fontaclic.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "Portfolio Web",
  theme: "light",
  tags: ["wordpress", "prestashop", "shopify", "javascript", "php", "seo"],
  videoBorder: true,
  sites: [
    { label: "Slazengerheritage", url: "https://www.slazengerheritage.com/" },
    { label: "Nersa SL", url: "https://nersasl.com/" },
    { label: "Iturri", url: "https://www.iturri.com/" },
    { label: "Frame Architects", url: "https://frame-architects.com/" },
    { label: "Sevilla Coworking", url: "https://sevillacoworking.info/" },
    { label: "Multiplicalia", url: "https://www.multiplicalia.com/" },
    { label: "Restaurante La Zarzuela", url: "https://www.restaurantelazarzuela.es/" },
    { label: "Bonanza Food", url: "https://bonanzafood.es/" },
    { label: "Grupo Ciudad Jardín", url: "https://www.grupociudadjardin.com/" },
    { label: "Fontaclic", url: "https://fontaclic.es/es/" },
  ],
  facts: [
    { label: "Tipo", value: "Trabajo para clientes" },
    { label: "Plataformas", value: "WordPress · PrestaShop · Shopify" },
    { label: "Foco", value: "Rendimiento y SEO técnico" },
    { label: "Alcance", value: "Maquetación, mantenimiento y plugins PHP" },
  ],
  description:
    "<p class='description-hook'>10 proyectos. Mil sectores. Un desarrollador.</p><p>Esta es una selección de webs en las que he trabajado: arquitectura, hostelería, alimentación, coworking, deportes, industrial y más, incluyendo proyectos multiidioma.</p><p>Desde sitios corporativos hasta tiendas eCommerce, he trabajado en WordPress, PrestaShop y Shopify ocupándome de la maquetación, el mantenimiento y plugins personalizados en PHP adaptados a cada cliente. En varias de ellas también apliqué SEO técnico: mejora de tiempos de carga, optimización de imágenes, corrección de Core Web Vitals e implementación de herramientas de IA para mejorar el posicionamiento orgánico.</p>",
  components: [
    {
      type: "stats",
      props: {
        items: [
          { value: 10, label: "webs entregadas" },
          { value: 3, label: "plataformas CMS" },
          { value: 6, suffix: "+", label: "sectores" },
        ],
      },
    },
    {
      type: "marquee",
      props: {
        items: [
          { src: imgSlazenger, label: "Slazengerheritage" },
          { src: imgNersa, label: "Nersa SL" },
          { src: imgIturri, label: "Iturri" },
          { src: imgFrame, label: "Frame Architects" },
          { src: imgCoworking, label: "Sevilla Coworking" },
          { src: imgMultiplicalia, label: "Multiplicalia" },
          { src: imgZarzuela, label: "Restaurante La Zarzuela" },
          { src: imgBonanza, label: "Bonanza Food" },
          { src: imgCiudadJardin, label: "Grupo Ciudad Jardín" },
          { src: imgFontaclic, label: "Fontaclic" },
        ],
      },
    },
    {
      type: "heading",
      props: {
        eyebrow: "Trabajo seleccionado",
        title: "Cada web, <em>una a una.</em>",
        text: "Pasa el ratón por una captura para ampliarla y ver los detalles.",
      },
    },
    {
      type: "media",
      props: { type: "image", src: imgSlazenger, alt: "Slazengerheritage", caption: "Slazengerheritage" },
    },
    { type: "media", props: { type: "image", src: imgNersa, alt: "Nersa SL", caption: "Nersa SL" } },
    { type: "media", props: { type: "image", src: imgIturri, alt: "Iturri", caption: "Iturri" } },
    { type: "media", props: { type: "image", src: imgFrame, alt: "Frame Architects", caption: "Frame Architects" } },
    {
      type: "media",
      props: { type: "image", src: imgCoworking, alt: "Sevilla Coworking", caption: "Sevilla Coworking" },
    },
    { type: "media", props: { type: "image", src: imgMultiplicalia, alt: "Multiplicalia", caption: "Multiplicalia" } },
    {
      type: "media",
      props: { type: "image", src: imgZarzuela, alt: "Restaurante La Zarzuela", caption: "Restaurante La Zarzuela" },
    },
    { type: "media", props: { type: "image", src: imgBonanza, alt: "Bonanza Food", caption: "Bonanza Food" } },
    {
      type: "media",
      props: { type: "image", src: imgCiudadJardin, alt: "Grupo Ciudad Jardín", caption: "Grupo Ciudad Jardín" },
    },
    { type: "media", props: { type: "image", src: imgFontaclic, alt: "Fontaclic", caption: "Fontaclic" } },
  ],
} as const satisfies ProjectContent;
