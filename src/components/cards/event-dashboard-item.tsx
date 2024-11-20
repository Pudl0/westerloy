'use client';

import { Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { MuehlenhofIcon } from '@/components/muehelnhof-icon';
import { EventEntry } from '@/lib/types/event-entry';

const monthFormatter = new Intl.DateTimeFormat('de', { month: 'long' });

export default function EventDashboardItem({ event }: { event: EventEntry }) {
  const [imageError, setImageError] = useState(false);

  // To-Do: Check this timezone hotfix
  const adjustedDate = new Date(event.attributes.TimeOfEvent);
  adjustedDate.setDate(adjustedDate.getDate() - 1);

  const dateString = `${adjustedDate.getDate()}. ${monthFormatter.format(adjustedDate)} ${adjustedDate.getFullYear()}`;

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 hover:scale-105">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            {!imageError ? (
              <Image
                src={event.attributes.Picture}
                alt={`Event: ${event.attributes.Title}`}
                width={400}
                height={300}
                className="h-48 w-full object-cover md:h-full md:w-48"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex h-48 w-full items-center justify-center bg-gray-200 md:h-full md:w-48">
                <MuehlenhofIcon className="h-24 w-24 text-gray-400" />
              </div>
            )}
          </div>
          <div className="p-8">
            <div className="mb-1 text-sm font-semibold uppercase tracking-wide text-black">{dateString}</div>
            <h3 className="mb-2 text-2xl font-bold text-gray-900">{event.attributes.Title}</h3>
            <p className="mt-2 line-clamp-3 text-gray-600">{event.attributes.Description}</p>
            <div className="mt-4 flex items-center text-gray-600">
              <Clock className="mr-2 h-5 w-5" />
              <span className="text-sm">{dateString}</span>
            </div>
            <div className="mt-2 flex items-center text-gray-600">
              <MapPin className="mr-2 h-5 w-5" />
              <span className="text-sm">{event.attributes.Location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
