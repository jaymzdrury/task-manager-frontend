import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "@/components/common/header";

function renderHeader({ header = "Tasks" as "Tasks" }) {
  render(<Header title={header} loadingClass="test"></Header>);
  return { header };
}

test("Header renders h1", () => {
  renderHeader({});
  expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
});

test("Header wraps within a header", () => {
  renderHeader({});
  expect(screen.getByRole("banner")).toBeVisible();
});

test("Header title renders properly", () => {
  const { header } = renderHeader({});
  expect(screen.getByText(header)).toHaveAttribute(
    "class",
    "text-4xl font-semibold"
  );
});
