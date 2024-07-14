import { FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { clockInWatchClass, submitted } from "@/lib/formUtils";
import { UseForm } from "@/types/types";

export default function EditUserInput({
  type,
  form,
}: {
  type: string;
  form: UseForm;
}): JSX.Element {
  return (
    <FormField
      control={form.control}
      name={type}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              required
              type="number"
              min={0}
              className={clockInWatchClass(form, type)}
              disabled={submitted(form)}
              aria-disabled={submitted(form)}
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
