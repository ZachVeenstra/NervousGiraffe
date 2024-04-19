import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.error(error);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <input 
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}    
            />
            <input 
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={login}>Login</button>
            <button onClick={logout}>Logout</button>
        </div>
    );
};