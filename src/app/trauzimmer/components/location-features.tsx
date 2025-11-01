import { Check } from 'lucide-react';

export default function LocationFeatures() {
  const features = ['Hier', 'tolle', 'Location', 'Features'];

  return (
    <section className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Ausstattung & Annehmlichkeiten</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Alles, was Sie für eine perfekte Feier benötigen
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <span className="leading-relaxed text-foreground/80">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
