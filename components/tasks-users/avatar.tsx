import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "../ui/avatar";

type AvatarProps = {
  style?: string;
  userRole?: string;
};

export default function AvatarComponent({
  children,
  style,
  userRole,
}: React.PropsWithChildren<AvatarProps>): JSX.Element {
  return (
    <Avatar className={style}>
      <AvatarFallback
        className={
          !userRole
            ? undefined
            : cn(
                userRole === "auth"
                  ? "bg-destructive"
                  : userRole === "admin"
                  ? "bg-admin"
                  : "bg-user",
                "text-background select-none"
              )
        }
      >
        {children}
      </AvatarFallback>
    </Avatar>
  );
}
