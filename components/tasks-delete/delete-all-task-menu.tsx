import dynamic from "next/dynamic";
const DeleteAllTaskModalLazy = dynamic(() =>
  import("./delete-all-task-modal").then((mod) => mod.default)
);
import DeleteAllTaskForm from "./delete-all-task-form";
import DeleteAllTaskMenuItem from "./delete-all-task-menu-item";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { DropdownMenuContent } from "../ui/dropdown-menu";
import { Complete } from "@/types/types";

export default function DeleteAllTaskMenu({
  title,
  length,
}: {
  title: Complete;
  length: number;
}): JSX.Element {
  return (
    <Dialog>
      <DropdownMenuContent>
        <DialogTrigger disabled={!length} aria-disabled={!length}>
          <DeleteAllTaskMenuItem length={length} />
        </DialogTrigger>
      </DropdownMenuContent>
      <DeleteAllTaskModalLazy title={title}>
        <DeleteAllTaskForm title={title} />
      </DeleteAllTaskModalLazy>
    </Dialog>
  );
}
