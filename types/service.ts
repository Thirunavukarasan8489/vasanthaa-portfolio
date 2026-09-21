export type ServiceCategory = "writing" | "voice-over";

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  shortDesc: string;
  fullDesc?: string;
  deliverables?: string[];
  popular?: boolean;
}
