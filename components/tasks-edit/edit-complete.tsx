"use client";
import React from "react";
import { TranslationContext } from "@/context/translation-context";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { DEFAULT_STATE, ID, useGlobalState } from "@/hooks/useGlobalState";
import { editTask } from "@/actions/tasks";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/toast";
import { idCheck, submitCountLimit } from "@/lib/formUtils";
import { errMsg } from "@/lib/utils";
import { translateComplete } from "@/lib/intl";
import { Complete, Task } from "@/types/types";

export default function EditComplete({
  task,
  complete,
}: {
  task: Task;
  complete: Complete;
}): JSX.Element {
  const [, idSet] = useGlobalState(ID);
  const { dictonary } = React.useContext(TranslationContext);
  const form = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = React.useCallback(async () => {
    try {
      idSet(task._id);
      const { success, error } = await editTask(task, { complete });
      !success ? t(`⚠️ ${error}`) : t(`✅ Task moved to ${complete}`);
      idSet(DEFAULT_STATE);
    } catch (e) {
      t(`⚠️ ${errMsg(e)}`);
    }
  }, [task, complete, idSet]);

  if (submitCountLimit(form)) t("⚠️ Too many tries");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Button
          type="submit"
          disabled={idCheck(task._id) || submitCountLimit(form)}
          aria-disabled={idCheck(task._id) || submitCountLimit(form)}
          variant="ghost"
        >
          {translateComplete(complete, dictonary)}
        </Button>
      </form>
    </Form>
  );
}
