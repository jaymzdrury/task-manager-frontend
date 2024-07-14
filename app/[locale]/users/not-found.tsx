import { getLocale } from "next-intl/server";
import ErrorLayout from "@/layouts/error-layout";
import NotFoundLink from "@/components/common/not-found-link";
import { paths } from "@/lib/utils";

export default async function NotFound(): Promise<JSX.Element> {
  const locale = await getLocale();
  return (
    <ErrorLayout
      header="404"
      title="So sorry"
      message="we couldn't find what you were looking for..."
    >
      <NotFoundLink href={`/${locale}` + paths.USERS}>
        Back to User Page
      </NotFoundLink>
    </ErrorLayout>
  );
}
