"use client";
import * as React from "react";

import Carousel from "./carousel";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { ProductsProps } from "@/app/definitions";

export function ProductDrawer({
  product,
  open,
  setOpen,
}: {
  product: ProductsProps;
  open: any;
  setOpen: any;
}) {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md h-[85dvh] pt-10">
          <div className="">
            <Carousel photos={product.photos} />
          </div>
          <div className="flex flex-col gap-2 p-2">
            <p className="uppercase font-bold text-tiny text-[#ef8482]">
              REF: {product.ref}
            </p>
            <p className="text-tiny font-bold w-full text-left uppercase text-ellipsis whitespace-nowrap	overflow-hidden">
              {product.title}
            </p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
