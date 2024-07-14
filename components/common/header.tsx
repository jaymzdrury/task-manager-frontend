import HeaderDropdown from "./header-dropdown";
import { cn } from "@/lib/utils";
import styles from "../../app/[locale]/styles.module.css";
import HeaderTitle from "./header-title";

type HeaderProps = {
  title: "Tasks" | "Users" | "";
  loadingClass?: string;
};

export default function Header({
  title,
  loadingClass,
}: HeaderProps): JSX.Element {
  return (
    <header
      className={cn(
        styles.between,
        loadingClass,
        "w-full max-w-[1225px] px-6 py-6 xl:px-0 mx-auto"
      )}
    >
      <HeaderTitle title={title} />
      {loadingClass ? undefined : (
        <HeaderDropdown values={["This Week", "Previous"]} />
      )}
    </header>
  );
}
