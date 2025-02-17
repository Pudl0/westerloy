import { Calendar, Home, Users } from 'lucide-react';
import Image from 'next/image';

import BackToDashboardButton from '@/components/back-to-dashboard-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OBV() {
  const content = [
    'Seit mehr als einem halben Jahrhundert setzen wir uns engagiert als Ortsbürgerverein Westerloy für die Belange unserer Dorfbewohner*innen ein. Wir möchten ein lebendiges Miteinander von Jung & Alt unterstützen und das Lokale fördern.',
    'Mit zahlreichen tollen Veranstaltungen und Aktionen auch zusammen mit unserer Landjugend beleben wir unser Dorf rund um unseren Dorfmittelpunkt - unseren Mühlenhof - unser Dorfgemeinschaftshaus.',
    'Wir freuen uns sehr, wenn auch du unser Dorfleben mitgestalten möchtest, Anregungen oder Kritik hast.',
  ];

  return (
    <div className="container mx-auto bg-westerloyBackground px-4 py-8">
      <BackToDashboardButton />
      <Card className="mt-8 overflow-hidden bg-westerloyBackground shadow-lg">
        <div className="relative h-[400px] w-full">
          <Image src="/Muehlenhof.jpg" layout="fill" objectFit="cover" alt="OBV Westerloy" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-westerloyPrimary/80 to-transparent" />
          <CardHeader className="absolute bottom-0 left-0 right-0 z-10">
            <CardTitle className="text-4xl font-bold text-westerloyBackground">OBV Westerloy</CardTitle>
          </CardHeader>
        </div>
        <CardContent className="mt-6 space-y-6">
          <div className="flex flex-wrap justify-center gap-4 text-westerloyPrimary">
            <div className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              <span>Gemeinschaft seit über 50 Jahren</span>
            </div>
            <div className="flex items-center">
              <Home className="mr-2 h-5 w-5" />
              <span>Mühlenhof als Dorfmittelpunkt</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              <span>Zahlreiche Veranstaltungen</span>
            </div>
          </div>
          {content.map((paragraph, index) => (
            <p key={index} className="text-lg leading-relaxed text-westerloyPrimary">
              {paragraph}
            </p>
          ))}
          <div className="mt-8 rounded-lg bg-westerloySecondary/10 p-6">
            <h3 className="mb-4 text-xl font-semibold text-westerloyPrimary">Mitmachen und Mitgestalten</h3>
            <p className="text-westerloyPrimary">
              Möchtest du Teil unserer Gemeinschaft werden und das Dorfleben aktiv mitgestalten? Wir freuen uns über
              jede helfende Hand und neue Ideen! Kontaktiere uns für mehr Informationen zur Mitgliedschaft oder um deine
              Vorschläge zu teilen.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
