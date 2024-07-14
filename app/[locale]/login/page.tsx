import { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import NavBar from "@/components/navbar/navbar";
import FormCard from "@/components/login/form-card";
import FormLogin from "@/components/login/form-login";
import TranslationContextProvider from "@/context/translation-context";
import { dictonary } from "@/lib/intl";
import { Locale } from "@/types/types";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Task Manager | Login",
  description: "This is the Task Manager Login Page",
};

export default async function Login({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<JSX.Element> {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <TranslationContextProvider dictonary={dictonary(t)}>
      <NavBar />
      <FormCard title="Login" link={`/${locale}/register`}>
        <FormLogin values={["Email", "Password"]} />
      </FormCard>
    </TranslationContextProvider>
  );
}
