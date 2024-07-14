import { logout } from "@/actions/login";
import Logout from "./logout-button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { User } from "@/types/types";

type ProfileDropdownProps = {
  currentUser: User;
};

export default function ProfileDropdown({
  currentUser,
  children,
}: React.PropsWithChildren<ProfileDropdownProps>): JSX.Element {
  return (
    <DropdownMenuContent className="w-56 mr-6">
      <DropdownMenuLabel>{currentUser.name}</DropdownMenuLabel>
      {children}
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <form action={logout}>
          <Logout />
        </form>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
