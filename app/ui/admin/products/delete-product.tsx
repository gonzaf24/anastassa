'use client';
import { useAppContext } from '@/app/context/app-context';
import { deleteProduct } from '@/app/lib/actions';
import { ProductProps } from '@/app/lib/definitions';
import { deletePhoto } from '@/app/services/photo-service';
import { useCallback, useState } from 'react';
import { AlertDialog } from '../../alert-dialog';

export default function DeleteProduct({
  isAlertOpen,
  product,
  setIsAlertDialogOpen,
}: {
  isAlertOpen: boolean;
  product: ProductProps | null;
  setIsAlertDialogOpen: (isOpen: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { refreshProducts } = useAppContext();

  const onConfirmDialog = useCallback(async () => {
    if (!product) return;

    setIsLoading(true);
    try {
      // Elimina todas las fotos relacionadas con el producto
      const photoDeletePromises = (product.photos || []).map((photo) => deletePhoto(photo));

      // Esperar a que todas las fotos sean eliminadas
      await Promise.all(photoDeletePromises);

      // Elimina el producto una vez eliminadas las fotos
      await deleteProduct(parseInt(product.id));

      // Cierre del diálogo
      refreshProducts();
      setIsAlertDialogOpen(false);
    } catch (error) {
      console.error('Error al eliminar el producto y las fotos:', error);
    } finally {
      setIsLoading(false); // Resetear el estado de carga independientemente del resultado
    }
  }, [product, setIsAlertDialogOpen]);

  const onCancel = () => {
    setIsAlertDialogOpen(false);
  };

  return (
    <AlertDialog
      isOpen={isAlertOpen}
      handleClose={onCancel}
      handleConfirm={onConfirmDialog}
      title="¿Confirmas la eliminación de este producto?"
      isLoading={isLoading} // Pasar el estado isLoading al AlertDialog si es necesario
    />
  );
}
