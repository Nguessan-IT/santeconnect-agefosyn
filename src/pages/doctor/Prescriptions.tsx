import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, FileText, Edit, Trash2, Calendar, Clock, Search, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AnimatedBackground from "@/components/AnimatedBackground";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Medicament {
  nom: string;
  dosage: string;
  frequence: string;
}

interface Prescription {
  id: string;
  patient_id: string;
  medicaments: Medicament[];
  posologie: string | null;
  duree_traitement: string | null;
  statut: string | null;
  created_at: string;
  patient?: { nom: string; prenom: string } | null;
}

interface Patient {
  id: string;
  nom: string;
  prenom: string;
}

const emptyMedicament: Medicament = { nom: "", dosage: "", frequence: "" };

export default function DoctorPrescriptions() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [medicaments, setMedicaments] = useState<Medicament[]>([{ ...emptyMedicament }]);
  const [posologie, setPosologie] = useState("");
  const [duree, setDuree] = useState("");
  const [statut, setStatut] = useState("en_attente");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const { data: profile } = await supabase
        .from("profiles_santeconnect")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!profile) { setLoading(false); return; }

      // Load prescriptions
      const { data: prescData, error } = await supabase
        .from("prescriptions_santeconnect")
        .select("id, patient_id, medicaments, posologie, duree_traitement, statut, created_at")
        .eq("medecin_id", profile.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Load patients for the form
      const { data: patientsData } = await supabase
        .from("patients_santeconnect")
        .select("id, nom, prenom")
        .order("nom");

      setPatients(patientsData || []);

      // Get patient names for prescriptions
      const patientIds = [...new Set((prescData || []).map(p => p.patient_id))];
      const { data: patientNames } = await supabase
        .from("patients_santeconnect")
        .select("id, nom, prenom")
        .in("id", patientIds);

      const patientMap = new Map((patientNames || []).map(p => [p.id, p]));

      setPrescriptions((prescData || []).map(p => ({
        ...p,
        medicaments: Array.isArray(p.medicaments) ? p.medicaments as Medicament[] : [],
        patient: patientMap.get(p.patient_id) || null,
      })));
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setSelectedPatientId("");
    setMedicaments([{ ...emptyMedicament }]);
    setPosologie("");
    setDuree("");
    setStatut("en_attente");
    setEditingId(null);
  }

  function openCreate() {
    resetForm();
    setDialogOpen(true);
  }

  function openEdit(p: Prescription) {
    setEditingId(p.id);
    setSelectedPatientId(p.patient_id);
    setMedicaments(p.medicaments.length > 0 ? [...p.medicaments] : [{ ...emptyMedicament }]);
    setPosologie(p.posologie || "");
    setDuree(p.duree_traitement || "");
    setStatut(p.statut || "en_attente");
    setDialogOpen(true);
  }

  function addMedicament() {
    setMedicaments([...medicaments, { ...emptyMedicament }]);
  }

  function removeMedicament(index: number) {
    if (medicaments.length <= 1) return;
    setMedicaments(medicaments.filter((_, i) => i !== index));
  }

  function updateMedicament(index: number, field: keyof Medicament, value: string) {
    const updated = [...medicaments];
    updated[index] = { ...updated[index], [field]: value };
    setMedicaments(updated);
  }

  async function handleSave() {
    if (!selectedPatientId) { toast.error("Sélectionnez un patient"); return; }
    if (medicaments.some(m => !m.nom.trim())) { toast.error("Renseignez le nom de chaque médicament"); return; }

    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Non connecté");

      const { data: profile } = await supabase
        .from("profiles_santeconnect")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!profile) throw new Error("Profil médecin introuvable");

      const payload = {
        patient_id: selectedPatientId,
        medecin_id: profile.id,
        medicaments: medicaments.filter(m => m.nom.trim()) as unknown as import("@/integrations/supabase/types").Json,
        posologie: posologie || null,
        duree_traitement: duree || null,
        statut,
      };

      if (editingId) {
        const { error } = await supabase
          .from("prescriptions_santeconnect")
          .update(payload)
          .eq("id", editingId);
        if (error) throw error;
        toast.success("Ordonnance mise à jour");
      } else {
        const { error } = await supabase
          .from("prescriptions_santeconnect")
          .insert(payload);
        if (error) throw error;
        toast.success("Ordonnance créée");
      }

      setDialogOpen(false);
      resetForm();
      loadData();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cette ordonnance ?")) return;
    try {
      const { error } = await supabase.from("prescriptions_santeconnect").delete().eq("id", id);
      if (error) throw error;
      toast.success("Ordonnance supprimée");
      loadData();
    } catch (err) {
      toast.error("Erreur lors de la suppression");
    }
  }

  function getStatusLabel(statut: string | null) {
    switch (statut) {
      case "en_attente": return "En attente";
      case "preparee": return "Préparée";
      case "livree": return "Livrée";
      case "annulee": return "Annulée";
      default: return statut || "En attente";
    }
  }

  function getStatusColor(statut: string | null) {
    switch (statut) {
      case "preparee": return "bg-accent/10 text-accent";
      case "livree": return "bg-primary/10 text-primary";
      case "annulee": return "bg-destructive/10 text-destructive";
      default: return "bg-muted text-muted-foreground";
    }
  }

  const filtered = prescriptions.filter(p =>
    search === "" ||
    p.medicaments.some(m => m.nom.toLowerCase().includes(search.toLowerCase())) ||
    p.patient?.nom.toLowerCase().includes(search.toLowerCase()) ||
    p.patient?.prenom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background relative pb-16 sm:pb-0">
      <AnimatedBackground />
      <header className="glass-effect sticky top-0 z-50">
        <div className="container mx-auto flex items-center gap-4 py-3 px-4">
          <Link to="/doctor"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
          <h1 className="text-lg font-bold">Ordonnances</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <Button className="gap-2 shrink-0" onClick={openCreate}>
            <Plus className="h-4 w-4" /> <span className="hidden sm:inline">Nouvelle</span>
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <Card className="border-dashed border-2">
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Aucune ordonnance</h3>
              <p className="text-sm text-muted-foreground">Vos ordonnances apparaîtront ici.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filtered.map(p => (
              <Card key={p.id} className="border border-border/50 hover:border-primary/30 transition-all">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        {p.patient && (
                          <h3 className="font-semibold text-sm truncate">{p.patient.prenom} {p.patient.nom}</h3>
                        )}
                        <p className="text-xs text-muted-foreground truncate">
                          {p.medicaments.map(m => m.nom).join(", ")}
                        </p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(p.created_at).toLocaleDateString("fr-FR")}
                          </span>
                          {p.duree_traitement && (
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {p.duree_traitement}
                            </span>
                          )}
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${getStatusColor(p.statut)}`}>
                            {getStatusLabel(p.statut)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(p)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(p.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Create/Edit dialog */}
      <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) { setDialogOpen(false); resetForm(); } else setDialogOpen(true); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{editingId ? "Modifier l'ordonnance" : "Créer une ordonnance"}</DialogTitle>
            <DialogDescription>Remplissez les informations de prescription</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 overflow-y-auto flex-1">
            <div className="space-y-2">
              <Label>Patient</Label>
              <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
                <SelectTrigger><SelectValue placeholder="Sélectionner un patient" /></SelectTrigger>
                <SelectContent>
                  {patients.map(p => (
                    <SelectItem key={p.id} value={p.id}>{p.prenom} {p.nom}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Médicaments</Label>
                <Button type="button" variant="outline" size="sm" onClick={addMedicament} className="gap-1 text-xs">
                  <Plus className="h-3 w-3" /> Ajouter
                </Button>
              </div>
              {medicaments.map((m, i) => (
                <Card key={i} className="border border-border/50">
                  <CardContent className="p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground">Médicament {i + 1}</span>
                      {medicaments.length > 1 && (
                        <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeMedicament(i)}>
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    <Input placeholder="Nom du médicament" value={m.nom} onChange={e => updateMedicament(i, "nom", e.target.value)} />
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="Dosage (ex: 500mg)" value={m.dosage} onChange={e => updateMedicament(i, "dosage", e.target.value)} />
                      <Input placeholder="Fréquence (ex: 2x/jour)" value={m.frequence} onChange={e => updateMedicament(i, "frequence", e.target.value)} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Durée du traitement</Label>
                <Input placeholder="Ex: 7 jours" value={duree} onChange={e => setDuree(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Statut</Label>
                <Select value={statut} onValueChange={setStatut}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en_attente">En attente</SelectItem>
                    <SelectItem value="preparee">Préparée</SelectItem>
                    <SelectItem value="livree">Livrée</SelectItem>
                    <SelectItem value="annulee">Annulée</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Instructions / Posologie</Label>
              <Textarea placeholder="Instructions de prise..." rows={3} value={posologie} onChange={e => setPosologie(e.target.value)} />
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button className="w-full gap-2" onClick={handleSave} disabled={saving}>
              <Save className="h-4 w-4" /> {saving ? "Enregistrement..." : editingId ? "Mettre à jour" : "Créer l'ordonnance"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
