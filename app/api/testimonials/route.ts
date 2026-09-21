import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { testimonialsData, TestimonialItem } from "@/data/testimonials";

const jsonFilePath = path.join(process.cwd(), "data", "testimonials.json");

function getTestimonials(): TestimonialItem[] {
  try {
    if (fs.existsSync(jsonFilePath)) {
      const fileData = fs.readFileSync(jsonFilePath, "utf8");
      return JSON.parse(fileData);
    }
  } catch (error) {
    console.error("Error reading testimonials.json:", error);
  }
  return testimonialsData;
}

function saveTestimonials(data: TestimonialItem[]): boolean {
  try {
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error saving testimonials.json:", error);
    return false;
  }
}

export async function GET() {
  const testimonials = getTestimonials();
  return NextResponse.json({ success: true, data: testimonials });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { quote, author, role, company, discipline, highlightMetric, year } = body;

    if (!quote || !author || !role || !company || !discipline) {
      return NextResponse.json(
        { success: false, error: "Please provide quote, author, role, company, and discipline." },
        { status: 400 }
      );
    }

    const currentList = getTestimonials();
    const newTestimonial: TestimonialItem = {
      id: `test-${Date.now()}`,
      quote: String(quote).trim(),
      author: String(author).trim(),
      role: String(role).trim(),
      company: String(company).trim(),
      discipline: discipline,
      highlightMetric: highlightMetric ? String(highlightMetric).trim() : undefined,
      year: year ? String(year).trim() : new Date().getFullYear().toString(),
    };

    const updatedList = [newTestimonial, ...currentList];
    saveTestimonials(updatedList);

    return NextResponse.json({ success: true, data: newTestimonial }, { status: 201 });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create testimonial." },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, quote, author, role, company, discipline, highlightMetric, year } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Testimonial ID is required." },
        { status: 400 }
      );
    }

    const currentList = getTestimonials();
    const index = currentList.findIndex((item) => item.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: "Testimonial not found." },
        { status: 404 }
      );
    }

    const updatedItem: TestimonialItem = {
      ...currentList[index],
      quote: quote !== undefined ? String(quote).trim() : currentList[index].quote,
      author: author !== undefined ? String(author).trim() : currentList[index].author,
      role: role !== undefined ? String(role).trim() : currentList[index].role,
      company: company !== undefined ? String(company).trim() : currentList[index].company,
      discipline: discipline !== undefined ? discipline : currentList[index].discipline,
      highlightMetric:
        highlightMetric !== undefined
          ? String(highlightMetric).trim()
          : currentList[index].highlightMetric,
      year: year !== undefined ? String(year).trim() : currentList[index].year,
    };

    currentList[index] = updatedItem;
    saveTestimonials(currentList);

    return NextResponse.json({ success: true, data: updatedItem });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update testimonial." },
      { status: 500 }
    );
  }
}

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

    const currentList = getTestimonials();
    const filteredList = currentList.filter((item) => item.id !== id);

    if (filteredList.length === currentList.length) {
      return NextResponse.json(
        { success: false, error: "Testimonial not found." },
        { status: 404 }
      );
    }

    saveTestimonials(filteredList);

    return NextResponse.json({ success: true, message: "Testimonial deleted successfully." });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete testimonial." },
      { status: 500 }
    );
  }
}
