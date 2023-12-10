import BackToDashboardButton from '@/components/ui/back-to-dashboard-button';

export default function DataProtection() {
  return (
    <div>
      <BackToDashboardButton></BackToDashboardButton>
      <p className="px-32 py-12 text-4xl">Datenschutzerklärung</p>
      <div className="px-32 py-4">
        <p className="mb-8 text-2xl">
          I. Informationen über die Verarbeitung Ihrer Daten gemäß Art. 13 der Datenschutz-Grundverordnung (DS-GVO)
        </p>
        <p className="my-4 text-xl font-semibold">1. Verantwortlicher und Datenschutzbeauftragter</p>
        <div className="pl-2">
          Verantwortlich für diese Website ist
          <ul>
            <li>Ortsbürgerverein Westerloy e.V</li>
            <li>1. Vorsitzende Katja Rottmann</li>
            <li>Am Damm 62, 26655 Westerstede</li>
            <li>Telefon: 04488 2999</li>
          </ul>
          Den Datenschutzbeauftragten erreichen Sie per E-Mail unter [E-Mail-Adresse des Datenschutzbeauftragten] oder
          über die Adresse [ggf. auch die Postadresse des Datenschutzbeauftragten]
        </div>
        <p className="my-4 text-xl font-semibold">
          2. Daten, die für die Bereitstellung der Website und die Erstellung der Protokolldateien verarbeitet werden
        </p>
        <p className="my-4 text-lg font-medium">a. Welche Daten werden für welchen Zweck verarbeitet?</p>
        <p className="pl-2">
          Bei jedem Zugriff auf Inhalte der Website werden vorübergehend Daten gespeichert, die möglicherweise eine
          Identifizierung zulassen. Die folgenden Daten werden hierbei erhoben: - Datum und Uhrzeit des Zugriffs -
          IP-Adresse - Hostname des zugreifenden Rechners - Website, von der aus die Website aufgerufen wurde -
          Websites, die über die Website aufgerufen werden - Besuchte Seite auf unserer Website - Meldung, ob der Abruf
          erfolgreich war - Übertragene Datenmenge - Informationen über den Browsertyp und die verwendete Version -
          Betriebssystem Die vorübergehende Speicherung der Daten ist für den Ablauf eines Websitebesuchs erforderlich,
          um eine Auslieferung der Website zu ermöglichen. Eine weitere Speicherung in Protokolldateien erfolgt, um die
          Funktionsfähigkeit der Website und die Sicherheit der informationstechnischen Systeme sicherzustellen. In
          diesen Zwecken liegt auch unser berechtigtes Interesse an der Datenverarbeitung.
        </p>
        <p className="my-4 mt-4 text-lg font-medium">b. Auf welcher Rechtsgrundlage werden diese Daten verarbeitet?</p>
        <p className="pl-2">Die Daten werden auf der Grundlage des Art. 6 Abs. 1 Buchstabe f DS-GVO verarbeitet.</p>
        <p className="my-4 mt-4 text-lg font-medium">
          c. Gibt es neben dem Verantwortlichen weitere Empfänger der personenbezogenen Daten?
        </p>
        <div className="pl-2">
          Der Server der Website wird bereitgestellt von:
          <ul className="py-4">
            <li>Hetzner Online GmbH</li>
            <li>Industriestr. 25, 91710 Gunzenhausen</li>
            <li>Telefon: 09831 505-0</li>
          </ul>
          <p className="pb-1">
            Der Hoster empfängt die oben genannten Daten als Auftragsverarbeiter. Der Serverstandort ist Deutschland.
            Alle weiteren Infos hier erhalten sie unter folgenden Links:
          </p>
          <div className="pt-2">
            <a
              className="px-2 underline hover:text-gray-500"
              href="https://www.hetzner.com/de/legal/privacy-policy?country=de"
            >
              Hetzner Datenschutz Erklärung
            </a>
            <a
              className="px-2 underline hover:text-gray-500"
              href="https://docs.hetzner.com/de/general/general-terms-and-conditions/data-privacy-faq/"
            >
              Hetzner Datenschutz FAQ
            </a>
          </div>
        </div>
        <br></br>
        <p className="mb-2 mt-4 text-lg font-medium">d. Wie lange werden die Daten gespeichert?</p>
        <p className="pl-2">
          Die Daten werden gelöscht, sobald sie für die Erreichung des Zwecks ihrer Erhebung nicht mehr erforderlich
          sind. Bei der Bereitstellung der Website ist dies der Fall, wenn die jeweilige Sitzung beendet ist. Die
          Protokolldateien werden maximal bis zu 24 Stunden direkt und ausschließlich für Administratoren zugänglich
          aufbewahrt. Danach sind sie nur noch indirekt über die Rekonstruktion von Sicherungsbändern verfügbar und
          werden nach maximal vier Wochen endgültig gelöscht.
        </p>
        <p className="mb-2 mt-4 text-xl font-semibold">3. Betroffenenrechte</p>
        <p className="mb-2 mt-4 text-lg font-medium">a. Recht auf Auskunft</p>
        <p className="pl-2">
          Sie können Auskunft nach Art. 15 DS-GVO über Ihre personenbezogenen Daten verlangen, die wir verarbeiten.
        </p>
        <p className="mb-2 mt-4 text-lg font-medium">b. Recht auf Widerspruch</p>
        <p className="pl-2">Sie haben ein Recht auf Widerspruch aus besonderen Gründen (siehe unter Punkt II).</p>
        <p className="mb-2 mt-4 text-lg font-medium">c. Recht auf Berichtigung</p>
        <p className="pl-2">
          Sollten die Sie betreffenden Angaben nicht (mehr) zutreffend sein, können Sie nach Art. 16 DS-GVO eine
          Berichtigung verlangen. Sollten Ihre Daten unvollständig sein, können Sie eine Vervollständigung verlangen.
        </p>
        <p className="mb-2 mt-4 text-lg font-medium">d. Recht auf Löschung</p>
        <p className="pl-2">Sie können nach Art. 17 DS-GVO die Löschung Ihrer personenbezogenen Daten verlangen.</p>
        <p className="mb-2 mt-4 text-lg font-medium">e. Recht auf Einschränkung der Verarbeitung</p>
        <p className="pl-2">
          Sie haben nach Art. 18 DS-GVO das Recht, eine Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu
          verlangen.
        </p>
        <p className="mb-2 mt-4 text-lg font-medium">f. Recht auf Beschwerde</p>
        <p className="pl-2">
          Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen Datenschutzrecht
          verstößt, haben Sie nach Ar. 77 Abs. 1 DS-GVO das Recht, sich bei einer Datenschutzaufsichtsbehörde eigener
          Wahl zu beschweren. Hierzu gehört auch die für den Verantwortlichen zuständige Datenschutzaufsichtsbehörde:
          Landesbeauftragte für Datenschutz und Informationsfreiheit Niedersachsen (
          <a
            className="underline hover:text-gray-500"
            href="https://lfd.niedersachsen.de/startseite/meldeformulare/online_beschwerde/"
          >
            hier erreichbar
          </a>
          ).
        </p>
        <p className="mb-2 mt-4 text-lg font-medium">g. Recht auf Datenübertragbarkeit</p>
        <p className="pl-2">
          Für den Fall, dass die Voraussetzungen des Art. 20 Abs. 1 DS-GVO vorliegen, steht Ihnen das Recht zu, sich
          Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an
          sich oder an Dritte aushändigen zu lassen. Die Erfassung der Daten zur Bereitstellung der Website und die
          Speicherung der Protokolldateien sind für den Betrieb der Internetseite zwingend erforderlich. Sie beruhen
          daher nicht auf einer Einwilligung nach Art. 6 Abs. 1 Buchstabe a DS-GVO oder auf einem Vertrag nach Art. 6
          Abs. 1 Buchstabe b DS-GVO, sondern sind nach Art. 6 Abs. 1 Buchstabe f DS-GVO gerechtfertigt. Die
          Voraussetzungen des Art. 20 Abs. 1 DS-GVO sind demnach insoweit nicht erfüllt.
        </p>
        <p className="my-8 text-2xl">II. Recht auf Widerspruch</p>
        <p className="pl-2">
          Gemäß Art. 21 Abs. 1 DS-GVO Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben,
          jederzeit gegen die Verarbeitung Ihrer personenbezogenen Daten, die aufgrund von Artikel 6 Abs. 1 Buchstabe f
          DS-GVO erfolgt, Widerspruch einzulegen. Der Verantwortliche verarbeitet die personenbezogenen Daten dann nicht
          mehr, es sei denn, er kann zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die die Interessen,
          Rechte und Freiheiten der betroffenen Person überwiegen, oder die Verarbeitung dient der Geltendmachung,
          Ausübung oder Verteidigung von Rechtsansprüchen. Die Erfassung der Daten zur Bereitstellung der Website und
          die Speicherung der Protokolldateien sind für den Betrieb der Internetseite zwingend erforderlich.
        </p>
      </div>
    </div>
  );
}
