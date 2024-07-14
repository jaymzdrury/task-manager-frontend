"use client";
import React from "react";
import { TranslationContext } from "@/context/translation-context";
import { translateComplete } from "@/lib/intl";
import { Complete, Role } from "@/types/types";

export default function ColumnTitle({ title }: { title: Complete | Role }) {
  const { dictonary } = React.useContext(TranslationContext);
  return (
    <h2 itemType="task status" className="text-2xl font-semibold">
      {translateComplete(title, dictonary)}
    </h2>
  );
}
