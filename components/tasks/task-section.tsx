import dynamic from "next/dynamic";
import Column from "../common/column";
import CardContainer from "../common/card/card-container";
import CardBody from "../common/card/card-body";

import AddTask from "../tasks-add/add-task";
import AddUser from "../tasks-users/add-user";
import Ellipsis from "./task-ellipsis";
import User from "../tasks-users/user";
import DeleteAllTask from "../tasks-delete/delete-all-task";
const DeleteAllMenuLazy = dynamic(() =>
  import("../tasks-delete/delete-all-task-menu").then((mod) => mod.default)
);
const AddUserDropdownLazy = dynamic(() =>
  import("../tasks-users/add-user-dropdown").then((mod) => mod.default)
);
import RemoveUser from "../tasks-users/remove-user";
import TaskCardEdit from "./task-card-edit";

import { SelectItem } from "../ui/select";
import { CardFooter, CardTitle } from "../ui/card";
import { Plus } from "lucide-react";
import { cn, formattedDate } from "@/lib/utils";
import { Complete, Task as TaskType, User as UserType } from "@/types/types";

import styles from "../../app/[locale]/styles.module.css";

export default function TaskSection({
  users,
  complete,
  column,
}: {
  users: UserType[];
  complete: Complete;
  column: TaskType[];
}): JSX.Element {
  return (
    <Column
      title={complete}
      settings={
        <span className={cn(styles.start, "space-x-4")}>
          <AddTask complete={complete} icon={<Plus size={30} />}>
            {users.map((user) => (
              <SelectItem key={user._id} value={user._id}>
                {user.name}
              </SelectItem>
            ))}
          </AddTask>
          <DeleteAllTask>
            <DeleteAllMenuLazy title={complete} length={column?.length} />
          </DeleteAllTask>
        </span>
      }
    >
      {column?.length
        ? column.map((task) => (
            <CardContainer key={task._id} id={task._id}>
              <CardBody
                details={
                  <time
                    className="text-xs"
                    dateTime={formattedDate(new Date(task.date))}
                  >
                    {formattedDate(new Date(task.date))}
                  </time>
                }
                title={
                  <TaskCardEdit cardInfo={task} type="title">
                    <CardTitle className={styles.ellipsis}>
                      {task.title}
                    </CardTitle>
                  </TaskCardEdit>
                }
                description={
                  <TaskCardEdit cardInfo={task} type="description">
                    <p className={styles.ellipsis}>{task.description}</p>
                  </TaskCardEdit>
                }
                ellipsis={<Ellipsis task={task} />}
              />
              <CardFooter>
                {task.users.map((user, i) => (
                  <User key={user._id} user={user} i={i}>
                    <RemoveUser task={task} id={user._id} />
                  </User>
                ))}
                <AddUser disabled={users.length <= task.users.length}>
                  <AddUserDropdownLazy users={users} task={task} />
                </AddUser>
              </CardFooter>
            </CardContainer>
          ))
        : undefined}
    </Column>
  );
}
