import React, { useEffect, useState } from "react";
import { Link, } from "react-router-dom";
import { auth, } from "../../config/firebase";
import { signOut } from "firebase/auth";

export default function Navbar () {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("Authenticated!");
                setIsAuthenticated(true);
            } else {
                console.log("Logged out!");
                setIsAuthenticated(false);
            }
        });
        return unsubscribe;
    }, []);

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
    };

        return ( 
            <nav className="nav">
                <Link to="/" className="title">Nervous Giraffe</Link>
                <ul>
                    <li>
                        <Link to="/artists">Artists</Link>
                    </li>
                    <li>
                        <Link id="nav-artworks" to="/artworks">Artworks</Link>
                    </li>
                    {isAuthenticated && <li>
                        <Link to="/about">About</Link>
                    </li>}
                    <li>
                        {isAuthenticated ? <button onClick={logout}>Logout</button> : <Link id="nav-login" to="/login">Login</Link> }
                    </li>
                </ul>
            </nav>
        );
}