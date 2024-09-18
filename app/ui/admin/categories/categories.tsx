'use client';
import { CategoryProps } from '@/app/lib/definitions';
import { CategoriesData } from '@/app/lib/hardcoded-data';
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
import EditCategoryForm from './edit-category-form';
import NewCategoryForm from './new-category-form';

export default function Categories() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null) as any;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditCategory = (category: CategoryProps) => {
    setSelectedCategory(category);
    handleOpenModal();
  };

  return (
    <div className="text-end">
      <Modal buttonTitle="Nueva Categoría" modalTitle="Nueva Categoría">
        <NewCategoryForm onClose={function (): void {}} />
      </Modal>
      <Modal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        modalTitle="Editar Categoría"
      >
        <EditCategoryForm
          category={selectedCategory}
          onClose={handleCloseModal}
        />
      </Modal>
      <Table
        selectionMode="single"
        isStriped
        aria-label="Categories table"
        fullWidth
        className={styles.table}
        color="primary"
        radius="none"
        classNames={{
          wrapper: 'p-0',
          th: 'bg-primary/75 font-bold text-black rounded-none border-1',
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
          {CategoriesData &&
            CategoriesData.map((category) => (
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
                  <Button className="bg-transparent p-1 min-w-min">
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
