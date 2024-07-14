"use client";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Select } from "../ui/select";
import { t } from "@/lib/toast";
import { errMsg } from "@/lib/utils";
import { Locale } from "@/types/types";

export default function IntlSelect({
  children,
}: React.PropsWithChildren): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as Locale;

  const onChange = (locale: Locale) => {
    try {
      const paths = pathname.split("/");
      paths.length > 2
        ? router.replace(`/${locale}/${paths.at(-1)}`)
        : router.replace(`/${locale}`);
    } catch (e) {
      t(`⚠️ ${errMsg(e)}`);
    }
  };

  return (
    <Select defaultValue={locale} onValueChange={onChange}>
      {children}
    </Select>
  );
}
