import { env } from "@/types/env";
import { MetadataRoute } from "next";

export const dynamic = "error";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: env.CLIENT,
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];
}
