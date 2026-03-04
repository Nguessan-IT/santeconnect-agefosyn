import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, FileText, MessageSquare, Video, Pill, Bell, LogOut, User, Heart, Activity, ChevronRight, Shield, Clock, TrendingUp, Zap } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

const menuItems = [
  { icon: Calendar, title: "Rendez-vous", desc: "Gérer vos rendez-vous médicaux", link: "/patient/appointments" },
  { icon: FileText, title: "Dossier médical", desc: "Consultations et résultats", link: "/patient/medical-record" },
  { icon: MessageSquare, title: "Messages", desc: "Messagerie sécurisée", link: "/patient/messages" },
  { icon: Video, title: "Téléconsultation", desc: "Consultation vidéo en direct", link: "/patient/teleconsultation" },
  { icon: Pill, title: "Pharmacie", desc: "Ordonnances et médicaments", link: "/patient/pharmacy" },
];

const stats = [
  { label: "Consultations", value: 12, icon: Activity, suffix: "" },
  { label: "Ordonnances", value: 5, icon: FileText, suffix: "" },
  { label: "Messages", value: 3, icon: MessageSquare, suffix: "non lus" },
];

const healthTips = [
  "💧 Pensez à boire au moins 1.5L d'eau par jour",
  "🏃 30 minutes d'activité physique quotidienne",
  "😴 Dormez au moins 7h par nuit",
  "🍎 5 fruits et légumes par jour",
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 24, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 260, damping: 22 } } };

function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1200;
    const step = Math.max(1, Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [value]);
  return <>{count}</>;
}

export default function PatientDashboard() {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTipIndex((i) => (i + 1) % healthTips.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const now = new Date();
  const greeting = now.getHours() < 12 ? "Bonjour" : now.getHours() < 18 ? "Bon après-midi" : "Bonsoir";

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnimatedBackground />

      {/* Header */}
      <header className="glass-effect sticky top-0 z-50 border-b border-border/30">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
              className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center"
            >
              <Heart className="h-4 w-4 text-primary-foreground" />
            </motion.div>
            <h1 className="text-lg font-bold gradient-text">SantéConnect</h1>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-destructive"
              />
            </Button>
            <Link to="/"><Button variant="ghost" size="icon"><LogOut className="h-5 w-5" /></Button></Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 relative z-10 space-y-6">
        {/* Welcome hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 150 }}>
          <div className="relative rounded-2xl overflow-hidden gradient-primary p-5 sm:p-6 pb-6 sm:pb-8">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZG90cyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIxLjUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9InVybCgjZG90cykiLz48L3N2Zz4=')] opacity-50" />
            
            {/* Orbiting particle */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-4 right-4 w-24 h-24 sm:w-32 sm:h-32"
            >
              <div className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-primary-foreground/30" />
            </motion.div>

            <div className="relative flex items-center gap-3 sm:gap-4">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-card/20 backdrop-blur-sm flex items-center justify-center border border-primary-foreground/20 shadow-lg"
              >
                <User className="h-7 w-7 sm:h-8 sm:w-8 text-primary-foreground" />
              </motion.div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-primary-foreground">{greeting} 👋</h2>
                <p className="text-primary-foreground/70 text-xs sm:text-sm flex items-center gap-1">
                  <Shield className="h-3.5 w-3.5" /> Votre espace santé sécurisé
                </p>
              </div>
            </div>

            {/* Animated stats */}
            <div className="relative grid grid-cols-3 gap-2 sm:gap-3 mt-5 sm:mt-6">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="bg-card/15 backdrop-blur-sm rounded-xl p-2.5 sm:p-3 text-center border border-primary-foreground/15 hover:border-primary-foreground/30 transition-colors"
                >
                  <s.icon className="h-4 w-4 text-primary-foreground/80 mx-auto mb-1" />
                  <p className="text-lg sm:text-xl font-bold text-primary-foreground">
                    <AnimatedCounter value={s.value} />
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-primary-foreground/60">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Health tip ticker */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <Card className="border border-accent/30 bg-accent/5 overflow-hidden">
            <CardContent className="p-3 sm:p-4 flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-accent/10 flex items-center justify-center shrink-0"
              >
                <TrendingUp className="h-4 w-4 text-accent" />
              </motion.div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={tipIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-xs sm:text-sm text-foreground font-medium"
                >
                  {healthTips[tipIndex]}
                </motion.p>
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Next appointment card */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, type: "spring" }}>
          <Card className="border-2 border-dashed border-primary/20 bg-primary/5 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/5">
            <CardContent className="p-4 sm:p-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-primary/10 flex items-center justify-center"
                >
                  <Calendar className="h-5 w-5 text-primary" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground">Prochain rendez-vous</h3>
                  <p className="text-muted-foreground text-xs flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Aucun rendez-vous prévu
                  </p>
                </div>
              </div>
              <Link to="/patient/appointments">
                <Button size="sm" className="rounded-full gap-1 shadow-lg shadow-primary/20 text-xs sm:text-sm">
                  <Zap className="h-3.5 w-3.5" /> Prendre RDV
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Menu grid */}
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {menuItems.map((m, i) => (
            <motion.div key={m.title} variants={item}>
              <Link to={m.link}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative cursor-pointer h-full"
                >
                  <Card className="h-full border border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden">
                    {/* Shine sweep on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <CardContent className="relative p-4 sm:p-5 flex flex-col gap-3">
                      <motion.div
                        className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-md group-hover:shadow-primary/20 transition-shadow"
                        whileHover={{ rotate: 12, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <m.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      </motion.div>
                      <div>
                        <h3 className="font-bold text-primary text-sm">{m.title}</h3>
                        <p className="text-[11px] sm:text-[12px] text-muted-foreground leading-tight mt-0.5">{m.desc}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-primary/40 absolute top-4 right-3 sm:right-4 group-hover:translate-x-1 group-hover:text-primary transition-all" />
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick status bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="glass-effect border border-border/30">
            <CardContent className="p-3 sm:p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-2.5 w-2.5 rounded-full bg-accent"
                />
                <span className="text-xs text-muted-foreground">Système opérationnel</span>
              </div>
              <span className="text-[10px] sm:text-xs text-muted-foreground">
                {now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
              </span>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
