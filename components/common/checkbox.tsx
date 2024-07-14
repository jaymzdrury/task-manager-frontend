import { DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import styles from "../../app/[locale]/styles.module.css";

type CheckboxProps = {
  condition: boolean;
};

export default function Checkbox({
  condition,
  children,
}: React.PropsWithChildren<CheckboxProps>): JSX.Element {
  return (
    <DropdownMenuCheckboxItem
      checked={condition}
      disabled={condition}
      aria-disabled={condition}
      className={cn(styles.center, condition ? "text-success" : undefined)}
    >
      {children}
    </DropdownMenuCheckboxItem>
  );
}
