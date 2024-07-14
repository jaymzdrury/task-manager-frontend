import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { groupBy } from "lodash";
import { getTasks, getUsers } from "@/actions/requests";
import MainLayout from "@/layouts/main-layout";
import Profile from "@/components/navbar/profile";
import UserSection from "@/components/users/user-section";

import { REVALIDATE } from "@/types/schemas";
import { Locale } from "@/types/types";

export const revalidate = REVALIDATE;

export const metadata: Metadata = {
  title: "Task Manager | Users",
  description: "This is the Task Manager Users Page",
};

export default async function Users({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<JSX.Element> {
  const [tasks, users, t] = await Promise.all([
    getTasks(),
    getUsers(),
    getTranslations({ locale }),
  ]);

  return (
    <MainLayout profile={<Profile users={users} />} title="Users" t={t}>
      <UserSection
        tasks={tasks}
        users={groupBy(users, "role")["user"]}
        title="user"
      />
      <UserSection
        tasks={tasks}
        users={groupBy(users, "role")["admin"]}
        title="admin"
      />
      <UserSection
        tasks={tasks}
        users={groupBy(users, "role")["auth"]}
        title="auth"
      />
    </MainLayout>
  );
}
