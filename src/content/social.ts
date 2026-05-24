export const social = [
  { url: "mailto:marconidavid@hotmail.es", name: "mail" },
  { url: "https://github.com/David-Raffo", name: "github" },
  { url: "https://www.linkedin.com/in/david-raf-loz/", name: "linkedin" },
  //{ url: "https://x.com/DavidHckh", name: "x" },
  //{ url: "https://www.instagram.com/davidhckh/", name: "instagram" },
] as const satisfies { url: string; name: "mail" | "github" | "instagram" | "linkedin" | "x" }[];
