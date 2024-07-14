"use client";
import React from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { TranslationContext } from "@/context/translation-context";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { debounce } from "lodash";
import { Input } from "../ui/input";
import { t } from "@/lib/toast";
import { errMsg } from "@/lib/utils";

import styles from "../../app/[locale]/styles.module.css";

export default function SearchInput(): JSX.Element {
  const { dictonary } = React.useContext(TranslationContext);
  const form = useForm({ defaultValues: { text: "" } });

  const searchParams = useSearchParams();
  const pahtname = usePathname();
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = React.useCallback(
    async (entry) => {
      try {
        const params = new URLSearchParams(searchParams);
        entry.text ? params.set("search", entry.text) : params.delete("search");
        router.replace(`${pahtname}?${params.toString()}`);
      } catch (e) {
        t(`⚠️ ${errMsg(e)}`);
      }
    },
    [searchParams, pahtname, router]
  );

  const debouncedSubmit = debounce(onSubmit, 300);

  return (
    <Input
      itemType="search input"
      className={styles.searchInput}
      {...form.register("text", {
        onChange: form.handleSubmit(debouncedSubmit),
      })}
      type="search"
      placeholder={dictonary.search}
      defaultValue={
        searchParams ? searchParams.get("search")?.toString() : undefined
      }
    />
  );
}
