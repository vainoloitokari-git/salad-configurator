import { useState } from "react";
import Modal from "./Modal";
import { useIngredientStore } from "../store/UseIngredientStore";
import { saveRecipe } from "../services/api";

interface SaveRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: string;
}

export default function SaveRecipeModal({
  isOpen,
  onClose,
  token,
}: SaveRecipeModalProps) {
  const [name, setName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const slots = useIngredientStore((s) => s.slots);
  const selectedBowl = useIngredientStore((s) => s.selectedBowl);
  const clearSelection = useIngredientStore((s) => s.clearSelection);

  const ingredientIds = Object.values(slots)
    .filter((i) => i !== null)
    .map((i) => i!.id);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!selectedBowl) {
    setError("Select a bowl before saving.");
    return;
  }

  const recipeData = {
    name,
    isPublic,
    bowlId: selectedBowl.id,
    ingredientIds,
  };

  try {
    setLoading(true);
    setError("");

    await saveRecipe(token, recipeData);

    // 🔥 Näytetään ilmoitus ENSIN
    alert("Recipe saved!");

    // 🔥 Tyhjennetään kulho
    clearSelection();

    // 🔥 Suljetaan modal
    onClose();

    // 🔥 Nollataan lomake
    setName("");
    setIsPublic(false);

  } catch (err) {
    console.error(err);
    setError("Saving failed.");
  } finally {
    setLoading(false);
  }
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

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </Modal>
  );
}
