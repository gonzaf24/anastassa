import { useAppContext } from '@/app/context/app-context';
import { ProductProps } from '@/app/lib/definitions';
import Modal from '@/app/ui/admin/modal';
import styles from '@/app/ui/admin/table.module.css';
import { Button, Spinner } from '@nextui-org/react';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import { useCallback, useMemo, useState } from 'react';
import CreateProductForm from './create-product-form';
import DeleteProduct from './delete-product';
import UpdateProductForm from './update-product-form';

export default function Products() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(null);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const { products, categories, isLoadingProducts } = useAppContext();

  // Close modal callback to avoid unnecessary re-renders
  const handleCloseModal = useCallback(() => {
    setIsEditModalOpen(false);
  }, []);

  // Memoize products table rows to avoid re-rendering when not necessary
  const productRows = useMemo(() => {
    return products.map((product, index) => (
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
    ));
  }, [products]);

  const handleEditProduct = useCallback((product: ProductProps) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  }, []);

  const handleDeleteProduct = useCallback((product: ProductProps) => {
    setSelectedProduct(product);
    setIsAlertDialogOpen(true);
  }, []);

  return (
    <>
      <Modal buttonTitle="Nuevo Producto" modalTitle="Nuevo Producto">
        <CreateProductForm categories={categories} />
      </Modal>

      <Modal isOpen={isEditModalOpen} onOpenChange={setIsEditModalOpen} modalTitle="Editar Producto">
        <UpdateProductForm categories={categories} product={selectedProduct} onClose={handleCloseModal} />
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
        <TableBody isLoading={isLoadingProducts} loadingContent={<Spinner label="Buscando productos..." />}>
          {isLoadingProducts ? [] : productRows}
        </TableBody>
      </Table>
    </>
  );
}
