/* eslint-disable no-unused-vars */
'use client';
import { CategoryProps } from '@/app/lib/definitions';
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
import { useState } from 'react';
import NewCategoryForm from './create-category-form';
import EditCategoryForm from './update-category-form';

import DeleteCategory from './delete-category';
export default function Categories({
  categories,
}: {
  categories: CategoryProps[];
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteCategory = (category: CategoryProps) => {
    setSelectedCategory(category);
    setIsAlertDialogOpen((prev) => !prev);
  };

  const handleEditCategory = (category: CategoryProps) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  return (
    <div className="text-end">
      <Modal buttonTitle="Nueva Categoría" modalTitle="Nueva Categoría">
        <NewCategoryForm />
      </Modal>
      <Modal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        modalTitle="Editar Categoría"
      >
        <EditCategoryForm
          category={selectedCategory}
          onClose={handleCloseModal}
        />
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
          <TableColumn>Nombre cat.</TableColumn>
          <TableColumn>Posición</TableColumn>
          <TableColumn>Id</TableColumn>
          <TableColumn width={20}>Editar</TableColumn>
          <TableColumn width={20}>Eliminar</TableColumn>
        </TableHeader>
        <TableBody>
          {categories &&
            categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.position}</TableCell>
                <TableCell>{category.id}</TableCell>
                <TableCell className="text-center">
                  <Button
                    className="bg-transparent p-1 min-w-min"
                    onPress={() => handleEditCategory(category)}
                  >
                    <img alt="edit" className="w-6" src="/edit.svg" />
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    className="bg-transparent p-1 min-w-min"
                    onPress={() => handleDeleteCategory(category)}
                  >
                    <img alt="delete" className="w-7" src="/delete.svg" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
