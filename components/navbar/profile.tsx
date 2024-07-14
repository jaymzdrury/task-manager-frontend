"server only";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
const ProfileDropdownLazy = dynamic(() =>
  import("./profile-dropdown").then((mod) => mod.default)
);
import ProfileContextProvider from "@/context/profile-context";
import EditUserClockIn from "../users-edit/edit-user-clockin";
import Avatar from "../tasks-users/avatar";
import { DropdownMenuTrigger } from "../ui/dropdown-menu";
import { cookieValues } from "@/lib/utils";
import { User } from "@/types/types";

export default function Profile({
  users,
}: {
  users: User[];
}): JSX.Element | undefined {
  const userName = cookies().get(cookieValues.USERNAME)?.value;
  const currentUser = users.find((u) => u.name === userName);

  if (!userName || !currentUser) return undefined;

  return (
    <ProfileContextProvider>
      <DropdownMenuTrigger role="button" asChild>
        <Avatar style="cursor-pointer" userRole={currentUser.role}>
          {currentUser.name.charAt(0).toUpperCase()}
        </Avatar>
      </DropdownMenuTrigger>
      <ProfileDropdownLazy currentUser={currentUser}>
        <EditUserClockIn currentUser={currentUser} />
      </ProfileDropdownLazy>
    </ProfileContextProvider>
  );
}
