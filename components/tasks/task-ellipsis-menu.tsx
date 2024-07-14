import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
const TaskEllipsisSettingsLazy = dynamic(() =>
  import("./task-ellipsis-settings").then((mod) => mod.default)
);
import TaskEllipsisSettingsItem from "./task-ellipsis-settings-item";
import { Settings } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
} from "../ui/dropdown-menu";
import { isNode } from "@/lib/utils";

type TaskEllipsisModalProps = {
  taskDelete: React.ReactNode;
};

export default function TaskEllipsisMenu({
  taskDelete,
  children,
}: React.PropsWithChildren<TaskEllipsisModalProps>): JSX.Element {
  if (!isNode(taskDelete)) return notFound();

  return (
    <DropdownMenuContent>
      {children}
      <DropdownMenuSeparator />
      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="py-4">
          <Settings className="mr-8 h-4 w-4" />
          <TaskEllipsisSettingsItem />
        </DropdownMenuSubTrigger>
        <TaskEllipsisSettingsLazy>{taskDelete}</TaskEllipsisSettingsLazy>
      </DropdownMenuSub>
    </DropdownMenuContent>
  );
}
