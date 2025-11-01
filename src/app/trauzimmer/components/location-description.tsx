export default function LocationDescription() {
  return (
    <section className="relative px-4 py-12 md:py-16">
      <div className="absolute left-1/2 top-0 h-1 w-24 -translate-x-1/2 bg-primary/20" />

      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Das Trauzimmer im Mühlenhof</h2>
          <div className="mx-auto h-1 w-24 bg-primary" />
        </div>

        <div className="prose prose-lg max-w-none leading-relaxed text-foreground/80">
          <p className="mb-6">Absatz 1 der tollen Beschreibung.</p>

          <p className="mb-6">Absatz 2 der tollen Beschreibung.</p>

          <p>Absatz 3 der tollen Beschreibung.</p>
        </div>
      </div>
    </section>
  );
}
