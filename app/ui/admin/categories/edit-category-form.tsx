import { CategoryProps } from '@/app/lib/definitions';
import { Button, Input } from '@nextui-org/react';
import React from 'react';

export default function EditCategoryForm({
  category,
  onClose,
}: {
  category: CategoryProps;
  onClose: () => void;
}) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const position = formData.get('position') as string;
    console.log({ id, name, position });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input
        type="text"
        label="Nombre"
        name="name"
        style={{ textTransform: 'uppercase' }}
        defaultValue={category.name}
      />
      <Input
        type="number"
        label="Posición"
        name="position"
        defaultValue={category.position.toString()}
      />
      <Input type="hidden" name="id" defaultValue={category.id.toString()} />
      <div className="flex gap-3 w-full mt-4 mb-4">
        <Button onClick={onClose} className="w-full">
          Cancelar
        </Button>
        <Button color="primary" type="submit" className="w-full">
          Guardar
        </Button>
      </div>
    </form>
  );
}
