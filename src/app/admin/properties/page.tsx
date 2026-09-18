"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Search, MapPin, Trash2, ExternalLink, RefreshCw, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PropertyForm } from "@/components/admin/PropertyForm";
import { Property, getProperties } from "@/lib/data";

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/properties");
      const data = await res.json();
      if (data.success && data.properties) {
        setProperties(data.properties);
      } else {
        setProperties(getProperties());
      }
    } catch (err) {
      console.error("Error fetching properties:", err);
      setProperties(getProperties());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this property listing?")) return;

    setProperties(prev => prev.filter(p => p.id !== id));
    try {
      await fetch(`/api/properties?id=${id}`, { method: "DELETE" });
    } catch (err) {
      console.error("Failed to delete property:", err);
      fetchProperties();
    }
  };

  const handleStatusChange = async (id: string, newStatus: Property["status"]) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
    try {
      await fetch("/api/properties", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus })
      });
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const filtered = properties.filter(p => {
    const matchesSearch = !searchTerm || 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === "all" || p.propertyType.toLowerCase() === typeFilter.toLowerCase();
    const matchesStatus = statusFilter === "all" || p.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Property Inventory</h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Manage portfolio listings, pricing, live status, and inbound lead counts.
          </p>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchProperties} 
            className="text-xs gap-1.5 h-9"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </Button>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger render={
              <Button size="sm" className="gap-1.5 text-xs font-semibold h-9 rounded-xl">
                <Plus className="w-3.5 h-3.5" /> Add New Property
              </Button>
            } />
            <DialogContent className="sm:max-w-2xl bg-card border-border/70 p-6 rounded-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-heading font-bold">List New Property</DialogTitle>
              </DialogHeader>
              <div className="mt-2">
                <PropertyForm 
                  onSuccess={() => {
                    setIsModalOpen(false);
                    fetchProperties();
                  }}
                  onCancel={() => setIsModalOpen(false)}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center bg-card border border-border/60 rounded-xl px-3 py-2 w-full sm:w-80">
          <Search className="w-4 h-4 text-muted-foreground mr-2 shrink-0" />
          <input 
            type="text" 
            placeholder="Search title, ID, or locality..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-xs w-full placeholder:text-muted-foreground"
          />
        </div>

        <select 
          value={typeFilter} 
          onChange={(e) => setTypeFilter(e.target.value)}
          className="bg-card border border-border/60 rounded-xl px-3 py-2 text-xs outline-none"
        >
          <option value="all">All Types</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="Commercial">Commercial</option>
          <option value="Plot">Plot</option>
        </select>

        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-card border border-border/60 rounded-xl px-3 py-2 text-xs outline-none"
        >
          <option value="all">All Statuses</option>
          <option value="AVAILABLE">Available</option>
          <option value="UNDER_NEGOTIATION">Under Negotiation</option>
          <option value="SOLD">Sold</option>
          <option value="RENTED">Rented</option>
        </select>
      </div>

      {/* Properties Inventory Table */}
      <div className="bg-card border border-border/70 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-secondary/40 text-muted-foreground border-b border-border/60">
              <tr>
                <th className="px-5 py-3.5 font-semibold">Property Listing</th>
                <th className="px-5 py-3.5 font-semibold">Locality & Type</th>
                <th className="px-5 py-3.5 font-semibold">Price</th>
                <th className="px-5 py-3.5 font-semibold">Live Status</th>
                <th className="px-5 py-3.5 font-semibold text-center">Inquiries</th>
                <th className="px-5 py-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filtered.map((prop) => (
                <tr key={prop.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-11 rounded-lg overflow-hidden shrink-0 bg-muted">
                        <Image src={prop.images[0]} alt={prop.title} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-xs">{prop.title}</p>
                        <p className="text-[10px] text-muted-foreground">{prop.bhkText}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1 mb-1">
                      <MapPin className="w-3 h-3 text-primary shrink-0" />
                      <span className="text-muted-foreground truncate max-w-[150px]">{prop.location}</span>
                    </div>
                    <Badge variant="outline" className="bg-background text-[10px] py-0 px-1.5">{prop.propertyType}</Badge>
                  </td>

                  <td className="px-5 py-3.5 font-bold text-primary font-heading text-sm">
                    {prop.displayPrice}
                  </td>

                  <td className="px-5 py-3.5">
                    <select
                      value={prop.status}
                      onChange={(e) => handleStatusChange(prop.id, e.target.value as Property["status"])}
                      className={`text-[11px] font-semibold rounded-lg px-2 py-1 border outline-none cursor-pointer ${
                        prop.status === 'AVAILABLE' 
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                          : prop.status === 'UNDER_NEGOTIATION'
                          ? 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                          : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                      }`}
                    >
                      <option value="AVAILABLE">AVAILABLE</option>
                      <option value="UNDER_NEGOTIATION">UNDER NEGOTIATION</option>
                      <option value="SOLD">SOLD</option>
                      <option value="RENTED">RENTED</option>
                    </select>
                  </td>

                  <td className="px-5 py-3.5 text-center font-bold text-foreground">
                    {prop.leadsCount || 0}
                  </td>

                  <td className="px-5 py-3.5 text-right space-x-1">
                    <Link href={`/properties/${prop.id}`} target="_blank">
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDelete(prop.id)}
                      className="h-7 w-7 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
              
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted-foreground">
                    No properties found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
