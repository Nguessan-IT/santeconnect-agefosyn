import { Link } from "react-router-dom";
import { ArrowLeft, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function DoctorPatients() {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <header className="glass-effect sticky top-0 z-50">
        <div className="container mx-auto flex items-center gap-4 py-3 px-4">
          <Link to="/doctor"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
          <h1 className="text-lg font-bold">Mes Patients</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher un patient..." className="pl-10" />
        </div>
        <Card className="border-dashed border-2">
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Aucun patient</h3>
            <p className="text-sm text-muted-foreground">Vos patients apparaîtront ici.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
