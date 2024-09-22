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

export interface FileUploadProps {
  file: string | undefined;
  setFile: (file: string | undefined) => void;
  top?: boolean;
}
