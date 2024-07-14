"use client";
import { captureException } from "@sentry/nextjs";
import ErrorLayout from "@/layouts/error-layout";
import ErrorButton from "@/components/common/error-button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string; statusCode: number };
  reset: () => void;
}): JSX.Element {
  captureException(error);

  return (
    <ErrorLayout
      header={error.statusCode ?? "400"}
      title="Oops!"
      message={error.message}
    >
      <ErrorButton reset={reset} />
    </ErrorLayout>
  );
}
