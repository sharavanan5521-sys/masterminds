// The six programme areas. `summary` and `areas` come from the company profile;
// `audience` and `outcomes` are draft copy for the client to review.

export type Programme = {
  slug: string;
  number: string;
  title: string;
  short: string;
  summary: string;
  image: string;
  icon: "Crown" | "BrainCircuit" | "Target" | "HeartHandshake" | "Rocket" | "Settings2";
  areas: string[];
  audience: string[];
  outcomes: string[];
};

export const programmes: Programme[] = [
  {
    slug: "leadership-management",
    number: "01",
    title: "Leadership & Management Development",
    short: "Leadership & Management",
    summary:
      "Developing supervisors, team leaders, managers and emerging leaders with the skills required to lead people, manage performance and handle workplace challenges.",
    image: "/images/prog-leadership.jpg",
    icon: "Crown",
    areas: [
      "Leadership Essentials",
      "Supervisory Skills",
      "Team Leadership",
      "People Management",
      "Communication Skills",
      "Performance Management",
      "Problem Solving & Decision Making",
    ],
    audience: ["Supervisors & line leaders", "New and emerging managers", "Team leaders", "Middle & senior managers"],
    outcomes: [
      "Lead and motivate teams with confidence",
      "Set expectations and manage performance fairly",
      "Communicate clearly across levels",
      "Make sound decisions under pressure",
    ],
  },
  {
    slug: "ai-digital-transformation",
    number: "02",
    title: "AI & Digital Transformation",
    short: "AI & Digital Transformation",
    summary:
      "Helping organizations and employees understand and practically apply Artificial Intelligence and digital technologies to improve productivity, decision-making and workplace processes.",
    image: "/images/prog-ai.jpg",
    icon: "BrainCircuit",
    areas: [
      "AI for Business",
      "AI for HR",
      "AI for Sales & Marketing",
      "AI Project Management",
      "Generative AI & ChatGPT",
      "Digital Productivity",
      "AI-Powered Workplace Solutions",
    ],
    audience: ["Executives & decision makers", "HR, sales & marketing teams", "Project managers", "Any employee adopting AI tools"],
    outcomes: [
      "Use generative AI tools safely and effectively",
      "Identify high-value AI use cases in your role",
      "Automate repetitive work and boost productivity",
      "Lead AI adoption with a clear, practical roadmap",
    ],
  },
  {
    slug: "sales-marketing",
    number: "03",
    title: "Sales & Marketing Development",
    short: "Sales & Marketing",
    summary:
      "Equipping sales and marketing professionals with practical strategies, modern tools and AI-enabled approaches to improve customer engagement, selling effectiveness and marketing performance.",
    image: "/images/prog-sales.jpg",
    icon: "Target",
    areas: [
      "Sales Skills",
      "Professional Selling",
      "Customer & Buyer Behaviour",
      "Sales Communication",
      "Digital Marketing",
      "Social Media Marketing",
      "AI for Sales & Marketing",
      "Marketing Strategy",
    ],
    audience: ["Sales executives & account managers", "Marketing teams", "Business development professionals", "Customer-facing staff"],
    outcomes: [
      "Understand buyer behaviour and sell with insight",
      "Run sharper, more persuasive sales conversations",
      "Plan digital and social campaigns that convert",
      "Use AI to speed up prospecting and content",
    ],
  },
  {
    slug: "hr-people-development",
    number: "04",
    title: "HR & People Development",
    short: "HR & People Development",
    summary:
      "Supporting HR professionals and organizations in developing stronger people-management practices and preparing their workforce for an increasingly digital workplace.",
    image: "/images/prog-hr.jpg",
    icon: "HeartHandshake",
    areas: [
      "AI for HR",
      "HR Digital Transformation",
      "Recruitment & Talent Acquisition",
      "Employee Development",
      "Workplace Communication",
      "Performance Management",
      "Learning & Development",
    ],
    audience: ["HR managers & executives", "L&D professionals", "Talent acquisition teams", "People managers"],
    outcomes: [
      "Modernize HR processes with digital and AI tools",
      "Hire better with structured talent acquisition",
      "Build development plans that retain talent",
      "Strengthen performance and communication culture",
    ],
  },
  {
    slug: "business-entrepreneurship",
    number: "05",
    title: "Business & Entrepreneurship",
    short: "Business & Entrepreneurship",
    summary:
      "Helping entrepreneurs, business owners and aspiring professionals develop practical business knowledge and strategies for sustainable growth.",
    image: "/images/prog-business.jpg",
    icon: "Rocket",
    areas: [
      "Entrepreneurship",
      "Business Model Development",
      "Business Strategy",
      "Marketing Strategy",
      "Digital Business",
      "Business Growth",
      "Small Business Development",
    ],
    audience: ["Entrepreneurs & founders", "SME owners", "Aspiring business professionals", "Intrapreneurs in larger firms"],
    outcomes: [
      "Validate and refine a sound business model",
      "Build a practical strategy for sustainable growth",
      "Take your business digital with confidence",
      "Plan marketing that fits your budget and market",
    ],
  },
  {
    slug: "customized-corporate-training",
    number: "06",
    title: "Customized Corporate Training",
    short: "Customized Corporate Training",
    summary:
      "Every organization has different people, challenges, objectives and workplace environments. We design programmes around your actual workplace requirements.",
    image: "/images/prog-custom.jpg",
    icon: "Settings2",
    areas: [
      "Organizational objectives",
      "Industry requirements",
      "Employee skill gaps",
      "Specific workplace challenges",
      "Job roles and responsibilities",
      "Participant experience levels",
      "Training duration",
      "Delivery format",
    ],
    audience: ["Corporate organizations", "Government & public sector", "SMEs", "HR & L&D teams planning annual training"],
    outcomes: [
      "Training aligned to your strategy and KPIs",
      "Content built around your real workplace scenarios",
      "Flexible duration and delivery to suit operations",
      "Clear action plans participants apply immediately",
    ],
  },
];

export function getProgramme(slug: string) {
  return programmes.find((p) => p.slug === slug);
}

export const topicCount = programmes
  .filter((p) => p.slug !== "customized-corporate-training")
  .reduce((n, p) => n + p.areas.length, 0);
