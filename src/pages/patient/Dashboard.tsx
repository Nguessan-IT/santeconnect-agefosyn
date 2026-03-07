import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, FileText, MessageSquare, Video, Pill, Bell, LogOut, User, Heart, Activity, ChevronRight, Shield, Clock, TrendingUp, Zap, Sparkles } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import MobileBottomNav from "@/components/MobileBottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

const menuItems = [
  { icon: Calendar, title: "Rendez-vous", desc: "Gérer vos RDV médicaux", link: "/patient/appointments", color: "bg-primary/10 text-primary border-primary/20" },
  { icon: FileText, title: "Dossier médical", desc: "Consultations et résultats", link: "/patient/medical-record", color: "bg-accent/10 text-accent border-accent/20" },
  { icon: MessageSquare, title: "Messages", desc: "Messagerie sécurisée", link: "/patient/messages", color: "bg-primary/10 text-primary border-primary/20" },
  { icon: Video, title: "Téléconsultation", desc: "Consultation vidéo", link: "/patient/teleconsultation", color: "bg-accent/10 text-accent border-accent/20" },
  { icon: Pill, title: "Pharmacie", desc: "Ordonnances et médicaments", link: "/patient/pharmacy", color: "bg-primary/10 text-primary border-primary/20" },
];

const stats = [
  { label: "Consultations", value: 12, icon: Activity },
  { label: "Ordonnances", value: 5, icon: FileText },
  { label: "Non lus", value: 3, icon: MessageSquare },
];

const healthTips = [
  "💧 Buvez au moins 1.5L d'eau par jour",
  "🏃 30 min d'activité physique quotidienne",
  "😴 Dormez au moins 7h par nuit",
  "🍎 5 fruits et légumes par jour",
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } } };
const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 260, damping: 22 } }
};

function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.max(1, Math.floor(800 / value));
    const timer = setInterval(() => { start += 1; setCount(start); if (start >= value) clearInterval(timer); }, step);
    return () => clearInterval(timer);
  }, [value]);
  return <>{count}</>;
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary-foreground/20"
          style={{ left: `${20 + i * 20}%`, top: `${25 + (i % 2) * 30}%` }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </div>
  );
}

