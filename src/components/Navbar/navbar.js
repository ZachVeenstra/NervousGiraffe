import React from "react";
import { Link } from "react-router-dom";

export class Navbar extends React.Component {
    render () {
        return <nav className="nav">
            <Link to="/" className="title">Nervous Giraffe</Link>
            <ul>
                <li>
                    <Link to="/artists">Artists</Link>
                </li>
                <li>
                    <Link to="/artworks">Artworks</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </nav>
    }
}