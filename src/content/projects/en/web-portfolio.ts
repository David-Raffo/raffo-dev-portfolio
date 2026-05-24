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
  title: "Web Portfolio",
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
  description:
    "<p class='description-hook'>10 projects. Countless industries. One developer.</p><p>This is a selection of websites I have worked on: architecture, hospitality, food, coworking, sports, industrial, and more, including multilingual projects.</p><p>From corporate sites to eCommerce stores, I've worked across WordPress, PrestaShop and Shopify handling layout, maintenance and custom PHP plugins tailored to each client's needs. On several of them I also applied technical SEO: faster load times, image optimization, Core Web Vitals improvements and AI tools to boost organic visibility.</p>",
  components: [
    { type: "media", props: { type: "image", src: imgSlazenger, alt: "Slazengerheritage", caption: "Slazengerheritage" } },
    { type: "media", props: { type: "image", src: imgNersa, alt: "Nersa SL", caption: "Nersa SL" } },
    { type: "media", props: { type: "image", src: imgIturri, alt: "Iturri", caption: "Iturri" } },
    { type: "media", props: { type: "image", src: imgFrame, alt: "Frame Architects", caption: "Frame Architects" } },
    { type: "media", props: { type: "image", src: imgCoworking, alt: "Sevilla Coworking", caption: "Sevilla Coworking" } },
    { type: "media", props: { type: "image", src: imgMultiplicalia, alt: "Multiplicalia", caption: "Multiplicalia" } },
    { type: "media", props: { type: "image", src: imgZarzuela, alt: "Restaurante La Zarzuela", caption: "Restaurante La Zarzuela" } },
    { type: "media", props: { type: "image", src: imgBonanza, alt: "Bonanza Food", caption: "Bonanza Food" } },
    { type: "media", props: { type: "image", src: imgCiudadJardin, alt: "Grupo Ciudad Jardín", caption: "Grupo Ciudad Jardín" } },
    { type: "media", props: { type: "image", src: imgFontaclic, alt: "Fontaclic", caption: "Fontaclic" } },
  ],
} as const satisfies ProjectContent;
