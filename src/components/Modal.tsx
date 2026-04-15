import type { ReactNode } from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode; 
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}>

      <div
        className="bg-white rounded-xl p-6 shadow-xl max-w-md w-full relative text-black"
        onClick={(e) => e.stopPropagation()}>

      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl font-bold">
        ×
      </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;