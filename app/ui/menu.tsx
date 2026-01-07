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
            className="w-full h-auto min-h-[44px] flex justify-start items-center bg-transparent hover:bg-[#eae8e4] text-gray-800 font-medium text-sm tracking-widest uppercase py-3 px-4 rounded-lg transition-colors whitespace-normal text-left"
            href={`/${category.name}-${category.id}`}
            onClick={onClose}
          >
            {category.name}
          </Button>
        ))}
    </div>
  );
};
