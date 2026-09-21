export interface Industry {
  name: string;
  category: "tech" | "lifestyle" | "health" | "industry" | "education";
  highlight?: boolean;
}

export const industriesData: Industry[] = [
  { name: "Technology", category: "tech", highlight: true },
  { name: "IT", category: "tech" },
  { name: "Healthcare", category: "health", highlight: true },
  { name: "Aesthetics", category: "health" },
  { name: "Beauty", category: "lifestyle", highlight: true },
  { name: "Personal Care", category: "lifestyle" },
  { name: "Fitness", category: "health" },
  { name: "Wellness", category: "health", highlight: true },
  { name: "Automobiles", category: "industry" },
  { name: "Agriculture", category: "industry" },
  { name: "Food Products", category: "lifestyle" },
  { name: "Education", category: "education", highlight: true },
  { name: "Skill Development", category: "education" },
  { name: "Digital Marketing", category: "tech" },
  { name: "Advertising", category: "tech", highlight: true },
  { name: "Construction", category: "industry" },
  { name: "Building Materials", category: "industry" },
  { name: "Home Solutions", category: "lifestyle" },
  { name: "Professional Services", category: "tech" },
  { name: "Sports", category: "lifestyle" },
  { name: "Career Development", category: "education" },
  { name: "Employment", category: "education" },
  { name: "Grooming", category: "lifestyle" },
  { name: "Ayurveda", category: "health", highlight: true },
];

export const marqueeIndustriesRow1 = [
  "TECHNOLOGY",
  "HEALTHCARE",
  "BEAUTY & AESTHETICS",
  "DIGITAL MARKETING",
  "AUTOMOBILES",
  "WELLNESS & AYURVEDA",
  "SKILL DEVELOPMENT",
  "FOOD PRODUCTS",
];

export const marqueeIndustriesRow2 = [
  "EDUCATION",
  "CONSTRUCTION & ARCHITECTURE",
  "FITNESS & SPORTS",
  "HOME SOLUTIONS",
  "CAREER DEVELOPMENT",
  "PROFESSIONAL SERVICES",
  "PERSONAL CARE",
  "BRAND ADVERTISING",
];
