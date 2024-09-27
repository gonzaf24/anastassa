'use client';
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
  // eslint-disable-next-line no-unused-vars
  setIsAlertDialogOpen: (isOpen: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const onConfirmDialog = useCallback(async () => {
    if (product) {
      try {
        setIsLoading(true);
        // Elimina todas las fotos relacionadas con el producto
        const photoDeletePromises = (product.photos || []).map((photo) => deletePhoto(photo));

        // Esperar a que todas las fotos sean eliminadas
        await Promise.all(photoDeletePromises);

        // Elimina el producto una vez eliminadas las fotos
        await deleteProduct(parseInt(product?.id));

        // Manejo de estado o redirección después de eliminar
        setIsLoading(false);
        setIsAlertDialogOpen(false);
      } catch (error) {
        console.error('Error al eliminar el producto y las fotos:', error);
      }
    }
  }, [product]);

  const onCancel = () => {
    setIsAlertDialogOpen(false);
  };

  return (
    <AlertDialog
      isOpen={isAlertOpen}
      handleClose={onCancel}
      handleConfirm={onConfirmDialog}
      title={`¿ Confirmas la eliminación de este producto ?`}
      isLoading={isLoading} // Pasar el estado isLoading al AlertDialog si es necesario
    ></AlertDialog>
  );
}
