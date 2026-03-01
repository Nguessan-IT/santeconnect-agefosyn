import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Calendar, Clock, User, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AnimatedBackground from "@/components/AnimatedBackground";
import { toast } from "sonner";

export default function PatientAppointments() {
  const [open, setOpen] = useState(false);
  const [rdvs, setRdvs] = useState<Array<{ doctor: string; specialty: string; date: string; time: string; type: string; motif: string }>>([]);
  const [form, setForm] = useState({ doctor: "", specialty: "", date: "", time: "", type: "", motif: "" });

  const handleSubmit = () => {
    if (!form.specialty || !form.date || !form.time || !form.type) {
      toast.error("Veuillez remplir les champs obligatoires.");
      return;
    }
    setRdvs([...rdvs, form]);
    setForm({ doctor: "", specialty: "", date: "", time: "", type: "", motif: "" });
    setOpen(false);
    toast.success("Rendez-vous créé avec succès !");
  };

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
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2"><Plus className="h-4 w-4" /> Nouveau RDV</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] flex flex-col">
              <DialogHeader>
                <DialogTitle>Prendre un rendez-vous</DialogTitle>
                <DialogDescription>Choisissez votre spécialité et votre créneau</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4 overflow-y-auto flex-1">
                <div className="space-y-2">
                  <Label>Spécialité *</Label>
                  <Select value={form.specialty} onValueChange={(v) => setForm({ ...form, specialty: v })}>
                    <SelectTrigger><SelectValue placeholder="Choisir une spécialité" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="generaliste">Médecine générale</SelectItem>
                      <SelectItem value="cardiologue">Cardiologie</SelectItem>
                      <SelectItem value="dermatologue">Dermatologie</SelectItem>
                      <SelectItem value="pediatre">Pédiatrie</SelectItem>
                      <SelectItem value="gynecologie">Gynécologie</SelectItem>
                      <SelectItem value="ophtalmologie">Ophtalmologie</SelectItem>
                      <SelectItem value="dentiste">Dentisterie</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Médecin (optionnel)</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Nom du médecin" className="pl-10" value={form.doctor} onChange={(e) => setForm({ ...form, doctor: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Type de consultation *</Label>
                  <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                    <SelectTrigger><SelectValue placeholder="Type de consultation" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="presentiel">En présentiel</SelectItem>
                      <SelectItem value="teleconsultation">Téléconsultation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date *</Label>
                    <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Heure *</Label>
                    <Input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Motif de consultation</Label>
                  <Textarea placeholder="Décrivez brièvement votre motif..." rows={3} value={form.motif} onChange={(e) => setForm({ ...form, motif: e.target.value })} />
                </div>
              </div>
              <div className="pt-4 border-t">
                <Button className="w-full" onClick={handleSubmit}>Confirmer le rendez-vous</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {rdvs.length === 0 ? (
          <Card className="border-dashed border-2">
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Aucun rendez-vous</h3>
              <p className="text-sm text-muted-foreground mb-4">Vous n'avez pas encore de rendez-vous planifié.</p>
              <Button onClick={() => setOpen(true)}>Prendre un rendez-vous</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {rdvs.map((r, i) => (
              <Card key={i} className="hover-glow">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm capitalize">{r.specialty}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <Clock className="h-3 w-3" /> {r.date} à {r.time} · {r.type === "teleconsultation" ? "Téléconsultation" : "Présentiel"}
                    </p>
                    {r.doctor && <p className="text-xs text-muted-foreground">Dr. {r.doctor}</p>}
                  </div>
                  <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">À venir</span>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
