import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

import styles from "../../app/[locale]/styles.module.css";

type NotFoundLinkProps = {
  href: string;
};

export default function NotFoundLink({
  href,
  children,
}: React.PropsWithChildren<NotFoundLinkProps>): JSX.Element {
  const link = href.split("/").length > 1 ? href.split("/").at(-1) : "tasks";
  return (
    <div className={cn(styles.center, "pt-2 pb-12")}>
      <Link
        role="button"
        className={cn(
          styles.start,
          "bg-primary text-primary-foreground rounded-full p-4 font-bold"
        )}
        href={href}
      >
        {children}
        <ArrowRight className="ml-1" size={20} />
      </Link>
    </div>
  );
}
