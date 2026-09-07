import img0 from "../../../assets/images/projects/freerouter/0.webp";
import img1 from "../../../assets/images/projects/freerouter/1.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "FreeRouter",
  theme: "dark",
  tags: ["node", "typescript", "fastify", "sqlite", "docker", "api"],
  videoBorder: true,
  source: "https://github.com/David-Raffo/FreeRouter",
  description:
    "<p class='description-hook'>Every free model behind a single endpoint.</p><p>FreeRouter is an inference router that sits in front of 24 free providers and exposes one OpenAI-compatible API. You drop in your keys, point your app at <code>model: \"auto\"</code> and it decides which provider and which model each request goes to, with the client knowing none of it.</p><p>To pick one, it scores the candidates on quality and speed across three configurable profiles, ruling out upfront anything short on context, out of quota, or missing the capabilities the request needs. When a provider answers 429 it applies an exponential penalty that doubles on every consecutive failure and retries elsewhere, so the call still goes through.</p><p>Node and TypeScript on the backend with Fastify, daily quotas persisted in SQLite, and a Vite and React dashboard for request history, provider credentials and API keys. Provider keys are stored encrypted with AES-256-GCM and the whole thing ships with Docker Compose.</p>",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: img0,
        alt: "Calling FreeRouter from an OpenAI-compatible client",
        caption: "One OpenAI-compatible endpoint",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: img1,
        alt: "How FreeRouter picks a provider and a model",
        caption: "How it picks provider and model",
      },
    },
  ],
} as const satisfies ProjectContent;
