import dynamic from "next/dynamic";
const DrawerBodyLazy = dynamic(() =>
  import("../drawer/drawer").then((mod) => mod.default)
);
import { Globe, PackageCheck } from "lucide-react";
import LightMode from "./light-mode";
import Intl from "./intl";
import { Drawer, DrawerTrigger } from "../ui/drawer";
import { cn } from "@/lib/utils";

import styles from "../../app/[locale]/styles.module.css";

type NavBarProps = {
  loadingClass?: string;
  avatar?: React.ReactNode;
};

export default function NavBar({
  loadingClass,
  avatar,
  children,
}: React.PropsWithChildren<NavBarProps>): JSX.Element {
  return (
    <nav className={cn(styles.between, "p-6 sticky top-0 z-10 bg-background")}>
      {loadingClass ? (
        <PackageCheck className={loadingClass} />
      ) : (
        <Drawer direction="left">
          <DrawerTrigger role="button" className="cursor-pointer" asChild>
            <PackageCheck />
          </DrawerTrigger>
          <DrawerBodyLazy />
        </Drawer>
      )}
      {children}
      <span className={cn(styles.start, "space-x-4 md:space-x-6")}>
        <LightMode loadingClass={loadingClass} />
        {loadingClass ? <Globe /> : <Intl />}
        {avatar}
      </span>
    </nav>
  );
}
