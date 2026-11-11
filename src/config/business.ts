/**
 * Single source of truth for every business detail shown on the website.
 * Update values here and every page (header, footer, contact, SEO data) follows.
 * Only verified details are listed. Items marked "CONFIRM" need the owner's confirmation.
 */
export const business = {
  name: "Alagappa University Study Centre",
  shortName: "AU Study Centre",
  location: "Melur",
  tagline: "Distance education, guided in person",
  category: "Learner Support Centre — Directorate of Distance Education, Alagappa University, Karaikudi",

  phone: {
    display: "080988 91689",
    international: "+91 80988 91689",
    tel: "+918098891689",
  },
  // CONFIRM: assumed to be the same number as the phone line.
  whatsapp: "918098891689",
  // No public email was found. Add one here (e.g. "centre@example.com") to show email links.
  email: "" as string,

  address: {
    line1: "No. 154, 155, Karthik Complex",
    line2: "Alagar Kovil Road, near Indian Bank",
    locality: "Melur",
    district: "Madurai District",
    region: "Tamil Nadu",
    postalCode: "625106",
    country: "IN",
    full: "No. 154, 155, Karthik Complex, Alagar Kovil Rd, near Indian Bank, Melur, Tamil Nadu 625106",
  },
  geo: { lat: 10.0326854, lng: 78.3409635 },

  maps: {
    place:
      "https://www.google.com/maps/place/Alagappa+University+Study+Centre/@10.0326854,78.3409635,17z/data=!3m1!4b1!4m6!3m5!1s0x3b00bf8d11ad65a9:0xfb227e9c70b7eba6!8m2!3d10.0326854!4d78.3409635!16s%2Fg%2F11nxs4btgg",
    directions: "https://www.google.com/maps/dir/?api=1&destination=10.0326854,78.3409635",
    embed: "https://maps.google.com/maps?q=Alagappa%20University%20Study%20Centre%2C%20Melur&ll=10.0326854,78.3409635&z=17&output=embed",
    reviews: "https://www.google.com/maps/place/Alagappa+University+Study+Centre/@10.0326854,78.3409635,17z/data=!4m8!3m7!1s0x3b00bf8d11ad65a9:0xfb227e9c70b7eba6!8m2!3d10.0326854!4d78.3409635!9m1!1b1",
  },

  // Google listing shows "Opens 9 am Mon". Full weekly timings are not published.
  hours: {
    opens: "9:00 AM",
    summary: "Opens 9:00 AM",
    note: "Daily closing time and holidays are not listed publicly — please call before visiting.",
  },

  ratings: [
    { source: "Google", value: 4.9, count: 221, url: "https://www.google.com/maps/place/Alagappa+University+Study+Centre/@10.0326854,78.3409635,17z/data=!4m8!3m7!1s0x3b00bf8d11ad65a9:0xfb227e9c70b7eba6!8m2!3d10.0326854!4d78.3409635!9m1!1b1" },
    { source: "Justdial", value: 5.0, count: 212, url: "" },
  ],

  social: {
    instagram: { handle: "@s.raja3536", url: "https://www.instagram.com/s.raja3536/" },
  },

  university: {
    name: "Alagappa University, Karaikudi",
    directorate: "Directorate of Distance Education",
    url: "https://alagappauniversity.ac.in/",
  },
} as const;

export type Business = typeof business;
