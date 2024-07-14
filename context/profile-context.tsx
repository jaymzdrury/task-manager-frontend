"use client";
import React from "react";
import { DropdownMenu } from "@/components/ui/dropdown-menu";

type ProfileContextProps = {
  open: boolean;
  openSet: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ProfileContext = React.createContext<ProfileContextProps>({
  open: false,
  openSet: () => {},
});

export default function ProfileContextProvider({
  children,
}: React.PropsWithChildren): JSX.Element {
  const [open, openSet] = React.useState<boolean>(false);
  return (
    <ProfileContext.Provider value={{ open, openSet }}>
      <DropdownMenu open={open} onOpenChange={openSet}>
        {children}
      </DropdownMenu>
    </ProfileContext.Provider>
  );
}
