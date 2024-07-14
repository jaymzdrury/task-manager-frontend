"use client";
import React from "react";
import dynamic from "next/dynamic";
import { editUser } from "@/actions/users";
import { ProfileContext } from "@/context/profile-context";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useLocalStorage from "@/hooks/useLocalStorage";
import useSetInterval from "@/hooks/useSetInterval";

const EditUserClockinModalLazy = dynamic(() =>
  import("./edit-user-clockin-modal").then((mod) => mod.default)
);
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Play, Square, Loader2 } from "lucide-react";

import { t } from "@/lib/toast";
import { cn, elapsedTime, errMsg, formatTime } from "@/lib/utils";
import { idCheck, submitCountLimit, submitted } from "@/lib/formUtils";
import { user } from "@/types/schemas";
import { User } from "@/types/types";

import styles from "../../app/[locale]/styles.module.css";

export default function EditUserClockIn({
  currentUser,
}: {
  currentUser: User;
}): JSX.Element {
  const form = useForm<User>({
    defaultValues: { ...currentUser },
    resolver: zodResolver(user),
  });

  const { openSet } = React.useContext(ProfileContext);
  const [token, tokenSet] = useLocalStorage("clockedIn", false);
  const [sec, setSec] = React.useState(
    token
      ? currentUser.seconds + elapsedTime(new Date(currentUser.loggedIn))
      : currentUser.seconds
  );
  useSetInterval(() => setSec((prev) => prev + 1), token ? 1000 : null);

  const handleSubmit: SubmitHandler<User> = React.useCallback(
    async (entry) => {
      try {
        const { success, error } = await editUser(entry, {
          loggedIn: String(new Date(Date.now())),
          seconds: sec,
        });
        if (success) {
          tokenSet((prev: boolean) => !prev);
          token ? openSet(false) : undefined;
        } else {
          t(`⚠️ ${error}`);
        }
      } catch (e) {
        t(`⚠️ ${errMsg(e)}`);
      }
    },
    [openSet, sec, token, tokenSet]
  );

  const btnProps = {
    size: 14,
    fill: "background",
    onClick: idCheck(form.watch("_id"))
      ? () => t("⚠️ Invalid ID")
      : submitCountLimit(form)
      ? () => t("⚠️ Too many tries")
      : submitted(form)
      ? undefined
      : form.handleSubmit(handleSubmit),
  };

  return (
    <div className={cn(styles.start, "space-x-2 pl-1.5 pb-1.5")}>
      {submitted(form) ? (
        <Loader2
          size={btnProps.size}
          className={cn("animate-spin", styles.clockedInStyle)}
        />
      ) : !token ? (
        <Play {...btnProps} className={cn("bg-success", styles.clockInStyle)} />
      ) : (
        <Square
          {...btnProps}
          className={cn("bg-destructive animate-pulse", styles.clockInStyle)}
        />
      )}
      <Dialog>
        <DialogTrigger disabled={token} aria-disabled={token}>
          <p className="text-xs text-muted-foreground">{formatTime(sec)}</p>
        </DialogTrigger>
        <EditUserClockinModalLazy
          user={currentUser}
          sec={sec}
          setSec={setSec}
        />
      </Dialog>
    </div>
  );
}
