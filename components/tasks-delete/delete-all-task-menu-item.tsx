"use client";
import React from "react";
import { TranslationContext } from "@/context/translation-context";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";

export default function DeleteAllTaskMenuItem({ length }: { length: number }) {
  const { dictonary } = React.useContext(TranslationContext);
  return (
    <DropdownMenuItem
      className={cn(
        !length ? "cursor-not-allowed" : "cursor-pointer",
        "w-28 justify-center"
      )}
    >
      {!length ? dictonary.deleteTask.invalid : dictonary.deleteTask.deleteAll}
    </DropdownMenuItem>
  );
}
