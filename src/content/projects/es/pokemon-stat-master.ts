import img0 from "../../../assets/images/projects/pokemon-stat-master/pokemon-stat-master-0.webp";
import img1 from "../../../assets/images/projects/pokemon-stat-master/pokemon-stat-master-1.webp";
import img2 from "../../../assets/images/projects/pokemon-stat-master/pokemon-stat-master-2.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "Pokémon Stat Master",
  theme: "light",
  tags: ["next", "postgresql", "typescript", "pokeapi"],
  videoBorder: true,
  live: "https://v0-pokemon-stat-game.vercel.app/",
  description:
    "<p class='description-hook'>¿Crees que conoces bien a tus Pokémon? Demuéstralo.</p><p>Pokémon Stat Master es un minijuego de trivia donde pones a prueba tu conocimiento de los stats de Pokémon — ordena 6 Pokémon aleatorios por un stat específico (Ataque, Defensa, Velocidad, etc.) sin ver los valores reales.</p><p>Incluye modo competitivo con 6 rondas consecutivas y ranking online global, construido con Next.js, TypeScript, Supabase (PostgreSQL) y datos reales de la PokéAPI.</p>",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: img0,
        alt: "Pantalla de selección de modo",
        caption: "Selección de modo",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: img1,
        alt: "Interfaz dentro del juego",
        caption: "Interfaz del juego",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: img2,
        alt: "Modo competitivo",
        caption: "Modo competitivo",
      },
    },
  ],
} as const satisfies ProjectContent;
