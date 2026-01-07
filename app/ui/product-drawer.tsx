'use client';
import { Button } from '@nextui-org/button';

import Carousel from '@/components/carousel';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { ProductsProps } from '../lib/definitions';

export function ProductDrawer({ product, open, setOpen }: { product: ProductsProps; open: any; setOpen: any }) {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="bg-white h-[100dvh] w-full mt-0 mx-0 rounded-none max-w-none top-0 bottom-0 fixed inset-0 flex flex-col z-[9999]">
        <div className="mx-auto w-full h-full flex flex-col relative bg-white overflow-hidden m-0">
          {/* Mobile Header */}
          <div className="w-full flex items-center justify-end p-2 md:hidden bg-white min-h-[60px] border-b border-gray-50 z-50">
            <Button
              className="bg-transparent p-2 rounded-full min-w-0 w-12 h-12 flex items-center justify-center"
              onClick={() => setOpen(false)}
              isIconOnly
              aria-label="Cerrar"
            >
              <img alt="" className="w-6 h-6 opacity-100" src="/close.svg" />
            </Button>
          </div>

          {/* Desktop Floating Close Button */}
          <Button
            className="hidden md:flex absolute top-4 right-4 z-50 bg-transparent hover:bg-gray-100 p-2 rounded-full transition-all duration-300 min-w-0 w-14 h-14 items-center justify-center"
            onClick={() => setOpen(false)}
            isIconOnly
            aria-label="Cerrar"
          >
            <img alt="" className="w-8 h-8 opacity-60 hover:opacity-100 transition-opacity" src="/close.svg" />
          </Button>

          <div className="flex flex-col md:flex-row flex-1 h-full overflow-hidden">
            {/* Desktop: Left Side (Image), Mobile: Top */}
            <div className="w-full md:w-[60%] h-[60%] md:h-full bg-gray-50 relative flex items-center justify-center">
              <Carousel photos={product.photos} />
            </div>

            {/* Desktop: Right Side (Info), Mobile: Bottom */}
            <div className="w-full md:w-[40%] flex-1 md:h-full overflow-y-auto no-scrollbar flex flex-col justify-center bg-white border-l border-gray-100 h-[40%]">
              <div className="flex flex-col gap-6 p-6 md:p-20 items-center md:items-start text-center md:text-left h-full md:justify-center">
                <div className="space-y-4 w-full border-b border-gray-100 pb-8">
                  <p className="text-xs text-gray-400 font-medium tracking-[0.2em] uppercase">REF: {product.ref}</p>
                  <h2 className="text-xl md:text-3xl font-light text-gray-900 uppercase tracking-widest leading-tight">
                    {product.description}
                  </h2>
                </div>
                <div className="prose prose-sm text-gray-500 leading-relaxed max-w-sm">
                  <p>{product.description} .</p>
                  <p className="text-xs text-gray-400 mt-4 uppercase tracking-wider">Disponible en tienda</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
