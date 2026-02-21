import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, FileText, MessageSquare, Video, Pill, Activity, Bell, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const menuItems = [
  { icon: Calendar, title: "Rendez-vous", desc: "Gérer vos rendez-vous", link: "/patient/appointments", color: "bg-primary/10 text-primary" },
  { icon: FileText, title: "Dossier médical", desc: "Consultations et résultats", link: "/patient/medical-record", color: "bg-accent/10 text-accent" },
  { icon: MessageSquare, title: "Messages", desc: "Messagerie sécurisée", link: "/patient/messages", color: "bg-health-500/10 text-health-500" },
  { icon: Video, title: "Téléconsultation", desc: "Consultation vidéo", link: "/patient/teleconsultation", color: "bg-primary/10 text-primary" },
  { icon: Pill, title: "Pharmacie", desc: "Ordonnances et médicaments", link: "/patient/pharmacy", color: "bg-accent/10 text-accent" },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function PatientDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <header className="glass-effect sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <h1 className="text-lg font-bold gradient-text">Espace Patient</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button>
            <Link to="/"><Button variant="ghost" size="icon"><LogOut className="h-5 w-5" /></Button></Link>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-full gradient-primary flex items-center justify-center">
              <User className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Bienvenue</h2>
              <p className="text-muted-foreground text-sm">Votre espace santé personnalisé</p>
            </div>
          </div>
        </motion.div>

        <Card className="mb-8 gradient-primary border-0">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <h3 className="text-primary-foreground font-semibold text-lg">Prochain rendez-vous</h3>
              <p className="text-primary-foreground/80 text-sm">Aucun rendez-vous prévu</p>
            </div>
            <Link to="/patient/appointments">
              <Button variant="secondary" size="sm">Prendre RDV</Button>
            </Link>
          </CardContent>
        </Card>

        <motion.div variants={container} initial="hidden" animate="show" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((m) => (
            <motion.div key={m.title} variants={item}>
              <Link to={m.link}>
                <Card className="hover-lift cursor-pointer h-full">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${m.color}`}>
                      <m.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{m.title}</h3>
                      <p className="text-sm text-muted-foreground">{m.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
