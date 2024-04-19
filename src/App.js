import './App.css';
import { db } from './config/firebase';
import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { Artwork } from './components/Artwork/artwork';

function App() {
  const [artworks, setArtworks] = useState([])

  useEffect(
    () => 
      onSnapshot(collection(db, "artworks"), (snapshot) => 
        setArtworks(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
      ), 
    []
  );

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <body>

      <ul>
          {artworks.map((artwork) =>  (
            <li key={artwork.id}>
              <Artwork artwork={artwork}/>
            </li>
          ))}
        </ul>
      </body>
    </div>
  );
}

export default App;
