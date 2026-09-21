import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

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

async function readLeads(): Promise<Lead[]> {
  try {
    const data = await fs.readFile(leadsFilePath, "utf-8");
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Error reading leads file:", error);
    return [];
  }
}

async function writeLeads(leads: Lead[]): Promise<void> {
  await fs.writeFile(leadsFilePath, JSON.stringify(leads, null, 2), "utf-8");
}

// GET: Fetch all leads (newest first)
export async function GET() {
  try {
    const leads = await readLeads();
    // Sort descending by createdAt
    leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return NextResponse.json({ success: true, leads });
  } catch (error) {
    console.error("Error getting leads:", error);
    return NextResponse.json({ success: false, error: "Failed to read leads" }, { status: 500 });
  }
}

// PATCH: Update lead status (new / contacted / archived)
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

    const leads = await readLeads();
    const index = leads.findIndex((l) => l.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
    }

    leads[index].status = status;
    await writeLeads(leads);

    return NextResponse.json({ success: true, lead: leads[index] });
  } catch (error) {
    console.error("Error updating lead status:", error);
    return NextResponse.json({ success: false, error: "Failed to update lead" }, { status: 500 });
  }
}

// DELETE: Delete a lead
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Lead ID is required" }, { status: 400 });
    }

    const leads = await readLeads();
    const filtered = leads.filter((l) => l.id !== id);

    if (filtered.length === leads.length) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
    }

    await writeLeads(filtered);
    return NextResponse.json({ success: true, message: "Lead deleted successfully" });
  } catch (error) {
    console.error("Error deleting lead:", error);
    return NextResponse.json({ success: false, error: "Failed to delete lead" }, { status: 500 });
  }
}
