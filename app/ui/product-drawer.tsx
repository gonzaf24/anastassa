'use client';
import { Button } from '@nextui-org/button';

import Carousel from '@/components/carousel';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { ProductsProps } from './product-list';

export function ProductDrawer({ product, open, setOpen }: { product: ProductsProps; open: any; setOpen: any }) {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md h-[85dvh] pt-10">
          <Button
            className="absolute top-1 right-1 bg-transparent min-w-min p-1 h-min rounded-full"
            onClick={() => setOpen(false)}
          >
            <img alt="close" className="w-12" src="/close.svg" />
          </Button>
          <Carousel photos={product.photos} />
          <div className="flex flex-col gap-2 p-2">
            <p className="uppercase font-bold text-tiny text-[#ef8482]">REF: {product.ref}</p>
            <p className="text-tiny font-bold w-full text-left uppercase text-ellipsis whitespace-nowrap	overflow-hidden">
              {product.description}
            </p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
