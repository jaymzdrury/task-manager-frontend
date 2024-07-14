"use client";
import React from "react";
import { TranslationContext } from "@/context/translation-context";
import Modal from "../common/modal";
import { translateComplete } from "@/lib/intl";
import { Complete } from "@/types/types";

type AddTaskModal = {
  title: Complete;
};
export default function AddTaskModal({
  title,
  children,
}: React.PropsWithChildren<AddTaskModal>): JSX.Element {
  const { dictonary } = React.useContext(TranslationContext);
  return (
    <Modal
      title={dictonary.addTask.title}
      description={`${dictonary.addTask.description} ${translateComplete(
        title,
        dictonary
      )}`}
    >
      {children}
    </Modal>
  );
}
