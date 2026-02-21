import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
        <p className="text-muted-foreground mb-6">Page introuvable</p>
        <Link to="/">
          <Button className="gap-2"><Home className="h-4 w-4" /> Retour à l'accueil</Button>
        </Link>
      </div>
    </div>
  );
}
