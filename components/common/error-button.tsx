import React from "react";
import { Button } from "../ui/button";

export default function ErrorButton({
  reset,
}: {
  reset: () => void;
}): JSX.Element {
  return (
    <Button
      type="button"
      onClick={() => reset()}
      className="py-6 w-full text-md rounded-full"
      variant="default"
    >
      Try again
    </Button>
  );
}
