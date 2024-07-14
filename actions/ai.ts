"use server";
import { promptAI } from "@/db/ai";
import { Title } from "@/types/types";
import { title } from "@/types/schemas";

export async function prompt(titleParams: Title) {
  const { success } = title.safeParse(titleParams);

  if (!success) return { success: false, error: "Invalid Schema" };

  const { error, aiData } = await promptAI(titleParams);

  if (error) return { success: false, error };

  return { success: true, error, aiData };
}
