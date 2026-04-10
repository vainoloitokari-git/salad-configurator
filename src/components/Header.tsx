import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-zinc-800 text-white w-full h-32 flex justify-between items-start px-8 pt-4 relative">
      <Link
        to="/"
        className="w-24 h-24 rounded-full border-4 border-[#A2D135] flex items-center justify-center flex-col -mt-2 bg-zinc-800 shadow-lg"
      >
        <span>Fresh Food Factory</span>
        <span>FRESSE</span>
      </Link>

      <h1 className="text-3xl font-black tracking-widest mt-6">
        BOWL-LASKURI
      </h1>

      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex flex-col gap-1 p-2"
        >
          <span className="w-8 h-1 bg-[#A2D135] rounded"></span>
          <span className="w-8 h-1 bg-[#A2D135] rounded"></span>
          <span className="w-8 h-1 bg-[#A2D135] rounded"></span>
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 mt-2 bg-[#A2D135] text-black rounded-b-3xl rounded-t-xl px-6 py-4 flex flex-col gap-2 min-w-[200px] shadow-md">
            <Link to="/community" className="font-semibold hover:underline">
              Saved recipes
            </Link>
            <Link to="/profile" className="font-semibold hover:underline">
              Profile
            </Link>
            <Link to="/settings" className="font-semibold hover:underline">
              Settings
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
 