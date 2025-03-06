import { Calendar, Facebook, Instagram, MapPin, Users } from 'lucide-react';

import PageLayout, { type PageContent } from '@/components/layout/page-layout';
import { Button } from '@/components/ui/button';

export default function Landjugend() {
  const pageContent: PageContent = {
    title: 'Landjugend 3.0',
    headerImage: '/Landjugend.jpg',
    headerImageAlt: 'Landjugend 3.0',
    paragraphs: [
      '"Landjugend Westeroly 3.0" das sind wir, 48 (Stand 03/2023) Mitglieder, zusammengesetzt aus Jugendlichen und jungen Erwachsenen im Alter von 14 bis 30 Jahren. Wir haben uns es auf die Fahne geschrieben den hiesigen Zusammenhalt der Dorfjugend zu stärken. Neben regelmäßigen Treffen und gemeinsamen Unternehmungen wie Kohlfahrten, Grillabende oder die Teilnahme an den Deutschen Landjugendtagen (DLT) unterstützen wir auch Aktionen des Ortsbürgervereins und versuchen uns im Dorfgeschehen mit einzubringen.',
      'Gegründet haben wir uns am 17.04.2015 und bei der Gründungsveranstaltung damals waren bereits schon 25 Personen dabei. Wir sind Teil der NLJ (Niedersächsische Landjugend – Landesgemeinschaft e.V.) und wer sich nun fragt, warum der Name „Landjugend Westerloy 3.0"? Bereits vor uns hat es zwei Landjugendgenerationen in Westerloy gegeben: Mitte bis Ende der 50er Jahre und um die Zeit um 1975. Recht schnell war deshalb auch ein Name gefunden: „Landjugend Westerloy 3.0"!',
      'Willst du mehr über uns erfahren? Dann folge uns bei Facebook und Instagram.',
    ],
    metadata: [
      {
        icon: <Users className="mr-2 h-5 w-5" />,
        text: '48 Mitglieder',
      },
      {
        icon: <Calendar className="mr-2 h-5 w-5" />,
        text: 'Gegründet am 17.04.2015',
      },
      {
        icon: <MapPin className="mr-2 h-5 w-5" />,
        text: 'Westerloy',
      },
    ],
    actions: (
      <div className="flex items-center justify-center space-x-6">
        <Button
          variant="default"
          size="lg"
          className="rounded-full bg-[#1877F2] px-6 py-3 font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:bg-[#1877F2]/90"
          asChild
        >
          <a
            href="https://www.facebook.com/LJWesterloy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2"
          >
            <Facebook className="h-6 w-6" />
            <span>Facebook</span>
          </a>
        </Button>
        <Button
          variant="default"
          size="lg"
          className="rounded-full bg-gradient-to-r from-[#405DE6] via-[#FD1D1D] to-[#F56040] px-6 py-3 font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:opacity-90"
          asChild
        >
          <a
            href="https://www.instagram.com/landjugendwesterloy3.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2"
          >
            <Instagram className="h-6 w-6" />
            <span>Instagram</span>
          </a>
        </Button>
      </div>
    ),
  };

  return <PageLayout content={pageContent} />;
}
