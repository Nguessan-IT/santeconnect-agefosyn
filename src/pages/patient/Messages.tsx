import { Link } from "react-router-dom";
import { ArrowLeft, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function PatientMessages() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="glass-effect sticky top-0 z-50">
        <div className="container mx-auto flex items-center gap-4 py-3 px-4">
          <Link to="/patient"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
          <h1 className="text-lg font-bold">Messages</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 flex-1 flex flex-col">
        <Card className="flex-1 flex flex-col">
          <CardContent className="p-6 flex-1 flex flex-col items-center justify-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">Aucun message</h3>
            <p className="text-sm text-muted-foreground">Vos conversations avec les médecins apparaîtront ici.</p>
          </CardContent>
          <div className="p-4 border-t flex gap-2">
            <Input placeholder="Écrire un message..." className="flex-1" />
            <Button size="icon"><Send className="h-4 w-4" /></Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
