'use client';
import { useAppContext } from '@/app/context/app-context';
import { CategoryProps } from '@/app/lib/definitions';
import Modal from '@/app/ui/admin/modal';
import { Button, Spinner } from '@nextui-org/react';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import { useCallback, useMemo, useState } from 'react';
import NewCategoryForm from './create-category-form';
import DeleteCategory from './delete-category';
import EditCategoryForm from './update-category-form';

export default function Categories() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryProps | null>(null);
  const { categories, isLoadingCategories } = useAppContext();

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteCategory = useCallback((category: CategoryProps) => {
    setSelectedCategory(category);
    setIsAlertDialogOpen(true);
  }, []);

  const handleEditCategory = useCallback((category: CategoryProps) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  }, []);

  // Memoizamos las filas de la tabla
  const categoryRows = useMemo(() => {
    return categories.map((category, index) => (
      <TableRow key={category.id}>
        <TableCell className="text-start">{index + 1}</TableCell>
        <TableCell>{category.id}</TableCell>
        <TableCell>{category.name}</TableCell>
        <TableCell>{category.position}</TableCell>
        <TableCell className="text-center">
          <Button className="bg-transparent p-1 min-w-min" onPress={() => handleEditCategory(category)}>
            <img alt="edit" className="w-6" src="/edit.svg" />
          </Button>
        </TableCell>
        <TableCell className="text-center">
          <Button className="bg-transparent p-1 min-w-min" onPress={() => handleDeleteCategory(category)}>
            <img alt="delete" className="w-7" src="/delete.svg" />
          </Button>
        </TableCell>
      </TableRow>
    ));
  }, [categories, handleEditCategory, handleDeleteCategory]);

  return (
    <div className="text-end">
      <Modal buttonTitle="Nueva Categoría" modalTitle="Nueva Categoría">
        <NewCategoryForm />
      </Modal>
      <Modal isOpen={isEditModalOpen} onOpenChange={setIsEditModalOpen} modalTitle="Editar Categoría">
        <EditCategoryForm category={selectedCategory} onClose={handleCloseModal} />
      </Modal>
      <DeleteCategory
        isAlertOpen={isAlertDialogOpen}
        category={selectedCategory}
        setIsAlertDialogOpen={setIsAlertDialogOpen}
      />
      <Table
        selectionMode="single"
        isStriped
        aria-label="Categories table"
        fullWidth
        isHeaderSticky
        className="w-full border-collapse mt-5 h-[50dvh] md:h-[60dvh]" // Estilos de tabla principal
        color="primary"
        radius="none"
        classNames={{
          wrapper: 'p-0 pb-[100px]',
          th: 'bg-primary font-bold text-black rounded-none first:rounded-none last:rounded-none border-1', // Evitar borde redondeado en la primera y última columna
          td: 'rounded-none border-1 first:rounded-none last:rounded-none', // Lo mismo para las celdas
        }}
      >
        <TableHeader className="bg-black">
          <TableColumn width={40} className="text-start">
            #
          </TableColumn>
          <TableColumn width={50}>Id</TableColumn>
          <TableColumn>Nombre cat.</TableColumn>
          <TableColumn>Posición</TableColumn>
          <TableColumn width={20}>Editar</TableColumn>
          <TableColumn width={20}>Eliminar</TableColumn>
        </TableHeader>
        <TableBody isLoading={isLoadingCategories} loadingContent={<Spinner label="Buscando categorias..." />}>
          {isLoadingCategories ? [] : categoryRows}
        </TableBody>
      </Table>
    </div>
  );
}
