'use client';
import { Menu as AdminMenu } from '@/app/ui/admin/menu';
import { Menu as UserMenu } from '@/app/ui/menu';
import { NavbarBrand, NavbarContent, NavbarMenu, NavbarMenuToggle, Navbar as NavbarUI } from '@nextui-org/navbar';
import NextLink from 'next/link';
import { useState } from 'react';

export const Navbar = ({ session }: { session: any }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para manejar la apertura del menú

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false); // Cierra el menú
  };

  return (
    <NavbarUI
      classNames={{
        base: 'gap-6',
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
            <img alt="Anastassa logo" className="h-20" src="/anastassa-logo.png" />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="basis-full max-w-min min-w-[50px] sm:hidden" justify="end" />

      <NavbarMenu className="px-0 bg-[#faf9f6] pt-6">
        <div className="flex flex-col h-full bg-[#faf9f6] gap-4 px-4">
          <UserMenu onClose={handleCloseMenu} />
          {session && <AdminMenu />}

          <div className="mt-auto pb-8 flex justify-center border-t border-gray-200 pt-6">
            <NextLink
              className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors text-sm uppercase tracking-wider"
              href="https://instagram.com/anastassa__"
              rel="noreferrer"
              target="_blank"
              title="Instagram"
            >
              <img alt="Instagram" className="w-5 h-5 opacity-70" src="/instagram.svg" />
              anastassa__
            </NextLink>
          </div>
        </div>
      </NavbarMenu>
    </NavbarUI>
  );
};
