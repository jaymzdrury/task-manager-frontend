import { Search as SearchLogo } from "lucide-react";

export default function Search({
  children,
}: React.PropsWithChildren): JSX.Element {
  return (
    <span className="relative w-3/5 lg:w-4/5 max-w-[1250px] 2xl:ml-20">
      <SearchLogo className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
      {children}
    </span>
  );
}
