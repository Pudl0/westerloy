import Image from 'next/image';

import BackToDashboardButton from '@/components/ui/back-to-dashboard-button';

export default function OBV() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BackToDashboardButton />
      <div className="mx-auto max-w-3xl">
        <div className="relative mb-8 h-64 w-full overflow-hidden rounded-xl md:h-80">
          <Image src="/Muehlenhof.jpg" fill alt="Muehlenhof" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <h1 className="absolute bottom-4 left-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            OBV Westerloy
          </h1>
        </div>
        <div className="rounded-lg bg-gray-50 p-6 text-xl leading-relaxed text-gray-800 shadow-md">
          <p className="mb-6">
            Seit mehr als einem halben Jahrhundert setzen wir uns engagiert als Ortsbürgerverein Westerloy für die
            Belange unserer Dorfbewohner*innen ein. Wir möchten ein lebendiges Miteinander von Jung & Alt unterstützen
            und das Lokale fördern.
          </p>
          <p className="mb-6">
            Mit zahlreichen tollen Veranstaltungen und Aktionen auch zusammen mit unserer Landjugend beleben wir unser
            Dorf rund um unseren Dorfmittelpunkt - unseren Mühlenhof - unser Dorfgemeinschaftshaus.
          </p>
          <p>Wir freuen uns sehr, wenn auch du unser Dorfleben mitgestalten möchtest, Anregungen oder Kritik hast.</p>
        </div>
      </div>
    </div>
  );
}
