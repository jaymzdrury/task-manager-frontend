"use client";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { DEFAULT_STATE, ID, useGlobalState } from "@/hooks/useGlobalState";
import { addUser } from "@/actions/users";
import { Button } from "@/components/ui/button";
import { idCheck, submitCountLimit } from "@/lib/formUtils";
import { t } from "@/lib/toast";
import { errMsg } from "@/lib/utils";
import { Id, Task } from "@/types/types";

export default function AddUserForm({
  id,
  name,
  task,
}: {
  id: Id;
  name: string;
  task: Task;
}): JSX.Element {
  const [, idSet] = useGlobalState(ID);
  const form = useForm();

  const onSubmit: SubmitHandler<FieldValues> = React.useCallback(async () => {
    try {
      idSet(task._id);
      const { success, error } = await addUser(task, id);
      !success ? t(`⚠️ ${error}`) : t(`✅ ${name} has been added to task`);
      idSet(DEFAULT_STATE);
    } catch (e) {
      t(`⚠️ ${errMsg(e)}`);
    }
  }, [task, id, idSet, name]);

  if (submitCountLimit(form)) t("⚠️ Too many tries");

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Button
        type="submit"
        disabled={submitCountLimit(form) || idCheck(id)}
        aria-disabled={submitCountLimit(form) || idCheck(id)}
        variant="ghost"
      >
        {name}
      </Button>
    </form>
  );
}
