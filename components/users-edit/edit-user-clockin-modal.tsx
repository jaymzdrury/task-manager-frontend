"use client";
import React from "react";
import { editUser } from "@/actions/users";
import { TranslationContext } from "@/context/translation-context";
import { SubmitHandler, useForm } from "react-hook-form";
import EditUserInput from "../tasks-users/edit-user-input";
import Modal from "../common/modal";
import SubmitButton from "../common/submit-button";
import { Form } from "../ui/form";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { t } from "@/lib/toast";
import {
  cn,
  errMsg,
  formatHours,
  formatMinutes,
  formatSeconds,
} from "@/lib/utils";
import { clockInWatch } from "@/lib/formUtils";
import { User } from "@/types/types";

import styles from "../../app/[locale]/styles.module.css";

export default function EditUserClockinModal({
  user,
  sec,
  setSec,
}: {
  user: User;
  sec: number;
  setSec: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element {
  const { dictonary } = React.useContext(TranslationContext);
  const defaultEditValues = {
    currentUser: user,
    loggedIn: String(new Date(Date.now())),
    hours: Number(formatHours(sec)),
    minutes: Number(formatMinutes(sec)),
    seconds: Number(formatSeconds(sec)),
  };

  const form = useForm({ defaultValues: defaultEditValues });

  const onSubmit: SubmitHandler<typeof defaultEditValues> = React.useCallback(
    async (entry) => {
      try {
        const totalSeconds =
          Number(entry.hours) * 3600 +
          Number(entry.minutes) * 60 +
          Number(entry.seconds);
        const { success, error, putUserData } = await editUser(
          entry.currentUser,
          {
            loggedIn: entry.loggedIn,
            seconds: totalSeconds,
          }
        );
        success ? setSec(putUserData.seconds) : t(`⚠️ ${error}`);
        if (!success) t(`⚠️ ${error}`);
      } catch (e) {
        t(`⚠️ ${errMsg(e)}`);
      }
    },
    [setSec]
  );

  return (
    <Modal
      title={dictonary.clockIn.title}
      description={dictonary.clockIn.description}
    >
      <Form {...form}>
        <form
          className={cn(styles.start, "space-x-4")}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <EditUserInput type="hours" form={form} />
          <span>:</span>
          <EditUserInput type="minutes" form={form} />
          <span>:</span>
          <EditUserInput type="seconds" form={form} />
          <DialogFooter className="items-center">
            <DialogClose>
              <SubmitButton
                disabled={clockInWatch(form, defaultEditValues)}
                form={form}
                className="userButton"
                variant="default"
              >
                Edit
              </SubmitButton>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </Modal>
  );
}
