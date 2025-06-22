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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export type CustomModalProps = {
  /** The element that opens the modal */
  trigger: ReactNode;
  /** Optional title shown in the header bar */
  header?: string;
  /** If true, modal can be closed freely (no footer) */
  freeClose?: boolean;
  /** Modal body content */
  children: ReactNode;
  /** Callback fired on modal close */
  onClose?: () => void;
};

const CustomModal: FC<CustomModalProps> = ({
  trigger,
  header = 'Без названия',
  freeClose = false,
  children,
  onClose: onCloseCallback,
}) => {
  const { isOpen, onOpenChange } = useDisclosure();

  // Wrap onOpenChange to add custom onCloseCallback
  const handleOpenChange = (open: boolean) => {
    onOpenChange();
    if (!open && typeof onCloseCallback === 'function') {
      onCloseCallback();
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
                  <FontAwesomeIcon icon={faXmark} />
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
