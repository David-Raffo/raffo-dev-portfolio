<script setup lang="ts">
import { computed, ref } from "vue";
import gsap from "gsap";
import { locale } from "../../../../i18n/store";
import { useLoop } from "../../composables/useLoop";
import FeatureIcon from "../FeatureIcon.vue";

const copy = computed(() =>
  locale.value === "es"
    ? {
        name: "Asistente",
        online: "En línea",
        input: "Escribe tu mensaje…",
        landing: {
          ask: "¿Hacéis webs para restaurantes?",
          answer: "¡Sí! Diseñamos webs con carta digital y reservas online. ¿Te preparamos un presupuesto?",
          replies: ["Pedir presupuesto", "Ver proyectos"],
          follow: "Perfecto. Déjame tu email y el equipo te escribe hoy mismo.",
        },
        shop: {
          ask: "Busco un curso de inglés online para llegar al B2",
          answer: "Estos encajan con lo que buscas:",
          add: "Añadir",
          added: "Añadido al carrito",
          products: [
            { title: "Inglés B2", meta: "Online · a tu ritmo", tone: "#f97316" },
            { title: "Inglés B1 → B2", meta: "Intensivo", tone: "#0ea5e9" },
            { title: "Business English", meta: "Profesional", tone: "#8b5cf6" },
          ],
        },
        steps: [
          { icon: "globe", title: "Widget en la web", text: "iframe o frontend propio" },
          { icon: "zap", title: "Webhook de n8n", text: "recibe el mensaje y la sesión" },
          { icon: "database", title: "Contexto", text: "prompt del sitio o RAG de productos" },
          { icon: "route", title: "OpenRouter", text: "fallback entre modelos y proveedores" },
          { icon: "cart", title: "Acción", text: "respuesta, carrusel o carrito" },
        ],
      }
    : {
        name: "Assistant",
        online: "Online",
        input: "Type your message…",
        landing: {
          ask: "Do you build websites for restaurants?",
          answer: "We do! Sites with a digital menu and online bookings. Shall we prepare a quote for you?",
          replies: ["Get a quote", "See projects"],
          follow: "Great. Leave your email and the team will write to you today.",
        },
        shop: {
          ask: "I'm looking for an online English course to reach B2",
          answer: "These match what you're looking for:",
          add: "Add",
          added: "Added to cart",
          products: [
            { title: "English B2", meta: "Online · self-paced", tone: "#f97316" },
            { title: "English B1 → B2", meta: "Intensive", tone: "#0ea5e9" },
            { title: "Business English", meta: "Professional", tone: "#8b5cf6" },
          ],
        },
        steps: [
          { icon: "globe", title: "Widget on the site", text: "iframe or custom frontend" },
          { icon: "zap", title: "n8n webhook", text: "receives the message and session" },
          { icon: "database", title: "Context", text: "site prompt or product RAG" },
          { icon: "route", title: "OpenRouter", text: "fallback across models and providers" },
          { icon: "cart", title: "Action", text: "answer, carousel or cart" },
        ],
      },
);

const rootRef = ref<HTMLElement | null>(null);

