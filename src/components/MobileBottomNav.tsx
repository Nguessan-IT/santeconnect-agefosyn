import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Calendar, MessageSquare, Video, User, Users, FileText, Building2, BarChart3, Stethoscope, Pill } from "lucide-react";

type NavItem = { icon: React.ElementType; label: string; path: string };

const patientNav: NavItem[] = [
  { icon: Home, label: "Accueil", path: "/patient" },
  { icon: Calendar, label: "RDV", path: "/patient/appointments" },
  { icon: Video, label: "Téléconsult", path: "/patient/teleconsultation" },
  { icon: MessageSquare, label: "Messages", path: "/patient/messages" },
  { icon: User, label: "Dossier", path: "/patient/medical-record" },
];

const doctorNav: NavItem[] = [
  { icon: Home, label: "Accueil", path: "/doctor" },
  { icon: Users, label: "Patients", path: "/doctor/patients" },
  { icon: FileText, label: "Ordonnances", path: "/doctor/prescriptions" },
];

const adminNav: NavItem[] = [
  { icon: Home, label: "Accueil", path: "/admin" },
  { icon: Building2, label: "Centres", path: "/admin/hospitals" },
  { icon: BarChart3, label: "Analytique", path: "/admin/analytics" },
  { icon: FileText, label: "Rapports", path: "/admin/reports" },
];

interface MobileBottomNavProps {
  role: "patient" | "doctor" | "admin";
}

export default function MobileBottomNav({ role }: MobileBottomNavProps) {
  const location = useLocation();
  const items = role === "patient" ? patientNav : role === "doctor" ? doctorNav : adminNav;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
      <div className="glass-effect border-t border-border/40 px-2 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around py-1.5">
          {items.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative flex flex-col items-center gap-0.5 py-1.5 px-2 min-w-[3.5rem]"
              >
                {isActive && (
                  <motion.div
                    layoutId={`bottomnav-${role}`}
                    className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <motion.div
                  animate={isActive ? { scale: 1.15, y: -2 } : { scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <item.icon className={`h-5 w-5 transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                </motion.div>
                <span className={`text-[10px] font-medium transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
