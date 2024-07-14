import { cn } from "@/lib/utils";
import { watch } from "@/lib/formUtils";
import { FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import AddTaskLabel from "./add-task-label";
import { UseForm } from "@/types/types";

export default function AddTaskInput({
  disabled,
  form,
  type,
}: {
  disabled?: boolean;
  form: UseForm;
  type: "title" | "description";
}): JSX.Element {
  return (
    <FormField
      control={form.control}
      name={type}
      render={({ field }) => (
        <FormItem className="grid grid-cols-4 items-center gap-4">
          <AddTaskLabel type={type} />
          <FormControl>
            <Input
              required
              disabled={disabled}
              aria-disabled={disabled}
              className={cn("col-span-3", watch(form, type))}
              type="text"
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
