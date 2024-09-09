import BackToDashboardButton from '@/components/ui/back-to-dashboard-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function DataProtection() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BackToDashboardButton />
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-4xl">Datenschutzerklärung</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-200px)] pr-4">
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold">
                I. Informationen über die Verarbeitung Ihrer Daten gemäß Art. 13 der Datenschutz-Grundverordnung
                (DS-GVO)
              </h2>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">1. Verantwortlicher und Datenschutzbeauftragter</h3>
                <div className="pl-4">
                  <p>Verantwortlich für diese Website ist</p>
                  <ul className="list-disc pl-6">
                    <li>Ortsbürgerverein Westerloy e.V</li>
                    <li>1. Vorsitzende Katja Rottmann</li>
                    <li>Am Damm 62, 26655 Westerstede</li>
                    <li>Telefon: 04488 2999</li>
                  </ul>
                  <p>
                    Den Datenschutzbeauftragten erreichen Sie per E-Mail unter{' '}
                    <a href="mailto:katja.rottmann@t-online.de" className="text-primary hover:underline">
                      katja.rottmann@t-online.de
                    </a>
                    .
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  2. Daten, die für die Bereitstellung der Website und die Erstellung der Protokolldateien verarbeitet
                  werden
                </h3>
                <h4 className="text-lg font-medium">a. Welche Daten werden für welchen Zweck verarbeitet?</h4>
                <p className="pl-4">
                  Bei jedem Zugriff auf Inhalte der Website werden vorübergehend Daten gespeichert, die möglicherweise
                  eine Identifizierung zulassen. Die folgenden Daten werden hierbei erhoben:
                </p>
                <ul className="list-disc pl-8">
                  <li>Datum und Uhrzeit des Zugriffs</li>
                  <li>IP-Adresse</li>
                  <li>Hostname des zugreifenden Rechners</li>
                  <li>Website, von der aus die Website aufgerufen wurde</li>
                  <li>Websites, die über die Website aufgerufen werden</li>
                  <li>Besuchte Seite auf unserer Website</li>
                  <li>Meldung, ob der Abruf erfolgreich war</li>
                  <li>Übertragene Datenmenge</li>
                  <li>Informationen über den Browsertyp und die verwendete Version</li>
                  <li>Betriebssystem</li>
                </ul>
                <p className="pl-4">
                  Die vorübergehende Speicherung der Daten ist für den Ablauf eines Websitebesuchs erforderlich, um eine
                  Auslieferung der Website zu ermöglichen. Eine weitere Speicherung in Protokolldateien erfolgt, um die
                  Funktionsfähigkeit der Website und die Sicherheit der informationstechnischen Systeme sicherzustellen.
                  In diesen Zwecken liegt auch unser berechtigtes Interesse an der Datenverarbeitung.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">II. Recht auf Widerspruch</h2>
                <p className="pl-4">
                  Gemäß Art. 21 Abs. 1 DS-GVO haben Sie das Recht, aus Gründen, die sich aus Ihrer besonderen Situation
                  ergeben, jederzeit gegen die Verarbeitung Ihrer personenbezogenen Daten, die aufgrund von Artikel 6
                  Abs. 1 Buchstabe f DS-GVO erfolgt, Widerspruch einzulegen. Der Verantwortliche verarbeitet die
                  personenbezogenen Daten dann nicht mehr, es sei denn, er kann zwingende schutzwürdige Gründe für die
                  Verarbeitung nachweisen, die die Interessen, Rechte und Freiheiten der betroffenen Person überwiegen,
                  oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen. Die
                  Erfassung der Daten zur Bereitstellung der Website und die Speicherung der Protokolldateien sind für
                  den Betrieb der Internetseite zwingend erforderlich.
                </p>
              </div>
            </section>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
