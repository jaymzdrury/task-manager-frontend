"use client";
import React from "react";
import { TranslationContext } from "@/context/translation-context";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import {
  confirmPasswordWatch,
  emailWatch,
  loginWatch,
  submitted,
} from "@/lib/formUtils";
import { UseForm } from "@/types/types";
import { PASSWORD } from "@/types/schemas";

export default function FormInput({
  form,
  type,
}: {
  form: UseForm;
  type: "Name" | "Email" | "Password" | "ConfirmPassword";
}): JSX.Element {
  const { dictonary } = React.useContext(TranslationContext);
  const lowerCase = type.toLowerCase() as
    | "email"
    | "password"
    | "name"
    | "confirmpassword";
  const confirmPassword = lowerCase === "confirmpassword";

  return (
    <FormField
      control={form.control}
      name={lowerCase}
      render={({ field }) => (
        <FormItem className="flex flex-col space-y-1.5">
          <FormLabel htmlFor={lowerCase}>
            {dictonary.login[lowerCase]}
          </FormLabel>
          <FormControl>
            <Input
              required
              autoComplete={type}
              type={
                lowerCase === "name"
                  ? "text"
                  : confirmPassword
                  ? "password"
                  : lowerCase
              }
              placeholder={dictonary.login[lowerCase]}
              disabled={
                confirmPassword
                  ? form.watch("password").length < PASSWORD
                  : submitted(form)
              }
              aria-disabled={submitted(form)}
              className={
                lowerCase === "email"
                  ? emailWatch(form, lowerCase)
                  : confirmPassword
                  ? confirmPasswordWatch(form)
                  : loginWatch(form, lowerCase)
              }
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
