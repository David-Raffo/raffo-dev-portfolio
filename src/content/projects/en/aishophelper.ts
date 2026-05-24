import thumbnail from "../../../assets/thumbnails/aishophelper.webp";
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
