import { Button } from "@nextui-org/react";
import { SignOutButton } from "../sign-out-button";
import Link from "next/link";


export const Menu = () => {

  return (
    <div className="flex flex-col gap-1 py-5">
        <Button
          as={Link}
          className="py-1 h-auto w-full flex justify-start bg-transparent font-bold text-[#414141] text-md whitespace-normal rounded-none cursor-pointer"
          href={'/admin'}
        >
          Admin
        </Button>
        <SignOutButton />
    </div>
  );
};
