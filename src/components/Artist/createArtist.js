import { addDoc, collection } from "firebase/firestore";
import React, { useReducer } from "react";
import { useState } from "react";
import { db } from "../../config/firebase";

export const CreateArtist = () => {
    const initialState = {
        bio: '',
        image_url: '',
        name: '',
    };

    const [state, updateState] = useReducer(
        (state, updates) => ({ ...state, ...updates }),
        initialState
    );
    
    const createArtist = async () => {
        try {
            const collectionRef = collection(db, 'artists');
            await addDoc(collectionRef, {name: state.name, bio: state.bio, image_url: state.image_url})
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <input 
                placeholder="Name"
                onChange={(e) => updateState({name: e.target.value})}
            />
            <input 
                placeholder="Bio"
                onChange={(e) => updateState({bio: e.target.value})}
            />
            <label htmlFor="artist_image_file">Select a profile image.</label>
            <input type="file" id="artist_image_file"/>

            <button onClick={createArtist}>Create Artist</button>
        </div>
    );
};