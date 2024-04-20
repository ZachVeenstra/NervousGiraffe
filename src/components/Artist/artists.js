import React, { useEffect, useState } from "react";
import { Artist } from "./artist";
import { db } from '../../config/firebase';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { Link, Outlet } from "react-router-dom";

export default function Artists({artists = []}) {
    const [state, setState] = useState([]);

    useEffect(
        () => 
          fetchArtists(),
        [state]
    );

    const fetchArtists = () => {
        if (artists.length == 0) {
            onSnapshot(collection(db, "artists"), (snapshot) => 
                setState(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
            );
        } else {
            setState(artists);
        }
    }

    const deleteArtist = async (id) => {
        const docRef = doc(db, 'artists', id);
        await deleteDoc(docRef);
        fetchArtists();
    }
    
    return (
        <>
            <Outlet />
            <Link to="/artists/new">New Artist</Link>
            <ul>
                {state.map((artist) =>  (
                    <li key={artist.id}>
                        <Artist artist={artist}/>
                        <button onClick={() => deleteArtist(artist.id)}>Delete Artist</button>
                    </li>
                ))}
            </ul>
        </>
        
    );   
}