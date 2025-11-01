'use client';

import { Button } from '@/components/ui/button';

export default function WeddingLocationHero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative h-[600px] overflow-hidden pt-16 md:h-[700px] md:pt-0">
      <div className="absolute inset-0">
        <img
          src="/trauzimmer/schild_kopie.jpg"
          alt="Trauzimmer des Standesamtes Westerstede"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30" />
      </div>

      <div className="relative flex h-full flex-col items-center justify-end px-6 pb-8 text-center md:px-8 md:pb-12">
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            size="lg"
            variant="outline"
            className="min-w-[200px] border-white bg-white/5 px-8 py-6 text-lg text-white shadow-lg backdrop-blur-sm hover:bg-white/90 md:text-xl"
            onClick={() => scrollToSection('kontakt')}
          >
            Kontakt aufnehmen
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="min-w-[200px] border-white bg-white/5 px-8 py-6 text-lg text-white shadow-lg backdrop-blur-sm hover:bg-white/90 md:text-xl"
            onClick={() => scrollToSection('galerie')}
          >
            Galerie ansehen
          </Button>
        </div>
      </div>
    </section>
  );
}
