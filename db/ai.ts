import { cookies } from "next/headers";
import { actionHeaders, errMsg } from "@/lib/utils";
import { Title } from "@/types/types";
import { env } from "@/types/env";

const aiUrl = env.SERVER_AI;

export async function promptAI(title: Title) {
  try {
    const res = await fetch(aiUrl, {
      method: "POST",
      headers: actionHeaders(cookies()),
      body: JSON.stringify(title),
    });
    const aiData = await res.text();
    return { error: !res.ok ? aiData : null, aiData };
  } catch (error) {
    return { error: errMsg(error) };
  }
}
