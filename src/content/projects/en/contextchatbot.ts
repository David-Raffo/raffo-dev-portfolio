import img0 from "../../../assets/images/projects/ContextChatbot/0.gif";
import img1 from "../../../assets/images/projects/ContextChatbot/1.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "ContextChatbot",
  theme: "dark",
  tags: ["n8n", "openrouter", "postgresql", "api"],
  videoBorder: true,
  live: "https://www.multiplicalia.com/",
  description:
    "<p class='description-hook'>One chatbot, any website.</p><p>ContextChatbot is a self-hostable AI chatbot built in n8n that generates an embeddable URL. Drop it into any iframe or frontend and you instantly have a fully trained chat assistant.</p><p>Each bot is trained on the specific knowledge of the target website, either via a custom prompt or a database depending on the site's size. It uses OpenRouter to guarantee fast inference with automatic fallbacks across multiple providers and models, and is scoped strictly to its domain so it never goes off-topic.</p>",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: img0,
        alt: "Live chatbot",
        caption: "Live chatbot",
        captionAlign: "left",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: img1,
        alt: "Configuration",
        caption: "Configuration",
      },
    },
  ],
} as const satisfies ProjectContent;
