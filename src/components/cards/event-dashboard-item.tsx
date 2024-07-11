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
      <div className="relative mx-auto flex max-w-sm flex-col rounded-xl border border-white bg-white p-3 shadow-lg md:max-w-3xl md:flex-row md:space-x-5 md:space-y-0 lg:max-w-6xl lg:space-y-3">
        <div className="grid w-1/2 place-items-center bg-white max-md:hidden lg:w-full">
          <Image src={props.eventEntry.pictureLink} alt="Eventfoto" className="rounded-xl" width={1920} height={1080} />
        </div>
        <div className="flex w-full flex-col bg-white xl:p-3">
          <div className="flex items-center justify-between self-end">
            {session && (
              <div className="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-800 max-xl:hidden">
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
              </div>
            )}{' '}
          </div>
          <h3 className="pb-3 text-base font-black text-gray-800 lg:text-2xl">{props.eventEntry.title}</h3>
          <p className="line-clamp-3 overflow-hidden text-ellipsis text-base text-gray-500 max-xl:hidden md:text-lg">
            {props.eventEntry.description}
          </p>
          <div className="flex gap-4 lg:absolute lg:bottom-9 lg:gap-8">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faClock} className="fa-regular" />
              <p className="ml-1 text-xs font-bold text-gray-600 lg:text-sm">{dateString}</p>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faLocationDot} className="fa-regular" />
              <p className="ml-1 text-xs font-bold text-gray-600 lg:text-sm">{props.eventEntry.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
