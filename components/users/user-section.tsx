import dynamic from "next/dynamic";
import Column from "../common/column";
import CardContainer from "../common/card/card-container";
import CardBody from "../common/card/card-body";
import UserCardEdit from "./user-card-edit";

const EditUserRoleMenuLazy = dynamic(() =>
  import("../users-edit/edit-user-role-menu").then((mod) => mod.default)
);
import EditUserRole from "../users-edit/edit-user-role";
import Task from "../users-tasks/task";
import AddTask from "../tasks-add/add-task";
import Avatar from "../tasks-users/avatar";

import { MoreHorizontal, Plus } from "lucide-react";
import { CardFooter, CardTitle } from "../ui/card";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { SelectItem } from "../ui/select";

import { formatTime } from "@/lib/utils";
import { Role, Task as TaskType, User } from "@/types/types";

import styles from "../../app/[locale]/styles.module.css";

const complete = { ToDo: 1, "In Progress": 2, Done: 3 };

export default function UserSection({
  title,
  tasks,
  users,
}: {
  title: Role;
  tasks: TaskType[];
  users: User[];
}): JSX.Element {
  return (
    <Column title={title} settings={<Plus size={30} />}>
      {users?.length
        ? users.map((user) => (
            <CardContainer key={user._id} id={user._id}>
              <CardBody
                details={
                  <time className="text-xs" dateTime={formatTime(user.seconds)}>
                    {formatTime(user.seconds)}
                  </time>
                }
                title={
                  <UserCardEdit cardInfo={user} type="name">
                    <CardTitle className={styles.ellipsis}>
                      {user.name}
                    </CardTitle>
                  </UserCardEdit>
                }
                description={<p className={styles.ellipsis}>{user.email}</p>}
                ellipsis={
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <MoreHorizontal className="cursor-pointer" />
                    </DropdownMenuTrigger>
                    <EditUserRoleMenuLazy user={user}>
                      {(userRole) => (
                        <EditUserRole user={user} userRole={userRole} />
                      )}
                    </EditUserRoleMenuLazy>
                  </DropdownMenu>
                }
              />
              <CardFooter>
                {tasks.length ? (
                  tasks
                    .filter((task) =>
                      task.users.some((taskUser) => taskUser._id === user._id)
                    )
                    .sort((a, b) => complete[a.complete] - complete[b.complete])
                    .map((matchingTasks, i) => (
                      <Task
                        key={matchingTasks._id}
                        matchingTasks={matchingTasks}
                        index={i}
                      />
                    ))
                ) : (
                  <AddTask
                    complete="ToDo"
                    icon={
                      <Avatar style="cursor-pointer">
                        <Plus />
                      </Avatar>
                    }
                  >
                    {users.map((user) => (
                      <SelectItem key={user._id} value={user._id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </AddTask>
                )}
              </CardFooter>
            </CardContainer>
          ))
        : undefined}
    </Column>
  );
}
