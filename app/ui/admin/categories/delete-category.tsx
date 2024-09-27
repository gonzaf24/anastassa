'use client';
import { deleteCategory, deleteProduct } from '@/app/lib/actions';
import { fetchProductsByCategory } from '@/app/lib/data';
import { CategoryProps } from '@/app/lib/definitions';
import { deletePhoto } from '@/app/services/photo-service';
import { useCallback, useState } from 'react';
import { AlertDialog } from '../../alert-dialog';

export default function DeleteCategory({
  isAlertOpen,
  category,
  setIsAlertDialogOpen,
}: {
  isAlertOpen: boolean;
  category: CategoryProps | null;
  setIsAlertDialogOpen: (isOpen: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const onConfirmDialog = useCallback(async () => {
    setIsLoading(true);
    if (category) {
      const products = await fetchProductsByCategory(category?.id);
      //de cada producto primero eliminar las fotos y luego el producto
      const photoDeletePromises = products.map(async (product) => {
        return (product.photos || []).map(async (photo) => await deletePhoto(photo));
      });
      await Promise.all(photoDeletePromises);
      //eliminar el producto
      products.forEach(async (product) => {
        await deleteProduct(parseInt(product.id));
      });
      // Elimina la categoría una vez eliminadas las fotos

      await deleteCategory(category?.id);
    }
    setIsLoading(false);
    setIsAlertDialogOpen(false);
  }, [category]);

  const onCancel = () => {
    setIsAlertDialogOpen(false);
  };

  return (
    <AlertDialog
      isOpen={isAlertOpen}
      isLoading={isLoading}
      handleClose={onCancel}
      handleConfirm={onConfirmDialog}
      title={`Estas seguro de eliminar la categoría ${category?.name}?`}
    >
      <span>
        {`También se eliminarán todos los `}
        <strong>PRODUCTOS</strong>
        {` de la categoría `}
        <strong>{category?.name}</strong>
        {`. Esta acción no se podrá deshacer una vez confirmda.`}
      </span>
    </AlertDialog>
  );
}
