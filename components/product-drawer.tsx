"use client";
import * as React from "react";

import Carousel from "./carousel";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
} from "@/components/ui/drawer";
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
        <div className="mx-auto w-full max-w-md h-[90vh] pt-10">
          <div className="">
            <Carousel photos={product.photos} />
          </div>
          <DrawerFooter>
            <DrawerTitle>REF: {product.ref} </DrawerTitle>
            <DrawerDescription> {product.title} </DrawerDescription>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
