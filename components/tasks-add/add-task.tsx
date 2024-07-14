"use client";
import React from "react";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
const AddTaskModalLazy = dynamic(() =>
  import("./add-task-modal").then((mod) => mod.default)
);
import AddTaskForm from "./add-task-form";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Complete } from "@/types/types";
import { isNode } from "@/lib/utils";

type AddTaskProps = {
  complete: Complete;
  icon: React.ReactNode;
};

export default function AddTask({
  complete,
  icon,
  children,
}: React.PropsWithChildren<AddTaskProps>): JSX.Element {
  const [open, openSet] = React.useState(false);
  if (!isNode(icon)) return notFound();

  return (
    <Dialog open={open} onOpenChange={openSet}>
      <DialogTrigger aria-label="add task button">{icon}</DialogTrigger>
      <AddTaskModalLazy title={complete}>
        <AddTaskForm openSet={openSet} complete={complete}>
          {children}
        </AddTaskForm>
      </AddTaskModalLazy>
    </Dialog>
  );
}
