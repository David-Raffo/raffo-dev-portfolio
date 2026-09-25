import imgChess from "../../../assets/images/projects/ai-web-apps/chess-game.webp";
import imgPokemon from "../../../assets/images/projects/ai-web-apps/pokemon-game.webp";
import imgPokemonMenu from "../../../assets/images/projects/ai-web-apps/pokemon-menu.webp";
import imgPokemonResults from "../../../assets/images/projects/ai-web-apps/pokemon-results.webp";
import imgMovies from "../../../assets/images/projects/ai-web-apps/que-vemos-hoy-results.webp";
import imgMoviesHome from "../../../assets/images/projects/ai-web-apps/que-vemos-hoy-home.webp";
import imgRemoverLight from "../../../assets/images/projects/ai-web-apps/quitafondos-light.webp";
import imgRemoverDark from "../../../assets/images/projects/ai-web-apps/quitafondos-dark.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "AI Web Apps",
  theme: "light",
  tags: ["react", "next", "typescript", "tailwind", "supabase", "python", "flask", "openrouter"],
  videoBorder: true,
  sites: [
    { label: "Aprende Ajedrez", url: "https://chesswithraffo.lovable.app/" },
    { label: "Pokémon Stat Master", url: "https://v0-pokemon-stat-game.vercel.app/" },
    { label: "Qué vemos hoy", url: "https://v0-que-vemos-hoy.vercel.app/" },
  ],
  facts: [
    { label: "Apps", value: "4 · 3 of them live" },
    { label: "Role", value: "Idea, design & build" },
    { label: "Approach", value: "AI-assisted, shipped fast" },
    { label: "License", value: "MIT" },
  ],
  description:
    "<p class='description-hook'>Small ideas, built fast with AI.</p><p>A collection of web apps I build in my spare time, leaning on AI to move quickly. They are short projects I use to try out tools, models and ways of working, and each one solves a real, concrete problem.</p><p>A chess trainer with its own engine and an AI coach, a Pokémon trivia game with a global leaderboard, a movie finder where you describe what you feel like watching, and a self-hosted batch background remover. Four very different stacks, from Next.js and Supabase to Python and ONNX Runtime.</p>",
  components: [
    {
      type: "stats",
      props: {
        items: [
          { value: 1000, prefix: "~", label: "movies judged by AI on every search" },
          { value: 1025, label: "Pokémon from every generation" },
          { value: 50, label: "images per batch, processed locally" },
          { value: 5, label: "chess AI levels in a Web Worker" },
        ],
      },
    },
    {
      type: "heading",
      props: {
        eyebrow: "The collection",
        title: "Four apps, <em>four ideas.</em>",
        text: "Each one is live or self-hostable, with its source code on GitHub.",
      },
    },
    {
      type: "apps",
      props: {
        items: [
          {
            title: "Aprende Ajedrez",
            kicker: "Chess trainer",
            description:
              "Play against an AI written from scratch, negamax with alpha-beta pruning in a Web Worker, while a coach rates every move and suggests the next idea.",
            image: imgChess,
            alt: "Aprende Ajedrez game with the coach panel",
            tags: ["react", "typescript", "tailwind"],
            live: "https://chesswithraffo.lovable.app/",
            source: "https://github.com/David-Raffo/aprende-ajedrez",
          },
          {
            title: "Pokémon Stat Master",
            kicker: "Trivia game",
            description:
              "Rank six Pokémon by a base stat without seeing the numbers. Real PokéAPI data, a six-round competitive mode and a top 10 leaderboard.",
            image: imgPokemon,
            alt: "Pokémon Stat Master game board",
            tags: ["next", "typescript", "tailwind", "supabase"],
            live: "https://v0-pokemon-stat-game.vercel.app/",
            source: "https://github.com/David-Raffo/pokemon-stat-master",
          },
          {
            title: "Qué vemos hoy",
            kicker: "Movie finder",
            description:
              "Describe what you feel like watching in your own words. An LLM judges a catalog of ~1,000 TMDB movies and streams the matches as posters fly out of a pile.",
            image: imgMovies,
            alt: "Qué vemos hoy showing superhero movies with their rating and fit percentage",
            tags: ["next", "typescript", "tailwind", "openrouter"],
            live: "https://v0-que-vemos-hoy.vercel.app/",
            source: "https://github.com/David-Raffo/descubre-peliculas",
          },
          {
            title: "Quitafondos",
            kicker: "Background remover",
            description:
              "Drop dozens of images, pick one of five AI models and download them all as a ZIP. Everything runs in memory on your own server, nothing goes to third parties.",
            image: imgRemoverLight,
            alt: "Quitafondos with three processed images and a before and after slider",
            tags: ["python", "flask", "onnx", "docker"],
            source: "https://github.com/David-Raffo/Img-background-remover",
          },
        ],
      },
    },
    {
      type: "heading",
      props: {
        eyebrow: "Qué vemos hoy",
        title: "Describe a mood. <em>Get a movie.</em>",
        text: "No filters, no genres: one search box. Every movie in the catalog becomes a yes or no question for the model, and the ones above 60% fly out of the pile.",
      },
    },
    {
      type: "diagram",
      props: {
        name: "poster-pile",
        caption: "Simulation of the search: typing, scoring and the posters flying out",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgMoviesHome,
        alt: "Qué vemos hoy home screen with the search box and the pile of posters",
        caption: "The pile, before searching",
        ratio: "1918 / 998",
        frame: "v0-que-vemos-hoy.vercel.app",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgMovies,
        alt: "Results for a superhero search with rating and fit percentage on each poster",
        caption: "The matches, out of the pile",
        captionAlign: "left",
        ratio: "1918 / 998",
        frame: "v0-que-vemos-hoy.vercel.app",
      },
    },
    {
      type: "heading",
      props: {
        eyebrow: "Quitafondos",
        title: "Background removal <em>in batch.</em>",
        text: "One request per image, two in parallel, results as soon as they are ready and a ZIP assembled in the browser.",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgRemoverLight,
        alt: "Quitafondos with three processed images and a before and after slider",
        caption: "Light theme with the before and after slider",
        ratio: "1280 / 860",
        frame: "localhost:5000",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgRemoverDark,
        alt: "Quitafondos in dark mode",
        caption: "Dark theme",
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
        alt: "Chess board against the AI with the coach panel",
        caption: "Aprende Ajedrez · the coach rates your move",
        ratio: "1440 / 930",
        frame: "chesswithraffo.lovable.app",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgPokemon,
        alt: "Ranking Pokémon by special attack",
        caption: "Pokémon Stat Master · rank them from memory",
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
        alt: "Main menu of Pokémon Stat Master",
        caption: "Pokémon Stat Master · menu",
        ratio: "1280 / 860",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgPokemonResults,
        alt: "Round results with the correct order",
        caption: "Pokémon Stat Master · round summary",
        captionAlign: "left",
        ratio: "1280 / 860",
      },
    },
  ],
} as const satisfies ProjectContent;
