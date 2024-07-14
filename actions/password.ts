"use server";
import { revalidateTag } from "next/cache";
import { userByEmail } from "@/db/requests";
import { editPassword } from "@/db/password";
import { resetPassword as resetPasswordSend } from "@/components/email/send";
import { tags } from "@/lib/utils";
import { Email, User } from "@/types/types";
import {
  user as userSchema,
  resetPassword as resetPasswordSchema,
} from "@/types/schemas";

export async function resetPassword(email: Email) {
  const { success } = resetPasswordSchema.safeParse({ email });

  if (!success) return { success: false, error: "Invalid Schema" };

  const { user, error } = await userByEmail(email);

  if (error) return { success: false, error };

  if (user) resetPasswordSend(user._id);

  return { success: true, error };
}

export async function newPassword(user: User, partialUser: Partial<User>) {
  const { success } = userSchema.safeParse({ ...user, ...partialUser });

  if (!success) return { success: false, error: "Invalid Schema" };

  const { error, putUserData } = await editPassword(user, partialUser);

  if (error) return { success: false, error };

  revalidateTag(tags.USERS);

  return { success: true, error, putUserData };
}
