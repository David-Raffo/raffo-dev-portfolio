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
    "<p class='description-hook'>Think you know your Pokémon? Prove it.</p><p>Pokémon Stat Master is a trivia minigame where you put your Pokémon knowledge to the test. Rank 6 random Pokémon by a specific stat (Attack, Defense, Speed, etc.) without seeing the real values.</p><p>It includes a competitive mode with 6 consecutive rounds and an online global ranking, built with Next.js, TypeScript, Supabase (PostgreSQL), and real data from the PokéAPI.</p>",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: img0,
        alt: "Mode selection screen",
        caption: "Mode selection",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: img1,
        alt: "In-game interface",
        caption: "In-game interface",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: img2,
        alt: "Competitive mode",
        caption: "Competitive mode",
      },
    },
  ],
} as const satisfies ProjectContent;
