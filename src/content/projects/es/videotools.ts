import imgEditor from "../../../assets/images/projects/videotools/editor-dark.webp";
import imgColor from "../../../assets/images/projects/videotools/color.webp";
import imgTimeline from "../../../assets/images/projects/videotools/timeline.webp";
import imgHome from "../../../assets/images/projects/videotools/home.webp";
import imgQuick from "../../../assets/images/projects/videotools/quick-edit.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "Video Tools",
  theme: "dark",
  tags: ["python", "fastapi", "ffmpeg", "javascript", "webgl", "sqlite", "docker"],
  videoBorder: true,
  source: "https://github.com/David-Raffo/videotools",
  facts: [
    { label: "Año", value: "2026" },
    { label: "Rol", value: "Diseño y desarrollo" },
    { label: "Tipo", value: "Self-hosted · MIT" },
    { label: "Despliegue", value: "Docker · GPU VAAPI" },
  ],
  description:
    "<p class='description-hook'>Un editor de vídeo en el navegador. El render, en tu propio servidor.</p><p>Video Tools es una suite de edición completa que corre en un servidor doméstico y se usa desde cualquier navegador. La hice para sustituir un editor de escritorio en el día a día, sobre todo con tomas de dron, sin instalar nada en el portátil y dejando que la CPU y la GPU del servidor hagan el trabajo pesado.</p><p>El navegador edita un proxy ligero para que todo vaya fluido mientras los originales nunca salen del servidor: cada exportación se renderiza desde la fuente intacta con FFmpeg a máxima calidad. Timeline multipista, cambios de velocidad con audio que conserva el tono, LUTs propios, tone mapping HDR, subtítulos y una cola de render que sigue aunque cierres la pestaña.</p><p>FastAPI y SQLite en el backend, y un frontend en JavaScript puro, sin framework ni build, apoyado en Web Audio, WebGL2 y WebCodecs.</p>",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: imgEditor,
        alt: "Editor de Video Tools con el reproductor, el timeline y el panel de exportación",
        caption: "El editor",
        ratio: "1600 / 1311",
        frame: "videotools.home · editor",
      },
    },
    {
      type: "stats",
      props: {
        items: [
          { value: 33, suffix: "³", label: "LUT horneado en cada export" },
          { value: 16, suffix: " bits", label: "pipeline de color en RGB" },
          { value: 200, label: "pasos de deshacer y rehacer" },
          { value: 20, suffix: " GB", label: "subidas reanudables por defecto" },
        ],
      },
    },
    {
      type: "heading",
      props: {
        eyebrow: "Cómo funciona",
        title: "Editas sobre un proxy. <em>Renderizas desde el original.</em>",
        text: "Cada subida genera un proxy 720p, una pista de audio por stream, una forma de onda y una tira de miniaturas. Cada exportación compila toda la edición en un único <code>filter_complex</code> de FFmpeg.",
      },
    },
    {
      type: "diagram",
      props: {
        name: "video-timeline",
        caption: "Simulación: el cabezal, un clip a 2×, una región de audio atenuada y el grafo de render",
      },
    },
    {
      type: "features",
      props: {
        items: [
          {
            icon: "wave",
            title: "El audio marca el reloj",
            text: "Cada pista se decodifica en un AudioBuffer y se programa con Web Audio. Los cambios de velocidad se estiran con WSOLA para conservar el tono.",
          },
          {
            icon: "upload",
            title: "Editas mientras sube",
            text: "mp4box.js y WebCodecs leen el archivo local, así que forma de onda, miniaturas y sonido están listos en segundos, incluso con vídeos de varios GB.",
          },
          {
            icon: "cpu",
            title: "GPU si la hay",
            text: "Codificación y decodificación por hardware con VAAPI, vuelta automática a CPU y FFmpeg con prioridad baja para no ahogar al servidor.",
          },
          {
            icon: "film",
            title: "Cualquier formato",
            text: "H.264, H.265, AV1, VP9, GIF o MP3, por calidad o por tamaño objetivo con dos pasadas, y salida a 10 bits.",
          },
          {
            icon: "sparkles",
            title: "HDR y subtítulos",
            text: "Tone mapping de PQ y HLG a SDR con <code>zscale</code> y Hable, y subtítulos quemados o incrustados como pista.",
          },
          {
            icon: "scissors",
            title: "Edición rápida de dron",
            text: "Sueltas varios clips, indicas cuánto recortar de cada extremo y se renderizan uno tras otro con un preset fijo.",
          },
        ],
      },
    },
    {
      type: "heading",
      props: {
        eyebrow: "Pruébalo",
        title: "Etalonaje, <em>en directo</em>",
        text: "Elige un look o mueve los controles. En la app real el mismo ajuste se previsualiza en un shader WebGL2 y lo exporta FFmpeg.",
      },
    },
    {
      type: "diagram",
      props: {
        name: "color-grade",
        caption: "Demo interactiva: arrastra la imagen para comparar el antes y el después",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgColor,
        alt: "Panel de color con selector de LUT, controles y fotograma antes y después renderizado por el servidor",
        caption: "El panel de color real",
        captionAlign: "left",
        ratio: "1200 / 535",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgTimeline,
        alt: "Timeline multipista con un clip a 2x, una región de audio atenuada y una pista de música con fundidos",
        caption: "Timeline multipista",
        ratio: "1400 / 311",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgHome,
        alt: "Pantalla de proyectos con ediciones rápidas recientes y proyectos guardados",
        caption: "Proyectos y ediciones rápidas",
        captionAlign: "left",
        ratio: "1400 / 836",
        frame: "videotools.home",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgQuick,
        alt: "Diálogo de edición rápida de dron con recorte por vídeo",
        caption: "Recorte en lote para clips de dron",
        ratio: "900 / 551",
      },
    },
  ],
} as const satisfies ProjectContent;
