import { Spinner } from '@nextui-org/react';

export default function Loading() {
  return (
    <div className="max-height w-full flex justify-center items-center">
      <Spinner label="Actualizando tablas..." />
    </div>
  );
}
