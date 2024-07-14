"use client";
import React from "react";
import { TranslationContext } from "@/context/translation-context";
import { FormLabel } from "../ui/form";

export default function AddTaskLabel({
  type,
}: {
  type: "title" | "description";
}) {
  const { dictonary } = React.useContext(TranslationContext);
  return (
    <FormLabel htmlFor={type}>
      {type === "title"
        ? dictonary.addTask.form.title
        : dictonary.addTask.form.description}
    </FormLabel>
  );
}
