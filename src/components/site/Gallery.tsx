import { useState } from "react";
import { X } from "lucide-react";
import { gallery, galleryCategories } from "@/data/gallery";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { SmartImage } from "./SmartImage";

/** Filterable masonry gallery with lightbox. Driven entirely by src/data/gallery.ts. */
export function Gallery() {
  const [cat, setCat] = useState<(typeof galleryCategories)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);
  const items = cat === "All" ? gallery : gallery.filter((g) => g.category === cat);
  const active = open !== null ? items[open] : null;

  return (
    <div>
      <div role="tablist" aria-label="Gallery categories" className="flex flex-wrap gap-2">
        {galleryCategories.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={cat === c}
            onClick={() => setCat(c)}
            className={cn(
              "h-11 rounded-full border px-5 text-sm font-semibold transition-colors",
              cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:border-gold",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <ul className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>li]:mb-5">
        {items.map((g, i) => (
          <li key={g.id} className="break-inside-avoid">
            <button type="button" onClick={() => setOpen(i)} className="group block w-full overflow-hidden rounded-3xl border border-border bg-card text-left shadow-soft" aria-label={`View larger: ${g.caption}`}>
              <SmartImage image={g.image} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" imgClassName="transition-transform duration-700 group-hover:scale-[1.04]" />
              <span className="flex items-center justify-between gap-3 px-5 py-4">
                <span className="font-display text-lg text-foreground">{g.caption}</span>
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">{g.category}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      {gallery.some((g) => g.image.illustrative) && (
        <p className="mt-2 text-xs text-muted-foreground">Representative images. Photos of the Melur centre will be added soon.</p>
      )}

      <Dialog open={active !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-5xl border-border bg-card p-3 sm:p-4 [&>button]:hidden">
          {active && (
            <>
              <DialogTitle className="sr-only">{active.caption}</DialogTitle>
              <SmartImage image={active.image} fit="contain" className="max-h-[78vh] rounded-2xl bg-background" ratio={`${active.image.width} / ${active.image.height}`} sizes="90vw" />
              <div className="flex items-center justify-between gap-4 px-2 pt-3">
                <p className="font-display text-lg">{active.caption}</p>
                <button onClick={() => setOpen(null)} className="grid size-11 place-items-center rounded-full border border-border" aria-label="Close">
                  <X className="size-5" />
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
