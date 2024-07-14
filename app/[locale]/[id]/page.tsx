import { Metadata } from "next";
import TranslationContextProvider from "@/context/translation-context";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { getUser } from "@/actions/requests";
import NavBar from "@/components/navbar/navbar";
import FormCard from "@/components/login/form-card";
import FormNewPassword from "@/components/login/form-new-password";
import { dictonary } from "@/lib/intl";
import { Id, Locale } from "@/types/types";
import { REVALIDATE } from "@/types/schemas";

export const revalidate = REVALIDATE;

export const metadata: Metadata = {
  title: "Task Manager | New Password",
  description: "This is the Task Manager New Password Page",
};

export default async function NewPassword({
  params: { locale, id },
}: {
  params: { locale: Locale; id: Id };
}): Promise<JSX.Element> {
  unstable_setRequestLocale(locale);
  const [user, t] = await Promise.all([
    getUser(id),
    getTranslations({ locale }),
  ]);

  return (
    <TranslationContextProvider dictonary={dictonary(t)}>
      <NavBar />
      <FormCard title="New Password" link={`/${locale}/login`}>
        <FormNewPassword values={["Password", "ConfirmPassword"]} user={user} />
      </FormCard>
    </TranslationContextProvider>
  );
}
