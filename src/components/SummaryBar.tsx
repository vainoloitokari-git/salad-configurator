
export default function SummaryBar() {
  return (
    <div className="bg-zinc-800 rounded-[3rem] p-8 text-white w-full flex flex-col md:flex-row gap-8 shadow-xl">
      
      {/* Left: Selected ingredients */}
      <div className="flex-1 bg-[#3a3a3a] rounded-3xl p-6 min-h-[150px] shadow-inner">
        <h3 className="font-semibold mb-4">Valitut ainekset</h3>

        {/* Placeholder content */}
        <div className="text-gray-400 text-sm">
          Ei valittuja ainesosia
        </div>
      </div>

      {/* Right: Totals */}
      <div className="flex-1 flex flex-col justify-center items-center gap-6">
        
        {/* Weight */}
        <div className="text-center">
          <div className="bg-white text-black font-black text-2xl py-3 w-32 rounded-full mb-2 shadow-md text-center">
            0 g
          </div>
          <div className="text-sm text-gray-300">Paino</div>
        </div>

        {/* Price */}
        <div className="text-center">
          <div className="bg-white text-black font-black text-2xl py-3 w-32 rounded-full mb-2 shadow-md text-center">
            0,00 €
          </div>
          <div className="text-sm text-gray-300">Hinta</div>
        </div>

      </div>
    </div>
  );
}