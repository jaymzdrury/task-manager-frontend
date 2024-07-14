import dynamic from "next/dynamic";
const RemoveUserModalLazy = dynamic(() =>
  import("./remove-user-modal").then((mod) => mod.default)
);
import Tip from "../common/tooltip";
import Avatar from "./avatar";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { User as UserType } from "@/types/types";
import { cn } from "@/lib/utils";

import styles from "../../app/[locale]/styles.module.css";

type UserProps = {
  user: UserType;
  i: number;
};

export default function User({
  user,
  i,
  children,
}: React.PropsWithChildren<UserProps>): JSX.Element {
  return (
    <Dialog>
      <Tip
        tooltip={
          <DialogTrigger>
            <p className={cn(styles.center, "cursor-pointer")}>{user.name}</p>
          </DialogTrigger>
        }
      >
        <Avatar style={i > 0 ? "-ml-1" : undefined} userRole={user.role}>
          {user.name.charAt(0).toUpperCase()}
        </Avatar>
      </Tip>
      <RemoveUserModalLazy userName={user.name}>{children}</RemoveUserModalLazy>
    </Dialog>
  );
}
