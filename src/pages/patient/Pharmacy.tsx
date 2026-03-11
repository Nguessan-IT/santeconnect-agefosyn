import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Pill, Search, Download, Eye, FileText, Calendar, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AnimatedBackground from "@/components/AnimatedBackground";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Prescription {
  id: string;
  medicaments: { nom: string; dosage?: string; frequence?: string }[];
  posologie: string | null;
  duree_traitement: string | null;
  document_url: string | null;
  statut: string | null;
  created_at: string;
  medecin: { nom: string | null; prenom: string | null } | null;
}

export default function PatientPharmacy() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);

  useEffect(() => {
    loadPrescriptions();
  }, []);

  async function loadPrescriptions() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const { data: patient } = await supabase
        .from("patients_santeconnect")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!patient) { setLoading(false); return; }

      const { data, error } = await supabase
        .from("prescriptions_santeconnect")
        .select("id, medicaments, posologie, duree_traitement, document_url, statut, created_at, medecin_id")
        .eq("patient_id", patient.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Fetch medecin names
      const medecinIds = [...new Set((data || []).map(p => p.medecin_id))];
      const { data: medecins } = await supabase
        .from("profiles_santeconnect")
        .select("id, nom, prenom")
        .in("id", medecinIds);

      const medecinMap = new Map((medecins || []).map(m => [m.id, m]));

      setPrescriptions((data || []).map(p => ({
        ...p,
        medicaments: Array.isArray(p.medicaments) ? p.medicaments as Prescription["medicaments"] : [],
        medecin: medecinMap.get(p.medecin_id) || null,
      })));
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors du chargement des ordonnances");
    } finally {
      setLoading(false);
    }
  }

  function handleDownload(prescription: Prescription) {
    if (prescription.document_url) {
      window.open(prescription.document_url, "_blank");
    } else {
      // Generate a simple text version
      const content = generatePrescriptionText(prescription);
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ordonnance-${new Date(prescription.created_at).toLocaleDateString("fr-FR").replace(/\//g, "-")}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Ordonnance téléchargée");
    }
  }

  function generatePrescriptionText(p: Prescription) {
    let text = `=== ORDONNANCE ===\n`;
    text += `Date: ${new Date(p.created_at).toLocaleDateString("fr-FR")}\n`;
    if (p.medecin) text += `Médecin: Dr. ${p.medecin.prenom || ""} ${p.medecin.nom || ""}\n`;
    text += `Statut: ${getStatusLabel(p.statut)}\n\n`;
    text += `--- Médicaments ---\n`;
    p.medicaments.forEach((m, i) => {
      text += `${i + 1}. ${m.nom}`;
      if (m.dosage) text += ` - ${m.dosage}`;
      if (m.frequence) text += ` - ${m.frequence}`;
      text += "\n";
    });
    if (p.posologie) text += `\nPosologie: ${p.posologie}\n`;
    if (p.duree_traitement) text += `Durée: ${p.duree_traitement}\n`;
    return text;
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
    p.medecin?.nom?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background relative pb-16 sm:pb-0">
      <AnimatedBackground />
      <header className="glass-effect sticky top-0 z-50">
        <div className="container mx-auto flex items-center gap-4 py-3 px-4">
          <Link to="/patient"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
          <h1 className="text-lg font-bold">Pharmacie & Ordonnances</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un médicament ou médecin..."
            className="pl-10"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <Card className="border-dashed border-2">
            <CardContent className="p-12 text-center">
              <Pill className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Aucune ordonnance</h3>
              <p className="text-sm text-muted-foreground">Vos ordonnances et commandes de médicaments apparaîtront ici.</p>
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
                        <h3 className="font-semibold text-sm truncate">
                          {p.medicaments.map(m => m.nom).join(", ") || "Ordonnance"}
                        </h3>
                        {p.medecin && (
                          <p className="text-xs text-muted-foreground">Dr. {p.medecin.prenom || ""} {p.medecin.nom || ""}</p>
                        )}
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
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedPrescription(p)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDownload(p)}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Prescription detail dialog */}
      <Dialog open={!!selectedPrescription} onOpenChange={() => setSelectedPrescription(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Détail de l'ordonnance</DialogTitle>
          </DialogHeader>
          {selectedPrescription && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedPrescription.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                  {selectedPrescription.medecin && (
                    <p className="text-sm font-medium">Dr. {selectedPrescription.medecin.prenom} {selectedPrescription.medecin.nom}</p>
                  )}
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(selectedPrescription.statut)}`}>
                  {getStatusLabel(selectedPrescription.statut)}
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Médicaments prescrits</h4>
                {selectedPrescription.medicaments.map((m, i) => (
                  <Card key={i} className="border border-border/50">
                    <CardContent className="p-3">
                      <p className="font-medium text-sm">{m.nom}</p>
                      {m.dosage && <p className="text-xs text-muted-foreground">Dosage: {m.dosage}</p>}
                      {m.frequence && <p className="text-xs text-muted-foreground">Fréquence: {m.frequence}</p>}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {selectedPrescription.posologie && (
                <div>
                  <h4 className="font-semibold text-sm mb-1">Posologie</h4>
                  <p className="text-sm text-muted-foreground">{selectedPrescription.posologie}</p>
                </div>
              )}

              {selectedPrescription.duree_traitement && (
                <div>
                  <h4 className="font-semibold text-sm mb-1">Durée du traitement</h4>
                  <p className="text-sm text-muted-foreground">{selectedPrescription.duree_traitement}</p>
                </div>
              )}

              <Button className="w-full gap-2" onClick={() => handleDownload(selectedPrescription)}>
                <Download className="h-4 w-4" /> Télécharger l'ordonnance
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
