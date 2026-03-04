import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, BarChart3, FileText, Users, Bell, LogOut, Shield, TrendingUp, Activity, Server, ChevronRight, Zap, Eye, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useState, useEffect } from "react";

const stats = [
  { label: "Centres actifs", value: 3, icon: Building2, trend: "+1 ce mois", color: "text-primary" },
  { label: "Utilisateurs", value: 156, icon: Users, trend: "+23%", color: "text-accent" },
  { label: "RDV ce mois", value: 423, icon: BarChart3, trend: "+18%", color: "text-primary" },
  { label: "Uptime", value: 99, icon: Server, trend: "stable", color: "text-accent", suffix: "%" },
];

const menuItems = [
  { icon: Building2, title: "Centres médicaux", desc: "Gérer les établissements de santé", link: "/admin/hospitals", badge: "3 actifs" },
  { icon: BarChart3, title: "Analytique", desc: "Statistiques et indicateurs clés", link: "/admin/analytics", badge: "Temps réel" },
  { icon: FileText, title: "Rapports", desc: "Rapports d'activité et audits", link: "/admin/reports", badge: "2 nouveaux" },
];

const recentActivity = [
  { action: "Nouveau médecin inscrit", time: "Il y a 5 min", type: "user" },
  { action: "Rapport mensuel généré", time: "Il y a 1h", type: "report" },
  { action: "Centre Abidjan Nord activé", time: "Il y a 3h", type: "center" },
  { action: "Mise à jour sécurité", time: "Il y a 6h", type: "system" },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 20, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 260, damping: 22 } } };

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.max(1, Math.floor(1200 / value));
    const timer = setInterval(() => { start += 1; setCount(start); if (start >= value) clearInterval(timer); }, step);
    return () => clearInterval(timer);
  }, [value]);
  return <>{count}{suffix}</>;
}

export default function AdminDashboard() {
  const now = new Date();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnimatedBackground />

      <header className="glass-effect sticky top-0 z-50 border-b border-border/30">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 6 }}
              className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center"
            >
              <Shield className="h-4 w-4 text-primary-foreground" />
            </motion.div>
            <h1 className="text-lg font-bold gradient-text">Administration</h1>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-destructive" />
            </Button>
            <Link to="/"><Button variant="ghost" size="icon"><LogOut className="h-5 w-5" /></Button></Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 relative z-10 space-y-6">
        {/* Admin Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring" }}>
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[hsl(var(--primary))] via-[hsl(var(--medical-600))] to-[hsl(var(--medical-700))] p-5 sm:p-6">
            {/* Animated grid pattern */}
            <motion.div
              animate={{ opacity: [0.03, 0.08, 0.03] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0"
              style={{
                backgroundImage: "linear-gradient(hsl(0 0% 100% / 0.05) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100% / 0.05) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />

            {/* Scanning line */}
            <motion.div
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-foreground/30 to-transparent"
            />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                <motion.div whileHover={{ scale: 1.05 }} className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-card/20 backdrop-blur-sm flex items-center justify-center border border-primary-foreground/20 shadow-lg">
                  <Eye className="h-7 w-7 sm:h-8 sm:w-8 text-primary-foreground" />
                </motion.div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-primary-foreground">Centre de contrôle</h2>
                  <p className="text-primary-foreground/60 text-xs sm:text-sm">
                    {now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="hidden sm:flex h-10 w-10 rounded-full border-2 border-primary-foreground/20 border-t-primary-foreground/60 items-center justify-center"
              >
                <Activity className="h-4 w-4 text-primary-foreground/60" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((s) => (
            <motion.div key={s.label} variants={item}>
              <motion.div whileHover={{ y: -4, scale: 1.03 }}>
                <Card className="shine-effect group border border-border/50 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <motion.div whileHover={{ rotate: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                      <s.icon className={`h-6 w-6 sm:h-7 sm:w-7 mx-auto mb-1.5 ${s.color} group-hover:scale-110 transition-transform`} />
                    </motion.div>
                    <p className="text-xl sm:text-2xl font-bold text-foreground">
                      <AnimatedCounter value={s.value} suffix={s.suffix || ""} />
                    </p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">{s.label}</p>
                    <div className="flex items-center justify-center gap-0.5 mt-1">
                      <ArrowUpRight className="h-2.5 w-2.5 text-accent" />
                      <span className="text-[9px] sm:text-[10px] text-accent font-medium">{s.trend}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Activity Feed */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="border border-border/50 overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border/30">
                <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" /> Activité récente
                </h3>
                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="flex items-center gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="text-[10px] text-accent font-medium">LIVE</span>
                </motion.div>
              </div>
              {recentActivity.map((a, i) => (
                <motion.div
                  key={a.action}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="flex items-center justify-between p-3 sm:p-4 border-b border-border/20 last:border-0 hover:bg-primary/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                      a.type === "user" ? "bg-primary/10 text-primary" :
                      a.type === "report" ? "bg-accent/10 text-accent" :
                      a.type === "center" ? "bg-medical-100 text-medical-600" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {a.type === "user" ? <Users className="h-3.5 w-3.5" /> :
                       a.type === "report" ? <FileText className="h-3.5 w-3.5" /> :
                       a.type === "center" ? <Building2 className="h-3.5 w-3.5" /> :
                       <Shield className="h-3.5 w-3.5" />}
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-foreground">{a.action}</p>
                      <p className="text-[10px] sm:text-[11px] text-muted-foreground">{a.time}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Action cards */}
        <motion.div variants={container} initial="hidden" animate="show" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {menuItems.map((m) => (
            <motion.div key={m.title} variants={item}>
              <Link to={m.link}>
                <motion.div whileHover={{ y: -6, scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <Card className="hover-card cursor-pointer h-full group shine-effect overflow-hidden border border-border/50 hover:border-primary/30">
                    <CardContent className="p-5 sm:p-6 flex items-start gap-4">
                      <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors border border-primary/20"
                      >
                        <m.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">{m.title}</h3>
                          <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium shrink-0">{m.badge}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground">{m.desc}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* System status */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <Card className="glass-effect border border-border/30">
            <CardContent className="p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="h-2.5 w-2.5 rounded-full bg-accent" />
                <span className="text-xs text-muted-foreground">Tous les systèmes opérationnels</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] sm:text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-accent" /> API: 45ms</span>
                <span className="flex items-center gap-1"><Server className="h-3 w-3 text-primary" /> DB: OK</span>
                <span className="flex items-center gap-1"><TrendingUp className="h-3 w-3 text-accent" /> 99.9%</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
