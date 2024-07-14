import { DialogTrigger } from "../ui/dialog";
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "../ui/dropdown-menu";
import { Info } from "lucide-react";

import styles from "../../app/[locale]/styles.module.css";
import { cn } from "@/lib/utils";

export default function TaskEllipsisSettings({
  children,
}: React.PropsWithChildren): JSX.Element {
  return (
    <DropdownMenuPortal>
      <DropdownMenuSubContent>
        {children}
        <DialogTrigger className="w-full">
          <DropdownMenuItem
            className={cn(styles.center, "space-x-2 py-4 cursor-pointer")}
          >
            <Info className="h-4 w-4" />
            <span>AI</span>
          </DropdownMenuItem>
        </DialogTrigger>
      </DropdownMenuSubContent>
    </DropdownMenuPortal>
  );
}
