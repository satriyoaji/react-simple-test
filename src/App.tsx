import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Movie } from './types/movie';
import { useDebounce } from './hooks/useDebounce';
import axios from 'axios';
import MovieCard from './components/MovieCard'

function App() {
  const [querySearch, setQuerySearch] = React.useState("");
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [watchLater, setWatchLater] = React.useState<string[]>([]);
  const [showWatch, setShowWatch] = React.useState(false);
  const debouncedQuery = useDebounce(querySearch, 1000);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      return;
    }
    fetchMovies(debouncedQuery)
  })

  useEffect(() => {
    setWatchLater([])
  }, [watchLater])

  const fetchMovies = async (searchStr: string) => { //https://www.omdbapi.com/?apikey=195c1d69&s=movie
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=195c1&s=${searchStr}`);
      if (response.data) {
        console.log("DATA: ", response.data)
        const result = response.data.Search;
        setMovies(result)
      } else {
        setError(response.data.Error || "No movies found");
      }

    } catch(err) {
      setError(`Error fetching movies: ${err}`);
    } finally {
      setLoading(false)
    }
  }

  const toggleWatchLater = (id: string) => {
    setWatchLater((prev) => prev.includes(id) ? prev.filter((movieId) => movieId !== id) : [...prev, id]);

  const clearWatchLater = () => setWatchLater([]);
  const moviesToShow =  showWatch ? movies.filter((m) => watchLater.includes(m.imdbID)) : movies;


  return (
    <div className="App">
      <h1>Movies App</h1>
      <input type="text" value={querySearch} onChange={(e) => setQuerySearch(e.target.value)} placeholder="Search for a movie" />
      <div>
        <label htmlFor="">
          <input type="checkbox" checked={showWatch} onChange={() => setShowWatch(!showWatch)} />
          Set Show watch later
        </label>
        <button onClick={clearWatchLater} disabled={watchLater.length === 0}>
          Clear Watch Later
        </button>
      </div>

      {loading && <p>LOADING...</p>}
      {error && <p style={{color: 'red'}}>Error {error}</p>}

      <div>
        {moviesToShow.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            toggleWatchLater={toggleWatchLater}
            isWatchLater={watchLater.includes(movie.imdbID)}
          >
          </MovieCard>

        ))}
      </div>

    </div>
  );
}}

export default App;
