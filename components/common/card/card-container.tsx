"use client";
import { Card } from "@/components/ui/card";
import { ID, useGlobalState } from "@/hooks/useGlobalState";
import { Id } from "@/types/types";
import { cn } from "@/lib/utils";

type CardContainerProps = {
  id: Id;
};

export default function CardContainer({
  id,
  children,
}: React.PropsWithChildren<CardContainerProps>): JSX.Element {
  const [idState] = useGlobalState(ID);
  const wiggle = idState === id ? "animate-wiggle" : undefined;

  return <Card className={cn("w-[350px] mb-4", wiggle)}>{children}</Card>;
}
