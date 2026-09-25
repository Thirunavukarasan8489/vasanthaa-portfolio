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

    let mongoId: string | null = null;

    // 1. Primary persistence: Save directly to MongoDB Atlas
    if (process.env.MONGODB_URI) {
      try {
        const { connectDB } = await import("@/lib/db");
        const { Contact } = await import("@/models/Contact");
        await connectDB();

        const newDoc = await Contact.create({
          name,
          email,
          phone: phone || "",
          company: company || "",
          service,
          budget: budget || "",
          details,
          status: "new",
        });

        mongoId = newDoc._id.toString();
        console.log(`[MongoDB] Successfully persisted lead from ${name} (${email}) with ID: ${mongoId}`);
      } catch (dbError) {
        console.error("[MongoDB Error] Failed to persist inquiry to database:", dbError);
      }
    }

    // 2. Backup/Mirror persistence to data/leads.json
    try {
      const fs = await import("fs/promises");
      const path = await import("path");
      const leadsFilePath = path.join(process.cwd(), "data", "leads.json");
      let leads = [];
      try {
        const fileContent = await fs.readFile(leadsFilePath, "utf-8");
        leads = JSON.parse(fileContent);
        if (!Array.isArray(leads)) leads = [];
      } catch {
        leads = [];
      }

      const newLead = {
        id: mongoId || `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name,
        email,
        phone: phone || "",
        company: company || "",
        service,
        budget: budget || "",
        details,
        status: "new",
        createdAt: new Date().toISOString(),
      };

      leads.unshift(newLead);
      await fs.writeFile(leadsFilePath, JSON.stringify(leads, null, 2), "utf-8");
    } catch (saveErr) {
      console.error("[Leads Backup Error]", saveErr);
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
