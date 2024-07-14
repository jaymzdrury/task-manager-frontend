"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { TranslationContext } from "@/context/translation-context";
import { CalendarCheck, PackageCheck, SquareUser } from "lucide-react";
import DrawerLink from "./drawer-link";
import {
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { cn, paths } from "@/lib/utils";
import { getLocale } from "@/lib/intl";

import styles from "../../app/[locale]/styles.module.css";

const iconStyle = "mr-4";

export default function DrawerBody(): JSX.Element {
  const { dictonary } = React.useContext(TranslationContext);
  const locale = getLocale(usePathname());

  return (
    <DrawerContent className="h-full w-48">
      <DrawerHeader className="mx-4">
        <DrawerClose>
          <DrawerTitle className={cn(styles.start, "space-x-4")}>
            <PackageCheck className="text-teal-600" />
            <p className="font-bold">{dictonary.drawer.title}</p>
          </DrawerTitle>
        </DrawerClose>
      </DrawerHeader>
      <ul className="py-12">
        <DrawerLink href={`${paths.TASKS + locale}`}>
          <CalendarCheck className={iconStyle} />
          {dictonary.drawer.tasks}
        </DrawerLink>
        <DrawerLink href={`/${locale + paths.USERS}`}>
          <SquareUser className={iconStyle} />
          {dictonary.drawer.users}
        </DrawerLink>
      </ul>
    </DrawerContent>
  );
}
