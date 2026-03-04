import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, BarChart3, FileText, Users, Bell, LogOut, Shield, TrendingUp, Activity, Server, ChevronRight, Zap, Eye, ArrowUpRight, Cpu, Wifi, Database, Globe } from "lucide-react";
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

const systemMetrics = [
  { label: "API", value: "45ms", icon: Zap, status: "ok" },
  { label: "DB", value: "OK", icon: Database, status: "ok" },
  { label: "CDN", value: "12ms", icon: Globe, status: "ok" },
  { label: "CPU", value: "23%", icon: Cpu, status: "ok" },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } } };
const item = {
  hidden: { opacity: 0, y: 30, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 220, damping: 20 } }
};

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

function HexGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      <svg className="w-full h-full" viewBox="0 0 400 200">
        {[...Array(12)].map((_, i) => {
          const x = (i % 4) * 100 + (Math.floor(i / 4) % 2 === 0 ? 0 : 50);
          const y = Math.floor(i / 4) * 70;
          return (
            <motion.polygon
              key={i}
              points={`${x+25},${y} ${x+50},${y+15} ${x+50},${y+40} ${x+25},${y+55} ${x},${y+40} ${x},${y+15}`}
              fill="none"
              stroke="hsl(var(--primary-foreground))"
              strokeWidth="0.5"
              animate={{ opacity: [0.2, 0.6, 0.2], strokeWidth: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
            />
          );
        })}
      </svg>
    </div>
  );
}

