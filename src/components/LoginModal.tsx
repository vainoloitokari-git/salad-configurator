import React, {useState} from "react";
import Modal from "./Modal";

type LoginModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: (email: string, password: string) => void;
};

const LoginModal: React.FC<LoginModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login clicked");
        onSubmit?.(email, password);
        setEmail("");
        setPassword("");
    };
    
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
                <h2 className="text-xl font-semibold text-center">Login</h2>
                <div>
                    <label htmlFor="email"> Email </label>
                    <input
                    id= "email"
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
                    required/>
                </div>

                <button 
                type="submit"
                className="mt-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"> Log in </button>
            </form>
        </Modal>
    );
};

export default LoginModal;