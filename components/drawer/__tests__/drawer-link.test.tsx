import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import DrawerLink from "../drawer-link";

test("Drawer renders link", () => {
  render(<DrawerLink href="/">Link</DrawerLink>);
  expect(screen.findByText("Link")).resolves.toHaveAttribute("href", "/");
});
