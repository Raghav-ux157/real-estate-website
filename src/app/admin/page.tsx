import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, Calendar, IndianRupee, ArrowUpRight, ArrowRight, Building, Plus } from "lucide-react";
import { getAnalyticsSummary, getLeads, getProperties } from "@/lib/data";

export default function AdminDashboard() {
  const analytics = getAnalyticsSummary();
  const leads = getLeads().slice(0, 5);
  const properties = getProperties().slice(0, 4);

  const metrics = [
    { title: "Active Leads", value: analytics.totalLeads.toString(), change: "+14%", icon: Users, color: "text-blue-500" },
    { title: "Hot & Qualified", value: analytics.qualifiedLeads.toString(), change: "+8%", icon: UserCheck, color: "text-orange-500" },
    { title: "Site Visits Scheduled", value: analytics.siteVisits.toString(), change: "+3 this week", icon: Calendar, color: "text-primary" },
    { title: "Pipeline Value", value: analytics.pipelineValue, change: "+18%", icon: IndianRupee, color: "text-emerald-500" },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">CRM Executive Dashboard</h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Real-time pipeline analytics, inquiries, and property portfolio metrics.
          </p>
        </div>

        <div className="flex gap-2.5">
          <Link href="/admin/properties">
            <Button size="sm" className="gap-1.5 text-xs">
              <Plus className="w-3.5 h-3.5" /> Manage Listings
            </Button>
          </Link>
          <Link href="/admin/leads">
            <Button size="sm" variant="outline" className="gap-1.5 text-xs">
              <Users className="w-3.5 h-3.5" /> View Pipeline
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((metric, i) => (
          <Card key={i} className="bg-card border-border/70 rounded-2xl shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className="p-2 rounded-xl bg-secondary/50">
                <metric.icon className={`w-4 h-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold font-heading text-foreground">{metric.value}</div>
              <p className="text-[11px] text-muted-foreground mt-2 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                <span className="text-emerald-500 font-semibold">{metric.change}</span> month-over-month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Pipeline Inquiries */}
        <Card className="col-span-1 lg:col-span-2 bg-card border-border/70 rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-heading font-semibold text-foreground">
              Recent Leads & Inquiries
            </CardTitle>
            <Link href="/admin/leads" className="text-xs text-primary hover:underline flex items-center gap-1 font-medium">
              Open Kanban <ArrowRight className="w-3 h-3" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-3.5 rounded-xl bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                      {lead.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{lead.name}</p>
                      <p className="text-xs text-muted-foreground">{lead.propertyTitle || `${lead.propertyType} • ${lead.budget}`}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-primary/10 text-primary mb-1 border border-primary/20">
                      {lead.status.replace("_", " ")}
                    </span>
                    <p className="text-[10px] text-muted-foreground">{lead.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Properties Inventory */}
        <Card className="col-span-1 bg-card border-border/70 rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-heading font-semibold text-foreground">
              Portfolio Overview
            </CardTitle>
            <Link href="/admin/properties" className="text-xs text-primary hover:underline flex items-center gap-1 font-medium">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {properties.map((prop) => (
                <div key={prop.id} className="flex justify-between items-center pb-3 border-b border-border/40 last:border-0 last:pb-0">
                  <div className="min-w-0 pr-2">
                    <p className="font-semibold text-xs text-foreground truncate">{prop.title}</p>
                    <p className="text-[11px] text-muted-foreground">{prop.location}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-xs text-primary">{prop.displayPrice}</p>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                      {prop.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
