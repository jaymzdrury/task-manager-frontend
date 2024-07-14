import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { EllipsisIcon } from "lucide-react";

export default function DeleteAllTask({
  children,
}: React.PropsWithChildren): JSX.Element {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label="delete all tasks button" role="button">
        <EllipsisIcon />
      </DropdownMenuTrigger>
      {children}
    </DropdownMenu>
  );
}
