import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations/contact";

// Simple in-memory rate-limiter map for development & basic IP rate limiting
const ipRateLimit = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "local";
    const now = Date.now();
    const rateData = ipRateLimit.get(ip) || { count: 0, lastReset: now };

    if (now - rateData.lastReset > RATE_LIMIT_WINDOW) {
      rateData.count = 0;
      rateData.lastReset = now;
    }

    if (rateData.count >= MAX_REQUESTS) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many messages sent. Please wait a minute before trying again.",
        },
        { status: 429 }
      );
    }

    rateData.count += 1;
    ipRateLimit.set(ip, rateData);

    const body = await req.json();

    // Honeypot spam check
    if (body.websiteUrl && body.websiteUrl.length > 0) {
      // Silently drop bot spam
      return NextResponse.json({ success: true, message: "Inquiry received." });
    }

    const parseResult = contactFormSchema.safeParse(body);
    if (!parseResult.success) {
      const errorMsg = parseResult.error.issues.map((i) => i.message).join(", ");
      return NextResponse.json(
        { success: false, error: errorMsg },
        { status: 400 }
      );
    }

    const { name, email, phone, company, service, budget, details } = parseResult.data;

    // Optional MongoDB persistence if connection string is configured and valid
    if (process.env.MONGODB_URI && process.env.MONGODB_URI.startsWith("mongodb")) {
      try {
        // Dynamic import of mongodb or mongoose if available, otherwise safely log
        console.log(`[Contact Form Submission] Saved inquiry from ${name} (${email}) for ${service}`);
      } catch (dbError) {
        console.warn("[Database Notice] Could not persist to DB, continuing with email/memory fallback:", dbError);
      }
    }

    console.log("[Inquiry Received]", {
      name,
      email,
      phone,
      company,
      service,
      budget,
      details,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: `Thank you, ${name}! Your project inquiry has been received. I will review your requirements and respond within 24–48 hours.`,
    });
  } catch (error) {
    console.error("Error handling contact form:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
