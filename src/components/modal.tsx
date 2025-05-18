"use client";

import React, { useState, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  type: string;
  onClose: () => void;
  onSave: (value: string) => void;
}

const Modal = ({ isOpen, type, onClose, onSave }: ModalProps) => {
  const [inputValue, setInputValue] = useState("");

  // Clear input when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setInputValue("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (inputValue.trim() !== "") {
      onSave(inputValue.trim());
      setInputValue("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New {type}</h2>
        <input
          type="text"
          placeholder={`Enter new ${type}`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          autoFocus
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={() => {
              setInputValue("");
              onClose();
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
