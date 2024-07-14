import { UseForm, User } from "@/types/types";
import {
  ID_MIN_LENGTH,
  INPUT,
  PASSWORD,
  SUBMIT_LIMIT,
  email,
} from "@/types/schemas";

const valid = "focus-visible:ring-ring";
const invalid = "focus-visible:ring-destructive";

export const watch = (form: UseForm, type: "title" | "description" | "users") =>
  form.watch(type).length < (type === "users" ? ID_MIN_LENGTH : INPUT)
    ? "bg-muted text-muted-foreground"
    : "bg-background";

export const loginWatch = (form: UseForm, type: "name" | "password") =>
  form.watch(type).length < (type === "password" ? PASSWORD : INPUT)
    ? invalid
    : valid;

export const emailWatch = (form: UseForm, type: "email") =>
  email.safeParse(form.watch(type)).success ? valid : invalid;

export const confirmPasswordWatch = (form: UseForm) =>
  form.watch("password") === form.watch("confirmpassword") ? valid : invalid;

export const clockInWatch = (
  form: UseForm,
  defaultValues: {
    currentUser: User;
    loggedIn: string;
    hours: number;
    minutes: number;
    seconds: number;
  }
) =>
  (Number(form.watch("hours")) === Number(defaultValues.hours) &&
    Number(form.watch("minutes")) === Number(defaultValues.minutes) &&
    Number(form.watch("seconds")) === Number(defaultValues.seconds)) ||
  (Number(form.watch("hours")) === 0 &&
    Number(form.watch("minutes")) === 0 &&
    Number(form.watch("seconds")) === 0) ||
  Number(form.watch("minutes")) > 59 ||
  Number(form.watch("seconds")) > 59 ||
  !form.watch("hours").toString().length ||
  !form.watch("minutes").toString().length ||
  !form.watch("seconds").toString().length;

export const clockInWatchClass = (form: UseForm, type: string) =>
  !form.watch(type).toString().length ||
  (type !== "hours" && Number(form.watch(type)) > 59)
    ? "bg-muted text-muted-foreground"
    : "bg-background";

export const submitted = (form: UseForm) => form.formState.isSubmitting;

export const submitCountLimit = (form: UseForm) =>
  form.formState.submitCount > SUBMIT_LIMIT;

export const idCheck = (id: string) => id.length < ID_MIN_LENGTH;
