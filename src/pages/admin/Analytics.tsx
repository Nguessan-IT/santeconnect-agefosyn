import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BarChart3, Users, Calendar, TrendingUp, Activity, RefreshCw, Download, Filter, Building2, Stethoscope, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AnimatedBackground from "@/components/AnimatedBackground";
import MobileBottomNav from "@/components/MobileBottomNav";
import { toast } from "sonner";

const kpis = [
  { label: "Patients actifs", value: "1 247", trend: "+12%", icon: Users, color: "text-primary" },
  { label: "RDV ce mois", value: "389", trend: "+8%", icon: Calendar, color: "text-accent" },
  { label: "Téléconsultations", value: "76", trend: "+23%", icon: Activity, color: "text-primary" },
  { label: "Centres actifs", value: "12", trend: "+2", icon: Building2, color: "text-accent" },
];

const weeklyData = [
  { day: "Lun", value: 45 },
  { day: "Mar", value: 62 },
  { day: "Mer", value: 38 },
  { day: "Jeu", value: 71 },
  { day: "Ven", value: 55 },
  { day: "Sam", value: 28 },
  { day: "Dim", value: 15 },
];

const topSpecialties = [
  { name: "Médecine générale", count: 156, pct: 40 },
  { name: "Cardiologie", count: 89, pct: 23 },
  { name: "Pédiatrie", count: 67, pct: 17 },
  { name: "Dermatologie", count: 45, pct: 12 },
  { name: "Autres", count: 32, pct: 8 },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 22 } } };

export default function AdminAnalytics() {
  const [period, setPeriod] = useState("month");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Données analytiques actualisées");
    }, 1500);
  };

  const handleExport = () => {
    toast.success("Export des données en cours...");
    setTimeout(() => {
      const csvContent = "Métrique,Valeur,Tendance\nPatients actifs,1247,+12%\nRDV ce mois,389,+8%\nTéléconsultations,76,+23%\nCentres actifs,12,+2";
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `analytics_${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Fichier CSV téléchargé !");
    }, 1000);
  };

  const handleGenerateAnalysis = () => {
    toast.info("Génération de l'analyse détaillée...");
    setTimeout(() => {
      toast.success("Analyse générée avec succès !");
    }, 2000);
  };

  const maxValue = Math.max(...weeklyData.map(d => d.value));

  return (
    <div className="min-h-screen bg-background relative pb-16 sm:pb-0">
      <AnimatedBackground />
      <header className="glass-effect sticky top-0 z-50">
        <div className="container mx-auto flex items-center gap-3 py-3 px-4">
          <Link to="/admin"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
          <h1 className="text-lg font-bold flex-1">Analytique</h1>
          <motion.div whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-5">
        {/* Action bar */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap gap-2 items-center">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[140px]">
              <Filter className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
              <SelectItem value="quarter">Ce trimestre</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleGenerateAnalysis} className="gap-2 flex-1 sm:flex-none">
            <BarChart3 className="h-4 w-4" /> Générer une analyse
          </Button>
          <Button variant="outline" onClick={handleExport} className="gap-2 flex-1 sm:flex-none">
            <Download className="h-4 w-4" /> Exporter CSV
          </Button>
        </motion.div>

        {/* KPI Cards */}
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 gap-2.5">
          {kpis.map((k) => (
            <motion.div key={k.label} variants={item}>
              <Card className="border border-border/50 hover:border-primary/30 transition-all">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <k.icon className={`h-4 w-4 ${k.color}`} />
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-accent/10 text-accent font-medium">{k.trend}</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">{k.value}</p>
                  <p className="text-[10px] text-muted-foreground">{k.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Chart: Weekly appointments */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Rendez-vous cette semaine
                </h3>
                <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  Total: {weeklyData.reduce((a, b) => a + b.value, 0)}
                </span>
              </div>
              <div className="flex items-end gap-2 h-32">
                {weeklyData.map((d, i) => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[9px] font-medium text-foreground">{d.value}</span>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.value / maxValue) * 100}%` }}
                      transition={{ delay: 0.3 + i * 0.05, type: "spring", stiffness: 200, damping: 20 }}
                      className="w-full rounded-t-md bg-primary/80 min-h-[4px]"
                    />
                    <span className="text-[9px] text-muted-foreground">{d.day}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top specialties */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="border border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm flex items-center gap-1.5">
                  <Stethoscope className="h-4 w-4 text-accent" />
                  Top spécialités consultées
                </h3>
              </div>
              <div className="space-y-2.5">
                {topSpecialties.map((s, i) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-foreground font-medium">{s.name}</span>
                      <span className="text-muted-foreground">{s.count} consultations</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${s.pct}%` }}
                        transition={{ delay: 0.5 + i * 0.08, duration: 0.6 }}
                        className="h-full rounded-full bg-primary/70"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Performance */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="border border-border/50">
            <CardContent className="p-4">
              <h3 className="font-semibold text-sm flex items-center gap-1.5 mb-3">
                <Clock className="h-4 w-4 text-primary" />
                Indicateurs de performance
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Temps moyen RDV", value: "3 min", sub: "Prise de rendez-vous" },
                  { label: "Satisfaction", value: "92%", sub: "Score moyen" },
                  { label: "Taux conversion", value: "68%", sub: "Sans compte → inscrit" },
                  { label: "Téléconsult. réussies", value: "94%", sub: "Taux de succès" },
                ].map((p) => (
                  <div key={p.label} className="bg-muted/50 rounded-lg p-2.5">
                    <p className="text-lg font-bold text-foreground">{p.value}</p>
                    <p className="text-[10px] font-medium text-foreground/80">{p.label}</p>
                    <p className="text-[9px] text-muted-foreground">{p.sub}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <MobileBottomNav role="admin" />
    </div>
  );
}
