import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { db } from "../../config/firebase";

export default function WebService () {
    const [artworks, setArtworks] = useState([]);
    const [artists, setArtists] = useState([]);
  
    useEffect(
      () => 
        onSnapshot(collection(db, "artworks"), (snapshot) => 
          setArtworks(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        ),
      []
    );
  
    useEffect(
      () => 
        onSnapshot(collection(db, "artists"), (snapshot) => 
          setArtists(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        ),
      []
    );

    return (
        <Container fluid>
            <Row>
                <Col>
                    <h1 className="display-4">Artists</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>name</th>
                                <th>bio</th>
                                <th>image_url</th>
                            </tr>
                        </thead>
                        <tbody>
                            {artists.map((artist) =>  (
                                <tr key={artist.id}>
                                    <td>{artist.id}</td>
                                    <td>{artist.name}</td>
                                    <td>{artist.bio}</td>
                                    <td>{artist.image_url}</td>
                                </tr>
                            ))}
                        </tbody>
                        
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 className="display-4">Artworks</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>title</th>
                                <th>artist</th>
                                <th>description</th>
                                <th>is_available_as_print</th>
                                <th>is_for_sale</th>
                                <th>price</th>
                                <th>image_url</th>
                            </tr>
                        </thead>
                        <tbody>
                            {artworks.map((artwork) =>  (
                                <tr key={artwork.id}>
                                    <td>{artwork.id}</td>
                                    <td>{artwork.title}</td>
                                    <td>{artwork.artist.id}</td>
                                    <td>{artwork.description}</td>
                                    <td>{artwork.is_available_as_print ? "true" :"false"}</td>
                                    <td>{artwork.is_for_sale ? "true" :"false"}</td>
                                    <td>{artwork.price}</td>
                                    <td>{artwork.image_url}</td>
                                </tr>
                            ))}
                        </tbody>
                        
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}