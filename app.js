import React, { useEffect, useState } from "react";
import MovieModal from "./MovieModal";
import "./App.css";

const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRklGramUPYbXDKsQxoFCMFbud4DBwIF5VrMD0OIC1M-hiK7vHc2TsJTCAGT4noozZcCaJpMbNKBOn-/pub?output=csv";

function parseCSV(text) {
  // Handles commas inside quotes
  const rows = text.trim().split("\n").map(row =>
    row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g)?.map(col => col.replace(/^"|"$/g, "")) || []
  );
  // Remove header row
  return rows.slice(1).map(([name, poster, link]) => ({ name, poster, link }));
}

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch(SHEET_CSV_URL)
      .then(res => res.text())
      .then(text => setMovies(parseCSV(text)));
  }, []);

  return (
    <div className="app">
      <h1 className="main-title">🎬 Movie Streaming</h1>
      <div className="movie-grid">
        {movies.map((movie, idx) => (
          <div className="movie-card" key={idx} onClick={() => setSelectedMovie(movie)}>
            <div className="poster-container">
              <img src={movie.poster} alt={movie.name} className="poster"/>
              <div className="play-overlay">
                <svg width="50" height="50" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="48" fill="rgba(0,0,0,0.6)" />
                  <polygon points="40,30 70,50 40,70" fill="#fff"/>
                </svg>
              </div>
            </div>
            <div className="movie-title">{movie.name}</div>
          </div>
        ))}
      </div>
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}

export default App;