import dynamic from "next/dynamic";
const EditTaskModalLazy = dynamic(() =>
  import("./edit-task-modal").then((mod) => mod.default)
);
import EditTaskForm from "./edit-task-form";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Task } from "@/types/types";

type AddTaskProps = {
  task: Task;
};

export default function EditTask({
  task,
  children,
}: React.PropsWithChildren<AddTaskProps>): JSX.Element {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <EditTaskModalLazy title={task.title}>
        <EditTaskForm task={task} />
      </EditTaskModalLazy>
    </Dialog>
  );
}
