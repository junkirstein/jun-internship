/**
 * ALL presentation content lives here.
 * Edit this file to change text, months, skills, coordinates and images.
 * No UI code needs to be touched.
 */

export const intro = {
  title: "My Internship Experience",
  role: "Materialise R&D Department Intern",
  author: "Prepared by Irweena",
  scrollHint: "Scroll to begin :D",
};

export const journey = {
  eyebrow: "The Journey",
  title: "Sarawak to Selangor",
  from: { label: "Kuching, Sarawak", note: "Where it started" },
  to: { label: "Petaling Jaya, Selangor", note: "Where I interned" },
  caption: "Across the South China Sea...",
};

export const skills = {
  title: "Skills I Learned Here",
  subtitle: "Some valuable skills i gained.",
  items: [
    {
      number: "01",
      title: "Software Verification and Validation",
      description: "Regression • Functional • Exploratory • Bugfix Validation",
      icon: "love",
    },
    {
      number: "02",
      title: "Automation & Test Scripting",
      description: "Test Script Refactoring • JSON Test Scenario Investigation • Automated Weekly Log Tool ",
      icon: "love",
    },
    {
      number: "03",
      title: " and More",
      description: "Bug identification and reporting • Version Control (Git) • Azure DevOps • Testing & Automation Frameworks: pytest, unittest, Playwright, pywinauto Data Analysis & Processing: Pandas, NumPy • MSAI" ,
      icon: "love",
    },
  ],
};

export type MonthDetail = { label: string; body: string };

export type Month = {
  month: string;
  short: string;
  theme: string;
  summary: string;
  details: MonthDetail[];
  /** Optional image URL (leave empty to show a placeholder frame). */
  image?: string;
};

export const timeline = {
  eyebrow: "Key Learnings",
  title: "Seven months, month by month",
  hint: "Scroll to move through the months",
};

export const months: Month[] = [
  {
    month: "February",
    short: "Feb",
    theme: "My first week here!",
    summary: " ",
    details: [
      { label: "Tasks", body: "Started with the onboarding process." },
      { label: "What I learned", body: "Completed onboarding and corporate policies and regulated software practices." },
      { label: "Challenge", body: "Gaining familiarity with the work environment." },
    ],
  },
  {
    month: "March",
    short: "Mar",
    theme: "Getting used to the software",
    summary: " ",
    details: [
      { label: "Tasks", body: "Developed foundational knowledge of 3D design software." },
      { label: "What I learned", body: "Practiced Agile estimation techniques." }
    ],
  },
  {
    month: "April",
    short: "Apr",
    theme: "My first real project",
    summary: " ",
    details: [
      { label: "Tasks", body: "Gained hands on experience with regression testing across multiple requirements. Involved in validating and verifying Bugfix 20.0.1 release." },
      { label: "Observation", body: "Bug reporting, Report documentation, Introduction to Git Extensions." },
      { label: "Small achievement", body: "Completed RT on 12 requirements, 1 week before the end of the sprint." },
    ],
  },
  {
    month: "May",
    short: "May",
    theme: "Getting the hang of things",
    summary: " ",
    details: [
      { label: "Tasks", body: "Participated in validation and verification of Beta release. Continued RT on 3 more requirements." },
      { label: "Observation", body: "Customer feedback, Sprint Demo of Bugfix and Beta release." },
      { label: "What I learned", body: "Software piracy detection scenarios." }
    ],
  },
  {
    month: "June",
    short: "Jun",
    theme: "Finally wrapping up",
    summary: " ",
    details: [
      { label: "Tasks", body: "Expanded regression testing coverage across more requirements." },
      { label: "Observation", body: " Gained exposure to PI planning and quarterly updates during townhall." }
    ],
  },
  {
    month: "July",
    short: "Jul",
    theme: "The real challenge",
    summary: " ",
    details: [
      { label: "Tasks", body: "Feature acceptance testing for Student Edition release. Refactored functional test scripts for efficiency. Exploratory testing." },
      { label: "Small achievement", body: "Succesfully contributed to the test automation on 2 requirements." }
    ],
  },
  {
    month: "August",
    short: "Aug",
    theme: "Taking opportunities and learning more",
    summary: " ",
    details: [
      { label: "Tasks", body: "Applied exploratory testing to broaden coverage." }
    ],
  },
];

export type QuizOption = {
  key: "A" | "B" | "C" | "D";
  label: string;
  lat: number;
  lng: number;
};

export const quiz = {
  intro: "Okay... were you paying attention?",
  question: "Where is Irweena from?",
  correctKey: "D" as const,
  options: [
    { key: "A", label: "Kuching", lat: 1.2533, lng: 109.3592 },
    { key: "B", label: "Sandakan", lat: 4.5002, lng: 119.2179 },
    { key: "C", label: "Bintulu", lat: 2.7067, lng: 113.0333 },
    { key: "D", label: "Sri Aman", lat: 1.2372, lng: 111.4626 },
  ] satisfies QuizOption[],
  correctNote: "Sri Aman, Sarawak — a small district part of Sarawak.",
  wrongNote: "Close, but not quite. Here is the difference.",
};

export const ending = {
  title: "Thank You",
  subtitle: "Internship Experience",
  author: "Prepared by Irweena",
  note: "Are there any questions? :D",
};

/** Section labels used by the progress rail. */
export const sections = [
  { id: "intro", label: "Introduction" },
  { id: "journey", label: "My Journey" },
  { id: "skills", label: "Skills" },
  { id: "orbit", label: "Key Learnings" },
  { id: "quiz", label: "Quiz :D" },
  { id: "ending", label: "Thanks <3" },
];
