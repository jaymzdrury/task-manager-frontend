import Checkbox from "../common/checkbox";
import { DropdownMenuContent } from "../ui/dropdown-menu";
import { Role, User } from "@/types/types";

const userValues = ["user", "admin", "auth"] as const;

export default function EditUserRoleMenu({
  user,
  children,
}: {
  user: User;
  children: (userValue: Role) => React.ReactNode;
}): JSX.Element {
  return (
    <DropdownMenuContent>
      {userValues.map((userValue) => (
        <Checkbox key={userValue} condition={userValue === user.role}>
          {children(userValue)}
        </Checkbox>
      ))}
    </DropdownMenuContent>
  );
}
