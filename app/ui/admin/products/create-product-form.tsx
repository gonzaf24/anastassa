'use client';
import { createProduct } from '@/app/lib/actions';
import { CategoryProps } from '@/app/lib/definitions';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import React, { startTransition, useActionState, useState } from 'react';
import { FileUpload } from '../../file-upload';

export default function CreateProductForm({
  categories,
  onClose,
}: {
  categories: CategoryProps[];
  onClose?: () => void;
}) {
  const initialState = { message: '', errors: {} };
  const [descriptionError, setDescriptionError] = useState(false);
  const [refNumberError, setRefNumberError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [state, dispatch] = useActionState(createProduct, initialState);
  const [flyer1, setFlyer1] = useState<string | undefined>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const categoryId = formData.get('category_id') as string;
    let description = formData.get('description') as string;
    const ref = formData.get('ref') as string;

    // Convertir el nombre a mayúsculas
    description = description.trim().toUpperCase();

    // Actualiza el FormData con el nombre en mayúsculas
    formData.set('description', description);

    if (!categoryId.trim()) {
      setCategoryError(true);
    } else {
      setCategoryError(false);
    }

    // Basic validation
    if (!description.trim()) {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }

    if (!ref.trim()) {
      setRefNumberError(true);
    } else {
      setRefNumberError(false);
    }

    if (!description.trim() || !ref.trim()) {
      return; // Stop form submission if there's an error
    }

    startTransition(() => {
      dispatch(formData);
    });
    //Aqui implementar la creacion de la categoria con los datos del formulario.
    console.log({ description, ref, categoryId });
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Select
        name="category_id"
        label="Categoría"
        isInvalid={categoryError}
        errorMessage={
          categoryError ? 'La categoría es obligatoria.' : undefined
        }
      >
        {categories.map((category) => (
          <SelectItem key={category.id}>{category.name}</SelectItem>
        ))}
      </Select>
      <div id="date_end-error" aria-live="polite" aria-atomic="true">
        {state.errors?.categoryId &&
          state.errors.categoryId.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
      <Input
        type="number"
        label="Ref."
        name="ref"
        isRequired
        isInvalid={refNumberError}
        errorMessage={
          refNumberError ? 'La posición es obligatoria.' : undefined
        }
      />
      <div id="date_end-error" aria-live="polite" aria-atomic="true">
        {state.errors?.ref &&
          state.errors.ref.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
      <Input
        type="text"
        label="Descripción"
        name="description"
        isRequired
        isInvalid={descriptionError}
        errorMessage={
          descriptionError ? 'La descripcion es obligatoria.' : undefined
        }
        style={{ textTransform: 'uppercase' }}
      />
      <div id="date_end-error" aria-live="polite" aria-atomic="true">
        {state.errors?.description &&
          state.errors.description.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
      <FileUpload file={flyer1} setFile={setFlyer1} />

      <div id="date_start-error" aria-live="polite" aria-atomic="true">
        {state.message && (
          <p className="mt-2 text-sm text-red-500">{state.message}</p>
        )}
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
