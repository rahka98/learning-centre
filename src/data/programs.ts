/**
 * Programme catalogue. Add or edit a programme here — the Programmes page,
 * comparison table, detail pages, enquiry form and footer update automatically.
 * Durations are the usual durations for these degrees in India; exact
 * specialisations, eligibility and fees are set by Alagappa University.
 */
export type ProgramLevel = "Undergraduate" | "Postgraduate" | "Professional";

export type Program = {
  slug: string;
  code: string;
  title: string;
  level: ProgramLevel;
  duration: string;
  summary: string;
  overview: string;
  idealFor: string[];
  outcomes: string[];
};

export const programs: Program[] = [
  {
    slug: "undergraduate",
    code: "UG",
    title: "Undergraduate Degrees",
    level: "Undergraduate",
    duration: "Usually 3 years",
    summary: "Bachelor's degrees by distance education — study while you work or care for family.",
    overview:
      "Earn a recognised bachelor's degree from Alagappa University through its Directorate of Distance Education, with the Melur centre guiding you from choosing a stream to completing your admission.",
    idealFor: ["Students who have completed Class 12", "Working people who want a degree", "Learners who paused their studies and want to restart"],
    outcomes: ["A foundation degree for jobs and competitive exams", "The pathway into postgraduate study"],
  },
  {
    slug: "postgraduate",
    code: "PG",
    title: "Postgraduate Degrees",
    level: "Postgraduate",
    duration: "Usually 2 years",
    summary: "Master's degrees for graduates who want to specialise or move ahead in their careers.",
    overview:
      "Build on your bachelor's degree with a master's programme from Alagappa University's distance education directorate. The centre helps you compare options and complete every admission step.",
    idealFor: ["Graduates looking to specialise", "Teachers and professionals seeking a higher qualification", "Aspirants preparing for further academic roles"],
    outcomes: ["Deeper subject expertise", "Stronger eligibility for promotions and higher roles"],
  },
  {
    slug: "bed",
    code: "B.Ed",
    title: "Bachelor of Education",
    level: "Professional",
    duration: "Usually 2 years",
    summary: "The professional teaching qualification for graduates who want a career in schools.",
    overview:
      "The B.Ed prepares graduates for teaching careers. Eligibility conditions are set by the university — the centre will check your qualifications with you before you apply.",
    idealFor: ["Graduates planning a teaching career", "Teachers who need a formal teaching qualification"],
    outcomes: ["A recognised teaching qualification", "Eligibility for teacher recruitment processes"],
  },
  {
    slug: "mba",
    code: "MBA",
    title: "Master of Business Administration",
    level: "Professional",
    duration: "Usually 2 years",
    summary: "Management education for graduates and working professionals.",
    overview:
      "Develop management, finance, marketing and leadership skills through Alagappa University's distance MBA, with in-person guidance from the Melur centre.",
    idealFor: ["Working professionals aiming for managerial roles", "Graduates planning business careers", "Entrepreneurs and family-business owners"],
    outcomes: ["Business and leadership skills", "Better prospects for management positions"],
  },
  {
    slug: "mca",
    code: "MCA",
    title: "Master of Computer Applications",
    level: "Professional",
    duration: "Usually 2 years",
    summary: "Postgraduate computing for graduates heading into software and IT careers.",
    overview:
      "Strengthen your programming and computer applications knowledge through a distance MCA from Alagappa University. Eligibility depends on your graduation subjects — ask the centre to confirm.",
    idealFor: ["Graduates who want an IT career", "Professionals moving into software roles"],
    outcomes: ["Advanced computing and software knowledge", "A qualification valued in IT hiring"],
  },
  {
    slug: "msc",
    code: "M.Sc",
    title: "Master of Science",
    level: "Postgraduate",
    duration: "Usually 2 years",
    summary: "Science master's degrees for graduates who want to go further in their subject.",
    overview:
      "Continue your science education with an M.Sc programme offered through distance mode. The centre will walk you through the subjects available in the current admission cycle.",
    idealFor: ["Science graduates", "Teachers and lab professionals seeking a higher qualification"],
    outcomes: ["Subject specialisation", "A step towards teaching or research roles"],
  },
  {
    slug: "msw",
    code: "MSW",
    title: "Master of Social Work",
    level: "Professional",
    duration: "Usually 2 years",
    summary: "A professional degree for people who want to work in community and social development.",
    overview:
      "Prepare for careers with NGOs, community programmes, hospitals and welfare organisations through Alagappa University's distance MSW.",
    idealFor: ["Graduates passionate about community work", "People already working with NGOs or welfare programmes"],
    outcomes: ["Professional social work knowledge", "Career options across NGOs and welfare sectors"],
  },
];

export const programLevels = ["All", "Undergraduate", "Postgraduate", "Professional"] as const;

export function getProgram(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}
