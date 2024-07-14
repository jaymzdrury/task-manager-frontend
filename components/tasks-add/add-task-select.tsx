"use client";
import React from "react";
import { TranslationContext } from "@/context/translation-context";
import { SelectValue } from "../ui/select";

export default function AddTaskSelect() {
  const { dictonary } = React.useContext(TranslationContext);
  return <SelectValue placeholder={dictonary.addTask.form.select} />;
}
