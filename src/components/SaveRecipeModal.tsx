import { useState } from "react";
import Modal from "./Modal";

interface SaveRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; isPublic: boolean }) => void;
}

export default function SaveRecipeModal({
  isOpen,
  onClose,
  onSave,
}: SaveRecipeModalProps) {
  const [name, setName] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, isPublic });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Save Recipe">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span>Recipe Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded px-2 py-1"
            required
          />
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          <span>Make Public</span>
        </label>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </Modal>
  );
}
