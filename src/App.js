import React, { useEffect, useState } from 'react';
import './App.css';
import { TbLanguage } from 'react-icons/tb';
import { AiFillStar } from 'react-icons/ai';

// function for second page 
function MovieDetails({ selectedMovie, onClose }) {
  return (
    <div className="movie-container">
      <div className="movie-card">
        <h3>{selectedMovie?.name}</h3>
        <a href={selectedMovie.url}><img src={selectedMovie?.image?.medium} alt={selectedMovie?.name} /></a>
        <p>Language : {selectedMovie?.language}</p>
        <p>Rating : {selectedMovie?.rating?.average} <AiFillStar /></p>
      </div>
      <div className="movie-summary">
        <h3>Summary</h3>
        <p>{selectedMovie?.summary}</p>
        <button onClick={onClose}>Back</button>
      </div>
    </div>


  );
}


// function main page
function App() {
  const [users, setUsers] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch('https://api.tvmaze.com/search/shows?q=all')
      .then(response => { return response.json() })
      .then(data => { setUsers(data) })
      .catch(err => console.log(err))
  }, [])

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleClose = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <h1 className='header'>Movie Era</h1>
      {selectedMovie ? (
        <MovieDetails selectedMovie={selectedMovie} onClose={handleClose} />
      ) : (
        users.length > 0 && (
          <div className='boxtype'>
            {users.map(user => (
              <div className='box' key={user.show.id} onClick={() => handleMovieClick(user.show)}>
                <img src={user.show.image?.medium} />
                <h5 style={{ display: 'flex' }}>
                  <div style={{ marginRight: '5px' }}>
                    {user.show.name}
                  </div>
                  <div>
                    ({user.show.type})
                  </div>
                </h5>
                <span style={{ display: 'flex' }}>
                  <div style={{ marginRight: '50px' }}>
                    <TbLanguage /> {user.show.language}
                  </div>
                  <div>
                    {(user.show.rating?.average)}<AiFillStar />
                  </div>
                </span>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default App;
