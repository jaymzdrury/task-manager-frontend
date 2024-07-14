"use server";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { userAdd, userEdit, userRemove } from "@/db/user";
import { redisDelete } from "@/db/redis";
import { cookieValues, tags } from "@/lib/utils";
import { Id, Task, User } from "@/types/types";
import { id as idSchema, user as userSchema } from "@/types/schemas";
import { taskParse } from "@/types/parse";

export async function addUser(task: Task, userId: Id) {
  const { success } = taskParse(task);
  const { success: idSuccess } = idSchema.safeParse(userId);

  if (!success && !idSuccess)
    return { success: false, error: "Invalid Schema" };

  const { error: redisError } = await redisDelete("tasks");

  const { error } = await userAdd(task, userId);

  if (error || redisError)
    return { success: false, error: error || redisError };

  revalidateTag(tags.TASKS);

  return { success: true, error };
}

export async function removeUser(task: Task, userId: Id) {
  const { success } = taskParse(task);
  const { success: idSuccess } = idSchema.safeParse(userId);

  if (!success && !idSuccess)
    return { success: false, error: "Invalid Schema" };

  const { error: redisError } = await redisDelete("tasks");

  const { error } = await userRemove(task, userId);

  if (error || redisError)
    return { success: false, error: error || redisError };

  revalidateTag(tags.TASKS);

  return { success: true, error };
}

export async function editUser(user: User, partialUser: Partial<User>) {
  const { success } = userSchema.safeParse({ ...user, ...partialUser });

  if (!success) return { success: false, error: "Invalid Schema" };

  const { error: redisError } = await redisDelete("user");

  const { error: redisTaskError } = await redisDelete("tasks");

  const { error, putUserData } = await userEdit(user, partialUser);

  if (error || redisError || redisTaskError)
    return { success: false, error: error || redisError };

  revalidateTag(tags.USERS);

  cookies().set(cookieValues.USERNAME, putUserData.name);

  return { success: true, error, putUserData };
}
