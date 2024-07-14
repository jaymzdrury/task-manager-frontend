"use client";
import { captureException } from "@sentry/nextjs";
import ErrorLayout from "@/layouts/error-layout";
import ErrorButton from "@/components/common/error-button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): JSX.Element {
  captureException(error);

  return (
    <html lang="en">
      <body>
        <ErrorLayout header="500" title="Oops!" message={error.message}>
          <ErrorButton reset={reset} />
        </ErrorLayout>
      </body>
    </html>
  );
}
