import { NextResponse } from "next/server";
import { getLeads, createLead, updateLeadStatus, Lead } from "@/lib/data";

export async function GET() {
  try {
    const leads = getLeads();
    return NextResponse.json({ success: true, leads });
  } catch (error) {
    console.error("Fetch leads error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name && !body.phone) {
      return NextResponse.json({ success: false, error: "Name or phone is required" }, { status: 400 });
    }

    const newLead = createLead({
      name: body.name,
      phone: body.phone,
      email: body.email,
      intent: body.intent,
      propertyType: body.propertyType,
      budget: body.budget,
      timeline: body.timeline,
      source: body.source || "Website Form",
      propertyId: body.propertyId,
      propertyTitle: body.propertyTitle,
      notes: body.notes
    });

    return NextResponse.json({ 
      success: true, 
      message: "Lead captured successfully! Our advisor will connect with you soon.",
      lead: newLead
    }, { status: 201 });

  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json({ success: false, error: "Failed to process lead" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: "id and status are required" }, { status: 400 });
    }

    const updated = updateLeadStatus(id, status as Lead["status"]);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead: updated });
  } catch (error) {
    console.error("Update lead error:", error);
    return NextResponse.json({ success: false, error: "Failed to update lead" }, { status: 500 });
  }
}
