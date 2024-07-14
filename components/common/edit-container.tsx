import React from "react";
import EditInput from "./edit-input";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import Tip from "./tooltip";
import { EditValues } from "@/types/types";

type EditContainerProps = {
  tip: string;
  edit: boolean;
  editSet: React.Dispatch<React.SetStateAction<boolean>>;
  type: EditValues;
  defaultValues: Record<EditValues, string>;
  onSubmit: SubmitHandler<FieldValues>;
};

export default function EditContainer({
  tip,
  edit,
  editSet,
  type,
  defaultValues,
  onSubmit,
  children,
}: React.PropsWithChildren<EditContainerProps>): JSX.Element {
  return (
    <>
      {edit ? (
        <EditInput
          type={type}
          defaultValues={defaultValues}
          onSubmit={onSubmit}
        >
          <Button
            type="button"
            onClick={() => editSet((prev) => !prev)}
            variant="ghost"
            size="sm"
          >
            <X />
          </Button>
        </EditInput>
      ) : (
        <Tip
          tooltip={
            <p
              role="button"
              className="cursor-pointer"
              onClick={() => editSet((prev) => !prev)}
            >
              {tip}
            </p>
          }
        >
          {children}
        </Tip>
      )}
    </>
  );
}
