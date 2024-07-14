import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NavBar from "../navbar";

test("navbar styles render correctly", () => {
  render(<NavBar loadingClass="test" />);
  expect(screen.getByRole("navigation")).toHaveAttribute(
    "class",
    "between p-6 sticky top-0 z-10 bg-background"
  );
});
