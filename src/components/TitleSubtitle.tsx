import { HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type Props = {
  title: string;
  subtitle?: string;
  hideHomeButton?: boolean;
};

export default function TitleSubtitle({ title, subtitle, hideHomeButton }: Props) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white shadow-sm">
      {!hideHomeButton && (
        <Link href="/" className="text-gray-500 hover:text-gray-700">
          <HomeIcon className="h-6 w-6" />
        </Link>
      )}
      <div className="text-center flex-1">
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      <div className="w-6" /> {/* spacer to balance the home icon */}
    </div>
  );
}