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
  
  image?: string;
  
  images?: string[];
};

export const timeline = {
  eyebrow: "Key Learnings",
  title: "Seven months, month by month",
  hint: "PS: You may just scroll here",
};

export const months: Month[] = [
  {
    
    month: "February",
    short: "Feb",
    theme: "My first week here!",
    summary: " ",
    details: [
      { label: "What I learned", body: "Begin onboarding and focused on learning modules including corporate policies, internal regulations and general company practices." },
      { label: "Challenge", body: "Gaining familiarity with the work environment." },
    ],
    images: [
      "/Firstday.jpeg",
      "/Day1.jpeg"
    ],
  },
  {
    month: "March",
    short: "Mar",
    theme: "Getting used to the software",
    summary: " ",
    details: [
      { label: "Tasks", body: "Developed foundational knowledge of 3D design software." },
      { label: "What I learned", body: " Participated in trial run of Agile estimation tool, Assisted with effort estimations in PI planning sessions." }
    ],
    images: [
      "/Townhall.jpeg",
      "/Townhall2.jpeg",
      "/Townhall3.jpeg",
      "/DeptDay1.jpeg"
    ],
  },
  {
    month: "April",
    short: "Apr",
    theme: "My first contribution",
    summary: " ",
    details: [
      { label: "Tasks", body: "Gained hands on experience with regression testing across multiple requirements. Verified and validated critical fixes for the 20.0.1 Bugfix release." },
      { label: "Observation", body: "Bug reporting, Test report documentation, Version control using Git Extensions." },
      { label: "Small achievement", body: "Completed RT on 12 requirements, 1 week before the sprint deadline." },
    ],
    images: [
      "/April.png"
    ],
          
  },
  {
    month: "May",
    short: "May",
    theme: "Getting the hang of things",
    summary: " ",
    details: [
      { label: "Tasks", body: "Participated in general release preparations of Beta 21.0 release and expanded regression testing on 3 additional requirements." },
      { label: "Observation", body: "Customer feedbacks regarding newly added features, Sprint Demo of 20.0.1 Bugfix and Beta 21.0 release." },
      { label: "What I learned", body: "Software piracy detection via Cylynt." }
    ],
    images: [
      "/May idk.jpeg"
    ],
  },
  {
    month: "June",
    short: "Jun",
    theme: "Finally wrapping up",
    summary: " ",
    details: [
      { label: "Tasks", body: "Regression testing coverage across more requirements." },
      { label: "Observation", body: " Gained exposure to PI planning and quarterly updates during townhall." },
      { label: "Small achievement", body: "Completed regression testing  across all 24 requirements before the sprint deadline." }
    ],
    images: [
      "/DeptDay2.jpeg",
      "/PI3Planning.jpeg"
    ],
  },
  {
    month: "July",
    short: "Jul",
    theme: "The real challenge",
    summary: " ",
    details: [
      { label: "Tasks", body: "System and Interop testing for Student Edition release. Refactored functional test scripts for efficiency. Exploratory testing for edge/extreme cases." },
      { label: "Small achievement", body: "Succesfully contributed to the test automation on 2 key functional requirements." }
    ],
    images: [
      "/July.jpeg"
    ],
  },
  {
    month: "August",
    short: "Aug",
    theme: "Taking opportunities and learning more",
    summary: " ",
    details: [
      { label: "Tasks", body: "Expansion of functional test on Part Comparison Analysis." }
    ],
    images: [
      "/lunch.jpeg"
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
