import React, { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import MovieGrid from './components/MovieGrid/MovieGrid';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import MovieModal from './components/MovieModal/MovieModal';
import { Movie } from './types/movie';
import { fetchMovies } from './services/movieService';
import { Toaster, toast } from 'react-hot-toast';

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
  setLoading(true);
  setError(false);
  setMovies([]);

  try {
    const results = await fetchMovies(query);

    if (results.length === 0) {
      toast.error('No movies found for your request.');
    }

    setMovies(results);
  } catch (error: unknown) {
    setError(true);
    if (error instanceof Error) {
      console.error('Fetch failed:', error.message);
    }
  } finally {
    setLoading(false);
  }
};


  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && <MovieGrid movies={movies} onSelect={handleSelectMovie} />}
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleCloseModal} />}
      <Toaster />
    </>
  );
};

export default App;
