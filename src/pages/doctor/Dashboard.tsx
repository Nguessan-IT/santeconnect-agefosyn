import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Users, FileText, Calendar, Video, Bell, LogOut, Stethoscope, Clock, HeartPulse, ChevronRight, Zap, Sparkles, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedBackground from "@/components/AnimatedBackground";
import MobileBottomNav from "@/components/MobileBottomNav";
import { useState, useEffect } from "react";

const stats = [
  { label: "Patients", value: 0, icon: Users, trend: "--" },
  { label: "RDV", value: 0, icon: Calendar, trend: "--" },
  { label: "Consultations", value: 0, icon: Video, trend: "--" },
  { label: "Prescriptions", value: 0, icon: FileText, trend: "--" },
];

const menuItems = [
  { icon: Users, title: "Mes patients", desc: "Dossiers et historiques", link: "/doctor/patients" },
  { icon: FileText, title: "Ordonnances", desc: "Créer et gérer les prescriptions", link: "/doctor/prescriptions" },
];

const recentPatients = [
  { name: "Aminata K.", time: "09:30", status: "En cours", urgency: false },
  { name: "Kouassi B.", time: "10:15", status: "En attente", urgency: true },
  { name: "Fatou D.", time: "11:00", status: "Planifié", urgency: false },
  { name: "Ibrahim M.", time: "14:00", status: "Planifié", urgency: false },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } } };
const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 260, damping: 22 } }
};

function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (value === 0) { setCount(0); return; }
    let start = 0;
    const step = Math.max(1, Math.floor(800 / value));
    const timer = setInterval(() => { start += 1; setCount(start); if (start >= value) clearInterval(timer); }, step);
    return () => clearInterval(timer);
  }, [value]);
  return <>{count}</>;
}

function ECGLine() {
  return (
    <motion.div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 overflow-hidden opacity-20 pointer-events-none">
      <motion.svg
        viewBox="0 0 600 50"
        className="w-[200%] h-full"
        animate={{ x: [0, -300] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0 25 L80 25 L90 25 L100 10 L110 40 L115 5 L120 45 L125 20 L130 25 L200 25 L280 25 L290 25 L300 10 L310 40 L315 5 L320 45 L325 20 L330 25 L400 25 L480 25 L490 25 L500 10 L510 40 L515 5 L520 45 L525 20 L530 25 L600 25"
          fill="none"
          stroke="hsl(var(--primary-foreground))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.div>
  );
}

export default function DoctorDashboard() {
  const now = new Date();
  const [pulseIdx, setPulseIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setPulseIdx(i => (i + 1) % 4), 2500);
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
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
              className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center relative"
            >
              <Stethoscope className="h-4 w-4 text-primary-foreground" />
              <motion.div
                className="absolute inset-0 rounded-lg gradient-primary"
                animate={{ scale: [1, 1.3], opacity: [0.3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
            <h1 className="text-base sm:text-lg font-bold gradient-text">Espace Médecin</h1>
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
        {/* Doctor Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" as const, stiffness: 150 }}
        >
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden gradient-primary p-4 sm:p-6">
            <ECGLine />
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{ background: "radial-gradient(ellipse at 30% 50%, hsl(var(--accent) / 0.2), transparent 60%)" }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            <div className="relative flex items-center gap-3">
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="h-11 w-11 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-card/20 backdrop-blur-sm flex items-center justify-center border border-primary-foreground/20 shadow-lg shrink-0"
              >
                <HeartPulse className="h-5 w-5 sm:h-7 sm:w-7 text-primary-foreground" />
              </motion.div>
              <div className="min-w-0">
                <h2 className="text-lg sm:text-2xl font-bold text-primary-foreground truncate">
                  Dr. Dashboard 🩺
                </h2>
                <p className="text-primary-foreground/70 text-[11px] sm:text-sm flex items-center gap-1">
                  <Sparkles className="h-3 w-3 shrink-0" />
                  <span className="truncate">{now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats - 2x2 on mobile, 4 cols on desktop */}
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {stats.map((s, i) => (
            <motion.div key={s.label} variants={item}>
              <motion.div whileTap={{ scale: 0.97 }}>
                <Card className={`relative border overflow-hidden transition-all duration-300 ${
                  pulseIdx === i ? "border-primary/40 shadow-md shadow-primary/10" : "border-border/50"
                }`}>
                  {pulseIdx === i && (
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-primary/5"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    />
                  )}
                  <CardContent className="p-2.5 sm:p-3.5 text-center relative">
                    <s.icon className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-1 text-primary" />
                    <p className="text-lg sm:text-xl font-bold text-foreground"><AnimatedCounter value={s.value} /></p>
                    <p className="text-[9px] sm:text-[11px] text-muted-foreground truncate">{s.label}</p>
                    <span className="inline-block mt-0.5 text-[8px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
                      {s.trend}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Patients list */}
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
                    <Clock className="h-3.5 w-3.5 text-primary" />
                  </motion.div>
                  Patients du jour
                </h3>
                <div className="flex items-center gap-1.5">
                  <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} className="flex items-center gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span className="text-[9px] text-accent font-medium">LIVE</span>
                  </motion.div>
                  <span className="text-[9px] sm:text-[11px] text-muted-foreground">{recentPatients.length} prévus</span>
                </div>
              </div>
              {recentPatients.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08, type: "spring" as const }}
                  className="flex items-center justify-between p-2.5 sm:p-3.5 border-b border-border/20 last:border-0 active:bg-primary/5 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs sm:text-sm border border-primary/20 shrink-0">
                      {p.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-foreground truncate">{p.name}</p>
                      <p className="text-[10px] text-muted-foreground">{p.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {p.urgency && (
                      <motion.span
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        className="text-[8px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-destructive/10 text-destructive font-semibold flex items-center gap-0.5"
                      >
                        <AlertTriangle className="h-2.5 w-2.5" /> <span className="hidden sm:inline">URGENT</span><span className="sm:hidden">!</span>
                      </motion.span>
                    )}
                    <span className={`text-[9px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-full font-medium ${
                      p.status === "En cours" ? "bg-accent/10 text-accent" :
                      p.status === "En attente" ? "bg-primary/10 text-primary" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {p.status}
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Action cards */}
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-3">
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
                        <h3 className="font-semibold text-sm text-foreground">{m.title}</h3>
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

        {/* Status bar */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="glass-effect border border-border/30 overflow-hidden relative">
            <CardContent className="p-2.5 sm:p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="h-2 w-2 rounded-full bg-accent" />
                  <motion.div animate={{ scale: [1, 2], opacity: [0.4, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 h-2 w-2 rounded-full bg-accent" />
                </div>
                <span className="text-[10px] sm:text-xs text-muted-foreground">En service</span>
              </div>
              <div className="flex items-center gap-1.5 text-[9px] sm:text-[11px] text-muted-foreground">
                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <Zap className="h-3 w-3 text-accent inline" />
                </motion.div>
                <span>Prochaine consultation: 15 min</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <MobileBottomNav role="doctor" />
    </div>
  );
}
