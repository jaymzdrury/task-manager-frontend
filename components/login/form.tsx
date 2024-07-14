import { SubmitHandler } from "react-hook-form";
import FormInput from "./form-input";
import SubmitButton from "../common/submit-button";
import { Form } from "@/components/ui/form";
import { submitCountLimit } from "@/lib/formUtils";
import { t } from "@/lib/toast";
import { INPUT, PASSWORD, email } from "@/types/schemas";
import {
  Login,
  NewPassword,
  Register,
  ResetPassword,
  UseForm,
  UserValues,
} from "@/types/types";

type FormComponentProps = {
  form: UseForm;
  values: UserValues[];
  onSubmit:
    | SubmitHandler<Login>
    | SubmitHandler<Register>
    | SubmitHandler<ResetPassword>
    | SubmitHandler<NewPassword>;
};

export default function FormComponent({
  form,
  values,
  onSubmit,
  children,
}: React.PropsWithChildren<FormComponentProps>): JSX.Element {
  if (submitCountLimit(form)) t("⚠️ Too many tries");

  return (
    <Form {...form}>
      <form
        className="grid w-full items-center gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {values.map((type) => (
          <FormInput key={type} type={type} form={form} />
        ))}
        <div className="flex flex-col space-y-1.5">
          <SubmitButton
            form={form}
            className="w-full mt-4 bg-success hover:bg-success/80 text-white"
            disabled={
              form.watch("name")?.length < INPUT ||
              form.watch("password")?.length < PASSWORD ||
              (values.includes("ConfirmPassword") &&
                form.watch("confirmpassword") !== form.watch("password")) ||
              (form.watch("email")?.length &&
                !email.safeParse(form.watch("email")).success)
            }
            variant="default"
          >
            {children}
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
}
