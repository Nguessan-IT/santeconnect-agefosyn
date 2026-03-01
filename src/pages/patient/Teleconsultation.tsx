import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Video, Phone, Mic, MicOff, VideoOff, PhoneOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AnimatedBackground from "@/components/AnimatedBackground";
import { toast } from "sonner";

export default function PatientTeleconsultation() {
  const [open, setOpen] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  const handleStartConsultation = () => {
    setOpen(false);
    setInCall(true);
    toast.success("Connexion à la téléconsultation...");
  };

  const handleEndCall = () => {
    setInCall(false);
    toast.info("Téléconsultation terminée.");
  };

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
        {inCall ? (
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-muted aspect-video flex items-center justify-center relative">
                <div className="text-center">
                  <Video className="h-16 w-16 text-muted-foreground mx-auto mb-4 animate-pulse" />
                  <p className="text-muted-foreground">En attente du médecin...</p>
                </div>
                {/* Mini self-view */}
                <div className="absolute bottom-4 right-4 w-32 h-24 bg-muted-foreground/20 rounded-lg flex items-center justify-center border-2 border-background">
                  <Video className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>
              <div className="p-4 flex items-center justify-center gap-4">
                <Button variant={micOn ? "outline" : "destructive"} size="icon" className="rounded-full h-12 w-12" onClick={() => setMicOn(!micOn)}>
                  {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                </Button>
                <Button variant={camOn ? "outline" : "destructive"} size="icon" className="rounded-full h-12 w-12" onClick={() => setCamOn(!camOn)}>
                  {camOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </Button>
                <Button variant="destructive" size="icon" className="rounded-full h-12 w-12" onClick={handleEndCall}>
                  <PhoneOff className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-dashed border-2">
            <CardContent className="p-12 text-center">
              <Video className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Consultation vidéo</h3>
              <p className="text-muted-foreground mb-6">Consultez votre médecin à distance via une vidéoconférence sécurisée.</p>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="gap-2"><Phone className="h-4 w-4" /> Démarrer une consultation</Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Nouvelle téléconsultation</DialogTitle>
                    <DialogDescription>Configurez votre consultation vidéo</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Spécialité</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Choisir une spécialité" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="generaliste">Médecine générale</SelectItem>
                          <SelectItem value="cardiologue">Cardiologie</SelectItem>
                          <SelectItem value="dermatologue">Dermatologie</SelectItem>
                          <SelectItem value="pediatre">Pédiatrie</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Motif (optionnel)</Label>
                      <Input placeholder="Décrivez brièvement votre motif" />
                    </div>
                    <div className="p-3 bg-primary/5 rounded-lg text-sm text-muted-foreground">
                      <p>📷 Assurez-vous que votre caméra et micro fonctionnent.</p>
                      <p className="mt-1">🔒 La consultation est chiffrée de bout en bout.</p>
                    </div>
                  </div>
                  <Button className="w-full gap-2" onClick={handleStartConsultation}>
                    <Video className="h-4 w-4" /> Rejoindre la consultation
                  </Button>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
