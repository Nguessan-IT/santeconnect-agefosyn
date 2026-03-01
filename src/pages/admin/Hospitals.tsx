import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Building2, Plus, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AnimatedBackground from "@/components/AnimatedBackground";
import { toast } from "sonner";

export default function AdminHospitals() {
  const [open, setOpen] = useState(false);
  const [centers, setCenters] = useState<Array<{ name: string; type: string; address: string; phone: string; email: string; description: string }>>([]);
  const [form, setForm] = useState({ name: "", type: "", address: "", phone: "", email: "", description: "" });

  const handleSubmit = () => {
    if (!form.name || !form.type) {
      toast.error("Veuillez remplir les champs obligatoires.");
      return;
    }
    setCenters([...centers, form]);
    setForm({ name: "", type: "", address: "", phone: "", email: "", description: "" });
    setOpen(false);
    toast.success("Établissement ajouté avec succès !");
  };

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
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2"><Plus className="h-4 w-4" /> Ajouter</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] flex flex-col">
              <DialogHeader>
                <DialogTitle>Ajouter un établissement</DialogTitle>
                <DialogDescription>Renseignez les informations du centre médical</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4 overflow-y-auto flex-1">
                <div className="space-y-2">
                  <Label>Nom de l'établissement *</Label>
                  <Input placeholder="Hôpital Central" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Type d'établissement *</Label>
                  <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                    <SelectTrigger><SelectValue placeholder="Sélectionner un type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hopital">Hôpital</SelectItem>
                      <SelectItem value="clinique">Clinique</SelectItem>
                      <SelectItem value="cabinet">Cabinet médical</SelectItem>
                      <SelectItem value="centre_sante">Centre de santé</SelectItem>
                      <SelectItem value="laboratoire">Laboratoire</SelectItem>
                      <SelectItem value="pharmacie">Pharmacie</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Adresse</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Abidjan, Cocody" className="pl-10" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Téléphone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="+225 XX XX XX XX" className="pl-10" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="contact@hopital.ci" className="pl-10" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Description de l'établissement..." rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
              </div>
              <div className="pt-4 border-t">
                <Button className="w-full" onClick={handleSubmit}>Ajouter l'établissement</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {centers.length === 0 ? (
          <Card className="border-dashed border-2">
            <CardContent className="p-12 text-center">
              <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Aucun centre</h3>
              <p className="text-sm text-muted-foreground mb-4">Les centres médicaux apparaîtront ici.</p>
              <Button variant="outline" onClick={() => setOpen(true)} className="gap-2"><Plus className="h-4 w-4" /> Ajouter un établissement</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {centers.map((c, i) => (
              <Card key={i} className="hover-glow">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm truncate">{c.name}</h3>
                      <p className="text-xs text-muted-foreground capitalize">{c.type.replace("_", " ")}</p>
                      {c.address && <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><MapPin className="h-3 w-3" />{c.address}</p>}
                    </div>
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
