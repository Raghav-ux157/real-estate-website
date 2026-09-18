"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, Phone, CheckCircle2, XCircle, Building2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteVisit, getSiteVisits } from "@/lib/data";

export default function SiteVisitsPage() {
  const [visits, setVisits] = useState<SiteVisit[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVisits = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/visits");
      const data = await res.json();
      if (data.success && data.visits) {
        setVisits(data.visits);
      } else {
        setVisits(getSiteVisits());
      }
    } catch (err) {
      console.error("Error:", err);
      setVisits(getSiteVisits());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisits();
  }, []);

  const updateStatus = async (id: string, status: SiteVisit["status"]) => {
    setVisits(prev => prev.map(v => v.id === id ? { ...v, status } : v));
    try {
      await fetch("/api/visits", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status })
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Site Visits & Tours</h1>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          Coordinate client inspections, assign advisors, and track walkthrough outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-card border-border/70 p-4 rounded-xl">
          <p className="text-xs text-muted-foreground">Total Scheduled</p>
          <p className="text-2xl font-bold font-heading text-primary mt-1">{visits.length}</p>
        </Card>
        <Card className="bg-card border-border/70 p-4 rounded-xl">
          <p className="text-xs text-muted-foreground">Pending Confirmation</p>
          <p className="text-2xl font-bold font-heading text-foreground mt-1">
            {visits.filter(v => v.status === "SCHEDULED").length}
          </p>
        </Card>
        <Card className="bg-card border-border/70 p-4 rounded-xl">
          <p className="text-xs text-muted-foreground">Completed</p>
          <p className="text-2xl font-bold font-heading text-emerald-500 mt-1">
            {visits.filter(v => v.status === "COMPLETED").length}
          </p>
        </Card>
      </div>

      <div className="space-y-3">
        {visits.map((visit) => (
          <div 
            key={visit.id} 
            className="p-4 rounded-2xl bg-card border border-border/70 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-primary/40 transition-colors shadow-sm"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                <Calendar className="w-5 h-5" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm text-foreground">{visit.leadName}</h3>
                  <Badge 
                    variant="outline" 
                    className={`text-[10px] ${
                      visit.status === "SCHEDULED" ? "border-primary/40 text-primary bg-primary/5" :
                      visit.status === "COMPLETED" ? "border-emerald-500/40 text-emerald-500 bg-emerald-500/5" :
                      "border-zinc-500/40 text-zinc-400"
                    }`}
                  >
                    {visit.status}
                  </Badge>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1.5">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-primary" /> {visit.propertyTitle}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {visit.scheduledDate} at {visit.scheduledTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" /> {visit.leadPhone}
                  </span>
                </div>

                {visit.notes && (
                  <p className="text-xs text-muted-foreground/80 mt-2 bg-secondary/30 p-2 rounded-lg italic">
                    "{visit.notes}"
                  </p>
                )}
              </div>
            </div>

            {/* Status Actions */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-border/50">
              <a href={`tel:${visit.leadPhone}`}>
                <Button size="sm" variant="outline" className="text-xs h-8">
                  <Phone className="w-3.5 h-3.5 mr-1 text-primary" /> Call Client
                </Button>
              </a>

              {visit.status === "SCHEDULED" && (
                <Button 
                  size="sm" 
                  onClick={() => updateStatus(visit.id, "COMPLETED")}
                  className="text-xs h-8 bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Mark Done
                </Button>
              )}
            </div>
          </div>
        ))}

        {visits.length === 0 && (
          <div className="py-12 text-center text-muted-foreground bg-card/40 rounded-2xl border border-dashed border-border">
            No site visits scheduled yet.
          </div>
        )}
      </div>
    </div>
  );
}
