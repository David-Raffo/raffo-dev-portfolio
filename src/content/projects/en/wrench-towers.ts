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
    "<p class='description-hook'>Tower defense, reimagined.</p><p>Wrench Towers is a strategy game inspired by classic Flash-era tower defense games. Instead of buying new towers, you upgrade and reposition your existing ones to adapt to increasingly difficult waves. With 6 upgrade types available for your towers, every level calls for a different strategy.</p><p>As you beat levels you earn stars, which unlock upgrades that change how you approach every level. Built in Godot with pixel art, a nostalgic soundtrack, and support for HTML5, Windows, Linux, and Android.</p>",
  components: [
    {
      type: "media",
      props: {
        type: "youtube",
        src: "7F9EcjRQMPo",
        caption: "Trailer",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: img0,
        alt: "Map overview",
        caption: "Map",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: img1,
        alt: "In-game guide",
        caption: "Guide",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: img2,
        alt: "Level 1",
        caption: "Level 1",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: img3,
        alt: "Tower upgrades",
        caption: "Upgrades",
      },
    },
  ],
} as const satisfies ProjectContent;
