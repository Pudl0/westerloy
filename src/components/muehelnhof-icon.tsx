import Image from 'next/image';
import Link from 'next/link';

export function MuehlenhofIcon() {
  return (
    <Link href="/" aria-label="Go to homepage">
      <div className="flex items-center justify-center">
        <Image
          src="/Muehlenhof_Icon.png"
          alt="Muehlenhof Logo"
          width={301}
          height={183}
          className="h-auto w-32 max-w-full transition-transform duration-300 ease-in-out hover:scale-105"
          priority
        />
      </div>
    </Link>
  );
}
