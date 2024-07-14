import { cookies } from "next/headers";
import { actionHeaders, errMsg, tags } from "@/lib/utils";
import { Id, Task, User } from "@/types/types";
import { env } from "@/types/env";
import { TIMEOUT } from "@/types/schemas";

const taskUrl = env.SERVER_TASKS;
const userUrl = env.SERVER_USER;

export async function userAdd(task: Task, id: Id) {
  try {
    const ids = task.users.map((d) => d._id);
    ids.push(id);
    const { _id, ...dataWithoutId } = task;

    const res = await fetch(`${taskUrl}/${task._id}`, {
      method: "PUT",
      headers: actionHeaders(cookies()),
      body: JSON.stringify({
        ...dataWithoutId,
        users: ids,
      }),
      next: {
        tags: [tags.TASKS],
      },
      signal: AbortSignal.timeout(TIMEOUT),
    });

    const addedTasks = await res.json();
    return { error: !res.ok ? addedTasks.message : null, addedTasks };
  } catch (error) {
    return { error: errMsg(error) };
  }
}

export async function userRemove(task: Task, userId: Id) {
  try {
    const ids = task.users.map((d) => d._id);
    const filteredIds = ids.filter((i) => i !== userId);
    const { _id, ...dataWithoutId } = task;

    const res = await fetch(`${taskUrl}/${task._id}`, {
      method: "PUT",
      headers: actionHeaders(cookies()),
      body: JSON.stringify({
        ...dataWithoutId,
        users: filteredIds,
      }),
      next: {
        tags: [tags.TASKS],
      },
      signal: AbortSignal.timeout(TIMEOUT),
    });

    const editedTask = await res.json();
    return { error: !res.ok ? editedTask.message : null, editedTask };
  } catch (error) {
    return { error: errMsg(error) };
  }
}

export async function userEdit(user: User, partialUser: Partial<User>) {
  try {
    const { _id, ...dataWithoutId } = user;

    const res = await fetch(`${userUrl}/${user._id}`, {
      method: "PUT",
      headers: actionHeaders(cookies()),
      body: JSON.stringify({
        ...dataWithoutId,
        ...partialUser,
      }),
      next: {
        tags: [tags.USERS],
      },
      signal: AbortSignal.timeout(TIMEOUT),
    });
    const putUserData = await res.json();
    return {
      error: !res.ok ? putUserData.message : null,
      putUserData,
    };
  } catch (error) {
    return { error: errMsg(error) };
  }
}

export async function userEditPassword(user: User, partialUser: Partial<User>) {
  try {
    const { _id, ...dataWithoutId } = user;

    const res = await fetch(`${userUrl}/password/${user._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...dataWithoutId,
        ...partialUser,
      }),
      next: {
        tags: [tags.USERS],
      },
      signal: AbortSignal.timeout(TIMEOUT),
    });
    const putUserData = await res.json();
    return {
      error: !res.ok ? putUserData.message : null,
      putUserData,
    };
  } catch (error) {
    return { error: errMsg(error) };
  }
}
