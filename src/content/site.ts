// Site-wide copy and settings. Contact details are placeholders until the client confirms them.

export const site = {
  name: "Masterminds Training & Marketing",
  shortName: "Masterminds",
  tagline: "Empowering Excellence",
  description:
    "Practical, results-oriented corporate training in Leadership, AI & Digital Transformation, Sales & Marketing, HR and Business — designed around your organization's real workplace needs.",
  url: "https://masterminds.vercel.app",
  contact: {
    email: "[email@company.com]",
    phone: "[+00 000 000 0000]",
    whatsapp: "[+00 000 000 0000]",
    address: "[Office address, City, Country]",
    hours: "Mon – Fri, 9:00am – 6:00pm",
  },
  social: {
    linkedin: "#",
    facebook: "#",
    instagram: "#",
  },
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programmes", href: "/programmes" },
  { label: "Training Delivery", href: "/training-delivery" },
  { label: "Contact", href: "/contact" },
];

export const audiences = [
  "HR & L&D Teams",
  "Managers & Senior Managers",
  "Supervisors & Line Leaders",
  "Team Leaders",
  "Executives",
  "Sales & Marketing Teams",
  "Business Owners",
  "Entrepreneurs",
  "Government & Public Sector",
  "SMEs",
  "Corporate Organizations",
];

export const philosophy = [
  "Practical and applicable learning",
  "Participant engagement",
  "Real workplace scenarios",
  "Experiential and activity-based learning",
  "Problem-solving and critical thinking",
  "Continuous professional development",
  "Knowledge that can be applied immediately",
];

export const methodology = [
  { title: "Facilitator-led learning", icon: "Presentation" },
  { title: "Group discussions", icon: "MessagesSquare" },
  { title: "Case studies", icon: "FileSearch" },
  { title: "Role plays", icon: "Drama" },
  { title: "Simulations", icon: "Gamepad2" },
  { title: "Practical exercises", icon: "PencilRuler" },
  { title: "Workplace scenarios", icon: "Building2" },
  { title: "Problem-solving activities", icon: "Puzzle" },
  { title: "Individual reflection", icon: "Lightbulb" },
  { title: "Team activities", icon: "Users" },
  { title: "AI & digital tool demos", icon: "Cpu" },
  { title: "Action planning", icon: "ListChecks" },
] as const;

export const learningLoop = [
  {
    step: "01",
    title: "Understand the concept",
    body: "Clear, relevant frameworks delivered by experienced facilitators — no theory for theory's sake.",
  },
  {
    step: "02",
    title: "Practise the skill",
    body: "Role plays, simulations, case studies and team activities in a safe, positive environment.",
  },
  {
    step: "03",
    title: "Apply it at work",
    body: "Participants leave with an action plan that translates learning into real-world performance.",
  },
];

export const commitments = [
  { title: "Relevant", body: "Aligned with current workplace needs." },
  { title: "Practical", body: "Focused on application rather than theory alone." },
  { title: "Engaging", body: "Designed to encourage active participation." },
  { title: "Flexible", body: "Adaptable to different industries, roles and requirements." },
  { title: "Future-Ready", body: "Incorporating AI, emerging tech and evolving workplace practices." },
];

export const whyUs = [
  {
    title: "Practical Learning",
    body: "Participants learn through activities, exercises, discussions and workplace scenarios.",
    icon: "Hand",
  },
  {
    title: "Customized Solutions",
    body: "Training adapted to your organization's specific requirements and skill gaps.",
    icon: "SlidersHorizontal",
  },
  {
    title: "Relevant Topics",
    body: "Programmes that address current workplace challenges and emerging business trends.",
    icon: "Radar",
  },
  {
    title: "Business-Focused",
    body: "Designed with organizational performance and workplace application in mind.",
    icon: "TrendingUp",
  },
  {
    title: "Flexible Delivery",
    body: "Public, in-house, customized and online training solutions available.",
    icon: "Shuffle",
  },
  {
    title: "Continuous Development",
    body: "We support your people and capabilities beyond a single training session.",
    icon: "Repeat",
  },
] as const;

export const outcomes = {
  employees: [
    "Knowledge",
    "Skills",
    "Confidence",
    "Problem-solving ability",
    "Professional effectiveness",
    "Adaptability",
  ],
  organizations: [
    "Better workplace performance",
    "Stronger leadership capability",
    "Improved employee productivity",
    "Better communication",
    "Stronger teamwork",
    "Workforce development",
    "Digital and AI readiness",
  ],
};

export const customization = [
  "Organizational objectives",
  "Industry requirements",
  "Employee skill gaps",
  "Specific workplace challenges",
  "Job roles and responsibilities",
  "Participant experience levels",
  "Training duration",
  "Delivery format",
];
