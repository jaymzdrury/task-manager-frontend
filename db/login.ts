import { cookies } from "next/headers";
import { actionHeaders, errMsg, tags } from "@/lib/utils";
import { Register } from "@/types/types";
import { env } from "@/types/env";
import { TIMEOUT } from "@/types/schemas";

const userUrl = env.SERVER_USER;

export async function login(loginForm: Omit<Register, "name">) {
  try {
    const res = await fetch(`${userUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginForm),
      signal: AbortSignal.timeout(TIMEOUT),
    });
    const loginData = await res.json();
    return { error: !res.ok ? loginData.message : null, loginData };
  } catch (error) {
    return { error: errMsg(error) };
  }
}

export async function signout() {
  try {
    const res = await fetch(`${userUrl}/logout`, {
      method: "DELETE",
      headers: actionHeaders(cookies()),
      next: {
        tags: [tags.USERS],
      },
      signal: AbortSignal.timeout(TIMEOUT),
    });
    const logoutData = await res.json();
    return { error: !res.ok ? logoutData.message : null, logoutData };
  } catch (error) {
    return { error: errMsg(error) };
  }
}

export async function signup(registerFormData: Register) {
  try {
    const res = await fetch(`${userUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...registerFormData,
        role: "user",
        loggedIn: Date.now(),
        seconds: 0,
      }),
      next: {
        tags: [tags.USERS],
      },
      signal: AbortSignal.timeout(TIMEOUT),
    });
    const registerData = await res.json();
    return { error: !res.ok ? registerData.message : null, registerData };
  } catch (error) {
    return { error: errMsg(error) };
  }
}
