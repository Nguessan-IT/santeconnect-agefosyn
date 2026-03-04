import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Users, FileText, Calendar, Video, Activity, Bell, LogOut, Stethoscope, Clock, TrendingUp, HeartPulse, Clipboard, ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useState, useEffect } from "react";

const stats = [
  { label: "Patients aujourd'hui", value: 12, icon: Users, trend: "+3" },
  { label: "RDV en attente", value: 5, icon: Calendar, trend: "2 urgents" },
  { label: "Consultations", value: 8, icon: Video, trend: "+12%" },
  { label: "Prescriptions", value: 15, icon: FileText, trend: "ce mois" },
];

const menuItems = [
  { icon: Users, title: "Mes patients", desc: "Dossiers et historiques patients", link: "/doctor/patients" },
  { icon: FileText, title: "Ordonnances", desc: "Créer et gérer les prescriptions", link: "/doctor/prescriptions" },
];

const recentPatients = [
  { name: "Aminata K.", time: "09:30", status: "En cours", urgency: false },
  { name: "Kouassi B.", time: "10:15", status: "En attente", urgency: true },
  { name: "Fatou D.", time: "11:00", status: "Planifié", urgency: false },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 20, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 260, damping: 22 } } };

function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.max(1, Math.floor(1000 / value));
    const timer = setInterval(() => { start += 1; setCount(start); if (start >= value) clearInterval(timer); }, step);
    return () => clearInterval(timer);
  }, [value]);
  return <>{count}</>;
}

export default function DoctorDashboard() {
  const now = new Date();
  const [pulseIdx, setPulseIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setPulseIdx(i => (i + 1) % 4), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnimatedBackground />

      <header className="glass-effect sticky top-0 z-50 border-b border-border/30">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
              className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center"
            >
              <Stethoscope className="h-4 w-4 text-primary-foreground" />
            </motion.div>
            <h1 className="text-lg font-bold gradient-text">Espace Médecin</h1>
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
        {/* Doctor Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring" }}>
          <div className="relative rounded-2xl overflow-hidden gradient-primary p-5 sm:p-6">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImNyb3NzIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0yOCAyNmg0djRoLTR6TTI2IDI4djRoNHYtNHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNikiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0idXJsKCNjcm9zcykiLz48L3N2Zz4=')] opacity-60" />
            
            {/* Heartbeat line */}
            <motion.div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden opacity-20">
              <motion.svg
                viewBox="0 0 400 50"
                className="w-full h-full"
                initial={{ x: 0 }}
                animate={{ x: -200 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <path d="M0 25 L50 25 L60 10 L70 40 L80 15 L90 35 L100 25 L200 25 L210 10 L220 40 L230 15 L240 35 L250 25 L400 25" fill="none" stroke="white" strokeWidth="2" />
              </motion.svg>
            </motion.div>

            <div className="relative flex items-center gap-3 sm:gap-4">
              <motion.div whileHover={{ scale: 1.05 }} className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-card/20 backdrop-blur-sm flex items-center justify-center border border-primary-foreground/20 shadow-lg">
                <HeartPulse className="h-7 w-7 sm:h-8 sm:w-8 text-primary-foreground" />
              </motion.div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-primary-foreground">
                  Dr. Dashboard <motion.span animate={{ opacity: [0, 1] }} transition={{ duration: 0.5, delay: 0.5 }}>🩺</motion.span>
                </h2>
                <p className="text-primary-foreground/70 text-xs sm:text-sm">
                  {now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((s, i) => (
            <motion.div key={s.label} variants={item}>
              <motion.div whileHover={{ y: -4, scale: 1.03 }}>
                <Card className={`shine-effect group border transition-all duration-300 ${pulseIdx === i ? "border-primary/40 shadow-lg shadow-primary/10" : "border-border/50"}`}>
                  <CardContent className="p-3 sm:p-4 text-center">
                    <motion.div whileHover={{ rotate: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                      <s.icon className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-1.5 sm:mb-2 text-primary group-hover:scale-110 transition-transform" />
                    </motion.div>
                    <p className="text-xl sm:text-2xl font-bold text-foreground"><AnimatedCounter value={s.value} /></p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">{s.label}</p>
                    <span className="inline-block mt-1 text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-accent/10 text-accent font-medium">{s.trend}</span>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent patients */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="border border-border/50 overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border/30">
                <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" /> Patients du jour
                </h3>
                <span className="text-[10px] sm:text-xs text-muted-foreground">{recentPatients.length} prévus</span>
              </div>
              {recentPatients.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center justify-between p-3 sm:p-4 border-b border-border/20 last:border-0 hover:bg-primary/5 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{p.name}</p>
                      <p className="text-[11px] text-muted-foreground">{p.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {p.urgency && (
                      <motion.span
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-destructive/10 text-destructive font-semibold"
                      >
                        URGENT
                      </motion.span>
                    )}
                    <span className={`text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full font-medium ${p.status === "En cours" ? "bg-accent/10 text-accent" : p.status === "En attente" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                      {p.status}
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Action cards */}
        <motion.div variants={container} initial="hidden" animate="show" className="grid sm:grid-cols-2 gap-3 sm:gap-4">
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
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{m.title}</h3>
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

        {/* Status bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <Card className="glass-effect border border-border/30">
            <CardContent className="p-3 sm:p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="h-2.5 w-2.5 rounded-full bg-accent" />
                <span className="text-xs text-muted-foreground">En service</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] sm:text-xs text-muted-foreground">
                <Zap className="h-3 w-3 text-accent" />
                <span>Prochaine consultation dans 15 min</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
