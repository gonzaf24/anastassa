'use client';
import { Button } from '@nextui-org/react';
import { signOut } from 'next-auth/react';

export function SignOutButton() {
  return (
    <Button
      className="py-1 h-auto w-full flex justify-start bg-transparent font-bold text-[#414141] text-md whitespace-normal rounded-none cursor-pointer"
      onClick={() => signOut()}
    >
      Log Out
    </Button>
  );
}
