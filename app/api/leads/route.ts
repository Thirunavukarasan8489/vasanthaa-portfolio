import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import mongoose from "mongoose";

const leadsFilePath = path.join(process.cwd(), "data", "leads.json");

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget?: string;
  details: string;
  status: "new" | "contacted" | "archived";
  createdAt: string;
}

interface MongoContactDoc {
  _id: mongoose.Types.ObjectId | string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget?: string;
  details: string;
  status?: "new" | "contacted" | "archived";
  createdAt?: Date | string;
}


async function readLeadsBackup(): Promise<Lead[]> {
  try {
    const data = await fs.readFile(leadsFilePath, "utf-8");
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("[Leads Backup] Error reading leads file:", error);
    return [];
  }
}

async function writeLeadsBackup(leads: Lead[]): Promise<void> {
  try {
    await fs.writeFile(leadsFilePath, JSON.stringify(leads, null, 2), "utf-8");
  } catch (error) {
    console.error("[Leads Backup] Error writing leads file:", error);
  }
}

// GET: Fetch all leads (newest first) from MongoDB Atlas
export async function GET() {
  try {
    if (process.env.MONGODB_URI) {
      try {
        const { connectDB } = await import("@/lib/db");
        const { Contact } = await import("@/models/Contact");
        await connectDB();

        let docs = await Contact.find().sort({ createdAt: -1 }).lean();

        // If MongoDB is empty but leads.json has leads, auto-migrate them
        if (docs.length === 0) {
          const localLeads = await readLeadsBackup();
          if (localLeads.length > 0) {
            console.log(`[MongoDB] Migrating ${localLeads.length} leads from leads.json into MongoDB...`);
            for (const lead of localLeads) {
              await Contact.create({
                name: lead.name,
                email: lead.email,
                phone: lead.phone || "",
                company: lead.company || "",
                service: lead.service,
                budget: lead.budget || "",
                details: lead.details,
                status: lead.status || "new",
                createdAt: lead.createdAt ? new Date(lead.createdAt) : new Date(),
              });
            }
            docs = await Contact.find().sort({ createdAt: -1 }).lean();
          }
        }

        const leads: Lead[] = (docs as unknown as MongoContactDoc[]).map((doc) => ({
          id: doc._id.toString(),
          name: doc.name,
          email: doc.email,
          phone: doc.phone || "",
          company: doc.company || "",
          service: doc.service,
          budget: doc.budget || "",
          details: doc.details,
          status: doc.status || "new",
          createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString(),
        }));

        // Mirror to local JSON for offline resiliency
        await writeLeadsBackup(leads);

        return NextResponse.json({ success: true, leads, source: "database" });
      } catch (dbError) {
        console.error("[MongoDB Error in GET /api/leads]:", dbError);
      }
    }

    // Fallback if MongoDB is not configured or fails
    const leads = await readLeadsBackup();
    leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return NextResponse.json({ success: true, leads, source: "file_backup" });
  } catch (error) {
    console.error("Error getting leads:", error);
    return NextResponse.json({ success: false, error: "Failed to read leads" }, { status: 500 });
  }
}

// PATCH: Update lead status (new / contacted / archived) in MongoDB Atlas
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !["new", "contacted", "archived"].includes(status)) {
      return NextResponse.json(
        { success: false, error: "Valid ID and status (new, contacted, archived) are required" },
        { status: 400 }
      );
    }

    let updatedLead: Lead | null = null;

    if (process.env.MONGODB_URI) {
      try {
        const { connectDB } = await import("@/lib/db");
        const { Contact } = await import("@/models/Contact");
        await connectDB();

        if (mongoose.Types.ObjectId.isValid(id)) {
          const updatedDoc = await Contact.findByIdAndUpdate(
            id,
            { status },
            { new: true }
          ).lean();

          if (updatedDoc) {
            const doc = updatedDoc as unknown as MongoContactDoc;
            updatedLead = {
              id: doc._id.toString(),
              name: doc.name,
              email: doc.email,
              phone: doc.phone || "",
              company: doc.company || "",
              service: doc.service,
              budget: doc.budget || "",
              details: doc.details,
              status: doc.status || "new",
              createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString(),
            };
          }
        }
      } catch (dbError) {
        console.error("[MongoDB Error in PATCH /api/leads]:", dbError);
      }
    }

    // Also update leads.json backup
    const leads = await readLeadsBackup();
    const index = leads.findIndex((l) => l.id === id);
    if (index !== -1) {
      leads[index].status = status;
      await writeLeadsBackup(leads);
      if (!updatedLead) updatedLead = leads[index];
    }

    if (!updatedLead) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead: updatedLead });
  } catch (error) {
    console.error("Error updating lead status:", error);
    return NextResponse.json({ success: false, error: "Failed to update lead" }, { status: 500 });
  }
}

// DELETE: Delete a lead in MongoDB Atlas
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Lead ID is required" }, { status: 400 });
    }

    let deletedFromDb = false;

    if (process.env.MONGODB_URI) {
      try {
        const { connectDB } = await import("@/lib/db");
        const { Contact } = await import("@/models/Contact");
        await connectDB();

        if (mongoose.Types.ObjectId.isValid(id)) {
          const res = await Contact.findByIdAndDelete(id);
          if (res) deletedFromDb = true;
        }
      } catch (dbError) {
        console.error("[MongoDB Error in DELETE /api/leads]:", dbError);
      }
    }

    // Also remove from backup JSON
    const leads = await readLeadsBackup();
    const filtered = leads.filter((l) => l.id !== id);
    const deletedFromJson = filtered.length !== leads.length;
    if (deletedFromJson) {
      await writeLeadsBackup(filtered);
    }

    if (!deletedFromDb && !deletedFromJson) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Lead deleted successfully" });
  } catch (error) {
    console.error("Error deleting lead:", error);
    return NextResponse.json({ success: false, error: "Failed to delete lead" }, { status: 500 });
  }
}
