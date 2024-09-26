import { updateCategory } from '@/app/lib/actions';
import { CategoryProps } from '@/app/lib/definitions';
import { Button, Input } from '@nextui-org/react';
import React, { startTransition, useActionState, useState } from 'react';

export default function UpdateCategoryForm({
  category,
  onClose,
}: {
  category: CategoryProps | null;
  onClose: () => void;
}) {
  const initialState = { message: '', errors: {} };
  const [nameError, setNameError] = useState(false);
  const [positionError, setPositionError] = useState(false);
  const [state, dispatch] = useActionState(updateCategory, initialState);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let name = formData.get('name') as string;
    const position = formData.get('position') as string;

    // Convertir el nombre a mayúsculas
    name = name.trim().toUpperCase();

    // Actualiza el FormData con el nombre en mayúsculas
    formData.set('name', name);

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

    startTransition(() => {
      dispatch(formData);
    });
    //Aqui implementar la actualizacion de la categoria con los datos del formulario.
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input
        type="text"
        label="Nombre"
        name="name"
        style={{ textTransform: 'uppercase' }}
        isInvalid={nameError}
        errorMessage={nameError ? 'El nombre es obligatorio.' : undefined}
        defaultValue={category?.name}
      />
      <div id="date_end-error" aria-live="polite" aria-atomic="true">
        {state.errors?.name &&
          state.errors.name.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
      <Input
        type="number"
        label="Posición"
        name="position"
        isInvalid={positionError}
        errorMessage={positionError ? 'La posición es obligatoria.' : undefined}
        defaultValue={category?.position.toString()}
      />
      <Input type="hidden" name="id" defaultValue={category?.id.toString()} />
      <div id="date_end-error" aria-live="polite" aria-atomic="true">
        {state.errors?.position &&
          state.errors.position.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
      <div id="date_start-error" aria-live="polite" aria-atomic="true">
        {state.message && <p className="mt-2 text-sm text-red-500">{state.message}</p>}
      </div>
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
