import { addDoc, collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useReducer, useState } from "react";
import { db, storage } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const CreateArtwork = ({artwork = {}}) => {
    const initialState = {
        artist: null,
        description: '',
        image_url: '',
        is_available_as_print: false,
        is_for_sale: false,
        price: 0,
        title: '',
        image_file: null,
    };

    const [state, updateState] = useReducer(
        (state, updates) => ({ ...state, ...updates }),
        artwork != null ? artwork : initialState
    );
    const [artists, setArtists] = useState([]);

    const navigate = useNavigate();

    const uploadArtworkImage = async (image_file, file_name, docRef) => {
        if (!image_file) {
            console.log("Image does not exist.")
            return;
        }
        const fileRef = ref(storage, file_name)
        console.log("image uploading")
        uploadBytes(fileRef, image_file)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref)
                    .then((url) => {
                        console.log(url)
                        updateState({image_url: url});
                        updateDoc(docRef, {image_url: url});
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    };
    
    const createArtwork = async () => {
        try {
            const collectionRef = collection(db, 'artworks');
            const docRef = await addDoc(collectionRef, {
                artist: doc(db, state.artist),
                description: state.description,
                image_url: '',
                is_available_as_print: state.is_available_as_print,
                is_for_sale: state.is_for_sale,
                price: state.price,
                title: state.title
            });
            const image_path = `artworkImages/${docRef.id}`;
            await uploadArtworkImage(state.image_file, image_path, docRef);
            
            navigate("/artworks");
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(
        () => 
          onSnapshot(collection(db, "artists"), (snapshot) => {
            setArtists(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
          }
          ),
        []
      );

    return (
        <div>
            <label htmlFor="select_artist">Artist</label>
            <select name="select_artist" id="select_artist"
                onChange={(e) =>{
                    console.log(e.target.value)
                    updateState({artist: e.target.value})
                }}
            >
                {artists.map((artist) => (
                    <option value={doc(db, 'artists', artist.id).path}>{artist.name}</option>
                ))}
            </select>

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
            <input type="file" id="artwork_image_file"
                accept="image/png,image/jpeg"
                onChange={(e) => updateState({image_file: e.target.files[0]})}
            />

            <button onClick={createArtwork}>Create Artwork</button>
        </div>
    );
};