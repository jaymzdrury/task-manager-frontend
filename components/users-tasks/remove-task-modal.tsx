"use client";
import React from "react";
import { TranslationContext } from "@/context/translation-context";
import Modal from "../common/modal";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";

export default function RemoveTaskModal({
  children,
}: React.PropsWithChildren): JSX.Element {
  const { dictonary } = React.useContext(TranslationContext);
  return (
    <Modal
      title={dictonary.removeTask.title}
      description={dictonary.removeTask.description}
    >
      <DialogFooter className="items-center">
        {children}
        <DialogClose className="hidden sm:block" asChild>
          <Button type="button" aria-label="cancel" variant="secondary">
            {dictonary.removeTask.cancel}
          </Button>
        </DialogClose>
      </DialogFooter>
    </Modal>
  );
}
