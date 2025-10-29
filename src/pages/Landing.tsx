import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Button } from '@/components/ui/button';
import { Heart, Phone, Users, Stethoscope } from 'lucide-react';
import heroImage from '@/assets/hero-healthcare.jpg';

export default function Landing() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">ArogyaSeva</span>
          </div>
          <LanguageToggle />
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container px-4 py-12 md:py-20">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            {/* Content */}
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                {t('landing.title')}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                {t('landing.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary-hover"
                  onClick={() => navigate('/login')}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {t('landing.login')}
                </Button>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-accent/50">
                  <Stethoscope className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">Expert Doctors</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-accent/50">
                  <Users className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">24/7 Support</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-border">
                <img 
                  src={heroImage} 
                  alt="Healthcare illustration" 
                  className="w-full h-auto object-cover"
                  loading="eager"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="bg-muted/30 py-12 md:py-16">
          <div className="container px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Works on 2G/3G</h3>
                <p className="text-sm text-muted-foreground">Optimized for slow connections</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Simple & Easy</h3>
                <p className="text-sm text-muted-foreground">Large buttons, clear interface</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Stethoscope className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Expert Care</h3>
                <p className="text-sm text-muted-foreground">Qualified doctors available</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 ArogyaSeva. Empowering rural healthcare.</p>
        </div>
      </footer>
    </div>
  );
}
