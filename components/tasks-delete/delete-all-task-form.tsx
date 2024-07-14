"use client";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { deleteAllTask } from "@/actions/tasks";
import SubmitButton from "../common/submit-button";
import { DialogClose } from "../ui/dialog";
import { submitCountLimit } from "@/lib/formUtils";
import { t } from "@/lib/toast";
import { errMsg } from "@/lib/utils";
import { Complete } from "@/types/types";
import { complete } from "@/types/schemas";

export default function DeleteAllTaskForm({
  title,
}: {
  title: Complete;
}): JSX.Element {
  const { success } = complete.safeParse(title);
  const form = useForm();

  const onSubmit: SubmitHandler<FieldValues> = React.useCallback(async () => {
    try {
      const { success, error } = await deleteAllTask(title);
      !success ? t(`⚠️ ${error}`) : t(`✅ All ${title} Tasks Deleted`);
    } catch (e) {
      t(`⚠️ ${errMsg(e)}`);
    }
  }, [title]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <DialogClose>
        <SubmitButton
          form={form}
          className="w-fit text-white"
          variant="destructive"
          disabled={submitCountLimit(form) || !success}
        >
          Yes
        </SubmitButton>
      </DialogClose>
    </form>
  );
}
