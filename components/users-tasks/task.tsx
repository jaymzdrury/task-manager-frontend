"use client";
import React from "react";
import dynamic from "next/dynamic";
import Tip from "../common/tooltip";
const RemoveTaskModalLazy = dynamic(() =>
  import("./remove-task-modal").then((mod) => mod.default)
);
import RemoveTask from "./remove-task";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Task as TaskType } from "@/types/types";

export default function Task({
  matchingTasks,
  index,
}: {
  matchingTasks: TaskType;
  index: number;
}): JSX.Element {
  const [open, openSet] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={openSet}>
      <Tip
        key={matchingTasks._id}
        tooltip={
          <DialogTrigger>
            <p>{matchingTasks.title}</p>
          </DialogTrigger>
        }
      >
        <Avatar className={index > 0 ? "-ml-1" : undefined}>
          <AvatarFallback
            className={cn(
              matchingTasks.complete === "Done"
                ? "bg-user"
                : matchingTasks.complete === "In Progress"
                ? "bg-success"
                : "bg-destructive",
              "text-background select-none"
            )}
          >
            {matchingTasks.title.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </Tip>
      <RemoveTaskModalLazy>
        <RemoveTask id={matchingTasks._id} openSet={openSet} />
      </RemoveTaskModalLazy>
    </Dialog>
  );
}
