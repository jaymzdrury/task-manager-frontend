"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type DrawerLinksProps = {
  href: string;
};

export default function DrawerLink({
  href,
  children,
}: React.PropsWithChildren<DrawerLinksProps>): JSX.Element {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <li>
      <Link href={href}>
        <Button
          variant="ghost"
          size="lg"
          className={cn(
            active ? "bg-muted font-bold" : "opacity-75",
            "w-full text-md justify-start mb-4"
          )}
        >
          {children}
        </Button>
      </Link>
    </li>
  );
}
