import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { db } from "../../config/firebase";
import { Card } from "react-bootstrap";

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
            <Card>
                <Card.Img variant="top" src={this.state.image_url}/>
                <Card.Body>
                    <Card.Title>{this.state.name}</Card.Title>
                    <Card.Text>{this.state.bio}</Card.Text>
                </Card.Body>
            </Card>
        );
    }
}