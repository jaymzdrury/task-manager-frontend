"use client";
import { TranslationContext } from "@/context/translation-context";
import React from "react";

export default function HeaderTitle({
  title,
}: {
  title: "Tasks" | "Users" | "";
}) {
  const { dictonary } = React.useContext(TranslationContext);
  return (
    <h1 aria-hidden={!title.length} className="text-4xl font-semibold">
      {title === "Tasks"
        ? dictonary.drawer.tasks
        : title.length
        ? dictonary.drawer.users
        : ""}
    </h1>
  );
}
