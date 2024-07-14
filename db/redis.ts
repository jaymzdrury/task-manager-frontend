import { cookies } from "next/headers";
import { actionHeaders, errMsg } from "@/lib/utils";
import { env } from "@/types/env";
import { TIMEOUT } from "@/types/schemas";

const cacheUrl = env.SERVER_CACHE;

export async function redisDelete(id: "tasks" | "user") {
  try {
    const res = await fetch(`${cacheUrl}/${id}`, {
      method: "DELETE",
      headers: actionHeaders(cookies()),
      signal: AbortSignal.timeout(TIMEOUT),
    });

    return {
      error: !res.ok ? res.statusText : null,
      redisData: res.statusText,
    };
  } catch (error) {
    return { error: errMsg(error) };
  }
}
