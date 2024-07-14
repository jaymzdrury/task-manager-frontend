import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import FormContainer from "../form-container";

test("FormContainer styles class render", () => {
  render(<FormContainer></FormContainer>);
  expect(screen.getByRole("main")).toHaveAttribute(
    "class",
    "center pt-20 px-6"
  );
});
