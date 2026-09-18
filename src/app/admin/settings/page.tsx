"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Building, ShieldCheck, Mail, Phone } from "lucide-react";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [config, setConfig] = useState({
    agencyName: "EstateModern Real Estate",
    contactPhone: "+91 98765 43210",
    contactEmail: "contact@estatemodern.com",
    officeAddress: "Level 4, Modern Tower, C-Scheme, Jaipur, Rajasthan 302001",
    autoAssignLead: true,
    sendWhatsAppNotifications: true
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">CRM & Agency Settings</h1>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          Configure business details, notification channels, and advisor assignments.
        </p>
      </div>

      {saved && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-500 text-xs border border-emerald-500/20 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          Settings updated and persisted successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="bg-card border-border/70 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base font-heading">Agency Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Agency Display Name</Label>
                <Input 
                  value={config.agencyName}
                  onChange={e => setConfig({ ...config, agencyName: e.target.value })}
                  className="bg-background text-xs h-10"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Central Contact Phone</Label>
                <Input 
                  value={config.contactPhone}
                  onChange={e => setConfig({ ...config, contactPhone: e.target.value })}
                  className="bg-background text-xs h-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Public Inquiries Email</Label>
                <Input 
                  value={config.contactEmail}
                  onChange={e => setConfig({ ...config, contactEmail: e.target.value })}
                  className="bg-background text-xs h-10"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">Physical Office Headquarters</Label>
                <Input 
                  value={config.officeAddress}
                  onChange={e => setConfig({ ...config, officeAddress: e.target.value })}
                  className="bg-background text-xs h-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/70 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base font-heading">Notification & Automation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <label className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-border/50 cursor-pointer">
              <input 
                type="checkbox" 
                checked={config.autoAssignLead}
                onChange={e => setConfig({ ...config, autoAssignLead: e.target.checked })}
                className="w-4 h-4 rounded border-border text-primary accent-primary" 
              />
              <div>
                <p className="text-xs font-semibold text-foreground">Auto-score and route incoming website inquiries</p>
                <p className="text-[11px] text-muted-foreground">Calculate intent score (0–100) and place directly into New Leads Kanban</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-border/50 cursor-pointer">
              <input 
                type="checkbox" 
                checked={config.sendWhatsAppNotifications}
                onChange={e => setConfig({ ...config, sendWhatsAppNotifications: e.target.checked })}
                className="w-4 h-4 rounded border-border text-primary accent-primary" 
              />
              <div>
                <p className="text-xs font-semibold text-foreground">Enable instant WhatsApp client follow-up shortcuts</p>
                <p className="text-[11px] text-muted-foreground">Allow advisors to launch pre-drafted WhatsApp chat directly from lead cards</p>
              </div>
            </label>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="h-10 px-6 text-xs font-semibold rounded-xl">
            Save CRM Configuration
          </Button>
        </div>
      </form>
    </div>
  );
}
