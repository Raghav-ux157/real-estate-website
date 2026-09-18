import { NextResponse } from "next/server";
import { getSiteVisits, createSiteVisit, updateSiteVisitStatus, SiteVisit } from "@/lib/data";

export async function GET() {
  try {
    const visits = getSiteVisits();
    return NextResponse.json({ success: true, visits });
  } catch (error) {
    console.error("Fetch visits error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch visits" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.leadName || !body.leadPhone) {
      return NextResponse.json({ success: false, error: "Name and phone are required" }, { status: 400 });
    }

    const created = createSiteVisit(body);
    return NextResponse.json({ 
      success: true, 
      message: "Site visit booked successfully! Our concierge will contact you to confirm.",
      visit: created 
    }, { status: 201 });
  } catch (error) {
    console.error("Create visit error:", error);
    return NextResponse.json({ success: false, error: "Failed to book site visit" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: "id and status are required" }, { status: 400 });
    }

    const updated = updateSiteVisitStatus(id, status as SiteVisit["status"]);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Visit not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, visit: updated });
  } catch (error) {
    console.error("Update visit error:", error);
    return NextResponse.json({ success: false, error: "Failed to update visit" }, { status: 500 });
  }
}
