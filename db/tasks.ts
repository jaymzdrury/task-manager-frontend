import { cookies } from "next/headers";
import { actionHeaders, errMsg, tags } from "@/lib/utils";
import { AddTask, Complete, Id, Task } from "@/types/types";
import { env } from "@/types/env";
import { TIMEOUT } from "@/types/schemas";

const taskUrl = env.SERVER_TASKS;

export async function taskDelete(id: Id) {
  try {
    const res = await fetch(`${taskUrl}/${id}`, {
      method: "DELETE",
      headers: actionHeaders(cookies()),
      next: {
        tags: [tags.TASKS],
      },
      signal: AbortSignal.timeout(TIMEOUT),
    });
    const deleteTaskData = await res.json();
    return { error: !res.ok ? deleteTaskData.message : null, deleteTaskData };
  } catch (error) {
    return { error: errMsg(error) };
  }
}

export async function taskDeleteAll(complete: Complete) {
  try {
    const res = await fetch(taskUrl, {
      method: "DELETE",
      headers: actionHeaders(cookies()),
      body: JSON.stringify({ complete }),
      next: {
        tags: [tags.TASKS],
      },
      signal: AbortSignal.timeout(TIMEOUT),
    });
    const deleteTaskData = await res.json();
    return { error: !res.ok ? deleteTaskData.message : null, deleteTaskData };
  } catch (error) {
    return { error: errMsg(error) };
  }
}

export async function taskAdd(task: AddTask) {
  try {
    const res = await fetch(taskUrl, {
      method: "POST",
      headers: actionHeaders(cookies()),
      body: JSON.stringify({
        ...task,
        users: [task.users],
      }),
      next: {
        tags: [tags.TASKS],
      },
      signal: AbortSignal.timeout(TIMEOUT),
    });
    const addTaskData = await res.json();
    return { error: !res.ok ? addTaskData.message : null, addTaskData };
  } catch (error) {
    return { error: errMsg(error) };
  }
}

export async function taskEdit(task: Task, partialTask: Partial<Task>) {
  try {
    const ids = task.users.map((d) => d._id);
    const { _id, ...dataWithoutId } = task;

    const res = await fetch(`${taskUrl}/${task._id}`, {
      method: "PUT",
      headers: actionHeaders(cookies()),
      body: JSON.stringify({
        ...dataWithoutId,
        ...partialTask,
        users: ids,
      }),
      next: {
        tags: [tags.TASKS],
      },
      signal: AbortSignal.timeout(TIMEOUT),
    });

    const putTaskData = await res.json();
    return {
      error: !res.ok ? putTaskData.message : null,
      putTaskData,
    };
  } catch (error) {
    return { error: errMsg(error) };
  }
}
