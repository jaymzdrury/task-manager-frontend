import { notFound } from "next/navigation";
import ColumnTitle from "./column-title";
import { ScrollArea } from "../ui/scroll-area";
import { cn, isNode } from "@/lib/utils";
import { Complete, Role } from "@/types/types";

import styles from "../../app/[locale]/styles.module.css";

type ColumnCardProps = {
  title: Complete | Role;
  settings: React.ReactNode;
};

export default function Column({
  title,
  settings,
  children,
}: React.PropsWithChildren<ColumnCardProps>): JSX.Element {
  if (!isNode(settings)) return notFound();

  return (
    <article className={styles.columnContainer}>
      <header className={cn(styles.between, "pb-4")}>
        <ColumnTitle title={title} />
        {settings}
      </header>
      <ScrollArea className={styles.columnArea}>{children}</ScrollArea>
    </article>
  );
}
