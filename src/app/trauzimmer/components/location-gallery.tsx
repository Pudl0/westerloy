export default function LocationGallery() {
  const images = [
    {
      src: '/trauzimmer/totale.jpeg',
      alt: 'Gesamtansicht des Trauzimmers',
    },
    {
      src: '/trauzimmer/tische_close.jpeg',
      alt: 'Festlich gedeckte Tische',
    },
    {
      src: '/trauzimmer/tische.jpeg',
      alt: 'Tischanordnung im Saal',
    },
    {
      src: '/trauzimmer/gaestebuch.jpeg',
      alt: 'Gästebuch-Tisch',
    },
    {
      src: '/trauzimmer/eingang.jpeg',
      alt: 'Eingang zum Trauzimmer',
    },
  ];

  return (
    <section id="galerie" className="bg-secondary/30 px-4 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Entdecken Sie unsere Location</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Entdecken Sie die Schönheit und Vielseitigkeit unserer Räumlichkeiten in unserer Galerie
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl ${
                index === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'
              }`}
            >
              <img
                src={image.src || '/placeholder.svg'}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
