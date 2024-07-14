import React from "react";

function getLocalStorageValue<T extends string, K>(key: T, initialValue: K) {
  const itemFromStorage =
    typeof localStorage !== "undefined" ? localStorage.getItem(key) : undefined;
  return itemFromStorage ? JSON.parse(itemFromStorage) : initialValue;
}

export default function useLocalStorage<T extends string, K>(
  key: T,
  initialValue: K
) {
  const [localStorageValue, setLocalStorageValue] = React.useState(() =>
    getLocalStorageValue(key, initialValue)
  );

  const setValue = (value: unknown) => {
    const valueToStore =
      value instanceof Function ? value(localStorageValue) : value;
    setLocalStorageValue(value);
    localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [localStorageValue, setValue];
}
