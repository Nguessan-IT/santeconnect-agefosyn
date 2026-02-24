import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, FileText, Calendar, Video, Activity, Bell, LogOut, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedBackground from "@/components/AnimatedBackground";

const stats = [
  { label: "Patients aujourd'hui", value: "12", icon: Users, color: "text-primary" },
  { label: "RDV en attente", value: "5", icon: Calendar, color: "text-accent" },
  { label: "Consultations", value: "8", icon: Video, color: "text-health-500" },
];

const menuItems = [
  { icon: Users, title: "Mes patients", desc: "Gérer les dossiers patients", link: "/doctor/patients" },
  { icon: FileText, title: "Ordonnances", desc: "Créer et gérer les prescriptions", link: "/doctor/prescriptions" },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function DoctorDashboard() {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <header className="glass-effect sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-bold gradient-text">Espace Médecin</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button>
            <Link to="/"><Button variant="ghost" size="icon"><LogOut className="h-5 w-5" /></Button></Link>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((s) => (
            <motion.div key={s.label} variants={item} whileHover={{ y: -4, scale: 1.03 }}>
              <Card className="hover-glow shine-effect group">
                <CardContent className="p-4 text-center">
                  <motion.div whileHover={{ rotate: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                    <s.icon className={`h-8 w-8 mx-auto mb-2 ${s.color} group-hover:scale-110 transition-transform`} />
                  </motion.div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="show" className="grid sm:grid-cols-2 gap-4">
          {menuItems.map((m) => (
            <motion.div key={m.title} variants={item}>
              <Link to={m.link}>
                <motion.div whileHover={{ y: -6, scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <Card className="hover-card cursor-pointer h-full group">
                    <CardContent className="p-6 flex items-start gap-4">
                      <motion.div
                        whileHover={{ rotate: 10 }}
                        className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors"
                      >
                        <m.icon className="h-6 w-6 text-primary" />
                      </motion.div>
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">{m.title}</h3>
                        <p className="text-sm text-muted-foreground">{m.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
