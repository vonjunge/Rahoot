import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

const env = createEnv({
  server: {
    WEB_ORIGIN: z.string().optional().default("http://localhost:3000"),
    SOCKET_PORT: z.string().optional().default("3001"),
    MANAGER_PASSWORD: z.string().min(1, "MANAGER_PASSWORD is required"),
  },

  runtimeEnv: {
    WEB_ORIGIN: process.env.WEB_ORIGIN,
    SOCKET_PORT: process.env.SOCKET_PORT,
    MANAGER_PASSWORD: process.env.MANAGER_PASSWORD,
  },
})

export default env
