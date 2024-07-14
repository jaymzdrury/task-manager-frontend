import { notFound } from "next/navigation";
import { CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { isNode } from "@/lib/utils";

import styles from "../../../app/[locale]/styles.module.css";

export default function CardBody({
  details,
  title,
  description,
  ellipsis,
}: {
  details: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  ellipsis: React.ReactNode;
}): JSX.Element {
  if (!isNode(title || description || ellipsis || details)) return notFound();

  return (
    <>
      <CardHeader>
        <CardDescription className={styles.between}>
          {details}
          <span className="flex space-x-2">{ellipsis}</span>
        </CardDescription>
        {title}
      </CardHeader>
      <CardContent>{description}</CardContent>
    </>
  );
}
