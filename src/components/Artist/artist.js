import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { db } from "../../config/firebase";

export class Artist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.artist.id,
            bio: props.artist.bio,
            image_url: props.artist.image_url,
            name: props.artist.name,
        };
    }

    deleteArtist = async (id) => {
        const docRef = doc(db, 'artists', id);
        await deleteDoc(docRef);
    }

    render() {
        return (
            <>
                <img src={this.state.image_url}/>
                <p>
                    {this.state.name}
                </p>
                <p>
                    {this.state.bio}
                </p>
            </>
        );
    }
}