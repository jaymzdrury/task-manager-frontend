import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import FormCard from "../form-card";

test("Form Card renders h3", () => {
  render(<FormCard title="Test" link="/register"></FormCard>);
  expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
});

test("Form Card has correct register link", () => {
  render(<FormCard title="Test" link="/register"></FormCard>);
  expect(screen.getByText("Not Registered?")).toHaveAttribute(
    "href",
    "/register"
  );
});

test("Form Card has correct login link", () => {
  render(<FormCard title="Test" link="/login"></FormCard>);
  expect(screen.getByText("Already Have an Account?")).toHaveAttribute(
    "href",
    "/login"
  );
});
