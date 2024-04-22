import { addDoc, collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useReducer, useState } from "react";
import { db, storage } from "../../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Form from 'react-bootstrap/Form';
import { Button, InputGroup, Modal } from "react-bootstrap";

export const CreateArtwork = ({ fetchArtworks, }) => {
    const initialState = {
        artist: null,
        description: '',
        image_url: '',
        is_available_as_print: false,
        is_for_sale: false,
        price: 0,
        title: '',
        image_file: null,
    };

    const [state, updateState] = useReducer(
        (state, updates) => ({ ...state, ...updates }),
        initialState
    );
    const [artists, setArtists] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const uploadArtworkImage = async (image_file, file_name, docRef) => {
        if (!image_file) {
            console.log("Image does not exist.")
            return;
        }
        const fileRef = ref(storage, file_name)
        console.log("image uploading")
        uploadBytes(fileRef, image_file)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref)
                    .then((url) => {
                        console.log(url)
                        updateState({image_url: url});
                        updateDoc(docRef, {image_url: url});
                        try {
                            fetchArtworks();
                        } catch (error) {
                            console.error(error)
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    };
    
    const createArtwork = async () => {
        try {
            const collectionRef = collection(db, 'artworks');
            const docRef = await addDoc(collectionRef, {
                artist: doc(db, state.artist),
                description: state.description,
                image_url: '',
                is_available_as_print: state.is_available_as_print,
                is_for_sale: state.is_for_sale,
                price: state.price,
                title: state.title
            });
            const image_path = `artworkImages/${docRef.id}`;
            await uploadArtworkImage(state.image_file, image_path, docRef);
            handleClose();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(
        () => {
            onSnapshot(collection(db, "artists"), (snapshot) => {
              setArtists(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
            }
            )},
        []
    );

    
    return (
        <>
            <Button variant="primary" onClick={handleShow}>Create Artwork</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Artwork</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Select
                                onChange={(e) =>{
                                    updateState({artist: e.target.value})
                                }}
                            >
                                <option selected disabled hidden>Select an artist:</option>
                                {artists.map((artist) => (
                                    <option key={artist.id} value={doc(db, 'artists', artist.id).path}>{artist.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Floating>
                                <Form.Control
                                    placeholder="Title"
                                    onChange={(e) => updateState({title: e.target.value})}
                                />
                                <Form.Label>Title</Form.Label>
                            </Form.Floating>
                        </Form.Group>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>Description</InputGroup.Text>
                            <Form.Control as="textarea" rows={2}
                                onChange={(e) => updateState({description: e.target.value})}
                            />
                        </InputGroup>
                        
                        <Form.Group className="mb-3">
                            <Form.Check
                                onChange={(e) => updateState({is_available_as_print: e.target.checked})}
                                label={"Available as a print?"}
                            />
                            <Form.Check
                                onChange={(e) => updateState({is_for_sale: e.target.checked})}
                                label={"Is for sale?"}
                            />
                        </Form.Group>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control aria-label="Price (to the nearest dollar"
                                onChange={(e) => updateState({price: e.target.value})}
                            />
                            <InputGroup.Text>.00</InputGroup.Text>
                        </InputGroup>
                        
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="artwork_image_file">Select an image: </Form.Label>
                            <Form.Control type="file" id="artwork_image_file"
                                accept="image/png,image/jpeg"
                                onChange={(e) => updateState({image_file: e.target.files[0]})}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={createArtwork}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </>

    );
};