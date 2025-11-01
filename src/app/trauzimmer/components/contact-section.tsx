import { Clock, Mail, MapPin, Phone, User } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

export default function ContactSection() {
  return (
    <section id="kontakt" className="bg-secondary/30 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Kontakt</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Nehmen Sie Kontakt mit uns auf für weitere Informationen
          </p>
        </div>

        <Card className="overflow-hidden border-border/50">
          <div className="grid md:grid-cols-[2fr,1fr]">
            {/* Left Section - Location Details */}
            <CardContent className="space-y-8 p-8 md:p-12">
              <div className="mb-6">
                <h3 className="mb-2 text-2xl font-semibold text-foreground">Informationen zur Location</h3>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">Adresse</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Am Damm 62
                    <br />
                    26655 Westerstede
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">Telefon</h3>
                  <a
                    href="tel:+491234567890"
                    className="text-lg text-muted-foreground transition-colors hover:text-primary"
                  >
                    +49 123 456 7890
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">Besichtigungszeiten</h3>
                  <p className="leading-relaxed text-muted-foreground">Nach telefonischer Vereinbarung</p>
                </div>
              </div>
            </CardContent>

            {/* Right Section - Contact Person */}
            <CardContent className="flex flex-col justify-center border-l border-border/50 bg-primary/5 p-8 md:p-12">
              <div className="space-y-4 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h3 className="mb-1 text-xl font-semibold text-foreground">Katja Rottmann</h3>
                  <p className="mb-4 text-sm text-muted-foreground">Ansprechpartnerin</p>
                  <div className="flex flex-col gap-3">
                    <a
                      href="tel:+491727807878"
                      className="inline-flex items-center justify-center gap-2 font-medium text-primary transition-colors hover:text-primary/80"
                    >
                      <Phone className="h-4 w-4" />
                      <span>Anrufen</span>
                    </a>
                    <a
                      href="mailto:katja.rottmann@t-online.de"
                      className="inline-flex items-center justify-center gap-2 font-medium text-primary transition-colors hover:text-primary/80"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Mail schreiben</span>
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  );
}
