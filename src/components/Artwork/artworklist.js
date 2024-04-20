import React, { useEffect, useState } from "react";
import { Artwork } from './artwork';
import { db } from '../../config/firebase';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { Link, Outlet } from "react-router-dom";
import { CreateArtwork } from "./createArtwork";

export default function ArtworkList({ artworks = []}) {
    const [state, setState] = useState([]);

    useEffect(
        () => 
          fetchArtworks(),
        [state]
    );

    const fetchArtworks = () => {
        if (artworks.length == 0) {
            onSnapshot(collection(db, "artworks"), (snapshot) => 
                setState(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
            );
        } else {
            setState(artworks);
        }
    }

    const deleteArtwork = async (id) => {
        const docRef = doc(db, 'artworks', id);
        await deleteDoc(docRef);
        fetchArtworks();
    }

    return (
        <>
            <Outlet />
            <Link to="/artworks/new">New Artwork</Link>
            <ul>
                {state.map((artwork) =>  (
                    <li className="list-item" key={artwork.id}>
                        <Artwork artwork={artwork}/>
                        <button onClick={() => deleteArtwork(artwork.id)}>Delete Artwork</button>
                    </li>
                ))}
            </ul>
        </>
    );
}