useLoop(rootRef, () => {
  const root = rootRef.value!;
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.3 });

  const toggle = (selector: string, name: string, on: boolean, at?: string | number) =>
    tl.call(() => root.querySelectorAll(selector).forEach((el) => el.classList.toggle(name, on)), [], at);

  const show = (selector: string, at: string | number = ">") =>
    tl.fromTo(
      selector,
      { display: "none", autoAlpha: 0, y: 12 },
      { display: "flex", autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
      at,
    );

  const clearSteps = () => {
    toggle(".cd-step", "cd-step-active", false);
    tl.set(".cd-link", { scaleY: 0 });
  };

  const think = () => {
    clearSteps();
    tl.fromTo(".cd-typing", { display: "none", autoAlpha: 0 }, { display: "flex", autoAlpha: 1, duration: 0.2 });
    for (let i = 0; i < 5; i++) {
      toggle(`.cd-step-${i}`, "cd-step-active", true, i === 0 ? "<" : "+=0.28");
      if (i < 4)
        tl.fromTo(
          `.cd-link-${i}`,
          { scaleY: 0 },
          { scaleY: 1, duration: 0.28, ease: "none", transformOrigin: "50% 0%" },
          "<",
        );
    }
    tl.to(".cd-typing", { autoAlpha: 0, display: "none", duration: 0.15 }, "+=0.3");
  };

  const scenario = (shop: boolean) => {
    tl.set(".cd-msg", { display: "none" });
    clearSteps();
    toggle(".cd-tab-landing", "cd-tab-active", !shop);
    toggle(".cd-tab-shop", "cd-tab-active", shop);
  };

  scenario(false);
  tl.set(".cd-cart-count", { autoAlpha: 0, scale: 0 });
  show(".cd-landing-ask", "+=0.3");
  think();
  show(".cd-landing-answer");
  show(".cd-landing-replies", "+=0.1");
  tl.to(".cd-reply-0", { scale: 0.92, duration: 0.12, yoyo: true, repeat: 1 }, "+=0.7");
  show(".cd-landing-pick", "+=0.1");
  think();
  show(".cd-landing-follow");
  tl.to({}, { duration: 1.6 });

  scenario(true);
  show(".cd-shop-ask", "+=0.2");
  think();
  show(".cd-shop-answer");
  show(".cd-shop-cards");
  tl.fromTo(
    ".cd-card",
    { x: 40, autoAlpha: 0 },
    { x: 0, autoAlpha: 1, stagger: 0.12, duration: 0.4, ease: "power2.out" },
    "<",
  );
  tl.to(".cd-card-0 .cd-card-add", { scale: 0.88, duration: 0.12, yoyo: true, repeat: 1 }, "+=0.6");
  tl.fromTo(
    ".cd-cart-count",
    { autoAlpha: 0, scale: 0 },
    { autoAlpha: 1, scale: 1, duration: 0.35, ease: "back.out(3)" },
  );
  tl.to(".cd-cart", { rotate: -12, duration: 0.1, yoyo: true, repeat: 3 }, "<");
  show(".cd-toast", "<");
  tl.to({}, { duration: 2.2 });

  return tl;
});
</script>

