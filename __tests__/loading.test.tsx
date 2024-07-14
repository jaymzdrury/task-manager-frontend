import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import SkeletonCard from "@/app/[locale]/loading";

test("Loading renders loadingClass", () => {
  render(<SkeletonCard />);
  expect(screen.getByRole("banner")).toHaveAttribute(
    "class",
    "between loadingClass w-full max-w-[1225px] px-6 py-6 xl:px-0 mx-auto"
  );
});

test("Loading renders mainLayout", () => {
  render(<SkeletonCard />);
  expect(screen.getByRole("main")).toHaveAttribute("class", "mainLayout");
});

test("Loading renders columnContainer 3 times", () => {
  render(<SkeletonCard />);
  expect(screen.getAllByRole("article")).toHaveLength(3);
  expect(screen.getAllByRole("article")[0]).toHaveAttribute(
    "class",
    "columnContainer animate-pulse"
  );
});
