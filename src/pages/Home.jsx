import { useEffect, useState } from "react";

//Aqui eu estou guardando os meus dados da API para poder consumir
//dentro da home puxando elas do .env
const moviesURL = import.meta.env.VITE_API;
const apiKEY = import.meta.env.VITE_API_KEY;

//Inicio do hook Home
const Home = () => {
  const [topMovies, setTopMovies] = useState([]);

  const getTopRatedMovies = async (url) => {
    //res vai buscar resposta da API através da (url)
    const res = await fetch(url);
    //data vai pegar os dados de respostas que foram entregues e converter para json
    const data = await res.json();

    setTopMovies(data.results);
  };

  useEffect(() => {
    const topRatedUrl = `${moviesURL}top_rated?${apiKEY}`;
    //dentro de useEffect agora eu vou montar a url que preciso para buscar os filmes
    //melhores avaliados

    getTopRatedMovies(topRatedUrl);
  }, []);

  return (
    <div className="container">
      <h2 className="title">Melhores Filmes:</h2>
      <div className="movies-container">
        {topMovies.length === 0 && <p>Carregando...</p>}
        {topMovies.length > 0 && topMovies.map((movie) => <p>{movie.title}</p>)}
      </div>
    </div>
  );
};

export default Home;
