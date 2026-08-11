import type { Locale } from "../../i18n/types";

export const projectIds = ["aishophelper", "contextchatbot", "web-portfolio", "pokemon-stat-master", "wrench-towers"];

function simplifyModules(glob: Record<string, any>) {
  const result: Record<string, any> = {};
  for (const [path, mod] of Object.entries(glob)) {
    const match = path.match(/\/([a-z0-9_-]+)\.ts$/i);
    if (match) result[match[1] as string] = mod;
  }
  return result;
}

// lazy: project copy and its image urls are only needed once a project opens,
// so they stay out of the home page chunk
export const projectModules = {
  es: simplifyModules(import.meta.glob("./es/*.ts")),
  en: simplifyModules(import.meta.glob("./en/*.ts")),
} as const satisfies Record<Locale, Record<string, () => Promise<any>>>;
