import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";

function App() {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchMovies = async (query) => {

    if (!query) return;

    setLoading(true);

    try {

      const response = await fetch(
        `https://www.omdbapi.com/?apikey=YOUR_API_KEY&s=${query}`
      );

      const data = await response.json();

      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }

    } catch (error) {
      console.log(error);
      setMovies([]);
    }

    setLoading(false);
  };

  return (
    <div className="app">

      <h1>Movie Search App</h1>

      <SearchBar onSearch={searchMovies} />

      {loading && <p>Loading...</p>}

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

    </div>
  );
}

export default App;
