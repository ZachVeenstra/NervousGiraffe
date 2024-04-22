import React from "react";
import { getDoc } from "firebase/firestore";
import { Card} from "react-bootstrap";

export class Artwork extends React.Component {
    getArtistFromReference = async (artistDocRef) => {
        const artistSnapshot = await getDoc(artistDocRef);
        return artistSnapshot.data()
    }

    constructor(props) {
        super(props);
        this.state = {
            artist: props.artwork.artist,
            description: props.artwork.description,
            artist_name: '',
            image_url: props.artwork.image_url,
            is_available_as_print: props.artwork.is_available_as_print,
            is_for_sale: props.artwork.is_for_sale,
            price: props.artwork.price,
            title: props.artwork.title,
        };
    }

    componentDidMount() {
        this.getArtistFromReference(this.state.artist).then(artist => {
            this.setState({ artist_name: artist.name })
        });
    }

    render() {
        return (
            <Card>
                <Card.Img variant="top" src={this.state.image_url}/>
                <Card.Body>
                    <Card.Title><em>{this.state.title}</em> – {this.state.artist_name}</Card.Title>
                    <Card.Text>
                        {this.state.description}
                    </Card.Text>
                </Card.Body>
                {/* <span className="purchase-buttons">
                    {this.state.is_available_as_print && <button>Purchase Print</button>}
                    {this.state.is_for_sale && <button>Purchase Original</button>}
                </span> */}
            </Card>
        );
    }
}