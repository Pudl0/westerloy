import { getServerSession } from 'next-auth/next';
import Image from 'next/image';
import Link from 'next/link';

import { EventEntry } from '@/lib/types/event-entry';
import { authOptions } from '@/lib/utils/authOptions';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const monthFormatter = new Intl.DateTimeFormat('de', { month: 'long' });

export default async function EventDashboardItem(props: { eventEntry: EventEntry }) {
  const session = await getServerSession(authOptions);
  const dateString =
    props.eventEntry.timeOfEvent.getDate() +
    '. ' +
    monthFormatter.format(props.eventEntry.timeOfEvent) +
    ' ' +
    props.eventEntry.timeOfEvent.getFullYear();
  return (
    <div className="flex w-full flex-col justify-center">
      <div className="relative mx-auto flex max-w-xs flex-col space-y-3 rounded-xl border border-white bg-white p-3 shadow-lg md:max-w-3xl md:flex-row md:space-x-5 md:space-y-0 lg:max-w-6xl">
        <div className="grid w-full place-items-center bg-white md:w-2/3">
          <Image src={props.eventEntry.pictureLink} alt="Eventfoto" className="rounded-xl" width={1920} height={1080} />
        </div>
        <div className="flex w-full flex-col space-y-2 bg-white p-3 md:w-2/3">
          <div className="item-center flex justify-between">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faClock} className="fa-regular" />
              <p className="ml-2 text-sm font-bold text-gray-600">{dateString}</p>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faLocationDot} className="fa-regular" />
              <p className="ml-2 text-sm font-bold text-gray-600">{props.eventEntry.location}</p>
            </div>
            <div className="hidden rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-800 md:block">
              {session && (
                <Link
                  href={{
                    pathname: 'editor/edit/veranstaltungen/[evententryid]',
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
              )}{' '}
            </div>
          </div>
          <h3 className="text-xl font-black text-gray-800 md:text-3xl">{props.eventEntry.title}</h3>
          <p className="text-base text-gray-500 md:text-lg">{props.eventEntry.description}</p>
        </div>
      </div>
    </div>
  );
}
