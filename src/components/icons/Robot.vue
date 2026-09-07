<template>
  <svg viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" overflow="visible">
    <!-- antenna -->
    <circle cx="128" cy="28" r="10" fill="var(--icon-color)" class="robot-antenna" />
    <path
      d="M128 38V64"
      stroke="var(--icon-color)"
      stroke-width="var(--stroke-width, var(--stroke-md))"
      stroke-linecap="round"
      vector-effect="non-scaling-stroke"
    />

    <!-- ears -->
    <path
      d="M28 126V152"
      stroke="var(--icon-color)"
      stroke-width="var(--stroke-width, var(--stroke-md))"
      stroke-linecap="round"
      vector-effect="non-scaling-stroke"
    />
    <path
      d="M228 126V152"
      stroke="var(--icon-color)"
      stroke-width="var(--stroke-width, var(--stroke-md))"
      stroke-linecap="round"
      vector-effect="non-scaling-stroke"
    />

    <!-- head -->
    <rect
      x="44"
      y="64"
      width="168"
      height="146"
      rx="50"
      stroke="var(--icon-color)"
      stroke-width="var(--stroke-width, var(--stroke-md))"
      vector-effect="non-scaling-stroke"
    />

    <!-- eyes -->
    <circle cx="98" cy="132" r="15" fill="var(--icon-color)" />
    <circle cx="158" cy="132" r="15" fill="var(--icon-color)" />

    <!-- mouth -->
    <path
      d="M102 176C112 189 121 193 128 193C135 193 144 189 154 176"
      stroke="var(--icon-color)"
      stroke-width="var(--stroke-width, var(--stroke-md))"
      stroke-linecap="round"
      stroke-linejoin="round"
      vector-effect="non-scaling-stroke"
    />
  </svg>
</template>
