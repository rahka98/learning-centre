import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { business } from "@/config/business";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { SealMark, WhatsAppIcon } from "./icons";
import { mainNav } from "./nav";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label={`${business.name}, ${business.location} — home`}>
      <SealMark className="size-10 shrink-0 transition-transform duration-500 group-hover:rotate-12" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.05rem] font-semibold tracking-tight text-foreground sm:text-[1.15rem]">Alagappa University</span>
        <span className={cn("mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground", compact && "hidden sm:block")}>Study Centre · Melur</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("sticky top-0 z-50 transition-all duration-500", scrolled ? "glass border-x-0 border-t-0 shadow-soft" : "border-b border-transparent bg-transparent")}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-4">
        <Brand compact />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className="relative rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-500 data-[status=active]:after:scale-x-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="hero" size="pill" className="hidden md:inline-flex">
            <a href={`tel:${business.phone.tel}`}>
              <Phone /> {business.phone.display}
            </a>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <button type="button" className="grid size-11 place-items-center rounded-full border border-border bg-card/60 lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-full max-w-sm flex-col border-l border-border bg-background p-0 [&>button]:hidden">
              <div className="flex h-[4.5rem] items-center justify-between border-b border-border px-5">
                <SheetTitle asChild>
                  <span className="font-display text-lg">Menu</span>
                </SheetTitle>
                <SheetClose className="grid size-11 place-items-center rounded-full border border-border" aria-label="Close menu">
                  <X className="size-5" />
                </SheetClose>
              </div>
              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
                <ul className="space-y-1">
                  {mainNav.map((item, i) => (
                    <li key={item.to}>
                      <SheetClose asChild>
                        <Link
                          to={item.to}
                          activeOptions={{ exact: item.to === "/" }}
                          className="flex items-baseline justify-between rounded-xl px-3 py-3.5 font-display text-2xl text-foreground transition-colors hover:bg-surface data-[status=active]:text-maroon"
                        >
                          {item.label}
                          <span className="font-sans text-xs text-muted-foreground">0{i + 1}</span>
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                  <li>
                    <SheetClose asChild>
                      <Link to="/faq" className="flex rounded-xl px-3 py-3.5 font-display text-2xl text-foreground hover:bg-surface data-[status=active]:text-maroon">
                        FAQ
                      </Link>
                    </SheetClose>
                  </li>
                </ul>
              </nav>
              <div className="grid gap-3 border-t border-border p-5">
                <Button asChild variant="hero" size="xl">
                  <a href={`tel:${business.phone.tel}`}>
                    <Phone /> Call {business.phone.display}
                  </a>
                </Button>
                <Button asChild variant="whatsapp" size="xl">
                  <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon className="size-5" /> WhatsApp us
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
