import React from "react";
import { Carousel, CarouselItem, Col, Container, Image, Row } from "react-bootstrap";

export default function Home ({artworks=[], artists=[]}) {

    return (
        <Container fluid>
            <Row>
                <Col>
                    <h1 className="display-1">Welcome to Nervous Giraffe!</h1>
                    <h2 className="display-4">The home for artists' portfolios and sales.</h2>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col className="col-xs-12 col-sm-12 col-md-12 col-lg-9 col-xl-6">
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