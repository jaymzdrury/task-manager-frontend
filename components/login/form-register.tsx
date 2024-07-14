"use client";

import React from "react";
import { TranslationContext } from "@/context/translation-context";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from "@/actions/login";
import FormComponent from "./form";
import { Register, UserValues } from "@/types/types";
import { register as registerType } from "@/types/schemas";
import { t } from "@/lib/toast";
import { submitCountLimit } from "@/lib/formUtils";
import { errMsg, paths } from "@/lib/utils";

const defaultValues: Register = { email: "", password: "", name: "" };

export default function FormRegister({
  values,
}: {
  values: UserValues[];
}): JSX.Element {
  const { dictonary } = React.useContext(TranslationContext);
  const router = useRouter();

  const form = useForm<Register>({
    defaultValues,
    resolver: zodResolver(registerType),
  });

  const onSubmit: SubmitHandler<Register> = async (entry) => {
    try {
      const { success, error } = await register(entry);
      !success ? t(`⚠️ ${error}`) : t("✅ Registration Successful");
      router.push(paths.LOGIN);
    } catch (e) {
      t(`⚠️ ${errMsg(e)}`);
    }
  };

  if (submitCountLimit(form)) t("⚠️ Too many tries");

  return (
    <FormComponent form={form} values={values} onSubmit={onSubmit}>
      {dictonary.login.register}
    </FormComponent>
  );
}
