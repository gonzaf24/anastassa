'use client';
import { useAppContext } from '@/app/context/app-context';
import { createCategory } from '@/app/lib/actions';
import { Button, Input } from '@nextui-org/react';
import React, { startTransition, useActionState, useCallback, useState } from 'react';

export default function CreateCategoryForm({ onClose }: { onClose?: () => void }) {
  const initialState = { message: '', errors: {} };
  const [nameError, setNameError] = useState(false);
  const [positionError, setPositionError] = useState(false);
  const [state, dispatch] = useActionState(createCategory, initialState);
  const { refreshCategories } = useAppContext();

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.currentTarget;
      const formData = new FormData(form);
      let name = formData.get('name') as string;
      const position = formData.get('position') as string;

      // Convertir el nombre a mayúsculas
      name = name.trim().toUpperCase();

      // Actualiza el FormData con el nombre en mayúsculas
      formData.set('name', name);

      // Basic validation
      const isNameValid = name.trim() !== '';
      const isPositionValid = position.trim() !== '';

      setNameError(!isNameValid);
      setPositionError(!isPositionValid);

      if (!isNameValid || !isPositionValid) {
        return; // Stop form submission if there's an error
      }

      startTransition(() => {
        dispatch(formData);
        refreshCategories();
        onClose?.();
      });
    },
    [dispatch, onClose]
  );

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
      <div id="name-error" aria-live="polite" aria-atomic="true">
        {state?.errors?.name &&
          state?.errors.name.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
      <Input
        type="number"
        label="Posición"
        name="position"
        defaultValue="0"
        isRequired
        isInvalid={positionError}
        errorMessage={positionError ? 'La posición es obligatoria.' : undefined}
      />
      <div id="position-error" aria-live="polite" aria-atomic="true">
        {state?.errors?.position &&
          state?.errors.position.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
      <div id="form-message" aria-live="polite" aria-atomic="true">
        {state?.message && <p className="mt-2 text-sm text-red-500">{state?.message}</p>}
      </div>
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
