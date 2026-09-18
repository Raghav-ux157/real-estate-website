import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Eye, Target, Award } from "lucide-react";
import { getAnalyticsSummary } from "@/lib/data";

export default function AnalyticsPage() {
  const analytics = getAnalyticsSummary();

  const funnel = [
    { label: "Total Inquiries", count: analytics.totalLeads, percentage: "100%", color: "bg-blue-500/60" },
    { label: "Qualified & Verified", count: analytics.qualifiedLeads, percentage: `${Math.round((analytics.qualifiedLeads / (analytics.totalLeads || 1)) * 100)}%`, color: "bg-purple-500/60" },
    { label: "Site Visits Scheduled", count: analytics.siteVisits, percentage: `${Math.round((analytics.siteVisits / (analytics.totalLeads || 1)) * 100)}%`, color: "bg-orange-500/60" },
    { label: "Closed & Won", count: analytics.bookedLeads, percentage: `${Math.round((analytics.bookedLeads / (analytics.totalLeads || 1)) * 100)}%`, color: "bg-emerald-500/60" },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Analytics & Conversion Reports</h1>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          Monitor inbound marketing efficiency, pipeline conversion rates, and localized engagement.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-card border-border/70 p-4 rounded-xl">
          <p className="text-xs text-muted-foreground">Portfolio Valuation</p>
          <p className="text-2xl font-bold font-heading text-primary mt-1">{analytics.pipelineValue}</p>
          <p className="text-[10px] text-muted-foreground mt-1">Active inventory under management</p>
        </Card>
        <Card className="bg-card border-border/70 p-4 rounded-xl">
          <p className="text-xs text-muted-foreground">Active Listings</p>
          <p className="text-2xl font-bold font-heading text-foreground mt-1">{analytics.totalProperties}</p>
          <p className="text-[10px] text-muted-foreground mt-1">{analytics.availableProperties} currently available</p>
        </Card>
        <Card className="bg-card border-border/70 p-4 rounded-xl">
          <p className="text-xs text-muted-foreground">Average Conversion Velocity</p>
          <p className="text-2xl font-bold font-heading text-emerald-500 mt-1">18 Days</p>
          <p className="text-[10px] text-muted-foreground mt-1">From first inquiry to site visit</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Real-time Conversion Funnel */}
        <Card className="bg-card border-border/70 rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-heading flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" /> Lead Conversion Funnel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {funnel.map((step, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground font-medium">{step.label}</span>
                  <span className="font-bold text-foreground">{step.count} ({step.percentage})</span>
                </div>
                <div className="h-3.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div className={`h-full ${step.color} rounded-full transition-all duration-500`} style={{ width: step.percentage }}></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Property Views Chart */}
        <Card className="bg-card border-border/70 rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-heading flex items-center gap-2">
              <Eye className="w-4 h-4 text-primary" /> Weekly Traffic & Inquiries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-end justify-between gap-2 pt-6">
              {[45, 75, 50, 95, 65, 100, 85].map((height, i) => (
                <div key={i} className="w-full bg-primary/20 hover:bg-primary/50 rounded-t-lg transition-colors relative group" style={{ height: `${height}%` }}>
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[10px] font-bold px-2 py-0.5 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {height * 14} views
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[11px] text-muted-foreground mt-4 px-2 font-medium">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
