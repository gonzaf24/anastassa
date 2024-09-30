'use client';
import { useAppContext } from '@/app/context/app-context';
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
  const { refreshProducts } = useAppContext();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const categoryId = formData.get('category_id') as string;
    let description = formData.get('description') as string;
    const ref = formData.get('ref') as string;

    // Convertir la descripcion a Capitalize
    // Convertir la descripción a Capitalize (Primera letra mayúscula y el resto minúsculas)
    description = description
      .toLowerCase()
      .replace(/^\w/, (c) => c.toUpperCase())
      .trim();
    formData.set('description', description);

    // Validación básica
    setCategoryError(!categoryId.trim());
    setDescriptionError(!description.trim());
    setRefNumberError(!ref.trim());
    setFileError(files.length === 0);

    if (!categoryId.trim() || !description.trim() || !ref.trim() || files.length === 0) {
      setIsLoading(false); // Stop loading on error
      return; // Detener la ejecución si hay errores
    }

    // Subir fotos
    const uploadedPhotos = await uploadPhotos();
    uploadedPhotos.forEach((photo) => formData.append('photos', photo));

    startTransition(() => {
      dispatch(formData);
      setIsLoading(false); // Reset loading state
      refreshProducts();
      onClose?.();
    });
  };

  async function uploadPhotos(): Promise<string[]> {
    setPhotosError('');
    const form = document.getElementById('create-product-form') as HTMLFormElement | null;

    if (!form) return [];

    const imagesFiles = Array.from(form.getElementsByTagName('input'))
      .filter((input) => input.name === 'images')
      .flatMap((input) => (input.files ? Array.from(input.files) : []));
    const uploadedUrls: string[] = [];

    if (imagesFiles.length > 0) {
      for (const imageFile of imagesFiles) {
        try {
          const fileUrl = await uploadPhoto(imageFile, 'prendas');
          uploadedUrls.push(fileUrl);
        } catch (error) {
          console.error('Error uploading photos:', error);
          setPhotosError('Error uploading photos');
          // Eliminar fotos ya subidas si hay un error
          await Promise.all(uploadedUrls.map((photoUrl) => deletePhoto(photoUrl)));
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
          <SelectItem key={category.id} value={category.id.toString()}>
            {category.name}
          </SelectItem>
        ))}
      </Select>

      <Input
        type="number"
        label="Ref."
        name="ref"
        isRequired
        isInvalid={refNumberError}
        errorMessage={refNumberError ? 'La referencia es obligatoria.' : undefined}
      />

      <Input
        type="text"
        label="Descripción"
        name="description"
        isRequired
        isInvalid={descriptionError}
        errorMessage={descriptionError ? 'La descripción es obligatoria.' : undefined}
      />

      <MultiFileUpload files={files} setFiles={setFiles} />
      {fileError && <p className="mt-2 text-sm text-red-500">Al menos una foto es obligatoria.</p>}
      {photosError && <p className="mt-2 text-sm text-red-500">{photosError}</p>}
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
