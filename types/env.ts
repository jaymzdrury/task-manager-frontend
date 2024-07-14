import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    SERVER_USER: z.string().url(),
    SERVER_PASSWORD: z.string().url(),
    SERVER_TASKS: z.string().url(),
    SERVER_AI: z.string().url(),
    SERVER_CACHE: z.string().url(),
    CLIENT: z.string().url(),
    TWITTER_URL: z.string().url(),
    RESEND: z.string(),
    OWNER_EMAIL: z.string().email(),
  },
  runtimeEnv: {
    SERVER_USER: process.env.SERVER_USER,
    SERVER_PASSWORD: process.env.SERVER_PASSWORD,
    SERVER_TASKS: process.env.SERVER_TASKS,
    SERVER_AI: process.env.SERVER_AI,
    SERVER_CACHE: process.env.SERVER_CACHE,
    CLIENT: process.env.CLIENT,
    TWITTER_URL: process.env.TWITTER_URL,
    RESEND: process.env.RESEND,
    OWNER_EMAIL: process.env.OWNER_EMAIL,
  },
});
