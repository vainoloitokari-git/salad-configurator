import { useState } from "react";
import type { Bowl } from "../types";

type BowlSelectionProps = {
  bowls: Bowl[];
  setBowl: (id: number) => void;
};

export default function BowlSelection({ bowls, setBowl }: BowlSelectionProps) {
  const [selected, setSelected] = useState<Bowl | null>(null);

  return (
    <div className="bg-[#2f2f2f] text-white rounded-[40px] p-6 w-64 flex flex-col gap-6">
      <div className="text-center">
        <div className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
          1.
        </div>
        <div className="font-semibold">Valitse rasia</div>
      </div>

      {bowls.map((bowl) => (
        <button
          key={bowl.id}
          onClick={() => {
            setSelected(bowl);
            setBowl(bowl.id);
          }}
          className={`flex items-center gap-4 cursor-pointer transition ${
            selected && selected.id === bowl.id
            ? "text-lime-400" 
            : "text-gray-300"
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-[#c2a679]"></div>
          <div>{bowl.name}</div>
        </button>
      ))}
    </div>
  );
}