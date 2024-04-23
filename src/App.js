import './App.css';
import { db } from './config/firebase';
import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import Navbar from './components/Navbar/navbar';
import ArtworkList from './components/Artwork/artworklist';
import { Auth } from './components/auth';
import { Route, Routes } from "react-router-dom"
import Home from './components/Home/home'
import Artists from './components/Artist/artists';
import Whoops404 from './components/404/whoops404';
import 'bootstrap/dist/css/bootstrap.min.css';
import WebService from './components/WebService/webService';

function App() {
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
    <div className="App">
      <header className="App-header">
          <Navbar/>
      </header>
      <Routes>
        <Route path='/' element={<Home artworks={artworks} artists={artists}/>} />
        <Route path='/login' element={<Auth />} />
        <Route path='/artists' element={<Artists artists={artists}/>}/>
        <Route path='/artworks' element={<ArtworkList artworks={artworks}/>}/>
        <Route path='/about' element={<WebService />} />
        <Route path="*" element={<Whoops404 />} />
      </Routes>
    </div>
  );
}

export default App;
