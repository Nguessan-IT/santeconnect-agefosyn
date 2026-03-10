import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, BarChart3, FileText, Users, Bell, LogOut, Shield, TrendingUp, Activity, Server, ChevronRight, Zap, Eye, ArrowUpRight, Cpu, Database, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedBackground from "@/components/AnimatedBackground";
import MobileBottomNav from "@/components/MobileBottomNav";
import { useState, useEffect } from "react";

const stats = [
  { label: "Centres", value: 0, icon: Building2, trend: "--", color: "text-primary" },
  { label: "Utilisateurs", value: 0, icon: Users, trend: "--", color: "text-accent" },
  { label: "RDV/mois", value: 0, icon: BarChart3, trend: "--", color: "text-primary" },
  { label: "Uptime", value: 0, icon: Server, trend: "--", color: "text-accent", suffix: "%" },
];

const menuItems = [
  { icon: Building2, title: "Centres médicaux", desc: "Gérer les établissements", link: "/admin/hospitals", badge: "3 actifs" },
  { icon: BarChart3, title: "Analytique", desc: "Statistiques et KPIs", link: "/admin/analytics", badge: "Live" },
  { icon: FileText, title: "Rapports", desc: "Rapports et audits", link: "/admin/reports", badge: "2 nouveaux" },
];

const recentActivity: { action: string; time: string; type: string }[] = [];

const systemMetrics = [
  { label: "API", value: "45ms", icon: Zap },
  { label: "DB", value: "OK", icon: Database },
  { label: "CDN", value: "12ms", icon: Globe },
  { label: "CPU", value: "23%", icon: Cpu },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } } };
const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 260, damping: 22 } }
};

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (value === 0) { setCount(0); return; }
    let start = 0;
    const step = Math.max(1, Math.floor(800 / value));
    const timer = setInterval(() => { start += 1; setCount(start); if (start >= value) clearInterval(timer); }, step);
    return () => clearInterval(timer);
  }, [value]);
  return <>{count}{suffix}</>;
}

function HexGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10 hidden sm:block">
      <svg className="w-full h-full" viewBox="0 0 400 200">
        {[...Array(8)].map((_, i) => {
          const x = (i % 4) * 100 + (Math.floor(i / 4) % 2 === 0 ? 0 : 50);
          const y = Math.floor(i / 4) * 70;
          return (
            <motion.polygon
              key={i}
              points={`${x+25},${y} ${x+50},${y+15} ${x+50},${y+40} ${x+25},${y+55} ${x},${y+40} ${x},${y+15}`}
              fill="none"
              stroke="hsl(var(--primary-foreground))"
              strokeWidth="0.5"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
            />
          );
        })}
      </svg>
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
    <div className="min-h-screen bg-background relative overflow-hidden pb-16 sm:pb-0">
      <AnimatedBackground />

      <header className="glass-effect sticky top-0 z-50 border-b border-border/30">
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.6), hsl(var(--accent) / 0.4), transparent)" }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div className="flex items-center justify-between py-2.5 px-3 sm:py-3 sm:px-4 max-w-5xl mx-auto">
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
            <h1 className="text-base sm:text-lg font-bold gradient-text">Administration</h1>
          </div>
          <div className="flex items-center gap-0.5">
            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <Bell className="h-4.5 w-4.5" />
              <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.2, repeat: Infinity }} className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
            </Button>
            <Link to="/"><Button variant="ghost" size="icon" className="h-9 w-9 hidden sm:flex"><LogOut className="h-4.5 w-4.5" /></Button></Link>
          </div>
        </div>
      </header>

      <main className="px-3 sm:px-4 py-4 sm:py-6 relative z-10 space-y-4 sm:space-y-6 max-w-5xl mx-auto">
        {/* Admin Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" as const, stiffness: 150 }}
        >
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden gradient-primary p-4 sm:p-6">
            <HexGrid />
            <motion.div
              animate={{ y: ["-100%", "300%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-6 bg-gradient-to-b from-transparent via-primary-foreground/5 to-transparent"
            />

            <div className="relative flex items-center gap-3">
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="h-11 w-11 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-card/20 backdrop-blur-sm flex items-center justify-center border border-primary-foreground/20 shadow-lg shrink-0"
              >
                <Eye className="h-5 w-5 sm:h-7 sm:w-7 text-primary-foreground" />
              </motion.div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-2xl font-bold text-primary-foreground truncate">Centre de contrôle</h2>
                <p className="text-primary-foreground/60 text-[10px] sm:text-sm truncate">
                  {now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                </p>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="hidden sm:flex h-10 w-10 rounded-full border-2 border-primary-foreground/15 border-t-primary-foreground/50 items-center justify-center shrink-0"
              >
                <Activity className="h-3.5 w-3.5 text-primary-foreground/60" />
              </motion.div>
            </div>

            {/* System metrics inline */}
            <div className="relative grid grid-cols-4 gap-1.5 sm:gap-2 mt-4">
              {systemMetrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.08, type: "spring" as const }}
                  className="bg-card/10 backdrop-blur-sm rounded-lg p-1.5 sm:p-2 text-center border border-primary-foreground/10"
                >
                  <m.icon className="h-3 w-3 text-primary-foreground/60 mx-auto mb-0.5" />
                  <p className="text-[9px] sm:text-xs font-bold text-primary-foreground">{m.value}</p>
                  <p className="text-[7px] sm:text-[9px] text-primary-foreground/50">{m.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {stats.map((s, i) => (
            <motion.div key={s.label} variants={item}>
              <motion.div whileTap={{ scale: 0.97 }}>
                <Card className={`relative border overflow-hidden transition-all duration-300 ${
                  activeMetric === i ? "border-primary/40 shadow-md shadow-primary/10" : "border-border/50"
                }`}>
                  {activeMetric === i && (
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-primary/5"
                      layoutId="adminStatGlow"
                      transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
                    />
                  )}
                  <CardContent className="p-2.5 sm:p-3.5 text-center relative">
                    <s.icon className={`h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-1 ${s.color}`} />
                    <p className="text-lg sm:text-xl font-bold text-foreground">
                      <AnimatedCounter value={s.value} suffix={s.suffix || ""} />
                    </p>
                    <p className="text-[9px] sm:text-[11px] text-muted-foreground truncate">{s.label}</p>
                    <div className="flex items-center justify-center gap-0.5 mt-0.5">
                      <ArrowUpRight className="h-2.5 w-2.5 text-accent" />
                      <span className="text-[8px] sm:text-[10px] text-accent font-medium">{s.trend}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Activity Feed */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border border-border/50 overflow-hidden relative">
            <motion.div
              className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-2.5 sm:p-3.5 border-b border-border/30">
                <h3 className="font-semibold text-xs sm:text-sm text-foreground flex items-center gap-1.5">
                  <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
                    <Activity className="h-3.5 w-3.5 text-primary" />
                  </motion.div>
                  Activité récente
                </h3>
                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} className="flex items-center gap-1">
                  <motion.div className="h-1.5 w-1.5 rounded-full bg-accent" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                  <span className="text-[9px] text-accent font-medium">LIVE</span>
                </motion.div>
              </div>
              {recentActivity.map((a, i) => (
                <motion.div
                  key={a.action}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08, type: "spring" as const }}
                  className={`relative flex items-center justify-between p-2.5 sm:p-3.5 border-b border-border/20 last:border-0 active:bg-primary/5 transition-all cursor-pointer ${
                    activityPulse === i ? "bg-primary/[0.03]" : ""
                  }`}
                >
                  {activityPulse === i && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary rounded-r-full"
                      layoutId="activityBar"
                      transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
                    />
                  )}
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`h-7 w-7 sm:h-8 sm:w-8 rounded-lg flex items-center justify-center text-xs shrink-0 ${
                      a.type === "user" ? "bg-primary/10 text-primary" :
                      a.type === "report" ? "bg-accent/10 text-accent" :
                      a.type === "center" ? "bg-primary/10 text-primary" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {a.type === "user" ? <Users className="h-3 w-3" /> :
                       a.type === "report" ? <FileText className="h-3 w-3" /> :
                       a.type === "center" ? <Building2 className="h-3 w-3" /> :
                       <Shield className="h-3 w-3" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] sm:text-sm font-medium text-foreground truncate">{a.action}</p>
                      <p className="text-[9px] sm:text-[11px] text-muted-foreground">{a.time}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Action cards */}
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-3">
          {menuItems.map((m, i) => (
            <motion.div key={m.title} variants={item}>
              <Link to={m.link}>
                <motion.div whileTap={{ scale: 0.97 }} whileHover={{ y: -4 }}>
                  <Card className="cursor-pointer h-full border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 overflow-hidden active:bg-primary/5">
                    <CardContent className="p-3 sm:p-5 flex items-center gap-3 relative">
                      <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20"
                      >
                        <m.icon className="h-5 w-5 text-primary" />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <h3 className="font-semibold text-sm text-foreground truncate">{m.title}</h3>
                          <span className="text-[8px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium shrink-0">{m.badge}</span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-muted-foreground truncate">{m.desc}</p>
                      </div>
                      <motion.div animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                        <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* System status */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="glass-effect border border-border/30 overflow-hidden relative">
            <CardContent className="p-2.5 sm:p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="h-2 w-2 rounded-full bg-accent" />
                  <motion.div animate={{ scale: [1, 2.5], opacity: [0.4, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 h-2 w-2 rounded-full bg-accent" />
                </div>
                <span className="text-[10px] sm:text-xs text-muted-foreground">Tous systèmes OK</span>
              </div>
              <div className="flex items-center gap-2 text-[9px] sm:text-[11px] text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-accent" />
                <span>Uptime 99.9%</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <MobileBottomNav role="admin" />
    </div>
  );
}
