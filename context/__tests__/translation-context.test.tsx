import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { TranslationContext } from "../translation-context";
import en from "../../dictionaries/en.json";

const mockContext = {
  dictonary: en,
};

test("ProfileContext renders with proper context", () => {
  render(
    <TranslationContext.Consumer>
      {(value) => {
        expect(value.dictonary).toEqual(mockContext.dictonary);
        return null;
      }}
    </TranslationContext.Consumer>
  );
});
