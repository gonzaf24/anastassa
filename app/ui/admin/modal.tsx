import { Button, ModalBody, ModalContent, ModalHeader, Modal as ModalUI, useDisclosure } from '@nextui-org/react';
import React, { ReactNode, useCallback } from 'react';

interface ModalProps {
  children: ReactNode;
  buttonTitle?: string;
  modalTitle: string;
  isOpen?: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpenChange?: (isOpen: boolean) => void;
  isDismissable?: boolean;
}

export default function Modal({
  children,
  buttonTitle,
  modalTitle,
  isOpen: controlledIsOpen,
  onOpenChange: controlledOnOpenChange,
  isDismissable: isDismissable = false,
}: ModalProps) {
  const { isOpen: internalIsOpen, onOpen, onOpenChange: internalOnOpenChange } = useDisclosure();

  // Prefer controlled state when available
  const isOpen = controlledIsOpen ?? internalIsOpen;
  const onOpenChange = controlledOnOpenChange ?? internalOnOpenChange;

  // Función para manejar la apertura del modal
  const handleOpen = useCallback(() => {
    onOpen();
  }, [onOpen]);

  return (
    <>
      {buttonTitle && !controlledIsOpen && (
        <Button color="primary" className="font-bold rounded-none" onPress={handleOpen}>
          <img alt="add" className="w-4" src="/plus.svg" />
          {buttonTitle}
        </Button>
      )}

      <ModalUI
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={isDismissable}
        hideCloseButton={!isDismissable}
        backdrop="blur"
        size="xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-between items-center">
                <p>{modalTitle}</p>
                {/* Uncomment if close button is needed */}
                {/* <Button
                  className="bg-transparent p-1 h-min min-w-min rounded-full"
                  onClick={onClose}
                >
                  <img alt="close" className="w-8" src="/close.svg" />
                </Button> */}
              </ModalHeader>
              <ModalBody>
                {React.cloneElement(children as React.ReactElement, {
                  onClose,
                })}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </ModalUI>
    </>
  );
}
