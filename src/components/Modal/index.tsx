import { ReactNode } from 'react';

export interface ModalProps {
  children: ReactNode;
  onClose?: () => void;
}

export const Modal = ({children, onClose}: ModalProps) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-[0.22]">
      <div
        className="w-4/5 p-2"
      >
        {children}
      </div>
    </div>
  );
};
