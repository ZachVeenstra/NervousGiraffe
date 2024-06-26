import { addDoc, collection, updateDoc } from "firebase/firestore";
import React, { useReducer, useState } from "react";
import { db, storage } from "../../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Button, Form, Modal } from "react-bootstrap";

export const CreateArtist = ({ fetchArtists, }) => {
    const initialState = {
        bio: '',
        image_url: '',
        name: '',
        image_file: null,
    };

    const [state, updateState] = useReducer(
        (state, updates) => ({ ...state, ...updates }),
        initialState
    );

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const uploadImage = async (image_file, file_name, docRef) => {
        if (!image_file) return;
        const fileRef = ref(storage, file_name)

        uploadBytes(fileRef, image_file)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref)
                    .then((url) => {
                        console.log(url)
                        updateState({image_url: url});
                        updateDoc(docRef, {image_url: url});
                        try {
                            fetchArtists();
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
    
    const createArtist = async () => {
        try {
            const collectionRef = collection(db, 'artists');
            const docRef = await addDoc(collectionRef, {name: state.name, bio: state.bio, image_url: ''});
            const image_path = `artistImages/${docRef.id}`;
            await uploadImage(state.image_file, image_path, docRef);

            handleClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>Create Artist</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Artist</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Floating>
                                <Form.Control
                                    placeholder="Name"
                                    onChange={(e) => updateState({name: e.target.value})}
                                />
                                <Form.Label>Name</Form.Label>
                            </Form.Floating>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Floating>
                                <Form.Control
                                    placeholder="Bio"
                                    onChange={(e) => updateState({bio: e.target.value})}
                                />
                                <Form.Label>Bio</Form.Label>
                            </Form.Floating>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="artist_image_file">Select a profile image: </Form.Label>
                            <Form.Control type="file" id="artist_image_file"
                                accept="image/png,image/jpeg"
                                onChange={(e) => updateState({image_file: e.target.files[0]})}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={createArtist}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};