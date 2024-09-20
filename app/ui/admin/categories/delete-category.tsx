import { deleteCategory } from '@/app/lib/actions';
import { CategoryProps } from '@/app/lib/definitions';
import { useCallback } from 'react';
import { AlertDialog } from '../../alert-dialog';

export default function DeleteCategory({
  isAlertOpen,
  category,
  setIsAlertDialogOpen,
}: {
  isAlertOpen: boolean;
  category: CategoryProps | null;
  // eslint-disable-next-line no-unused-vars
  setIsAlertDialogOpen: (isOpen: boolean) => void;
}) {
  const handeleDeleteCategory = useCallback(async () => {
    console.log('handeleDeleteCategory');
    if (category) {
      await deleteCategory(category?.id);
    }
    setIsAlertDialogOpen(false);
  }, [category]);

  return (
    <AlertDialog
      isOpen={isAlertOpen}
      onOpenChange={setIsAlertDialogOpen}
      onConfirmDialog={handeleDeleteCategory}
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
