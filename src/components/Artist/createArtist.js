import { addDoc, collection, snapshotEqual } from "firebase/firestore";
import React, { useReducer } from "react";
import { db, storage } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const CreateArtist = ({artist = {}}) => {
    const initialState = {
        id: '',
        bio: '',
        image_url: '',
        name: '',
        image_file: null,
    };

    const [state, updateState] = useReducer(
        (state, updates) => ({ ...state, ...updates }),
        artist != null ? artist : initialState
    );

    const navigate = useNavigate();

    const uploadImage = async (image_file) => {
        if (!image_file) return;
        const artworkFolderRef = ref(storage, `artistImages/${state.id}`)

        uploadBytes(artworkFolderRef, image_file)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref)
                    .then((url) => {
                        updateState({image_url: url});
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
            await uploadImage(state.image_file)
            await addDoc(collectionRef, {name: state.name, bio: state.bio, image_url: state.image_url})
            navigate("/artists")
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <input 
                placeholder="Name"
                value={state.name}
                onChange={(e) => updateState({name: e.target.value})}
            />
            <input 
                placeholder="Bio"
                value={state.bio}
                onChange={(e) => updateState({bio: e.target.value})}
            />
            <label htmlFor="artist_image_file">Select a profile image.</label>
            <input type="file" id="artist_image_file"
                accept="image/png,image/jpeg"
                onChange={(e) => updateState({image_file: e.target.files[0]})}
            />

            <button onClick={createArtist}>Create Artist</button>
        </div>
    );
};