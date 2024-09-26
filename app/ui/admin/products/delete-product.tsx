import { deleteProduct } from '@/app/lib/actions';
import { ProductProps } from '@/app/lib/definitions';
import { useCallback } from 'react';
import { AlertDialog } from '../../alert-dialog';

export default function DeleteProduct({
  isAlertOpen,
  product,
  setIsAlertDialogOpen,
}: {
  isAlertOpen: boolean;
  product: ProductProps | null;
  // eslint-disable-next-line no-unused-vars
  setIsAlertDialogOpen: (isOpen: boolean) => void;
}) {
  const handeleDeleteProduct = useCallback(async () => {
    if (product) {
      for (const photo of product.photos || []) {
        await fetch(`/api/photos?fileUrl=${photo}`, {
          method: 'DELETE',
        });
      }
      await deleteProduct(parseInt(product?.id));
    }
    setIsAlertDialogOpen(false);
  }, [product]);

  return (
    <AlertDialog
      isOpen={isAlertOpen}
      onOpenChange={setIsAlertDialogOpen}
      onConfirmDialog={handeleDeleteProduct}
      title={`¿ Confirmas la eliminacion de este producto ?`}
    >
      {/* <span>
        {`También se eliminarán todos los `}
        <strong>PRODUCTOS</strong>
        {` de la categoría `}
        <strong>{category?.name}</strong>
        {`. Esta acción no se podrá deshacer una vez confirmda.`}
      </span> */}
    </AlertDialog>
  );
}
