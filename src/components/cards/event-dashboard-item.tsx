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
      <div className="relative mx-auto flex max-w-sm flex-col rounded-xl border bg-westerloyPrimary p-3 shadow-lg md:max-w-3xl md:flex-row md:space-x-5 md:space-y-0 lg:max-w-6xl lg:space-y-3">
        <div className="grid w-1/2 place-items-center max-md:hidden lg:w-full">
          <Image src={props.eventEntry.pictureLink} alt="Eventfoto" className="rounded-xl" width={1920} height={1080} />
        </div>
        <div className="flex w-full flex-col xl:p-3">
          <div className="flex items-center justify-between self-end">
            {session && (
              <div className="rounded-full bg-westerloySecondary px-3 py-1 text-xs font-medium text-black hover:bg-westerloyAccent max-xl:hidden">
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
          <h3 className="text-base font-black text-black max-md:pb-3 lg:pb-3 lg:text-2xl">{props.eventEntry.title}</h3>
          <p className="overflow-hidden text-ellipsis text-base text-black max-md:hidden md:line-clamp-1 md:text-lg lg:line-clamp-2 xl:line-clamp-3">
            {props.eventEntry.description}
          </p>
          <div className="flex gap-4 md:absolute md:bottom-3 lg:bottom-6 lg:gap-8">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faClock} className="fa-regular" />
              <p className="ml-1 text-xs font-bold text-black lg:text-sm">{dateString}</p>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faLocationDot} className="fa-regular" />
              <p className="ml-1 text-xs font-bold text-black lg:text-sm">{props.eventEntry.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
