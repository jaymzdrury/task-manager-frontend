import { ToastAction } from "@/components/ui/toast";
import { formattedDate } from "./utils";
import { toast } from "@/components/ui/use-toast";

export const toastProps = (msg: string) => ({
  title: msg,
  description: formattedDate(new Date(Date.now())),
  action: <ToastAction altText="Hide this user message">Hide</ToastAction>,
});

export const t = (msg: string) => toast(toastProps(msg));
