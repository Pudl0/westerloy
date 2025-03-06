import { Calendar, Home, Users } from 'lucide-react';

import PageLayout, { type PageContent } from '@/components/layout/page-layout';

export default function OBV() {
  const pageContent: PageContent = {
    title: 'OBV Westerloy',
    headerImage: '/Muehlenhof.jpg',
    headerImageAlt: 'OBV Westerloy',
    paragraphs: [
      'Seit mehr als einem halben Jahrhundert setzen wir uns engagiert als Ortsbürgerverein Westerloy für die Belange unserer Dorfbewohner*innen ein. Wir möchten ein lebendiges Miteinander von Jung & Alt unterstützen und das Lokale fördern.',
      'Mit zahlreichen tollen Veranstaltungen und Aktionen auch zusammen mit unserer Landjugend beleben wir unser Dorf rund um unseren Dorfmittelpunkt - unseren Mühlenhof - unser Dorfgemeinschaftshaus.',
      'Wir freuen uns sehr, wenn auch du unser Dorfleben mitgestalten möchtest, Anregungen oder Kritik hast.',
    ],
    metadata: [
      {
        icon: <Users className="mr-2 h-5 w-5" />,
        text: 'Gemeinschaft seit über 50 Jahren',
      },
      {
        icon: <Home className="mr-2 h-5 w-5" />,
        text: 'Mühlenhof als Dorfmittelpunkt',
      },
      {
        icon: <Calendar className="mr-2 h-5 w-5" />,
        text: 'Zahlreiche Veranstaltungen',
      },
    ],
    actions: (
      <div className="mt-8 rounded-lg bg-westerloySecondary/10 p-6">
        <h3 className="mb-4 text-xl font-semibold text-westerloyPrimary">Mitmachen und Mitgestalten</h3>
        <p className="text-westerloyPrimary">
          Möchtest du Teil unserer Gemeinschaft werden und das Dorfleben aktiv mitgestalten? Wir freuen uns über jede
          helfende Hand und neue Ideen! Kontaktiere uns für mehr Informationen zur Mitgliedschaft oder um deine
          Vorschläge zu teilen.
        </p>
      </div>
    ),
  };

  return <PageLayout content={pageContent} />;
}
