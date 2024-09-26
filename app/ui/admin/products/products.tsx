/* eslint-disable no-unused-vars */
'use client';
import { CategoryProps, ProductProps } from '@/app/lib/definitions';
import Modal from '@/app/ui/admin/modal';
import styles from '@/app/ui/admin/table.module.css';
import { Button } from '@nextui-org/react';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import { useState } from 'react';
import CreateProductForm from './create-product-form';
import DeleteProduct from './delete-product';
import UpdateProductForm from './update-product-form';

export default function Products({ categories, products }: { categories: CategoryProps[]; products: ProductProps[] }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleCloseModalAndDelete = async (uploadedFiles: string[]) => {
    console.log('Delete files al cancelar :   ', uploadedFiles);

    for (const photo of uploadedFiles) {
      await fetch(`/api/photos?fileUrl=${photo}`, {
        method: 'DELETE',
      });
    }

    setIsEditModalOpen(false);
  };

  const handleEditProduct = (product: ProductProps) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteProduct = (product: ProductProps) => {
    setSelectedProduct(product);
    setIsAlertDialogOpen((prev) => !prev);
  };

  return (
    <>
      <Modal buttonTitle="Nuevo Producto" modalTitle="Nuevo Producto">
        <CreateProductForm categories={categories} />
      </Modal>
      {/*       here implement update product form
       */}
      <Modal isOpen={isEditModalOpen} onOpenChange={setIsEditModalOpen} modalTitle="Editar Producto">
        <UpdateProductForm
          categories={categories}
          product={selectedProduct}
          onClose={handleCloseModal}
          onCloseAndDelete={handleCloseModalAndDelete}
        />
      </Modal>
      <DeleteProduct
        isAlertOpen={isAlertDialogOpen}
        product={selectedProduct}
        setIsAlertDialogOpen={setIsAlertDialogOpen}
      />
      <Table
        selectionMode="single"
        aria-label="Products table"
        isStriped
        fullWidth
        isHeaderSticky
        className={styles.table}
        color="primary"
        radius="none"
        classNames={{
          wrapper: 'p-0',
          th: 'bg-primary font-bold text-black rounded-none border-1',
          td: 'rounded-none border-1',
        }}
      >
        <TableHeader className="bg-black">
          <TableColumn width={40} className="text-start">
            #
          </TableColumn>
          <TableColumn width={50}>Id</TableColumn>
          <TableColumn>Ref.</TableColumn>
          <TableColumn>Nom. Categoria</TableColumn>
          <TableColumn>Descripción</TableColumn>
          <TableColumn width={20}>Fotos</TableColumn>
          <TableColumn width={20}>Editar</TableColumn>
          <TableColumn width={20}>Eliminar</TableColumn>
        </TableHeader>
        <TableBody>
          {products &&
            products.map((product, index) => (
              <TableRow key={product.id}>
                <TableCell className="text-start">{index + 1}</TableCell>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.ref}</TableCell>
                <TableCell>{product.categoryName}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell className="text-center">
                  <Button className="bg-transparent p-1 min-w-min">
                    <img alt="photos" className="w-8" src="/photos.svg" />
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  <Button className="bg-transparent p-1 min-w-min" onPress={() => handleEditProduct(product)}>
                    <img alt="edit" className="w-6" src="/edit.svg" />
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  <Button className="bg-transparent p-1 min-w-min" onPress={() => handleDeleteProduct(product)}>
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
