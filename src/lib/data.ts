export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  propertyType: "Apartment" | "Villa" | "Plot" | "Commercial";
  intent: "Buy" | "Rent";
  price: number; // in INR
  displayPrice: string;
  areaSqft: number;
  bedrooms: number;
  bathrooms: number;
  location: string;
  status: "AVAILABLE" | "UNDER_NEGOTIATION" | "SOLD" | "RENTED";
  images: string[];
  amenities: string[];
  featured?: boolean;
  bhkText: string;
  leadsCount?: number;
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  intent?: string;
  propertyType?: string;
  budget?: string;
  timeline?: string;
  source?: string;
  score: number;
  status: "NEW" | "CONTACTED" | "QUALIFIED" | "SITE_VISIT" | "NEGOTIATION" | "BOOKED";
  propertyId?: string;
  propertyTitle?: string;
  notes?: string;
  createdAt: string;
}

export interface SiteVisit {
  id: string;
  leadName: string;
  leadPhone: string;
  leadEmail?: string;
  propertyId?: string;
  propertyTitle: string;
  scheduledDate: string;
  scheduledTime: string;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
  notes?: string;
  createdAt: string;
}

// Initial high-quality verified properties
const initialProperties: Property[] = [
  {
    id: "prop-1",
    title: "Modern Glass Villa",
    slug: "modern-glass-villa",
    description: "A stunning 4 BHK architectural luxury villa with private heated swimming pool, Dolby Atmos home theater, Italian marble flooring, and smart home automation throughout.",
    propertyType: "Villa",
    intent: "Buy",
    price: 45000000,
    displayPrice: "₹ 4.5 Cr",
    areaSqft: 3200,
    bedrooms: 4,
    bathrooms: 5,
    location: "Vaishali Nagar, Jaipur",
    status: "AVAILABLE",
    featured: true,
    bhkText: "4 BHK • 3,200 sq.ft",
    leadsCount: 42,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Private Pool",
      "Home Theater",
      "Smart Home Automation",
      "Italian Marble Flooring",
      "Modular German Kitchen",
      "3 Car Parking",
      "Servant Quarters",
      "24/7 Security & CCTV"
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: "prop-2",
    title: "Premium Sky Penthouse",
    slug: "premium-penthouse",
    description: "Ultra-luxurious 3 BHK penthouse in the prestigious C-Scheme district featuring panoramic 360-degree city views, exclusive rooftop garden terrace, and imported fittings.",
    propertyType: "Apartment",
    intent: "Rent",
    price: 85000,
    displayPrice: "₹ 85,000/mo",
    areaSqft: 2400,
    bedrooms: 3,
    bathrooms: 3,
    location: "C-Scheme, Jaipur",
    status: "AVAILABLE",
    featured: true,
    bhkText: "3 BHK • 2,400 sq.ft",
    leadsCount: 18,
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Rooftop Terrace",
      "City View Balconies",
      "Clubhouse Access",
      "Modern Gymnasium",
      "100% Power Backup",
      "High Speed Elevators"
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: "prop-3",
    title: "Skyline Heights Residences",
    slug: "skyline-residences",
    description: "Upcoming premium high-rise apartment complex offering 80% open landscaped greens, Olympic sized swimming pool, badminton court, and earthquake-resistant structure.",
    propertyType: "Apartment",
    intent: "Buy",
    price: 12000000,
    displayPrice: "₹ 1.2 Cr",
    areaSqft: 1850,
    bedrooms: 3,
    bathrooms: 3,
    location: "Jagatpura, Jaipur",
    status: "AVAILABLE",
    featured: true,
    bhkText: "3 BHK • 1,850 sq.ft",
    leadsCount: 35,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Clubhouse & Lounge",
      "Swimming Pool",
      "Jogging Track",
      "Kids Play Area",
      "Intercom Facility",
      "Covered Reserved Parking"
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: "prop-4",
    title: "Royal Heritage Courtyard Villa",
    slug: "royal-heritage-courtyard",
    description: "Regal 5 BHK contemporary mansion inspired by Rajputana architecture with a serene central fountain courtyard, sprawling lawns, and bespoke teakwood woodwork.",
    propertyType: "Villa",
    intent: "Buy",
    price: 89000000,
    displayPrice: "₹ 8.9 Cr",
    areaSqft: 5500,
    bedrooms: 5,
    bathrooms: 6,
    location: "Civil Lines, Jaipur",
    status: "AVAILABLE",
    featured: false,
    bhkText: "5 BHK • 5,500 sq.ft",
    leadsCount: 22,
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Central Courtyard",
      "Sprawling Private Garden",
      "Servant Quarters",
      "Vastu Compliant Design",
      "Solar Water Heating",
      "Security Surveillance"
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: "prop-5",
    title: "The Palm Meadows Luxury Flat",
    slug: "palm-meadows",
    description: "Well-ventilated East-facing 2 BHK flat situated in a prime residential enclave close to top schools and metro station. Ideal for young families or rental investors.",
    propertyType: "Apartment",
    intent: "Buy",
    price: 6800000,
    displayPrice: "₹ 68 Lacs",
    areaSqft: 1350,
    bedrooms: 2,
    bathrooms: 2,
    location: "Mansarovar, Jaipur",
    status: "AVAILABLE",
    featured: false,
    bhkText: "2 BHK • 1,350 sq.ft",
    leadsCount: 14,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Gated Society",
      "Children's Play Park",
      "Community Hall",
      "Lift with Inverter",
      "24hr Water Supply"
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: "prop-6",
    title: "Apex Horizon Tech Park Suite",
    slug: "apex-horizon-tech-park",
    description: "Grade-A IT/commercial office space with central air conditioning, fire safety infrastructure, cafeteria, and ample basement multi-level car parking.",
    propertyType: "Commercial",
    intent: "Buy",
    price: 28000000,
    displayPrice: "₹ 2.8 Cr",
    areaSqft: 2200,
    bedrooms: 0,
    bathrooms: 2,
    location: "Malviya Nagar, Jaipur",
    status: "AVAILABLE",
    featured: false,
    bhkText: "Commercial • 2,200 sq.ft",
    leadsCount: 9,
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Central HVAC",
      "Double Glazed Facade",
      "Multi-level Parking",
      "High Speed Fiber Optic",
      "Conference Center"
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: "prop-7",
    title: "Greenwood Serene Villa",
    slug: "greenwood-serene-villa",
    description: "Luxurious gated 3 BHK corner villa offering lush green community views, private terrace, modern modular kitchen, and round-the-clock security.",
    propertyType: "Villa",
    intent: "Buy",
    price: 22000000,
    displayPrice: "₹ 2.2 Cr",
    areaSqft: 2600,
    bedrooms: 3,
    bathrooms: 4,
    location: "Ajmer Road, Jaipur",
    status: "AVAILABLE",
    featured: false,
    bhkText: "3 BHK • 2,600 sq.ft",
    leadsCount: 19,
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Corner Plot",
      "Gated Community",
      "Private Lawn",
      "Modular Kitchen",
      "Solar Inverter Backup"
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: "prop-8",
    title: "Urban Square Boutique Retail",
    slug: "urban-square-retail",
    description: "High footfall retail storefront on main arterial road with double-height storefront glass, prime signage visibility, and dedicated customer parking.",
    propertyType: "Commercial",
    intent: "Rent",
    price: 65000,
    displayPrice: "₹ 65,000/mo",
    areaSqft: 1100,
    bedrooms: 0,
    bathrooms: 1,
    location: "Tonk Road, Jaipur",
    status: "AVAILABLE",
    featured: false,
    bhkText: "Commercial Retail • 1,100 sq.ft",
    leadsCount: 7,
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Main Road Frontage",
      "High Footfall Corridor",
      "Dedicated Loading Zone",
      "Heavy Power Sanction"
    ],
    createdAt: new Date().toISOString()
  }
];

