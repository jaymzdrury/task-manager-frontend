import { renderHook } from "@testing-library/react";
import useLocalStorage from "../useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => localStorage.clear());

  it("initializes value if no value exists", () => {
    const { result } = renderHook(() =>
      useLocalStorage("testKey", "initialValue")
    );
    expect(result.current[0]).toBe("initialValue");
  });

  it("retrieves value from localStorage if value exists", () => {
    localStorage.setItem("testKey", JSON.stringify("storedValue"));
    const { result } = renderHook(() =>
      useLocalStorage("testKey", "initialValue")
    );
    expect(result.current[0]).toBe("storedValue");
  });
});
