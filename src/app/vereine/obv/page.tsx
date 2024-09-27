import GroupPage from '@/components/group-page';

export default function OBV() {
  const content = [
    'Seit mehr als einem halben Jahrhundert setzen wir uns engagiert als Ortsbürgerverein Westerloy für die Belange unserer Dorfbewohner*innen ein. Wir möchten ein lebendiges Miteinander von Jung & Alt unterstützen und das Lokale fördern.',
    'Mit zahlreichen tollen Veranstaltungen und Aktionen auch zusammen mit unserer Landjugend beleben wir unser Dorf rund um unseren Dorfmittelpunkt - unseren Mühlenhof - unser Dorfgemeinschaftshaus.',
    'Wir freuen uns sehr, wenn auch du unser Dorfleben mitgestalten möchtest, Anregungen oder Kritik hast.',
  ];

  return <GroupPage title="OBV Westerloy" imageSrc="/Muehlenhof.jpg" content={content} />;
}
