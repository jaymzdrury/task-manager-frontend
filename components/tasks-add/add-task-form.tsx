"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addTask } from "@/actions/tasks";

import TaskForm from "../common/task-form";
import { FormControl, FormField, FormItem } from "../ui/form";
import {
  Select,
  SelectChevron,
  SelectContent,
  SelectGroup,
  SelectTrigger,
} from "../ui/select";

import { t } from "@/lib/toast";
import { submitCountLimit, submitted, watch } from "@/lib/formUtils";
import { errMsg } from "@/lib/utils";
import { AddTask, Complete } from "@/types/types";
import {
  ID_MIN_LENGTH,
  INPUT,
  addTask as addTaskSchema,
} from "@/types/schemas";
import AddTaskSelect from "./add-task-select";

type AddTaskFormProps = {
  openSet: React.Dispatch<React.SetStateAction<boolean>>;
  complete: Complete;
};

export default function AddTaskForm({
  openSet,
  complete,
  children,
}: React.PropsWithChildren<AddTaskFormProps>): JSX.Element {
  const defaultValues: AddTask = {
    title: "",
    description: "",
    users: "",
    complete,
    date: new Date(Date.now()),
  };

  const form = useForm<AddTask>({
    defaultValues,
    resolver: zodResolver(addTaskSchema),
  });

  const onSubmit: SubmitHandler<AddTask> = React.useCallback(
    async (entry) => {
      try {
        const { success, error } = await addTask(entry);
        !success ? t(`⚠️ ${error}`) : t("✅ Task has been added");
        openSet(false);
      } catch (e) {
        t(`⚠️ ${errMsg(e)}`);
      }
    },
    [openSet]
  );

  if (submitCountLimit(form)) t("⚠️ Too many tries");

  return (
    <TaskForm
      form={form}
      onSubmit={onSubmit}
      inputDisabled={submitted(form) || submitCountLimit(form)}
      btnDisabled={
        form.watch("title")?.length < INPUT ||
        form.watch("description")?.length < INPUT ||
        form.watch("users")?.length < ID_MIN_LENGTH
      }
    >
      <FormField
        control={form.control}
        name="users"
        render={({ field }) => (
          <FormItem className="py-2">
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className={watch(form, "users")}>
                  <AddTaskSelect />
                  <SelectChevron />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>{children}</SelectGroup>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </TaskForm>
  );
}
