import img0 from "../../../assets/images/projects/aishophelper/0.webp";
import img1 from "../../../assets/images/projects/aishophelper/1.webp";
import img2 from "../../../assets/images/projects/aishophelper/2.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "AI Shop Helper",
  theme: "light",
  tags: ["python", "react", "n8n", "docker", "langgraph", "postgresql", "api"],
  videoBorder: true,
  live: "https://aishophelper.ai/",
  facts: [
    { label: "Product", value: "SaaS platform" },
    { label: "Role", value: "Full stack & AI automation" },
    { label: "Integrations", value: "WordPress · WooCommerce · Shopify" },
    { label: "Deploy", value: "AWS · Docker" },
  ],
  description:
    "<p class='description-hook'>What if your eCommerce ran itself?</p><p>AI Shop Helper is a SaaS platform that automates eCommerce and digital marketing using AI agents. It generates and publishes SEO-optimized blog articles, social media posts, images, videos, and ad campaigns automatically.</p><p>Built with a Python backend, React frontend, PostgreSQL database, and AI automation powered by n8n, LangGraph, and Make. Fully integrated with WordPress, WooCommerce, and Shopify, and deployed on AWS with Docker.</p>",
  components: [
    {
      type: "media",
      props: {
        type: "youtube",
        src: "U05kj9PCtXM",
        caption: "Demo",
      },
    },
    {
      type: "heading",
      props: {
        eyebrow: "Under the hood",
        title: "A team of agents <em>that never clocks out.</em>",
        text: "The store's catalog, brand voice and calendar feed an orchestrator that hands work to specialised agents, and each one publishes straight to the shop.",
      },
    },
    {
      type: "diagram",
      props: {
        name: "agents-hub",
        caption: "Simulation: content flowing from the store data to every channel",
      },
    },
    {
      type: "features",
      props: {
        items: [
          {
            icon: "search",
            title: "SEO blog on autopilot",
            text: "Articles researched, written and optimised for search, then published on WordPress with their images.",
          },
          {
            icon: "message",
            title: "Social media",
            text: "Posts adapted to each network and scheduled from the same calendar as the rest of the content.",
          },
          {
            icon: "image",
            title: "Images and video",
            text: "Visuals generated for products, posts and campaigns without leaving the platform.",
          },
          {
            icon: "chart",
            title: "Ad campaigns",
            text: "Campaigns drafted from the catalog so every product can get its own promotion.",
          },
          {
            icon: "cart",
            title: "Store integrations",
            text: "Connected to WordPress, WooCommerce and Shopify to read products and publish results.",
          },
          {
            icon: "layers",
            title: "Orchestrated with n8n and LangGraph",
            text: "Workflows in n8n and Make, agents in LangGraph, a Python backend and a React frontend on AWS.",
          },
        ],
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: img0,
        alt: "AI agents",
        caption: "Agents",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: img1,
        alt: "Login screen",
        caption: "Login",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: img2,
        alt: "Blog writer",
        caption: "Blog writer",
      },
    },
  ],
} as const satisfies ProjectContent;
