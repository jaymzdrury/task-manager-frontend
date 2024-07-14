"server only";

import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { locales } from "./types/schemas";
import { Locale } from "./types/types";

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`./dictionaries/${locale}.json`)).default,
    timeZone: "Etc/UTC",
  };
});
