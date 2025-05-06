import { CalendarWithICS } from "@/components/calendar"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin } from "lucide-react"

export default function CalendarPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Terminkalender</h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Hier können Sie unsere Verfügbarkeit einsehen und Termine planen. Grüne Tage sind vollständig verfügbar,
            gelbe Tage sind teilweise gebucht und rote Tage sind ganztägig gebucht.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        <div className="grid gap-8 md:grid-cols-[2fr_1fr] lg:grid-cols-[3fr_1fr]">
          {/* Calendar Section - Now first on all screen sizes */}
          <div className="md:order-1">
            <CalendarWithICS />
          </div>

          {/* Contact Information - Now second on all screen sizes */}
          <div className="md:order-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Kontaktinformationen</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? Kontaktieren Sie uns gerne direkt.
                </p>

                <div className="space-y-3 mt-6">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-primary mr-3" />
                    <span>+49 (0) 123 456789</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-primary mr-3" />
                    <span>termine@example.com</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <span>
                      Musterstraße 123
                      <br />
                      12345 Musterstadt
                      <br />
                      Deutschland
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
