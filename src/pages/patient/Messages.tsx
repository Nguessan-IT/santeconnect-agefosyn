import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageSquare, Send, Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AnimatedBackground from "@/components/AnimatedBackground";
import { toast } from "sonner";

export default function PatientMessages() {
  const [openNew, setOpenNew] = useState(false);
  const [conversations, setConversations] = useState<Array<{ doctor: string; specialty: string; lastMessage: string }>>([]);
  const [activeConv, setActiveConv] = useState<number | null>(null);
  const [messages, setMessages] = useState<Record<number, Array<{ text: string; from: "me" | "doctor" }>>>({});
  const [input, setInput] = useState("");
  const [newDoctor, setNewDoctor] = useState("");
  const [newSpecialty, setNewSpecialty] = useState("");

  const handleNewConversation = () => {
    if (!newDoctor) { toast.error("Choisissez un médecin."); return; }
    const idx = conversations.length;
    setConversations([...conversations, { doctor: newDoctor, specialty: newSpecialty, lastMessage: "Nouvelle conversation" }]);
    setMessages({ ...messages, [idx]: [] });
    setActiveConv(idx);
    setOpenNew(false);
    setNewDoctor("");
    setNewSpecialty("");
    toast.success("Conversation créée !");
  };

  const handleSend = () => {
    if (!input.trim() || activeConv === null) return;
    const updated = { ...messages };
    updated[activeConv] = [...(updated[activeConv] || []), { text: input, from: "me" }];
    setMessages(updated);
    const convs = [...conversations];
    convs[activeConv].lastMessage = input;
    setConversations(convs);
    setInput("");
    toast.success("Message envoyé");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <AnimatedBackground />
      <header className="glass-effect sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <div className="flex items-center gap-4">
            <Link to="/patient"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
            <h1 className="text-lg font-bold">Messages</h1>
          </div>
          <Dialog open={openNew} onOpenChange={setOpenNew}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1"><Plus className="h-4 w-4" /> Nouveau</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Nouvelle conversation</DialogTitle>
                <DialogDescription>Envoyez un message à un professionnel de santé</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Spécialité</Label>
                  <Select value={newSpecialty} onValueChange={setNewSpecialty}>
                    <SelectTrigger><SelectValue placeholder="Filtrer par spécialité" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="generaliste">Médecine générale</SelectItem>
                      <SelectItem value="cardiologue">Cardiologie</SelectItem>
                      <SelectItem value="dermatologue">Dermatologie</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Médecin *</Label>
                  <Input placeholder="Nom du médecin" value={newDoctor} onChange={(e) => setNewDoctor(e.target.value)} />
                </div>
              </div>
              <Button className="w-full" onClick={handleNewConversation}>Démarrer la conversation</Button>
            </DialogContent>
          </Dialog>
        </div>
      </header>
      <main className="container mx-auto px-4 py-4 flex-1 flex flex-col">
        {conversations.length === 0 && activeConv === null ? (
          <Card className="flex-1 flex flex-col items-center justify-center">
            <CardContent className="p-6 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4 mx-auto" />
              <h3 className="font-semibold mb-2">Aucun message</h3>
              <p className="text-sm text-muted-foreground mb-4">Vos conversations avec les médecins apparaîtront ici.</p>
              <Button onClick={() => setOpenNew(true)} className="gap-2"><Plus className="h-4 w-4" /> Nouvelle conversation</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="flex gap-4 flex-1 min-h-0">
            {/* Conversations list */}
            <div className="w-72 shrink-0 space-y-2 overflow-y-auto">
              {conversations.map((c, i) => (
                <Card key={i} className={`cursor-pointer transition-colors ${activeConv === i ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`} onClick={() => setActiveConv(i)}>
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">Dr. {c.doctor}</p>
                      <p className="text-xs text-muted-foreground truncate">{c.lastMessage}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* Chat area */}
            <Card className="flex-1 flex flex-col">
              {activeConv !== null ? (
                <>
                  <div className="p-3 border-b flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium text-sm">Dr. {conversations[activeConv].doctor}</span>
                  </div>
                  <CardContent className="flex-1 p-4 overflow-y-auto space-y-3">
                    {(messages[activeConv] || []).map((m, i) => (
                      <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[70%] px-3 py-2 rounded-2xl text-sm ${m.from === "me" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                          {m.text}
                        </div>
                      </div>
                    ))}
                    {(messages[activeConv] || []).length === 0 && (
                      <p className="text-center text-muted-foreground text-sm py-8">Commencez la conversation...</p>
                    )}
                  </CardContent>
                  <div className="p-4 border-t flex gap-2">
                    <Input placeholder="Écrire un message..." className="flex-1" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} />
                    <Button size="icon" onClick={handleSend}><Send className="h-4 w-4" /></Button>
                  </div>
                </>
              ) : (
                <CardContent className="flex-1 flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">Sélectionnez une conversation</p>
                </CardContent>
              )}
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
