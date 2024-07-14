import { Metadata } from "next";
import TranslationContextProvider from "@/context/translation-context";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import NavBar from "@/components/navbar/navbar";
import FormCard from "@/components/login/form-card";
import FormResetPassword from "@/components/login/form-reset-password";
import { dictonary } from "@/lib/intl";
import { Locale } from "@/types/types";
import { REVALIDATE } from "@/types/schemas";

export const revalidate = REVALIDATE;

export const metadata: Metadata = {
  title: "Task Manager | Reset Password",
  description: "This is the Task Manager Reset Password Page",
};

export default async function ResetPassword({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<JSX.Element> {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <TranslationContextProvider dictonary={dictonary(t)}>
      <NavBar />
      <FormCard title="Reset Password" link={`/${locale}/login`}>
        <FormResetPassword values={["Email"]} />
      </FormCard>
    </TranslationContextProvider>
  );
}
