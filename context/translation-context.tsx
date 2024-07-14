"use client";
import React from "react";
import en from "../dictionaries/en.json";
import { Dictionaries } from "@/types/types";

type TranslationContextProps = {
  dictonary: Dictionaries;
};

export const TranslationContext = React.createContext<TranslationContextProps>({
  dictonary: en,
});

export default function TranslationContextProvider({
  dictonary,
  children,
}: React.PropsWithChildren<TranslationContextProps>): JSX.Element {
  return (
    <TranslationContext.Provider value={{ dictonary }}>
      {children}
    </TranslationContext.Provider>
  );
}
