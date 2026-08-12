/**
 * ALL presentation content lives here.
 * Edit this file to change text, months, skills, coordinates and images.
 * No UI code needs to be touched.
 */

export const intro = {
  title: "My Internship Experience",
  role: "Software Testing Intern",
  author: "Prepared by Irweena",
  scrollHint: "Scroll to begin",
};

export const journey = {
  eyebrow: "The Journey",
  title: "Sarawak to Selangor",
  from: { label: "Kuching, Sarawak", note: "Where it started" },
  to: { label: "Petaling Jaya, Selangor", note: "Where I interned" },
  caption: "One flight across the South China Sea.",
};

export const skills = {
  title: "Skills I Learned Here",
  subtitle: "Three things I will carry with me.",
  items: [
    {
      number: "01",
      title: "[Skill / Area]",
      description: "[Short description — one or two lines you can expand on verbally.]",
      icon: "beaker",
    },
    {
      number: "02",
      title: "[Skill / Area]",
      description: "[Short description — one or two lines you can expand on verbally.]",
      icon: "bug",
    },
    {
      number: "03",
      title: "[Skill / Area]",
      description: "[Short description — one or two lines you can expand on verbally.]",
      icon: "sparkles",
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
    theme: "[Theme for this month]",
    summary: "[Very short summary — one line.]",
    details: [
      { label: "What happened", body: "[Placeholder — replace with what happened.]" },
      { label: "What I learned", body: "[Placeholder — replace with what you learned.]" },
      { label: "Challenge", body: "[Placeholder — replace with a challenge.]" },
    ],
  },
  {
    month: "March",
    short: "Mar",
    theme: "[Theme for this month]",
    summary: "[Very short summary — one line.]",
    details: [
      { label: "What happened", body: "[Placeholder]" },
      { label: "What I learned", body: "[Placeholder]" },
      { label: "Reflection", body: "[Placeholder]" },
    ],
  },
  {
    month: "April",
    short: "Apr",
    theme: "[Theme for this month]",
    summary: "[Very short summary — one line.]",
    details: [
      { label: "What happened", body: "[Placeholder]" },
      { label: "Small achievement", body: "[Placeholder]" },
    ],
  },
  {
    month: "May",
    short: "May",
    theme: "[Theme for this month]",
    summary: "[Very short summary — one line.]",
    details: [
      { label: "What happened", body: "[Placeholder]" },
      { label: "What I learned", body: "[Placeholder]" },
      { label: "Challenge", body: "[Placeholder]" },
    ],
  },
  {
    month: "June",
    short: "Jun",
    theme: "[Theme for this month]",
    summary: "[Very short summary — one line.]",
    details: [
      { label: "What happened", body: "[Placeholder]" },
      { label: "Reflection", body: "[Placeholder]" },
    ],
  },
  {
    month: "July",
    short: "Jul",
    theme: "[Theme for this month]",
    summary: "[Very short summary — one line.]",
    details: [
      { label: "What happened", body: "[Placeholder]" },
      { label: "What I learned", body: "[Placeholder]" },
    ],
  },
  {
    month: "August",
    short: "Aug",
    theme: "[Theme for this month]",
    summary: "[Very short summary — one line.]",
    details: [
      { label: "What happened", body: "[Placeholder]" },
      { label: "Reflection", body: "[Placeholder]" },
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
    { key: "A", label: "Kuching", lat: 1.5533, lng: 110.3592 },
    { key: "B", label: "Sandakan", lat: 5.8402, lng: 118.1179 },
    { key: "C", label: "Bintulu", lat: 3.1667, lng: 113.0333 },
    { key: "D", label: "Sri Aman", lat: 1.2372, lng: 111.4626 },
  ] satisfies QuizOption[],
  correctNote: "Sri Aman, Sarawak — a small town by the Batang Lupar river.",
  wrongNote: "Close, but not quite. Here is the difference.",
};

export const ending = {
  title: "Thank You",
  subtitle: "Internship Experience",
  author: "Prepared by Irweena",
  note: "Sri Aman → Kuching → Petaling Jaya, and back again.",
};

/** Section labels used by the progress rail. */
export const sections = [
  { id: "intro", label: "Intro" },
  { id: "journey", label: "Journey" },
  { id: "skills", label: "Skills" },
  { id: "timeline", label: "Timeline" },
  { id: "orbit", label: "Months" },
  { id: "quiz", label: "Quiz" },
  { id: "ending", label: "Thanks" },
];
