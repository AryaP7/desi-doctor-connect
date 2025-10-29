import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, ArrowLeft, Plus, Bell, Calendar } from 'lucide-react';

export default function DosageTracker() {
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
            <CardTitle className="text-2xl">{t('dosage.title')}</CardTitle>
            <CardDescription>Track your medication schedule</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <Button className="h-20 flex-col gap-2 bg-primary hover:bg-primary-hover">
                <Plus className="h-6 w-6" />
                <span className="text-sm">Add Medicine</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Bell className="h-6 w-6" />
                <span className="text-sm">Set Reminder</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Calendar className="h-6 w-6" />
                <span className="text-sm">View Schedule</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Today's Schedule</h3>
          <Card>
            <CardContent className="p-4">
              <p className="text-center text-muted-foreground py-8">
                No medications scheduled for today
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Home Remedies Section */}
        <Card className="mt-6 border-warning/20 bg-warning/5">
          <CardHeader>
            <CardTitle className="text-lg">Home Remedies & Ayurvedic Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Explore affordable and traditional healthcare options
            </p>
            <Button variant="outline" className="mt-4 w-full">
              View Recommendations
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
