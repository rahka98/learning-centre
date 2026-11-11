import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({ eyebrow, title, lead, align = "left", className, as: H = "h2" }: { eyebrow?: string; title: ReactNode; lead?: ReactNode; align?: "left" | "center"; className?: string; as?: "h1" | "h2" }) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className={cn("eyebrow", align === "center" && "justify-center")}>{eyebrow}</p>}
      <H className={cn("mt-4", H === "h1" ? "text-display" : "text-h2")}>{title}</H>
      {lead && <p className={cn("text-lead mt-5", align === "center" && "mx-auto max-w-2xl")}>{lead}</p>}
    </Reveal>
  );
}