function MatrixRain() {
  return (
    <div className="absolute right-6 top-4 bottom-4 w-20 overflow-hidden pointer-events-none opacity-15 hidden sm:block">
      {[...Array(5)].map((_, col) => (
        <motion.div
          key={col}
          className="absolute text-[8px] font-mono text-primary-foreground/60 leading-3"
          style={{ left: `${col * 20}%` }}
          animate={{ y: ["-50%", "100%"] }}
          transition={{ duration: 8 + col * 2, repeat: Infinity, ease: "linear", delay: col * 1.5 }}
        >
          {"01101001".split("").map((c, i) => (
            <div key={i}>{c}</div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  const now = new Date();
  const [activeMetric, setActiveMetric] = useState(0);
  const [activityPulse, setActivityPulse] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveMetric(i => (i + 1) % stats.length), 2500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActivityPulse(i => (i + 1) % recentActivity.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnimatedBackground />

      <header className="glass-effect sticky top-0 z-50 border-b border-border/30">
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.6), hsl(var(--accent) / 0.4), transparent)" }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 6 }}
              className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center relative"
            >
              <Shield className="h-4 w-4 text-primary-foreground" />
              <motion.div
                className="absolute inset-0 rounded-lg gradient-primary"
                animate={{ scale: [1, 1.3], opacity: [0.3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
            <h1 className="text-lg font-bold gradient-text">Administration</h1>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.2, repeat: Infinity }} className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-destructive" />
            </Button>
            <Link to="/"><Button variant="ghost" size="icon"><LogOut className="h-5 w-5" /></Button></Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 relative z-10 space-y-6">
        {/* Admin Hero with HexGrid + MatrixRain */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring" as const, stiffness: 120 }}
        >
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[hsl(var(--primary))] via-[hsl(var(--medical-600))] to-[hsl(var(--medical-700))] p-5 sm:p-6">
            <HexGrid />
            <MatrixRain />

            {/* Multi-layer scanning */}
            <motion.div
              animate={{ y: ["-100%", "300%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-8 bg-gradient-to-b from-transparent via-primary-foreground/5 to-transparent"
            />
            <motion.div
              animate={{ x: ["-100%", "300%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 2 }}
              className="absolute top-0 bottom-0 w-16 bg-gradient-to-r from-transparent via-primary-foreground/3 to-transparent"
            />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-card/20 backdrop-blur-sm flex items-center justify-center border border-primary-foreground/20 shadow-lg relative"
                >
                  <Eye className="h-7 w-7 sm:h-8 sm:w-8 text-primary-foreground" />
                  <motion.div
                    className="absolute -inset-1 rounded-2xl border border-primary-foreground/10"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                </motion.div>
                <div>
                  <motion.h2
                    className="text-xl sm:text-2xl font-bold text-primary-foreground"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Centre de contrôle
                  </motion.h2>
                  <motion.p
                    className="text-primary-foreground/60 text-xs sm:text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                  </motion.p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="hidden sm:flex h-12 w-12 rounded-full border-2 border-primary-foreground/15 border-t-primary-foreground/50 items-center justify-center relative"
              >
                <Activity className="h-4 w-4 text-primary-foreground/60" />
                <motion.div
                  className="absolute inset-0 rounded-full border border-primary-foreground/10"
                  animate={{ scale: [1, 1.3], opacity: [0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </div>

            {/* Inline system metrics in hero */}
            <div className="relative grid grid-cols-4 gap-2 mt-5">
              {systemMetrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, type: "spring" as const }}
                  className="bg-card/10 backdrop-blur-sm rounded-lg p-2 text-center border border-primary-foreground/10"
                >
                  <m.icon className="h-3 w-3 text-primary-foreground/60 mx-auto mb-0.5" />
                  <p className="text-[10px] sm:text-xs font-bold text-primary-foreground">{m.value}</p>
                  <p className="text-[8px] sm:text-[9px] text-primary-foreground/50">{m.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats Grid with rotating highlight */}
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((s, i) => (
            <motion.div key={s.label} variants={item}>
              <motion.div whileHover={{ y: -6, scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Card className={`relative group border overflow-hidden transition-all duration-500 ${
                  activeMetric === i ? "border-primary/50 shadow-lg shadow-primary/15" : "border-border/50"
                }`}>
                  {activeMetric === i && (
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-primary/5"
                      layoutId="adminStatHighlight"
                      transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
                    />
                  )}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                  />
                  <CardContent className="p-3 sm:p-4 text-center relative">
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.2 }}
                      transition={{ type: "spring" as const, stiffness: 400 }}
                    >
                      <s.icon className={`h-6 w-6 sm:h-7 sm:w-7 mx-auto mb-1.5 ${s.color} group-hover:scale-110 transition-transform`} />
                    </motion.div>
                    <p className="text-xl sm:text-2xl font-bold text-foreground">
                      <AnimatedCounter value={s.value} suffix={s.suffix || ""} />
                    </p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">{s.label}</p>
                    <div className="flex items-center justify-center gap-0.5 mt-1">
                      <motion.div animate={{ y: [0, -2, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                        <ArrowUpRight className="h-2.5 w-2.5 text-accent" />
                      </motion.div>
                      <span className="text-[9px] sm:text-[10px] text-accent font-medium">{s.trend}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Activity Feed with pulse indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring" as const }}
        >
          <Card className="border border-border/50 overflow-hidden relative">
            <motion.div
              className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border/30">
                <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                  <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
                    <Activity className="h-4 w-4 text-primary" />
                  </motion.div>
                  Activité récente
                </h3>
                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} className="flex items-center gap-1">
                  <motion.div
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span className="text-[10px] text-accent font-medium">LIVE</span>
                </motion.div>
              </div>
              {recentActivity.map((a, i) => (
                <motion.div
                  key={a.action}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, type: "spring" as const }}
                  className={`relative flex items-center justify-between p-3 sm:p-4 border-b border-border/20 last:border-0 hover:bg-primary/5 transition-all cursor-pointer group ${
                    activityPulse === i ? "bg-primary/[0.03]" : ""
                  }`}
                >
                  {activityPulse === i && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary rounded-r-full"
                      layoutId="activityIndicator"
                      transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
                    />
                  )}
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                        a.type === "user" ? "bg-primary/10 text-primary" :
                        a.type === "report" ? "bg-accent/10 text-accent" :
                        a.type === "center" ? "bg-medical-100 text-medical-600" :
                        "bg-muted text-muted-foreground"
                      }`}
                    >
                      {a.type === "user" ? <Users className="h-3.5 w-3.5" /> :
                       a.type === "report" ? <FileText className="h-3.5 w-3.5" /> :
                       a.type === "center" ? <Building2 className="h-3.5 w-3.5" /> :
                       <Shield className="h-3.5 w-3.5" />}
                    </motion.div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-foreground group-hover:text-primary transition-colors">{a.action}</p>
                      <p className="text-[10px] sm:text-[11px] text-muted-foreground">{a.time}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" />
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Action cards with gradient borders */}
        <motion.div variants={container} initial="hidden" animate="show" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {menuItems.map((m, i) => (
            <motion.div key={m.title} variants={item}>
              <Link to={m.link}>
                <motion.div whileHover={{ y: -8, scale: 1.03 }} whileTap={{ scale: 0.96 }}>
                  <Card className="cursor-pointer h-full group overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/15 transition-all duration-500 relative">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/5 to-transparent opacity-0 group-hover:opacity-100"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "200%" }}
                      transition={{ duration: 0.7 }}
                    />
                    <CardContent className="p-5 sm:p-6 flex items-start gap-4 relative">
                      <motion.div
                        whileHover={{ rotate: 12, scale: 1.15 }}
                        className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors border border-primary/20 relative"
                      >
                        <m.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                        <motion.div
                          className="absolute inset-0 rounded-xl border border-primary/15"
                          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                        />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">{m.title}</h3>
                          <motion.span
                            className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium shrink-0"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                          >
                            {m.badge}
                          </motion.span>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground">{m.desc}</p>
                      </div>
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-all shrink-0 mt-1" />
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* System status with live indicators */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <Card className="glass-effect border border-border/30 overflow-hidden relative">
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <CardContent className="p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="h-2.5 w-2.5 rounded-full bg-accent" />
                  <motion.div animate={{ scale: [1, 2.5], opacity: [0.4, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 h-2.5 w-2.5 rounded-full bg-accent" />
                </div>
                <span className="text-xs text-muted-foreground">Tous les systèmes opérationnels</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] sm:text-xs text-muted-foreground">
                {systemMetrics.slice(0, 3).map((m, i) => (
                  <motion.span
                    key={m.label}
                    className="flex items-center gap-1"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  >
                    <m.icon className="h-3 w-3 text-accent" /> {m.label}: {m.value}
                  </motion.span>
                ))}
                <span className="flex items-center gap-1"><TrendingUp className="h-3 w-3 text-accent" /> 99.9%</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
