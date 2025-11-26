import { Calendar, Clock, Download, MapPin, Utensils } from 'lucide-react';
import Image from 'next/image';

import BackToDashboardButton from '@/components/back-to-dashboard-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Knobeln() {
  return (
    <div className="container mx-auto bg-westerloyBackground px-4 py-8">
      <BackToDashboardButton />
      <Card className="mt-8 overflow-hidden bg-westerloyBackground shadow-lg">
        {/* Header Image */}
        <div className="relative h-[400px] w-full">
          <Image src="/knobeln/header.jpg" layout="fill" objectFit="cover" alt="Weihnachtsknobeln" />
          <div className="absolute inset-0 bg-gradient-to-t from-westerloyPrimary/80 to-transparent" />
          <CardHeader className="absolute bottom-0 left-0 right-0 z-10">
            <CardTitle className="text-4xl font-bold text-westerloyBackground">Weihnachtsknobeln 2025</CardTitle>
          </CardHeader>
        </div>

        <CardContent className="mt-6 space-y-6">
          {/* Event Info */}
          <div className="flex flex-wrap justify-center gap-4 text-westerloyPrimary">
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              <span>November/Dezember</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              <span>Mühlenhof Westerloy</span>
            </div>
            <div className="flex items-center">
              <Utensils className="mr-2 h-5 w-5" />
              <span>Leckeres Essen</span>
            </div>
          </div>

          {/* Introduction Text */}
          <p className="text-lg leading-relaxed text-westerloyPrimary">
            Freut euch auf unser traditionelles Weihnachtsknobeln! An mehreren Abenden im November und Dezember kommen
            wir zusammen, um gemeinsam zu knobeln, zu lachen und die Vorweihnachtszeit zu genießen. Mit dabei: leckere
            Speisen und gute Gesellschaft.
          </p>

          <p className="text-lg leading-relaxed text-westerloyPrimary">
            Ob Anfänger oder erfahrener Knobel-Profi – bei uns ist jeder willkommen! Kommt vorbei und erlebt einen
            gemütlichen Abend in vorweihnachtlicher Atmosphäre.
          </p>

          {/* Event Dates Section */}
          <div className="rounded-lg bg-westerloySecondary/10 p-6">
            <h3 className="mb-4 text-2xl font-semibold text-westerloyPrimary">Termine</h3>
            <p className="mb-4 text-sm text-westerloyPrimary">Reservierungen über LVM Warntjen 04488/4488</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-lg bg-white/50 p-4">
                <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-westerloyPrimary" />
                <div>
                  <p className="font-semibold text-westerloyPrimary">Freitag, 28. November 2025</p>
                  <p className="text-sm text-westerloyPrimary/80">17:00 Uhr & 19:30 Uhr - Mühlenhof</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-white/50 p-4">
                <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-westerloyPrimary" />
                <div>
                  <p className="font-semibold text-westerloyPrimary">Samstag, 29. November 2025</p>
                  <p className="text-sm text-westerloyPrimary/80">17:00 Uhr & 19:30 Uhr - Mühlenhof</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-white/50 p-4">
                <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-westerloyPrimary" />
                <div>
                  <p className="font-semibold text-westerloyPrimary">Sonntag, 30. November 2025</p>
                  <p className="text-sm text-westerloyPrimary/80">17:00 Uhr & 19:30 Uhr - Mühlenhof</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-white/50 p-4">
                <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-westerloyPrimary" />
                <div>
                  <p className="font-semibold text-westerloyPrimary">Freitag, 5. Dezember 2025</p>
                  <p className="text-sm text-westerloyPrimary/80">17:00 Uhr & 19:30 Uhr - Mühlenhof</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-white/50 p-4">
                <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-westerloyPrimary" />
                <div>
                  <p className="font-semibold text-westerloyPrimary">Samstag, 6. Dezember 2025</p>
                  <p className="text-sm text-westerloyPrimary/80">17:00 Uhr & 19:30 Uhr - Mühlenhof</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-white/50 p-4">
                <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-westerloyPrimary" />
                <div>
                  <p className="font-semibold text-westerloyPrimary">Sonntag, 7. Dezember 2025</p>
                  <p className="text-sm text-westerloyPrimary/80">17:00 Uhr & 19:30 Uhr - Mühlenhof</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-white/50 p-4">
                <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-westerloyPrimary" />
                <div>
                  <p className="font-semibold text-westerloyPrimary">Freitag, 12. Dezember 2025</p>
                  <p className="text-sm text-westerloyPrimary/80">17:00 Uhr & 19:30 Uhr - Mühlenhof</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-white/50 p-4">
                <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-westerloyPrimary" />
                <div>
                  <p className="font-semibold text-westerloyPrimary">Samstag, 13. Dezember 2025</p>
                  <p className="text-sm text-westerloyPrimary/80">17:00 Uhr & 19:30 Uhr - Mühlenhof</p>
                </div>
              </div>
            </div>
          </div>

          {/* Meal Plan Section */}
          <div className="rounded-lg bg-westerloyPrimary/10 p-6">
            <h3 className="mb-4 text-2xl font-semibold text-westerloyPrimary">Speiseplan</h3>
            <p className="mb-4 text-westerloyPrimary">
              An allen Terminen gibt es wie gewohnt leckere Angebote aus der Mühlenhofküche. Lade den Speiseplan
              herunter, um alle Details zu sehen.
            </p>
            <a
              href="/knobeln/speiseplan.pdf"
              download
              className="inline-flex items-center rounded-md bg-westerloyPrimary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-westerloyPrimary/90"
            >
              <Download className="mr-2 h-4 w-4" />
              Speiseplan herunterladen
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