<template>
  <div ref="rootRef" class="cd">
    <div class="cd-widget">
      <div class="cd-head">
        <span class="cd-avatar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <rect x="4" y="7" width="16" height="12" rx="4" />
            <path d="M12 3v4M9 13h.01M15 13h.01" />
          </svg>
        </span>
        <span class="cd-head-copy">
          <strong>{{ copy.name }}</strong>
          <small><i></i>{{ copy.online }}</small>
        </span>
        <span class="cd-tabs">
          <span class="cd-tab cd-tab-landing">Landing</span>
          <span class="cd-tab cd-tab-shop cd-tab-active">Shop</span>
        </span>
        <span class="cd-cart">
          <FeatureIcon name="cart" />
          <span class="cd-cart-count">1</span>
        </span>
      </div>

      <div class="cd-body">
        <div class="cd-msg cd-user cd-landing-ask">{{ copy.landing.ask }}</div>
        <div class="cd-msg cd-bot cd-landing-answer">{{ copy.landing.answer }}</div>
        <div class="cd-msg cd-replies cd-landing-replies">
          <span
            v-for="(reply, index) in copy.landing.replies"
            :key="reply"
            :class="['cd-reply', `cd-reply-${index}`]"
            >{{ reply }}</span
          >
        </div>
        <div class="cd-msg cd-user cd-landing-pick">{{ copy.landing.replies[0] }}</div>
        <div class="cd-msg cd-bot cd-landing-follow">{{ copy.landing.follow }}</div>

        <div class="cd-msg cd-user cd-shop-ask cd-visible">{{ copy.shop.ask }}</div>
        <div class="cd-msg cd-bot cd-shop-answer cd-visible">{{ copy.shop.answer }}</div>
        <div class="cd-msg cd-cards cd-shop-cards cd-visible">
          <div
            v-for="(product, index) in copy.shop.products"
            :key="product.title"
            :class="['cd-card', `cd-card-${index}`]"
          >
            <span class="cd-card-image" :style="{ '--tone': product.tone }">
              <FeatureIcon name="globe" />
            </span>
            <strong>{{ product.title }}</strong>
            <small>{{ product.meta }}</small>
            <span class="cd-card-add">{{ copy.shop.add }}</span>
          </div>
        </div>
        <div class="cd-msg cd-toast cd-visible">✓ {{ copy.shop.added }}</div>

        <div class="cd-msg cd-typing"><i></i><i></i><i></i></div>
      </div>

      <div class="cd-input">
        <span>{{ copy.input }}</span>
        <span class="cd-send">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </div>

    <ol class="cd-steps">
      <li v-for="(step, index) in copy.steps" :key="step.title" :class="['cd-step', `cd-step-${index}`]">
        <span class="cd-step-icon"><FeatureIcon :name="step.icon as any" /></span>
        <span class="cd-step-copy">
          <strong>{{ step.title }}</strong>
          <small>{{ step.text }}</small>
        </span>
        <span v-if="index < copy.steps.length - 1" class="cd-link-track"
          ><span :class="['cd-link', `cd-link-${index}`]"></span
        ></span>
      </li>
    </ol>
  </div>
</template>

