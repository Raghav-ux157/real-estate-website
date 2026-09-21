"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Smartphone, Tablet, Monitor, RotateCw, ExternalLink, RefreshCw, 
  ArrowLeft, Check, Sparkles, SlidersHorizontal, Eye, Maximize2,
  ChevronRight, Compass, ShieldCheck, Info
} from "lucide-react";
import { Button } from "@/components/ui/button";

type DeviceMode = "phone" | "tablet" | "desktop" | "responsive";

interface DevicePreset {
  id: string;
  name: string;
  width: number;
  height: number;
  type: DeviceMode;
  notes: string;
}

const PRESETS: Record<DeviceMode, DevicePreset[]> = {
  phone: [
    { id: "iphone-15", name: "iPhone 15 / 16", width: 393, height: 852, type: "phone", notes: "Standard Mobile (393px)" },
    { id: "pixel-8", name: "Pixel / Android", width: 412, height: 915, type: "phone", notes: "Modern Android (412px)" },
    { id: "iphone-se", name: "Compact Phone", width: 375, height: 667, type: "phone", notes: "Compact Screen (375px)" },
    { id: "iphone-max", name: "iPhone Pro Max", width: 430, height: 932, type: "phone", notes: "Large Screen (430px)" },
  ],
  tablet: [
    { id: "ipad-air", name: "iPad Air / 11\"", width: 820, height: 1180, type: "tablet", notes: "Modern Tablet (820px)" },
    { id: "ipad-mini", name: "Standard Tablet", width: 768, height: 1024, type: "tablet", notes: "Base md Breakpoint (768px)" },
    { id: "ipad-pro", name: "iPad Pro 12.9\"", width: 1024, height: 1366, type: "tablet", notes: "Large Tablet / lg (1024px)" },
  ],
  desktop: [
    { id: "macbook", name: "Desktop Widescreen", width: 1440, height: 900, type: "desktop", notes: "Standard Desktop (1440px)" },
    { id: "laptop", name: "Compact Laptop", width: 1280, height: 800, type: "desktop", notes: "Laptop Display (1280px)" },
    { id: "ultrawide", name: "Full HD Monitor", width: 1680, height: 1000, type: "desktop", notes: "Full 1080p Viewport" },
  ],
  responsive: [
    { id: "fluid", name: "Fluid Responsive", width: 0, height: 0, type: "responsive", notes: "Adapts to browser width" }
  ]
};

const ROUTES = [
  { label: "Homepage", path: "/" },
  { label: "Properties Catalog", path: "/properties" },
  { label: "Luxury Villa (Detail)", path: "/properties/prop-1" },
  { label: "Skyline Penthouse (Detail)", path: "/properties/prop-2" },
  { label: "Sell / Rent Valuation", path: "/sell" },
  { label: "About EstateModern", path: "/about" },
  { label: "Contact Advisors", path: "/contact" },
  { label: "Admin CRM Portal", path: "/admin" },
];

