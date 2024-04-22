import { Card } from "react-bootstrap";

export default function Artist ({ artist={} }) {

    return (
        <Card>
            <Card.Img variant="top" src={artist.image_url}/>
            <Card.Body>
                <Card.Title>{artist.name}</Card.Title>
                <Card.Text>{artist.bio}</Card.Text>
            </Card.Body>
        </Card>
    );
}