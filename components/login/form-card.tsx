"use client";
import React from "react";
import Link from "next/link";
import { TranslationContext } from "@/context/translation-context";
import FormContainer from "./form-container";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

import styles from "../../app/[locale]/styles.module.css";

type FormCardProps = {
  title: string;
  link: string;
};

export default function FormCard({
  title,
  link,
  children,
}: React.PropsWithChildren<FormCardProps>): JSX.Element {
  const { dictonary } = React.useContext(TranslationContext);

  return (
    <FormContainer>
      <CardHeader>
        <CardTitle>
          {title === "Login"
            ? dictonary.login.login
            : title === "Reset Password"
            ? dictonary.login.forgotPassword
            : title === "New Password"
            ? dictonary.login.newPassword
            : dictonary.login.register}
        </CardTitle>
        <CardDescription>{dictonary.login.description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="grid w-full items-center gap-2">
        {title === "Reset Password" || title === "New Password" ? undefined : (
          <Link
            className="flex justify-end w-full hover:underline text-xs -mt-2 pb-2"
            href="/reset-password"
          >
            {`${dictonary.login.forgotPassword}?`}
          </Link>
        )}
        <Separator className="dark:bg-zinc-600 my-2" />
        <Link
          className={cn(styles.center, "hover:underline w-full text-xs mt-2")}
          href={link}
        >
          {link.includes("register")
            ? `${dictonary.login.registerLink}?`
            : `${dictonary.login.loginLink}?`}
        </Link>
      </CardFooter>
    </FormContainer>
  );
}
