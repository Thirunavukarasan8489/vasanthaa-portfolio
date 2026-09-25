import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import mongoose from "mongoose";
import { testimonialsData, TestimonialItem } from "@/data/testimonials";

const jsonFilePath = path.join(process.cwd(), "data", "testimonials.json");

interface MongoTestimonialDoc {
  _id: mongoose.Types.ObjectId | string;
  customId?: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  discipline: string;
  highlightMetric?: string;
  year?: string;
  rating?: number;
  order?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

async function readTestimonialsBackup(): Promise<TestimonialItem[]> {
  try {
    const data = await fs.readFile(jsonFilePath, "utf-8");
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : testimonialsData;
  } catch (error) {
    console.warn("[Testimonials Backup] Could not read testimonials.json, falling back to static data:", error);
    return testimonialsData;
  }
}

async function writeTestimonialsBackup(items: TestimonialItem[]): Promise<void> {
  try {
    await fs.writeFile(jsonFilePath, JSON.stringify(items, null, 2), "utf-8");
  } catch (error) {
    console.error("[Testimonials Backup] Error writing testimonials.json:", error);
  }
}

function mapDocToTestimonial(doc: MongoTestimonialDoc): TestimonialItem {
  return {
    id: doc.customId || doc._id.toString(),
    quote: doc.quote,
    author: doc.author,
    role: doc.role,
    company: doc.company,
    discipline: doc.discipline,
    highlightMetric: doc.highlightMetric || undefined,
    year: doc.year || undefined,
    rating: doc.rating !== undefined ? doc.rating : 5,
  };
}

// GET: Fetch all testimonials from MongoDB (with auto-seed & JSON fallback)
export async function GET() {
  try {
    if (process.env.MONGODB_URI) {
      try {
        const { connectDB } = await import("@/lib/db");
        const { Testimonial } = await import("@/models/Testimonial");
        await connectDB();

        let docs = await Testimonial.find().sort({ order: 1, createdAt: -1 }).lean();

        // Auto-migration: if MongoDB is completely empty, populate from backup JSON
        if (docs.length === 0) {
          const initialList = await readTestimonialsBackup();
          if (initialList.length > 0) {
            console.log(`[MongoDB] Migrating ${initialList.length} testimonials into MongoDB...`);
            for (let i = 0; i < initialList.length; i++) {
              const item = initialList[i];
              await Testimonial.create({
                customId: item.id,
                quote: item.quote,
                author: item.author,
                role: item.role,
                company: item.company,
                discipline: item.discipline,
                highlightMetric: item.highlightMetric || "",
                year: item.year || new Date().getFullYear().toString(),
                rating: item.rating || 5,
                order: i,
              });
            }
            docs = await Testimonial.find().sort({ order: 1, createdAt: -1 }).lean();
          }
        }

        const testimonials: TestimonialItem[] = (docs as unknown as MongoTestimonialDoc[]).map(mapDocToTestimonial);

        // Mirror fresh DB records to JSON for backup & offline resilience
        await writeTestimonialsBackup(testimonials);

        return NextResponse.json({
          success: true,
          testimonials,
          data: testimonials,
          source: "database",
        });
      } catch (dbError) {
        console.error("[MongoDB Error in GET /api/testimonials]:", dbError);
      }
    }

    // Fallback if MongoDB is not configured or throws error
    const testimonials = await readTestimonialsBackup();
    return NextResponse.json({
      success: true,
      testimonials,
      data: testimonials,
      source: "file_backup",
    });
  } catch (error) {
    console.error("Error reading testimonials:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load testimonials." },
      { status: 500 }
    );
  }
}

// POST: Create a new testimonial in MongoDB (and sync to JSON backup)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { quote, author, role, company, discipline, highlightMetric, year, rating } = body;

    if (!quote || !author || !role || !company || !discipline) {
      return NextResponse.json(
        { success: false, error: "Please provide quote, author, role, company, and discipline." },
        { status: 400 }
      );
    }

    const customId = `test-${Date.now()}`;
    const newTestimonial: TestimonialItem = {
      id: customId,
      quote: String(quote).trim(),
      author: String(author).trim(),
      role: String(role).trim(),
      company: String(company).trim(),
      discipline: String(discipline).trim(),
      highlightMetric: highlightMetric ? String(highlightMetric).trim() : undefined,
      year: year ? String(year).trim() : new Date().getFullYear().toString(),
      rating: typeof rating === "number" ? rating : 5,
    };

    let allTestimonials: TestimonialItem[] = [];

    if (process.env.MONGODB_URI) {
      try {
        const { connectDB } = await import("@/lib/db");
        const { Testimonial } = await import("@/models/Testimonial");
        await connectDB();

        const createdDoc = await Testimonial.create({
          customId,
          quote: newTestimonial.quote,
          author: newTestimonial.author,
          role: newTestimonial.role,
          company: newTestimonial.company,
          discipline: newTestimonial.discipline,
          highlightMetric: newTestimonial.highlightMetric || "",
          year: newTestimonial.year,
          rating: newTestimonial.rating,
          order: -1, // put at top
        });

        if (createdDoc) {
          const docs = await Testimonial.find().sort({ order: 1, createdAt: -1 }).lean();
          allTestimonials = (docs as unknown as MongoTestimonialDoc[]).map(mapDocToTestimonial);
        }
      } catch (dbError) {
        console.error("[MongoDB Error in POST /api/testimonials]:", dbError);
      }
    }

    // Update local JSON backup as well
    const currentList = await readTestimonialsBackup();
    const updatedList = [newTestimonial, ...currentList.filter((item) => item.id !== customId)];
    await writeTestimonialsBackup(allTestimonials.length > 0 ? allTestimonials : updatedList);

    const finalTestimonials = allTestimonials.length > 0 ? allTestimonials : updatedList;

    return NextResponse.json(
      {
        success: true,
        testimonial: newTestimonial,
        testimonials: finalTestimonials,
        data: finalTestimonials,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create testimonial." },
      { status: 500 }
    );
  }
}

