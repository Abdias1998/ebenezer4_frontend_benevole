import React, { useState, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onConfirm?: (inputValue?: string) => void;
  prompt?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, onConfirm, prompt }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (isOpen) {
      setInputValue('');
    }
  }, [isOpen]);
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl relative max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-900 text-2xl"
              aria-label="Close modal"
            >
              &times;
            </button>
        </div>
        <div>{children}</div>
        {prompt && (
          <div className="mt-4">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={4}
              placeholder="Saisissez votre message ici..."
            />
          </div>
        )}
        <div className="mt-6 flex justify-end space-x-4">
            {onConfirm ? (
              <>
                <button 
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                    Annuler
                </button>
                <button 
                    onClick={() => onConfirm?.(inputValue)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Confirmer
                </button>
              </>
            ) : (
              <button 
                  onClick={onClose}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                  Fermer
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
