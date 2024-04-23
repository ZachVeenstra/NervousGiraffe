import React, { useEffect, useState } from "react";
import { getDoc } from "firebase/firestore";
import { Button, Card, Modal} from "react-bootstrap";
import Artist from "../Artist/artist";

export default function Artwork({ artwork = {} }) {
    const [state, setState] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(
        () => {
            getDoc(artwork.artist).then(snapshot => {
                setState({ 
                    artist_name: snapshot.data().name,
                    artist_image_url: snapshot.data().image_url,
                    artist_bio: snapshot.data().bio,
                    artist: artwork.artist,
                    description: artwork.description,
                    image_url: artwork.image_url,
                    is_available_as_print: artwork.is_available_as_print,
                    is_for_sale: artwork.is_for_sale,
                    price: artwork.price,
                    title: artwork.title, })
            })
            .catch((error) => {
                console.error(error);
            });
        }, [state]
    );

    return (
        <Card>
            <Card.Img variant="top" src={state.image_url}/>
            <Card.Body>
                <Card.Title><em>{state.title}</em> – {state.artist_name}</Card.Title>
                <Card.Text>
                    {state.description}
                </Card.Text>
                <Button variant="secondary" onClick={handleShow}>View the Artist</Button>
            </Card.Body>
            <Card.Footer>
                {/* TODO: Implement these buttons when purchasing becomes available. */}
                {/* {state.is_available_as_print && <Button className="mr-3">Purchase Print</Button>}
                {state.is_for_sale && <Button>Purchase Original</Button>} */}
            </Card.Footer>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Body>
                        <Artist artist={{
                            name: state.artist_name, 
                            bio: state.artist_bio, 
                            image_url: state.artist_image_url}}/>
                    </Modal.Body>
                </Modal.Header>
            </Modal>
        </Card>
    );
    
}