import imgChess0 from "../../../assets/images/projects/ai-web-apps/chess-0.webp";
import imgChess1 from "../../../assets/images/projects/ai-web-apps/chess-1.webp";
import imgPokemon0 from "../../../assets/images/projects/ai-web-apps/pokemon-0.webp";
import imgPokemon1 from "../../../assets/images/projects/ai-web-apps/pokemon-1.webp";
import imgPokemon2 from "../../../assets/images/projects/ai-web-apps/pokemon-2.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "Portfolio Aplicaciones Web (IA)",
  theme: "light",
  tags: ["react", "next", "typescript", "postgresql", "api"],
  videoBorder: true,
  sites: [
    { label: "Chess with Raffo", url: "https://chesswithraffo.lovable.app/" },
    { label: "Pokémon Stat Master", url: "https://v0-pokemon-stat-game.vercel.app/" },
  ],
  description:
    "<p class='description-hook'>Ideas pequeñas, construidas rápido con IA.</p><p>Una recopilación de aplicaciones web que hago en mi tiempo libre apoyándome en IA para acelerar el desarrollo. Son proyectos cortos que me sirven para probar herramientas, modelos y formas de trabajar, y todos están publicados y se pueden usar.</p><p>Chess with Raffo es una partida de ajedrez contra la máquina en la que una IA ejerce de entrenador: analiza cada jugada, te dice si ha sido buena o mala y te sugiere qué mejorarías, con cinco niveles de rival. Pokémon Stat Master es un juego de trivia en el que ordenas seis Pokémon por un stat concreto sin ver los valores, con modo competitivo a seis rondas y ranking online, construido sobre Next.js, Supabase y datos reales de la PokéAPI.</p>",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: imgChess1,
        alt: "El entrenador de IA analizando una jugada en Chess with Raffo",
        caption: "Chess with Raffo · el entrenador analiza tu jugada",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgChess0,
        alt: "Tablero de Chess with Raffo al comenzar la partida",
        caption: "Chess with Raffo · elección de color y nivel",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgPokemon0,
        alt: "Pantalla de selección de modo de Pokémon Stat Master",
        caption: "Pokémon Stat Master · selección de modo",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgPokemon1,
        alt: "Interfaz dentro del juego de Pokémon Stat Master",
        caption: "Pokémon Stat Master · interfaz del juego",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgPokemon2,
        alt: "Modo competitivo de Pokémon Stat Master",
        caption: "Pokémon Stat Master · modo competitivo",
      },
    },
  ],
} as const satisfies ProjectContent;
