import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="pt-36 pb-24 min-h-[70vh] flex items-center justify-center bg-background px-4">
      <div className="max-w-md mx-auto text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-heading font-bold text-foreground">Page Not Found</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The page or property listing you are trying to reach does not exist or has been relocated.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Link href="/">
            <Button size="sm" className="gap-2">
              <Home className="w-4 h-4" /> Return to Home
            </Button>
          </Link>
          <Link href="/properties">
            <Button size="sm" variant="outline">
              Explore Properties
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
