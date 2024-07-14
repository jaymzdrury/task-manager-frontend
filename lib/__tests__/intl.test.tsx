import "@testing-library/jest-dom";
import { getLocale, translateComplete } from "../intl";
import en from "../../dictionaries/en.json";
import zw from "../../dictionaries/zh-tw.json";

test("intl translates complete correctly", () => {
  expect(translateComplete("ToDo", en)).toEqual("ToDo");
  expect(translateComplete("ToDo", zw)).toEqual("去做");
});

test("intl formats locale correctly", () => {
  expect(getLocale("localhost:3000/en")).toEqual("en");
});
