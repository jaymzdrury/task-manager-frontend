import { cache } from "react";
import { tasks, users, user } from "@/db/requests";
import { Id, Task, User } from "@/types/types";

export const getTasks: (query?: string) => Promise<Task[]> = cache(
  async (query?: string) => {
    const { error, tasks: allTasks } = await tasks(query);

    if (error) throw new Error(error);

    return allTasks;
  }
);

export const getUsers: () => Promise<User[]> = cache(async () => {
  const { error, users: allUsers } = await users();

  if (error) throw new Error(error);

  return allUsers;
});

export const getUser: (id: Id) => Promise<User> = cache(async (id: Id) => {
  const { error, user: userResponse } = await user(id);

  if (error) throw new Error(error);

  return userResponse;
});
