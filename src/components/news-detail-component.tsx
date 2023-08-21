import Image from 'next/image';

export default function NewsDetailComponent() {
  return (
    <div className="mt-10 w-full">
      <div className="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative" style={{ height: 24 + 'em' }}>
        <div className="absolute left-0 bottom-0 w-full h-full z-10 news-item-header"></div>
        <Image
          src="/Muehlenhof.jpg"
          width={1920}
          height={1080}
          alt=""
          className="absolute left-0 top-0 w-full h-full z-0 object-cover"
        />
        <div className="p-4 absolute bottom-0 left-0 z-20">
          <h2 className="text-4xl font-semibold text-gray-100 leading-tight">Dies ist ein Titel</h2>
        </div>
      </div>
      <div className="px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
        diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
        takimata sanctus est Lorem ipsum dolor sit amet.
      </div>
    </div>
  );
}
