"use client";
import React from "react";
import { EditValues, User } from "@/types/types";
import { SubmitHandler } from "react-hook-form";
import EditContainer from "../common/edit-container";
import { editUser } from "@/actions/users";
import { t } from "@/lib/toast";
import { errMsg } from "@/lib/utils";

type UserEditProps = {
  cardInfo: User;
  type: EditValues;
};

type userTypes = "name" | "email";

export default function UserCardEdit({
  cardInfo,
  type,
  children,
}: React.PropsWithChildren<UserEditProps>): JSX.Element {
  const [edit, editSet] = React.useState(false);

  const defaultValues = { [type]: cardInfo[type as "name" | "email"] };

  const onSubmit: SubmitHandler<typeof defaultValues> = React.useCallback(
    async (entry) => {
      try {
        const { error, success } = await editUser(cardInfo, entry);
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
      tip={cardInfo[type as userTypes]}
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
