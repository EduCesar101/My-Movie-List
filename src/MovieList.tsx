import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';


interface Movie {
  title: string;
  description: string;
  year: number;
}

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([
    {
      title: 'Filme 1',
      description: 'Descrição do Filme 1',
      year: 2022,
    },
    {
      title: 'Filme 2',
      description: 'Descrição do Filme 2',
      year: 2023,
    },
    // Adicione mais filmes conforme necessário
  ]);

  const [newMovie, setNewMovie] = useState<Movie>({
    title: '',
    description: '',
    year: 0,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const addMovie = useCallback(() => {
    setMovies(prevMovies => [...prevMovies, newMovie]);
    setNewMovie({ title: '', description: '', year: 0 });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [newMovie]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setNewMovie(prevMovie => ({
        ...prevMovie,
        [name]: value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      addMovie();
    },
    [addMovie]
  );

  const editMovie = useCallback(
    (index: number, updatedMovie: Movie) => {
      const updatedMovies = [...movies];
      updatedMovies[index] = updatedMovie;
      setMovies(updatedMovies);
    },
    [movies]
  );

  const removeMovie = useCallback(
    (index: number) => {
      const updatedMovies = movies.filter((_, i) => i !== index);
      setMovies(updatedMovies);
    },
    [movies]
  );

  const memoizedMovieForm = useMemo(
    () => (
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={newMovie.title}
            onChange={handleInputChange}
            ref={inputRef}
            required
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={newMovie.description}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Year:
          <input
            type="number"
            name="year"
            value={newMovie.year}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Adicionar Filme</button>
      </form>
    ),
    [newMovie, handleInputChange, handleSubmit]
  );

  interface MovieListProps {
    movies: Movie[];
    editMovie: (index: number, updatedMovie: Movie) => void;
    removeMovie: (index: number) => void;
  }
  
  const MovieList: React.FC<MovieListProps> = ({ movies, editMovie, removeMovie }) => {
    return (
      <div className="movie-list">
        {movies.map((movie, index) => (
          <div key={index} className="movie-item">
            <Movie
              title={movie.title}
              description={movie.description}
              year={movie.year}
            />
            <button onClick={() => editMovie(index, movie)}>Editar</button>
            <button onClick={() => removeMovie(index)}>Remover</button>
          </div>
        ))}
      </div>
    );
  };

export default MovieList;
