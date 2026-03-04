import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Users, FileText, Calendar, Video, Activity, Bell, LogOut, Stethoscope, Clock, TrendingUp, HeartPulse, ChevronRight, Zap, Sparkles, AlertTriangle } from "lucide-react";
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
  { name: "Ibrahim M.", time: "14:00", status: "Planifié", urgency: false },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } } };
const item = {
  hidden: { opacity: 0, y: 30, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 220, damping: 20 } }
};

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

function ECGLine() {
  return (
    <motion.div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden opacity-25 pointer-events-none">
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
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.div>
  );
}

function DNAHelix() {
  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-24 sm:w-10 sm:h-28 opacity-20 pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-full flex justify-between"
          style={{ top: `${i * 12.5}%` }}
          animate={{ x: [Math.sin(i) * 8, Math.sin(i + Math.PI) * 8, Math.sin(i) * 8] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        >
          <div className="w-2 h-2 rounded-full bg-primary-foreground" />
          <div className="w-2 h-2 rounded-full bg-primary-foreground/60" />
        </motion.div>
      ))}
    </div>
  );
}

export default function DoctorDashboard() {
  const now = new Date();
  const [pulseIdx, setPulseIdx] = useState(0);
  const [hoveredPatient, setHoveredPatient] = useState<number | null>(null);

  useEffect(() => {
    const t = setInterval(() => setPulseIdx(i => (i + 1) % 4), 2500);
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
            <h1 className="text-lg font-bold gradient-text">Espace Médecin</h1>
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
        {/* Doctor Hero with ECG */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring" as const, stiffness: 120 }}
        >
          <div className="relative rounded-2xl overflow-hidden gradient-primary p-5 sm:p-6">
            <ECGLine />
            <DNAHelix />

            {/* Glowing overlay */}
            <motion.div
              className="absolute inset-0"
              style={{ background: "radial-gradient(ellipse at 30% 50%, hsl(var(--accent) / 0.15), transparent 60%)" }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            <div className="relative flex items-center gap-3 sm:gap-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-card/20 backdrop-blur-sm flex items-center justify-center border border-primary-foreground/20 shadow-lg relative"
              >
                <HeartPulse className="h-7 w-7 sm:h-8 sm:w-8 text-primary-foreground" />
                <motion.div
                  className="absolute -inset-1 rounded-2xl border border-primary-foreground/10"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <div>
                <motion.h2
                  className="text-xl sm:text-2xl font-bold text-primary-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Dr. Dashboard <motion.span animate={{ opacity: [0, 1] }} transition={{ delay: 0.6 }}>🩺</motion.span>
                </motion.h2>
                <motion.p
                  className="text-primary-foreground/70 text-xs sm:text-sm flex items-center gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  {now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid with sequential glow */}
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((s, i) => (
            <motion.div key={s.label} variants={item}>
              <motion.div whileHover={{ y: -6, scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Card className={`relative group border overflow-hidden transition-all duration-500 ${
                  pulseIdx === i ? "border-primary/50 shadow-lg shadow-primary/15" : "border-border/50"
                }`}>
                  {/* Animated border glow */}
                  {pulseIdx === i && (
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      style={{ boxShadow: "inset 0 0 20px hsl(var(--primary) / 0.1)" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                  {/* Shimmer */}
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
                      <s.icon className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-1.5 sm:mb-2 text-primary" />
                    </motion.div>
                    <p className="text-xl sm:text-2xl font-bold text-foreground"><AnimatedCounter value={s.value} /></p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">{s.label}</p>
                    <motion.span
                      className="inline-block mt-1 text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-accent/10 text-accent font-medium"
                      animate={{ scale: pulseIdx === i ? [1, 1.1, 1] : 1 }}
                      transition={{ duration: 0.6 }}
                    >
                      {s.trend}
                    </motion.span>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent patients with slide-in animations */}
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
                    <Clock className="h-4 w-4 text-primary" />
                  </motion.div>
                  Patients du jour
                </h3>
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex items-center gap-1"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span className="text-[10px] text-accent font-medium">LIVE</span>
                  </motion.div>
                  <span className="text-[10px] sm:text-xs text-muted-foreground">{recentPatients.length} prévus</span>
                </div>
              </div>
              {recentPatients.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.12, type: "spring" as const, stiffness: 200 }}
                  onHoverStart={() => setHoveredPatient(i)}
                  onHoverEnd={() => setHoveredPatient(null)}
                  className="relative flex items-center justify-between p-3 sm:p-4 border-b border-border/20 last:border-0 hover:bg-primary/5 transition-all cursor-pointer group"
                >
                  {hoveredPatient === i && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"
                      layoutId="patientIndicator"
                      transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
                    />
                  )}
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm border border-primary/20"
                    >
                      {p.name.charAt(0)}
                    </motion.div>
                    <div>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{p.name}</p>
                      <p className="text-[11px] text-muted-foreground">{p.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {p.urgency && (
                      <motion.span
                        animate={{ scale: [1, 1.15, 1], boxShadow: ["0 0 0 0 hsl(var(--destructive) / 0)", "0 0 8px 2px hsl(var(--destructive) / 0.3)", "0 0 0 0 hsl(var(--destructive) / 0)"] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-destructive/10 text-destructive font-semibold flex items-center gap-0.5"
                      >
                        <AlertTriangle className="h-2.5 w-2.5" /> URGENT
                      </motion.span>
                    )}
                    <span className={`text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full font-medium ${
                      p.status === "En cours" ? "bg-accent/10 text-accent" :
                      p.status === "En attente" ? "bg-primary/10 text-primary" :
                      "bg-muted text-muted-foreground"
                    }`}>
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
          {menuItems.map((m, i) => (
            <motion.div key={m.title} variants={item}>
              <Link to={m.link}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Card className="cursor-pointer h-full group overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 relative">
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
                          className="absolute inset-0 rounded-xl border border-primary/20"
                          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                        />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{m.title}</h3>
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

        {/* Status bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <Card className="glass-effect border border-border/30 overflow-hidden relative">
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <CardContent className="p-3 sm:p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="h-2.5 w-2.5 rounded-full bg-accent" />
                  <motion.div animate={{ scale: [1, 2], opacity: [0.4, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 h-2.5 w-2.5 rounded-full bg-accent" />
                </div>
                <span className="text-xs text-muted-foreground">En service</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] sm:text-xs text-muted-foreground">
                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <Zap className="h-3 w-3 text-accent inline" />
                </motion.div>
                <span>Prochaine consultation dans 15 min</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
