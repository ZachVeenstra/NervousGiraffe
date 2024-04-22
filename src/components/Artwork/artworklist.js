import React, { useCallback, useEffect, useState } from "react";
import Artwork from './artwork';
import { db, storage } from '../../config/firebase';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from "firebase/storage";
import { Button, Col, Container, Row } from "react-bootstrap";
import { CreateArtwork } from "./createArtwork";
import { EditArtwork } from "./editArtwork";

export default function ArtworkList({ artworks = []}) {
    const [state, setState] = useState([]);

    const fetchArtworks = useCallback(() => {
        console.log("Fetching artworks...")
        if (artworks.length === 0) {
            onSnapshot(collection(db, "artworks"), (snapshot) => 
                setState(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
            );
        } else {
            setState(artworks);
        }
    }, [artworks]);

    useEffect(
        () => 
          fetchArtworks(),
        [fetchArtworks, state]
    );

    const removeArtwork = (artwork) => {
        var stateCopy = [...state];
        var indexOfItemToRemove = stateCopy.indexOf(artwork);
        if (indexOfItemToRemove !== -1) {
            stateCopy.splice(indexOfItemToRemove, 1);
            setState(stateCopy)
        }
    }

    const deleteArtwork = async (artwork) => {
        const docRef = doc(db, 'artworks', artwork.id);
        const fileRef = ref(storage, `artworkImages/${docRef.id}`);
        try {
            await deleteDoc(docRef);
            await deleteObject(fileRef);
            removeArtwork(artwork);
            fetchArtworks();
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Container className="p-3">
                <Row>
                    <Col>
                        <CreateArtwork fetchArtworks={fetchArtworks} />
                    </Col>
                </Row>
                <Row>
                    <ul>
                        {state.map((artwork) =>  (
                            <li className="list-item" key={artwork.id}>
                                <Col className="mb-3">
                                    <Artwork artwork={artwork}/>
                                    <EditArtwork artwork={artwork} fetchArtworks={fetchArtworks} />
                                    <Button className="btn-danger" onClick={() => deleteArtwork(artwork)}>Delete Artwork</Button>
                                </Col>
                            </li>
                        ))}
                    </ul>
                </Row>
                

            </Container>
        </>
    );
}