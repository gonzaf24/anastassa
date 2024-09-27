'use client';

import { useAppContext } from '@/app/context/app-context';
import { updateProduct } from '@/app/lib/actions';
import { CategoryProps, ProductProps } from '@/app/lib/definitions';
import { deletePhoto, uploadPhoto } from '@/app/services/photo-service'; // Métodos del servicio
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import React, { useActionState, useCallback, useEffect, useState, useTransition } from 'react';
import { UpdateMultiFileUpload } from '../../update-multi-file-upload';

interface UpdateProductFormProps {
  categories: CategoryProps[];
  product: ProductProps | null; // El producto a editar
  onClose: () => void;
}

export default function UpdateProductForm({ categories, product, onClose }: UpdateProductFormProps) {
  const initialState = { message: '', errors: {} };
  const [descriptionError, setDescriptionError] = useState(false);
  const [refNumberError, setRefNumberError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [state, dispatch] = useActionState(updateProduct, initialState);

  const [files, setFiles] = useState<string[]>(product?.photos || []); // Fotos actuales del producto
  const [photosError, setPhotosError] = useState<string>();
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [urlsToDelete, setUrlsToDelete] = useState<string[]>([]);

  const [isConfirmLoading, setIsConfirmLoading] = useState(false);
  const [isCloseLoading, setIsCloseLoading] = useState(false);
  const [isFilesLoading, setIsFilesLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { refreshProducts } = useAppContext();

  // Sincroniza las fotos al cargar un producto
  useEffect(() => {
    if (product) {
      setFiles(product.photos || []);
    }
  }, [product]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsConfirmLoading(true);
      const form = event.currentTarget;
      const formData = new FormData(form);
      const categoryId = formData.get('category_id') as string;
      let description = (formData.get('description') as string).trim().toUpperCase();
      const ref = formData.get('ref') as string;

      formData.set('description', description);

      if (!categoryId || !description || !ref) {
        setCategoryError(!categoryId);
        setDescriptionError(!description);
        setRefNumberError(!ref);
        setIsConfirmLoading(false);
        return;
      }

      formData.append('product_id', product?.id.toString() || '');
      for (const photo of files) formData.append('photos', photo);

      for (const photo of urlsToDelete) await deletePhoto(photo);

      startTransition(() => {
        dispatch(formData); // Enviar el producto actualizado
        refreshProducts();
        setIsConfirmLoading(false);
        onClose?.();
      });
    },
    [files, urlsToDelete, product, onClose]
  );

  const uploadPhotos = useCallback(async (): Promise<string[]> => {
    setPhotosError('');
    setIsFilesLoading(true);

    const form = document.getElementById('update-product-form') as HTMLFormElement | null;
    if (!form) return [];

    const formData = new FormData(form);
    const imagesFiles = Array.from(formData?.getAll('images') as FileList | []);
    const uploadedUrlsLocal: string[] = [];
    let hasErrors = false;

    if (imagesFiles.length && imagesFiles[0].name !== '') {
      for (const imageFile of imagesFiles) {
        if (hasErrors) break;

        try {
          const fileUrl = await uploadPhoto(imageFile, 'prendas');
          if (!fileUrl) {
            hasErrors = true;
            setPhotosError('Error al subir la imagen');
            for (const photo of uploadedUrlsLocal) await deletePhoto(photo);
            return [];
          }
          uploadedUrlsLocal.push(fileUrl);
        } catch {
          setPhotosError('Error en la subida de fotos');
          return [];
        }
      }
    }

    setFiles((prev) => [...prev, ...uploadedUrlsLocal]);
    setUploadedUrls(uploadedUrlsLocal); // Mantener el manejo del estado de las URLs
    setIsFilesLoading(false);
    return uploadedUrlsLocal;
  }, []);

  const handleCloseAndDelete = useCallback(async () => {
    setIsCloseLoading(true);
    for (const photo of uploadedUrls) await deletePhoto(photo);
    setIsCloseLoading(false);
    onClose?.();
  }, [uploadedUrls, onClose]);

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
        label="Referencia"
        name="ref"
        defaultValue={product?.ref.toString()}
        isRequired
        isInvalid={refNumberError}
        errorMessage={refNumberError ? 'La referencia es obligatoria.' : undefined}
      />
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
          isDisabled={isConfirmLoading || isPending}
        >
          Cancelar
        </Button>
        <Button
          color="primary"
          type="submit"
          className="w-full"
          isLoading={isConfirmLoading || isPending}
          isDisabled={isCloseLoading}
        >
          Guardar Cambios
        </Button>
      </div>
    </form>
  );
}
