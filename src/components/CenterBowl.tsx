type Props = {
  baseType: number | null
  setBaseType: (id: number) => void
}

export default function CenterBowl({ setBaseType }: Props) {
  return (
    <div className="flex flex-col items-center justify-center">
      
      <div className="flex gap-3 mb-6 items-center">
        <button onClick={() => setBaseType(1)} className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">
          Salaatti
        </button>

        <button  onClick={() => setBaseType(2)} className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">
          Rahka
        </button>

        <div className="flex gap-2">
          <div className="w-6 h-6 bg-gray-300 rounded" />
          <div className="w-6 h-6 bg-gray-300 rounded" />
        </div>
      </div>

      
      <div className="w-80 h-80 rounded-full border-[12px] border-gray-200 bg-gray-50 flex items-center justify-center shadow-inner">
        <span className="text-gray-500">Bowl content</span>
      </div>

      
      <div className="mt-4 flex flex-col items-center text-gray-600">
        <span className="text-lg font-medium">100 g / 1,99 €</span>
        <span className="text-sm">500 ml</span>
      </div>

    </div>
  );
}