const initialLeads: Lead[] = [
  {
    id: "lead-1",
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@gmail.com",
    intent: "Buy",
    propertyType: "Villa",
    budget: "Above ₹3 Cr",
    timeline: "Immediately",
    source: "Property Page",
    score: 95,
    status: "NEW",
    propertyId: "prop-1",
    propertyTitle: "Modern Glass Villa",
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
  },
  {
    id: "lead-2",
    name: "Priya Sharma",
    phone: "+91 98290 11223",
    email: "priya.s@outlook.com",
    intent: "Buy",
    propertyType: "Commercial",
    budget: "₹1 Cr - ₹3 Cr",
    timeline: "1-3 months",
    source: "Website Search",
    score: 75,
    status: "CONTACTED",
    propertyId: "prop-6",
    propertyTitle: "Apex Horizon Tech Park Suite",
    createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString()
  },
  {
    id: "lead-3",
    name: "Amit Patel",
    phone: "+91 94140 55443",
    email: "amit.patel@yahoo.com",
    intent: "Buy",
    propertyType: "Villa",
    budget: "Above ₹3 Cr",
    timeline: "Immediately",
    source: "Direct WhatsApp",
    score: 95,
    status: "SITE_VISIT",
    propertyId: "prop-4",
    propertyTitle: "Royal Heritage Courtyard Villa",
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
  },
  {
    id: "lead-4",
    name: "Neha Singh",
    phone: "+91 91160 88776",
    email: "neha.singh@gmail.com",
    intent: "Buy",
    propertyType: "Apartment",
    budget: "₹50 Lacs - ₹1 Cr",
    timeline: "1-3 months",
    source: "Homepage Form",
    score: 70,
    status: "QUALIFIED",
    propertyId: "prop-5",
    propertyTitle: "The Palm Meadows Luxury Flat",
    createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString()
  },
  {
    id: "lead-5",
    name: "Vikram Rathore",
    phone: "+91 98280 44332",
    email: "vikram.rathore@gmail.com",
    intent: "Buy",
    propertyType: "Villa",
    budget: "Above ₹3 Cr",
    timeline: "Immediately",
    source: "Referral",
    score: 90,
    status: "NEGOTIATION",
    propertyId: "prop-1",
    propertyTitle: "Modern Glass Villa",
    createdAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString()
  },
  {
    id: "lead-6",
    name: "Dr. Sanjay Verma",
    phone: "+91 97840 99887",
    email: "sanjay.verma@fortis.com",
    intent: "Rent",
    propertyType: "Apartment",
    budget: "₹50 Lacs - ₹1 Cr",
    timeline: "Immediately",
    source: "Property Page",
    score: 85,
    status: "BOOKED",
    propertyId: "prop-2",
    propertyTitle: "Premium Sky Penthouse",
    createdAt: new Date(Date.now() - 96 * 3600 * 1000).toISOString()
  }
];

