"use client";
import React from "react";
import { editTask } from "@/actions/tasks";
import { SubmitHandler, useForm } from "react-hook-form";
import TaskForm from "../common/task-form";
import { submitCountLimit, submitted } from "@/lib/formUtils";
import { t } from "@/lib/toast";
import { INPUT, editTask as editTaskSchema } from "@/types/schemas";
import { EditTask, Task } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { errMsg } from "@/lib/utils";

export default function EditTaskForm({ task }: { task: Task }): JSX.Element {
  const defaultValues = { title: task.title, description: task.description };
  const form = useForm({
    defaultValues,
    resolver: zodResolver(editTaskSchema),
  });

  const onSubmit: SubmitHandler<EditTask> = React.useCallback(
    async (entry) => {
      try {
        const { success, error } = await editTask(task, entry);
        !success ? t(`⚠️ ${error}`) : t("✅ Task has been edited");
      } catch (e) {
        t(`⚠️ ${errMsg(e)}`);
      }
    },
    [task]
  );

  if (submitCountLimit(form)) t("⚠️ Too many tries");

  return (
    <TaskForm
      form={form}
      onSubmit={onSubmit}
      inputDisabled={submitted(form) || submitCountLimit(form)}
      btnDisabled={
        form.watch("title")?.length < INPUT ||
        form.watch("description")?.length < INPUT
      }
    />
  );
}
