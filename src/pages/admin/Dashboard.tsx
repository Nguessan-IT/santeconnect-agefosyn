import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, BarChart3, FileText, Users, Settings, Bell, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { label: "Centres actifs", value: "3", icon: Building2 },
  { label: "Utilisateurs", value: "156", icon: Users },
  { label: "RDV ce mois", value: "423", icon: BarChart3 },
];

const menuItems = [
  { icon: Building2, title: "Centres médicaux", desc: "Gérer les établissements", link: "/admin/hospitals" },
  { icon: BarChart3, title: "Analytique", desc: "Statistiques et rapports", link: "/admin/analytics" },
  { icon: FileText, title: "Rapports", desc: "Rapports d'activité", link: "/admin/reports" },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <header className="glass-effect sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-bold gradient-text">Administration</h1>
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
            <motion.div key={s.label} variants={item}>
              <Card>
                <CardContent className="p-4 text-center">
                  <s.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((m) => (
            <Link key={m.title} to={m.link}>
              <Card className="hover-lift cursor-pointer h-full">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <m.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{m.title}</h3>
                    <p className="text-sm text-muted-foreground">{m.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
