"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, MessageCircle, MoreVertical, Plus, ArrowRight, CheckCircle2, 
  Sparkles, Filter, ChevronRight, UserPlus, RefreshCw 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lead } from "@/lib/data";

const COLUMNS: { id: Lead["status"]; title: string; color: string }[] = [
  { id: "NEW", title: "New Inquiries", color: "border-blue-500/30 text-blue-400 bg-blue-500/10" },
  { id: "CONTACTED", title: "Contacted", color: "border-yellow-500/30 text-yellow-400 bg-yellow-500/10" },
  { id: "QUALIFIED", title: "Qualified (Hot)", color: "border-purple-500/30 text-purple-400 bg-purple-500/10" },
  { id: "SITE_VISIT", title: "Site Visit Scheduled", color: "border-orange-500/30 text-orange-400 bg-orange-500/10" },
  { id: "NEGOTIATION", title: "In Negotiation", color: "border-pink-500/30 text-pink-400 bg-pink-500/10" },
  { id: "BOOKED", title: "Won & Booked", color: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10" },
];

export function KanbanBoard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newLeadData, setNewLeadData] = useState({
    name: "",
    phone: "",
    propertyType: "Apartment",
    budget: "₹1 Cr - ₹3 Cr",
    propertyTitle: "Vaishali Nagar Residence",
    timeline: "Immediately"
  });

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/leads");
      const data = await res.json();
      if (data.success && data.leads) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error("Error fetching leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const moveLeadStatus = async (leadId: string, currentStatus: Lead["status"], targetStatus: Lead["status"]) => {
    // Optimistic UI update
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: targetStatus } : l));

    try {
      await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, status: targetStatus })
      });
    } catch (err) {
      console.error("Failed to move lead:", err);
      // Revert if error
      fetchLeads();
    }
  };

  const handleAddManualLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newLeadData,
          source: "Direct CRM Entry",
          status: "NEW"
        })
      });
      const data = await res.json();
      if (data.success) {
        setAddModalOpen(false);
        setNewLeadData({
          name: "",
          phone: "",
          propertyType: "Apartment",
          budget: "₹1 Cr - ₹3 Cr",
          propertyTitle: "Vaishali Nagar Residence",
          timeline: "Immediately"
        });
        fetchLeads();
      }
    } catch (err) {
      console.error("Failed to add lead:", err);
    }
  };

  const getNextStatus = (current: Lead["status"]): Lead["status"] | null => {
    const order: Lead["status"][] = ["NEW", "CONTACTED", "QUALIFIED", "SITE_VISIT", "NEGOTIATION", "BOOKED"];
    const idx = order.indexOf(current);
    if (idx !== -1 && idx < order.length - 1) {
      return order[idx + 1];
    }
    return null;
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      
      {/* Top Toolbar */}
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-2">
          <Button 
            onClick={fetchLeads} 
            variant="outline" 
            size="sm" 
            className="text-xs border-border/70 gap-1.5 h-9"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh Pipeline
          </Button>
          <span className="text-xs text-muted-foreground">
            Total active in funnel: <strong className="text-foreground">{leads.length}</strong>
          </span>
        </div>

        <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
          <DialogTrigger render={
            <Button size="sm" className="gap-1.5 text-xs font-semibold h-9 rounded-xl">
              <UserPlus className="w-3.5 h-3.5" /> Add New Lead
            </Button>
          } />
          <DialogContent className="sm:max-w-md bg-card border-border/70 p-6 rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-heading">Add Manual Lead to CRM</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddManualLead} className="space-y-4 mt-2">
              <div className="space-y-1.5">
                <Label htmlFor="lead-name" className="text-xs">Client Full Name *</Label>
                <Input 
                  id="lead-name" 
                  placeholder="e.g. Vikram Sharma" 
                  required
                  value={newLeadData.name}
                  onChange={e => setNewLeadData({ ...newLeadData, name: e.target.value })}
                  className="bg-background border-border/60"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="lead-phone" className="text-xs">Phone / WhatsApp *</Label>
                <Input 
                  id="lead-phone" 
                  type="tel"
                  placeholder="+91 98765 43210" 
                  required
                  value={newLeadData.phone}
                  onChange={e => setNewLeadData({ ...newLeadData, phone: e.target.value })}
                  className="bg-background border-border/60"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="lead-type" className="text-xs">Property Type</Label>
                  <select 
                    id="lead-type"
                    value={newLeadData.propertyType}
                    onChange={e => setNewLeadData({ ...newLeadData, propertyType: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-border/60 bg-background px-3 py-2 text-xs"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Plot">Plot</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lead-budget" className="text-xs">Budget</Label>
                  <select 
                    id="lead-budget"
                    value={newLeadData.budget}
                    onChange={e => setNewLeadData({ ...newLeadData, budget: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-border/60 bg-background px-3 py-2 text-xs"
                  >
                    <option value="Under ₹50 Lacs">Under ₹50 Lacs</option>
                    <option value="₹50 Lacs - ₹1 Cr">₹50 Lacs - ₹1 Cr</option>
                    <option value="₹1 Cr - ₹3 Cr">₹1 Cr - ₹3 Cr</option>
                    <option value="Above ₹3 Cr">Above ₹3 Cr</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="lead-prop" className="text-xs">Target Property or Location</Label>
                <Input 
                  id="lead-prop" 
                  placeholder="e.g. Modern Glass Villa or Vaishali Nagar"
                  value={newLeadData.propertyTitle}
                  onChange={e => setNewLeadData({ ...newLeadData, propertyTitle: e.target.value })}
                  className="bg-background border-border/60 text-xs"
                />
              </div>

              <Button type="submit" className="w-full h-11 text-xs font-semibold mt-2">
                Save & Place in Pipeline
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Kanban Board Columns Container */}
      <div className="flex h-full gap-4 items-start pb-6 min-w-max overflow-x-auto">
        {COLUMNS.map((column) => {
          const columnLeads = leads.filter(l => l.status === column.id);
          
          return (
            <div 
              key={column.id} 
              className="w-80 flex-shrink-0 flex flex-col bg-secondary/25 rounded-2xl border border-border/60 max-h-[calc(100vh-210px)]"
            >
              {/* Column Header */}
              <div className={`p-3.5 border-b border-border/60 rounded-t-2xl flex justify-between items-center ${column.color}`}>
                <h3 className="font-heading font-semibold text-xs uppercase tracking-wider">{column.title}</h3>
                <span className="text-xs font-bold bg-background/80 px-2 py-0.5 rounded-full border border-border/40">
                  {columnLeads.length}
                </span>
              </div>

              {/* Column Cards Dropzone */}
              <div className="p-3 flex-1 overflow-y-auto space-y-3">
                {columnLeads.map((lead) => {
                  const nextStatus = getNextStatus(lead.status);

                  return (
                    <Card 
                      key={lead.id} 
                      className="bg-card border-border/70 shadow-sm hover:border-primary/50 transition-all rounded-xl overflow-hidden group"
                    >
                      <CardContent className="p-3.5 space-y-2.5">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-foreground text-xs">{lead.name}</h4>
                            <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                              {lead.propertyTitle || `${lead.propertyType} Inquiry`}
                            </p>
                          </div>
                          
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            lead.score >= 80 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-primary/10 text-primary'
                          }`}>
                            Score: {lead.score}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {lead.budget && (
                            <Badge variant="outline" className="text-[10px] bg-secondary/50 py-0 px-1.5 border-border">
                              {lead.budget}
                            </Badge>
                          )}
                          {lead.timeline && (
                            <Badge variant="outline" className="text-[10px] bg-secondary/50 py-0 px-1.5 border-border">
                              {lead.timeline}
                            </Badge>
                          )}
                          {lead.source && (
                            <Badge variant="outline" className="text-[10px] bg-secondary/30 text-muted-foreground py-0 px-1.5 border-border">
                              {lead.source}
                            </Badge>
                          )}
                        </div>

                        {lead.notes && (
                          <p className="text-[11px] text-muted-foreground bg-secondary/30 p-1.5 rounded-md italic line-clamp-2">
                            "{lead.notes}"
                          </p>
                        )}

                        {/* Action Bar */}
                        <div className="flex justify-between items-center pt-2.5 border-t border-border/50">
                          {/* Quick Contact Icons */}
                          <div className="flex gap-1.5">
                            {lead.phone && (
                              <>
                                <a
                                  href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${lead.name}, this is Rahul Sharma from EstateModern regarding your property inquiry.`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="WhatsApp"
                                  className="w-7 h-7 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 flex items-center justify-center transition-colors"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </a>
                                <a
                                  href={`tel:${lead.phone}`}
                                  title="Call"
                                  className="w-7 h-7 rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 flex items-center justify-center transition-colors"
                                >
                                  <Phone className="w-3.5 h-3.5" />
                                </a>
                              </>
                            )}
                          </div>

                          {/* Move to next stage button */}
                          {nextStatus ? (
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => moveLeadStatus(lead.id, lead.status, nextStatus)}
                              className="h-7 px-2 text-[10px] font-semibold text-primary hover:text-primary hover:bg-primary/10 gap-1"
                            >
                              Advance <ChevronRight className="w-3 h-3" />
                            </Button>
                          ) : (
                            <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Closed
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
                
                {columnLeads.length === 0 && (
                  <div className="h-28 border border-dashed border-border/50 rounded-xl flex items-center justify-center text-xs text-muted-foreground/60 text-center p-4">
                    No leads in this stage
                  </div>
                )}
              </div>
              
            </div>
          );
        })}
      </div>
    </div>
  );
}
