"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useSession } from 'next-auth/react';

import { categories } from "@/app/lib/hardcoded-data";

export const Menu = ({ children,  onClose }: { children?: React.ReactNode, onClose?: () => void }) => {
  const session = useSession();
  const user = session.data?.user;

  const handleCloseMenu = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="flex flex-col gap-1 uppercase py-5">
      {categories.map((category) => (
        <Button
          key={category.id}
          as={Link}
          className="py-1 h-auto w-full flex justify-start bg-transparent font-bold text-[#414141] text-md whitespace-normal rounded-none cursor-pointer"
          href={category.href}
          onClick={handleCloseMenu}
        >
          {category.label}
        </Button>
      ))}
      {!user && <Button as={Link} href="/login"> 
        Login
      </Button>
}
      {children}
    </div>
  );
};
