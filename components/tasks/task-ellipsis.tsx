import dynamic from "next/dynamic";
const TaskEllipsisMenuLazy = dynamic(() =>
  import("./task-ellipsis-menu").then((mod) => mod.default)
);
import AiContainer from "../ai/ai-container";
import EditCompleteMenu from "../tasks-edit/edit-complete-menu";
import EditComplete from "../tasks-edit/edit-complete";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { MoreHorizontal, X } from "lucide-react";
import { Task } from "@/types/types";
import DeleteTask from "../tasks-delete/delete-task";

export default function Ellipsis({ task }: { task: Task }): JSX.Element {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger role="button" asChild>
        <MoreHorizontal className="cursor-pointer" />
      </DropdownMenuTrigger>
      <AiContainer title={task.title}>
        <TaskEllipsisMenuLazy taskDelete={<DeleteTask id={task._id} />}>
          <EditCompleteMenu task={task}>
            {(complete) => <EditComplete task={task} complete={complete} />}
          </EditCompleteMenu>
        </TaskEllipsisMenuLazy>
      </AiContainer>
    </DropdownMenu>
  );
}
