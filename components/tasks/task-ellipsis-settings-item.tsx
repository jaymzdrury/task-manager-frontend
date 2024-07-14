"use client";
import React from "react";
import { TranslationContext } from "@/context/translation-context";

export default function TaskEllipsisSettingsItem() {
  const { dictonary } = React.useContext(TranslationContext);
  return <span>{dictonary.settings}</span>;
}
