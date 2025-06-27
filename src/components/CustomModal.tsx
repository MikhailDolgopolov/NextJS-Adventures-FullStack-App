'use client';

import { FC, ReactNode } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@heroui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export type CustomModalProps = {
  /** The element that opens the modal */
  trigger: ReactNode;
  /** Optional title shown in the header bar */
  header?: string;
  /** If true, modal can be closed freely (no footer) */
  freeClose?: boolean;
  /** Modal body content */
  children: ReactNode;
  /** Callback fired on modal open */
  onOpenCallback?: () => void;
  /** Callback fired on modal close */
  onCloseCallback?: () => void;
  
};

const CustomModal: FC<CustomModalProps> = ({
  trigger,
  header = 'Без названия',
  freeClose = false,
  children,
  onOpenCallback,
  onCloseCallback,
}) => {
  const { isOpen, onOpenChange } = useDisclosure();

  // Wrap onOpenChange to add custom onCloseCallback
  const handleOpenChange = (open: boolean) => {
    onOpenChange();
    if (!open && typeof onCloseCallback === 'function') {
      onCloseCallback();
    }
    if (open && typeof onOpenCallback === 'function') {
      onOpenCallback();
    }
  };

  return (
    <>
      {/* Render the trigger with onClick to open modal */}
      <div onClick={() => onOpenChange()} className="inline-block cursor-pointer">
        {trigger}
      </div>

      <Modal isOpen={isOpen} onOpenChange={handleOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center justify-between">
                <h2>{header}</h2>
                <button onClick={onClose}>
                  <XMarkIcon />
                </button>
              </ModalHeader>

              <ModalBody className="space-y-4">{children}</ModalBody>

              {!freeClose && (
                <ModalFooter className="flex justify-end">
                  <Button variant="light" color="danger" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
