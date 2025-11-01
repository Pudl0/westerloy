import ContactSection from './components/contact-section';
import LocationDescription from './components/location-description';
import LocationFeatures from './components/location-features';
import LocationGallery from './components/location-gallery';
import WeddingLocationHero from './components/wedding-location-hero';

export default function TrauzimmerPage() {
  return (
    <main className="min-h-screen">
      <WeddingLocationHero />
      <LocationDescription />
      <LocationGallery />
      <LocationFeatures />
      <ContactSection />
    </main>
  );
}
