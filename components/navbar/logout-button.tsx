"use client";
import { TranslationContext } from "@/context/translation-context";
import React from "react";

export default function Logout(): JSX.Element {
  const { dictonary } = React.useContext(TranslationContext);
  return <button type="submit">{dictonary.logout}</button>;
}
