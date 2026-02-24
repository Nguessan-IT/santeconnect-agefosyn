import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function DoctorPrescriptions() {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <header className="glass-effect sticky top-0 z-50">
        <div className="container mx-auto flex items-center gap-4 py-3 px-4">
          <Link to="/doctor"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
          <h1 className="text-lg font-bold">Ordonnances</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Mes ordonnances</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2"><Plus className="h-4 w-4" /> Nouvelle ordonnance</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
              <DialogHeader>
                <DialogTitle>Créer une ordonnance</DialogTitle>
                <DialogDescription>Remplissez les informations de prescription</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4 overflow-y-auto flex-1">
                <div className="space-y-2">
                  <Label>Patient</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Sélectionner un patient" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Patient exemple</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Médicament</Label>
                  <Input placeholder="Nom du médicament" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Dosage</Label>
                    <Input placeholder="Ex: 500mg" />
                  </div>
                  <div className="space-y-2">
                    <Label>Durée</Label>
                    <Input placeholder="Ex: 7 jours" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Instructions</Label>
                  <Textarea placeholder="Instructions de prise..." rows={4} />
                </div>
              </div>
              <div className="pt-4 border-t">
                <Button className="w-full">Créer l'ordonnance</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Card className="border-dashed border-2">
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Aucune ordonnance</h3>
            <p className="text-sm text-muted-foreground">Vos ordonnances apparaîtront ici.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
