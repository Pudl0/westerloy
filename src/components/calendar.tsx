"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { RefreshCw } from "lucide-react"
import ICAL from "ical.js"
// Import for German locale for date-fns (used by the Calendar component)
import { de } from "date-fns/locale"
import { getEnvironmentData } from "worker_threads"

type Event = {
  id: string
  summary: string
  start: Date
  end: Date
  isBooked: boolean
  description?: string
  location?: string
}

const HARDCODED_ICS_URL = process.env.ICSLink

export function CalendarWithICS() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedDateEvents, setSelectedDateEvents] = useState<Event[]>([])

  const fetchAndParseICS = async () => {
    setIsLoading(true)
    try {
      // Direct fetch - note that this might cause CORS issues depending on the server
      const response = await fetch(`${HARDCODED_ICS_URL}`, {
        // Adding no-cors mode to avoid CORS issues
        mode: "no-cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "text/calendar",
        },
      })

      // Since no-cors mode might return an opaque response, we need to handle it differently
      let icsData: string
      try {
        icsData = await response.text()
      } catch (error) {
        console.error("Error reading response:", error)
        // If we can't read the response, we'll show a more specific error in the console
        throw new Error("Konnte die Kalenderdaten nicht lesen. CORS-Einschränkungen könnten der Grund sein.")
      }

      // Parse the ICS data
      const jcalData = ICAL.parse(icsData)
      const comp = new ICAL.Component(jcalData)
      const vevents = comp.getAllSubcomponents("vevent")

      const parsedEvents: Event[] = vevents.map((vevent) => {
        const event = new ICAL.Event(vevent)
        const summary = event.summary || "Unbenannter Termin"
        const description = event.description || ""
        const location = event.location || ""
        const start = event.startDate.toJSDate()
        const end = event.endDate.toJSDate()

        // Determine if event is booked based on description or summary
        const isBooked =
          description.toLowerCase().includes("gebucht") ||
          description.toLowerCase().includes("booked") ||
          summary.toLowerCase().includes("gebucht") ||
          summary.toLowerCase().includes("booked") ||
          !description.toLowerCase().includes("verfügbar") ||
          !description.toLowerCase().includes("available")

        return {
          id: event.uid || crypto.randomUUID(),
          summary,
          description,
          location,
          start,
          end,
          isBooked,
        }
      })

      setEvents(parsedEvents)
      updateSelectedDateEvents(selectedDate, parsedEvents)

      console.log(`Kalender aktualisiert: ${parsedEvents.length} Termine geladen`)
    } catch (error) {
      console.error("Fehler beim Abrufen oder Parsen der ICS-Datei:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateSelectedDateEvents = (date: Date | undefined, eventsList: Event[] = events) => {
    if (!date) return

    const eventsOnSelectedDate = eventsList.filter((event) => {
      const eventDate = new Date(event.start)
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      )
    })

    setSelectedDateEvents(eventsOnSelectedDate)
  }

  useEffect(() => {
    // Automatically fetch calendar data when component mounts
    fetchAndParseICS()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    updateSelectedDateEvents(selectedDate)
  }, [selectedDate])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_300px]">
      <Card>
        <CardHeader>
          <CardTitle>Kalender</CardTitle>
          <CardDescription>Sehen Sie Ihre Verfügbarkeit und gebuchten Termine</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              locale={de} // Using the imported date-fns locale
              modifiers={{
                booked: (date) => {
                  return events.some((event) => {
                    const eventDate = new Date(event.start)
                    return (
                      eventDate.getDate() === date.getDate() &&
                      eventDate.getMonth() === date.getMonth() &&
                      eventDate.getFullYear() === date.getFullYear() &&
                      event.isBooked
                    )
                  })
                },
                available: (date) => {
                  return events.some((event) => {
                    const eventDate = new Date(event.start)
                    return (
                      eventDate.getDate() === date.getDate() &&
                      eventDate.getMonth() === date.getMonth() &&
                      eventDate.getFullYear() === date.getFullYear() &&
                      !event.isBooked
                    )
                  })
                },
              }}
              modifiersClassNames={{
                booked:
                  "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-800/30",
                available:
                  "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-300 dark:hover:bg-green-800/30",
              }}
              disabled={isLoading}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm">Verfügbar</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm">Gebucht</span>
            </div>
          </div>
          <Button onClick={fetchAndParseICS} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Wird geladen...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Kalender aktualisieren
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDate ? (
                <span>
                  Termine am{" "}
                  {selectedDate.toLocaleDateString("de-DE", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
              ) : (
                "Wählen Sie ein Datum"
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : selectedDateEvents.length > 0 ? (
              <div className="space-y-3">
                {selectedDateEvents.map((event) => (
                  <div key={event.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{event.summary}</h3>
                      <Badge
                        variant={event.isBooked ? "destructive" : "outline"}
                        className={
                          event.isBooked
                            ? ""
                            : "bg-green-100 text-green-800 hover:bg-green-200 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:hover:bg-green-800/30"
                        }
                      >
                        {event.isBooked ? "Gebucht" : "Verfügbar"}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {formatTime(event.start)} - {formatTime(event.end)}
                    </div>
                    {event.description && <p className="text-sm mt-2 line-clamp-2">{event.description}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                {events.length > 0 ? "Keine Termine an diesem Tag" : "Kalender wird geladen..."}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
