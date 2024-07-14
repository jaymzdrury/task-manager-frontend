import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { defaultLocale, localePrefix, locales, pathnames } from "../lib/intl";
import { CustomMiddleware } from "./chain";

const nextIntlMiddleware = createMiddleware({
  defaultLocale,
  locales,
  pathnames,
  localePrefix,
});

export function nextIntlMiddleWare(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const response = NextResponse.next();
    nextIntlMiddleware(request);
    return middleware(request, event, response);
  };
}
