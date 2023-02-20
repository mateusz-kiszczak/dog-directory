import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Dogs from './components/Dogs'
import NotFound from './components/NotFound'

function App() {
  const [dogsBreed, setDogsBreed] = useState([]);
  const [selectedDogsBreed, setSelectedDogsBreed] = useState('');

  const changeSelectedDogsBreed = (breed) => {
    setSelectedDogsBreed(breed);
  }

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((response) => {
        if (response.status === 200 || response.ok) {
          return response.json();
        } else {
          throw new Error(`HTTP error status: ${response.status}`);
        }
      })
      .then((json) => {
        setDogsBreed(Object.keys(json.message));
      });
  }, []);

  return (
    <div className='app__container'>
      <header className='app__header element-padding-hor'>
        <h1>Dog Directory</h1>
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home dogsBreed={dogsBreed} selectedDogsBreed={selectedDogsBreed} changeSelectedDogsBreed={changeSelectedDogsBreed}/> } />
          <Route path="/:id" element={ <Dogs dogsBreed={dogsBreed} selectedDogsBreed={selectedDogsBreed}/> } />
          <Route path='*' element={ <NotFound /> } />
        </Routes>
      </BrowserRouter>
      <footer className='app__footer element-padding-hor'>
        <p>Dog Directory - based on <a href='https://github.com/do-community/doggy-directory' target='_blank' rel="noopener noreferrer">example from GIT</a></p>
      </footer>
    </div>
  );
}

export default App;
