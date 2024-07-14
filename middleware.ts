import { chain } from "./middlewares/chain";
import { nextIntlMiddleWare } from "./middlewares/nextIntl";
import { redirect } from "./middlewares/redirect";

const middlewares = [nextIntlMiddleWare, redirect];
export default chain(middlewares);

export const config = {
  matcher: ["/", "/(zh-tw|en)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
