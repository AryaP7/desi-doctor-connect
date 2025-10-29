import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Button } from '@/components/ui/button';
import { Heart, Phone, Users, Stethoscope, Shield } from 'lucide-react';
import heroImage from '@/assets/hero-healthcare.jpg';

export default function Landing() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        {/* Tricolor accent strip */}
        <div className="h-1 w-full">
          <div className="h-full w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />
        </div>
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            {/* Official MoHFW emblem */}
            <img
              src="https://esanjeevani.mohfw.gov.in/assets/images/mohfw.svg"
              alt="Ministry of Health & Family Welfare, Government of India"
              className="h-8 w-auto"
              loading="eager"
              decoding="async"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-foreground">ArogyaSeva</span>
                <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-semibold bg-[#0a5eb7]/10 text-[#0a5eb7] border border-[#0a5eb7]/20">
                  <Shield className="h-3.5 w-3.5" /> GOVT
                </span>
              </div>
              <span className="text-xs text-muted-foreground">Government of India initiative • Ministry of Health & Family Welfare</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <img
              src="https://esanjeevani.mohfw.gov.in/assets/images/azadi_mahotsav.svg"
              alt="Azadi Ka Amrit Mahotsav logo"
              className="h-10 w-auto object-contain shrink-0 hidden sm:block select-none [filter:contrast(1.05)_brightness(1.1)] drop-shadow-sm"
              loading="eager"
              decoding="async"
            />
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container px-4 pt-8 pb-4 md:pt-12 md:pb-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            {/* Content */}
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                {t('landing.title')}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                {t('landing.subtitle')}
              </p>
              {/* Trust language banner */}
              <div className="rounded-lg border border-border bg-card p-3 text-sm text-foreground/90">
                <p>
                  {t('landing.trust.prefix')} <span className="font-semibold">{t('landing.trust.mission')}</span>. {t('landing.trust.suffix')}
                </p>
              </div>
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
                <div className="flex items-center gap-3 p-4 rounded-lg bg-[#0a5eb7]/5 border border-[#0a5eb7]/20">
                  <Stethoscope className="h-6 w-6 text-[#0a5eb7]" />
                  <span className="text-sm font-medium">Free Expert Doctors</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-[#138808]/5 border border-[#138808]/20">
                  <Users className="h-6 w-6 text-[#138808]" />
                  <span className="text-sm font-medium">24/7 Public Support</span>
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

        {/* Accessibility & Benefits Section */}
        <section className="bg-muted/30 pt-4 pb-3 md:pt-6 md:pb-4">
          <div className="container px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Available without high-speed internet</h3>
                <p className="text-sm text-muted-foreground">Optimized for 2G/3G and rural connectivity</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Simple & Accessible</h3>
                <p className="text-sm text-muted-foreground">Large buttons, clear interface, bilingual support</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Stethoscope className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Public Benefit Service</h3>
                <p className="text-sm text-muted-foreground">Free or low-cost consultations by qualified doctors</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container px-4 text-sm text-muted-foreground">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1">
              <p className="text-foreground font-semibold">Powered by National Telemedicine Service • Digital India</p>
              <p>Government of India • Ministry of Health & Family Welfare</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a className="underline underline-offset-4 hover:text-foreground" href="tel:108">108 Ambulance</a>
              <span aria-hidden>•</span>
              <a className="underline underline-offset-4 hover:text-foreground" href="https://www.mohfw.gov.in/" target="_blank" rel="noreferrer">MoHFW</a>
              <span aria-hidden>•</span>
              <a className="underline underline-offset-4 hover:text-foreground" href="https://abdm.gov.in/" target="_blank" rel="noreferrer">ABDM</a>
              <span aria-hidden>•</span>
              <a className="underline underline-offset-4 hover:text-foreground" href="https://www.nhp.gov.in/" target="_blank" rel="noreferrer">Public Health Guides</a>
            </div>
          </div>
          {/* Government & Health Organizations Logos */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            <a
              href="https://www.meity.gov.in/"
              target="_blank"
              rel="noreferrer"
              title="Ministry of Electronics and Information Technology"
              aria-label="Ministry of Electronics and Information Technology"
            >
              <img
                src="https://esanjeevani.mohfw.gov.in/assets/images/footer/miety.svg"
                alt="Ministry of Electronics and Information Technology Logo"
                className="h-10 w-auto object-contain opacity-90 hover:opacity-100 transition"
                loading="lazy"
                decoding="async"
              />
            </a>
            <a
              href="https://main.ayush.gov.in/"
              target="_blank"
              rel="noreferrer"
              title="Ministry of Ayush"
              aria-label="Ministry of Ayush"
            >
              <img
                src="https://esanjeevani.mohfw.gov.in/assets/images/footer/ayush.svg"
                alt="Ministry of Ayush Logo"
                className="h-10 w-auto object-contain opacity-90 hover:opacity-100 transition"
                loading="lazy"
                decoding="async"
              />
            </a>
            <a
              href="https://pmjay.gov.in/"
              target="_blank"
              rel="noreferrer"
              title="Pradhan Mantri Jan Arogya Yojana (PM-JAY)"
              aria-label="Pradhan Mantri Jan Arogya Yojana (PM-JAY)"
            >
              <img
                src="https://esanjeevani.mohfw.gov.in/assets/images/footer/pmjay.svg"
                alt="PM-JAY Logo"
                className="h-10 w-auto object-contain opacity-90 hover:opacity-100 transition"
                loading="lazy"
                decoding="async"
              />
            </a>
            <a
              href="https://nhm.gov.in/"
              target="_blank"
              rel="noreferrer"
              title="National Rural Health Mission"
              aria-label="National Rural Health Mission"
            >
              <img
                src="https://esanjeevani.mohfw.gov.in/assets/images/footer/nhm.svg"
                alt="National Rural Health Mission Logo"
                className="h-10 w-auto object-contain opacity-90 hover:opacity-100 transition"
                loading="lazy"
                decoding="async"
              />
            </a>
            <a
              href="https://www.cdac.in/"
              target="_blank"
              rel="noreferrer"
              title="Centre for Development of Advanced Computing (C-DAC)"
              aria-label="Centre for Development of Advanced Computing (C-DAC)"
            >
              <img
                src="https://esanjeevani.mohfw.gov.in/assets/images/footer/cdac.svg"
                alt="C-DAC Logo"
                className="h-10 w-auto object-contain opacity-90 hover:opacity-100 transition"
                loading="lazy"
                decoding="async"
              />
            </a>
            <a
              href="https://nha.gov.in/"
              target="_blank"
              rel="noreferrer"
              title="National Health Authority"
              aria-label="National Health Authority"
            >
              <img
                src="https://esanjeevani.mohfw.gov.in/assets/images/footer/nha.svg"
                alt="National Health Authority Logo"
                className="h-10 w-auto object-contain opacity-90 hover:opacity-100 transition"
                loading="lazy"
                decoding="async"
              />
            </a>
            <a
              href="https://labour.gov.in/"
              target="_blank"
              rel="noreferrer"
              title="Ministry of Labour and Employment"
              aria-label="Ministry of Labour and Employment"
            >
              <img
                src="https://esanjeevani.mohfw.gov.in/assets/images/footer/labour.svg"
                alt="Ministry of Labour and Employment Logo"
                className="h-10 w-auto object-contain opacity-90 hover:opacity-100 transition"
                loading="lazy"
                decoding="async"
              />
            </a>
          </div>

          <div className="mt-6 text-center text-xs text-muted-foreground">
            Designed, Deployed, Operationalized and Maintained by Centre for Development of Advanced Computing (C-DAC) |
            © 2025 ArogyaSeva. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
