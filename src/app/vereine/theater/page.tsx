import Image from 'next/image';

import BackToDashboardButton from '@/components/ui/back-to-dashboard-button';

export default async function Theater() {
  return (
    <div className="mt-10 w-full">
      <BackToDashboardButton></BackToDashboardButton>
      <div className="relative mx-auto mb-4 w-full max-w-screen-md md:mb-0" style={{ height: 24 + 'em' }}>
        <div className="news-item-header absolute bottom-0 left-0 h-full w-full rounded-xl"></div>
        <Image
          src="/theaterheader.png"
          width={1920}
          height={1080}
          alt=""
          className="left-0 top-0 z-0 h-full w-full rounded-xl object-cover"
        />
      </div>
      <div className="mx-auto mt-12 max-w-screen-md text-lg leading-relaxed text-gray-700">
        <p className="pb-6">
          Endlich ist es wieder so weit! Am 09.02.2024 hebt sich im Westerloyer Mühlenhof wieder der Vorhang und es wird
          plattdeutsches Theater gespielt. Das diesjährige Stück heißt „Twüschen Eiland un Casino“ und ist von Bernd
          Spehling. Ins Plattdeutsche übersetzt hat es Heinz Buerhoop.
        </p>
        <p className="pb-3 font-semibold">Zum Stück:</p>
        <p className="pb-6">
          Danuta und Rüdiger haben sich ihre Premiere als Räuberduo eigentlich ganz anders vorgestellt. Soeben haben die
          beiden ein Spielcasino ausgeraubt, das ausgerechnet Fiete Strandmann gehört und bei diesem Coup dessen
          Schwarzgeld erbeutet. In ihrer Hektik nehmen sie versehentlich auch noch eine Geisel mit und flüchten samt
          Geisel und der Beute nun mit der Fähre auf eine Insel. Dort treffen Sie auf Elvis und Wendy, die eigentlich
          ein romantisches Wochenende in einer Strandhütte verbringen wollen. So wird ab jetzt ausgerechnet die
          Wellness-Strandhütte zu einem turbulenten Zusammentreffen verschiedenster Einzelschicksale, von denen jeder
          für sich versucht, sich am Geld zu bedienen. Auch eine Anhalterin, die Elvis netterweise bei der Anreise
          mitgenommen hat, mischt ordentlich mit. Zu allem Überfluss taucht auch noch Fiete Strandmann auf und will sein
          Geld zurück. Was noch alles passiert, könnt ihr bei uns auf der Bühne sehen.
        </p>
        <p className="pb-6">
          Karten gibt es ab sofort bei der LVM-Versicherungsagentur Warntjen unter 04488- 4488. Eine Karte kostet 9,00
          €. Auch die Termine können dort erfragt werden. Wir freuen uns auf euren Besuch !
        </p>
        <p className="pb-8 pt-12 font-semibold">Aktuelle Termine:</p>
        <Image
          src="/uploads/theater/aktuellesprogramm.jpg"
          width={1920}
          height={1080}
          alt=""
          className="h-full w-full rounded-xl"
        />
      </div>
    </div>
  );
}
