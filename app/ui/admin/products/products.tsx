'use client';
import { CategoryProps } from '@/app/lib/definitions';
import { ProductsData } from '@/app/lib/hardcoded-data';
import Modal from '@/app/ui/admin/modal';
import styles from '@/app/ui/admin/table.module.css';
import { Button } from '@nextui-org/react';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';
import CreateProductForm from './create-product-form';

export default function Products({
  categories,
}: {
  categories: CategoryProps[];
}) {
  return (
    <>
      <Modal buttonTitle="Nuevo Producto" modalTitle="Nuevo Producto">
        <CreateProductForm categories={categories} />
      </Modal>
      <Table
        selectionMode="single"
        aria-label="Products table"
        isStriped
        fullWidth
        className={styles.table}
        color="primary"
        radius="none"
        classNames={{
          wrapper: 'p-0',
          th: 'bg-primary/75 font-bold text-black rounded-none border-1',
          td: 'rounded-none border-1',
        }}
      >
        <TableHeader className="bg-black">
          <TableColumn>#</TableColumn>
          <TableColumn>Ref.</TableColumn>
          <TableColumn>Nom. Categoria</TableColumn>
          <TableColumn>Descripción</TableColumn>
          <TableColumn width={20}>Fotos</TableColumn>
          <TableColumn width={20}>Editar</TableColumn>
          <TableColumn width={20}>Eliminar</TableColumn>
        </TableHeader>
        <TableBody>
          {ProductsData &&
            ProductsData.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.ref}</TableCell>
                <TableCell>{product.categoryId}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell className="text-center">
                  <Button className="bg-transparent p-1 min-w-min">
                    <img alt="photos" className="w-8" src="/photos.svg" />
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  <Button className="bg-transparent p-1 min-w-min">
                    <img alt="edit" className="w-6" src="/edit.svg" />
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  <Button className="bg-transparent p-1 min-w-min">
                    <img alt="delete" className="w-7" src="/delete.svg" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          {/*  <TableRow key="1">
            <TableCell>0</TableCell>
            <TableCell>1</TableCell>
            <TableCell>MUJER-CHALECOS </TableCell>
            <TableCell>Chaleco de mujer</TableCell>
            <TableCell className="text-center">
              <Button className="bg-transparent p-1 min-w-min">
                <img alt="photos" className="w-8" src="/photos.svg" />
              </Button>
            </TableCell>
            <TableCell className="text-center">
              <Button className="bg-transparent p-1 min-w-min">
                <img alt="edit" className="w-6" src="/edit.svg" />
              </Button>
            </TableCell>
            <TableCell className="text-center">
              <Button className="bg-transparent p-1 min-w-min">
                <img alt="delete" className="w-7" src="/delete.svg" />
              </Button>
            </TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </>
  );
}
