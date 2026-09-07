import imgChess0 from "../../../assets/images/projects/ai-web-apps/chess-0.webp";
import imgChess1 from "../../../assets/images/projects/ai-web-apps/chess-1.webp";
import imgPokemon0 from "../../../assets/images/projects/ai-web-apps/pokemon-0.webp";
import imgPokemon1 from "../../../assets/images/projects/ai-web-apps/pokemon-1.webp";
import imgPokemon2 from "../../../assets/images/projects/ai-web-apps/pokemon-2.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "AI Web Apps Portfolio",
  theme: "light",
  tags: ["react", "next", "typescript", "postgresql", "api"],
  videoBorder: true,
  sites: [
    { label: "Chess with Raffo", url: "https://chesswithraffo.lovable.app/" },
    { label: "Pokémon Stat Master", url: "https://v0-pokemon-stat-game.vercel.app/" },
  ],
  description:
    "<p class='description-hook'>Small ideas, built fast with AI.</p><p>A collection of web apps I build in my spare time, leaning on AI to move quickly. They are short projects I use to try out tools, models and ways of working, and every one of them is live and playable.</p><p>Chess with Raffo is a game against the machine where an AI acts as your coach: it reviews every move, tells you whether it was good or bad and suggests what it would improve, across five opponent levels. Pokémon Stat Master is a trivia game where you rank six Pokémon by a given stat without seeing the values, with a six round competitive mode and a global leaderboard, built on Next.js, Supabase and real PokéAPI data.</p>",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: imgChess1,
        alt: "The AI coach reviewing a move in Chess with Raffo",
        caption: "Chess with Raffo · the coach reviews your move",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgChess0,
        alt: "The Chess with Raffo board at the start of a game",
        caption: "Chess with Raffo · pick your colour and level",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgPokemon0,
        alt: "Pokémon Stat Master mode selection screen",
        caption: "Pokémon Stat Master · mode selection",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgPokemon1,
        alt: "Pokémon Stat Master in game interface",
        caption: "Pokémon Stat Master · in game interface",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgPokemon2,
        alt: "Pokémon Stat Master competitive mode",
        caption: "Pokémon Stat Master · competitive mode",
      },
    },
  ],
} as const satisfies ProjectContent;
