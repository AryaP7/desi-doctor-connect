import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, ArrowLeft, Video, Phone, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

export default function DoctorConsult() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleConsultType = (type: string) => {
    toast.info(`Connecting to doctor via ${type}...`);
  };

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
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">{t('consult.title')}</CardTitle>
            <CardDescription>Choose your preferred consultation method</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => handleConsultType('video')}
              className="w-full h-20 text-lg bg-primary hover:bg-primary-hover justify-start px-6"
            >
              <Video className="mr-4 h-8 w-8" />
              <div className="text-left">
                <div className="font-semibold">Video Call</div>
                <div className="text-sm opacity-90">Face-to-face consultation</div>
              </div>
            </Button>

            <Button
              onClick={() => handleConsultType('audio')}
              className="w-full h-20 text-lg bg-secondary hover:bg-secondary-hover justify-start px-6"
            >
              <Phone className="mr-4 h-8 w-8" />
              <div className="text-left">
                <div className="font-semibold">Audio Call</div>
                <div className="text-sm opacity-90">Voice consultation only</div>
              </div>
            </Button>

            <Button
              onClick={() => handleConsultType('text')}
              variant="outline"
              className="w-full h-20 text-lg justify-start px-6"
            >
              <MessageSquare className="mr-4 h-8 w-8" />
              <div className="text-left">
                <div className="font-semibold">Text Chat</div>
                <div className="text-sm text-muted-foreground">Message-based consultation</div>
              </div>
            </Button>

            <div className="mt-6 p-4 bg-accent/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> If your connection drops during consultation, 
                you can reconnect or switch to text chat mode.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
