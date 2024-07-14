"use client";
import React from "react";
import { TranslationContext } from "@/context/translation-context";
import { SubmitHandler, useForm } from "react-hook-form";
import { deleteTask } from "@/actions/tasks";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "../common/submit-button";
import { DialogClose } from "../ui/dialog";
import { t } from "@/lib/toast";
import { idCheck, submitCountLimit } from "@/lib/formUtils";
import { errMsg } from "@/lib/utils";
import { id as idSchema } from "@/types/schemas";
import { Id, IdProp } from "@/types/types";

export default function RemoveTask({
  id,
  openSet,
}: {
  id: Id;
  openSet: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const { dictonary } = React.useContext(TranslationContext);
  const form = useForm<IdProp>({
    defaultValues: { _id: id },
    resolver: zodResolver(z.object({ _id: idSchema })),
  });

  const onSubmit: SubmitHandler<IdProp> = React.useCallback(
    async (entry) => {
      try {
        const { success, error } = await deleteTask(entry._id);
        !success ? t(`⚠️ ${error}`) : t("✅ Task was deleted");
        openSet(false);
      } catch (e) {
        t(`⚠️ ${errMsg(e)}`);
      }
    },
    [openSet]
  );

  if (submitCountLimit(form)) t("⚠️ Too many tries");

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <DialogClose>
        <SubmitButton
          form={form}
          className="w-fit text-white"
          variant="destructive"
          disabled={submitCountLimit(form) || idCheck(id)}
        >
          {dictonary.removeTask.remove}
        </SubmitButton>
      </DialogClose>
    </form>
  );
}
