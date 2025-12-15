import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

const env = createEnv({
  server: {
    SOCKET_URL: z.string().default("http://localhost:3001"),
    BACKGROUND_IMAGE_URL: z.string().optional(),
  },

  runtimeEnv: {
    SOCKET_URL: process.env.SOCKET_URL,
    BACKGROUND_IMAGE_URL: process.env.BACKGROUND_IMAGE_URL,
  },
})

export default env
