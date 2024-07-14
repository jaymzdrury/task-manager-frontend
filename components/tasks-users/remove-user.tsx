"use client";
import React from "react";
import { TranslationContext } from "@/context/translation-context";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { removeUser } from "../../actions/users";
import SubmitButton from "../common/submit-button";
import { DialogClose } from "../ui/dialog";
import { idCheck, submitCountLimit } from "@/lib/formUtils";
import { t } from "@/lib/toast";
import { errMsg } from "@/lib/utils";
import { Id, Task } from "@/types/types";

export default function RemoveUser({
  task,
  id,
}: {
  task: Task;
  id: Id;
}): JSX.Element {
  const { dictonary } = React.useContext(TranslationContext);
  const form = useForm();

  const onSubmit: SubmitHandler<FieldValues> = React.useCallback(async () => {
    try {
      const { success, error } = await removeUser(task, id);
      !success
        ? t(`⚠️ ${error}`)
        : t(
            `✅ ${
              task.users.find((u) => u._id === id)?.name
            } has been removed from task`
          );
    } catch (e) {
      t(`⚠️ ${errMsg(e)}`);
    }
  }, [task, id]);

  const handleOneUser = (e: React.FormEvent) => {
    e.preventDefault();
    t("⚠️ Must have one user");
  };

  if (submitCountLimit(form)) t("⚠️ Too many tries");

  return (
    <form
      onSubmit={
        task.users.length <= 1 ? handleOneUser : form.handleSubmit(onSubmit)
      }
    >
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
