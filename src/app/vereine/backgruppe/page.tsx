import { Calendar, Clock, Flame, Users } from 'lucide-react';

import PageLayout, { type PageContent } from '@/components/layout/page-layout';

export default function Backgruppe() {
  const pageContent: PageContent = {
    title: 'Der Backspieker am Mühlenhof',
    headerImage: '/Backgruppe.jpg',
    headerImageAlt: 'Der historische Backspieker am Mühlenhof',
    paragraphs: [
      'Früher gab es auf landwirtschaftlichen Höfen sehr häufig einen Backspieker. Brot und andere Backwaren wurden selbst hergestellt, da das benötigte Getreide auf den Höfen angebaut und somit das Mehl zum Backen selbst produziert wurde.',
      'Als im Spätherbst 1978 unser Mühlenhof errichtet war, meinten viele Westerloyer und Westerloyerinnen, dass ein Backspieker die Mühlenhof-Anlage hervorragend ergänzen würde. Die Familie Strodhoff in Seggern stellte ein bestens geeignetes Gebäude zur Verfügung, das vermutlich aus dem Jahr 1648 stammt.',
      'In Eigenleistung der Dorfbewohner erfolgte eine vollständige Entkernung und das Holzständerwerk wurde mit technischer Unterstützung auf einen Anhänger verladen. So wurde es dann mithilfe eines Schleppers zum neuen Standort transportiert und über mehrere Monate hinweg wieder aufgebaut.',
      'Im Jahr 2000 fanden sich engagierte Dorfbewohner zusammen, um die Backgruppe ins Leben zu rufen und gemeinsam erste Rezepte auszuprobieren. 2005 wurde der ursprüngliche Ofen mit finanzieller Unterstützung der Bingostiftung in Höhe von fast 10.000 Euro vollständig erneuert.',
      'Heute ist der Backspieker ein lebendiger Treffpunkt. Schulklassen, Kindergartengruppen und Ferienpassaktionen nutzen die Gelegenheit, um gemeinsam zu backen. Kinder können ihren eigenen Teig herstellen und ihn im historischen Ofen backen – eine Erfahrung, die Tradition und Gemeinschaft verbindet.',
      'Mehrmals im Jahr lädt die Backgruppe des Ortsbürgervereins zu einem Backtag ein und trägt mit ihrem Einsatz dazu bei, die Veranstaltungen auf dem Mühlenhof zu bereichern. In der Backgruppe engagieren sich zahlreiche Helferinnen und Helfer im Alter von 14 bis 78 Jahren, die mit Freude und Tatkraft bei der Sache sind.',
    ],
    metadata: [
      {
        icon: <Clock className="mr-2 h-5 w-5" />,
        text: 'Historisches Gebäude von 1648',
      },
      {
        icon: <Flame className="mr-2 h-5 w-5" />,
        text: 'Traditioneller Backsteinofen',
      },
      {
        icon: <Users className="mr-2 h-5 w-5" />,
        text: 'Aktive Backgruppe seit 2000',
      },
      {
        icon: <Calendar className="mr-2 h-5 w-5" />,
        text: 'Regelmäßige Backtage',
      },
    ],
    actions: (
      <div className="mt-8 rounded-lg bg-westerloySecondary/10 p-6">
        <h3 className="mb-4 text-xl font-semibold text-westerloyPrimary">Besuchen Sie uns!</h3>
        <p className="text-westerloyPrimary">
          Wir freuen uns auf Ihren Besuch und darauf, gemeinsam die alte Backkunst zu erleben! Schulklassen,
          Kindergartengruppen und alle Interessierten sind herzlich willkommen, die Tradition des Backens im
          historischen Backspieker kennenzulernen.
        </p>
        <div className="mt-4 rounded-md bg-westerloyPrimary/10 p-4">
          <p className="text-sm text-westerloyPrimary">
            <strong>Hinweis:</strong> Nach einem Brand im Oktober 2009 wurde der Backspieker dank tatkräftiger
            Unterstützung schnell wieder instand gesetzt und die Aktivitäten konnten fortgesetzt werden.
          </p>
        </div>
      </div>
    ),
  };

  return <PageLayout content={pageContent} />;
}
