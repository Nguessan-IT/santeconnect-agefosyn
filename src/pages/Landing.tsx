import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Calendar, Video, MessageSquare, Shield, Users, ArrowRight, Activity, Stethoscope, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  { icon: Calendar, title: "Rendez-vous en ligne", desc: "Prenez vos rendez-vous médicaux en quelques clics, 24h/24." },
  { icon: Video, title: "Téléconsultation", desc: "Consultez votre médecin par vidéo, où que vous soyez." },
  { icon: MessageSquare, title: "Messagerie sécurisée", desc: "Échangez avec vos professionnels de santé en toute confidentialité." },
  { icon: Shield, title: "Dossier médical", desc: "Accédez à votre dossier médical complet et sécurisé." },
  { icon: Pill, title: "Pharmacie connectée", desc: "Suivez vos ordonnances et commandez vos médicaments." },
  { icon: Users, title: "Coordination", desc: "Une coordination fluide entre patients, médecins et centres." },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect">
        <div className="container mx-auto flex items-center justify-between py-4 px-4">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center icon-float">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold gradient-text">SantéConnect</span>
          </motion.div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="link-underline hover:text-foreground transition-colors py-1">Fonctionnalités</a>
            <a href="#about" className="link-underline hover:text-foreground transition-colors py-1">À propos</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost" className="hover-scale">Connexion</Button>
            </Link>
            <Link to="/auth">
              <Button className="hover-glow">Commencer</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-medical-50 via-background to-health-50 opacity-50" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Activity className="h-4 w-4" />
                Plateforme de santé connectée
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Votre santé, <span className="gradient-text">connectée</span> et simplifiée
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                SantéConnect AGEFOSYN digitalise la coordination médicale entre patients, médecins et centres de santé à travers une interface unifiée et sécurisée.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/auth">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="gap-2 hover-glow shadow-lg shadow-primary/25">
                      Créer un compte <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/auth">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" variant="outline" className="hover-lift">Se connecter</Button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
          {/* Floating icons */}
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-10 left-10 hidden lg:block">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Stethoscope className="h-8 w-8 text-primary" />
            </div>
          </motion.div>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute bottom-10 right-10 hidden lg:block">
            <div className="h-16 w-16 rounded-2xl bg-accent/10 flex items-center justify-center">
              <Heart className="h-8 w-8 text-accent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Fonctionnalités principales</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Une plateforme complète pour gérer tous vos besoins de santé.
            </p>
          </div>
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <motion.div key={f.title} variants={item}>
                <Card className="hover-card shine-effect h-full border-border/50 group cursor-pointer">
                  <CardContent className="p-6">
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-lg shadow-primary/20"
                    >
                      <f.icon className="h-6 w-6 text-primary-foreground" />
                    </motion.div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="gradient-primary p-12 text-center border-0 shine-effect">
              <h2 className="text-3xl font-bold text-primary-foreground mb-4">Prêt à digitaliser votre santé ?</h2>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Rejoignez SantéConnect et accédez à vos soins en toute simplicité.
              </p>
              <Link to="/auth">
                <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} className="inline-block">
                  <Button size="lg" variant="secondary" className="gap-2 hover-glow shadow-xl">
                    Commencer maintenant <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              </Link>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 SantéConnect AGEFOSYN. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
