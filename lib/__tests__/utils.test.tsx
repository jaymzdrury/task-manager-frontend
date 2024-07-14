import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import {
  formatAI,
  formatHours,
  formatMinutes,
  formatSeconds,
  formattedDate,
  isNode,
} from "../utils";

test("Utils formats date correctly", () => {
  const date = new Date();
  render(<time>{formattedDate(date)}</time>);
  expect(screen.getByRole("time")).toBeVisible();
});

test("Utils formats hours correctly", () => {
  expect(formatHours(36000)).toEqual(10);
  expect(formatHours(3800)).toEqual("01");
  expect(formatHours(3500)).toEqual("00");
});

test("Utils formats minutes correctly", () => {
  expect(formatMinutes(600)).toEqual(10);
  expect(formatMinutes(64)).toEqual("01");
  expect(formatMinutes(58)).toEqual("00");
});

test("Utils formats seconds correctly", () => {
  expect(formatSeconds(72)).toEqual(12);
  expect(formatSeconds(64)).toEqual("04");
  expect(formatSeconds(8)).toEqual("08");
});

test("Utils formats AI correctly", () => {
  expect(formatAI("**Hello**")).toEqual("<br /><br /><b>Hello:</b><br />");
});

test("Utils isNode renders correctly", () => {
  expect(isNode(<span>Span</span>)).toBe(true);
  expect(isNode("Test")).toBe(false);
});
