import { env } from "@/types/env";
import { Metadata } from "next";

export const pageMetaData = (title: string, description: string) =>
  ({
    metadataBase: new URL(env.CLIENT),
    title: title,
    description: description,
    robots: { index: true, follow: true },
    twitter: {
      card: "summary",
      title: title,
      description: description,
      creator: "@jaymzdrury",
      images: {
        url: env.TWITTER_URL,
        alt: "Twitter",
      },
    },
    icons: {
      icon: "/img/task.webp",
    },
    openGraph: {
      title: title,
      description: description,
      siteName: "Task Manager",
      type: "website",
      images: env.TWITTER_URL,
    },
  } as Metadata);
