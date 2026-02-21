import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PatientMedicalRecord() {
  return (
    <div className="min-h-screen bg-background">
      <header className="glass-effect sticky top-0 z-50">
        <div className="container mx-auto flex items-center gap-4 py-3 px-4">
          <Link to="/patient"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
          <h1 className="text-lg font-bold">Dossier Médical</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="consultations">
          <TabsList>
            <TabsTrigger value="consultations">Consultations</TabsTrigger>
            <TabsTrigger value="results">Résultats</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          <TabsContent value="consultations">
            <Card className="border-dashed border-2 mt-4">
              <CardContent className="p-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Aucune consultation</h3>
                <p className="text-sm text-muted-foreground">Votre historique de consultations apparaîtra ici.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="results">
            <Card className="border-dashed border-2 mt-4">
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">Aucun résultat disponible</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="documents">
            <Card className="border-dashed border-2 mt-4">
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">Aucun document disponible</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
