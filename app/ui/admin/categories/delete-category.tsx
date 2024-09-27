'use client';
import { useAppContext } from '@/app/context/app-context';
import { deleteCategory, deleteProduct, fetchProductsByCategory } from '@/app/lib/actions';
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
  const { refreshCategories, refreshProducts } = useAppContext();

  const onConfirmDialog = useCallback(async () => {
    if (!category) return;

    setIsLoading(true);
    try {
      const products = await fetchProductsByCategory(category.id);
      // Elimina las fotos y los productos
      const photoDeletePromises = products.flatMap((product) =>
        (product.photos || []).map((photo) => deletePhoto(photo))
      );
      await Promise.all(photoDeletePromises);
      const productDeletePromises = products.map((product) => deleteProduct(parseInt(product.id)));
      await Promise.all(productDeletePromises);
      // Elimina la categoría
      await deleteCategory(category.id);
    } catch (error) {
      console.log('Error al eliminar la categoría:', error);
    } finally {
      setIsLoading(false);
      refreshCategories();
      refreshProducts();
      setIsAlertDialogOpen(false);
    }
  }, [category, setIsAlertDialogOpen]);

  const onCancel = useCallback(() => {
    setIsAlertDialogOpen(false);
  }, [setIsAlertDialogOpen]);

  return (
    <AlertDialog
      isOpen={isAlertOpen}
      isLoading={isLoading}
      handleClose={onCancel}
      handleConfirm={onConfirmDialog}
      title={`¿Estás seguro de eliminar la categoría ${category?.name}?`}
    >
      <span>
        {`También se eliminarán todos los `}
        <strong>PRODUCTOS</strong>
        {` de la categoría `}
        <strong>{category?.name}</strong>
        {`. Esta acción no se podrá deshacer una vez confirmada.`}
      </span>
    </AlertDialog>
  );
}
