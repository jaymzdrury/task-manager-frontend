"use client";
import React from "react";
import { editTask } from "@/actions/tasks";
import { SubmitHandler } from "react-hook-form";
import EditContainer from "../common/edit-container";
import { t } from "@/lib/toast";
import { errMsg } from "@/lib/utils";
import { EditValues, Task } from "@/types/types";

type TaskEditProps = {
  cardInfo: Task;
  type: EditValues;
};

type taskTypes = "title" | "description";

export default function TaskCardEdit({
  cardInfo,
  type,
  children,
}: React.PropsWithChildren<TaskEditProps>): JSX.Element {
  const [edit, editSet] = React.useState<boolean>(false);

  const defaultValues = { [type]: cardInfo[type as taskTypes] };

  const onSubmit: SubmitHandler<typeof defaultValues> = React.useCallback(
    async (entry) => {
      try {
        const { error, success } = await editTask(cardInfo, entry);
        if (success) {
          t(`✅ Edited ${type}`);
          editSet(false);
        } else {
          t(`⚠️ ${error}`);
        }
      } catch (e) {
        t(`⚠️ ${errMsg(e)}`);
      }
    },
    [cardInfo, type]
  );

  return (
    <EditContainer
      tip={cardInfo[type as taskTypes]}
      type={type}
      edit={edit}
      editSet={editSet}
      onSubmit={onSubmit}
      defaultValues={defaultValues as Record<EditValues, string>}
    >
      {children}
    </EditContainer>
  );
}
