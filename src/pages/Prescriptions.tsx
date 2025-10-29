import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, ArrowLeft, Download, Upload, QrCode, FileText } from 'lucide-react';

export default function Prescriptions() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/home')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">ArogyaSeva</span>
          </div>
          <LanguageToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container px-4 py-8 max-w-2xl mx-auto">
        <Card className="shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">{t('prescription.title')}</CardTitle>
            <CardDescription>Manage and view your prescriptions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-24 flex-col gap-2">
                <Upload className="h-8 w-8" />
                <span className="text-sm">Upload New</span>
              </Button>
              <Button variant="outline" className="h-24 flex-col gap-2">
                <Download className="h-8 w-8" />
                <span className="text-sm">Download</span>
              </Button>
              <Button variant="outline" className="h-24 flex-col gap-2">
                <QrCode className="h-8 w-8" />
                <span className="text-sm">Generate QR</span>
              </Button>
              <Button variant="outline" className="h-24 flex-col gap-2">
                <FileText className="h-8 w-8" />
                <span className="text-sm">Scan Image</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Prescriptions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Recent Prescriptions</h3>
          <Card>
            <CardContent className="p-4">
              <p className="text-center text-muted-foreground py-8">
                No prescriptions available
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
