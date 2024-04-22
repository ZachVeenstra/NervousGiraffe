import React, { useCallback, useEffect, useState } from "react";
import Artist from "./artist";
import { db, storage } from '../../config/firebase';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from "firebase/storage";
import { Button, Col, Container, Row } from "react-bootstrap";
import { CreateArtist } from "./createArtist";
import { EditArtist } from "./editArtist";

export default function Artists({artists = []}) {
    const [state, setState] = useState([]);

    const fetchArtists = useCallback( () => {
        if (artists.length === 0) {
            onSnapshot(collection(db, "artists"), (snapshot) => 
                setState(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
            );
        } else {
            setState(artists);
        }
    }, [artists]);

    useEffect(
        () => 
          fetchArtists(),
        [state, fetchArtists]
    );

    const deleteArtist = async (id) => {
        const docRef = doc(db, 'artists', id);
        const fileRef = ref(storage, `artistImages/${docRef.id}`);
        try {
            await deleteDoc(docRef);
            await deleteObject(fileRef);
            fetchArtists();
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <Container className="p-3">
            <Row>
                <Col>
                    <CreateArtist fetchArtists={fetchArtists} />
                </Col>
            </Row>
            <Row>
                <ul>
                    {state.map((artist) =>  (
                        <li key={artist.id}>
                            <Col className="mb-3">
                                <Artist artist={artist}/>
                                <EditArtist artist={artist} fetchArtists={fetchArtists} />
                                <Button className="btn-danger" onClick={() => deleteArtist(artist.id)}>Delete Artist</Button>
                            </Col>
                            
                        </li>
                    ))}
                </ul>
            </Row>
            
        </Container>
    );   
}