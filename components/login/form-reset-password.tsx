"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { resetPassword as resetPasswordAction } from "../../actions/password";
import { TranslationContext } from "@/context/translation-context";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormComponent from "./form";
import { ResetPassword, UserValues } from "@/types/types";
import { resetPassword } from "@/types/schemas";
import { t } from "@/lib/toast";
import { errMsg, paths } from "@/lib/utils";

const defaultValues: ResetPassword = { email: "" };

export default function FormResetPassword({
  values,
}: {
  values: UserValues[];
}): JSX.Element {
  const { dictonary } = React.useContext(TranslationContext);
  const router = useRouter();
  const form = useForm<ResetPassword>({
    defaultValues,
    resolver: zodResolver(resetPassword),
  });

  const onSubmit: SubmitHandler<ResetPassword> = async (entry) => {
    try {
      const { success, error } = await resetPasswordAction(entry.email);
      if (success) {
        t("✅ Email Sent!");
        form.reset();
        router.push(paths.LOGIN);
      }
      if (error) t(`⚠️ ${errMsg(error)}`);
    } catch (e) {
      t(`⚠️ ${errMsg(e)}`);
    }
  };

  return (
    <FormComponent form={form} values={values} onSubmit={onSubmit}>
      {dictonary.login.editPassword}
    </FormComponent>
  );
}
