import { DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import AddUserForm from "./add-user-form";
import { Task, User } from "@/types/types";

export default function AddUserDropdown({
  users,
  task,
}: {
  users: User[];
  task: Task;
}): JSX.Element | undefined {
  if (users.length <= task.users.length) return undefined;

  return (
    <DropdownMenuContent>
      {users
        .filter((u) => !task.users.some((uu) => u._id === uu._id))
        .map((d) => (
          <DropdownMenuItem key={d.name}>
            <AddUserForm id={d._id} task={task} name={d.name} />
          </DropdownMenuItem>
        ))}
    </DropdownMenuContent>
  );
}
