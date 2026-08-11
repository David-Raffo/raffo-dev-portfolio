import video0 from "../../../assets/images/projects/ContextChatbot/0.mp4";
import img1 from "../../../assets/images/projects/ContextChatbot/1.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "ContextChatbot",
  theme: "dark",
  tags: ["n8n", "rag", "openrouter", "postgresql", "api"],
  videoBorder: true,
  sites: [
    { label: "Multiplicalia (landing)", url: "https://www.multiplicalia.com/" },
    { label: "AI Shop Helper (landing)", url: "https://aishophelper.ai/" },
    { label: "Instituto Europroject (shop)", url: "https://institutoeuroproject.com/es/" },
  ],
  description:
    "<p class='description-hook'>Two chatbots, any website.</p><p>ContextChatbot is a self-hostable AI chatbot built in n8n that generates an embeddable URL. Drop it into any iframe or frontend and you instantly have an assistant trained on that site's knowledge. It uses OpenRouter to guarantee fast inference with automatic fallbacks across multiple providers and models, and is scoped strictly to its domain so it never goes off-topic. It comes in two versions depending on what the site needs.</p><p>The landing version targets corporate sites and businesses with a focused catalogue of services. It is trained through a custom prompt and takes care of answering questions, qualifying leads and guiding visitors towards contact.</p><p>The shop version is a RAG wired to a database holding every product in the store. On top of answering, it recommends products based on what the customer is looking for, shows them in a carousel inside the chat itself and adds them to the cart without making them leave the conversation.</p>",
  components: [
    {
      type: "media",
      props: {
        type: "video",
        src: video0,
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