export default function PatientDashboard() {
  const [tipIndex, setTipIndex] = useState(0);
  const [activeStatIdx, setActiveStatIdx] = useState(0);
  const now = new Date();
  const greeting = now.getHours() < 12 ? "Bonjour" : now.getHours() < 18 ? "Bon après-midi" : "Bonsoir";

  useEffect(() => {
    const interval = setInterval(() => setTipIndex((i) => (i + 1) % healthTips.length), 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setActiveStatIdx((i) => (i + 1) % stats.length), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-16 sm:pb-0">
      <AnimatedBackground />

      {/* Compact Header */}
      <header className="glass-effect sticky top-0 z-50 border-b border-border/30">
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5), hsl(var(--accent) / 0.5), transparent)" }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <div className="flex items-center justify-between py-2.5 px-3 sm:py-3 sm:px-4 max-w-5xl mx-auto">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 6 }}
              className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center relative"
            >
              <Heart className="h-4 w-4 text-primary-foreground" />
              <motion.div
                className="absolute inset-0 rounded-lg gradient-primary"
                animate={{ scale: [1, 1.3], opacity: [0.3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
            <h1 className="text-base sm:text-lg font-bold gradient-text">SantéConnect</h1>
          </div>
          <div className="flex items-center gap-0.5">
            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <Bell className="h-4.5 w-4.5" />
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive"
              />
            </Button>
            <Link to="/"><Button variant="ghost" size="icon" className="h-9 w-9 hidden sm:flex"><LogOut className="h-4.5 w-4.5" /></Button></Link>
          </div>
        </div>
      </header>

      <main className="px-3 sm:px-4 py-4 sm:py-6 relative z-10 space-y-4 sm:space-y-6 max-w-5xl mx-auto">
        {/* Welcome Hero - compact on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" as const, stiffness: 150, damping: 18 }}
        >
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden gradient-primary p-4 sm:p-6">
            <FloatingParticles />
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{ background: "radial-gradient(circle at 20% 50%, hsl(var(--accent) / 0.3), transparent 50%)" }}
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ duration: 15, repeat: Infinity }}
            />

            {/* Orbiting ring - hidden on mobile */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-2 right-2 w-20 h-20 sm:w-32 sm:h-32 hidden sm:block"
            >
              <div className="absolute inset-0 rounded-full border border-primary-foreground/10" />
              <div className="absolute top-0 left-1/2 w-1.5 h-1.5 rounded-full bg-primary-foreground/40" />
            </motion.div>

            <div className="relative flex items-center gap-3">
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="h-11 w-11 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-card/20 backdrop-blur-sm flex items-center justify-center border border-primary-foreground/20 shadow-lg shrink-0"
              >
                <User className="h-5 w-5 sm:h-7 sm:w-7 text-primary-foreground" />
              </motion.div>
              <div className="min-w-0">
                <h2 className="text-lg sm:text-2xl font-bold text-primary-foreground truncate">
                  {greeting} 👋
                </h2>
                <p className="text-primary-foreground/70 text-[11px] sm:text-sm flex items-center gap-1">
                  <Shield className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" /> Espace santé sécurisé
                </p>
              </div>
            </div>

            {/* Stats row */}
            <div className="relative grid grid-cols-3 gap-2 mt-4 sm:mt-5">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring" as const }}
                  className={`relative bg-card/15 backdrop-blur-sm rounded-lg p-2 sm:p-3 text-center border transition-all duration-300 ${
                    activeStatIdx === i ? "border-primary-foreground/40 shadow-md" : "border-primary-foreground/10"
                  }`}
                >
                  {activeStatIdx === i && (
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-primary-foreground/5"
                      layoutId="statGlow"
                      transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
                    />
                  )}
                  <s.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary-foreground/80 mx-auto mb-0.5 relative z-10" />
                  <p className="text-base sm:text-xl font-bold text-primary-foreground relative z-10">
                    <AnimatedCounter value={s.value} />
                  </p>
                  <p className="text-[9px] sm:text-[11px] text-primary-foreground/60 relative z-10 truncate">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Health tip ticker */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <Card className="border border-accent/30 bg-accent/5 overflow-hidden relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />
            <CardContent className="p-2.5 sm:p-3.5 flex items-center gap-2.5 relative">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0"
              >
                <TrendingUp className="h-3.5 w-3.5 text-accent" />
              </motion.div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={tipIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-[11px] sm:text-sm text-foreground font-medium"
                >
                  {healthTips[tipIndex]}
                </motion.p>
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Next appointment */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="relative border border-primary/20 bg-primary/5 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
            <CardContent className="p-3 sm:p-4 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"
                >
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </motion.div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-xs sm:text-sm text-foreground">Prochain rendez-vous</h3>
                  <p className="text-muted-foreground text-[10px] sm:text-xs flex items-center gap-1">
                    <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0" /> Aucun RDV prévu
                  </p>
                </div>
              </div>
              <Link to="/patient/appointments">
                <Button size="sm" className="rounded-full gap-1 text-[10px] sm:text-xs h-8 sm:h-9 px-3 sm:px-4 shrink-0 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                  />
                  <Zap className="h-3 w-3 relative z-10" /> <span className="relative z-10">Prendre RDV</span>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Menu grid - mobile first: single column stacked, 2 cols on larger */}
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-3">
          {menuItems.map((m, i) => (
            <motion.div key={m.title} variants={item}>
              <Link to={m.link}>
                <motion.div whileTap={{ scale: 0.97 }} whileHover={{ y: -4 }}>
                  <Card className="h-full border border-border/50 bg-card/80 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 overflow-hidden active:bg-primary/5">
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "200%" }}
                      transition={{ duration: 0.8 }}
                    />
                    <CardContent className="p-3 sm:p-4 flex items-center gap-3 relative">
                      <motion.div
                        whileHover={{ rotate: 8, scale: 1.1 }}
                        className={`h-10 w-10 sm:h-11 sm:w-11 rounded-xl flex items-center justify-center border shrink-0 ${m.color}`}
                      >
                        <m.icon className="h-5 w-5" />
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
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <CardContent className="p-2.5 sm:p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="h-2 w-2 rounded-full bg-accent" />
                  <motion.div animate={{ scale: [1, 2], opacity: [0.4, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 h-2 w-2 rounded-full bg-accent" />
                </div>
                <span className="text-[10px] sm:text-xs text-muted-foreground">Système opérationnel</span>
              </div>
              <span className="text-[9px] sm:text-xs text-muted-foreground">
                {now.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" })}
              </span>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <MobileBottomNav role="patient" />
    </div>
  );
}
