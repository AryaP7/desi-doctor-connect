import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Heart, 
  LogOut, 
  Activity, 
  Video, 
  FileText, 
  Calendar, 
  Pill 
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const features = [
    {
      title: t('dashboard.symptomCheck'),
      icon: Activity,
      path: '/symptom',
      color: 'bg-primary/10 text-primary',
    },
    {
      title: t('dashboard.doctorConnect'),
      icon: Video,
      path: '/consult',
      color: 'bg-secondary/10 text-secondary',
    },
    {
      title: t('dashboard.prescriptions'),
      icon: FileText,
      path: '/prescriptions',
      color: 'bg-success/10 text-success',
    },
    {
      title: t('dashboard.appointment'),
      icon: Calendar,
      path: '/appointment',
      color: 'bg-warning/10 text-warning',
    },
    {
      title: t('dashboard.dosage'),
      icon: Pill,
      path: '/dosage',
      color: 'bg-destructive/10 text-destructive',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">ArogyaSeva</span>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">{t('dashboard.logout')}</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {t('dashboard.welcome')}{user?.phone ? `, +91-${user.phone}` : ''}
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose a service below
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.path}
              className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 active:scale-100"
              onClick={() => navigate(feature.path)}
            >
              <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Info */}
        <div className="mt-8 p-6 bg-destructive/10 border border-destructive/20 rounded-lg">
          <h3 className="text-lg font-semibold text-destructive mb-2">Emergency Contact</h3>
          <p className="text-sm text-muted-foreground mb-3">For medical emergencies, call:</p>
          <a 
            href="tel:108" 
            className="inline-flex items-center gap-2 text-lg font-bold text-destructive hover:underline"
          >
            108 (Ambulance)
          </a>
        </div>
      </main>
    </div>
  );
}
