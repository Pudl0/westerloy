import Image from 'next/image';
import Link from 'next/link';

import muehlenhofIconImage from '../../public/Muehlenhof_Icon.png';

export function MuehlenhofIcon() {
  return (
    <Link href="/" className="p-4">
      <div className="flex">
        <Image
          src={muehlenhofIconImage}
          alt="Picture of the Muehlenhof"
          width={301}
          height={183}
          className="h-20 w-32"
        />
      </div>
    </Link>
  );
}
