import { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import TranslationContextProvider from "@/context/translation-context";
import NavBar from "@/components/navbar/navbar";
import FormCard from "../../../components/login/form-card";
import FormRegister from "@/components/login/form-register";
import { dictonary } from "@/lib/intl";
import { Locale } from "@/types/types";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Task Manager | Register",
  description: "This is the Task Manager Registration Page",
};

export default async function Register({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<JSX.Element> {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <TranslationContextProvider dictonary={dictonary(t)}>
      <NavBar />
      <FormCard title="Register" link={`/${locale}/login`}>
        <FormRegister values={["Name", "Email", "Password"]} />
      </FormCard>
    </TranslationContextProvider>
  );
}
