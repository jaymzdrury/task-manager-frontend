"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { login as userLogin, signout, signup } from "@/db/login";
import { cookieValues, paths, tags } from "@/lib/utils";
import { Login, Logout, Register } from "@/types/types";
import {
  register as registerSchema,
  login as loginSchema,
} from "@/types/schemas";

export async function login(formData: Login) {
  const { success } = loginSchema.safeParse(formData);

  if (!success) return { success: false, error: "Invalid Schema" };

  const { error, loginData } = await userLogin(formData);

  if (error) return { success: false, error };

  cookies().set(cookieValues.ACCESSTOKEN, loginData.accessToken);
  cookies().set(cookieValues.REFRESHTOKEN, loginData.refreshToken);
  cookies().set(cookieValues.USERNAME, loginData.user.name);

  return { success: true, error };
}

export async function logout(): Promise<Logout> {
  const { error, logoutData } = await signout();

  if (error) throw new Error(error.message);

  cookies().set(cookieValues.ACCESSTOKEN, logoutData.accessToken);
  cookies().set(cookieValues.REFRESHTOKEN, logoutData.refreshToken);
  cookies().delete(cookieValues.USERNAME);

  revalidateTag(tags.USERS);
  redirect(paths.LOGIN);
}

export async function register(formData: Register) {
  // const form = Object.fromEntries(formData.entries());
  const { success } = registerSchema.safeParse(formData);
  const registerFormData = registerSchema.parse(formData);

  if (!success) return { success: false, error: "Invalid Schema" };

  const { error } = await signup(registerFormData);

  if (error) return { success: false, error };

  revalidateTag(tags.USERS);

  return { success: true, error };
}
