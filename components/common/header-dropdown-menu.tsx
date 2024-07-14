import { SelectContent, SelectGroup } from "../ui/select";
import { HeaderDropdownValues } from "@/types/types";
import HeaderDropdownItem from "./header-dropdown-item";

export default function HeaderDropdownMenu({
  values,
}: {
  values: HeaderDropdownValues[];
}): JSX.Element {
  return (
    <SelectContent>
      <SelectGroup>
        {values.map((value) => (
          <HeaderDropdownItem key={value} value={value} />
        ))}
      </SelectGroup>
    </SelectContent>
  );
}
