import { Clock, Edit, MapPin } from 'lucide-react';
import { getServerSession } from 'next-auth/next';
import Image from 'next/image';
import Link from 'next/link';

import { EventEntry } from '@/lib/types/event-entry';
import { authOptions } from '@/lib/utils/authOptions';

const monthFormatter = new Intl.DateTimeFormat('de', { month: 'long' });

export default async function EventDashboardItem({ eventEntry }: { eventEntry: EventEntry }) {
  const session = await getServerSession(authOptions);
  const dateString = `${eventEntry.timeOfEvent.getDate()}. ${monthFormatter.format(
    eventEntry.timeOfEvent
  )} ${eventEntry.timeOfEvent.getFullYear()}`;

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 hover:scale-105">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <Image
              src={eventEntry.pictureLink}
              alt={`Event: ${eventEntry.title}`}
              width={400}
              height={300}
              className="h-48 w-full object-cover md:h-full md:w-48"
            />
          </div>
          <div className="p-8">
            <div className="mb-1 text-sm font-semibold uppercase tracking-wide text-black">{dateString}</div>
            <h3 className="mb-2 text-2xl font-bold text-gray-900">{eventEntry.title}</h3>
            <p className="mt-2 line-clamp-3 text-gray-600">{eventEntry.description}</p>
            <div className="mt-4 flex items-center text-gray-600">
              <Clock className="mr-2 h-5 w-5" />
              <span className="text-sm">{dateString}</span>
            </div>
            <div className="mt-2 flex items-center text-gray-600">
              <MapPin className="mr-2 h-5 w-5" />
              <span className="text-sm">{eventEntry.location}</span>
            </div>
            {session && (
              <Link
                href={{
                  pathname: 'editor/edit/veranstaltungen/[evententryid]',
                  query: {
                    id: eventEntry.id,
                    title: eventEntry.title,
                    description: eventEntry.description,
                    location: eventEntry.location,
                    timeOfEvent: eventEntry.timeOfEvent.getDate(),
                  },
                }}
                as={`editor/edit/veranstaltungen/${eventEntry.id}`}
                className="mt-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <Edit className="mr-2 h-5 w-5" />
                Event bearbeiten
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
