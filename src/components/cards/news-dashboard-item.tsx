import { NewsEntry } from '@/lib/types/news-entry';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';

export default function NewsDashboardItem(props: { newsentry: NewsEntry }) {
  return (
    <div className="flex flex-col lg:max-w-lg lg:max-h-lg max-h-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <Image className="rounded-t-lg h-3/4" src="/Muehlenhof.jpg" width={800} height={600} alt="" />
      <div className="p-4 flex flex-col">
        <div className="p-3">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {props.newsentry.title}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">{props.newsentry.shortDescription}</p>
        </div>
        <button className="inline-flex self-end items-center p-2 text-sm font-medium text-black rounded-lg gap-2 hover:bg-slate-100">
          <Link
            href={{
              pathname: 'newsdetail/[newsdetailid]',
              query: {
                newsdetailid: props.newsentry.id.toString(),
              },
            }}
            as={`newsdetail/${props.newsentry.id}`}
          >
            Zum Artikel
          </Link>
          <FontAwesomeIcon icon={faArrowRight} className="fas fa-arrow-right"></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
}
