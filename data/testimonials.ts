export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  discipline: string;
  highlightMetric?: string;
  year?: string;
  rating?: number;
}

export type Testimonial = TestimonialItem;

export const testimonialsData: TestimonialItem[] = [
  {
    id: "test-01",
    quote:
      "Vasanthaa's scriptwriting completely shifted our reel performance. She understands that the first three seconds dictate the entire video. Our retention rates jumped significantly, and the tone felt organic rather than pushy.",
    author: "Aditi Sundaram",
    role: "Creative Director",
    company: "Studio Bloom Creative",
    discipline: "Writing",
    highlightMetric: "+42% Watch Retention",
    year: "2026",
  },
  {
    id: "test-02",
    quote:
      "Her voice has a rare grounded warmth that sounds effortlessly authentic. In our commercial audio sessions, she nailed the nuanced inflection on the very second take. She is our first call for voiceover talent.",
    author: "Karthik Narayanan",
    role: "Senior Brand Producer",
    company: "Echo Soundworks",
    discipline: "Voice Over",
    highlightMetric: "Studio Commercial Take",
    year: "2025",
  },
  {
    id: "test-03",
    quote:
      "Finding someone who can both write a technically precise architectural script and deliver it with natural charisma on camera is exceptionally rare. Vasanthaa brought our heritage restoration story to life with poise.",
    author: "Meera Krishnan",
    role: "Principal Architect & Founder",
    company: "Vernacular Living",
    discipline: "On-Camera",
    highlightMetric: "Documentary Feature",
    year: "2026",
  },
  {
    id: "test-04",
    quote:
      "Working with Vasanthaa was a masterclass in collaboration. She translated complex ayurvedic botanical formulations into accessible, sensory narrative copy that our community immediately resonated with.",
    author: "Raghav V.",
    role: "Head of Brand Marketing",
    company: "Naturessence Ayurveda",
    discipline: "Writing",
    highlightMetric: "6-Part Campaign",
    year: "2025",
  },
];
