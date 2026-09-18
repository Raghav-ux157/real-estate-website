"use client";

import { useState, useEffect } from "react";
import { PhoneCall, MessageCircle, Clock, AlertCircle, CheckCircle2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Lead, getLeads } from "@/lib/data";

export default function FollowupsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    fetch("/api/leads")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.leads) setLeads(data.leads);
        else setLeads(getLeads());
      })
      .catch(() => setLeads(getLeads()));
  }, []);

  const pendingLeads = leads.filter(l => l.status === "NEW" || l.status === "CONTACTED" || l.status === "QUALIFIED");

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Follow-ups & Outreach</h1>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          High-priority client communications requiring advisor attention today.
        </p>
      </div>

      <div className="space-y-3">
        {pendingLeads.map((lead) => (
          <Card key={lead.id} className="bg-card border-border/70 rounded-2xl shadow-sm hover:border-primary/40 transition-colors">
            <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0 mt-0.5">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm text-foreground">{lead.name}</h3>
                    <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/30">
                      Score: {lead.score}
                    </Badge>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground font-medium">
                      {lead.status}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground mt-1">
                    Interested in <strong className="text-foreground">{lead.propertyTitle || lead.propertyType}</strong> • Budget: {lead.budget} • Timeline: {lead.timeline}
                  </p>

                  <div className="flex items-center gap-2 mt-1.5 text-[11px] text-muted-foreground">
                    <Clock className="w-3 h-3 text-muted-foreground" /> Inquired via {lead.source}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-border/40">
                {lead.phone && (
                  <>
                    <a 
                      href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${lead.name}, this is Rahul Sharma from EstateModern regarding your inquiry.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" className="text-xs h-9 bg-[#25D366] hover:bg-[#1EBE5D] text-white">
                        <MessageCircle className="w-3.5 h-3.5 mr-1.5 fill-current" /> WhatsApp
                      </Button>
                    </a>

                    <a href={`tel:${lead.phone}`}>
                      <Button size="sm" variant="outline" className="text-xs h-9 border-border/80">
                        <PhoneCall className="w-3.5 h-3.5 mr-1.5 text-primary" /> Call Now
                      </Button>
                    </a>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {pendingLeads.length === 0 && (
          <div className="py-12 text-center text-muted-foreground bg-card/40 rounded-2xl border border-dashed border-border">
            All follow-ups are up to date! Great job.
          </div>
        )}
      </div>
    </div>
  );
}
