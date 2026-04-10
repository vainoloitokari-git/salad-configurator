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
        onSubmit?.(email, password);
        setEmail("");
        setPassword("");
    };
    
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div>
                    <label htmlFor="email"> Email </label>
                    <input
                    id= "email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                 />
                </div>
                <button type="submit"> Log in </button>
            </form>
        </Modal>
    )
}

export default LoginModal;