export default function BaseSelection() {
  const items = [
    "Salaattimix rose",
    "Jäävuorisalaatti",
    "Kuninkaallinen salaatti",
    "Provensaali sekoitus",
    "Saariston salaattisekoitus",
  ];

  return (
    <div className="bg-zinc-800 rounded-[3rem] p-6 text-white w-64 flex flex-col gap-4 shadow-lg">

      <div className="text-center">
        <div className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
          2.
        </div>
        <div className="font-semibold">Valitse salaattipohja</div>
      </div>

      {items.map((item) => (
        <div
          key={item}
          className="border-b border-gray-600 pb-2 flex justify-between items-center"
        >
          <span className="text-sm">{item}</span>
          <div className="w-8 h-8 rounded-full bg-green-400 cursor-pointer"></div>
        </div>
      ))}

    </div>
  );
}