import thumbnail from "../../../assets/thumbnails/wrench-towers.webp";
import img0 from "../../../assets/images/projects/wrench-towers/0.png";
import img1 from "../../../assets/images/projects/wrench-towers/1.png";
import img2 from "../../../assets/images/projects/wrench-towers/2.png";
import img3 from "../../../assets/images/projects/wrench-towers/3.png";

import type { ProjectContent } from "../../types";

export default {
  title: "Wrench Towers",
  theme: "dark",
  tags: ["godot", "aseprite", "gimp", "gdscript", "pixelart"],
  videoBorder: true,
  live: "https://wrench-games.itch.io/wrench-towers",
  steam: "https://store.steampowered.com/app/3944650/Wrench_Towers_TD/",
  description:
    "<p class='description-hook'>Tower defense, reinventado.</p><p>Wrench Towers es un juego de estrategia inspirado en los clásicos tower defense de la era Flash. En lugar de comprar nuevas torres, mejoras y reposicionas las existentes para adaptarte a oleadas cada vez más difíciles. Con 6 tipos de mejoras disponibles para tus torres, cada nivel pide una estrategia distinta.</p><p>Al superar niveles obtienes estrellas que desbloquean mejoras, cambiando la forma en que afrontas cada nivel. Desarrollado en Godot con pixel art, banda sonora nostálgica y soporte para HTML5, Windows, Linux y Android.</p>",
  components: [
    {
      type: "media",
      props: {
        type: "youtube",
        src: "7F9EcjRQMPo",
        caption: "Tráiler",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: img0,
        alt: "Vista del mapa",
        caption: "Mapa",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: img1,
        alt: "Guía del juego",
        caption: "Guía",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: img2,
        alt: "Nivel 1",
        caption: "Nivel 1",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: img3,
        alt: "Mejoras de torres",
        caption: "Mejoras",
      },
    },
  ],
} as const satisfies ProjectContent;
