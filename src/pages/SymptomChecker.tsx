import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const bodyParts = [
  { id: 'head', label: 'Head', x: '50%', y: '15%' },
  { id: 'chest', label: 'Chest', x: '50%', y: '35%' },
  { id: 'stomach', label: 'Stomach', x: '50%', y: '50%' },
  { id: 'leftArm', label: 'Left Arm', x: '25%', y: '40%' },
  { id: 'rightArm', label: 'Right Arm', x: '75%', y: '40%' },
  { id: 'leftLeg', label: 'Left Leg', x: '40%', y: '75%' },
  { id: 'rightLeg', label: 'Right Leg', x: '60%', y: '75%' },
];

export default function SymptomChecker() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedParts, setSelectedParts] = useState<string[]>([]);

  const toggleBodyPart = (id: string) => {
    setSelectedParts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (selectedParts.length === 0) {
      toast.error('Please select at least one affected area');
      return;
    }
    toast.success('Analyzing symptoms...');
    // Navigate to consultation or advice
    setTimeout(() => navigate('/consult'), 1500);
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
            <CardTitle className="text-2xl">{t('symptom.title')}</CardTitle>
            <CardDescription>{t('symptom.select')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Interactive Body Diagram */}
            <div className="relative w-full aspect-[3/4] bg-muted/30 rounded-lg border border-border">
              {/* Simple body outline SVG */}
              <svg
                viewBox="0 0 200 300"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Head */}
                <circle cx="100" cy="40" r="25" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="2" />
                
                {/* Torso */}
                <rect x="75" y="65" width="50" height="80" rx="10" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="2" />
                
                {/* Arms */}
                <rect x="35" y="75" width="35" height="60" rx="8" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="2" />
                <rect x="130" y="75" width="35" height="60" rx="8" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="2" />
                
                {/* Legs */}
                <rect x="80" y="150" width="18" height="100" rx="8" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="2" />
                <rect x="102" y="150" width="18" height="100" rx="8" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="2" />
              </svg>

              {/* Interactive Body Parts Buttons */}
              {bodyParts.map((part) => (
                <button
                  key={part.id}
                  onClick={() => toggleBodyPart(part.id)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 px-3 py-2 rounded-full text-xs font-medium transition-all ${
                    selectedParts.includes(part.id)
                      ? 'bg-primary text-primary-foreground shadow-lg scale-110'
                      : 'bg-card border border-border text-foreground hover:bg-accent hover:scale-105'
                  }`}
                  style={{ left: part.x, top: part.y }}
                >
                  {part.label}
                </button>
              ))}
            </div>

            {/* Selected Parts Display */}
            {selectedParts.length > 0 && (
              <div className="p-4 bg-accent/50 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Selected Areas:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedParts.map((partId) => {
                    const part = bodyParts.find(p => p.id === partId);
                    return (
                      <span
                        key={partId}
                        className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm"
                      >
                        {part?.label}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              className="w-full h-14 text-lg bg-primary hover:bg-primary-hover"
              disabled={selectedParts.length === 0}
            >
              Continue to Consultation
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
