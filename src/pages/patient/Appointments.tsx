import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function PatientAppointments() {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <header className="glass-effect sticky top-0 z-50">
        <div className="container mx-auto flex items-center gap-4 py-3 px-4">
          <Link to="/patient"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
          <h1 className="text-lg font-bold">Mes Rendez-vous</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Rendez-vous à venir</h2>
          <Button className="gap-2"><Plus className="h-4 w-4" /> Nouveau RDV</Button>
        </div>
        <Card className="border-dashed border-2">
          <CardContent className="p-12 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Aucun rendez-vous</h3>
            <p className="text-sm text-muted-foreground mb-4">Vous n'avez pas encore de rendez-vous planifié.</p>
            <Button>Prendre un rendez-vous</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
