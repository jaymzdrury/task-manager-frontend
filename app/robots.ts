import { env } from "@/types/env";
import { MetadataRoute } from "next";

export const dynamic = "error";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${env.CLIENT}/sitemap.ts`,
  };
}
