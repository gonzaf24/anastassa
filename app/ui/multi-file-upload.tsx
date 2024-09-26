'use client';

import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import React from 'react';
import { MultiFileUploadProps } from '../lib/definitions';

export const MultiFileUpload: React.FC<MultiFileUploadProps> = ({ files, setFiles }) => {
  const [error, setError] = React.useState<string | null>(null);

  const isValidFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 3 * 1024 * 1024; // 3MB
    if (!validTypes.includes(file.type)) {
      setError('Solo se permiten formatos JPG, JPEG y PNG.');
      return false;
    }
    if (file.size > maxSize) {
      setError('El tamaño del archivo no debe exceder los 3MB.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(isValidFile);
    const urls = validFiles.map((file) => URL.createObjectURL(file));
    setFiles([...files, ...urls]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...files];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= files.length) return; // Evitar movimientos fuera del rango
    const [movedFile] = newFiles.splice(index, 1);
    newFiles.splice(newIndex, 0, movedFile);
    setFiles(newFiles);
  };

  return (
    <div className="container flex w-full flex-col items-center justify-center gap-4">
      <Button className="w-full p-0">
        <label htmlFor="file" className="relative flex justify-center items-center  gap-2 w-full h-full cursor-pointer">
          <p>Agregar fotos</p> <img src="/plus.svg" alt="upload" className="w-4" />
        </label>
        <input
          name="images"
          id="file"
          type="file"
          className="hidden"
          multiple
          onChange={handleFileChange}
          accept="image/jpeg,image/png,image/jpg"
        />
      </Button>

      {/* Tabla de miniaturas con NextUI */}
      <Table
        selectionMode="single"
        aria-label="Miniaturas"
        isStriped
        fullWidth
        color="primary"
        radius="none"
        classNames={{
          wrapper: 'p-0',
          th: 'bg-primary/75 font-bold text-black rounded-none',
          td: 'rounded-none',
        }}
      >
        <TableHeader>
          <TableColumn className="text-start" width={80}>
            Posición
          </TableColumn>
          <TableColumn>Imagen</TableColumn>
          <TableColumn className="text-end">Eliminar</TableColumn>
        </TableHeader>
        <TableBody>
          {files.map((fileUrl, index) => (
            <TableRow key={fileUrl}>
              <TableCell className="text-start align-middle ">
                <div className="flex gap-2">
                  <p className="inline-block p-2">{index + 1}</p>
                  <Button
                    onClick={() => moveItem(index, 'up')}
                    disabled={index === 0} // Deshabilitar si es el primer elemento
                    className="bg-transparent min-w-min p-1 hover:bg-green-600 border-1 w-10"
                  >
                    <img src="/up.svg" alt="up" className="w-6" />
                  </Button>
                  <Button
                    className="bg-transparent min-w-min p-1 hover:bg-green-600 border-1 w-10"
                    onClick={() => moveItem(index, 'down')}
                    disabled={index === files.length - 1} // Deshabilitar si es el último elemento
                  >
                    <img src="/down.svg" alt="down" className="w-6" />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="w-[100px]">
                <img src={fileUrl} alt="preview" className="h-[100px] w-[100px] object-cover rounded-md" />
              </TableCell>
              <TableCell className="text-end">
                <Button
                  color="primary"
                  onClick={() => handleRemoveFile(index)}
                  className="bg-transparent min-w-min p-1 hover:bg-red-600 border-1"
                >
                  <img src="/delete.svg" alt="delete" className="w-6" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};
