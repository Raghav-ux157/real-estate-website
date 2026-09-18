import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // Create an Admin Agent
  const agent = await prisma.user.upsert({
    where: { email: 'admin@estatemodern.com' },
    update: {},
    create: {
      email: 'admin@estatemodern.com',
      name: 'Rahul Sharma',
      role: 'ADMIN',
    },
  })

  // Create Mock Properties
  const properties = [
    {
      title: "Modern Glass Villa",
      slug: "modern-glass-villa",
      description: "A stunning 4 BHK luxury villa with private pool, home theater, and Italian marble flooring.",
      propertyType: "Villa",
      intent: "Buy",
      price: 45000000,
      areaSqft: 3200,
      bedrooms: 4,
      bathrooms: 5,
      location: "Vaishali Nagar, Jaipur",
      status: "AVAILABLE",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3"
      ]),
      amenities: JSON.stringify(["Private Pool", "Home Theater", "Smart Home System", "Italian Marble"])
    },
    {
      title: "Premium Penthouse",
      slug: "premium-penthouse",
      description: "Ultra-luxurious 3 BHK penthouse with panoramic city views and exclusive rooftop terrace.",
      propertyType: "Apartment",
      intent: "Rent",
      price: 85000,
      areaSqft: 2400,
      bedrooms: 3,
      bathrooms: 3,
      location: "C-Scheme, Jaipur",
      status: "AVAILABLE",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3"
      ]),
      amenities: JSON.stringify(["Rooftop Terrace", "City Views", "24/7 Security", "Gym"])
    },
    {
      title: "Skyline Residences",
      slug: "skyline-residences",
      description: "Upcoming premium apartment complex with world-class amenities and 80% open space.",
      propertyType: "Apartment",
      intent: "Buy",
      price: 12000000,
      areaSqft: 1800,
      bedrooms: 3,
      bathrooms: 3,
      location: "Jagatpura, Jaipur",
      status: "AVAILABLE",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3"
      ]),
      amenities: JSON.stringify(["Clubhouse", "Swimming Pool", "Jogging Track", "Power Backup"])
    }
  ]

  for (const p of properties) {
    await prisma.property.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    })
  }

  // Create Mock Leads
  const propertyRecord = await prisma.property.findFirst()

  const leads = [
    {
      name: "Ravi Desai",
      phone: "+91 9876543210",
      email: "ravi@example.com",
      intent: "Buy",
      propertyType: "Villa",
      budget: "Above ₹3 Cr",
      timeline: "Immediately",
      source: "Website Form",
      score: 95,
      status: "NEW",
      propertyId: propertyRecord?.id,
      agentId: agent.id
    },
    {
      name: "Sneha Patel",
      phone: "+91 9123456789",
      intent: "Rent",
      propertyType: "Apartment",
      budget: "Under ₹50 Lacs",
      timeline: "3-6 months",
      source: "WhatsApp",
      score: 60,
      status: "CONTACTED",
      agentId: agent.id
    }
  ]

  for (const l of leads) {
    await prisma.lead.create({ data: l })
  }

  console.log("Database seeded successfully!")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
