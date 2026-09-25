import imgChess from "../../../assets/images/projects/ai-web-apps/chess-game.webp";
import imgPokemon from "../../../assets/images/projects/ai-web-apps/pokemon-game.webp";
import imgPokemonMenu from "../../../assets/images/projects/ai-web-apps/pokemon-menu.webp";
import imgPokemonResults from "../../../assets/images/projects/ai-web-apps/pokemon-results.webp";
import imgMonton from "../../../assets/images/projects/ai-web-apps/monton.webp";
import imgRemoverLight from "../../../assets/images/projects/ai-web-apps/quitafondos-light.webp";
import imgRemoverDark from "../../../assets/images/projects/ai-web-apps/quitafondos-dark.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "Aplicaciones Web (IA)",
  theme: "light",
  tags: ["react", "next", "typescript", "tailwind", "supabase", "python", "flask", "openrouter"],
  videoBorder: true,
  sites: [
    { label: "Aprende Ajedrez", url: "https://chesswithraffo.lovable.app/" },
    { label: "Pokémon Stat Master", url: "https://v0-pokemon-stat-game.vercel.app/" },
    { label: "Montón", url: "https://v0-que-vemos-hoy.vercel.app/" },
  ],
  facts: [
    { label: "Apps", value: "4 · 3 publicadas" },
    { label: "Rol", value: "Idea, diseño y desarrollo" },
    { label: "Enfoque", value: "Con IA, entregadas rápido" },
    { label: "Licencia", value: "MIT" },
  ],
  description:
    "<p class='description-hook'>Ideas pequeñas, construidas rápido con IA.</p><p>Una recopilación de aplicaciones web que hago en mi tiempo libre apoyándome en IA para acelerar el desarrollo. Son proyectos cortos que me sirven para probar herramientas, modelos y formas de trabajar, y cada uno resuelve un problema real y concreto.</p><p>Un entrenador de ajedrez con motor propio y un coach con IA, un trivia de Pokémon con ranking global, un buscador de películas en el que describes lo que te apetece ver y un quitafondos por lotes autoalojado. Cuatro stacks muy distintos, de Next.js y Supabase a Python y ONNX Runtime.</p>",
  components: [
    {
      type: "stats",
      props: {
        items: [
          { value: 1000, prefix: "~", label: "películas que juzga la IA en cada búsqueda" },
          { value: 1025, label: "Pokémon de todas las generaciones" },
          { value: 50, label: "imágenes por lote, procesadas en local" },
          { value: 5, label: "niveles de IA de ajedrez en un Web Worker" },
        ],
      },
    },
    {
      type: "heading",
      props: {
        eyebrow: "La colección",
        title: "Cuatro apps, <em>cuatro ideas.</em>",
        text: "Todas están publicadas o se pueden autoalojar, con su código en GitHub.",
      },
    },
    {
      type: "apps",
      props: {
        items: [
          {
            title: "Aprende Ajedrez",
            kicker: "Entrenador de ajedrez",
            description:
              "Juegas contra una IA escrita desde cero, negamax con poda alfa-beta en un Web Worker, mientras un entrenador valora cada jugada y te sugiere la siguiente idea.",
            image: imgChess,
            alt: "Partida de Aprende Ajedrez con el panel del entrenador",
            tags: ["react", "typescript", "tailwind"],
            live: "https://chesswithraffo.lovable.app/",
            source: "https://github.com/David-Raffo/aprende-ajedrez",
          },
          {
            title: "Pokémon Stat Master",
            kicker: "Juego de trivia",
            description:
              "Ordena seis Pokémon por un stat base sin ver los números. Datos reales de la PokéAPI, modo competitivo a seis rondas y ranking top 10.",
            image: imgPokemon,
            alt: "Tablero de Pokémon Stat Master",
            tags: ["next", "typescript", "tailwind", "supabase"],
            live: "https://v0-pokemon-stat-game.vercel.app/",
            source: "https://github.com/David-Raffo/pokemon-stat-master",
          },
          {
            title: "Montón",
            kicker: "Buscador de películas",
            description:
              "Describe con tus palabras lo que te apetece ver. Un LLM juzga un catálogo de ~1.000 películas de TMDB y va enviando las que encajan mientras los pósters salen volando del montón.",
            image: imgMonton,
            alt: "Ilustración de la interfaz de Montón con una búsqueda y una fila de pósters",
            tags: ["next", "typescript", "tailwind", "openrouter"],
            live: "https://v0-que-vemos-hoy.vercel.app/",
            source: "https://github.com/David-Raffo/descubre-peliculas",
          },
          {
            title: "Quitafondos",
            kicker: "Quitafondos por lotes",
            description:
              "Suelta decenas de imágenes, elige uno de cinco modelos de IA y descárgalas todas en un ZIP. Todo corre en memoria en tu propio servidor, nada pasa por terceros.",
            image: imgRemoverLight,
            alt: "Quitafondos con tres imágenes procesadas y el comparador antes y después",
            tags: ["python", "flask", "onnx", "docker"],
            note: "Repo privado · autoalojado",
          },
        ],
      },
    },
    {
      type: "heading",
      props: {
        eyebrow: "Montón",
        title: "Describe un antojo. <em>Recibe una peli.</em>",
        text: "Sin filtros ni géneros: una sola caja de búsqueda. Cada película del catálogo se convierte en una pregunta de sí o no para el modelo, y las que pasan del 60% salen volando del montón.",
      },
    },
    {
      type: "diagram",
      props: {
        name: "poster-pile",
        caption: "Simulación de la búsqueda: escribir, puntuar y los pósters saliendo del montón",
      },
    },
    {
      type: "heading",
      props: {
        eyebrow: "Quitafondos",
        title: "Quitar fondos, <em>en lote.</em>",
        text: "Una petición por imagen, dos en paralelo, resultados en cuanto están listos y un ZIP montado en el navegador.",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgRemoverLight,
        alt: "Quitafondos con tres imágenes procesadas y el comparador antes y después",
        caption: "Tema claro con el comparador antes y después",
        ratio: "1280 / 860",
        frame: "localhost:5000",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgRemoverDark,
        alt: "Quitafondos en modo oscuro",
        caption: "Tema oscuro",
        captionAlign: "left",
        ratio: "1280 / 860",
        frame: "localhost:5000",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgChess,
        alt: "Tablero de ajedrez contra la IA con el panel del entrenador",
        caption: "Aprende Ajedrez · el entrenador valora tu jugada",
        ratio: "1440 / 930",
        frame: "chesswithraffo.lovable.app",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgPokemon,
        alt: "Ordenando Pokémon por ataque especial",
        caption: "Pokémon Stat Master · ordénalos de memoria",
        captionAlign: "left",
        ratio: "1280 / 860",
        frame: "v0-pokemon-stat-game.vercel.app",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgPokemonMenu,
        alt: "Menú principal de Pokémon Stat Master",
        caption: "Pokémon Stat Master · menú",
        ratio: "1280 / 860",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgPokemonResults,
        alt: "Resultados de la ronda con el orden correcto",
        caption: "Pokémon Stat Master · resumen de ronda",
        captionAlign: "left",
        ratio: "1280 / 860",
      },
    },
  ],
} as const satisfies ProjectContent;
