import React, { useState } from "react";
import Modal from "./Modal";
import { login } from "../services/api";
import { useAuthStore } from "../store/useAuthStore";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const setAuth = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await login(email, password);
      setAuth(data.token, data.name);

      setEmail("");
      setPassword("");

      onClose();
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <h2 className="text-xl font-semibold text-center">Login</h2>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="border border-gray-300 p-2 rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="border border-gray-300 p-2 rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
    </Modal>
  );
};

export default LoginModal;