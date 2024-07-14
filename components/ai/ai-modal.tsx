"use client";
import React from "react";
import { prompt } from "@/actions/ai";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import Modal from "../common/modal";
import SubmitButton from "../common/submit-button";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { t } from "@/lib/toast";
import { submitCountLimit } from "@/lib/formUtils";
import { cn, errMsg, formatAI } from "@/lib/utils";

import styles from "../../app/[locale]/styles.module.css";

export default function AiModal({ title }: { title: string }): JSX.Element {
  const [text, textSet] = React.useState<string>("");
  const form = useForm({ defaultValues: { title } });

  const onSubmit: SubmitHandler<FieldValues> = React.useCallback(
    async (entry) => {
      try {
        const { success, error, aiData } = await prompt({ title: entry.title });
        !success ? t(`⚠️ ${error}`) : textSet(aiData ?? "");
      } catch (e) {
        t(`⚠️ ${errMsg(e)}`);
      }
    },
    []
  );

  if (submitCountLimit(form)) t("⚠️ Too many tries");

  return (
    <Modal
      title="AI Suggestions"
      description={
        !form.watch("title").length
          ? "⚠️ Insufficient Data"
          : `Ask AI about ${title}`
      }
    >
      {form.formState.isSubmitting ? (
        <span className={cn(styles.center, "py-2")}>
          <Loader size={36} className="animate-spin text-user" />
        </span>
      ) : (
        <div
          aria-hidden={!text.length}
          className="max-h-40 text-sm overflow-scroll"
          dangerouslySetInnerHTML={{ __html: formatAI(text) }}
        />
      )}
      <DialogFooter className="items-center">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <SubmitButton
            form={form}
            disabled={!form.watch("title").length}
            className={styles.userButton}
            variant="default"
          >
            Ask
          </SubmitButton>
        </form>
        <DialogClose className="hidden sm:block" asChild>
          <Button type="button" variant="secondary">
            No
          </Button>
        </DialogClose>
      </DialogFooter>
    </Modal>
  );
}
