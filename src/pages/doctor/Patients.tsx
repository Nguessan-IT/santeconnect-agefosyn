import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, Search, Plus, Phone, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AnimatedBackground from "@/components/AnimatedBackground";
import { toast } from "sonner";

export default function DoctorPatients() {
  const [open, setOpen] = useState(false);
  const [patients, setPatients] = useState<Array<{ name: string; phone: string; email: string; gender: string; dob: string }>>([]);
  const [form, setForm] = useState({ name: "", phone: "", email: "", gender: "", dob: "" });
  const [search, setSearch] = useState("");

  const handleSubmit = () => {
    if (!form.name || !form.phone) { toast.error("Nom et téléphone sont obligatoires."); return; }
    setPatients([...patients, form]);
    setForm({ name: "", phone: "", email: "", gender: "", dob: "" });
    setOpen(false);
    toast.success("Patient ajouté !");
  };

  const filtered = patients.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

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
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher un patient..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2"><Plus className="h-4 w-4" /> Ajouter</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Ajouter un patient</DialogTitle>
                <DialogDescription>Créer un dossier patient (avec ou sans compte)</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Nom complet *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Jean Dupont" className="pl-10" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Téléphone *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="+225 XX XX XX XX" className="pl-10" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="email@exemple.com" className="pl-10" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Genre</Label>
                    <Select value={form.gender} onValueChange={(v) => setForm({ ...form, gender: v })}>
                      <SelectTrigger><SelectValue placeholder="Genre" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="homme">Homme</SelectItem>
                        <SelectItem value="femme">Femme</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Date de naissance</Label>
                    <Input type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} />
                  </div>
                </div>
              </div>
              <Button className="w-full" onClick={handleSubmit}>Ajouter le patient</Button>
            </DialogContent>
          </Dialog>
        </div>

        {filtered.length === 0 ? (
          <Card className="border-dashed border-2">
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Aucun patient</h3>
              <p className="text-sm text-muted-foreground mb-4">Vos patients apparaîtront ici.</p>
              <Button variant="outline" onClick={() => setOpen(true)} className="gap-2"><Plus className="h-4 w-4" /> Ajouter un patient</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filtered.map((p, i) => (
              <Card key={i} className="hover-glow">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm">{p.name}</h3>
                    <p className="text-xs text-muted-foreground">{p.phone} {p.gender && `· ${p.gender}`}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
