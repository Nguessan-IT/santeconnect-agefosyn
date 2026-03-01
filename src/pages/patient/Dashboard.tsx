import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, FileText, MessageSquare, Video, Pill, Bell, LogOut, User, Heart, Activity, ChevronRight, Shield } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const menuItems = [
  { icon: Calendar, title: "Rendez-vous", desc: "Gérer vos rendez-vous", link: "/patient/appointments", gradient: "from-[hsl(199,89%,48%)] to-[hsl(199,89%,32%)]" },
  { icon: FileText, title: "Dossier médical", desc: "Consultations et résultats", link: "/patient/medical-record", gradient: "from-[hsl(160,60%,45%)] to-[hsl(160,60%,32%)]" },
  { icon: MessageSquare, title: "Messages", desc: "Messagerie sécurisée", link: "/patient/messages", gradient: "from-[hsl(280,70%,55%)] to-[hsl(280,70%,40%)]" },
  { icon: Video, title: "Téléconsultation", desc: "Consultation vidéo", link: "/patient/teleconsultation", gradient: "from-[hsl(340,75%,55%)] to-[hsl(340,75%,40%)]" },
  { icon: Pill, title: "Pharmacie", desc: "Ordonnances et médicaments", link: "/patient/pharmacy", gradient: "from-[hsl(30,90%,55%)] to-[hsl(30,90%,40%)]" },
];

const stats = [
  { label: "Consultations", value: "12", icon: Activity },
  { label: "Ordonnances", value: "5", icon: FileText },
  { label: "Messages", value: "3", icon: MessageSquare },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 30, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 200, damping: 20 } } };

export default function PatientDashboard() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnimatedBackground />

      {/* Header */}
      <header className="glass-effect sticky top-0 z-50 border-b border-border/30">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
              <Heart className="h-4 w-4 text-primary-foreground" />
            </div>
            <h1 className="text-lg font-bold gradient-text">SantéConnect</h1>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-destructive animate-pulse" />
            </Button>
            <Link to="/"><Button variant="ghost" size="icon"><LogOut className="h-5 w-5" /></Button></Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 relative z-10">
        {/* Welcome hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="mb-6"
        >
          <div className="relative rounded-2xl overflow-hidden gradient-primary p-6 pb-8">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZG90cyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIxLjUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9InVybCgjZG90cykiLz48L3N2Zz4=')] opacity-50" />
            <div className="relative flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-lg"
              >
                <User className="h-8 w-8 text-primary-foreground" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-primary-foreground">Bienvenue 👋</h2>
                <p className="text-primary-foreground/70 text-sm flex items-center gap-1">
                  <Shield className="h-3.5 w-3.5" /> Votre espace santé sécurisé
                </p>
              </div>
            </div>

            {/* Stats row */}
            <div className="relative grid grid-cols-3 gap-3 mt-6">
              {stats.map((s) => (
                <motion.div
                  key={s.label}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20"
                >
                  <s.icon className="h-4 w-4 text-primary-foreground/80 mx-auto mb-1" />
                  <p className="text-xl font-bold text-primary-foreground">{s.value}</p>
                  <p className="text-[11px] text-primary-foreground/60">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Next appointment card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="mb-6"
        >
          <Card className="border-2 border-dashed border-primary/20 bg-primary/5 hover:border-primary/40 transition-colors">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Prochain rendez-vous</h3>
                  <p className="text-muted-foreground text-xs">Aucun rendez-vous prévu</p>
                </div>
              </div>
              <Link to="/patient/appointments">
                <Button size="sm" className="rounded-full gap-1 shadow-lg shadow-primary/20">
                  Prendre RDV <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Menu grid */}
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((m) => (
            <motion.div key={m.title} variants={item}>
              <Link to={m.link}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer h-full"
                >
                  <div className="absolute inset-0 bg-primary/5 rounded-2xl" />
                  <div className="relative p-5 flex flex-col gap-3">
                    <motion.div
                      className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-md group-hover:shadow-lg transition-shadow"
                      whileHover={{ rotate: 10 }}
                    >
                      <m.icon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-primary text-sm">{m.title}</h3>
                      <p className="text-[12px] text-muted-foreground leading-tight mt-0.5">{m.desc}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-primary/40 absolute top-5 right-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
