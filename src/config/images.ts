/**
 * Central image registry. Replace a photo by swapping the imports below —
 * every section that uses it updates automatically. See IMAGE-GUIDE.txt.
 */
import heroJpg from "@/assets/images/hero/hero-main.jpg";
import hero960 from "@/assets/images/hero/hero-main-960.webp";
import hero1920 from "@/assets/images/hero/hero-main-1920.webp";
import aboutJpg from "@/assets/images/about/about-guidance.jpg";
import about640 from "@/assets/images/about/about-guidance-640.webp";
import about1200 from "@/assets/images/about/about-guidance-1200.webp";
import studyJpg from "@/assets/images/gallery/study-materials.jpg";
import study640 from "@/assets/images/gallery/study-materials-640.webp";
import study1200 from "@/assets/images/gallery/study-materials-1200.webp";
import gradJpg from "@/assets/images/gallery/graduate-moment.jpg";
import grad640 from "@/assets/images/gallery/graduate-moment-640.webp";
import grad1200 from "@/assets/images/gallery/graduate-moment-1200.webp";

export type SiteImage = {
  src: string; // fallback (JPG/PNG)
  webp?: string; // responsive WebP srcset
  width: number;
  height: number;
  alt: string;
  /** CSS object-position — keeps faces/subjects in frame when cropped */
  focus?: string;
  /** true while the photo is a representative image, not of the centre itself */
  illustrative?: boolean;
};

export const images = {
  hero: {
    src: heroJpg,
    webp: `${hero960} 960w, ${hero1920} 1920w`,
    width: 1920,
    height: 1152,
    alt: "Adult learners studying together with textbooks and a laptop",
    focus: "45% 40%",
    illustrative: true,
  },
  guidance: {
    src: aboutJpg,
    webp: `${about640} 640w, ${about1200} 1200w`,
    width: 1200,
    height: 912,
    alt: "A counsellor explaining a course brochure to a learner",
    focus: "35% 35%",
    illustrative: true,
  },
  studyMaterials: {
    src: studyJpg,
    webp: `${study640} 640w, ${study1200} 1200w`,
    width: 1200,
    height: 912,
    alt: "Course books, a notebook and a pen on a study desk",
    focus: "50% 50%",
    illustrative: true,
  },
  graduate: {
    src: gradJpg,
    webp: `${grad640} 640w, ${grad1200} 1200w`,
    width: 1200,
    height: 1504,
    alt: "A smiling graduate holding her certificate with family behind her",
    focus: "55% 30%",
    illustrative: true,
  },
} satisfies Record<string, SiteImage>;
