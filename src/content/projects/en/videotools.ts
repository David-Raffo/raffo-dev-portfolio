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
    { label: "Year", value: "2026" },
    { label: "Role", value: "Design & development" },
    { label: "Type", value: "Self-hosted · MIT" },
    { label: "Deploy", value: "Docker · VAAPI GPU" },
  ],
  description:
    "<p class='description-hook'>A video editor in the browser. The rendering on your own server.</p><p>Video Tools is a full editing suite that runs on a home server and is used from any browser. I built it to replace a desktop editor for everyday work, mostly drone footage, without installing anything on the laptop and letting the server's CPU and GPU do the heavy lifting.</p><p>The browser edits a lightweight proxy for a fluid experience while the originals never leave the server: every export is rendered from the untouched source with FFmpeg at full quality. Multi-track timeline, speed changes with pitch-preserving audio, custom LUTs, HDR tone mapping, subtitles and a render queue that keeps going if you close the tab.</p><p>FastAPI and SQLite on the backend, and a vanilla JavaScript frontend with no framework and no build step, driven by Web Audio, WebGL2 and WebCodecs.</p>",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: imgEditor,
        alt: "Video Tools editor with the player, the timeline and the export panel",
        caption: "The editor",
        ratio: "1600 / 1311",
        frame: "videotools.home · editor",
      },
    },
    {
      type: "stats",
      props: {
        items: [
          { value: 33, suffix: "³", label: "LUT baked per export" },
          { value: 16, suffix: "-bit", label: "RGB color pipeline" },
          { value: 200, label: "undo and redo steps" },
          { value: 20, suffix: " GB", label: "resumable uploads by default" },
        ],
      },
    },
    {
      type: "heading",
      props: {
        eyebrow: "How it works",
        title: "Edit on a proxy. <em>Render from the original.</em>",
        text: "Every upload gets a 720p proxy, one audio track per stream, a waveform and a thumbnail strip. Each export compiles the whole edit into a single FFmpeg <code>filter_complex</code>.",
      },
    },
    {
      type: "diagram",
      props: {
        name: "video-timeline",
        caption: "Simulation: the playhead, a 2× clip, a lowered audio region and the render graph",
      },
    },
    {
      type: "features",
      props: {
        items: [
          {
            icon: "wave",
            title: "Audio is the master clock",
            text: "Every track is decoded into an AudioBuffer and scheduled with Web Audio. Speed changes are time-stretched with WSOLA so pitch is preserved.",
          },
          {
            icon: "upload",
            title: "Edit while it uploads",
            text: "mp4box.js and WebCodecs read the local file, so waveform, thumbnails and sound are ready in seconds, even for multi-GB videos.",
          },
          {
            icon: "cpu",
            title: "GPU when there is one",
            text: "VAAPI hardware encoding and decoding with an automatic CPU fallback, and FFmpeg niced so renders never starve the server.",
          },
          {
            icon: "film",
            title: "Every format",
            text: "H.264, H.265, AV1, VP9, GIF or MP3, by quality or by target size with two-pass encoding, plus 10-bit output.",
          },
          {
            icon: "sparkles",
            title: "HDR and subtitles",
            text: "PQ and HLG tone mapping to SDR with <code>zscale</code> and Hable, and subtitles burned in or embedded as a track.",
          },
          {
            icon: "scissors",
            title: "Quick drone edit",
            text: "Drop several clips, set how much to trim from each end and they render one after another with a fixed preset.",
          },
        ],
      },
    },
    {
      type: "heading",
      props: {
        eyebrow: "Try it",
        title: "Color grading, <em>live</em>",
        text: "Pick a look or move the sliders. In the real app the same grade is previewed in a WebGL2 shader and exported by FFmpeg.",
      },
    },
    {
      type: "diagram",
      props: {
        name: "color-grade",
        caption: "Interactive demo: drag the image to compare before and after",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgColor,
        alt: "Color panel with LUT selector, sliders and a before and after frame rendered by the server",
        caption: "The real color panel",
        captionAlign: "left",
        ratio: "1200 / 535",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgTimeline,
        alt: "Multi-track timeline with a 2x clip, a lowered audio region and a music track with fades",
        caption: "Multi-track timeline",
        ratio: "1400 / 311",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgHome,
        alt: "Projects screen with recent quick edits and saved projects",
        caption: "Projects and quick edits",
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
        alt: "Quick drone edit dialog with per-video trimming",
        caption: "Batch trimming for drone clips",
        ratio: "900 / 551",
      },
    },
  ],
} as const satisfies ProjectContent;
