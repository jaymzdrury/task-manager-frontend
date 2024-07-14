import NavBar from "@/components/navbar/navbar";
import AvatarDefault from "@/components/navbar/avatar-default";
import Search from "@/components/navbar/search";
import Header from "@/components/common/header";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import styles from "./styles.module.css";

function SkeletonCard(): JSX.Element {
  return (
    <>
      <NavBar loadingClass={styles.loadingClass} avatar={<AvatarDefault />}>
        <Search>
          <Input className={styles.searchInput} />
        </Search>
      </NavBar>
      <Header loadingClass={styles.loadingClass} title="" />
      <main className={styles.mainLayout}>
        <article className={cn(styles.columnContainer, "animate-pulse")}>
          <div className={styles.columnArea} />
        </article>
        <article className={cn(styles.columnContainer, "animate-pulse")}>
          <div className={styles.columnArea} />
        </article>
        <article className={cn(styles.columnContainer, "animate-pulse")}>
          <div className={styles.columnArea} />
        </article>
      </main>
    </>
  );
}

export default SkeletonCard;
