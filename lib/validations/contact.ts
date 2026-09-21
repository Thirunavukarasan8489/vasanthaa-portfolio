import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(80, { message: "Name must be under 80 characters." }),
  email: z
    .string()
    .email({ message: "Please provide a valid email address." }),
  phone: z
    .string()
    .max(25, { message: "Phone number is too long." })
    .optional()
    .or(z.literal("")),
  company: z
    .string()
    .max(80, { message: "Company name is too long." })
    .optional()
    .or(z.literal("")),
  service: z.enum(
    ["Content Writing", "Voice Over", "On Camera", "Combination / Other"],
    { message: "Please select a valid service." }
  ),
  budget: z.string().optional().or(z.literal("")),
  details: z
    .string()
    .min(10, { message: "Please share a few details about your project (at least 10 characters)." })
    .max(2000, { message: "Project details must be under 2,000 characters." }),
  // Honeypot field for bot spam prevention (must remain empty)
  websiteUrl: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
