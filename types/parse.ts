import { z } from "zod";
import { Task } from "./types";
import { task, user } from "./schemas";

export const taskParse = (params: Task) =>
  task
    .extend({
      users: z.array(
        user.pick({
          _id: true,
          name: true,
          role: true,
        })
      ),
    })
    .safeParse(params);
