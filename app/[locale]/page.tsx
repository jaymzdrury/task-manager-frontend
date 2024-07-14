import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { getTasks, getUsers } from "../../actions/requests";
import MainLayout from "@/layouts/main-layout";
import Profile from "@/components/navbar/profile";
import TaskSection from "@/components/tasks/task-section";
import { groupBy } from "lodash";

import { REVALIDATE } from "@/types/schemas";
import { Locale } from "@/types/types";

export const revalidate = REVALIDATE;

export default async function Home({
  params: { locale },
  searchParams,
}: {
  params: { locale: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<JSX.Element> {
  unstable_setRequestLocale(locale);
  const search = searchParams.search ? String(searchParams.search) : undefined;
  const [tasks, users, t] = await Promise.all([
    getTasks(search),
    getUsers(),
    getTranslations({ locale }),
  ]);

  return (
    <MainLayout profile={<Profile users={users} />} t={t} title="Tasks">
      <TaskSection
        users={users}
        complete="ToDo"
        column={groupBy(tasks, "complete")["ToDo"]}
      />
      <TaskSection
        users={users}
        complete="In Progress"
        column={groupBy(tasks, "complete")["In Progress"]}
      />
      <TaskSection
        users={users}
        complete="Done"
        column={groupBy(tasks, "complete")["Done"]}
      />
    </MainLayout>
  );
}
