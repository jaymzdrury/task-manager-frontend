"use client";
import React from "react";
import { TranslationContext } from "@/context/translation-context";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import Modal from "../common/modal";

type RemoveUserModalProps = {
  userName: string;
};

export default function RemoveUserModal({
  userName,
  children,
}: React.PropsWithChildren<RemoveUserModalProps>): JSX.Element {
  const { dictonary } = React.useContext(TranslationContext);
  return (
    <Modal
      title={dictonary.removeUser.title}
      description={`${
        dictonary.removeUser.description.split(" ")[0]
      } ${userName} ${dictonary.removeUser.description.split(" ")[1]}?`}
    >
      <DialogFooter className="items-center">
        {children}
        <DialogClose className="hidden sm:block" asChild>
          <Button type="button" variant="secondary">
            {dictonary.removeTask.cancel}
          </Button>
        </DialogClose>
      </DialogFooter>
    </Modal>
  );
}
