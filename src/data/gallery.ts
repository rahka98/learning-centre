import { images, type SiteImage } from "@/config/images";

/**
 * Data-driven gallery. Add a photo: import it in src/config/images.ts (or here),
 * then append an entry. Any size/orientation works — the grid adapts.
 */
export type GalleryItem = { id: string; image: SiteImage; caption: string; category: "Learning" | "Guidance" | "Milestones" };

export const galleryCategories = ["All", "Learning", "Guidance", "Milestones"] as const;

export const gallery: GalleryItem[] = [
  { id: "learning-together", image: images.hero, caption: "Learning together", category: "Learning" },
  { id: "one-to-one", image: images.guidance, caption: "One-to-one admission guidance", category: "Guidance" },
  { id: "graduation", image: images.graduate, caption: "The day it all pays off", category: "Milestones" },
  { id: "materials", image: images.studyMaterials, caption: "Self-study, made manageable", category: "Learning" },
];
