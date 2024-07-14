import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "../../components/navbar/theme-provider";
import { Toaster } from "../../components/ui/toaster";
import { pageMetaData } from "@/lib/metadata";
import { locales } from "@/types/schemas";
import { Locale } from "@/types/types";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  preload: true,
  display: "swap",
});

export const metadata: Metadata = pageMetaData(
  "Task Manager | Home",
  "This is the Task Manager Home Page"
);

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  params: { locale: Locale };
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
  params: { locale },
}: React.PropsWithChildren<Props>): Promise<JSX.Element> {
  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
          <Toaster />
          {process.env.VERCEL && (
            <>
              <SpeedInsights />
              <Analytics />
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
