'use client';
import { Tab, Tabs as TabsUI } from '@nextui-org/react';
import Categories from './categories';
import Products from './products';

export default function Tabs() {
  return (
    <div className="flex w-full flex-col">
      <TabsUI
        fullWidth
        aria-label="Options"
        color="primary"
        className="font-bold"
        radius="none"
      >
        <Tab key="productos" title="PRODUCTOS">
          <Products />
        </Tab>
        <Tab key="categorias" title="CATEGORIAS">
          <Categories />
        </Tab>
      </TabsUI>
    </div>
  );
}
