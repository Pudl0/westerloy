import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")

  if (!url) {
    return NextResponse.json({ error: "URL-Parameter ist erforderlich" }, { status: 400 })
  }

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "text/calendar,text/x-vcalendar,application/calendar+xml,*/*",
      },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `Fehler beim Abrufen der ICS-Datei: ${response.statusText}` },
        { status: response.status },
      )
    }

    const icsData = await response.text()

    // Basic validation to check if it looks like an ICS file
    if (!icsData.includes("BEGIN:VCALENDAR")) {
      return NextResponse.json({ error: "Die Antwort enthält keine gültige ICS-Datei" }, { status: 400 })
    }

    return new NextResponse(icsData, {
      headers: {
        "Content-Type": "text/calendar",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate",
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: "Fehler beim Abrufen der ICS-Datei",
        details: error instanceof Error ? error.message : "Unbekannter Fehler",
      },
      { status: 500 },
    )
  }
}
