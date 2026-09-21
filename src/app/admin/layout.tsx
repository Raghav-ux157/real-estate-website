"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Users, Building, Calendar, PhoneCall, Settings, 
  LogOut, Bell, Search, BarChart3, ExternalLink, Menu, Sparkles, Smartphone 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarLinks = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Users, label: "Leads Pipeline", href: "/admin/leads" },
    { icon: Building, label: "Properties", href: "/admin/properties" },
    { icon: Calendar, label: "Site Visits", href: "/admin/visits" },
    { icon: PhoneCall, label: "Follow-ups", href: "/admin/followups" },
    { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-card">
      <div className="h-16 flex items-center justify-between px-6 border-b border-border/50">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center font-bold text-primary-foreground text-sm">
            E
          </div>
          <span className="font-heading font-bold text-lg text-foreground">EstateModern</span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 bg-primary/20 text-primary rounded">CRM</span>
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)}>
              <div 
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? "bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/20" 
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </div>
            </Link>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-border/50 space-y-2">
        <Link href="/preview" target="_blank">
          <Button variant="outline" size="sm" className="w-full justify-start text-xs border-border/60 hover:border-primary/50 text-foreground">
            <Smartphone className="w-3.5 h-3.5 mr-2 text-primary" /> Device Switcher
          </Button>
        </Link>
        <Link href="/" target="_blank">
          <Button variant="outline" size="sm" className="w-full justify-start text-xs border-border/60">
            <ExternalLink className="w-3.5 h-3.5 mr-2 text-primary" /> View Live Website
          </Button>
        </Link>
        <Link href="/">
          <Button variant="ghost" size="sm" className="w-full justify-start text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10">
            <LogOut className="w-3.5 h-3.5 mr-2" /> Exit Admin
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-card border-r border-border/50 flex-col hidden md:flex shrink-0">
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        
        {/* Top Header */}
        <header className="h-16 bg-card border-b border-border/50 flex items-center justify-between px-4 md:px-6 shrink-0 z-10">
          
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Hamburger Toggle */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger className="p-2 md:hidden border border-border rounded-lg text-foreground hover:bg-secondary">
                <Menu className="w-5 h-5" />
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72 bg-card border-r-border/60">
                <SidebarContent />
              </SheetContent>
            </Sheet>

            {/* Quick Search */}
            <div className="flex items-center bg-background border border-border/60 rounded-xl px-3 py-1.5 w-44 sm:w-64 md:w-80">
              <Search className="w-4 h-4 text-muted-foreground mr-2 shrink-0" />
              <input 
                type="text" 
                placeholder="Search CRM..." 
                className="bg-transparent border-none outline-none text-xs md:text-sm w-full placeholder:text-muted-foreground"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href="/" className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary mr-2">
              <ExternalLink className="w-3.5 h-3.5" /> Customer Site
            </Link>

            <Button variant="ghost" size="icon" className="relative text-muted-foreground h-9 w-9 rounded-xl">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
            </Button>
            
            <div className="flex items-center gap-2.5 border-l border-border/50 pl-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                RS
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-semibold leading-none text-foreground">Rahul Sharma</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Admin & Principal Advisor</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Viewport */}
        <div className="flex-1 overflow-auto bg-background p-4 md:p-8">
          {children}
        </div>
        
      </main>
    </div>
  );
}
