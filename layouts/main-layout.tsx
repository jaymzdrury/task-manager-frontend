import TranslationContextProvider from "@/context/translation-context";
import NavBar from "@/components/navbar/navbar";
import Header from "@/components/common/header";
import Search from "@/components/navbar/search";
import SearchInput from "@/components/navbar/search-input";
import { dictonary } from "@/lib/intl";

import styles from "../app/[locale]/styles.module.css";

type MainLayoutProps = {
  t: unknown;
  profile: React.ReactNode;
  title: "Tasks" | "Users";
};

export default function MainLayout({
  t,
  profile,
  title,
  children,
}: React.PropsWithChildren<MainLayoutProps>): JSX.Element {
  return (
    <TranslationContextProvider dictonary={dictonary(t)}>
      <NavBar avatar={profile}>
        <Search>
          <SearchInput />
        </Search>
      </NavBar>
      <main>
        <Header title={title} />
        <section className={styles.mainLayout}>{children}</section>
      </main>
    </TranslationContextProvider>
  );
}