<style scoped lang="scss">
.cd {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
  padding: var(--space-md);

  @include mixins.mq("md") {
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
    align-items: center;
    padding: var(--space-xl);
    gap: var(--space-xl);
  }

  &-widget {
    display: flex;
    flex-direction: column;
    height: 460px;
    overflow: hidden;
    border-radius: var(--radius-lg);
    background-color: #ffffff;
    color: #1f2937;
    box-shadow:
      0 30px 60px -30px rgba(90, 42, 8, 0.45),
      0 0 0 1px rgba(0, 0, 0, 0.06);
  }

  &-head {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
    color: white;
    background: linear-gradient(
      120deg,
      var(--color-accent-400),
      color-mix(in srgb, var(--color-accent-400) 70%, #ea580c)
    );
  }

  &-avatar {
    width: 36px;
    height: 36px;
    padding: 7px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.22);
    flex: none;
  }

  &-head-copy {
    display: flex;
    flex-direction: column;
    line-height: 1.15;

    strong {
      font-size: 15px;
    }

    small {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 12px;
      opacity: 0.9;

      i {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: #4ade80;
      }
    }
  }

  &-tabs {
    display: flex;
    margin-left: auto;
    padding: 3px;
    border-radius: 999px;
    background-color: rgba(0, 0, 0, 0.15);
  }

  &-tab {
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    opacity: 0.75;
    transition:
      background-color 0.25s ease,
      color 0.25s ease;

    &-active {
      opacity: 1;
      color: var(--color-accent-400);
      background-color: white;
    }
  }

  &-cart {
    position: relative;
    width: 26px;
    height: 26px;
    flex: none;

    &-count {
      position: absolute;
      top: -5px;
      right: -7px;
      min-width: 16px;
      height: 16px;
      border-radius: 8px;
      font-size: 10px;
      font-weight: 900;
      line-height: 16px;
      text-align: center;
      color: var(--color-accent-400);
      background-color: white;
    }
  }

  &-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 8px;
    padding: 14px;
    overflow: hidden;
    background-color: #fafaf9;
  }

  &-msg {
    display: none;
    max-width: 82%;
    padding: 9px 13px;
    border-radius: 16px;
    font-size: 14px;
    line-height: 1.35;
  }

  &-visible {
    display: flex;
  }

  &-user {
    align-self: flex-end;
    color: white;
    background-color: var(--color-accent-400);
    border-bottom-right-radius: 4px;
  }

  &-bot {
    align-self: flex-start;
    background-color: white;
    border: 1px solid #ececea;
    border-bottom-left-radius: 4px;
  }

  &-replies {
    gap: 6px;
    padding: 0;
    flex-wrap: wrap;
  }

  &-reply {
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 700;
    color: var(--color-accent-400);
    border: 1.5px solid var(--color-accent-400);
    background-color: white;
  }

  &-cards {
    max-width: 100%;
    gap: 8px;
    padding: 0;
  }

  &-card {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 8px;
    border-radius: 12px;
    background-color: white;
    border: 1px solid #ececea;

    strong {
      font-size: 13px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    small {
      font-size: 11px;
      color: #6b7280;
    }

    &-image {
      height: 54px;
      margin-bottom: 4px;
      padding: 14px;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      color: white;
      background: linear-gradient(135deg, var(--tone), color-mix(in srgb, var(--tone) 55%, #111827));

      svg {
        width: 26px;
      }
    }

    &-add {
      margin-top: 6px;
      padding: 4px 0;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 800;
      text-align: center;
      color: white;
      background-color: #111827;
    }
  }

  &-toast {
    align-self: center;
    padding: 5px 12px;
    font-size: 12px;
    font-weight: 700;
    color: #166534;
    background-color: #dcfce7;
    border-radius: 999px;
  }

  &-typing {
    align-self: flex-start;
    gap: 4px;
    background-color: white;
    border: 1px solid #ececea;

    i {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background-color: #9ca3af;
      animation: cd-bounce 1s ease-in-out infinite;

      &:nth-child(2) {
        animation-delay: 0.15s;
      }

      &:nth-child(3) {
        animation-delay: 0.3s;
      }
    }
  }

  &-input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px;
    padding: 6px 6px 6px 14px;
    border-radius: 999px;
    font-size: 13px;
    color: #9ca3af;
    border: 1px solid #ececea;
  }

  &-send {
    width: 30px;
    height: 30px;
    padding: 7px;
    border-radius: 50%;
    color: white;
    background-color: var(--color-accent-400);
  }

  &-steps {
    display: flex;
    flex-direction: column;
    gap: 22px;
    list-style: none;
  }

  &-step {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: 10px 14px;
    border-radius: var(--radius-md);
    background-color: var(--color-background-300);
    border: var(--stroke-sm) solid var(--color-grayscale-400);
    transition:
      border-color 0.25s ease,
      box-shadow 0.25s ease,
      transform 0.25s ease;

    &-icon {
      width: 38px;
      height: 38px;
      padding: 9px;
      flex: none;
      border-radius: 10px;
      color: var(--color-accent-400);
      background-color: color-mix(in srgb, var(--color-accent-400) 14%, transparent);
      transition:
        background-color 0.25s ease,
        color 0.25s ease;
    }

    &-copy {
      display: flex;
      flex-direction: column;
      line-height: 1.25;

      strong {
        color: var(--color-text-400);
        font-size: var(--font-size-md);
      }

      small {
        color: var(--color-text-300);
        font-size: var(--font-size-sm);
      }
    }

    &-active {
      border-color: var(--color-accent-400);
      box-shadow: 0 10px 30px -14px var(--color-accent-400);
      transform: translateX(4px);

      .cd-step-icon {
        color: white;
        background-color: var(--color-accent-400);
      }
    }
  }

  &-link-track {
    position: absolute;
    left: 32px;
    top: 100%;
    width: 2px;
    height: 22px;
    background-color: var(--color-grayscale-500);
  }

  &-link {
    display: block;
    width: 100%;
    height: 100%;
    background-color: var(--color-accent-400);
    transform: scaleY(0);
  }
}

@keyframes cd-bounce {
  0%,
  60%,
  100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-4px);
  }
}
</style>
