import img0 from "../../../assets/images/projects/freerouter/0.webp";
import img1 from "../../../assets/images/projects/freerouter/1.webp";

import type { ProjectContent } from "../../types";

export default {
  title: "FreeRouter",
  theme: "dark",
  tags: ["node", "typescript", "fastify", "sqlite", "docker", "api"],
  videoBorder: true,
  source: "https://github.com/David-Raffo/FreeRouter",
  description:
    "<p class='description-hook'>Todos los modelos gratis detrás de un solo endpoint.</p><p>FreeRouter es un router de inferencia que se coloca delante de 24 proveedores gratuitos y expone una única API compatible con OpenAI. Metes tus claves, apuntas tu aplicación a <code>model: \"auto\"</code> y él decide a qué proveedor y a qué modelo va cada petición, sin que el cliente tenga que saber nada de eso.</p><p>Para elegir, puntúa a los candidatos combinando calidad y velocidad con tres perfiles configurables, y descarta de entrada a los que no llegan de contexto, se han quedado sin cuota o no tienen las capacidades que pide la petición. Si un proveedor contesta 429, aplica una penalización exponencial que se dobla en cada fallo consecutivo y reintenta en otro, así que la llamada sale adelante igualmente.</p><p>Backend en Node y TypeScript con Fastify, cuotas diarias persistidas en SQLite y panel en Vite y React para revisar el historial de llamadas, las credenciales y las claves de API. Las claves de proveedor se guardan cifradas con AES-256-GCM y todo se despliega con Docker Compose.</p>",
  components: [
    {
      type: "media",
      props: {
        type: "image",
        src: img0,
        alt: "Uso de FreeRouter desde un cliente compatible con OpenAI",
        caption: "Un endpoint compatible con OpenAI",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: img1,
        alt: "Esquema de cómo FreeRouter elige proveedor y modelo",
        caption: "Cómo elige proveedor y modelo",
      },
    },
  ],
} as const satisfies ProjectContent;
