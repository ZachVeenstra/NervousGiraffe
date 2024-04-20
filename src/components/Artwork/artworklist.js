import React from "react";
import { Artwork } from './artwork';
import { db } from '../../config/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export class ArtworkList extends React.Component {
    constructor(props) {
        
        super(props);
        this.artworks = null
        if (props.artworks != null) {
            this.artworks = props.artworks
        }
        else {
            this.fetchArtworks()
        }
        
        this.state = {
            artworks: this.artworks
        };
    }

    fetchArtworks = () => {
        onSnapshot(collection(db, "artworks"), (snapshot) => 
            this.state.artworks = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
        )
    }

    componentDidMount() {
        if (this.state.artworks.length == 0) {
            this.fetchArtworks()
        }
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.artworks.map((artwork) =>  (
                        <li className="list-item" key={artwork.id}>
                        <Artwork artwork={artwork}/>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}