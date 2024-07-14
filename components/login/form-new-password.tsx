"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { newPassword as newPasswordAction } from "../../actions/password";
import { TranslationContext } from "@/context/translation-context";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormComponent from "./form";
import { NewPassword, User, UserValues } from "@/types/types";
import { newPassword } from "@/types/schemas";
import { t } from "@/lib/toast";
import { errMsg, paths } from "@/lib/utils";

const defaultValues = { password: "", confirmpassword: "" };

export default function FormNewPassword({
  values,
  user,
}: {
  values: UserValues[];
  user: User;
}): JSX.Element {
  const { dictonary } = React.useContext(TranslationContext);
  const router = useRouter();
  const form = useForm<NewPassword>({
    defaultValues,
    resolver: zodResolver(newPassword),
  });

  const onSubmit: SubmitHandler<NewPassword> = async (entry) => {
    try {
      const { success, error } = await newPasswordAction(user, {
        password: entry.password,
      });

      if (success) {
        t("✅ Password Successfully Updated");
        router.push(paths.LOGIN);
      }

      if (error) t(`⚠️ ${errMsg(error)}`);
    } catch (e) {
      t(`⚠️ ${errMsg(e)}`);
    }
  };

  return (
    <FormComponent form={form} values={values} onSubmit={onSubmit}>
      {dictonary.login.newPassword}
    </FormComponent>
  );
}
