'use client';
import { Tabs as TabsUI, Tab, Card, CardBody } from '@nextui-org/react';
import Categories from './categories';
import Products from './products';

export default function Tabs() {
  return (
    <div className="flex w-full flex-col">
      <TabsUI fullWidth aria-label="Options">
        <Tab key="productos" title="PRODUCTOS">
          <Card>
            <CardBody>
              <Products />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="categorias" title="CATEGORIAS">
          <Card>
            <CardBody>
              <Categories />
            </CardBody>
          </Card>
        </Tab>
      </TabsUI>
    </div>
  );
}
