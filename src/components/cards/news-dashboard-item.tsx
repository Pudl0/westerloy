import { getServerSession } from 'next-auth/next';
import Image from 'next/image';
import Link from 'next/link';

import { NewsEntry } from '@/lib/types/news-entry';
import { authOptions } from '@/lib/utils/authOptions';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default async function NewsDashboardItem(props: { newsentry: NewsEntry }) {
  const session = await getServerSession(authOptions);
  return (
    <div className="lg:max-h-lg max-h-sm flex flex-col rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 lg:max-w-lg">
      <Image className="h-3/4 rounded-t-lg" src={props.newsentry.pictureLink} width={800} height={600} alt="" />
      <div className="flex flex-col p-4">
        <div className="p-3">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {props.newsentry.title}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">{props.newsentry.shortDescription}</p>
        </div>
        <button className="inline-flex items-center gap-2 self-end rounded-lg p-2 text-sm font-medium text-black hover:bg-slate-100">
          <Link
            href={{
              pathname: 'neigkeiten/beitrag/[newsdetailid]',
              query: {
                newsdetailid: props.newsentry.id.toString(),
              },
            }}
            as={`neuigkeiten/beitrag/${props.newsentry.id}`}
          >
            Zum Artikel
          </Link>
          <FontAwesomeIcon icon={faArrowRight} className="fas fa-arrow-right"></FontAwesomeIcon>
        </button>
        {session && (
          <Link
            href={{
              pathname: '/editor/edit/news/[newsdetailid]',
              query: {
                id: props.newsentry.id,
                title: props.newsentry.title,
                description: props.newsentry.description,
                shortDescription: props.newsentry.shortDescription,
              },
            }}
            as={`/editor/edit/news/${props.newsentry.id}`}
          >
            Nachricht bearbeiten
          </Link>
        )}
      </div>
    </div>
  );
}
