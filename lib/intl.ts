import { Complete, Dictionaries, Role } from "@/types/types";
import { Pathnames } from "next-intl/navigation";

export const locales = ["en", "zh-tw"] as const;

export const defaultLocale = "en";

export const pathnames = {
  "/": "/",
  "/users": "/users",
  "/login": "/login",
  "/register": "/register",
} satisfies Pathnames<typeof locales>;

export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;

export const dictonary: (t: any) => Dictionaries = (t: any) => ({
  column: {
    toDo: t("column.toDo"),
    progress: t("column.progress"),
    done: t("column.done"),
    admin: t("column.admin"),
    user: t("column.user"),
    auth: t("column.auth"),
  },
  search: t("search"),
  logout: t("logout"),
  settings: t("settings"),
  delete: t("delete"),
  searchParams: {
    placeholder: t("searchParams.placeholder"),
    current: t("searchParams.current"),
    previous: t("searchParams.previous"),
  },
  drawer: {
    title: t("drawer.title"),
    tasks: t("drawer.tasks"),
    users: t("drawer.users"),
  },
  addTask: {
    title: t("addTask.title"),
    description: t("addTask.description"),
    form: {
      title: t("addTask.form.title"),
      description: t("addTask.form.description"),
      select: t("addTask.form.select"),
    },
  },
  deleteTask: {
    deleteAll: t("deleteTask.deleteAll"),
    invalid: t("deleteTask.invalid"),
  },
  clockIn: {
    title: t("clockIn.title"),
    description: t("clockIn.description"),
  },
  login: {
    login: t("login.login"),
    register: t("login.register"),
    description: t("login.description"),
    email: t("login.email"),
    password: t("login.password"),
    forgotPassword: t("login.forgotPassword"),
    editPassword: t("login.editPassword"),
    newPassword: t("login.newPassword"),
    confirmpassword: t("login.confirmpassword"),
    name: t("login.name"),
    loginLink: t("login.loginLink"),
    registerLink: t("login.registerLink"),
  },
  removeTask: {
    title: t("removeTask.title"),
    description: t("removeTask.description"),
    remove: t("removeTask.remove"),
    cancel: t("removeTask.cancel"),
  },
  removeUser: {
    title: t("removeUser.title"),
    description: t("removeUser.description"),
  },
});

export function translateComplete(
  title: Complete | Role,
  dictonary: Dictionaries
): string {
  return title === "ToDo"
    ? dictonary.column.toDo
    : title === "In Progress"
    ? dictonary.column.progress
    : title === "Done"
    ? dictonary.column.done
    : title === "admin"
    ? dictonary.column.admin
    : title === "user"
    ? dictonary.column.user
    : dictonary.column.auth;
}

export function getLocale(pathname: string): string {
  return pathname.split("/")[1];
}
