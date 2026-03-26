import { useState } from "react";

export type Bowl = {
  id: number;
  name: string;
  volume_ml: number;
  slot_count: number;
  shape: "square" | "round";
};

const bowls: Bowl[] = [
  { id: 1, name: "Neliö 250 ml", volume_ml: 250, slot_count: 6, shape: "square" },
  { id: 2, name: "Neliö 500 ml", volume_ml: 500, slot_count: 6, shape: "square" },
  { id: 3, name: "Ympyrä 250 ml", volume_ml: 250, slot_count: 6, shape: "round" },
  { id: 4, name: "Ympyrä 500 ml", volume_ml: 500, slot_count: 6, shape: "round" },
];

export default function BowlSelection() {
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
        <div
          key={bowl.id}
          onClick={() => setSelected(bowl)}
          className={`flex items-center gap-4 cursor-pointer transition ${
            selected?.id === bowl.id ? "text-lime-400" : "text-gray-300"
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-[#c2a679]"></div>
          <div>{bowl.name}</div>
        </div>
      ))}

    </div>
  );
}