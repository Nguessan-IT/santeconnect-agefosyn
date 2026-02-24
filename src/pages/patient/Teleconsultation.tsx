import { Link } from "react-router-dom";
import { ArrowLeft, Video, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function PatientTeleconsultation() {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <header className="glass-effect sticky top-0 z-50">
        <div className="container mx-auto flex items-center gap-4 py-3 px-4">
          <Link to="/patient"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
          <h1 className="text-lg font-bold">Téléconsultation</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Card className="border-dashed border-2">
          <CardContent className="p-12 text-center">
            <Video className="h-16 w-16 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Consultation vidéo</h3>
            <p className="text-muted-foreground mb-6">Consultez votre médecin à distance via une vidéoconférence sécurisée.</p>
            <Button size="lg" className="gap-2"><Phone className="h-4 w-4" /> Démarrer une consultation</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
