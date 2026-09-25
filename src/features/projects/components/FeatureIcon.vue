<script setup lang="ts">
export type FeatureIconName =
  | "route"
  | "gauge"
  | "shield"
  | "key"
  | "layers"
  | "database"
  | "film"
  | "palette"
  | "wave"
  | "cpu"
  | "upload"
  | "zap"
  | "sparkles"
  | "message"
  | "cart"
  | "search"
  | "globe"
  | "clock"
  | "image"
  | "scissors"
  | "code"
  | "box"
  | "repeat"
  | "chart";

defineProps<{ name: FeatureIconName }>();
</script>

<template>
  <svg
    class="feature-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <template v-if="name === 'route'">
      <circle cx="6" cy="19" r="2.5" />
      <circle cx="18" cy="5" r="2.5" />
      <path d="M8.5 19H15a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h6.5" />
    </template>
    <template v-else-if="name === 'gauge'">
      <path d="M4 17a8 8 0 1 1 16 0" />
      <path d="M12 17l4-5" />
      <circle cx="12" cy="17" r="1.5" />
    </template>
    <template v-else-if="name === 'shield'">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </template>
    <template v-else-if="name === 'key'">
      <circle cx="8" cy="15" r="4" />
      <path d="M11 12l9-9M17 6l3 3M14 9l2 2" />
    </template>
    <template v-else-if="name === 'layers'">
      <path d="M12 3l9 5-9 5-9-5z" />
      <path d="M3 13l9 5 9-5" />
    </template>
    <template v-else-if="name === 'database'">
      <ellipse cx="12" cy="5.5" rx="7.5" ry="2.5" />
      <path d="M4.5 5.5v13c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5v-13" />
      <path d="M4.5 12c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5" />
    </template>
    <template v-else-if="name === 'film'">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4" />
    </template>
    <template v-else-if="name === 'palette'">
      <path
        d="M12 3a9 9 0 1 0 0 18c1.2 0 1.8-.8 1.8-1.7 0-1.2-1-1.6-1-2.6 0-1 .8-1.7 1.8-1.7H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3z"
      />
      <circle cx="7.5" cy="11" r="1" />
      <circle cx="10" cy="7" r="1" />
      <circle cx="15" cy="7.5" r="1" />
    </template>
    <template v-else-if="name === 'wave'">
      <path d="M2 12h2M6 8v8M10 4v16M14 7v10M18 10v4M22 12h0" />
    </template>
    <template v-else-if="name === 'cpu'">
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" />
      <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
    </template>
    <template v-else-if="name === 'upload'">
      <path d="M12 16V4M7 9l5-5 5 5" />
      <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
    </template>
    <template v-else-if="name === 'zap'">
      <path d="M13 2L4 14h7l-1 8 9-12h-7z" />
    </template>
    <template v-else-if="name === 'sparkles'">
      <path d="M10 3l1.8 5.2L17 10l-5.2 1.8L10 17l-1.8-5.2L3 10l5.2-1.8z" />
      <path d="M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z" />
    </template>
    <template v-else-if="name === 'message'">
      <path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1z" />
      <path d="M8 10h8M8 13h5" />
    </template>
    <template v-else-if="name === 'cart'">
      <path d="M3 4h2l2.4 11h10.8L21 7H6" />
      <circle cx="9" cy="19.5" r="1.5" />
      <circle cx="17" cy="19.5" r="1.5" />
    </template>
    <template v-else-if="name === 'search'">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-4-4" />
    </template>
    <template v-else-if="name === 'globe'">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" />
    </template>
    <template v-else-if="name === 'clock'">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </template>
    <template v-else-if="name === 'image'">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="2" />
      <path d="M21 16l-5-5-9 9" />
    </template>
    <template v-else-if="name === 'scissors'">
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M8.2 8.2L20 20M8.2 15.8L20 4" />
    </template>
    <template v-else-if="name === 'code'">
      <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
    </template>
    <template v-else-if="name === 'box'">
      <path d="M12 2.5l8.5 4.5v10L12 21.5 3.5 17V7z" />
      <path d="M3.5 7L12 11.5 20.5 7M12 11.5v10" />
    </template>
    <template v-else-if="name === 'repeat'">
      <path d="M17 2l3 3-3 3" />
      <path d="M4 11V9a4 4 0 0 1 4-4h12" />
      <path d="M7 22l-3-3 3-3" />
      <path d="M20 13v2a4 4 0 0 1-4 4H4" />
    </template>
    <template v-else-if="name === 'chart'">
      <path d="M3 3v18h18" />
      <path d="M7 15l4-4 3 3 6-6" />
    </template>
  </svg>
</template>

<style scoped lang="scss">
.feature-icon {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