// PUT: Update an existing testimonial
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, quote, author, role, company, discipline, highlightMetric, year, rating } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Testimonial ID is required." },
        { status: 400 }
      );
    }

    let allTestimonials: TestimonialItem[] = [];
    let updatedItem: TestimonialItem | null = null;

    if (process.env.MONGODB_URI) {
      try {
        const { connectDB } = await import("@/lib/db");
        const { Testimonial } = await import("@/models/Testimonial");
        await connectDB();

        const isMongoId = mongoose.Types.ObjectId.isValid(id);
        const query = isMongoId ? { $or: [{ _id: id }, { customId: id }] } : { customId: id };

        const updateData: Record<string, unknown> = {};
        if (quote !== undefined) updateData.quote = String(quote).trim();
        if (author !== undefined) updateData.author = String(author).trim();
        if (role !== undefined) updateData.role = String(role).trim();
        if (company !== undefined) updateData.company = String(company).trim();
        if (discipline !== undefined) updateData.discipline = String(discipline).trim();
        if (highlightMetric !== undefined) updateData.highlightMetric = String(highlightMetric).trim();
        if (year !== undefined) updateData.year = String(year).trim();
        if (rating !== undefined) updateData.rating = Number(rating);

        const updatedDoc = await Testimonial.findOneAndUpdate(query, updateData, { new: true }).lean();
        if (updatedDoc) {
          updatedItem = mapDocToTestimonial(updatedDoc as unknown as MongoTestimonialDoc);
          const docs = await Testimonial.find().sort({ order: 1, createdAt: -1 }).lean();
          allTestimonials = (docs as unknown as MongoTestimonialDoc[]).map(mapDocToTestimonial);
        }
      } catch (dbError) {
        console.error("[MongoDB Error in PUT /api/testimonials]:", dbError);
      }
    }

    // Also update backup JSON
    const currentList = await readTestimonialsBackup();
    const index = currentList.findIndex((item) => item.id === id);

    if (index !== -1) {
      currentList[index] = {
        ...currentList[index],
        quote: quote !== undefined ? String(quote).trim() : currentList[index].quote,
        author: author !== undefined ? String(author).trim() : currentList[index].author,
        role: role !== undefined ? String(role).trim() : currentList[index].role,
        company: company !== undefined ? String(company).trim() : currentList[index].company,
        discipline: discipline !== undefined ? String(discipline).trim() : currentList[index].discipline,
        highlightMetric:
          highlightMetric !== undefined ? String(highlightMetric).trim() : currentList[index].highlightMetric,
        year: year !== undefined ? String(year).trim() : currentList[index].year,
        rating: rating !== undefined ? Number(rating) : currentList[index].rating,
      };
      if (!updatedItem) updatedItem = currentList[index];
      await writeTestimonialsBackup(allTestimonials.length > 0 ? allTestimonials : currentList);
    }

    const finalTestimonials = allTestimonials.length > 0 ? allTestimonials : currentList;

    if (!updatedItem) {
      return NextResponse.json(
        { success: false, error: "Testimonial not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      testimonial: updatedItem,
      testimonials: finalTestimonials,
      data: finalTestimonials,
    });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update testimonial." },
      { status: 500 }
    );
  }
}

// DELETE: Delete a testimonial
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Testimonial ID is required." },
        { status: 400 }
      );
    }

    let deletedFromDb = false;
    let allTestimonials: TestimonialItem[] = [];

    if (process.env.MONGODB_URI) {
      try {
        const { connectDB } = await import("@/lib/db");
        const { Testimonial } = await import("@/models/Testimonial");
        await connectDB();

        const isMongoId = mongoose.Types.ObjectId.isValid(id);
        const query = isMongoId ? { $or: [{ _id: id }, { customId: id }] } : { customId: id };

        const res = await Testimonial.findOneAndDelete(query);
        if (res) {
          deletedFromDb = true;
          const docs = await Testimonial.find().sort({ order: 1, createdAt: -1 }).lean();
          allTestimonials = (docs as unknown as MongoTestimonialDoc[]).map(mapDocToTestimonial);
        }
      } catch (dbError) {
        console.error("[MongoDB Error in DELETE /api/testimonials]:", dbError);
      }
    }

    // Also update backup JSON
    const currentList = await readTestimonialsBackup();
    const filteredList = currentList.filter((item) => item.id !== id);
    const deletedFromJson = filteredList.length !== currentList.length;

    if (deletedFromJson) {
      await writeTestimonialsBackup(allTestimonials.length > 0 ? allTestimonials : filteredList);
    }

    const finalTestimonials = allTestimonials.length > 0 ? allTestimonials : filteredList;

    if (!deletedFromDb && !deletedFromJson) {
      return NextResponse.json(
        { success: false, error: "Testimonial not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Testimonial deleted successfully.",
      testimonials: finalTestimonials,
      data: finalTestimonials,
    });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete testimonial." },
      { status: 500 }
    );
  }
}
