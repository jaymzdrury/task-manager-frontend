import dynamic from "next/dynamic";
const IntlDropdownLazy = dynamic(() =>
  import("./intl-dropdown").then((mod) => mod.default)
);
import { Globe } from "lucide-react";
import IntlSelect from "./intl-select";
import { SelectTrigger } from "../ui/select";

export default function Intl(): JSX.Element {
  return (
    <IntlSelect>
      <SelectTrigger
        aria-label="internationalization dropdown button"
        className="border-none"
      >
        <Globe />
      </SelectTrigger>
      <IntlDropdownLazy />
    </IntlSelect>
  );
}
