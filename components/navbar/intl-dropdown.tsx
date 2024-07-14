import React from "react";
import { SelectContent, SelectItem, SelectSeparator } from "../ui/select";
import { locales } from "@/types/schemas";

export default function IntlDropdown(): JSX.Element {
  return (
    <SelectContent>
      {locales.map((cur, i) => (
        <React.Fragment key={cur}>
          <SelectItem value={cur}>{cur}</SelectItem>
          {i !== locales.length - 1 ? <SelectSeparator /> : undefined}
        </React.Fragment>
      ))}
    </SelectContent>
  );
}
