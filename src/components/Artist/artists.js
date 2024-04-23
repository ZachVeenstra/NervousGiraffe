import React, { useCallback, useEffect, useState } from "react";
import Artist from "./artist";
import { auth, db, storage } from '../../config/firebase';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from "firebase/storage";
import { Button, Col, Container, Row } from "react-bootstrap";
import { CreateArtist } from "./createArtist";
import { EditArtist } from "./editArtist";

export default function Artists({artists = []}) {
    const [state, setState] = useState([]);
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
            {isAuthenticated && <Row>
                <Col>
                    <CreateArtist fetchArtists={fetchArtists} />
                </Col>
            </Row>}
            <Row className="justify-content-center">
                {state.map((artist) =>  (
                    <Col key={artist.id}  className="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-12 mb-3">
                        <Artist artist={artist}/>
                        {isAuthenticated && <span>
                            <EditArtist artist={artist} fetchArtists={fetchArtists} />
                            <Button className="btn-danger" onClick={() => deleteArtist(artist.id)}>Delete Artist</Button>
                        </span>}
                    </Col>
                ))}
            </Row>
            
        </Container>
    );   
}