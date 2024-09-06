"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import { useState } from "react";

import { Menu } from "@/components/menu";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para manejar la apertura del menú

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false); // Cierra el menú
  };

  return (
    <NextUINavbar
      classNames={{
        base: "gap-6",
      }}
      height="100px"
      isMenuOpen={isMenuOpen} // Controla la apertura del menú
      maxWidth="xl"
      position="sticky"
      onMenuOpenChange={setIsMenuOpen} // Maneja el cambio del estado del menú
    >
      <NavbarContent className="basis-full max-w-min z-10" justify="start">
        <div className="sm:hidden">
          <NavbarMenuToggle
            className="h-[50px] border-1 border-gray-200 p-2 rounded-md w-[50px]"
            onClick={handleMenuToggle} // Alterna el estado del menú al hacer clic
          />
        </div>
        <div className="hidden sm:flex w-[176px]" />
      </NavbarContent>

      <NavbarContent
        className="basis-full min-w-[150px] absolute top-0 left-0 right-0 bottom-0 sm:relative sm:top-auto sm:bottom-auto sm:left-auto sm:right-auto z-0"
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

      <NavbarMenu className="px-0">
        <div className="flex flex-col gap-2 bg-[#ef8482] h-full">
          <Menu onClose={handleCloseMenu} />
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