const initialSiteVisits: SiteVisit[] = [
  {
    id: "visit-1",
    leadName: "Amit Patel",
    leadPhone: "+91 94140 55443",
    leadEmail: "amit.patel@yahoo.com",
    propertyId: "prop-4",
    propertyTitle: "Royal Heritage Courtyard Villa",
    scheduledDate: "Tomorrow",
    scheduledTime: "11:30 AM",
    status: "SCHEDULED",
    notes: "Client arriving with architect for site review.",
    createdAt: new Date().toISOString()
  },
  {
    id: "visit-2",
    leadName: "Rajesh Kumar",
    leadPhone: "+91 98765 43210",
    leadEmail: "rajesh.kumar@gmail.com",
    propertyId: "prop-1",
    propertyTitle: "Modern Glass Villa",
    scheduledDate: "Saturday",
    scheduledTime: "04:00 PM",
    status: "SCHEDULED",
    notes: "Interested in swimming pool dimensions and solar installation.",
    createdAt: new Date().toISOString()
  },
  {
    id: "visit-3",
    leadName: "Priya Sharma",
    leadPhone: "+91 98290 11223",
    leadEmail: "priya.s@outlook.com",
    propertyId: "prop-6",
    propertyTitle: "Apex Horizon Tech Park Suite",
    scheduledDate: "Monday",
    scheduledTime: "02:00 PM",
    status: "SCHEDULED",
    notes: "Commercial office inspection with company partners.",
    createdAt: new Date().toISOString()
  }
];

export interface EstateDatabase {
  properties: Property[];
  leads: Lead[];
  siteVisits: SiteVisit[];
}

// Global in-memory cache to persist data across Next.js API calls in development
declare global {
  // eslint-disable-next-line no-var
  var __estateModernDb: EstateDatabase | undefined;
}

function getDatabase(): EstateDatabase {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("__estateModernDb_v1");
      if (stored) {
        return JSON.parse(stored) as EstateDatabase;
      }
    } catch (e) {}
  }

  if (!global.__estateModernDb) {
    global.__estateModernDb = {
      properties: [...initialProperties],
      leads: [...initialLeads],
      siteVisits: [...initialSiteVisits]
    };
  }
  return global.__estateModernDb;
}

function persistDatabase(db: EstateDatabase) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("__estateModernDb_v1", JSON.stringify(db));
    } catch (e) {}
  }
}

// ---------------- Property Handlers ----------------
export interface PropertyFilterParams {
  search?: string;
  type?: string;
  budget?: string;
  bedrooms?: string;
  location?: string;
  sort?: string;
}

