'use client';
import { createProduct } from '@/app/lib/actions';
import { CategoryProps } from '@/app/lib/definitions';
import { deletePhoto, uploadPhoto } from '@/app/services/photo-service';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import React, { startTransition, useActionState, useState } from 'react';
import { MultiFileUpload } from '../../multi-file-upload';

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
  const [fileError, setFileError] = useState(false);
  const [state, dispatch] = useActionState(createProduct, initialState);
  const [files, setFiles] = useState<string[]>([]);
  const [photosError, setPhotosError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
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

    if (files.length === 0) {
      setFileError(true);
    } else {
      setFileError(false);
    }

    if (!description.trim() || !ref.trim()) {
      return; // Stop form submission if there's an error
    }

    if (!categoryId.trim() || !description.trim() || !ref.trim() || files.length === 0) {
      return; // Stop form submission if there's an error
    }

    // Upload photos
    const uploadedPhotos = await uploadPhotos();

    for (const photo of uploadedPhotos) {
      formData.append('photos', photo);
    }

    startTransition(() => {
      setIsLoading(false);
      dispatch(formData);
    });
    //Aqui implementar la creacion de la categoria con los datos del formulario.
    if (onClose) onClose();
  };

  async function uploadPhotos(): Promise<string[]> {
    setPhotosError('');
    const form = document.getElementById('create-product-form') as HTMLFormElement | null;

    if (!form) return [];

    const formData = new FormData(form);
    const imagesFiles = Array.from(formData?.getAll('images') as FileList | []);

    let hasErrors = false;
    const uploadedUrls: string[] = []; // Array interno para acumular las URLs

    if (imagesFiles.length > 0 && imagesFiles[0].name !== '') {
      for (const imageFile of imagesFiles) {
        if (hasErrors) break;

        try {
          // Utiliza el servicio de subida de fotos
          const fileUrl = await uploadPhoto(imageFile, 'prendas'); // llama a la función del servicio

          uploadedUrls.push(fileUrl); // Agregar la URL al array interno
        } catch (error) {
          hasErrors = true;
          console.error('Error uploading photos:', error);
          setPhotosError('Error uploading photos');

          // Si hay un error, elimina las fotos ya subidas
          for (const photoUrl of uploadedUrls) {
            try {
              await deletePhoto(photoUrl); // Elimina las fotos con el servicio
            } catch (deleteError) {
              console.error('Error deleting photo:', deleteError);
            }
          }

          return []; // Devolver un array vacío si hay un error en la subida
        }
      }
    }

    return uploadedUrls; // Devolver las URLs de las imágenes subidas
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" id="create-product-form">
      <Select
        name="category_id"
        label="Categoría"
        isInvalid={categoryError}
        errorMessage={categoryError ? 'La categoría es obligatoria.' : undefined}
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
        errorMessage={refNumberError ? 'La posición es obligatoria.' : undefined}
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
        errorMessage={descriptionError ? 'La descripcion es obligatoria.' : undefined}
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
      <MultiFileUpload files={files} setFiles={setFiles} />
      <div id="date_end-error" aria-live="polite" aria-atomic="true">
        {fileError && <p className="mt-2 text-sm text-red-500">Al menos una foto es obligatoria.</p>}
      </div>
      {photosError && <p className="mt-2 text-sm text-red-500">{photosError}</p>}
      <div id="date_start-error" aria-live="polite" aria-atomic="true">
        {state.message && <p className="mt-2 text-sm text-red-500">{state.message}</p>}
      </div>
      <div className="flex gap-3 w-full mt-4 mb-4">
        <Button onClick={onClose} className="w-full" isDisabled={isLoading}>
          Cancelar
        </Button>
        <Button color="primary" type="submit" className="w-full" isLoading={isLoading}>
          Crear
        </Button>
      </div>
    </form>
  );
}
