import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, ArrowLeft, Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { toast } from 'sonner';

export default function Appointment() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleBookAppointment = () => {
    if (!date) {
      toast.error('Please select a date');
      return;
    }
    toast.success('Appointment request sent!');
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
            <CardTitle className="text-2xl">{t('appointment.title')}</CardTitle>
            <CardDescription>Select your preferred date and time</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Available Time Slots</h4>
              <div className="grid grid-cols-3 gap-2">
                {['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'].map(time => (
                  <Button key={time} variant="outline" className="h-12">
                    {time}
                  </Button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleBookAppointment}
              className="w-full h-14 text-lg bg-primary hover:bg-primary-hover"
            >
              <CalendarIcon className="mr-2 h-5 w-5" />
              Book Appointment
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
