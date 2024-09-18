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
