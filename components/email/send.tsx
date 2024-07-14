import { env } from "@/types/env";
import { Resend } from "resend";
import Complete from "./complete";
import Reset from "./reset";
import { Email, Id, Task } from "@/types/types";
import { t } from "@/lib/toast";
import { errMsg } from "@/lib/utils";

const resend = new Resend(env.RESEND);

export const send = (task: Task) => {
  try {
    resend.emails.send({
      from: "Task Manager <onboarding@resend.dev>",
      to: env.OWNER_EMAIL,
      subject: "Recent Tasks Completed",
      react: <Complete task={task} />,
    });
  } catch (e) {
    t(errMsg(e));
  }
};

export const resetPassword = (id: Id) => {
  try {
    resend.emails.send({
      from: "Task Manager <onboarding@resend.dev>",
      to: env.OWNER_EMAIL,
      subject: "Reset Password",
      react: <Reset id={id} />,
    });
  } catch (e) {
    t(errMsg(e));
  }
};
