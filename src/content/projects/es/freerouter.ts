import imgStatus from "../../../assets/images/projects/freerouter/estado.webp";
import imgRequests from "../../../assets/images/projects/freerouter/peticiones.webp";
import imgProviders from "../../../assets/images/projects/freerouter/proveedores.webp";
import imgKeys from "../../../assets/images/projects/freerouter/api-keys.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "FreeRouter",
  theme: "dark",
  tags: ["node", "typescript", "fastify", "react", "sqlite", "docker", "api"],
  videoBorder: true,
  source: "https://github.com/David-Raffo/FreeRouter",
  facts: [
    { label: "Año", value: "2026" },
    { label: "Rol", value: "Diseño y desarrollo" },
    { label: "Tipo", value: "Open source · MIT" },
    { label: "Despliegue", value: "Docker Compose" },
  ],
  description:
    "<p class='description-hook'>Todos los modelos gratis detrás de un solo endpoint.</p><p>FreeRouter es un router de inferencia que se coloca delante de 24 proveedores gratuitos y expone una única API compatible con OpenAI. Metes tus claves una vez, apuntas cualquier cliente a <code>model: \"auto\"</code> y él decide qué proveedor y qué modelo sirve cada petición. El cliente no elige modelo, no sabe quién ha respondido y no gestiona reintentos.</p><p>Puntúa a cada candidato con calidad y velocidad medidas según tres perfiles, descarta de entrada a los que no llegan de contexto, se han quedado sin cuota o no tienen las capacidades que pide la petición, y si aun así un proveedor contesta 429 lo aparta con una penalización que se dobla en cada repetición y reintenta en otro. La llamada sale adelante igualmente.</p><p>Node y TypeScript con Fastify, cuotas persistidas en SQLite, panel en React para modelos, historial, proveedores y claves, credenciales cifradas con AES-256-GCM y todo desplegado con Docker Compose.</p>",
  components: [
    {
      type: "stats",
      props: {
        items: [
          { value: 24, label: "proveedores gratis tras una API" },
          { value: 630, prefix: "~", label: "modelos con nota de calidad" },
          { value: 3, label: "perfiles: rápido, balanceado, calidad" },
          { value: 6, suffix: " h", label: "penalización máxima, doblando desde 1 min" },
        ],
      },
    },
    {
      type: "heading",
      props: {
        eyebrow: "Cómo enruta",
        title: "Él elige el modelo. <em>Tú solo mandas la petición.</em>",
        text: "Los candidatos se filtran por cuota, contexto y capacidades y se ordenan en una escala absoluta. Si el mejor falla, responde el siguiente antes de que el cliente se entere.",
      },
    },
    {
      type: "diagram",
      props: {
        name: "freerouter-flow",
        caption: "Simulación en vivo: puntuación, un 429, la penalización y un reintento invisible",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgStatus,
        alt: "Panel de FreeRouter con cada modelo, su TTFT, tokens por segundo y nota de calidad",
        caption: "Cada modelo, medido",
        ratio: "1905 / 981",
        frame: "localhost:8787/app · estado",
      },
    },
    {
      type: "features",
      props: {
        items: [
          {
            icon: "gauge",
            title: "Puntuación absoluta",
            text: "La velocidad satura a 200 tok/s y la calidad cae de forma cuadrática por debajo de un Intelligence Index de 15, así que un modelo rápido pero inútil nunca gana el primer puesto.",
          },
          {
            icon: "clock",
            title: "Cuota antes del 429",
            text: "Los límites por minuto y por día se llevan por modelo o por cuenta y se corrigen en tiempo real con las cabeceras <code>x-ratelimit-*</code>.",
          },
          {
            icon: "repeat",
            title: "Penalización que aprende",
            text: "Un minuto la primera vez, doblando en cada repetición hasta seis horas. Un solo acierto la reinicia.",
          },
          {
            icon: "layers",
            title: "Capacidades a demanda",
            text: "Si mandas una imagen o defines tools, la petición solo va a modelos con visión o tool use, declare lo que declare la clave.",
          },
          {
            icon: "shield",
            title: "Seguro por defecto",
            text: "Claves de proveedor cifradas con AES-256-GCM y un servidor que se niega a arrancar sin contraseña.",
          },
          {
            icon: "route",
            title: "Todo trazable",
            text: "Cada petición guarda el modelo elegido, los intentos y la latencia de cada uno, con su cronología en el panel.",
          },
        ],
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgRequests,
        alt: "Historial de peticiones con API key, modelo elegido, latencia e intentos",
        caption: "Reintentos que el cliente ni notó",
        captionAlign: "left",
        ratio: "1907 / 975",
        frame: "localhost:8787/app · peticiones",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgProviders,
        alt: "Tarjetas de proveedores con sus límites reales y avisos",
        caption: "Pegas la clave y listo",
        ratio: "1089 / 801",
        frame: "localhost:8787/app · proveedores",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: imgKeys,
        alt: "Creación de una API key eligiendo perfil y capacidades",
        caption: "Las claves eligen perfil, no modelo",
        captionAlign: "left",
        ratio: "1062 / 797",
        frame: "localhost:8787/app · api keys",
      },
    },
  ],
} as const satisfies ProjectContent;
