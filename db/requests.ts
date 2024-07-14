import { cookies } from "next/headers";
import { errMsg, requestHeaders, tags } from "../lib/utils";
import { Email, Id } from "@/types/types";
import { env } from "@/types/env";
import { TIMEOUT } from "@/types/schemas";

const taskUrl = env.SERVER_TASKS;
const userUrl = env.SERVER_USER;
const passwordUrl = env.SERVER_PASSWORD;

export async function tasks(query?: string) {
  try {
    const res = await fetch(query ? taskUrl + `?search=${query}` : taskUrl, {
      headers: requestHeaders(cookies()),
      next: {
        tags: [tags.TASKS],
      },
      signal: AbortSignal.timeout(TIMEOUT),
    });
    const tasks = await res.json();
    return { error: !res.ok ? tasks.message : null, tasks };
  } catch (error) {
    return { error: errMsg(error) };
  }
}

export async function users() {
  try {
    const res = await fetch(userUrl, {
      headers: requestHeaders(cookies()),
      next: {
        tags: [tags.USERS],
      },
      signal: AbortSignal.timeout(TIMEOUT),
    });
    const users = await res.json();
    return { error: !res.ok ? users.message : null, users };
  } catch (error) {
    return { error: errMsg(error) };
  }
}

export async function userByEmail(email: Email) {
  try {
    const res = await fetch(`${userUrl}/${email}`, {
      signal: AbortSignal.timeout(TIMEOUT),
    });
    const user = await res.json();
    return {
      error: !res.ok ? user.message : null,
      user,
    };
  } catch (error) {
    return { error: errMsg(error) };
  }
}

export async function user(id: Id) {
  try {
    const res = await fetch(`${passwordUrl}/${id}`, {
      signal: AbortSignal.timeout(TIMEOUT),
    });
    const user = await res.json();
    return { error: !res.ok ? user.message : null, user };
  } catch (error) {
    return { error: errMsg(error) };
  }
}
