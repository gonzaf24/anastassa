import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialog as AlertDialogUI,
} from '@/components/ui/alert-dialog';
import React from 'react';

export const AlertDialog = ({
  isOpen,
  handleClose,
  handleConfirm,
  title,
  children,
  isLoading,
}: {
  isOpen: boolean;
  handleClose: () => void;
  handleConfirm?: () => Promise<void>;
  title: string;
  children?: React.ReactNode;
  isLoading?: boolean;
}) => {
  return (
    <AlertDialogUI open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{children}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose} disabled={isLoading}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={isLoading}>
            {isLoading ? 'Eliminando...' : 'Confirmar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogUI>
  );
};
