import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useLayoutEffect, useReducer } from "react";
import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

export const CreateArtwork = ({artwork = {}}) => {
    const initialState = {
        artist: null,
        description: '',
        image_url: '',
        is_available_as_print: false,
        is_for_sale: false,
        price: 0,
        title: '',
    };

    const [state, updateState] = useReducer(
        (state, updates) => ({ ...state, ...updates }),
        artwork != null ? artwork : initialState
    );

    const navigate = useNavigate();
    
    const createArtwork = async () => {
        try {
            const collectionRef = collection(db, 'artworks');
            await addDoc(collectionRef, {
                artist: state.artist,
                description: state.description,
                image_url: state.image_url,
                is_available_as_print: state.is_available_as_print,
                is_for_sale: state.is_for_sale,
                price: state.price,
                title: state.title
            })
            navigate("/artworks")
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {/* TODO: Dropdown with artist picker. */}
            <input 
                placeholder="Artist"
                value={state.artist}
                onChange={(e) => updateState({artist: e.target.value})}
            />

            <input 
                placeholder="Title"
                value={state.title}
                onChange={(e) => updateState({title: e.target.value})}
            />

            <textarea 
                placeholder="Description"
                value={state.description}
                onChange={(e) => updateState({description: e.target.value})}
                rows="6"
                cols="50"
            />
            
            <input 
                type="checkbox" id="is_available_as_print"
                checked={state.is_available_as_print}
                onChange={(e) => updateState({is_available_as_print: e.target.checked})}
            />
            <label htmlFor="is_available_as_print">Available as a print</label>

            <input 
                type="checkbox" id="is_for_sale"
                checked={state.is_for_sale}
                onChange={(e) => updateState({is_for_sale: e.target.checked})}
            />
            <label htmlFor="is_available_as_print">Available as a print</label>

            <input 
                placeholder="Price"
                value={state.price}
                type="number"
                onChange={(e) => updateState({price: e.target.value})}
            />
            
            <label htmlFor="artwork_image_file">Select an image:</label>
            <input type="file" id="artwork_image_file"/>

            <button onClick={createArtwork}>Create Artwork</button>
        </div>
    );
};