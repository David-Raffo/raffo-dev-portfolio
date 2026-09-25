import imgStatus from "../../../assets/images/projects/freerouter/estado.webp";
import imgRequests from "../../../assets/images/projects/freerouter/peticiones.webp";
import imgProviders from "../../../assets/images/projects/freerouter/proveedores.webp";
import imgKeys from "../../../assets/images/projects/freerouter/api-keys.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "FreeRouter",
  theme: "dark",
  tags: ["node", "typescript", "fastify", "react", "sqlite", "docker", "api"],
  videoBorder: true,
  source: "https://github.com/David-Raffo/FreeRouter",
  facts: [
    { label: "Year", value: "2026" },
    { label: "Role", value: "Design & development" },
    { label: "Type", value: "Open source · MIT" },
    { label: "Deploy", value: "Docker Compose" },
  ],
  description:
    "<p class='description-hook'>Every free model behind a single endpoint.</p><p>FreeRouter is an inference router that sits in front of 24 free providers and exposes one OpenAI-compatible API. You drop in your keys once, point any client at <code>model: \"auto\"</code> and it decides which provider and which model serves each request. The client never picks a model, never knows who answered and never handles a retry.</p><p>It scores every candidate on measured quality and speed across three profiles, rules out upfront anything short on context, out of quota or missing the capabilities the request needs, and when a provider still answers 429 it benches it with a penalty that doubles on every repeat and retries elsewhere. The call goes through anyway.</p><p>Node and TypeScript with Fastify, quotas persisted in SQLite, a React dashboard for models, history, providers and keys, credentials encrypted with AES-256-GCM, and everything shipped with Docker Compose.</p>",
  components: [
    {
      type: "stats",
      props: {
        items: [
          { value: 24, label: "free providers behind one API" },
          { value: 630, prefix: "~", label: "models with a quality score" },
          { value: 3, label: "profiles: fast, balanced, quality" },
          { value: 6, suffix: " h", label: "max penalty, doubling from 1 min" },
        ],
      },
    },
    {
      type: "heading",
      props: {
        eyebrow: "How it routes",
        title: "It picks the model. <em>You just send the request.</em>",
        text: "Candidates are filtered by quota, context and capabilities, then ranked on an absolute scale. When the best one fails, the next one answers before the client notices.",
      },
    },
    {
      type: "diagram",
      props: {
        name: "freerouter-flow",
        caption: "Live simulation: scoring, a 429, the penalty and a silent failover",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgStatus,
        alt: "FreeRouter dashboard listing every model with TTFT, tokens per second and quality score",
        caption: "Every model, measured",
        ratio: "1905 / 981",
        frame: "localhost:8787/app · status",
      },
    },
    {
      type: "features",
      props: {
        items: [
          {
            icon: "gauge",
            title: "Absolute scoring",
            text: "Speed saturates at 200 tok/s and quality drops quadratically below an Intelligence Index of 15, so a fast but useless model never wins first place.",
          },
          {
            icon: "clock",
            title: "Quota before the 429",
            text: "Per-minute and per-day limits are tracked per model or per account, corrected at runtime from <code>x-ratelimit-*</code> headers.",
          },
          {
            icon: "repeat",
            title: "Penalty that learns",
            text: "One minute the first time, doubling on every repeat up to six hours. A single success resets it.",
          },
          {
            icon: "layers",
            title: "Capabilities on demand",
            text: "Send an image or define tools and the request only goes to models that support vision or tool use, whatever the key declared.",
          },
          {
            icon: "shield",
            title: "Secure by default",
            text: "Provider keys encrypted with AES-256-GCM and a server that refuses to start without a password.",
          },
          {
            icon: "route",
            title: "Fully traceable",
            text: "Every request records the model chosen, the attempts and the latency of each one, with a timeline in the dashboard.",
          },
        ],
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgRequests,
        alt: "Request history showing API key, chosen model, latency and failover attempts",
        caption: "Failovers the client never noticed",
        captionAlign: "left",
        ratio: "1907 / 975",
        frame: "localhost:8787/app · requests",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgProviders,
        alt: "Provider cards with their real limits and warnings",
        caption: "Paste a key, done",
        ratio: "1089 / 801",
        frame: "localhost:8787/app · providers",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgKeys,
        alt: "Creating an API key with a profile and required capabilities",
        caption: "Keys choose a profile, not a model",
        captionAlign: "left",
        ratio: "1062 / 797",
        frame: "localhost:8787/app · api keys",
      },
    },
  ],
} as const satisfies ProjectContent;
