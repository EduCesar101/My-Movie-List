import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import './App.css'

interface Movie {
  id: number;
  title: string;
  thumb: string;
  sinopse: string;
  year: number;
  classification: string;
}

//Filme pré-definidos
const initialMovies: Movie[] = [
  {
    id: 1,
    title: 'Oppenheimer',
    thumb: 'https://br.web.img2.acsta.net/pictures/23/05/08/10/29/0695770.jpg',
    sinopse: 'O físico J. Robert Oppenheimer trabalha com uma equipe de cientistas durante o Projeto Manhattan, levando ao desenvolvimento da bomba atômica.',
    year: 2023,
    classification: '16 anos',
  },
  {
    id: 2,
    title: 'Vingadores: Ultimato',
    thumb: 'https://br.web.img3.acsta.net/pictures/19/04/26/17/30/2428965.jpg',
    sinopse: 'Após Thanos eliminar metade das criaturas vivas, os Vingadores têm de lidar com a perda de amigos e entes queridos. Com Tony Stark vagando perdido no espaço sem água e comida, Steve Rogers e Natasha Romanov lideram a resistência contra o titã louco.',
    year: 2019,
    classification: '10 anos',
  },
  {
    id: 3,
    title: 'Interestelar',
    thumb: 'https://upload.wikimedia.org/wikipedia/pt/3/3a/Interstellar_Filme.png',
    sinopse: 'As reservas naturais da Terra estão chegando ao fim e um grupo de astronautas recebe a missão de verificar possíveis planetas para receberem a população mundial, possibilitando a continuação da espécie. Cooper é chamado para liderar o grupo e aceita a missão sabendo que pode nunca mais ver os filhos. Ao lado de Brand, Jenkins e Doyle, ele seguirá em busca de um novo lar.',
    year: 2014,
    classification: 'Livre',
  },
  
];

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [newMovie, setNewMovie] = useState<Movie>({
    id: 0,
    title: '',
    thumb: '',
    sinopse: '',
    year: 0,
    classification: '',
  });

  const nextId = useRef<number>(3);

  useEffect(() => {
    nextId.current = movies.length + 1;
  }, [movies]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  //Adicionar filmes
  const addMovie = useCallback(() => {
    setMovies(listedMovies => [...listedMovies, { ...newMovie, id: nextId.current }]);
    setNewMovie({
      id: 0,
      title: '',
      thumb: '',
      sinopse: '',
      year: 0,
      classification: '',
    });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [newMovie]);

  //Remover Filmes
  const removeMovie = useCallback((id: number) => {
    setMovies(listedMovies => listedMovies.filter(movie => movie.id !== id));
  }, []);

  //Listar filmes
  const memoList = useMemo(
    () => (
      <div className='list'>
        {movies.map(movie => (
          <div key={movie.id} className="movie-card">
            <h3>{movie.title}</h3>
            <img src={movie.thumb} alt="" />
            <p><b>Sinopse: </b>{movie.sinopse}</p>
            <p><b>Ano de Lançamento: </b>{movie.year}</p>
            <p><b>Classificação Indicativa: </b>{movie.classification}</p>
            <button onClick={() => removeMovie(movie.id)}>Remover</button>
          </div>
        ))}
      </div>
    ),
    [movies, removeMovie]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setNewMovie(listedMovies => ({
        ...listedMovies,
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

  return (
    <div className="App">
      <h1>Minha Lista de Filmes</h1>
      {memoList}

      {/*Formulário para cadastrar filmes*/}
      <form onSubmit={handleSubmit} className='Forms'>
        <h3>Cadastrar Filme</h3>
        <img width="150" height="150" src="https://img.icons8.com/stickers/100/movie.png" alt="movie"/>
        <label>
          Título:
          <input
            type="text"
            name="title"
            value={newMovie.title}
            placeholder='Digite o nome do filme'
            onChange={handleInputChange}
            ref={inputRef}
            required
          />
        </label>
        <label>
          Imagem:
          <input
            type="text"
            name="thumb"
            value={newMovie.thumb}
            placeholder='Insira o link da imagem do filme'
            onChange={handleInputChange}
            ref={inputRef}
            required
          />
        </label>
        <label>
          Sinopse:
          <input
            type="text"
            name="sinopse"
            value={newMovie.sinopse}
            placeholder='Digite a sinopse do filme'
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Ano de Lançamento:
          <input
            type="number"
            name="year"
            value={newMovie.year}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Classificação Indicativa:
          <input
            type="text"
            name="classification"
            value={newMovie.classification}
            placeholder='Digite a classificação indicativa'
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Adicionar Filme</button>
      </form>
      
    </div>
  );
};

export default App;
