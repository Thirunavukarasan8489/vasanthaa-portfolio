import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(80, { message: "Name must be under 80 characters." })
    .regex(/^[a-zA-Z\s]+$/, { message: "Name can only contain alphabets and spaces." }),
  email: z
    .string()
    .email({ message: "Please provide a valid email address." }),
  phone: z
    .string()
    .min(7, { message: "Phone number must be at least 7 digits." })
    .max(15, { message: "Phone number must be at most 15 digits." })
    .regex(/^[0-9]+$/, { message: "Phone number can only contain numbers (no special characters)." }),
  company: z
    .string()
    .max(80, { message: "Brand / Organization name is too long." })
    .regex(/^[a-zA-Z0-9\s]*$/, {
      message: "Brand / Organization can only contain alphanumeric characters (no special characters).",
    })
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
