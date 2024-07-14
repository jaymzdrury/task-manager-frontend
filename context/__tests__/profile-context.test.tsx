import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { ProfileContext } from "../profile-context";

const mockContext = {
  open: false,
  openSet: () => {},
};

test("ProfileContext renders with proper context", () => {
  render(
    <ProfileContext.Consumer>
      {(value) => {
        expect(value.open).toEqual(mockContext.open);
        return null;
      }}
    </ProfileContext.Consumer>
  );
});
