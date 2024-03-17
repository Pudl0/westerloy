import { EventEntry } from '@/lib/types/event-entry';
import { authOptions } from '@/lib/utils/authOptions';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getServerSession } from 'next-auth/next';
import Image from 'next/image';
import Link from 'next/link';

const monthFormatter = new Intl.DateTimeFormat('de', { month: 'long' });

export default async function EventDashboardItem(props: { eventEntry: EventEntry }) {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-white drop-shadow-lg">
      <div className="max-h-96 overflow-hidden">
        <Image src={props.eventEntry.pictureLink} width={1000} height={600} alt="" />
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="flex justify-around bg-gray-300 p-4 font-bold uppercase leading-none text-gray-800 md:w-1/4 md:flex-col md:items-center md:justify-center">
          <div className="md:text-3xl xl:text-4xl">{props.eventEntry.timeOfEvent.getDate()}</div>
          <div className="md:text-lg xl:text-xl">{monthFormatter.format(props.eventEntry.timeOfEvent)}</div>
          <div className="md:text-lg xl:text-xl">{props.eventEntry.timeOfEvent.getFullYear()}</div>
        </div>
        <div className="flex flex-col gap-y-2 p-4 font-normal text-gray-800">
          <h1 className="text-xl font-bold tracking-tight text-gray-800 xl:text-2xl">{props.eventEntry.title}</h1>
          <p className="text-ms leading-normal xl:text-lg">{props.eventEntry.description}</p>
          <div className="flex flex-row items-center gap-2 text-gray-700">
            <FontAwesomeIcon icon={faLocationDot} className="fas fa-location-dot" />
            <div className="text-ms xl:text-lg">{props.eventEntry.location}</div>
            {session && (
              <Link
                href={{
                  pathname: 'editor/edit/veranstaltungen/[newsdetailid]',
                  query: {
                    id: props.eventEntry.id,
                    title: props.eventEntry.title,
                    description: props.eventEntry.description,
                    location: props.eventEntry.location,
                    timeOfEvent: props.eventEntry.timeOfEvent.getDate(),
                  },
                }}
                as={`editor/edit/veranstaltungen/${props.eventEntry.id}`}
              >
                Event bearbeiten
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
