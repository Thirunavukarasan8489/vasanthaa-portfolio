"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormData } from "@/lib/validations/contact";
import { ArrowUpRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface ContactFormProps {
  initialService?: string;
  initialDetails?: string;
}

export default function ContactForm({
  initialService = "Content Writing",
  initialDetails = "",
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverSuccessMessage, setServerSuccessMessage] = useState<string | null>(null);
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(null);

  const validServices = [
    "Content Writing",
    "Voice Over",
    "On Camera",
    "Combination / Other",
  ] as const;
  type ServiceType = (typeof validServices)[number];
  const defaultService: ServiceType = validServices.includes(initialService as ServiceType)
    ? (initialService as ServiceType)
    : "Content Writing";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: defaultService,
      budget: "",
      details: initialDetails,
      websiteUrl: "", // Honeypot
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setServerSuccessMessage(null);
    setServerErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resJson = await response.json();

      if (response.ok && resJson.success) {
        setServerSuccessMessage(resJson.message);
        reset();
      } else {
        setServerErrorMessage(
          resJson.error || "Failed to submit your inquiry. Please try again or email directly."
        );
      }
    } catch {
      setServerErrorMessage(
        "A network error occurred. Please check your connection or contact directly via email."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Honeypot field (hidden from humans) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="websiteUrl">Leave blank</label>
        <input
          id="websiteUrl"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("websiteUrl")}
        />
      </div>

      {/* Status Messages */}
      {serverSuccessMessage && (
        <div className="p-5 bg-[#053827] border border-[#C8A75A] text-[#F7F4EC] flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#C8A75A] shrink-0 mt-0.5" />
          <div className="text-sm font-sans space-y-1">
            <strong className="font-serif text-base block text-[#C8A75A]">Inquiry Received</strong>
            <p className="text-[#AFCDC1]">{serverSuccessMessage}</p>
          </div>
        </div>
      )}

      {serverErrorMessage && (
        <div className="p-5 bg-[#2a1215] border border-red-500/50 text-red-200 flex items-start gap-3 text-sm">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <p>{serverErrorMessage}</p>
        </div>
      )}

      {/* Row 1: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-mono uppercase tracking-widest text-[#AFCDC1] mb-2"
          >
            Your Name <span className="text-[#C8A75A]">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="e.g. Maya Raman"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`w-full bg-[#021D15] border px-4 py-3.5 text-sm text-[#F7F4EC] placeholder-[#66736E] focus:outline-none transition-colors ${
              errors.name
                ? "border-red-500 focus:border-red-400"
                : "border-[#053827] focus:border-[#C8A75A]"
            }`}
            {...register("name")}
          />
          {errors.name && (
            <p id="name-error" className="text-xs text-red-400 mt-1 font-mono">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-xs font-mono uppercase tracking-widest text-[#AFCDC1] mb-2"
          >
            Email Address <span className="text-[#C8A75A]">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="maya@company.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`w-full bg-[#021D15] border px-4 py-3.5 text-sm text-[#F7F4EC] placeholder-[#66736E] focus:outline-none transition-colors ${
              errors.email
                ? "border-red-500 focus:border-red-400"
                : "border-[#053827] focus:border-[#C8A75A]"
            }`}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-red-400 mt-1 font-mono">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Phone & Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="phone"
            className="block text-xs font-mono uppercase tracking-widest text-[#AFCDC1] mb-2"
          >
            Phone / WhatsApp (Optional)
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+91 98765 43210"
            className="w-full bg-[#021D15] border border-[#053827] px-4 py-3.5 text-sm text-[#F7F4EC] placeholder-[#66736E] focus:outline-none focus:border-[#C8A75A] transition-colors"
            {...register("phone")}
          />
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-xs font-mono uppercase tracking-widest text-[#AFCDC1] mb-2"
          >
            Brand / Organization (Optional)
          </label>
          <input
            id="company"
            type="text"
            placeholder="e.g. Studio Bloom"
            className="w-full bg-[#021D15] border border-[#053827] px-4 py-3.5 text-sm text-[#F7F4EC] placeholder-[#66736E] focus:outline-none focus:border-[#C8A75A] transition-colors"
            {...register("company")}
          />
        </div>
      </div>

      {/* Row 3: Service Selection & Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="service"
            className="block text-xs font-mono uppercase tracking-widest text-[#AFCDC1] mb-2"
          >
            Primary Discipline <span className="text-[#C8A75A]">*</span>
          </label>
          <select
            id="service"
            aria-invalid={!!errors.service}
            className="w-full bg-[#021D15] border border-[#053827] px-4 py-3.5 text-sm text-[#F7F4EC] focus:outline-none focus:border-[#C8A75A] transition-colors cursor-pointer"
            {...register("service")}
          >
            <option value="Content Writing">Content Writing (Scripts, Articles, Copy)</option>
            <option value="Voice Over">Voice Over (Commercials, Narration, Reels)</option>
            <option value="On Camera">On Camera (Hosting, Visual Features)</option>
            <option value="Combination / Other">Combination Words × Voice</option>
          </select>
          {errors.service && (
            <p className="text-xs text-red-400 mt-1 font-mono">
              {errors.service.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="budget"
            className="block text-xs font-mono uppercase tracking-widest text-[#AFCDC1] mb-2"
          >
            Estimated Budget Range
          </label>
          <select
            id="budget"
            className="w-full bg-[#021D15] border border-[#053827] px-4 py-3.5 text-sm text-[#F7F4EC] focus:outline-none focus:border-[#C8A75A] transition-colors cursor-pointer"
            {...register("budget")}
          >
            <option value="">Flexible / To be discussed</option>
            <option value="Under $500 / ₹25,000">Under $500 / ₹25,000</option>
            <option value="$500 - $1,500 / ₹25,000 - ₹1,00,000">$500 – $1,500 / ₹25,000 – ₹1,00,000</option>
            <option value="$1,500+ / ₹1,00,000+">$1,500+ / ₹1,00,000+</option>
            <option value="Monthly Retainer">Ongoing Monthly Retainer</option>
          </select>
        </div>
      </div>

      {/* Row 4: Project Details */}
      <div>
        <label
          htmlFor="details"
          className="block text-xs font-mono uppercase tracking-widest text-[#AFCDC1] mb-2"
        >
          Project Details & Objectives <span className="text-[#C8A75A]">*</span>
        </label>
        <textarea
          id="details"
          rows={5}
          placeholder="Tell me about your project, target audience, timeline, and whether you need scripts, voice recordings, or both..."
          aria-invalid={!!errors.details}
          aria-describedby={errors.details ? "details-error" : undefined}
          className={`w-full bg-[#021D15] border px-4 py-3.5 text-sm text-[#F7F4EC] placeholder-[#66736E] focus:outline-none transition-colors resize-y ${
            errors.details
              ? "border-red-500 focus:border-red-400"
              : "border-[#053827] focus:border-[#C8A75A]"
          }`}
          {...register("details")}
        />
        {errors.details && (
          <p id="details-error" className="text-xs text-red-400 mt-1 font-mono">
            {errors.details.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#C8A75A] text-[#021D15] px-8 py-4 text-xs font-mono uppercase tracking-widest font-semibold hover:bg-[#D7BC76] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending Inquiry...</span>
            </>
          ) : (
            <>
              <span>Send Project Inquiry</span>
              <ArrowUpRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      <p className="text-[11px] font-mono text-[#79AD98]">
        Responses are personally reviewed and answered within 24–48 hours. NDA respected upon request.
      </p>
    </form>
  );
}
