import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NotFoundLink from "../not-found-link";

function renderLink({ href = "/" as const, children = "Link" }) {
  render(<NotFoundLink href={href}>{children}</NotFoundLink>);
  return { href, children };
}

test("NotFoundLink renders link", () => {
  const { href, children } = renderLink({});
  expect(screen.findByText(children)).resolves.toHaveAttribute("href", href);
});

test("NotFoundLink styles class renders", () => {
  const { children } = renderLink({});
  expect(screen.findByText(children)).resolves.toHaveAttribute(
    "class",
    "center pt-2 pb-12"
  );
});
