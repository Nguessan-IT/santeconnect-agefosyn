import { Link } from "react-router-dom";
import { ArrowLeft, Building2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function AdminHospitals() {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <header className="glass-effect sticky top-0 z-50">
        <div className="container mx-auto flex items-center gap-4 py-3 px-4">
          <Link to="/admin"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
          <h1 className="text-lg font-bold">Centres Médicaux</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Établissements</h2>
          <Button className="gap-2"><Plus className="h-4 w-4" /> Ajouter</Button>
        </div>
        <Card className="border-dashed border-2">
          <CardContent className="p-12 text-center">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Aucun centre</h3>
            <p className="text-sm text-muted-foreground">Les centres médicaux apparaîtront ici.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