export default function DevicePreviewPage() {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>("phone");
  const [selectedPresetId, setSelectedPresetId] = useState<string>("iphone-15");
  const [isLandscape, setIsLandscape] = useState(false);
  const [zoom, setZoom] = useState<"fit" | number>("fit");
  const [currentPath, setCurrentPath] = useState("/");
  const [showFrame, setShowFrame] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const [basePath, setBasePath] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [fitScale, setFitScale] = useState(1);

  // Detect base path on GitHub Pages
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.pathname.startsWith("/real-estate-website")) {
        setBasePath("/real-estate-website");
      }
    }
  }, []);

  const currentPresets = PRESETS[deviceMode];
  const activePreset = currentPresets.find(p => p.id === selectedPresetId) || currentPresets[0];

  // Calculate target dimensions
  let targetWidth = activePreset.width;
  let targetHeight = activePreset.height;

  if (deviceMode !== "responsive" && isLandscape) {
    const temp = targetWidth;
    targetWidth = targetHeight;
    targetHeight = temp;
  }

  // Auto-fit scale computation
  useEffect(() => {
    function updateFitScale() {
      if (!containerRef.current || deviceMode === "responsive") {
        setFitScale(1);
        return;
      }
      const rect = containerRef.current.getBoundingClientRect();
      const availableW = rect.width - 64;
      const availableH = rect.height - 64;

      const frameExtraW = showFrame ? (deviceMode === "phone" ? 28 : deviceMode === "tablet" ? 32 : 16) : 0;
      const frameExtraH = showFrame ? (deviceMode === "phone" ? 56 : deviceMode === "tablet" ? 48 : 44) : 0;

      const totalW = targetWidth + frameExtraW;
      const totalH = targetHeight + frameExtraH;

      const scaleX = availableW / totalW;
      const scaleY = availableH / totalH;
      const optimal = Math.min(scaleX, scaleY, 1);
      setFitScale(Math.max(0.25, Math.round(optimal * 100) / 100));
    }

    updateFitScale();
    window.addEventListener("resize", updateFitScale);
    return () => window.removeEventListener("resize", updateFitScale);
  }, [targetWidth, targetHeight, deviceMode, showFrame]);

  const activeScale = zoom === "fit" ? fitScale : zoom;

  // Compute active breakpoint string
  const activeWidth = isLandscape && deviceMode !== "responsive" ? activePreset.height : activePreset.width;
  let breakpointTag = "Mobile (<640px)";
  let activeFormatDescription = "Mobile Layout: Touch CTA bar pinned, slide-over drawer, single-column specs";
  if (deviceMode === "responsive") {
    breakpointTag = "Fluid 100%";
    activeFormatDescription = "Full browser width responsive layout";
  } else if (activeWidth >= 1280) {
    breakpointTag = "Desktop (xl: ≥1280px)";
    activeFormatDescription = "Computer Layout: Multi-column bento, 4-col filters, expanded header";
  } else if (activeWidth >= 1024) {
    breakpointTag = "Desktop (lg: ≥1024px)";
    activeFormatDescription = "Computer Layout: Full navigation bar, 2-col property details";
  } else if (activeWidth >= 768) {
    breakpointTag = "Tablet (md: 768px–1023px)";
    activeFormatDescription = "Tablet Layout: 2-column cards, top bar navigation, comfortable touch";
  } else if (activeWidth >= 640) {
    breakpointTag = "Phablet (sm: 640px–767px)";
    activeFormatDescription = "Large Mobile: Expanded search, 2-col grids, responsive spacing";
  }

  // Construct iframe URL
  const normalizedPath = currentPath.startsWith("/") ? currentPath : `/${currentPath}`;
  const fullIframeSrc = `${basePath}${normalizedPath}`;

  const handleDeviceChange = (mode: DeviceMode) => {
    setDeviceMode(mode);
    const presets = PRESETS[mode];
    if (presets.length > 0) {
      setSelectedPresetId(presets[0].id);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#0d1117] text-slate-100 overflow-hidden font-sans select-none">
      
      {/* Top Convertible Navigation Toolbar */}
      <header className="h-16 bg-[#161b22] border-b border-border/40 px-4 flex items-center justify-between gap-4 z-40 shrink-0">
        
        {/* Left: Brand & Return */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group mr-2">
            <Button variant="ghost" size="sm" className="h-8 px-2.5 text-xs text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              Exit Preview
            </Button>
          </Link>
          <div className="h-4 w-px bg-border/60"></div>
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-sm tracking-tight hidden sm:inline">
              Estate<span className="text-primary">Modern</span>
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Convertible Device Switcher
            </span>
          </div>
        </div>

        {/* Center: Device Format Switcher Tabs */}
        <div className="flex items-center bg-[#0d1117] p-1 rounded-xl border border-border/40 shadow-inner">
          <button
            onClick={() => handleDeviceChange("phone")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              deviceMode === "phone"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Phone</span>
          </button>

          <button
            onClick={() => handleDeviceChange("tablet")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              deviceMode === "tablet"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet</span>
          </button>

          <button
            onClick={() => handleDeviceChange("desktop")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              deviceMode === "desktop"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Computer</span>
          </button>

          <button
            onClick={() => handleDeviceChange("responsive")}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              deviceMode === "responsive"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Fluid</span>
          </button>
        </div>

        {/* Right: Quick Route Selector & Full-Page Launcher */}
        <div className="flex items-center gap-2">
          {/* Preset model dropdown */}
          {deviceMode !== "responsive" && (
            <select
              value={selectedPresetId}
              onChange={(e) => setSelectedPresetId(e.target.value)}
              className="bg-[#0d1117] border border-border/50 text-xs rounded-lg px-2.5 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer hidden lg:block"
            >
              {currentPresets.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.name} ({preset.width}×{preset.height})
                </option>
              ))}
            </select>
          )}

          {/* Orientation Rotate */}
          {deviceMode !== "responsive" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLandscape(!isLandscape)}
              title="Rotate Orientation (Portrait / Landscape)"
              className={`h-8 px-2.5 text-xs border-border/50 ${isLandscape ? "bg-primary/20 text-primary border-primary/40" : ""}`}
            >
              <RotateCw className="w-3.5 h-3.5 mr-1" />
              <span className="hidden sm:inline">{isLandscape ? "Landscape" : "Portrait"}</span>
            </Button>
          )}

          {/* Open live in full tab */}
          <a
            href={fullIframeSrc}
            target="_blank"
            rel="noopener noreferrer"
            title="Open active page in regular browser window"
          >
            <Button variant="outline" size="sm" className="h-8 px-2.5 text-xs border-border/50">
              <ExternalLink className="w-3.5 h-3.5 sm:mr-1" />
              <span className="hidden sm:inline">Open Live</span>
            </Button>
          </a>
        </div>
      </header>

      {/* Secondary Sub-Bar: Page Navigator & Specs HUD */}
      <div className="h-11 bg-[#12161f] border-b border-border/30 px-4 flex items-center justify-between text-xs gap-3 shrink-0">
        
        {/* Page Selector Tabs / Pill */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <span className="text-muted-foreground font-medium mr-1 hidden sm:inline">Preview Page:</span>
          {ROUTES.map((route) => (
            <button
              key={route.path}
              onClick={() => setCurrentPath(route.path)}
              className={`px-2.5 py-1 rounded-md text-[11px] whitespace-nowrap transition-colors ${
                currentPath === route.path
                  ? "bg-secondary text-primary font-semibold border border-primary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
              }`}
            >
              {route.label}
            </button>
          ))}
        </div>

        {/* Right: Zoom controls & Frame Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {deviceMode !== "responsive" && (
            <div className="flex items-center gap-1 bg-[#0d1117] px-1.5 py-0.5 rounded-md border border-border/40 text-[11px]">
              <span className="text-muted-foreground mr-1 hidden md:inline">Scale:</span>
              <button 
                onClick={() => setZoom("fit")} 
                className={`px-1.5 py-0.5 rounded ${zoom === "fit" ? "bg-primary/20 text-primary font-bold" : "text-muted-foreground"}`}
              >
                Fit ({Math.round(fitScale * 100)}%)
              </button>
              <button 
                onClick={() => setZoom(1)} 
                className={`px-1.5 py-0.5 rounded ${zoom === 1 ? "bg-primary/20 text-primary font-bold" : "text-muted-foreground"}`}
              >
                100%
              </button>
              <button 
                onClick={() => setZoom(0.75)} 
                className={`px-1.5 py-0.5 rounded ${zoom === 0.75 ? "bg-primary/20 text-primary font-bold" : "text-muted-foreground"}`}
              >
                75%
              </button>
            </div>
          )}

          {/* Toggle Device Frame */}
          {deviceMode !== "responsive" && (
            <button
              onClick={() => setShowFrame(!showFrame)}
              className={`text-[11px] px-2 py-1 rounded border transition-colors hidden sm:flex items-center gap-1 ${
                showFrame 
                  ? "border-primary/40 bg-primary/10 text-primary" 
                  : "border-border/40 text-muted-foreground"
              }`}
            >
              <Eye className="w-3 h-3" />
              Hardware Bezel
            </button>
          )}

          {/* Reload Iframe */}
          <button
            onClick={() => setIframeKey(k => k + 1)}
            title="Reload Frame"
            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-secondary/40"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Canvas Viewport Area */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto flex items-center justify-center p-6 bg-radial from-[#131922] to-[#0a0d12] relative"
      >
        
        {/* Device Frame Rendering */}
        {deviceMode === "responsive" ? (
          // Full responsive iframe without frame constraints
          <div className="w-full h-full bg-background rounded-xl border border-border shadow-2xl overflow-hidden">
            <iframe
              key={iframeKey}
              src={fullIframeSrc}
              className="w-full h-full border-0 bg-background"
              title="Responsive Website Preview"
            />
          </div>
        ) : (
          // Scaled Device Mockup
          <div
            style={{
              transform: `scale(${activeScale})`,
              transformOrigin: "center center",
              transition: "transform 0.2s ease, width 0.3s ease, height 0.3s ease",
            }}
            className="shrink-0 flex items-center justify-center"
          >
            {deviceMode === "phone" && (
              // PHONE FRAME (Titanium rounded edges, Dynamic Island, Home bar)
              <div 
                className={`bg-[#0f141c] transition-all relative ${
                  showFrame 
                    ? "rounded-[52px] p-3 border-[10px] border-[#222834] shadow-[0_25px_60px_rgba(0,0,0,0.85)] ring-1 ring-white/10" 
                    : "rounded-xl border border-border shadow-2xl"
                }`}
                style={{
                  width: showFrame ? targetWidth + 24 : targetWidth,
                  height: showFrame ? targetHeight + 24 : targetHeight,
                }}
              >
                {/* Dynamic Island on Phone */}
                {showFrame && !isLandscape && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-30 flex items-center justify-between px-2.5 shadow-md">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-white/10"></div>
                    <div className="w-2 h-2 rounded-full bg-[#0a192f]/60"></div>
                  </div>
                )}

                {/* Main Screen */}
                <div 
                  className={`w-full h-full overflow-hidden bg-background relative ${
                    showFrame ? "rounded-[40px]" : "rounded-lg"
                  }`}
                  style={{ width: targetWidth, height: targetHeight }}
                >
                  <iframe
                    key={iframeKey}
                    src={fullIframeSrc}
                    className="w-full h-full border-0 bg-background"
                    title="Phone Viewport Preview"
                  />
                </div>

                {/* Home Indicator Bar */}
                {showFrame && !isLandscape && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-30 pointer-events-none"></div>
                )}
              </div>
            )}

            {deviceMode === "tablet" && (
              // TABLET FRAME (Sleek tablet bezels, camera dot)
              <div 
                className={`bg-[#0f141c] transition-all relative ${
                  showFrame 
                    ? "rounded-[34px] p-3.5 border-[12px] border-[#252c38] shadow-[0_25px_60px_rgba(0,0,0,0.85)] ring-1 ring-white/10" 
                    : "rounded-xl border border-border shadow-2xl"
                }`}
                style={{
                  width: showFrame ? targetWidth + 28 : targetWidth,
                  height: showFrame ? targetHeight + 28 : targetHeight,
                }}
              >
                {/* Tablet Camera Dot */}
                {showFrame && (
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black/80 z-30"></div>
                )}

                {/* Screen */}
                <div 
                  className={`w-full h-full overflow-hidden bg-background ${
                    showFrame ? "rounded-[22px]" : "rounded-lg"
                  }`}
                  style={{ width: targetWidth, height: targetHeight }}
                >
                  <iframe
                    key={iframeKey}
                    src={fullIframeSrc}
                    className="w-full h-full border-0 bg-background"
                    title="Tablet Viewport Preview"
                  />
                </div>
              </div>
            )}

            {deviceMode === "desktop" && (
              // COMPUTER / DESKTOP FRAME (Browser window chrome with traffic dots)
              <div 
                className={`bg-[#1c212b] transition-all ${
                  showFrame 
                    ? "rounded-2xl border border-border/80 shadow-[0_30px_70px_rgba(0,0,0,0.8)] overflow-hidden" 
                    : "rounded-lg border border-border shadow-2xl"
                }`}
                style={{
                  width: targetWidth,
                  height: showFrame ? targetHeight + 42 : targetHeight,
                }}
              >
                {/* Browser Titlebar */}
                {showFrame && (
                  <div className="h-10 bg-[#161b22] px-4 flex items-center justify-between border-b border-border/50 select-none">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
                    </div>

                    <div className="flex-1 max-w-sm mx-4 bg-[#0d1117] rounded-md px-3 py-1 text-[11px] text-muted-foreground flex items-center gap-1.5 border border-border/40 font-mono truncate">
                      <span className="text-emerald-400">https://</span>
                      <span>estatemodern.com{currentPath}</span>
                    </div>

                    <div className="w-12"></div>
                  </div>
                )}

                {/* Desktop Screen */}
                <div 
                  className="w-full bg-background overflow-hidden"
                  style={{ width: targetWidth, height: targetHeight }}
                >
                  <iframe
                    key={iframeKey}
                    src={fullIframeSrc}
                    className="w-full h-full border-0 bg-background"
                    title="Computer Desktop Preview"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Live Metrics & Conversion HUD */}
      <footer className="h-9 bg-[#161b22] border-t border-border/40 px-4 flex items-center justify-between text-[11px] text-muted-foreground z-40 shrink-0">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-foreground font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {activePreset.name}:
          </span>
          <span className="font-mono text-primary font-semibold">
            {targetWidth}px × {targetHeight}px
          </span>
          <span className="hidden md:inline text-border">|</span>
          <span className="hidden md:inline px-2 py-0.5 rounded bg-secondary/80 text-foreground font-medium">
            {breakpointTag}
          </span>
          <span className="hidden lg:inline text-muted-foreground truncate max-w-md">
            {activeFormatDescription}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">Format:</span>
          <span className="font-semibold text-foreground uppercase tracking-wider">
            {deviceMode} {isLandscape ? "(Landscape)" : ""}
          </span>
        </div>
      </footer>

    </div>
  );
}
