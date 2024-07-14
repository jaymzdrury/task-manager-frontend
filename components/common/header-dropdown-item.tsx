"use client";
import React from "react";
import { SelectItem } from "../ui/select";
import { TranslationContext } from "@/context/translation-context";
import { HeaderDropdownValues } from "@/types/types";

export default function HeaderDropdownItem({
  value,
}: {
  value: HeaderDropdownValues;
}) {
  const { dictonary } = React.useContext(TranslationContext);
  return (
    <SelectItem className="py-4 text-center" value={value}>
      {value === "This Week"
        ? dictonary.searchParams.current
        : dictonary.searchParams.previous}
    </SelectItem>
  );
}
