import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { CustomMiddleware } from "./chain";
import { cookieValues, paths } from "@/lib/utils";
import { cookies } from "next/headers";
import { env } from "@/types/env";
import { getLocale, locales } from "@/lib/intl";

export function redirect(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const path = request.nextUrl.pathname;
    const locale = `/${getLocale(path)}`;
    const auth = cookies().get(cookieValues.ACCESSTOKEN)?.value;

    let response = NextResponse.next();

    if (!locales.find((l) => `/${l}` === locale))
      response = NextResponse.redirect(env.CLIENT + `/${locales[0]}`);

    if (
      path !== locale + paths.LOGIN &&
      path !== locale + paths.REGISTER &&
      !auth
    ) {
      response = NextResponse.redirect(env.CLIENT + locale + paths.LOGIN);
    }

    if (
      (path === locale + paths.LOGIN || path === locale + paths.REGISTER) &&
      auth
    ) {
      response = NextResponse.redirect(env.CLIENT + locale + paths.TASKS);
    }

    return middleware(request, event, response);
  };
}
