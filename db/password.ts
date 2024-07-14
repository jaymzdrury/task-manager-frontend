import { errMsg, tags } from "@/lib/utils";
import { User } from "@/types/types";
import { env } from "@/types/env";
import { TIMEOUT } from "@/types/schemas";

const passwordUrl = env.SERVER_PASSWORD;

export async function editPassword(user: User, partialUser: Partial<User>) {
  try {
    const { _id, ...dataWithoutId } = user;

    const res = await fetch(`${passwordUrl}/${user._id}`, {
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
