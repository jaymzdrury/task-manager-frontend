"use client";
import React from "react";
import dynamic from "next/dynamic";
const AiModalLazy = dynamic(() =>
  import("./ai-modal").then((mod) => mod.default)
);
import { Dialog } from "../ui/dialog";

type AiModalProps = {
  title: string;
};

export default function AiContainer({
  title,
  children,
}: React.PropsWithChildren<AiModalProps>): JSX.Element {
  const [open, openSet] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={openSet}>
      {children}
      <AiModalLazy title={title} />
    </Dialog>
  );
}
