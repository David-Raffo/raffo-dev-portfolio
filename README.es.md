<div align="center">

# raffo.dev

[English](README.md) · **Español**

**Portfolio personal de David Raffo — AI Automation Developer.**
Una web interactiva en 3D que muestra proyectos de automatización de procesos, agentes de IA y desarrollo full stack.

[![Web](https://img.shields.io/badge/web-raffo.dev-000000?logo=googlechrome&logoColor=white)](https://raffo.dev)
[![CI](https://github.com/David-Raffo/raffo-dev-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/David-Raffo/raffo-dev-portfolio/actions/workflows/ci.yml)
![Vue 3](https://img.shields.io/badge/Vue-3-4FC08D?logo=vuedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![three.js](https://img.shields.io/badge/three.js-r181-000000?logo=threedotjs&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock&logoColor=white)

<a href="https://raffo.dev"><img src="public/meta/og-image.webp" alt="Vista previa de raffo.dev" width="100%"></a>

</div>

---

## Descripción

[raffo.dev](https://raffo.dev) es mi portfolio personal. En lugar de una lista estática de proyectos, es una experiencia interactiva construida con WebGL: una habitación en 3D, escenas animadas con el scroll, diseño sonoro y alguna sorpresa escondida, manteniendo el contenido rápido y bilingüe.

## Puntos destacados

- **Escenas 3D en tiempo real** con three.js y shaders GLSL propios: una habitación con una terminal funcional detrás del monitor, un avatar, un laboratorio y una escena de contacto animada.
- **Animaciones fluidas guiadas por el scroll** con GSAP y Lenis.
- **Contenido bilingüe** en inglés y español, con selector de idioma y páginas legales traducidas.
- **Chatbot con IA** hecho con n8n, cargado de forma diferida para no ralentizar la primera carga.
- **Diseño sonoro** con Howler, que se puede activar o desactivar en cualquier momento.
- **Easter eggs**: un Tetris jugable escondido detrás de la carta en la escena de contacto y una terminal interactiva.
- **Recursos optimizados**: modelos GLB comprimidos (meshopt), imágenes WebP y código dividido en chunks.
- **Preparado para SEO**: tarjetas Open Graph y Twitter, URL canónica, `robots.txt` y páginas de privacidad y aviso legal.

## Proyectos destacados

| Proyecto | Descripción |
|---|---|
| **AI Shop Helper** | SaaS que automatiza el eCommerce y el marketing digital con agentes de IA (n8n, LangGraph, Make). |
| [**Video Tools**](https://github.com/David-Raffo/videotools) | Editor de vídeo web autoalojado: edición sobre proxy, reloj de Web Audio, previsualización de LUT en WebGL2 y render a máxima calidad con FFmpeg. |
| [**FreeRouter**](https://github.com/David-Raffo/FreeRouter) | Router compatible con OpenAI delante de 24 proveedores de inferencia gratuita, con control de cuotas y failover automático. |
| **ContextChatbot** | Chatbot autoalojable en n8n para cualquier web, en versión landing y versión tienda con RAG. |
| **Aplicaciones Web (IA)** | [Aprende Ajedrez](https://github.com/David-Raffo/aprende-ajedrez), [Pokémon Stat Master](https://github.com/David-Raffo/pokemon-stat-master), [Montón](https://github.com/David-Raffo/descubre-peliculas) y Quitafondos, un quitafondos por lotes. |
| **Web Portfolio** | Webs realizadas para clientes de distintos sectores. |

Cada caso de estudio combina capturas reales con diagramas animados que se adaptan al tema de cada proyecto (simulación de enrutado, timeline del editor, etalonaje interactivo, flujos del chatbot y de los agentes), hechos con SVG y GSAP.

## Tecnologías

| Área | Tecnología |
|---|---|
| Framework | Vue 3 (`<script setup>`), TypeScript |
| Compilación | Vite 7, vue-tsc, vite-plugin-glsl |
| 3D y gráficos | three.js, shaders GLSL, modelos glTF / GLB |
| Animación | GSAP, Lenis |
| Audio | Howler |
| Estilos | SCSS con mixins compartidos |
| Chatbot | `@n8n/chat` |

## Primeros pasos

Requisitos: Node.js 22 o superior.

```bash
git clone https://github.com/David-Raffo/raffo-dev-portfolio.git
cd raffo-dev-portfolio
npm install
npm run dev
```

El servidor de desarrollo se abre en <http://localhost:3000>.

### Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo en el puerto **3000** |
| `npm run build` | Comprobación de tipos con `vue-tsc` y compilación de producción en `dist/` |
| `npm run preview` | Sirve la compilación de producción en local |
| `npm run typecheck` | Solo comprobación de tipos |
| `npm run models` | Comprime los modelos 3D |

### Variables de entorno

| Variable | Descripción |
|---|---|
| `VITE_SHOW_ATTRIBUTION` | Muestra en el pie de página el crédito al concepto original. |

## Estructura del proyecto

```
src/
├── assets/          # Imágenes, modelos y estilos SCSS
├── components/      # Componentes de interfaz reutilizables
├── composables/     # Composables de Vue
├── content/
│   ├── projects/    # Casos de estudio en en/ y es/
│   └── social.ts    # Enlaces a redes
├── features/        # Inicio, proyectos, sonidos y Tetris
├── i18n/            # Traducciones y utilidades de idioma
├── three/           # Escenas 3D, objetos y shaders GLSL
└── main.ts
public/              # Archivos estáticos, imágenes meta y páginas legales
scripts/             # Compresión de modelos
```

### Añadir un proyecto

1. Crea el contenido en `src/content/projects/en/<slug>.ts` y `src/content/projects/es/<slug>.ts`.
2. Registra el slug en `projectIds` dentro de `src/content/projects/index.ts`.
3. Añade su vista previa en `src/content/projects/previews/`.
4. Las etiquetas y sus variantes están en `src/components/tagVariants.ts`.
5. Monta la página con los bloques de `src/features/projects/types.ts`: `media`, `heading`, `stats`, `features`, `apps`, `marquee` y `diagram` (los diagramas animados están en `src/features/projects/components/diagrams/`).

## Contacto

- Web: [raffo.dev](https://raffo.dev)
- Correo: [david@raffo.dev](mailto:david@raffo.dev)
- LinkedIn: [david-raf-loz](https://www.linkedin.com/in/david-raf-loz/)
- GitHub: [@David-Raffo](https://github.com/David-Raffo)

## Créditos y atribución

Este proyecto fue creado y diseñado por David Heckhoff.

Si usas este proyecto o partes sustanciales de su código como base para tu propio portfolio o trabajo, debes mantener la atribución.

Por favor, conserva:

- los comentarios de créditos existentes en el código fuente
- esta sección de atribución en el README
- una referencia visible al proyecto/repositorio original en los trabajos derivados

Portfolio original:
-> https://david-hckh.com

Queda prohibida la reutilización comercial o la redistribución de partes sustanciales de este proyecto sin permiso.

Música producida por [HM Surf](https://soundcloud.com/hmsurf).

## Licencia

Distribuido según los términos de [license.md](license.md): solo para uso personal y educativo, con atribución al autor original.
