import React from "react";
import Modal from "../common/modal";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Complete } from "@/types/types";

type DeleteAllTaskModalProps = {
  title: Complete;
};

export default function DeleteAllTaskModal({
  title,
  children,
}: React.PropsWithChildren<DeleteAllTaskModalProps>): JSX.Element {
  return (
    <Modal
      title="Delete All"
      description={`Are you sure you want to delete all tasks in ${title}?`}
    >
      <DialogFooter className="items-center">
        {children}
        <DialogClose className="hidden sm:block" asChild>
          <Button type="button" variant="secondary">
            No
          </Button>
        </DialogClose>
      </DialogFooter>
    </Modal>
  );
}
