"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { login } from "@/actions/login";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "./form";
import { t } from "@/lib/toast";
import { submitCountLimit } from "@/lib/formUtils";
import { errMsg } from "@/lib/utils";
import { Login, UserValues } from "@/types/types";
import { login as loginType } from "@/types/schemas";
import { TranslationContext } from "@/context/translation-context";

const defaultValues: Login = { email: "", password: "" };

export default function FormLogin({
  values,
}: {
  values: UserValues[];
}): JSX.Element {
  const { dictonary } = React.useContext(TranslationContext);
  const router = useRouter();

  const form = useForm<Login>({
    defaultValues,
    resolver: zodResolver(loginType),
  });

  const onSubmit: SubmitHandler<Login> = async (entry) => {
    try {
      const { success, error } = await login(entry);
      !success ? t(`⚠️ ${error}`) : t("✅ Sign In Successful");
      router.push("/");
    } catch (e) {
      t(`⚠️ ${errMsg(e)}`);
    }
  };

  if (submitCountLimit(form)) t("⚠️ Too many tries");

  return (
    <Form form={form} values={values} onSubmit={onSubmit}>
      {dictonary.login.login}
    </Form>
  );
}
