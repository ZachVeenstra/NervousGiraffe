import React, { useEffect, useState } from "react";
import { Artist } from "./artist";
import { db } from '../../config/firebase';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { Link } from "react-router-dom";

export class Artists extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.artists = null
        if (props.artists != null) {
            this.artists = props.artists
        }
        else {
            this.fetchArtists()
        }
        
        this.state = {
            artists: this.artists
        };
    }

    fetchArtists = () => {
        onSnapshot(collection(db, "artists"), (snapshot) => 
            this.state.artists = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
        )
    }

    deleteArtist = async (id) => {
        const docRef = doc(db, 'artists', id);
        await deleteDoc(docRef);
        this.fetchArtists();
    }

    componentDidMount() {
        if (this.state.artists.length == 0) {
            this.fetchArtists()
        }
    }
    
    render() {
        return (
            <div>
                <Link to="/artists/new">New Artist</Link>
                <ul>
                    {this.state.artists.map((artist) =>  (
                        <li key={artist.id}>
                            <Artist artist={artist}/>
                            <button onClick={() => this.deleteArtist(artist.id)}>Delete Artist</button>
                        </li>
                    ))}
                </ul>
            </div>
            
        );    
    }
}