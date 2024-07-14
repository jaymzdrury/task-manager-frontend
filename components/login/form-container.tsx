import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import styles from "../../app/[locale]/styles.module.css";

export default function FormContainer({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <main className={cn(styles.center, "pt-20 px-6")}>
      <Card className={cn("w-[500px] bg-muted", className)}>{children}</Card>
    </main>
  );
}
