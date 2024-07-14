"use client";
import { Switch } from "../ui/switch";
import { useTheme } from "next-themes";

export default function LightMode({
  loadingClass,
}: {
  loadingClass?: string;
}): JSX.Element {
  const { setTheme, theme } = useTheme();
  return (
    <Switch
      aria-label="light mode toggle switch"
      className={loadingClass}
      disabled={!!loadingClass}
      aria-disabled={!!loadingClass}
      onClick={
        loadingClass
          ? undefined
          : () => setTheme(theme === "light" ? "dark" : "light")
      }
    />
  );
}
