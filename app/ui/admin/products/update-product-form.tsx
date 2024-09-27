/* eslint-disable no-unused-vars */
'use client';
import { updateProduct } from '@/app/lib/actions';
import { CategoryProps, ProductProps } from '@/app/lib/definitions';
import { deletePhoto, uploadPhoto } from '@/app/services/photo-service'; // Importar los métodos desde el servicio
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import React, { startTransition, useActionState, useEffect, useState } from 'react';
import { UpdateMultiFileUpload } from '../../update-multi-file-upload';

export default function UpdateProductForm({
  categories,
  product,
  onClose,
}: {
  categories: CategoryProps[];
  product: ProductProps | null; // El producto a editar
  onClose: () => void;
}) {
  const initialState = { message: '', errors: {} };
  const [descriptionError, setDescriptionError] = useState(false);
  const [refNumberError, setRefNumberError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  //const [fileError, setFileError] = useState(false);
  const [state, dispatch] = useActionState(updateProduct, initialState);

  const [files, setFiles] = useState<string[]>(product?.photos || []); // Fotos actuales del producto
  //const [filesSrc, setFilesSrc] = useState<string[]>(product?.photos || []); // Fotos actuales del producto
  const [photosError, setPhotosError] = useState<string>();
  const [uploadedUrls, setUploadedUrls] = useState([] as string[]);
  const [urlsToDelete, setUrlsToDelete] = useState([] as string[]);

  const [isConfirmLoading, setIsConfirmLoading] = useState(false);
  const [isCloseLoading, setIsCloseLoading] = useState(false);
  const [isFilesLoading, setIsFilesLoading] = useState(false);

  useEffect(() => {
    // Prepopulate the form if editing an existing product
    if (product) {
      setFiles(product.photos || []);
    }
  }, [product]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsConfirmLoading(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const categoryId = formData.get('category_id') as string;
    let description = formData.get('description') as string;
    const ref = formData.get('ref') as string;

    // Convertir el nombre a mayúsculas
    description = description.trim().toUpperCase();
    formData.set('description', description);

    if (!categoryId.trim()) {
      setCategoryError(true);
    } else {
      setCategoryError(false);
    }

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

    if (!categoryId.trim() || !description.trim() || !ref.trim()) {
      return;
    }

    for (const photo of files) {
      formData.append('photos', photo);
    }
    formData.append('product_id', product?.id.toString() || '');

    //aqui eliminar las fotos que se quitaron del producto
    for (const photo of urlsToDelete) {
      await deletePhoto(photo); // Usar el método `deletePhoto` del servicio
    }

    startTransition(() => {
      setIsConfirmLoading(false);
      dispatch(formData); // Enviar el id del producto para editar
    });

    if (onClose) onClose();
  };

  async function uploadPhotos(): Promise<string[]> {
    setPhotosError('');
    setIsFilesLoading(true);
    const form = document.getElementById('update-product-form') as HTMLFormElement | null;

    if (!form) return [];

    const formData = new FormData(form);
    const imagesFiles = Array.from(formData?.getAll('images') as FileList | []);
    let hasErrors = false;
    const uploadedUrlsLocal: string[] = [];

    if (imagesFiles.length > 0 && imagesFiles[0].name !== '') {
      for (const imageFile of imagesFiles) {
        if (hasErrors) break;

        try {
          // Usamos el servicio `uploadPhoto` en vez del `fetch` directamente
          const fileUrl = await uploadPhoto(imageFile, 'prendas');

          if (!fileUrl) {
            // Verificamos si no devuelve una URL válida
            hasErrors = true;
            setPhotosError('Error uploading the image');

            // Eliminar las fotos subidas si ocurre un error
            for (const photo of uploadedUrlsLocal) {
              await deletePhoto(photo); // Usar el método `deletePhoto` del servicio
            }

            return []; // Devolver un array vacío en caso de error
          } else {
            uploadedUrlsLocal.push(fileUrl); // Aquí `fileUrl` es la URL de la imagen
            setUploadedUrls(uploadedUrlsLocal); // Mantener el manejo del estado de las URLs
          }
        } catch (error) {
          setPhotosError('Error on upload photos');
          return []; // Devolver un array vacío si hay un error en la subida
        }
      }
    }
    setFiles([...files, ...uploadedUrlsLocal]); // Mantener el manejo del estado de archivos
    setIsFilesLoading(false);
    return uploadedUrlsLocal; // Devolver las URLs de las imágenes subidas
  }

  const handleCloseAndDelete = async () => {
    setIsCloseLoading(true);
    for (const photo of uploadedUrls) {
      await deletePhoto(photo); // Usar el método `deletePhoto` del servicio
    }
    setIsCloseLoading(false);
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" id="update-product-form">
      <Select
        name="category_id"
        label="Categoría"
        defaultSelectedKeys={[product?.categoryId?.toString() || '']}
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
        defaultValue={product?.ref.toString()}
        isRequired
        isInvalid={refNumberError}
        errorMessage={refNumberError ? 'La referencia es obligatoria.' : undefined}
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
        defaultValue={product?.description}
        isRequired
        isInvalid={descriptionError}
        errorMessage={descriptionError ? 'La descripción es obligatoria.' : undefined}
        style={{ textTransform: 'uppercase' }}
      />

      <UpdateMultiFileUpload
        files={files}
        setFiles={setFiles}
        isLoadingFiles={isFilesLoading}
        uploadFiles={uploadPhotos}
        urlsToDelete={urlsToDelete}
        onDeleteFiles={setUrlsToDelete}
      />

      {photosError && <p className="mt-2 text-sm text-red-500">{photosError}</p>}

      <div className="flex gap-3 w-full mt-4 mb-4">
        <Button
          onClick={handleCloseAndDelete}
          className="w-full"
          isLoading={isCloseLoading}
          isDisabled={isConfirmLoading}
        >
          Cancelar
        </Button>
        <Button
          color="primary"
          type="submit"
          className="w-full"
          isLoading={isConfirmLoading}
          isDisabled={isCloseLoading}
        >
          Guardar Cambios
        </Button>
      </div>
    </form>
  );
}
