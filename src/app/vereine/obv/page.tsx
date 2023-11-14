import Image from 'next/image';

export default async function OBV() {
  return (
    <div className="mt-10 w-full">
      <div className="relative mx-auto mb-4 w-full max-w-screen-md md:mb-0" style={{ height: 24 + 'em' }}>
        <div className="news-item-header absolute bottom-0 left-0 z-10 h-full w-full rounded-xl"></div>
        <Image
          src="/Muehlenhof.jpg"
          width={1920}
          height={1080}
          alt=""
          className="absolute left-0 top-0 z-0 h-full w-full rounded-xl object-cover"
        />
        <div className="absolute bottom-0 left-0 z-20 p-4">
          <h2 className="text-4xl font-semibold leading-tight text-gray-100">OBV Westerloy</h2>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-screen-md text-lg leading-relaxed text-gray-700">
        <p className="pb-6">
          Seit mehr als einem halben Jahrhundert setzen wir uns engagiert als Ortsbürgerverein Westerloy für die Belange
          unserer Dorfbewohner*innen ein. Wir möchten ein lebendiges Miteinander von Jung & Alt unterstützen und das
          Lokale fördern.
        </p>
        <p className="pb-6">
          Mit zahlreichen tollen Veranstaltungen und Aktionen auch zusammen mit unserer Landjugend beleben wir unser
          Dorf rund um unseren Dorfmittelpunkt - unseren Mühlenhof - unser Dorfgemeinschaftshaus.
        </p>
        <p className="pb-6">
          Wir freuen uns sehr, wenn auch du unser Dorfleben mitgestalten möchtest, Anregungen oder Kritik hast.
        </p>
      </div>
    </div>
  );
}
