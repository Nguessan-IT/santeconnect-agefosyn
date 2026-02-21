import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminReports() {
  return (
    <div className="min-h-screen bg-background">
      <header className="glass-effect sticky top-0 z-50">
        <div className="container mx-auto flex items-center gap-4 py-3 px-4">
          <Link to="/admin"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
          <h1 className="text-lg font-bold">Rapports</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Card className="border-dashed border-2">
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Rapports d'activité</h3>
            <p className="text-sm text-muted-foreground">Les rapports générés apparaîtront ici.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
