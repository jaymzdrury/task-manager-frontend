import NavBar from "@/components/navbar/navbar";
import AvatarDefault from "@/components/navbar/avatar-default";
import { cn } from "@/lib/utils";

import styles from "../app/[locale]/styles.module.css";

type ErrorLayoutProps = {
  header: string | number;
  title: string;
  message: string;
};

export default function ErrorLayout({
  header,
  title,
  message,
  children,
}: React.PropsWithChildren<ErrorLayoutProps>): JSX.Element {
  return (
    <>
      <NavBar avatar={<AvatarDefault />} />
      <main className={cn(styles.center, "py-12")}>
        <section className="space-y-2 py-12" role="alert" aria-relevant="all">
          <h2 className="text-xl text-center">{title}</h2>
          <p className="text-xl text-center pb-2">{message}</p>
          <p className="text-4xl font-bold text-center pb-4">{header}</p>
          {children}
        </section>
      </main>
    </>
  );
}
