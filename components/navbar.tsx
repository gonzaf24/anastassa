"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
} from "@nextui-org/navbar";
import NextLink from "next/link";

import Menu from "@/components/menu";

export const Navbar = () => {
  return (
    <NextUINavbar
      classNames={{
        base: "gap-6",
      }}
      height="100px"
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent className="basis-full max-w-min z-10" justify="start">
        <div className="sm:hidden">
          <NavbarMenuToggle className="h-[50px] border-1 border-gray-200 p-2 rounded-md w-[50px]" />
        </div>
        <div className="hidden sm:flex w-[176px]" />
      </NavbarContent>

      <NavbarContent
        className="basis-full min-w-[150px] absolute top-0 left-0 right-0 bottom-0 sm:relative sm:top-auto sm:bottom-auto sm:left-auto sm:right-auto z-0 "
        justify="center"
      >
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-center items-center gap-1" href="/">
            <img
              alt="Anastassa logo"
              className="h-24"
              src="/anastassa-logo.png"
            />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="basis-full max-w-min min-w-[50px] sm:hidden"
        justify="end"
      />

      <NavbarMenu>
        <div className="flex flex-col gap-2 bg-[#ef8482]">
          <Menu />
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
