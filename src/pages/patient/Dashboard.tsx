import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, FileText, MessageSquare, Video, Pill, Bell, LogOut, User, Heart, Activity, ChevronRight, Shield, Clock, TrendingUp, Zap, Sparkles, Waves } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useCallback } from "react";

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

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } } };
const item = {
  hidden: { opacity: 0, y: 40, scale: 0.9, rotateX: 15 },
  show: { opacity: 1, y: 0, scale: 1, rotateX: 0, transition: { type: "spring" as const, stiffness: 200, damping: 20 } }
};

function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.max(1, Math.floor(1200 / value));
    const timer = setInterval(() => { start += 1; setCount(start); if (start >= value) clearInterval(timer); }, step);
    return () => clearInterval(timer);
  }, [value]);
  return <>{count}</>;
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary-foreground/20"
          style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
          animate={{
            y: [0, -30, 0],
            x: [0, (i % 2 === 0 ? 15 : -15), 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function PulseRing({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="absolute inset-0 rounded-2xl border border-primary-foreground/10"
      animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0, 0.3] }}
      transition={{ duration: 3, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

export default function PatientDashboard() {
  const [tipIndex, setTipIndex] = useState(0);
  const [activeStatIdx, setActiveStatIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTipIndex((i) => (i + 1) % healthTips.length), 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setActiveStatIdx((i) => (i + 1) % stats.length), 2000);
    return () => clearInterval(interval);
  }, []);

  const now = new Date();
  const greeting = now.getHours() < 12 ? "Bonjour" : now.getHours() < 18 ? "Bon après-midi" : "Bonsoir";

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnimatedBackground />

      {/* Header with glowing border */}
      <header className="glass-effect sticky top-0 z-50 border-b border-border/30">
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5), hsl(var(--accent) / 0.5), transparent)" }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
              className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center relative"
            >
              <Heart className="h-4 w-4 text-primary-foreground" />
              <motion.div
                className="absolute inset-0 rounded-lg gradient-primary"
                animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
            <h1 className="text-lg font-bold gradient-text">SantéConnect</h1>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <motion.span
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-destructive"
              />
            </Button>
            <Link to="/"><Button variant="ghost" size="icon"><LogOut className="h-5 w-5" /></Button></Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 relative z-10 space-y-6">
        {/* Welcome hero with particles */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring" as const, stiffness: 120, damping: 15 }}
        >
          <div className="relative rounded-2xl overflow-hidden gradient-primary p-5 sm:p-6 pb-6 sm:pb-8">
            <FloatingParticles />
            <PulseRing />
            <PulseRing delay={1.5} />

            {/* Animated mesh gradient overlay */}
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                background: "radial-gradient(circle at 20% 50%, hsl(var(--accent) / 0.3), transparent 50%), radial-gradient(circle at 80% 20%, hsl(var(--primary-foreground) / 0.1), transparent 40%)"
              }}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Orbiting rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-2 right-2 w-28 h-28 sm:w-36 sm:h-36"
            >
              <div className="absolute inset-0 rounded-full border border-primary-foreground/10" />
              <div className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-primary-foreground/40 shadow-lg shadow-primary-foreground/20" />
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute top-6 right-6 w-16 h-16 sm:w-20 sm:h-20"
            >
              <div className="absolute inset-0 rounded-full border border-dashed border-primary-foreground/10" />
              <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 rounded-full bg-accent/60" />
            </motion.div>

            <div className="relative flex items-center gap-3 sm:gap-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-card/20 backdrop-blur-sm flex items-center justify-center border border-primary-foreground/20 shadow-lg relative"
              >
                <User className="h-7 w-7 sm:h-8 sm:w-8 text-primary-foreground" />
                <motion.div
                  className="absolute -inset-1 rounded-2xl border border-primary-foreground/10"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <div>
                <motion.h2
                  className="text-xl sm:text-2xl font-bold text-primary-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, type: "spring" as const }}
                >
                  {greeting} 👋
                </motion.h2>
                <motion.p
                  className="text-primary-foreground/70 text-xs sm:text-sm flex items-center gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Shield className="h-3.5 w-3.5" /> Votre espace santé sécurisé
                </motion.p>
              </div>
            </div>

            {/* Animated stats with glow */}
            <div className="relative grid grid-cols-3 gap-2 sm:gap-3 mt-5 sm:mt-6">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 30, rotateY: -20 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ delay: 0.4 + i * 0.15, type: "spring" as const }}
                  whileHover={{ scale: 1.08, y: -4 }}
                  className={`relative bg-card/15 backdrop-blur-sm rounded-xl p-2.5 sm:p-3 text-center border transition-all duration-500 ${
                    activeStatIdx === i
                      ? "border-primary-foreground/40 shadow-lg shadow-primary-foreground/10"
                      : "border-primary-foreground/15"
                  }`}
                >
                  {activeStatIdx === i && (
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-primary-foreground/5"
                      layoutId="statHighlight"
                      transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
                    />
                  )}
                  <s.icon className="h-4 w-4 text-primary-foreground/80 mx-auto mb-1 relative z-10" />
                  <p className="text-lg sm:text-xl font-bold text-primary-foreground relative z-10">
                    <AnimatedCounter value={s.value} />
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-primary-foreground/60 relative z-10">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Health tip ticker with shimmer */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, type: "spring" as const }}
        >
          <Card className="border border-accent/30 bg-accent/5 overflow-hidden relative group">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
            />
            <CardContent className="p-3 sm:p-4 flex items-center gap-3 relative">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-accent/10 flex items-center justify-center shrink-0 relative"
              >
                <TrendingUp className="h-4 w-4 text-accent" />
                <motion.div
                  className="absolute inset-0 rounded-full border border-accent/30"
                  animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={tipIndex}
                  initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                  transition={{ duration: 0.4 }}
                  className="text-xs sm:text-sm text-foreground font-medium"
                >
                  {healthTips[tipIndex]}
                </motion.p>
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Next appointment card with electric border */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, type: "spring" as const }}
        >
          <Card className="relative border-2 border-dashed border-primary/20 bg-primary/5 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/10 overflow-hidden group">
            <motion.div
              className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <CardContent className="p-4 sm:p-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.15, 1], boxShadow: ["0 0 0 0 hsl(var(--primary) / 0)", "0 0 20px 4px hsl(var(--primary) / 0.2)", "0 0 0 0 hsl(var(--primary) / 0)"] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
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
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="sm" className="rounded-full gap-1 shadow-lg shadow-primary/20 text-xs sm:text-sm relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                    />
                    <Zap className="h-3.5 w-3.5 relative z-10" /> <span className="relative z-10">Prendre RDV</span>
                  </Button>
                </motion.div>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Menu grid with 3D hover */}
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {menuItems.map((m, i) => (
            <motion.div key={m.title} variants={item}>
              <Link to={m.link}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.03, rotateX: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="group relative cursor-pointer h-full perspective-1000"
                >
                  <Card className="h-full border border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/15 transition-all duration-500 overflow-hidden">
                    {/* Animated gradient border */}
                    <motion.div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.1), transparent, hsl(var(--accent) / 0.1))" }}
                    />
                    {/* Shine sweep */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "200%" }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                    <CardContent className="relative p-4 sm:p-5 flex flex-col gap-3">
                      <motion.div
                        className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-md group-hover:shadow-primary/30 transition-all duration-300 relative"
                        whileHover={{ rotate: 12, scale: 1.15 }}
                        transition={{ type: "spring" as const, stiffness: 400 }}
                      >
                        <m.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                        <motion.div
                          className="absolute inset-0 rounded-xl bg-primary/5"
                          animate={{ scale: [1, 1.2, 1], opacity: [0, 0.3, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        />
                      </motion.div>
                      <div>
                        <h3 className="font-bold text-primary text-sm">{m.title}</h3>
                        <p className="text-[11px] sm:text-[12px] text-muted-foreground leading-tight mt-0.5">{m.desc}</p>
                      </div>
                      <motion.div
                        className="absolute top-4 right-3 sm:right-4"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                      >
                        <ChevronRight className="h-4 w-4 text-primary/40 group-hover:text-primary transition-all" />
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Status bar with live pulse */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="glass-effect border border-border/30 overflow-hidden relative">
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <CardContent className="p-3 sm:p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-2.5 w-2.5 rounded-full bg-accent"
                  />
                  <motion.div
                    animate={{ scale: [1, 2], opacity: [0.4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 h-2.5 w-2.5 rounded-full bg-accent"
                  />
                </div>
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
