import { SubmitHandler } from "react-hook-form";
import AddTaskInput from "../tasks-add/add-task-input";
import SubmitButton from "./submit-button";
import { Form } from "../ui/form";
import { DialogFooter } from "../ui/dialog";
import { UseForm } from "@/types/types";

export default function TaskForm({
  form,
  onSubmit,
  inputDisabled,
  btnDisabled,
  children,
}: {
  form: UseForm;
  onSubmit: SubmitHandler<any>;
  inputDisabled: boolean;
  btnDisabled: boolean;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2 py-2">
        <AddTaskInput disabled={inputDisabled} form={form} type="title" />
        <AddTaskInput disabled={inputDisabled} form={form} type="description" />
        {children}
        <DialogFooter className="items-center">
          <SubmitButton
            form={form}
            variant="default"
            className="bg-success hover:bg-success/80 text-white"
            disabled={btnDisabled}
          >
            Submit
          </SubmitButton>
        </DialogFooter>
      </form>
    </Form>
  );
}
