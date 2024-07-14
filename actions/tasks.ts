"use server";
import { revalidateTag } from "next/cache";
import { taskAdd, taskDelete, taskDeleteAll, taskEdit } from "@/db/tasks";
import { redisDelete } from "@/db/redis";
import { send } from "@/components/email/send";
import { tags } from "@/lib/utils";
import { AddTask, Complete, Id, Task } from "@/types/types";
import {
  addTask as addTaskSchema,
  id as idSchema,
  complete as completeSchema,
} from "@/types/schemas";
import { taskParse } from "@/types/parse";

export async function deleteTask(id: Id) {
  const { success } = idSchema.safeParse(id);

  if (!success) return { success: false, error: "Invalid Schema" };

  const { error: redisError } = await redisDelete("tasks");

  const { error } = await taskDelete(id);

  if (error || redisError)
    return { success: false, error: error || redisError };

  revalidateTag(tags.TASKS);

  return { success: true, error };
}

export async function deleteAllTask(complete: Complete) {
  const { success } = completeSchema.safeParse(complete);

  if (!success) return { success: false, error: "Invalid Schema" };

  const { error: redisError } = await redisDelete("tasks");

  const { error } = await taskDeleteAll(complete);

  if (error || redisError)
    return { success: false, error: error || redisError };

  revalidateTag(tags.TASKS);

  return { success: true, error };
}

export async function addTask(formData: AddTask) {
  const { success } = addTaskSchema.safeParse(formData);
  const addTaskData = addTaskSchema.parse(formData);

  if (!success) return { success: false, error: "Invalid Schema" };

  const { error: redisError } = await redisDelete("tasks");

  const { error } = await taskAdd(addTaskData);

  if (error || redisError)
    return { success: false, error: error || redisError };

  revalidateTag(tags.TASKS);

  return { success: true, error };
}

export async function editTask(task: Task, partialTask: Partial<Task>) {
  const { success } = taskParse({
    ...task,
    ...partialTask,
    date: new Date(task.date),
  });

  if (!success) return { success: false, error: "Invalid Schema" };

  const { error: redisError } = await redisDelete("tasks");

  const { error } = await taskEdit(task, partialTask);

  if (error || redisError)
    return { success: false, error: error || redisError };

  partialTask.complete && partialTask.complete === "Done"
    ? send(task)
    : undefined;

  revalidateTag(tags.TASKS);

  return { success: true, error };
}
