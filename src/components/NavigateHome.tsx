'use client';

import { HomeIcon } from '@heroicons/react/24/outline';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';

export default function NavigateHome() {
  const router = useRouter();

  return (
    <Button
      onPress={() => router.push('/')}
      isIconOnly
      aria-label="Домой"
    >
      <HomeIcon className="h-6 w-6" />
    </Button>
  );
}
