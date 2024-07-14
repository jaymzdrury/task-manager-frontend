import { renderHook, act } from "@testing-library/react";
import useSetInterval from "../useSetInterval";

describe("useSetInterval", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.clearAllTimers());

  const callback = jest.fn();
  const delay = 1000;

  it("delays correctly", () => {
    renderHook(() => useSetInterval(callback, delay));
    act(() => jest.advanceTimersByTime(delay - 1));
    expect(callback).not.toHaveBeenCalled();

    act(() => jest.advanceTimersByTime(1));
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
