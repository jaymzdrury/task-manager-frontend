"use client";
import React from "react";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TranslationContext } from "@/context/translation-context";
const HeaderDropdownMenuLazy = dynamic(() =>
  import("./header-dropdown-menu").then((mod) => mod.default)
);
import {
  Select,
  SelectChevron,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { HeaderDropdownValues } from "@/types/types";

export default function HeaderDropdown({
  values,
}: {
  values: HeaderDropdownValues[];
}): JSX.Element {
  const { dictonary } = React.useContext(TranslationContext);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const onChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    value === values[0]
      ? params.set("search", "gte")
      : params.set("search", "lte");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select onValueChange={onChange}>
      <SelectTrigger
        aria-label="select week dropdown button"
        className="w-fit space-x-2 border-none text-md"
      >
        <SelectValue
          className="text-md"
          placeholder={dictonary.searchParams.placeholder}
        />
        <SelectChevron />
      </SelectTrigger>
      <HeaderDropdownMenuLazy values={values} />
    </Select>
  );
}
