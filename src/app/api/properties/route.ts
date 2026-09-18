import { NextResponse } from "next/server";
import { getProperties, createProperty, updateProperty, deleteProperty } from "@/lib/data";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || undefined;
    const type = searchParams.get("type") || undefined;
    const budget = searchParams.get("budget") || undefined;
    const bedrooms = searchParams.get("bedrooms") || undefined;
    const location = searchParams.get("location") || undefined;
    const sort = searchParams.get("sort") || undefined;

    const properties = getProperties({ search, type, budget, bedrooms, location, sort });
    return NextResponse.json({ success: true, properties });
  } catch (error) {
    console.error("Fetch properties error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch properties" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || !body.location) {
      return NextResponse.json({ success: false, error: "Title and location are required" }, { status: 400 });
    }

    const created = createProperty(body);
    return NextResponse.json({ success: true, property: created }, { status: 201 });
  } catch (error) {
    console.error("Create property error:", error);
    return NextResponse.json({ success: false, error: "Failed to create property" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "id is required" }, { status: 400 });
    }

    const updated = updateProperty(id, updates);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, property: updated });
  } catch (error) {
    console.error("Update property error:", error);
    return NextResponse.json({ success: false, error: "Failed to update property" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "id is required" }, { status: 400 });
    }

    const deleted = deleteProperty(id);
    return NextResponse.json({ success: true, deleted });
  } catch (error) {
    console.error("Delete property error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete property" }, { status: 500 });
  }
}
