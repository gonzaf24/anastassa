/* eslint-disable no-unused-vars */
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type CarouselProps = {
  photos: string[];
};

export type CategoryProps = {
  id: number;
  name: string;
  position: number;
};

export type FileUploadProps = {
  file: string;
  setFile: (file: string) => void;
};

export interface MultiFileUploadProps {
  files: string[];
  setFiles: (files: string[]) => void;
  top?: boolean;
}

export interface UpdateFileUploadProps {
  files: string[];
  setFiles: (files: string[]) => void;
  uploadFiles: () => void;
  top?: boolean;
}

export type ProductProps = {
  id: string;
  categoryId: number;
  categoryName: string;
  ref: number;
  photos: string[];
  description: string;
};
