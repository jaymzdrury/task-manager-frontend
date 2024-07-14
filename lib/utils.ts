import React from "react";
import { type ClassValue, clsx } from "clsx";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formattedDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatHours(seconds: number): string | number {
  const hours = Math.floor((seconds / 3600) % 3600);
  return hours < 10 ? "0" + hours : hours;
}

export function formatMinutes(seconds: number): string | number {
  const minutes = Math.floor((seconds / 60) % 60);
  return minutes < 10 ? "0" + minutes : minutes;
}

export function formatSeconds(seconds: number): string | number {
  const secs = seconds % 60;
  return secs < 10 ? "0" + secs : secs;
}

export function formatTime(seconds: number): string {
  return `${formatHours(seconds)}:${formatMinutes(seconds)}:${formatSeconds(
    seconds
  )}`;
}

export function elapsedTime(loggedIn: Date): number {
  const seconds =
    (new Date(Date.now()).getTime() - new Date(loggedIn).getTime()) / 1000;
  return Math.floor(seconds);
}

export function formatAI(str: string): string {
  return str
    .replace(/\*\*(.*?)\*\*/g, "<br /><br /><b>$1:</b><br />")
    .replace(/\*(.*?)\. /g, "<br />-$1.<br />")
    .replace("```html", "<br /><html>")
    .replace("```", "</html><br />")
    .replace("```css", "<br /><style>")
    .replace("```", "<br /></style>")
    .replaceAll(": ", "<br />");
}

export function requestHeaders(cookies: ReadonlyRequestCookies) {
  const headers = {
    Authorization: `Bearer ${cookies.get(cookieValues.ACCESSTOKEN)?.value}`,
    "x-refresh": `${cookies.get(cookieValues.REFRESHTOKEN)?.value}`,
  };
  return headers;
}

export function actionHeaders(cookies: ReadonlyRequestCookies) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cookies.get(cookieValues.ACCESSTOKEN)?.value}`,
    "x-refresh": `${cookies.get(cookieValues.REFRESHTOKEN)?.value}`,
  };
  return headers;
}

export function errMsg(error: unknown): string {
  console.log(error);
  let message: string;
  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Unkown error";
  }
  return message;
}

export const isNode = (node: React.ReactNode): boolean =>
  React.isValidElement(node);

export const cookieValues = {
  ACCESSTOKEN: "accessToken",
  REFRESHTOKEN: "refreshToken",
  USERNAME: "userName",
};

export const tags = {
  USERS: "users",
  TASKS: "tasks",
};

export const paths = {
  USERS: "/users",
  TASKS: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  RESET: "/reset-password",
} as const;
