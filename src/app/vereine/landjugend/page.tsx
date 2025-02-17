import { Calendar, Facebook, Instagram, MapPin, Users } from 'lucide-react';
import Image from 'next/image';

import BackToDashboardButton from '@/components/back-to-dashboard-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Landjugend() {
  const content = [
    '"Landjugend Westeroly 3.0" das sind wir, 48 (Stand 03/2023) Mitglieder, zusammengesetzt aus Jugendlichen und jungen Erwachsenen im Alter von 14 bis 30 Jahren. Wir haben uns es auf die Fahne geschrieben den hiesigen Zusammenhalt der Dorfjugend zu stärken. Neben regelmäßigen Treffen und gemeinsamen Unternehmungen wie Kohlfahrten, Grillabende oder die Teilnahme an den Deutschen Landjugendtagen (DLT) unterstützen wir auch Aktionen des Ortsbürgervereins und versuchen uns im Dorfgeschehen mit einzubringen.',
    'Gegründet haben wir uns am 17.04.2015 und bei der Gründungsveranstaltung damals waren bereits schon 25 Personen dabei. Wir sind Teil der NLJ (Niedersächsische Landjugend – Landesgemeinschaft e.V.) und wer sich nun fragt, warum der Name „Landjugend Westerloy 3.0"? Bereits vor uns hat es zwei Landjugendgenerationen in Westerloy gegeben: Mitte bis Ende der 50er Jahre und um die Zeit um 1975. Recht schnell war deshalb auch ein Name gefunden: „Landjugend Westerloy 3.0"!',
    'Willst du mehr über uns erfahren? Dann folge uns bei Facebook und Instagram.',
  ];

  return (
    <div className="container mx-auto bg-westerloyBackground px-4 py-8">
      <BackToDashboardButton />
      <Card className="mt-8 overflow-hidden bg-westerloyBackground shadow-lg">
        <div className="relative h-[400px] w-full">
          <Image src="/Landjugend.jpg" layout="fill" objectFit="cover" alt="Landjugend 3.0" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-westerloyPrimary/80 to-transparent" />
          <CardHeader className="absolute bottom-0 left-0 right-0 z-10">
            <CardTitle className="text-4xl font-bold text-westerloyBackground">Landjugend 3.0</CardTitle>
          </CardHeader>
        </div>
        <CardContent className="mt-6 space-y-6">
          <div className="flex flex-wrap justify-center gap-4 text-westerloyPrimary">
            <div className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              <span>48 Mitglieder</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              <span>Gegründet am 17.04.2015</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              <span>Westerloy</span>
            </div>
          </div>
          {content.map((paragraph, index) => (
            <p key={index} className="text-lg leading-relaxed text-westerloyPrimary">
              {paragraph}
            </p>
          ))}
          <div className="flex items-center justify-center space-x-6 pt-8">
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
              className="rounded-full bg-gradient-to-r from-[#405DE6] via-[#5851DB] via-[#833AB4] via-[#C13584] via-[#E1306C] via-[#FD1D1D] to-[#F56040] px-6 py-3 font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:opacity-90"
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
        </CardContent>
      </Card>
    </div>
  );
}
