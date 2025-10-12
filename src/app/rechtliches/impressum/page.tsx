import BackToDashboardButton from '@/components/back-to-dashboard-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function LegalNotice() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BackToDashboardButton />
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-4xl">Impressum</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-200px)] pr-4">
            <section className="space-y-6">
              <div>
                <h2 className="mb-2 text-2xl font-semibold">Herausgeber und Verantwortlicher:</h2>
                <ul className="list-disc pl-6">
                  <li>Ortsbürgerverein Westerloy e.V</li>
                  <li>1. Vorsitzender Uwe Graalfs</li>
                  <li>Köterhörn 12, 26655 Westerstede</li>
                  <li>Telefon: 0151 28222442</li>
                  <li>
                    Email:{' '}
                    <a href="mailto:uwegraalfs@t-online.de" className="text-primary hover:underline">
                      uwegraalfs@t-online.de
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="mb-2 text-2xl font-semibold">Technischer Verantwortlicher:</h2>
                <ul className="list-disc pl-6">
                  <li>Pudlo Media</li>
                  <li>Patrick Pudlo</li>
                  <li>
                    Mail:{' '}
                    <a href="mailto:info@pudlo.media" className="text-primary hover:underline">
                      info@pudlo.media
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="mb-2 text-2xl font-semibold">Technische Voraussetzungen:</h2>
                <p>
                  Diese Website benutzt auf Javascript basierende Inhalte. Für eine optimale Darstellung sollte
                  Javascript aktiviert sein.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Haftungsausschluss:</h2>

                <div>
                  <h3 className="mb-2 text-xl font-semibold">1. Inhalt des Onlineangebots</h3>
                  <p>
                    Der Autor übernimmt keinerlei Gewähr für die Aktualität, Korrektheit, Vollständigkeit oder Qualität
                    der bereitgestellten Informationen. Haftungsansprüche gegen den Autor, welche sich auf Schäden
                    materieller oder ideeller Art beziehen, die durch die Nutzung oder Nichtnutzung der dargebotenen
                    Informationen bzw. durch die Nutzung fehlerhafter und unvollständiger Informationen verursacht
                    wurden, sind grundsätzlich ausgeschlossen, sofern seitens des Autors kein nachweislich vorsätzliches
                    oder grob fahrlässiges Verschulden vorliegt. Alle Angebote sind freibleibend und unverbindlich. Der
                    Autor behält es sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte
                    Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig
                    einzustellen.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-xl font-semibold">2. Verweise und Links</h3>
                  <p>
                    Bei direkten oder indirekten Verweisen auf fremde Webseiten (&quot;Hyperlinks&quot;), die außerhalb
                    des Verantwortungsbereiches des Autors liegen, würde eine Haftungsverpflichtung ausschließlich in
                    dem Fall in Kraft treten, in dem der Autor von den Inhalten Kenntnis hat und es ihm technisch
                    möglich und zumutbar wäre, die Nutzung im Falle rechtswidriger Inhalte zu verhindern. Der Autor
                    erklärt hiermit ausdrücklich, dass zum Zeitpunkt der Linksetzung keine illegalen Inhalte auf den zu
                    verlinkenden Seiten erkennbar waren. Auf die aktuelle und zukünftige Gestaltung, die Inhalte oder
                    die Urheberschaft der gelinkten/verknüpften Seiten hat der Autor keinerlei Einfluss. Deshalb
                    distanziert er sich hiermit ausdrücklich von allen Inhalten aller gelinkten /verknüpften Seiten, die
                    nach der Linksetzung verändert wurden. Diese Feststellung gilt für alle innerhalb des eigenen
                    Internetangebotes gesetzten Links und Verweise sowie für Fremdeinträge in vom Autor eingerichteten
                    Gästebüchern, Diskussionsforen und Mailinglisten. Für illegale, fehlerhafte oder unvollständige
                    Inhalte und insbesondere für Schäden, die aus der Nutzung oder Nichtnutzung solcherart dargebotener
                    Informationen entstehen, haftet allein der Anbieter der Seite, auf welche verwiesen wurde, nicht
                    derjenige, der über Links auf die jeweilige Veröffentlichung lediglich verweist.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-xl font-semibold">3. Urheber- und Kennzeichenrecht</h3>
                  <p>
                    Der Autor ist bestrebt, in allen Publikationen die Urheberrechte der verwendeten Grafiken,
                    Tondokumente, Videosequenzen und Texte zu beachten, von ihm selbst erstellte Grafiken, Tondokumente,
                    Videosequenzen und Texte zu nutzen oder auf lizenzfreie Grafiken, Tondokumente, Videosequenzen und
                    Texte zurückzugreifen. Alle innerhalb des Internetangebotes genannten und ggf. durch Dritte
                    geschützten Marken- und Warenzeichen unterliegen uneingeschränkt den Bestimmungen des jeweils
                    gültigen Kennzeichenrechts und den Besitzrechten der jeweiligen eingetragenen Eigentümer. Allein
                    aufgrund der bloßen Nennung ist nicht der Schluss zu ziehen, dass Markenzeichen nicht durch Rechte
                    Dritter geschützt sind! Das Copyright für veröffentlichte, vom Autor selbst erstellte Objekte bleibt
                    allein beim Autor der Seiten. Eine Vervielfältigung oder Verwendung solcher Grafiken, Tondokumente,
                    Videosequenzen und Texte in anderen elektronischen oder gedruckten Publikationen ist ohne
                    ausdrückliche Zustimmung des Autors nicht gestattet.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-xl font-semibold">4. Rechtswirksamkeit dieses Haftungsausschlusses</h3>
                  <p>
                    Dieser Haftungsausschluss ist als Teil des Internetangebotes zu betrachten, von dem aus auf diese
                    Seite verwiesen wurde. Sofern Teile oder einzelne Formulierungen dieses Textes der geltenden
                    Rechtslage nicht, nicht mehr oder nicht vollständig entsprechen sollten, bleiben die übrigen Teile
                    des Dokumentes in ihrem Inhalt und ihrer Gültigkeit davon unberührt.
                  </p>
                </div>
              </div>
            </section>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
