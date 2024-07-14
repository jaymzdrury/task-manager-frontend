"use client";
import React from "react";

type Listener<T> = (state: T) => void;

export function createState<T>(initValue: T) {
  return {
    listeners: [] as Listener<T>[],
    state: initValue,
  };
}

export function useGlobalState<T>(config: {
  state: T;
  listeners: Listener<T>[];
}): [T, (stateOrSetter: T) => void] {
  const stateSet = React.useCallback(
    (stateOrSetter: T | ((prevState: T) => T)) => {
      let next: T;
      if (typeof stateOrSetter === "function") {
        next = (stateOrSetter as (prevState: T) => T)(config.state);
      } else {
        next = stateOrSetter;
      }
      config.state = next;
      config.listeners.forEach((l) => l(next));
    },
    [config]
  );

  const state = React.useSyncExternalStore(
    (listener: Listener<T>) => {
      config.listeners.push(listener);
      return () => config.listeners.filter((l) => l !== listener);
    },
    () => config.state,
    () => config.state
  );
  return [state, stateSet];
}

export const DEFAULT_STATE = "0";
export const ID = createState(DEFAULT_STATE);