export function getProperties(params: PropertyFilterParams = {}): Property[] {
  const db = getDatabase();
  let results = [...db.properties];

  const search = params.search?.toLowerCase().trim();
  if (search) {
    results = results.filter(p =>
      p.title.toLowerCase().includes(search) ||
      p.location.toLowerCase().includes(search) ||
      p.description.toLowerCase().includes(search) ||
      p.propertyType.toLowerCase().includes(search)
    );
  }

  if (params.location && params.location !== "all") {
    const loc = params.location.toLowerCase().trim();
    results = results.filter(p => p.location.toLowerCase().includes(loc));
  }

  if (params.type && params.type !== "all") {
    results = results.filter(p => p.propertyType.toLowerCase() === params.type?.toLowerCase());
  }

  if (params.bedrooms && params.bedrooms !== "all") {
    const bhk = parseInt(params.bedrooms);
    if (bhk === 4) {
      results = results.filter(p => p.bedrooms >= 4);
    } else {
      results = results.filter(p => p.bedrooms === bhk);
    }
  }

  if (params.budget && params.budget !== "all") {
    if (params.budget === "under-50") {
      results = results.filter(p => p.price < 5000000);
    } else if (params.budget === "50-100") {
      results = results.filter(p => p.price >= 5000000 && p.price <= 10000000);
    } else if (params.budget === "1-3") {
      results = results.filter(p => p.price > 10000000 && p.price <= 30000000);
    } else if (params.budget === "above-3") {
      results = results.filter(p => p.price > 30000000);
    }
  }

  // Sorting
  if (params.sort === "price-asc") {
    results.sort((a, b) => a.price - b.price);
  } else if (params.sort === "price-desc") {
    results.sort((a, b) => b.price - a.price);
  } else if (params.sort === "newest") {
    results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (params.sort === "area") {
    results.sort((a, b) => b.areaSqft - a.areaSqft);
  }

  return results;
}

export function getPropertyById(idOrSlug: string): Property | undefined {
  const db = getDatabase();
  // Support lookup by id, slug, or numeric index (1, 2, 3...)
  const numIndex = parseInt(idOrSlug);
  if (!isNaN(numIndex) && numIndex >= 1 && numIndex <= db.properties.length) {
    return db.properties[numIndex - 1];
  }
  return db.properties.find((p: Property) => p.id === idOrSlug || p.slug === idOrSlug);
}

export function createProperty(data: Partial<Property>): Property {
  const db = getDatabase();
  const id = `prop-${Date.now()}`;
  const slug = (data.title || "property")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const priceNum = Number(data.price) || 10000000;
  const displayPrice = priceNum >= 10000000
    ? `₹ ${(priceNum / 10000000).toFixed(1)} Cr`
    : `₹ ${(priceNum / 100000).toFixed(0)} Lacs`;

  const newProp: Property = {
    id,
    title: data.title || "New Property",
    slug: `${slug}-${Math.floor(Math.random() * 1000)}`,
    description: data.description || "A wonderful modern property located in a prime neighborhood.",
    propertyType: data.propertyType || "Apartment",
    intent: data.intent || "Buy",
    price: priceNum,
    displayPrice: data.displayPrice || displayPrice,
    areaSqft: Number(data.areaSqft) || 1500,
    bedrooms: Number(data.bedrooms) || 3,
    bathrooms: Number(data.bathrooms) || 3,
    location: data.location || "Jaipur",
    status: data.status || "AVAILABLE",
    featured: false,
    bhkText: `${data.bedrooms || 3} BHK • ${(data.areaSqft || 1500).toLocaleString()} sq.ft`,
    leadsCount: 0,
    images: data.images && data.images.length > 0
      ? data.images
      : ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"],
    amenities: data.amenities && data.amenities.length > 0
      ? data.amenities
      : ["24/7 Security", "Covered Parking", "Water Supply", "Power Backup"],
    createdAt: new Date().toISOString()
  };

  db.properties.unshift(newProp);
  persistDatabase(db);
  return newProp;
}

export function updateProperty(id: string, updates: Partial<Property>): Property | null {
  const db = getDatabase();
  const index = db.properties.findIndex(p => p.id === id);
  if (index === -1) return null;
  db.properties[index] = { ...db.properties[index], ...updates };
  persistDatabase(db);
  return db.properties[index];
}

export function deleteProperty(id: string): boolean {
  const db = getDatabase();
  const initialLength = db.properties.length;
  db.properties = db.properties.filter(p => p.id !== id);
  persistDatabase(db);
  return db.properties.length < initialLength;
}

// ---------------- Lead Handlers ----------------
export function getLeads(): Lead[] {
  const db = getDatabase();
  return db.leads;
}

export function calculateLeadScore(data: Partial<Lead>): number {
  let score = 30; // base score

  if (data.phone && data.phone.length >= 10) score += 25;
  if (data.timeline === "Immediately") score += 25;
  else if (data.timeline === "1-3 months") score += 15;
  else if (data.timeline === "3-6 months") score += 10;

  if (data.budget === "Above ₹3 Cr" || data.budget === "₹1 Cr - ₹3 Cr") score += 20;
  else if (data.budget === "₹50 Lacs - ₹1 Cr") score += 10;

  return Math.min(score, 100);
}

export function createLead(data: Partial<Lead>): Lead {
  const db = getDatabase();
  const id = `lead-${Date.now()}`;
  const score = calculateLeadScore(data);

  const newLead: Lead = {
    id,
    name: data.name || "Anonymous Inquirer",
    phone: data.phone || "",
    email: data.email || "",
    intent: data.intent || "Buy",
    propertyType: data.propertyType || "Apartment",
    budget: data.budget || "Not Specified",
    timeline: data.timeline || "Immediately",
    source: data.source || "Website Form",
    score,
    status: "NEW",
    propertyId: data.propertyId,
    propertyTitle: data.propertyTitle,
    notes: data.notes || "",
    createdAt: new Date().toISOString()
  };

  db.leads.unshift(newLead);
  persistDatabase(db);
  return newLead;
}

export function updateLeadStatus(id: string, status: Lead["status"]): Lead | null {
  const db = getDatabase();
  const lead = db.leads.find(l => l.id === id);
  if (!lead) return null;
  lead.status = status;
  persistDatabase(db);
  return lead;
}

// ---------------- Site Visit Handlers ----------------
export function getSiteVisits(): SiteVisit[] {
  const db = getDatabase();
  return db.siteVisits;
}

export function createSiteVisit(data: Partial<SiteVisit>): SiteVisit {
  const db = getDatabase();
  const id = `visit-${Date.now()}`;

  const newVisit: SiteVisit = {
    id,
    leadName: data.leadName || "Client",
    leadPhone: data.leadPhone || "",
    leadEmail: data.leadEmail || "",
    propertyId: data.propertyId || "",
    propertyTitle: data.propertyTitle || "Premium Property",
    scheduledDate: data.scheduledDate || "Tomorrow",
    scheduledTime: data.scheduledTime || "11:00 AM",
    status: "SCHEDULED",
    notes: data.notes || "",
    createdAt: new Date().toISOString()
  };

  db.siteVisits.unshift(newVisit);

  // Also create or link a Lead in the CRM for this site visit
  createLead({
    name: newVisit.leadName,
    phone: newVisit.leadPhone,
    email: newVisit.leadEmail,
    propertyId: newVisit.propertyId,
    propertyTitle: newVisit.propertyTitle,
    intent: "Buy",
    source: "Site Visit Booking",
    timeline: "Immediately",
    status: "SITE_VISIT",
    notes: `Scheduled visit on ${newVisit.scheduledDate} at ${newVisit.scheduledTime}`
  });

  persistDatabase(db);
  return newVisit;
}

export function updateSiteVisitStatus(id: string, status: SiteVisit["status"]): SiteVisit | null {
  const db = getDatabase();
  const visit = db.siteVisits.find(v => v.id === id);
  if (!visit) return null;
  visit.status = status;
  persistDatabase(db);
  return visit;
}

// ---------------- Analytics Summary ----------------
export function getAnalyticsSummary() {
  const db = getDatabase();
  const totalLeads = db.leads.length;
  const newLeads = db.leads.filter(l => l.status === "NEW").length;
  const qualifiedLeads = db.leads.filter(l => l.status === "QUALIFIED" || l.score >= 70).length;
  const siteVisits = db.siteVisits.length;
  const bookedLeads = db.leads.filter(l => l.status === "BOOKED").length;
  const totalProperties = db.properties.length;
  const availableProperties = db.properties.filter(p => p.status === "AVAILABLE").length;

  return {
    totalLeads,
    newLeads,
    qualifiedLeads,
    siteVisits,
    bookedLeads,
    totalProperties,
    availableProperties,
    pipelineValue: "₹ 54.8 Cr"
  };
}
