"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { RefreshCw, Clock, CalendarIcon } from "lucide-react"
import ICAL from "ical.js"
import { de } from "date-fns/locale"

type Event = {
  id: string
  summary: string
  start: Date
  end: Date
  isBooked: boolean
  description?: string
  location?: string
  isFullDay: boolean
}

export function CalendarWithICS() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedDateEvents, setSelectedDateEvents] = useState<Event[]>([])
  const [error, setError] = useState<string | null>(null)

  const fetchAndParseICS = async () => {
    setIsLoading(true)
    setError(null)

    // Get the ICS URL from environment variable
    const icsUrl = process.env.NEXT_PUBLIC_ICS_LINK

    if (!icsUrl) {
      setError("Keine ICS-URL konfiguriert. Bitte überprüfen Sie Ihre Umgebungsvariablen.")
      setIsLoading(false)
      return
    }

    try {
      // Use our API route to proxy the request and avoid CORS issues
      const proxyUrl = `/api/proxy-ics?url=${encodeURIComponent(icsUrl)}`
      const response = await fetch(proxyUrl)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const icsData = await response.text()

      if (!icsData || icsData.trim() === "") {
        throw new Error("Leere ICS-Daten erhalten")
      }

      try {
        // Parse the ICS data
        const jcalData = ICAL.parse(icsData)
        const comp = new ICAL.Component(jcalData)
        const vevents = comp.getAllSubcomponents("vevent")

        if (vevents.length === 0) {
          setError("Keine Termine im Kalender gefunden. Der Feed enthält möglicherweise keine Ereignisse.")
          setIsLoading(false)
          return
        }

        const parsedEvents: Event[] = []

        for (const vevent of vevents) {
          try {
            const event = new ICAL.Event(vevent)

            // Skip events without valid dates
            if (!event.startDate || !event.endDate) {
              continue
            }

            const summary = event.summary || "Unbenannter Termin"
            const description = event.description || ""
            const location = event.location || ""

            // Check if this is a full-day event
            const isFullDay = event.startDate.isDate && !event.startDate.hour && !event.startDate.minute

            // For full-day events, we need to handle the dates differently
            let start, end

            if (isFullDay) {
              // For full-day events, use the date without time components
              start = new Date(
                event.startDate.year,
                event.startDate.month - 1, // JavaScript months are 0-based
                event.startDate.day,
              )

              // For full-day events, the end date in ICS is typically exclusive
              // So we need to subtract one day to get the actual end date
              const endDate = event.endDate.toJSDate()
              endDate.setDate(endDate.getDate() - 1)
              end = endDate
            } else {
              // For regular events, use the full date-time
              start = event.startDate.toJSDate()
              end = event.endDate.toJSDate()
            }

            // All calendar entries are considered booked by default
            const isBooked = true

            parsedEvents.push({
              id: event.uid || crypto.randomUUID(),
              summary,
              description,
              location,
              start,
              end,
              isBooked,
              isFullDay,
            })
          } catch (eventError) {
            // Skip events that can't be parsed
          }
        }

        if (parsedEvents.length === 0) {
          setError("Keine gültigen Termine gefunden. Überprüfen Sie das Format Ihrer ICS-Datei.")
          setIsLoading(false)
          return
        }

        setEvents(parsedEvents)
        updateSelectedDateEvents(selectedDate, parsedEvents)
      } catch (parseError) {
        setError("Die Kalenderdaten konnten nicht verarbeitet werden. Bitte überprüfen Sie die ICS-URL.")
        throw parseError
      }
    } catch (error) {
      setError(
        `Kalenderdaten konnten nicht geladen werden: ${error instanceof Error ? error.message : "Unbekannter Fehler"}`,
      )
    } finally {
      setIsLoading(false)
    }
  }

  const updateSelectedDateEvents = (date: Date | undefined, eventsList: Event[] = events) => {
    if (!date) return

    const eventsOnSelectedDate = eventsList.filter((event) => {
      // For regular events, check if the event starts on the selected date
      if (!event.isFullDay) {
        const eventDate = new Date(event.start)
        return (
          eventDate.getDate() === date.getDate() &&
          eventDate.getMonth() === date.getMonth() &&
          eventDate.getFullYear() === date.getFullYear()
        )
      }

      // For full-day events, check if the selected date falls within the event's date range
      const selectedDateTime = date.getTime()
      const eventStartTime = new Date(event.start).setHours(0, 0, 0, 0)
      const eventEndTime = new Date(event.end).setHours(23, 59, 59, 999)

      return selectedDateTime >= eventStartTime && selectedDateTime <= eventEndTime
    })

    setSelectedDateEvents(eventsOnSelectedDate)
  }

  // Helper function to check if a date has full-day events
  const hasFullDayEvents = (date: Date) => {
    return events.some((event) => {
      if (!event.isFullDay) return false

      const dateTime = date.getTime()
      const eventStartTime = new Date(event.start).setHours(0, 0, 0, 0)
      const eventEndTime = new Date(event.end).setHours(23, 59, 59, 999)

      return dateTime >= eventStartTime && dateTime <= eventEndTime
    })
  }

  // Helper function to check if a date has regular (non-full-day) events
  const hasRegularEvents = (date: Date) => {
    return events.some((event) => {
      if (event.isFullDay) return false

      const eventDate = new Date(event.start)
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      )
    })
  }

  // Helper function to check if a date has any events
  const hasEvents = (date: Date) => {
    return hasFullDayEvents(date) || hasRegularEvents(date)
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

  const formatDateRange = (start: Date, end: Date) => {
    // If start and end are on the same day, just return "Ganztägig"
    if (
      start.getDate() === end.getDate() &&
      start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear()
    ) {
      return "Ganztägig"
    }

    // Otherwise, return a date range
    const startFormatted = start.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
    })

    const endFormatted = end.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
    })

    return `${startFormatted} - ${endFormatted}`
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
                fullyBooked: (date) => {
                  return hasFullDayEvents(date)
                },
                partlyBooked: (date) => {
                  return !hasFullDayEvents(date) && hasRegularEvents(date)
                },
                available: (date) => {
                  return !hasEvents(date)
                },
              }}
              modifiersClassNames={{
                fullyBooked:
                  "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-800/30",
                partlyBooked:
                  "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:hover:bg-yellow-800/30",
                available:
                  "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-300 dark:hover:bg-green-800/30",
              }}
              disabled={isLoading}
            />
          </div>

          {error && <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-md text-sm">{error}</div>}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm">Verfügbar</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm">Teilweise gebucht</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm">Ganztägig gebucht</span>
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
                        variant={event.isFullDay ? "destructive" : "outline"}
                        className={
                          event.isFullDay
                            ? ""
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:hover:bg-yellow-800/30"
                        }
                      >
                        {event.isFullDay ? "Ganztägig" : "Gebucht"}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      {event.isFullDay ? (
                        <>
                          <CalendarIcon className="mr-1 h-3 w-3" />
                          {formatDateRange(event.start, event.end)}
                        </>
                      ) : (
                        <>
                          <Clock className="mr-1 h-3 w-3" />
                          {formatTime(event.start)} - {formatTime(event.end)}
                        </>
                      )}
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
