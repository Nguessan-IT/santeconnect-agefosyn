import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Mail, Lock, User, Phone, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export default function Auth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerRole, setRegisterRole] = useState("patient");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      if (error) throw error;
      toast.success("Connexion réussie !");
      // Redirect based on role - for now default to patient
      navigate("/patient");
    } catch (error: any) {
      toast.error(error.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: registerEmail,
        password: registerPassword,
        options: {
          data: {
            full_name: registerName,
            phone: registerPhone,
            role: registerRole,
          },
        },
      });
      if (error) throw error;
      toast.success("Compte créé ! Vérifiez votre email.");
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-medical-50 via-background to-health-50 p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4" /> Retour à l'accueil
          </Link>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold gradient-text">SantéConnect</span>
          </div>
        </div>

        <Card className="glass-effect">
          <CardHeader className="text-center">
            <CardTitle>Bienvenue</CardTitle>
            <CardDescription>Connectez-vous ou créez un compte</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Connexion</TabsTrigger>
                <TabsTrigger value="register">Inscription</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input type="email" placeholder="votre@email.com" className="pl-10" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Mot de passe</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input type="password" placeholder="••••••••" className="pl-10" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Connexion..." : "Se connecter"}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Nom complet</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Jean Dupont" className="pl-10" value={registerName} onChange={(e) => setRegisterName(e.target.value)} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input type="email" placeholder="votre@email.com" className="pl-10" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Téléphone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input type="tel" placeholder="+225 XX XX XX XX" className="pl-10" value={registerPhone} onChange={(e) => setRegisterPhone(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Rôle</Label>
                    <Select value={registerRole} onValueChange={setRegisterRole}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="patient">Patient</SelectItem>
                        <SelectItem value="medecin">Médecin</SelectItem>
                        <SelectItem value="admin">Administrateur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Mot de passe</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input type="password" placeholder="••••••••" className="pl-10" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} required />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Création..." : "Créer un compte"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
