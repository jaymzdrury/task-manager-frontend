import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Column from "../column";

function renderColumn({
  title = "ToDo" as "ToDo",
  settings = <span>Settings</span>,
}) {
  render(<Column title={title} settings={settings}></Column>);
  return { title, settings };
}

test("Column wraps within an article", () => {
  renderColumn({});
  expect(screen.getByRole("article")).toBeVisible();
});

test("Column has an h2", () => {
  renderColumn({});
  expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
});

test("Column title renders properly", () => {
  const { title } = renderColumn({});
  expect(screen.getByText(title)).toHaveAttribute(
    "class",
    "text-2xl font-semibold"
  );
});
