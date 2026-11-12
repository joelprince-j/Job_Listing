import { site } from "@/config/site";
import { CapLogo } from "./icons";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <CapLogo className="h-8 w-10 sm:h-9 sm:w-11" />
      <span className="font-display text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
        <span className={dark ? "text-white" : "text-navy"}>{site.brandFirst}</span>
        <span className="text-gold">{site.brandSecond}</span>
      </span>
    </span>
  );
}
