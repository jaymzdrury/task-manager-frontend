import { getLocale } from "next-intl/server";
import ErrorLayout from "@/layouts/error-layout";
import NotFoundLink from "@/components/common/not-found-link";

export default async function NotFound(): Promise<JSX.Element> {
  const locale = await getLocale();

  return (
    <ErrorLayout
      header="404"
      title="So sorry"
      message="we couldn't find what you were looking for..."
    >
      <NotFoundLink href={`/${locale}`}>Back to Main Page</NotFoundLink>
    </ErrorLayout>
  );
}
