import React from "react";
import { Carousel, CarouselItem, Col, Container, Image, Row } from "react-bootstrap";

export default function Home ({artworks=[], artists=[]}) {
    // const [artists, setArtists] = useState(artists);
    // const [artworks, setArtworks] = useState(artworks);

    return (
        <Container fluid>
            <Row>
                <Col>
                    <h1 className="display-1">Welcome to Nervous Giraffe!</h1>
                    <h2 className="display-4">The home for artists' portfolios and sales.</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Carousel data-bs-theme="dark">
                        {artworks.map((artwork) =>  (
                            <CarouselItem key={artwork.id}>
                                <Image className="img-fluid" src={artwork.image_url}/>
                            </CarouselItem>
                        ))}
                    </Carousel>
                </Col>
            </Row>
        </Container>
    );
}