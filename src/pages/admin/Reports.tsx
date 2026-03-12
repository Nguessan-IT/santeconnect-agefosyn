import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Plus, Download, Trash2, Calendar, Users, Building2, Activity, Clock, CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import AnimatedBackground from "@/components/AnimatedBackground";
import MobileBottomNav from "@/components/MobileBottomNav";
import { toast } from "sonner";

type Report = {
  id: string;
  title: string;
  type: string;
  period: string;
  createdAt: string;
  status: "ready" | "generating";
};

const reportTypes = [
  { value: "activity", label: "Rapport d'activité", icon: Activity, desc: "Vue d'ensemble de l'activité du centre" },
  { value: "patients", label: "Rapport patients", icon: Users, desc: "Statistiques et démographie des patients" },
  { value: "appointments", label: "Rapport rendez-vous", icon: Calendar, desc: "Analyse des rendez-vous et consultations" },
  { value: "centers", label: "Rapport centres", icon: Building2, desc: "Performance des centres médicaux" },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 22 } } };

export default function AdminReports() {
  const [open, setOpen] = useState(false);
  const [reportType, setReportType] = useState("");
  const [reportPeriod, setReportPeriod] = useState("");
  const [reports, setReports] = useState<Report[]>([]);

  const handleGenerate = () => {
    if (!reportType || !reportPeriod) {
      toast.error("Veuillez sélectionner un type et une période.");
      return;
    }

    const typeLabel = reportTypes.find(r => r.value === reportType)?.label || reportType;
    const periodLabels: Record<string, string> = {
      week: "Cette semaine",
      month: "Ce mois",
      quarter: "Ce trimestre",
      year: "Cette année",
    };

    const newReport: Report = {
      id: Date.now().toString(),
      title: typeLabel,
      type: reportType,
      period: periodLabels[reportPeriod] || reportPeriod,
      createdAt: new Date().toLocaleString("fr-FR"),
      status: "generating",
    };

    setReports([newReport, ...reports]);
    setOpen(false);
    setReportType("");
    setReportPeriod("");
    toast.info("Génération du rapport en cours...");

    setTimeout(() => {
      setReports(prev => prev.map(r => r.id === newReport.id ? { ...r, status: "ready" } : r));
      toast.success(`${typeLabel} généré avec succès !`);
    }, 3000);
  };

  const handleDownload = (report: Report) => {
    const content = `RAPPORT - ${report.title}\nPériode: ${report.period}\nGénéré le: ${report.createdAt}\n\n--- Résumé ---\nPatients actifs: 1 247\nRendez-vous: 389\nTéléconsultations: 76\nCentres actifs: 12\nTaux de satisfaction: 92%\n\n--- Détails ---\nCe rapport a été généré automatiquement par SantéConnect AGEFOSYN.`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rapport_${report.type}_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Rapport téléchargé !");
  };

  const handleDelete = (id: string) => {
    setReports(prev => prev.filter(r => r.id !== id));
    toast.info("Rapport supprimé.");
  };

  return (
    <div className="min-h-screen bg-background relative pb-16 sm:pb-0">
      <AnimatedBackground />
      <header className="glass-effect sticky top-0 z-50">
        <div className="container mx-auto flex items-center gap-3 py-3 px-4">
          <Link to="/admin"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
          <h1 className="text-lg font-bold flex-1">Rapports</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-5">
        {/* Quick generate buttons */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-sm font-semibold mb-3 text-foreground">Génération rapide</h2>
          <div className="grid grid-cols-2 gap-2.5">
            {reportTypes.map((rt) => (
              <motion.div key={rt.value} whileTap={{ scale: 0.97 }}>
                <Card
                  className="border border-border/50 hover:border-primary/30 cursor-pointer transition-all active:bg-primary/5"
                  onClick={() => {
                    setReportType(rt.value);
                    setReportPeriod("month");
                    setOpen(true);
                  }}
                >
                  <CardContent className="p-3 text-center">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                      <rt.icon className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-[11px] font-medium text-foreground leading-tight">{rt.label}</p>
                    <p className="text-[9px] text-muted-foreground mt-0.5">{rt.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Custom generate button */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full gap-2" size="lg">
              <Plus className="h-4 w-4" /> Générer un rapport personnalisé
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Nouveau rapport</DialogTitle>
              <DialogDescription>Configurez les paramètres du rapport à générer</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Type de rapport</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger><SelectValue placeholder="Choisir un type" /></SelectTrigger>
                  <SelectContent>
                    {reportTypes.map(rt => (
                      <SelectItem key={rt.value} value={rt.value}>{rt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Période</Label>
                <Select value={reportPeriod} onValueChange={setReportPeriod}>
                  <SelectTrigger><SelectValue placeholder="Choisir une période" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Cette semaine</SelectItem>
                    <SelectItem value="month">Ce mois</SelectItem>
                    <SelectItem value="quarter">Ce trimestre</SelectItem>
                    <SelectItem value="year">Cette année</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="w-full gap-2" onClick={handleGenerate}>
              <FileText className="h-4 w-4" /> Générer le rapport
            </Button>
          </DialogContent>
        </Dialog>

        {/* Reports list */}
        <div>
          <h2 className="text-sm font-semibold mb-3 text-foreground">Rapports générés</h2>
          {reports.length === 0 ? (
            <Card className="border-dashed border-2">
              <CardContent className="p-10 text-center">
                <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-semibold text-sm mb-1">Aucun rapport</h3>
                <p className="text-xs text-muted-foreground">Générez votre premier rapport ci-dessus.</p>
              </CardContent>
            </Card>
          ) : (
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-2.5">
              {reports.map((r) => {
                const typeInfo = reportTypes.find(rt => rt.value === r.type);
                const Icon = typeInfo?.icon || FileText;
                return (
                  <motion.div key={r.id} variants={item}>
                    <Card className="border border-border/50">
                      <CardContent className="p-3 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-semibold text-sm text-foreground truncate">{r.title}</h3>
                            {r.status === "generating" ? (
                              <Loader2 className="h-3.5 w-3.5 text-muted-foreground animate-spin shrink-0" />
                            ) : (
                              <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
                            )}
                          </div>
                          <p className="text-[10px] text-muted-foreground flex items-center gap-1.5">
                            <Clock className="h-3 w-3" />
                            {r.period} · {r.createdAt}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            disabled={r.status === "generating"}
                            onClick={() => handleDownload(r)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => handleDelete(r.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </main>

      <MobileBottomNav role="admin" />
    </div>
  );
}
