import { Button, Input } from '@nextui-org/react';
import React, { useState } from 'react';

export default function NewCategoryForm({ onClose }: { onClose: () => void }) {
  const [nameError, setNameError] = useState(false);
  const [positionError, setPositionError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const position = formData.get('position') as string;

    // Basic validation
    if (!name.trim()) {
      setNameError(true);
    } else {
      setNameError(false);
    }

    if (!position.trim()) {
      setPositionError(true);
    } else {
      setPositionError(false);
    }

    if (!name.trim() || !position.trim()) {
      return; // Stop form submission if there's an error
    }

    console.log({ name, position });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input
        type="text"
        label="Nombre"
        name="name"
        isRequired
        isInvalid={nameError}
        errorMessage={nameError ? 'El nombre es obligatorio.' : undefined}
        style={{ textTransform: 'uppercase' }}
      />
      <Input
        type="number"
        label="Posición"
        name="position"
        defaultValue="0"
        isRequired
        isInvalid={positionError}
        errorMessage={positionError ? 'La posición es obligatoria.' : undefined}
      />
      <div className="flex gap-3 w-full mt-4 mb-4">
        <Button onClick={onClose} className="w-full">
          Cancelar
        </Button>
        <Button color="primary" type="submit" className="w-full">
          Crear
        </Button>
      </div>
    </form>
  );
}
