import { RecapEntry } from '@/lib/types/recap-entry';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fs from 'fs';
import Image from 'next/image';
import Link from 'next/link';

export default function RecapDashboardItem(props: { recapentry: RecapEntry }) {
  const fileNames = fs.readdirSync(props.recapentry.folderLink);
  const fileName = fileNames[0];
  return (
    <div className="lg:max-h-lg max-h-sm flex flex-col rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 lg:max-w-lg">
      <Image
        className="h-3/4 rounded-t-lg"
        src={`/uploads/recap/${props.recapentry.title}` + '/' + fileName}
        width={800}
        height={600}
        alt=""
      />
      <div className="flex flex-col p-4">
        <div className="p-3">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {props.recapentry.title}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">{props.recapentry.shortDescription}</p>
        </div>
        <button className="inline-flex items-center gap-2 self-end rounded-lg p-2 text-sm font-medium text-black hover:bg-slate-100">
          <Link
            href={{
              pathname: '/dorfgeschehen/recap/[recapdetailid]',
              query: {
                recapdetailid: props.recapentry.id.toString(),
              },
            }}
            as={`/dorfgeschehen/recap/${props.recapentry.id}`}
          >
            Zum Artikel
          </Link>
          <FontAwesomeIcon icon={faArrowRight} className="fas fa-arrow-right"></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
}
