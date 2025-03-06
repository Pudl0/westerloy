import PageLayout, { type PageContent } from '@/components/layout/page-layout';

export default function Theater() {
  const pageContent: PageContent = {
    title: 'Mühlenhof Theater',
    headerImage: '/theaterheader.png',
    headerImageAlt: 'Mühlenhof Theater Bühne',
    paragraphs: [
      'Im Februar 1979 wurde das erste Mal in dem damals frisch errichteten Mühlenhof Theater gespielt. Nachdem viele Jahr nicht gespielt wurde, öffnete sich mit der Einweihung des Mühlenhofs 1979 wieder der Vorhang. Während 1979 noch ein Ein-Akter gespielt wurde, traute man sich im Jahr darauf schon einen Zwei-Akter zu spielen.',
      'Mittlerweise ist es Tradition, dass sich jedes Jahr im Februar der Vorhang hebt und ein lustiges Stück gespielt wird. Die Proben dafür starten schon im Oktober. Dann treffen wir uns einmal die Woche zum Lesen. Die plattdeutsche Aussprache wird geübt und einige Sätze umgestellt.',
      'Nachdem Ende Dezember die Bühne im Mühlenhof aufgebaut wird, wird im Januar fleißig geprobt. Anfang Februar geht es dann endlich los. Unsere Gruppe besteht zur Zeit aus Personen zwischen 40 und 75 Jahren. Das Theaterspielen macht allen sehr viel Spaß und auch hinter der Bühne haben wir viel Spaß.',
      'Unsere Gruppe besteht nicht nur aus Spielern, sondern auch aus vielen Helfern. Die Bühne muss gebaut, die Technik installiert und Kostüme müssen gesucht werden. Während der Spielzeit unterstützen viele aus der Gruppe beim Brot schmieren, für das Abendbrot vor der Vorstellung oder im Theaterkrug.',
    ],
    actions: (
      <p className="text-lg leading-relaxed text-westerloyPrimary">
        Doch nicht nur während der Theaterzeit treffen wir uns. Einmal im Jahren unternehmen wir alle zusammen einen
        Wochenendausflug. Wer Lust hat, auch einmal Theater zu spielen, kann sich gerne unter{' '}
        <a href="tel:+4944884488" className="text-primary hover:underline">
          04488-4488
        </a>{' '}
        bei Sandra Warntjen melden.
      </p>
    ),
  };

  return <PageLayout content={pageContent} />;
}
