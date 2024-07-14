"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TranslationContext } from "@/context/translation-context";
import { DEFAULT_STATE, ID, useGlobalState } from "@/hooks/useGlobalState";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteTask } from "../../actions/tasks";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { t } from "@/lib/toast";
import { idCheck, submitCountLimit } from "@/lib/formUtils";
import { cn, errMsg } from "@/lib/utils";
import { Id, IdProp } from "@/types/types";
import { id as idSchema } from "@/types/schemas";

import styles from "../../app/[locale]/styles.module.css";

export default function DeleteTask({ id }: { id: Id }): JSX.Element {
  const [, idSet] = useGlobalState(ID);
  const { dictonary } = React.useContext(TranslationContext);
  const form = useForm<IdProp>({
    defaultValues: { _id: id },
    resolver: zodResolver(z.object({ _id: idSchema })),
  });

  const onSubmit: SubmitHandler<IdProp> = React.useCallback(
    async (entry) => {
      try {
        idSet(entry._id);
        const { success, error } = await deleteTask(entry._id);
        !success ? t(`⚠️ ${error}`) : t("✅ Task was deleted");
        idSet(DEFAULT_STATE);
      } catch (e) {
        t(`⚠️ ${errMsg(e)}`);
      }
    },
    [idSet]
  );

  if (submitCountLimit(form)) t("⚠️ Too many tries");

  return (
    <DropdownMenuItem className={cn(styles.center, "w-full")}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Button
          type="submit"
          disabled={idCheck(id) || submitCountLimit(form)}
          aria-disabled={idCheck(id) || submitCountLimit(form)}
          className="text-destructive hover:text-destructive"
          variant="ghost"
        >
          {dictonary.delete}
        </Button>
      </form>
    </DropdownMenuItem>
  );
}
