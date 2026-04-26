import { Link } from "react-router-dom";
import { useState } from "react";
import LoginModal from "./LoginModal"; 
import { useAuthStore } from "../store/useAuthStore";
import logo from "../assets/fresse-logo.png";

const Header = () => {
  const { userName, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleLogout = () => {
    logout();
    localStorage.clear();
  };

  return (
    <div className="bg-zinc-800 text-white w-full h-32 flex justify-between items-start px-8 pt-4 relative">

      <Link to="/" className="flex items-center">
        <img 
          src={logo} 
          alt="Fresse logo" 
          className="h-28 w-auto object-contain"

        />
      </Link>

      <h1 className="text-3xl font-black tracking-widest mt-6">
        BOWL-LASKURI
      </h1>

      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex flex-col gap-1 p-2">
          <span className="w-8 h-1 bg-[#A2D135] rounded"></span>
          <span className="w-8 h-1 bg-[#A2D135] rounded"></span>
          <span className="w-8 h-1 bg-[#A2D135] rounded"></span>
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 mt-2 bg-[#A2D135] text-black rounded-b-3xl rounded-t-xl px-6 py-4 flex flex-col gap-2 min-w-[200px] shadow-md">
            <Link to="/community" className="font-semibold hover:underline">
              Saved recipes
            </Link>

            {userName ? (
              <>
                <span className="font-semibold">Hello, {userName}</span>
                <button
                  onClick={handleLogout}
                  className="font-semibold hover:underline text-left">
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="font-semibold hover:underline text-left">
                  Kirjaudu sisään
                </button>
              )}
          </div>
        )}
      </div>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </div>
  );
};

export default Header;
