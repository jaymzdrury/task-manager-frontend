import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import en from "../dictionaries/en.json";
import {
  addTask,
  editTask,
  complete,
  id,
  idProp,
  login,
  logout,
  register,
  role,
  task,
  user,
  title,
  locales,
  resetPassword,
  email,
  newPassword,
} from "./schemas";

export type Email = z.infer<typeof email>;

export type Id = z.infer<typeof id>;

export type IdProp = z.infer<typeof idProp>;

export type User = z.infer<typeof user>;

export type Task = z.infer<typeof task>;

export type Logout = z.infer<typeof logout>;

export type Register = z.infer<typeof register>;

export type Login = z.infer<typeof login>;

export type ResetPassword = z.infer<typeof resetPassword>;

export type NewPassword = z.infer<typeof newPassword>;

export type AddTask = z.infer<typeof addTask>;

export type Title = z.infer<typeof title>;

export type EditTask = z.infer<typeof editTask>;

export type Role = z.infer<typeof role>;

export type Complete = z.infer<typeof complete>;

export type UseForm = UseFormReturn<any, any, undefined>;

export type HeaderDropdownValues = "This Week" | "Previous";

export type UserValues = "Email" | "Password" | "Name" | "ConfirmPassword";

export type EditValues = "title" | "description" | "name" | "email";

export type Dictionaries = typeof en;

export type Locale = (typeof locales)[number];
