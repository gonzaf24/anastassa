'use client';
import { Button } from '@nextui-org/button';
import Link from 'next/link';

import { useAppContext } from '../context/app-context';
import { MenuSkeleton } from './skeletons';

export const Menu = ({ onClose }: { onClose?: () => void }) => {
  const { categories, isLoadingCategories } = useAppContext();

  return (
    <div className="flex flex-col gap-1 uppercase py-5">
      {isLoadingCategories && <MenuSkeleton />}
      {!isLoadingCategories &&
        categories.map((category) => (
          <Button
            key={category.id}
            as={Link}
            className="py-1 h-auto w-full flex justify-start bg-transparent font-bold text-[#414141] text-md whitespace-normal rounded-none cursor-pointer"
            href={`/${category.name}-${category.id}`}
            onClick={onClose}
          >
            {category.name}
          </Button>
        ))}
    </div>
  );
};
