import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Settings2 } from "lucide-react";
import { Input } from "../ui/input";
import SubmitButton from "../common/submit-button";
import { INPUT } from "@/types/schemas";
import { submitCountLimit } from "@/lib/formUtils";
import { t } from "@/lib/toast";
import { EditValues } from "@/types/types";
import { cn } from "@/lib/utils";

import styles from "../../app/[locale]/styles.module.css";

type EditTaskInputProps = {
  type: EditValues;
  defaultValues: Record<EditValues, string>;
  onSubmit: SubmitHandler<FieldValues>;
};

export default function EditInput({
  type,
  defaultValues,
  onSubmit,
  children,
}: React.PropsWithChildren<EditTaskInputProps>): JSX.Element {
  const form = useForm({ defaultValues });

  if (submitCountLimit(form)) t("⚠️ Too many tries");

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn(styles.start, "space-x-1")}
    >
      <Input required type="text" {...form.register(type)} />
      <SubmitButton
        form={form}
        variant="ghost"
        size="sm"
        disabled={
          form.watch(type).length < INPUT ||
          form.watch(type) === defaultValues[type]
        }
      >
        <Settings2 />
      </SubmitButton>
      {children}
    </form>
  );
}
