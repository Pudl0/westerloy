import BackToDashboardButton from '@/components/ui/back-to-dashboard-button';

export default function LegalNotice() {
  return (
    <div className="p-3">
      <BackToDashboardButton></BackToDashboardButton>
      <p className="px-32 py-12 text-4xl">Impressum</p>
      <div className="px-32 py-4">
        <p className="mb-2 text-2xl">Herausgeber und Verantwortlicher:</p>
        <ul className="pl-2">
          <li>Ortsbürgerverein Westerloy e.V</li>
          <li>1. Vorsitzende Katja Rottmann</li>
          <li>Am Damm 62, 26655 Westerstede</li>
          <li>Telefon: 0172 27807878</li>
          <li>Email: katja.rottmann@t-online.de</li>
        </ul>
        <p className="mb-2 mt-6 text-2xl">Technischer Verantwortlicher:</p>
        <ul className="pl-2">
          <li>Pudlo Media</li>
          <li>Patrick Pudlo</li>
          <li>Mail: info@pudlo.media</li>
          <li>Telefon: 04488 52 99 432</li>
        </ul>
        <p className="mt-6 text-2xl">Technische Voraussetzungen:</p>
        <p className="pl-2">
          Diese Website benutzt auf Javascript basierende Inhalte. Für eine optimale Darstellung sollte Javascript
          aktiviert sein.
        </p>
        <p className="mt-6 text-2xl">Haftungsausschluss:</p>
        <p className="mb-2 mt-4 text-xl">1. Inhalt des Onlineangebots</p>
        <p className="pl-2">
          Der Autor übernimmt keinerlei Gewähr für die Aktualität, Korrektheit, Vollständigkeit oder Qualität der
          bereitgestellten Informationen. Haftungsansprüche gegen den Autor, welche sich auf Schäden materieller oder
          ideeller Art beziehen, die durch die Nutzung oder Nichtnutzung der dargebotenen Informationen bzw. durch die
          Nutzung fehlerhafter und unvollständiger Informationen verursacht wurden, sind grundsätzlich ausgeschlossen,
          sofern seitens des Autors kein nachweislich vorsätzliches oder grob fahrlässiges Verschulden vorliegt. Alle
          Angebote sind freibleibend und unverbindlich. Der Autor behält es sich ausdrücklich vor, Teile der Seiten oder
          das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die
          Veröffentlichung zeitweise oder endgültig einzustellen.
        </p>
        <p className="mb-2 mt-4 text-xl">2. Verweise und Links</p>
        <p className="pl-2">
          Bei direkten oder indirekten Verweisen auf fremde Webseiten (&quotHyperlinks&quot), die außerhalb des
          Verantwortungsbereiches des Autors liegen, würde eine Haftungsverpflichtung ausschließlich in dem Fall in
          Kraft treten, in dem der Autor von den Inhalten Kenntnis hat und es ihm technisch möglich und zumutbar wäre,
          die Nutzung im Falle rechtswidriger Inhalte zu verhindern. Der Autor erklärt hiermit ausdrücklich, dass zum
          Zeitpunkt der Linksetzung keine illegalen Inhalte auf den zu verlinkenden Seiten erkennbar waren. Auf die
          aktuelle und zukünftige Gestaltung, die Inhalte oder die Urheberschaft der gelinkten/verknüpften Seiten hat
          der Autor keinerlei Einfluss. Deshalb distanziert er sich hiermit ausdrücklich von allen Inhalten aller
          gelinkten /verknüpften Seiten, die nach der Linksetzung verändert wurden. Diese Feststellung gilt für alle
          innerhalb des eigenen Internetangebotes gesetzten Links und Verweise sowie für Fremdeinträge in vom Autor
          eingerichteten Gästebüchern, Diskussionsforen und Mailinglisten. Für illegale, fehlerhafte oder unvollständige
          Inhalte und insbesondere für Schäden, die aus der Nutzung oder Nichtnutzung solcherart dargebotener
          Informationen entstehen, haftet allein der Anbieter der Seite, auf welche verwiesen wurde, nicht derjenige,
          der über Links auf die jeweilige Veröffentlichung lediglich verweist.
        </p>
        <p className="mb-2 mt-4 text-xl">3. Urheber- und Kennzeichenrecht</p>
        <p className="pl-2">
          Der Autor ist bestrebt, in allen Publikationen die Urheberrechte der verwendeten Grafiken, Tondokumente,
          Videosequenzen und Texte zu beachten, von ihm selbst erstellte Grafiken, Tondokumente, Videosequenzen und
          Texte zu nutzen oder auf lizenzfreie Grafiken, Tondokumente, Videosequenzen und Texte zurückzugreifen. Alle
          innerhalb des Internetangebotes genannten und ggf. durch Dritte geschützten Marken- und Warenzeichen
          unterliegen uneingeschränkt den Bestimmungen des jeweils gültigen Kennzeichenrechts und den Besitzrechten der
          jeweiligen eingetragenen Eigentümer. Allein aufgrund der bloßen Nennung ist nicht der Schluss zu ziehen, dass
          Markenzeichen nicht durch Rechte Dritter geschützt sind! Das Copyright für veröffentlichte, vom Autor selbst
          erstellte Objekte bleibt allein beim Autor der Seiten. Eine Vervielfältigung oder Verwendung solcher Grafiken,
          Tondokumente, Videosequenzen und Texte in anderen elektronischen oder gedruckten Publikationen ist ohne
          ausdrückliche Zustimmung des Autors nicht gestattet.
        </p>
        <p className="mb-2 mt-4 text-xl">4. Rechtswirksamkeit dieses Haftungsausschlusses</p>
        <p className="pl-2">
          Dieser Haftungsausschluss ist als Teil des Internetangebotes zu betrachten, von dem aus auf diese Seite
          verwiesen wurde. Sofern Teile oder einzelne Formulierungen dieses Textes der geltenden Rechtslage nicht, nicht
          mehr oder nicht vollständig entsprechen sollten, bleiben die übrigen Teile des Dokumentes in ihrem Inhalt und
          ihrer Gültigkeit davon unberührt.
        </p>
      </div>
    </div>
  );
}
